import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { getExpectedPeriodKeys } from '../../utils/periods';
import { calculateStreaks } from '../../utils/streaks';
import { formatDate, formatDateShort, formatDateLong } from '../../utils/dates';
import { PERIOD_WINDOWS } from '../../constants';
import StatsSummary from './StatsSummary';
import HistoryItem from './HistoryItem';

export default function HistoryView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useApp();

  const supplement = state.supplements.find(s => s.id === id);

  const supplementLogs = useMemo(
    () => state.doseLogs.filter(l => l.supplementId === id),
    [state.doseLogs, id]
  );

  const now = useMemo(() => new Date(), [state.currentDate]);

  const streakResult = useMemo(
    () => supplement ? calculateStreaks(supplement, supplementLogs, now) : null,
    [supplement, supplementLogs, now]
  );

  const expectedKeys = useMemo(
    () => supplement ? getExpectedPeriodKeys(supplement, now, { excludeCurrentPeriod: true }) : [],
    [supplement, now]
  );

  const logsByKey = useMemo(
    () => new Map(supplementLogs.map(l => [l.periodKey, l])),
    [supplementLogs]
  );

  const historyEntries = useMemo(() => {
    if (!supplement) return [];

    const entries: {
      key: string;
      date: string;
      periodLabel?: string;
      taken: boolean;
      timestamp?: number;
    }[] = [];

    for (const key of [...expectedKeys].reverse()) {
      const dateStr = key.split('_')[0];
      const log = logsByKey.get(key);
      const periodIndex = key.includes('_') ? parseInt(key.split('_')[1]) : undefined;
      const windows = PERIOD_WINDOWS[supplement.frequency.timesPerDay] || PERIOD_WINDOWS[1];
      const periodLabel = periodIndex !== undefined && windows[periodIndex]
        ? windows[periodIndex].label
        : undefined;

      entries.push({
        key,
        date: formatDateShort(dateStr),
        periodLabel,
        taken: !!log,
        timestamp: log?.timestamp,
      });
    }

    return entries;
  }, [supplement, expectedKeys, logsByKey]);

  if (!supplement || !streakResult) {
    return (
      <div className="px-5 py-10 text-center">
        <p className="text-slate-500">Supplement not found.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-indigo-400 text-sm"
        >
          Go back
        </button>
      </div>
    );
  }

  const frequencyLabel = supplement.frequency.everyNDays === 1
    ? supplement.frequency.timesPerDay === 1
      ? 'Daily'
      : `${supplement.frequency.timesPerDay}x daily`
    : `Every ${supplement.frequency.everyNDays} days`;

  return (
    <div className="px-5 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: supplement.color }}
          />
          <h2 className="text-lg font-semibold text-slate-100">{supplement.name}</h2>
        </div>
        <p className="text-xs text-slate-500">{frequencyLabel}</p>
      </div>

      {/* Stats */}
      <StatsSummary
        startedDate={formatDateLong(formatDate(new Date(supplement.createdAt)))}
        totalExpected={streakResult.totalExpected}
        totalTaken={streakResult.totalTaken}
        totalMissed={streakResult.totalMissed}
        currentStreak={streakResult.current}
        bestStreak={streakResult.best}
      />

      {/* History list */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-slate-400 mb-3">History</h3>
        {historyEntries.length === 0 ? (
          <p className="text-slate-600 text-sm text-center py-6">
            No history yet. Take your first dose!
          </p>
        ) : (
          <div className="bg-slate-900 rounded-2xl px-4 border border-slate-800/50">
            {historyEntries.map(entry => (
              <HistoryItem
                key={entry.key}
                date={entry.date}
                taken={entry.taken}
                timestamp={entry.timestamp}
                periodLabel={entry.periodLabel}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
