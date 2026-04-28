import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// --- English ---
import enCommon from './locales/en/common.json';
import enHome   from './locales/en/home.json';
import enPartners from './locales/en/partners.json';
import enAbout  from './locales/en/about.json';
import enInvestors from './locales/en/investors.json';
import enContact from './locales/en/contact.json';
import enSolutions from './locales/en/solutions.json';
import enDiaspora from './locales/en/diaspora.json';
import enApi from './locales/en/api.json';

// --- French ---
import frCommon from './locales/fr/common.json';
import frHome   from './locales/fr/home.json';
import frPartners from './locales/fr/partners.json';
import frAbout  from './locales/fr/about.json';
import frInvestors from './locales/fr/investors.json';
import frContact from './locales/fr/contact.json';
import frSolutions from './locales/fr/solutions.json';
import frDiaspora from './locales/fr/diaspora.json';
import frApi from './locales/fr/api.json';


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common : enCommon,
        home   : enHome,
        partners : enPartners,
        about  : enAbout,
        investors : enInvestors,
        contact : enContact,
        solutions : enSolutions,
        diaspora : enDiaspora,
        api : enApi,
      },
      fr: {
        common : frCommon,
        home   : frHome,
        partners : frPartners,
        about  : frAbout,
        investors : frInvestors,
        contact : frContact,
        solutions : frSolutions,
        diaspora : frDiaspora,
        api : frApi,
      },
    },

    fallbackLng  : 'fr',   // French is the default
    interpolation: { escapeValue: false },
  });

export default i18n;