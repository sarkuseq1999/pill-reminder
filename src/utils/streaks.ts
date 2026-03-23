import type { Supplement, DoseLog } from '../types';
import { getExpectedPeriodKeys } from './periods';

interface StreakResult {
  current: number;
  best: number;
  totalTaken: number;
  totalExpected: number;
  totalMissed: number;
}

/**
 * Calculate streak info for a supplement.
 * Walks through all expected period keys and checks which ones have dose logs.
 */
export function calculateStreaks(
  supplement: Supplement,
  doseLogs: DoseLog[],
  upToDate: Date
): StreakResult {
  const expectedKeys = getExpectedPeriodKeys(supplement, upToDate, { excludeCurrentPeriod: true });
  const takenKeys = new Set(
    doseLogs
      .filter(l => l.supplementId === supplement.id)
      .map(l => l.periodKey)
  );

  const totalExpected = expectedKeys.length;
  const totalTaken = expectedKeys.filter(k => takenKeys.has(k)).length;
  const totalMissed = totalExpected - totalTaken;

  // Calculate current streak (walk backwards from most recent)
  let current = 0;
  for (let i = expectedKeys.length - 1; i >= 0; i--) {
    if (takenKeys.has(expectedKeys[i])) {
      current++;
    } else {
      break;
    }
  }

  // Also check if the user took today's dose (if today has an active period not yet counted)
  // The current period is excluded from expected keys, so check dose logs for today
  const todayLogs = doseLogs.filter(l =>
    l.supplementId === supplement.id &&
    !expectedKeys.includes(l.periodKey) // logs for the current (excluded) period
  );
  if (todayLogs.length > 0) {
    // Today's dose was taken but not in expected keys yet — add to current streak
    current += todayLogs.length;
  }

  // Calculate best streak (walk forward)
  let best = 0;
  let runningStreak = 0;
  for (const key of expectedKeys) {
    if (takenKeys.has(key)) {
      runningStreak++;
      if (runningStreak > best) best = runningStreak;
    } else {
      runningStreak = 0;
    }
  }

  // Best might be the current streak if it includes today
  if (current > best) best = current;

  return { current, best, totalTaken, totalExpected, totalMissed };
}
