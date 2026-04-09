import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLocalizedPath, normalizeLanguage } from "@/lib/i18n-routing";

const languages = [
  { code: "it", label: "IT", flag: "🇮🇹" },
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "de", label: "DE", flag: "🇩🇪" },
  { code: "es", label: "ES", flag: "🇪🇸" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const currentLanguage = normalizeLanguage(i18n.resolvedLanguage || i18n.language);

  const handleLanguageChange = (languageCode: string) => {
    void i18n.changeLanguage(languageCode);
    navigate(getLocalizedPath(location.pathname, languageCode, location.search, location.hash));
  };

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors text-sm"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
          <span className="font-medium uppercase">{currentLanguage}</span>
      </button>
      <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[120px]">
        {languages.map((lang) => (
          <button
            key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg ${
                currentLanguage === lang.code ? "text-primary font-semibold" : "text-foreground"
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
