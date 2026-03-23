import type { SupplementWithStatus } from '../../types';
import { formatTime, formatDateShort } from '../../utils/dates';

interface SupplementCardProps {
  data: SupplementWithStatus;
  onTap: (supplementId: string, periodKey: string) => void;
  onViewHistory: (supplementId: string) => void;
  onUndoDose: (supplementId: string, periodKey: string) => void;
  dragHandleProps?: Record<string, unknown>;
}

export default function SupplementCard({ data, onTap, onViewHistory, onUndoDose, dragHandleProps }: SupplementCardProps) {
  const { supplement, status, currentPeriod, streak, recentMisses, takenAt } = data;

  const isTaken = status === 'taken';
  const isNotDue = status === 'not-due';
  const isActive = status === 'active';

  const frequencyLabel = supplement.frequency.everyNDays === 1
    ? (supplement.frequency.timesPerDay === 1 ? 'Daily' : `${supplement.frequency.timesPerDay}x daily`)
    : `Every ${supplement.frequency.everyNDays} days`;

  const handleCardClick = () => {
    if (isActive && currentPeriod) {
      onTap(supplement.id, currentPeriod.key);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`relative rounded-2xl p-4 transition-all duration-300 select-none ${
        isActive
          ? 'active:scale-[0.97] cursor-pointer'
          : 'cursor-default'
      }`}
      style={{
        backgroundColor: isTaken || isNotDue
          ? 'rgb(30 41 59 / 0.5)'
          : supplement.color + '20',
        borderLeft: `4px solid ${isTaken || isNotDue ? 'rgb(71 85 105)' : supplement.color}`,
      }}
    >
      <div className="flex items-start gap-2">
        {/* Drag handle */}
        <div
          {...dragHandleProps}
          className={`mt-1 cursor-grab active:cursor-grabbing touch-none p-0.5 rounded ${
            isTaken || isNotDue ? 'text-slate-700' : 'text-slate-500'
          }`}
          onClick={(e) => e.stopPropagation()}
          aria-label="Drag to reorder"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="9" cy="6" r="1.5" />
            <circle cx="15" cy="6" r="1.5" />
            <circle cx="9" cy="12" r="1.5" />
            <circle cx="15" cy="12" r="1.5" />
            <circle cx="9" cy="18" r="1.5" />
            <circle cx="15" cy="18" r="1.5" />
          </svg>
        </div>

        {/* Card content */}
        <div className="flex-1 min-w-0 flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Supplement name */}
            <h3 className={`font-semibold text-base truncate ${
              isTaken || isNotDue ? 'text-slate-500' : 'text-slate-100'
            }`}>
              {supplement.name}
            </h3>

            {/* Frequency & period label */}
            <p className={`text-xs mt-0.5 ${
              isTaken || isNotDue ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {frequencyLabel}
              {currentPeriod && supplement.frequency.timesPerDay > 1 && (
                <span> &middot; {currentPeriod.label}</span>
              )}
            </p>

            {/* Taken timestamp */}
            {isTaken && takenAt && (
              <p className="text-xs text-slate-500 mt-1">
                Taken at {formatTime(takenAt)}
              </p>
            )}

            {/* Not due today */}
            {isNotDue && (
              <p className="text-xs text-slate-600 mt-1">
                Not due today
              </p>
            )}

            {/* Recent misses */}
            {recentMisses.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1">
                {recentMisses.map(date => (
                  <span
                    key={date}
                    className="text-xs px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400"
                  >
                    Missed {formatDateShort(date)}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right side: action buttons */}
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewHistory(supplement.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isTaken || isNotDue
                  ? 'bg-slate-800 text-slate-500 hover:text-slate-300 hover:bg-slate-700'
                  : 'bg-white/10 text-slate-300 hover:text-slate-100 hover:bg-white/15'
              }`}
              aria-label={`View ${supplement.name} history`}
            >
              History
            </button>

            {/* Undo / Refresh button — only when taken */}
            {isTaken && currentPeriod && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUndoDose(supplement.id, currentPeriod.key);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors bg-slate-800 text-amber-400 hover:text-amber-300 hover:bg-slate-700"
                aria-label={`Undo ${supplement.name} dose`}
              >
                Refresh
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
