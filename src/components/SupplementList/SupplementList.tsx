import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import ConfirmDialog from '../ConfirmDialog';

export default function SupplementList() {
  const { state, deleteSupplement } = useApp();
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const handleDelete = async () => {
    if (deleteTarget) {
      await deleteSupplement(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="px-5 py-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-slate-100">Manage Supplements</h2>
        <button
          onClick={() => navigate('/edit')}
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors"
        >
          + Add
        </button>
      </div>

      {state.supplements.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-10">
          No supplements added yet.
        </p>
      ) : (
        <div className="space-y-2">
          {state.supplements.map(s => (
            <div
              key={s.id}
              className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800/50"
            >
              {/* Color dot */}
              <div
                className="w-4 h-4 rounded-full shrink-0"
                style={{ backgroundColor: s.color }}
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-200 truncate">{s.name}</p>
                <p className="text-xs text-slate-500">
                  {s.frequency.everyNDays === 1
                    ? s.frequency.timesPerDay === 1
                      ? 'Daily'
                      : `${s.frequency.timesPerDay}x daily`
                    : `Every ${s.frequency.everyNDays} days`}
                </p>
              </div>

              {/* Actions */}
              <button
                onClick={() => navigate(`/edit/${s.id}`)}
                className="p-2 text-slate-500 hover:text-slate-300 transition-colors"
                aria-label={`Edit ${s.name}`}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => setDeleteTarget({ id: s.id, name: s.name })}
                className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                aria-label={`Delete ${s.name}`}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete supplement"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? All dose history will be lost.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
