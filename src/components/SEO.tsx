import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DEFAULT_LANG, SUPPORTED_LANGS, getLocalizedPath, normalizeLanguage, stripLanguageFromPath } from "@/lib/i18n-routing";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogImageAlt?: string;
  noindex?: boolean;
}

const SITE_NAME = "ZAPPER®";
const BASE_URL = "https://www.smokezapper.it";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;
const TWITTER_HANDLE = "@smokezapper";

const OG_LOCALE_MAP: Record<string, string> = {
  it: "it_IT",
  en: "en_US",
  fr: "fr_FR",
  de: "de_DE",
  es: "es_ES",
};

export default function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
  noindex = false,
}: SEOProps) {
  const location = useLocation();
  const { i18n } = useTranslation();
  const currentLanguage = normalizeLanguage(i18n.resolvedLanguage || i18n.language);
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const relativeCanonical = (() => {
    if (!canonical) return stripLanguageFromPath(location.pathname);

    if (canonical.startsWith("http")) {
      try {
        const url = new URL(canonical);
        return `${url.pathname}${url.search}${url.hash}`;
      } catch {
        return stripLanguageFromPath(location.pathname);
      }
    }

    return canonical;
  })();
  const absoluteCanonical = `${BASE_URL}${getLocalizedPath(relativeCanonical, currentLanguage)}`;
  const absoluteOgImage = ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;
  const currentOgLocale = OG_LOCALE_MAP[currentLanguage] || OG_LOCALE_MAP[DEFAULT_LANG];
  const imageAlt = ogImageAlt || `${title} — ${SITE_NAME}`;

  return (
    <Helmet>
      <html lang={currentLanguage} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      <link rel="canonical" href={absoluteCanonical} />
      {SUPPORTED_LANGS.map((language) => (
        <link
          key={language}
          rel="alternate"
          hrefLang={language}
          href={`${BASE_URL}${getLocalizedPath(relativeCanonical, language)}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}${getLocalizedPath(relativeCanonical, DEFAULT_LANG)}`} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={currentOgLocale} />
      {SUPPORTED_LANGS.filter((l) => l !== currentLanguage).map((language) => (
        <meta key={language} property="og:locale:alternate" content={OG_LOCALE_MAP[language]} />
      ))}
      {absoluteCanonical && <meta property="og:url" content={absoluteCanonical} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />
      <meta name="twitter:image:alt" content={imageAlt} />
    </Helmet>
  );
}
