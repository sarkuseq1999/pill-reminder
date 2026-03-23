export interface Frequency {
  timesPerDay: number;  // 1, 2, or 3
  everyNDays: number;   // 1 = daily, 2 = every other day, 7 = weekly, etc.
}

export interface Supplement {
  id: string;
  name: string;
  frequency: Frequency;
  color: string;
  sortOrder: number;
  createdAt: number;
  updatedAt: number;
}

export interface DoseLog {
  id: string;
  supplementId: string;
  timestamp: number;
  periodKey: string;
}

export interface Period {
  key: string;
  label: string;
  startMs: number;
  endMs: number;
}

export type SupplementStatus = 'active' | 'taken' | 'not-due';

export interface SupplementWithStatus {
  supplement: Supplement;
  status: SupplementStatus;
  currentPeriod: Period | null;
  streak: number;
  recentMisses: string[]; // dates of misses in last 3 days
  takenAt?: number; // timestamp if taken in current period
}

export type AppAction =
  | { type: 'LOAD_STATE'; supplements: Supplement[]; doseLogs: DoseLog[]; currentDate: string }
  | { type: 'ADD_SUPPLEMENT'; supplement: Supplement }
  | { type: 'UPDATE_SUPPLEMENT'; supplement: Supplement }
  | { type: 'DELETE_SUPPLEMENT'; id: string }
  | { type: 'LOG_DOSE'; doseLog: DoseLog }
  | { type: 'UNDO_DOSE'; doseLogId: string }
  | { type: 'RESET_DAY'; currentDate: string; doseLogs: DoseLog[] }
  | { type: 'REORDER_SUPPLEMENTS'; supplements: Supplement[] };

export interface AppState {
  supplements: Supplement[];
  doseLogs: DoseLog[];
  currentDate: string;
  loading: boolean;
}
