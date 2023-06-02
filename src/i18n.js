import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
const resources = {
  Hn: {
    translation: JSON.parse(localStorage.getItem("lang"))
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    // resources,
    // lng: localStorage.getItem("lang"),
    fallbackLng: "en",
    debug: true,
    detection: {
      // order: ["queryString", "cookie"],
      order: ["localStorage", "lang"],
      cache: ["localStorage"],
      // cache: ["c"],
    },
    // detection: {
    //   order: ["localStorage", "lang"],
    //   lookupQuerystring: "lang",
    //   lookupLocalStorage: "lang",
    //   caches: ["localStorage"],
    // },
    interpolation: {
      escapeValue: false,
    },
  });

// i18n
//   .use(initReactI18next) // passes i18n down to react-i18next
//   .init({
//     resources,
//     lng: localStorage.getItem("lang"),
//     detection: {
//       order: ["localStorage", "lang"],
//       lookupQuerystring: "lang",
//       lookupLocalStorage: "lang",
//       caches: ["localStorage"],
//     },
//     // keySeparator: false, // we do not use keys in form messages.welcome
//     fallbackLng: "en", // use az if detected lng is not available
//     interpolation: {
//       escapeValue: false, // react already safes from xss
//     },
//   });

export default i18n;
