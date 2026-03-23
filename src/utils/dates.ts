/** Format a Date to "YYYY-MM-DD" in local timezone */
export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Get start of day (midnight) for a given date in local timezone */
export function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Get the number of calendar days between two dates (ignoring time) */
export function daysBetween(a: Date, b: Date): number {
  const aStart = startOfDay(a).getTime();
  const bStart = startOfDay(b).getTime();
  // Use round to handle DST shifts (23h or 25h days)
  return Math.round((bStart - aStart) / 86400000);
}

/** Parse "YYYY-MM-DD" into a Date at midnight local time */
export function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** Format a timestamp to a readable time like "8:32 AM" */
export function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
}

/** Format a date string "YYYY-MM-DD" to a readable format like "Mar 21" */
export function formatDateShort(dateStr: string): string {
  const date = parseDate(dateStr);
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

/** Format a date string to a full readable format like "March 21, 2026" */
export function formatDateLong(dateStr: string): string {
  const date = parseDate(dateStr);
  return date.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' });
}
