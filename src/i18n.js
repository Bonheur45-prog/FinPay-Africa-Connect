import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// --- English ---
import enCommon from './locales/en/common.json';
import enHome   from './locales/en/home.json';
import enPartners from './locales/en/partners.json';
//import enAbout  from './locales/en/about.json';

// --- French ---
import frCommon from './locales/fr/common.json';
import frHome   from './locales/fr/home.json';
import frPartners from './locales/fr/partners.json';
//import frAbout  from './locales/fr/about.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common : enCommon,
        home   : enHome,
        partners : enPartners,
        //about  : enAbout,
      },
      fr: {
        common : frCommon,
        home   : frHome,
        partners : frPartners,
        //about  : frAbout,
      },
    },

    fallbackLng  : 'fr',   // French is the default
    interpolation: { escapeValue: false },
  });

export default i18n;