import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLocalizedPath, getPreferredLanguage, isSupportedLanguage, normalizeLanguage } from "@/lib/i18n-routing";

const LanguageRouteSync = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    const pathLanguage = segments[0];

    if (isSupportedLanguage(pathLanguage)) {
      const normalizedLanguage = normalizeLanguage(pathLanguage);

      if (i18n.resolvedLanguage !== normalizedLanguage) {
        void i18n.changeLanguage(normalizedLanguage);
      }

      document.documentElement.lang = normalizedLanguage;
      return;
    }

    const activeLanguage = getPreferredLanguage({
      pathname: location.pathname,
      search: location.search,
      navigatorLanguages: typeof window !== "undefined" ? window.navigator.languages : [],
      navigatorLanguage:
        typeof window !== "undefined" ? window.navigator.language : i18n.resolvedLanguage || i18n.language,
      documentLanguage: typeof document !== "undefined" ? document.documentElement.lang : i18n.resolvedLanguage || i18n.language,
      locale: typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().locale : i18n.resolvedLanguage || i18n.language,
      fallbackLanguage: i18n.resolvedLanguage || i18n.language,
    });

    if (i18n.resolvedLanguage !== activeLanguage) {
      void i18n.changeLanguage(activeLanguage);
    }

    document.documentElement.lang = activeLanguage;

    const localizedPath = getLocalizedPath(
      location.pathname,
      activeLanguage,
      location.search,
      location.hash,
    );

    const currentPath = `${location.pathname}${location.search}${location.hash}`;

    if (localizedPath !== currentPath) {
      navigate(localizedPath, { replace: true });
    }
  }, [i18n, location.hash, location.pathname, location.search, navigate]);

  return null;
};

export default LanguageRouteSync;