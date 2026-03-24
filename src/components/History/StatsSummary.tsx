import { useTranslation } from '../../i18n';

interface StatsSummaryProps {
  startedDate: string;
  totalExpected: number;
  totalTaken: number;
  totalMissed: number;
  currentStreak: number;
  bestStreak: number;
}

export default function StatsSummary({
  startedDate,
  totalExpected,
  totalTaken,
  totalMissed,
  currentStreak,
  bestStreak,
}: StatsSummaryProps) {
  const { t } = useTranslation();
  const completionRate = totalExpected > 0
    ? Math.round((totalTaken / totalExpected) * 100)
    : 0;

  return (
    <div className="space-y-4">
      {/* Started date */}
      <p className="text-xs text-slate-500">
        {t('stats.trackingSince', { date: startedDate })}
      </p>

      {/* Completion rate bar */}
      <div>
        <div className="flex justify-between items-end mb-1.5">
          <span className="text-sm text-slate-400">{t('stats.completion')}</span>
          <span className="text-xl font-bold text-slate-100">{completionRate}%</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${completionRate}%`,
              backgroundColor: completionRate >= 80 ? '#22c55e' : completionRate >= 50 ? '#eab308' : '#f43f5e',
            }}
          />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatBox label={t('stats.currentStreak')} value={`${currentStreak}`} unit={t('stats.days')} />
        <StatBox label={t('stats.bestStreak')} value={`${bestStreak}`} unit={t('stats.days')} />
        <StatBox label={t('stats.dosesTaken')} value={`${totalTaken}`} />
        <StatBox label={t('stats.dosesMissed')} value={`${totalMissed}`} highlight={totalMissed > 0} />
      </div>
    </div>
  );
}

function StatBox({ label, value, unit, highlight }: {
  label: string;
  value: string;
  unit?: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-slate-900 rounded-xl p-3 border border-slate-800/50">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className={`text-xl font-bold ${highlight ? 'text-amber-400' : 'text-slate-100'}`}>
        {value}
        {unit && <span className="text-xs text-slate-500 font-normal ml-1">{unit}</span>}
      </p>
    </div>
  );
}
