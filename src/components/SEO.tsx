import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DEFAULT_LANG, SUPPORTED_LANGS, getLocalizedPath, normalizeLanguage, stripLanguageFromPath } from "@/lib/i18n-routing";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

const SITE_NAME = "ZAPPER®";
const BASE_URL = "https://www.smokezapper.it";
const DEFAULT_OG_IMAGE = `${BASE_URL}/icon-512.png`;

export default function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
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

  return (
    <Helmet>
      <html lang={currentLanguage} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
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
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="it_IT" />
      {absoluteCanonical && <meta property="og:url" content={absoluteCanonical} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />
    </Helmet>
  );
}
