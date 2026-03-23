export const COLOR_PRESETS = [
  // Row 1 — vivid
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#6366f1', // indigo
  '#a855f7', // purple
  // Row 2 — softer / accent
  '#f43f5e', // rose
  '#fb923c', // light orange
  '#facc15', // gold
  '#4ade80', // light green
  '#22d3ee', // light cyan
  '#60a5fa', // light blue
  '#818cf8', // light indigo
  '#c084fc', // light purple
  // Row 3 — deep / muted
  '#ec4899', // pink
  '#e11d48', // crimson
  '#84cc16', // lime
  '#14b8a6', // teal
  '#0ea5e9', // sky
  '#8b5cf6', // violet
  '#d946ef', // fuchsia
  '#78716c', // warm gray
] as const;

export const FREQUENCY_PRESETS = [
  { label: 'Every day', everyNDays: 1 },
  { label: 'Every other day', everyNDays: 2 },
  { label: 'Custom', everyNDays: -1 }, // sentinel for custom input
] as const;

export const TIMES_PER_DAY_OPTIONS = [
  { label: '1x', value: 1 },
  { label: '2x', value: 2 },
  { label: '3x', value: 3 },
] as const;

/** Period window boundaries for multi-dose days (hours of day) */
export const PERIOD_WINDOWS: Record<number, { label: string; startHour: number; endHour: number }[]> = {
  1: [{ label: 'Daily', startHour: 0, endHour: 24 }],
  2: [
    { label: 'Morning', startHour: 0, endHour: 12 },
    { label: 'Evening', startHour: 12, endHour: 24 },
  ],
  3: [
    { label: 'Morning', startHour: 0, endHour: 8 },
    { label: 'Afternoon', startHour: 8, endHour: 16 },
    { label: 'Evening', startHour: 16, endHour: 24 },
  ],
};

export const MISSED_DISPLAY_DAYS = 3;
