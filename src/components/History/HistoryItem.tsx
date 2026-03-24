import { useTranslation } from '../../i18n';
import { formatTime } from '../../utils/dates';

interface HistoryItemProps {
  date: string;        // display date like "Mar 21"
  taken: boolean;
  timestamp?: number;  // when the dose was taken
  periodLabel?: string; // e.g., "Morning" for multi-dose
}

export default function HistoryItem({ date, taken, timestamp, periodLabel }: HistoryItemProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-3 py-3 border-b border-slate-800/30 last:border-b-0">
      {/* Status icon */}
      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
        taken ? 'bg-green-500/15' : 'bg-red-500/15'
      }`}>
        {taken ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </div>

      {/* Date & period */}
      <div className="flex-1">
        <p className="text-sm text-slate-300">{date}</p>
        {periodLabel && (
          <p className="text-xs text-slate-600">{periodLabel}</p>
        )}
      </div>

      {/* Time or missed label */}
      <span className={`text-xs ${taken ? 'text-slate-500' : 'text-red-400/70'}`}>
        {taken && timestamp ? formatTime(timestamp) : taken ? t('historyItem.taken') : t('historyItem.missed')}
      </span>
    </div>
  );
}
