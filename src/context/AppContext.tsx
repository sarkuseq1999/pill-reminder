import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { AppState, AppAction, Supplement, DoseLog } from '../types';
import { formatDate } from '../utils/dates';
import * as storage from '../utils/storage';
import { generateId } from '../utils/id';

const initialState: AppState = {
  supplements: [],
  doseLogs: [],
  currentDate: formatDate(new Date()),
  loading: true,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOAD_STATE':
      return {
        ...state,
        supplements: action.supplements.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
        doseLogs: action.doseLogs,
        currentDate: action.currentDate,
        loading: false,
      };
    case 'ADD_SUPPLEMENT':
      return {
        ...state,
        supplements: [...state.supplements, action.supplement],
      };
    case 'UPDATE_SUPPLEMENT':
      return {
        ...state,
        supplements: state.supplements.map(s =>
          s.id === action.supplement.id ? action.supplement : s
        ),
      };
    case 'DELETE_SUPPLEMENT':
      return {
        ...state,
        supplements: state.supplements.filter(s => s.id !== action.id),
        doseLogs: state.doseLogs.filter(l => l.supplementId !== action.id),
      };
    case 'LOG_DOSE':
      return {
        ...state,
        doseLogs: [...state.doseLogs, action.doseLog],
      };
    case 'UNDO_DOSE':
      return {
        ...state,
        doseLogs: state.doseLogs.filter(l => l.id !== action.doseLogId),
      };
    case 'RESET_DAY':
      return {
        ...state,
        currentDate: action.currentDate,
        doseLogs: action.doseLogs,
      };
    case 'REORDER_SUPPLEMENTS':
      return {
        ...state,
        supplements: action.supplements,
      };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  addSupplement: (name: string, frequency: { timesPerDay: number; everyNDays: number }, color: string) => Promise<void>;
  updateSupplement: (supplement: Supplement) => Promise<void>;
  deleteSupplement: (id: string) => Promise<void>;
  logDose: (supplementId: string, periodKey: string) => Promise<void>;
  undoDose: (supplementId: string, periodKey: string) => Promise<void>;
  reorderSupplements: (reordered: Supplement[]) => Promise<void>;
  resetDay: () => Promise<void>;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Hydrate from IndexedDB on mount
  useEffect(() => {
    async function load() {
      const supplements = await storage.getAllSupplements();
      const doseLogs = await storage.getAllDoseLogs();
      const currentDate = formatDate(new Date());
      dispatch({ type: 'LOAD_STATE', supplements, doseLogs, currentDate });
    }
    load();
  }, []);

  const addSupplement = async (
    name: string,
    frequency: { timesPerDay: number; everyNDays: number },
    color: string
  ) => {
    const now = Date.now();
    const maxOrder = state.supplements.reduce((max, s) => Math.max(max, s.sortOrder ?? 0), -1);
    const supplement: Supplement = {
      id: generateId(),
      name,
      frequency,
      color,
      sortOrder: maxOrder + 1,
      createdAt: now,
      updatedAt: now,
    };
    await storage.addSupplement(supplement);
    dispatch({ type: 'ADD_SUPPLEMENT', supplement });
  };

  const updateSupplementFn = async (supplement: Supplement) => {
    const updated = { ...supplement, updatedAt: Date.now() };
    await storage.updateSupplement(updated);
    dispatch({ type: 'UPDATE_SUPPLEMENT', supplement: updated });
  };

  const deleteSupplementFn = async (id: string) => {
    await storage.deleteSupplement(id);
    dispatch({ type: 'DELETE_SUPPLEMENT', id });
  };

  const logDose = async (supplementId: string, periodKey: string) => {
    const doseLog: DoseLog = {
      id: generateId(),
      supplementId,
      timestamp: Date.now(),
      periodKey,
    };
    await storage.addDoseLog(doseLog);
    dispatch({ type: 'LOG_DOSE', doseLog });
  };

  const undoDose = async (supplementId: string, periodKey: string) => {
    // Find the dose log for this supplement + period
    const log = state.doseLogs.find(
      l => l.supplementId === supplementId && l.periodKey === periodKey
    );
    if (log) {
      await storage.deleteDoseLog(log.id);
      dispatch({ type: 'UNDO_DOSE', doseLogId: log.id });
    }
  };

  const reorderSupplements = async (reordered: Supplement[]) => {
    // Assign new sortOrder based on array position
    const updated = reordered.map((s, i) => ({ ...s, sortOrder: i }));
    // Persist all to IndexedDB
    await Promise.all(updated.map(s => storage.updateSupplement(s)));
    dispatch({ type: 'REORDER_SUPPLEMENTS', supplements: updated });
  };

  const resetDay = async () => {
    const currentDate = formatDate(new Date());
    const doseLogs = await storage.getAllDoseLogs();
    dispatch({ type: 'RESET_DAY', currentDate, doseLogs });
  };

  return (
    <AppContext.Provider value={{
      state,
      addSupplement,
      updateSupplement: updateSupplementFn,
      deleteSupplement: deleteSupplementFn,
      logDose,
      undoDose,
      reorderSupplements,
      resetDay,
      dispatch,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
