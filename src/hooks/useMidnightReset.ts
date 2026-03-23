import { useEffect } from 'react';
import { formatDate } from '../utils/dates';
import { getNextBoundaryTime } from '../utils/periods';
import { useApp } from '../context/AppContext';

/**
 * Schedules state resets at midnight and period boundaries.
 * Also handles the case where the app was backgrounded overnight.
 */
export function useMidnightReset() {
  const { state, resetDay } = useApp();

  // Timer-based reset at next boundary
  useEffect(() => {
    const now = new Date();
    const nextBoundary = getNextBoundaryTime(now);
    const delay = nextBoundary - now.getTime();

    const timer = setTimeout(() => {
      resetDay();
    }, delay);

    return () => clearTimeout(timer);
  }, [state.currentDate, resetDay]);

  // Visibility-based reset (app was backgrounded)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        const today = formatDate(new Date());
        if (today !== state.currentDate) {
          resetDay();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [state.currentDate, resetDay]);
}
