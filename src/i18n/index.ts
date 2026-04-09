import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { DEFAULT_LANG, SUPPORTED_LANGS } from "@/lib/i18n-routing";

import it from "./locales/it.json";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";
import es from "./locales/es.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      it: { translation: it },
      en: { translation: en },
      fr: { translation: fr },
      de: { translation: de },
      es: { translation: es },
    },
    supportedLngs: [...SUPPORTED_LANGS],
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    fallbackLng: DEFAULT_LANG,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["path", "navigator", "querystring"],
      lookupFromPathIndex: 0,
      lookupQuerystring: "lang",
      lookupLocalStorage: "i18nextLng",
      caches: [],
    },
  });

export default i18n;
