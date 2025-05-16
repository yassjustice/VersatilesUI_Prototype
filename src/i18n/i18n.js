import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.js';
import fr from './locales/fr.js';
import ar from './locales/ar.js';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en,
      fr,
      ar
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already safes from XSS
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
