import { useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { useApp } from '../../context/AppContext';
import { getActivePeriod, isDoseDay, getMissedPeriodKeys } from '../../utils/periods';
import { calculateStreaks } from '../../utils/streaks';
import { formatDate, parseDate } from '../../utils/dates';
import { MISSED_DISPLAY_DAYS } from '../../constants';
import { useTranslation } from '../../i18n';
import type { SupplementWithStatus } from '../../types';
import SortableSupplementCard from './SortableSupplementCard';
import Toast from '../Toast';

export default function Dashboard() {
  const { state, logDose, undoDose, reorderSupplements } = useApp();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [toast, setToast] = useState({ visible: false, message: '' });

  const now = useMemo(() => new Date(), [state.currentDate]);

  // Sensors: require a small drag distance before activating to avoid
  // conflicting with tap-to-log and button clicks
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
  );

  const supplementsWithStatus = useMemo((): SupplementWithStatus[] => {
    return state.supplements.map(supplement => {
      const isToday = isDoseDay(supplement, now);
      const activePeriod = isToday ? getActivePeriod(supplement, now) : null;

      const takenLog = activePeriod
        ? state.doseLogs.find(
            l => l.supplementId === supplement.id && l.periodKey === activePeriod.key
          )
        : null;

      const streakResult = calculateStreaks(supplement, state.doseLogs, now);

      const missedKeys = getMissedPeriodKeys(supplement, state.doseLogs, now);
      const todayDate = formatDate(now);
      const recentMisses = missedKeys
        .map(key => key.split('_')[0])
        .filter(date => {
          const diff = Math.round(
            (parseDate(todayDate).getTime() - parseDate(date).getTime()) / 86400000
          );
          return diff > 0 && diff <= MISSED_DISPLAY_DAYS;
        })
        .filter((date, i, arr) => arr.indexOf(date) === i)
        .sort()
        .reverse();

      let status: SupplementWithStatus['status'];
      if (!isToday || !activePeriod) {
        status = 'not-due';
      } else if (takenLog) {
        status = 'taken';
      } else {
        status = 'active';
      }

      return {
        supplement,
        status,
        currentPeriod: activePeriod,
        streak: streakResult.current,
        recentMisses,
        takenAt: takenLog?.timestamp,
      };
    });
  }, [state.supplements, state.doseLogs, now]);

  const handleDragEnd = useCallback(async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = supplementsWithStatus.findIndex(d => d.supplement.id === active.id);
    const newIndex = supplementsWithStatus.findIndex(d => d.supplement.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(
      supplementsWithStatus.map(d => d.supplement),
      oldIndex,
      newIndex
    );
    await reorderSupplements(reordered);
  }, [supplementsWithStatus, reorderSupplements]);

  const handleTap = useCallback(async (supplementId: string, periodKey: string) => {
    const supp = state.supplements.find(s => s.id === supplementId);
    await logDose(supplementId, periodKey);
    setToast({ visible: true, message: t('dashboard.markedAsTaken', { name: supp?.name || 'Supplement' }) });
  }, [logDose, state.supplements, t]);

  const handleUndoDose = useCallback(async (supplementId: string, periodKey: string) => {
    const supp = state.supplements.find(s => s.id === supplementId);
    await undoDose(supplementId, periodKey);
    setToast({ visible: true, message: t('dashboard.resetToUntaken', { name: supp?.name || 'Supplement' }) });
  }, [undoDose, state.supplements, t]);

  const handleViewHistory = useCallback((supplementId: string) => {
    navigate(`/history/${supplementId}`);
  }, [navigate]);

  const hideToast = useCallback(() => setToast({ visible: false, message: '' }), []);

  if (state.loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-slate-600 border-t-slate-300 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-4 py-5">
      {supplementsWithStatus.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4 opacity-50">💊</div>
          <h2 className="text-lg font-semibold text-slate-300 mb-2">{t('dashboard.noSupplements')}</h2>
          <p className="text-slate-500 text-sm mb-6">{t('dashboard.addFirst')}</p>
          <button
            onClick={() => navigate('/setup')}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-500 transition-colors"
          >
            {t('dashboard.addSupplement')}
          </button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={supplementsWithStatus.map(d => d.supplement.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {supplementsWithStatus.map(data => (
                <SortableSupplementCard
                  key={data.supplement.id}
                  data={data}
                  onTap={handleTap}
                  onViewHistory={handleViewHistory}
                  onUndoDose={handleUndoDose}
                />
              ))}

              <button
                onClick={() => navigate('/edit')}
                className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-800 text-slate-500 text-sm font-medium hover:border-slate-700 hover:text-slate-400 transition-colors"
              >
                {t('dashboard.addSupplementShort')}
              </button>
            </div>
          </SortableContext>
        </DndContext>
      )}

      <Toast message={toast.message} visible={toast.visible} onHide={hideToast} />
    </div>
  );
}
