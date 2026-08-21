import { useCallback } from 'react';
import { translations, Language, TranslationKey } from '../translations';

export const useTranslation = (language: Language) => {
  const t = useCallback((key: TranslationKey) => {
    return translations[language][key];
  }, [language]);

  return { t };
};