import { useState, useCallback, useMemo, type ReactNode } from 'react';
import { I18nContext, getSavedLanguage, saveLanguage, translate, type Language } from './index';

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getSavedLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    saveLanguage(lang);
  }, []);

  const t = useCallback(
    (key: Parameters<typeof translate>[1], params?: Record<string, string | number>) =>
      translate(language, key, params),
    [language],
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
