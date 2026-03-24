import { createContext, useContext } from 'react';
import en, { type TranslationKey } from './translations/en';
import zh from './translations/zh';
import ja from './translations/ja';
import ko from './translations/ko';
import es from './translations/es';

export type Language = 'en' | 'zh' | 'ja' | 'ko' | 'es';

export const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'es', label: 'Español' },
];

const translations: Record<Language, Record<TranslationKey, string>> = {
  en,
  zh,
  ja,
  ko,
  es,
};

const STORAGE_KEY = 'pill-reminder-lang';

export function getSavedLanguage(): Language {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && saved in translations) return saved as Language;
  return 'en';
}

export function saveLanguage(lang: Language) {
  localStorage.setItem(STORAGE_KEY, lang);
}

export function translate(
  lang: Language,
  key: TranslationKey,
  params?: Record<string, string | number>,
): string {
  let text = translations[lang][key] || translations.en[key] || key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replaceAll(`{{${k}}}`, String(v));
    }
  }
  return text;
}

interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider');
  return ctx;
}

export type { TranslationKey };
