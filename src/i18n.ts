import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import enTranslation from './locales/en';
import esTranslation from './locales/es';
import frTranslation from './locales/fr';
import hiTranslation from './locales/hi';

const resources = {
  en: { translation: enTranslation },
  es: { translation: esTranslation },
  fr: { translation: frTranslation },
  hi: { translation: hiTranslation },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;