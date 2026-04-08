import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SUPPORTED_LANGS = ["it", "en", "fr", "de", "es"];

const LanguageRedirect = () => {
  const { lang, "*": rest } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (lang && SUPPORTED_LANGS.includes(lang)) {
      i18n.changeLanguage(lang);
    }
    // Redirect to the path without the language prefix (or home)
    const targetPath = rest ? `/${rest}` : "/";
    navigate(targetPath, { replace: true });
  }, [lang, rest, i18n, navigate]);

  return null;
};

export default LanguageRedirect;
