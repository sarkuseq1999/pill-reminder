export const COLOR_PRESETS = [
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#84cc16', // lime
  '#22c55e', // green
  '#14b8a6', // teal
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#6366f1', // indigo
  '#a855f7', // purple
  '#d946ef', // fuchsia
  '#ec4899', // pink
  '#78716c', // gray
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
