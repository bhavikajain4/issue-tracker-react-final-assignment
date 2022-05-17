import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n

  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "hi", "fr"],
    fallbackLng: "en",
    debug: true,
    detection: {
      //by using this order we are prioritizing where we need to look first in order to detect langugae. if we don't find at first place then moved to second and so on.
      order: [
        "path",
        "cookie",
        "htmlTag",

        "localStorage",
        "sessionStorage",
        "navigator",

        "subdomain",
      ],
      //by this the language is stored in cookie on browser
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
