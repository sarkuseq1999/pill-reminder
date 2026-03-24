import type { TranslationKey } from '../i18n';

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

export const FREQUENCY_PRESETS: { labelKey: TranslationKey; everyNDays: number }[] = [
  { labelKey: 'freq.everyDay', everyNDays: 1 },
  { labelKey: 'freq.everyOtherDay', everyNDays: 2 },
  { labelKey: 'freq.custom', everyNDays: -1 }, // sentinel for custom input
];

export const TIMES_PER_DAY_OPTIONS = [
  { label: '1x', value: 1 },
  { label: '2x', value: 2 },
  { label: '3x', value: 3 },
] as const;

/** Period window boundaries for multi-dose days (hours of day) */
export const PERIOD_WINDOWS: Record<number, { labelKey: TranslationKey; startHour: number; endHour: number }[]> = {
  1: [{ labelKey: 'period.daily', startHour: 0, endHour: 24 }],
  2: [
    { labelKey: 'period.morning', startHour: 0, endHour: 12 },
    { labelKey: 'period.evening', startHour: 12, endHour: 24 },
  ],
  3: [
    { labelKey: 'period.morning', startHour: 0, endHour: 8 },
    { labelKey: 'period.afternoon', startHour: 8, endHour: 16 },
    { labelKey: 'period.evening', startHour: 16, endHour: 24 },
  ],
};

export const MISSED_DISPLAY_DAYS = 3;
