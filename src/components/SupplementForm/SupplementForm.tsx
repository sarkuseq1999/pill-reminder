import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { COLOR_PRESETS } from '../../constants';
import type { Frequency } from '../../types';
import FrequencyPicker from './FrequencyPicker';

export default function SupplementForm() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { state, addSupplement, updateSupplement } = useApp();

  const existing = id ? state.supplements.find(s => s.id === id) : null;
  const isEditing = !!existing;

  const [name, setName] = useState(existing?.name || '');
  const [frequency, setFrequency] = useState<Frequency>(
    existing?.frequency || { timesPerDay: 1, everyNDays: 1 }
  );
  const [color, setColor] = useState(existing?.color || COLOR_PRESETS[0]);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const isCustomColor = !COLOR_PRESETS.includes(color as typeof COLOR_PRESETS[number]);

  useEffect(() => {
    if (existing) {
      setName(existing.name);
      setFrequency(existing.frequency);
      setColor(existing.color);
    }
  }, [existing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (isEditing && existing) {
      await updateSupplement({
        ...existing,
        name: name.trim(),
        frequency,
        color,
      });
    } else {
      await addSupplement(name.trim(), frequency, color);
    }
    navigate(-1);
  };

  const isValid = name.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="px-5 py-6 space-y-6">
      <h2 className="text-lg font-semibold text-slate-100">
        {isEditing ? 'Edit Supplement' : 'Add Supplement'}
      </h2>

      {/* Name */}
      <div>
        <label className="text-sm text-slate-400 mb-2 block">Name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g., Vitamin D"
          className="w-full px-4 py-3 rounded-xl bg-slate-900 text-slate-100 text-sm border border-slate-800 focus:border-indigo-500 focus:outline-none placeholder:text-slate-600"
          autoFocus
        />
      </div>

      {/* Frequency */}
      <FrequencyPicker value={frequency} onChange={setFrequency} />

      {/* Color */}
      <div>
        <label className="text-sm text-slate-400 mb-2 block">Color</label>
        <div className="flex flex-wrap gap-2.5">
          {COLOR_PRESETS.map(c => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full transition-all ${
                color === c
                  ? 'ring-2 ring-offset-2 ring-offset-slate-950 scale-110'
                  : 'hover:scale-105'
              }`}
              style={{
                backgroundColor: c,
                ringColor: color === c ? c : undefined,
              }}
              aria-label={`Select color ${c}`}
            />
          ))}

          {/* Custom color button */}
          <button
            type="button"
            onClick={() => colorInputRef.current?.click()}
            className={`w-8 h-8 rounded-full transition-all border-2 border-dashed flex items-center justify-center ${
              isCustomColor
                ? 'ring-2 ring-offset-2 ring-offset-slate-950 scale-110 border-transparent'
                : 'border-slate-600 hover:border-slate-400 hover:scale-105'
            }`}
            style={isCustomColor ? { backgroundColor: color, ringColor: color } : undefined}
            aria-label="Pick custom color"
          >
            {!isCustomColor && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="text-slate-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            )}
          </button>

          {/* Hidden native color input */}
          <input
            ref={colorInputRef}
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
            className="sr-only"
            tabIndex={-1}
          />
        </div>
      </div>

      {/* Preview card */}
      <div
        className="rounded-2xl p-4 transition-colors"
        style={{
          backgroundColor: color + '20',
          borderLeft: `4px solid ${color}`,
        }}
      >
        <h3 className="font-semibold text-slate-100 text-sm">
          {name.trim() || 'Supplement Name'}
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          {frequency.everyNDays === 1
            ? frequency.timesPerDay === 1
              ? 'Daily'
              : `${frequency.timesPerDay}x daily`
            : `Every ${frequency.everyNDays} days`}
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid}
        className={`w-full py-3 rounded-xl font-medium text-sm transition-colors ${
          isValid
            ? 'bg-indigo-600 text-white hover:bg-indigo-500'
            : 'bg-slate-800 text-slate-600 cursor-not-allowed'
        }`}
      >
        {isEditing ? 'Save Changes' : 'Add Supplement'}
      </button>
    </form>
  );
}
