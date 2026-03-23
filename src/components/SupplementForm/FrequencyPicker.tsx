import { useState, useEffect } from 'react';
import { TIMES_PER_DAY_OPTIONS, FREQUENCY_PRESETS } from '../../constants';
import type { Frequency } from '../../types';

interface FrequencyPickerProps {
  value: Frequency;
  onChange: (freq: Frequency) => void;
}

export default function FrequencyPicker({ value, onChange }: FrequencyPickerProps) {
  const [showCustom, setShowCustom] = useState(
    value.everyNDays > 2 || !FREQUENCY_PRESETS.some(p => p.everyNDays === value.everyNDays)
  );
  const [customDays, setCustomDays] = useState(
    value.everyNDays > 2 ? String(value.everyNDays) : ''
  );

  // Lock "times per day" to 1 when interval > 1
  const effectiveTimesPerDay = value.everyNDays > 1 ? 1 : value.timesPerDay;

  useEffect(() => {
    if (value.everyNDays > 1 && value.timesPerDay > 1) {
      onChange({ ...value, timesPerDay: 1 });
    }
  }, [value.everyNDays]);

  return (
    <div className="space-y-4">
      {/* Times per day */}
      <div>
        <label className="text-sm text-slate-400 mb-2 block">Doses per day</label>
        <div className="flex gap-2">
          {TIMES_PER_DAY_OPTIONS.map(opt => (
            <button
              key={opt.value}
              type="button"
              disabled={value.everyNDays > 1 && opt.value > 1}
              onClick={() => onChange({ ...value, timesPerDay: opt.value })}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                effectiveTimesPerDay === opt.value
                  ? 'bg-indigo-600 text-white'
                  : value.everyNDays > 1 && opt.value > 1
                    ? 'bg-slate-800/50 text-slate-700 cursor-not-allowed'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* How often */}
      <div>
        <label className="text-sm text-slate-400 mb-2 block">How often</label>
        <div className="flex gap-2">
          {FREQUENCY_PRESETS.map(preset => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                if (preset.everyNDays === -1) {
                  setShowCustom(true);
                  const days = parseInt(customDays) || 3;
                  onChange({ ...value, everyNDays: days });
                } else {
                  setShowCustom(false);
                  onChange({ ...value, everyNDays: preset.everyNDays });
                }
              }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                (preset.everyNDays === -1 && showCustom) ||
                (preset.everyNDays !== -1 && !showCustom && value.everyNDays === preset.everyNDays)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Custom days input */}
        {showCustom && (
          <div className="flex items-center gap-3 mt-3">
            <span className="text-sm text-slate-400">Every</span>
            <input
              type="number"
              min="2"
              max="365"
              value={customDays}
              onChange={e => {
                setCustomDays(e.target.value);
                const days = parseInt(e.target.value);
                if (days >= 2) {
                  onChange({ ...value, everyNDays: days });
                }
              }}
              className="w-20 px-3 py-2 rounded-xl bg-slate-800 text-slate-100 text-sm text-center border border-slate-700 focus:border-indigo-500 focus:outline-none"
              placeholder="7"
            />
            <span className="text-sm text-slate-400">days</span>
          </div>
        )}
      </div>
    </div>
  );
}
