import type { Supplement, Period, DoseLog } from '../types';
import { PERIOD_WINDOWS } from '../constants';
import { formatDate, startOfDay, daysBetween } from './dates';

/** Get all period windows for a supplement on a given date */
export function getPeriodsForDate(supplement: Supplement, date: Date): Period[] {
  const dateStr = formatDate(date);
  const dayStart = startOfDay(date);
  const windows = PERIOD_WINDOWS[supplement.frequency.timesPerDay] || PERIOD_WINDOWS[1];

  return windows.map((w, i) => {
    const start = new Date(dayStart);
    start.setHours(w.startHour);
    const end = new Date(dayStart);
    end.setHours(w.endHour);

    const key = supplement.frequency.timesPerDay === 1
      ? dateStr
      : `${dateStr}_${i}`;

    return {
      key,
      label: w.label,
      startMs: start.getTime(),
      endMs: end.getTime(),
    };
  });
}

/** Check if a given date is a "dose day" for this supplement */
export function isDoseDay(supplement: Supplement, date: Date): boolean {
  const { everyNDays } = supplement.frequency;
  if (everyNDays <= 1) return true;

  const createdDate = new Date(supplement.createdAt);
  const diff = daysBetween(createdDate, date);
  return diff >= 0 && diff % everyNDays === 0;
}

/** Get the currently active period for a supplement, or null if not a dose day */
export function getActivePeriod(supplement: Supplement, now: Date): Period | null {
  if (!isDoseDay(supplement, now)) return null;

  const periods = getPeriodsForDate(supplement, now);
  const nowMs = now.getTime();

  return periods.find(p => nowMs >= p.startMs && nowMs < p.endMs) || null;
}

/** Compute the period key for logging a dose right now */
export function computePeriodKey(supplement: Supplement, now: Date): string | null {
  const period = getActivePeriod(supplement, now);
  return period ? period.key : null;
}

/**
 * Generate all expected period keys from supplement creation to a target date.
 * Used for missed dose detection and streak calculation.
 */
export function getExpectedPeriodKeys(
  supplement: Supplement,
  upToDate: Date,
  options?: { excludeCurrentPeriod?: boolean }
): string[] {
  const keys: string[] = [];
  const createdDay = startOfDay(new Date(supplement.createdAt));
  const targetDay = startOfDay(upToDate);
  const now = new Date();

  let current = new Date(createdDay);

  while (current <= targetDay) {
    if (isDoseDay(supplement, current)) {
      const periods = getPeriodsForDate(supplement, current);

      for (const period of periods) {
        // Skip periods that started before the supplement was created
        if (period.endMs <= supplement.createdAt) continue;

        // Skip the current active period if requested (it hasn't ended yet)
        if (options?.excludeCurrentPeriod && period.endMs > now.getTime()) continue;

        // Don't include future periods
        if (period.startMs > now.getTime()) continue;

        keys.push(period.key);
      }
    }

    current.setDate(current.getDate() + 1);
  }

  return keys;
}

/** Find missed period keys (expected but no dose log) */
export function getMissedPeriodKeys(
  supplement: Supplement,
  doseLogs: DoseLog[],
  upToDate: Date
): string[] {
  const expected = getExpectedPeriodKeys(supplement, upToDate, { excludeCurrentPeriod: true });
  const takenKeys = new Set(
    doseLogs
      .filter(l => l.supplementId === supplement.id)
      .map(l => l.periodKey)
  );

  return expected.filter(key => !takenKeys.has(key));
}

/** Get the next period boundary time (for scheduling resets) */
export function getNextBoundaryTime(now: Date): number {
  const dayStart = startOfDay(now);
  const hours = [8, 12, 16, 24]; // all possible boundary hours
  const nowMs = now.getTime();

  for (const h of hours) {
    const boundary = new Date(dayStart);
    boundary.setHours(h, 0, 0, 100); // +100ms buffer
    if (boundary.getTime() > nowMs) {
      return boundary.getTime();
    }
  }

  // Next midnight
  const tomorrow = new Date(dayStart);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 100);
  return tomorrow.getTime();
}
