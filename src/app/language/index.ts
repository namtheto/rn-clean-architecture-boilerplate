import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';

export const resources = {
  en: {
    translation: en,
  },
};

i18next.use(initReactI18next).init({
  resources,
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  lng: 'en',
});

export default i18next;
