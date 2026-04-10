export const SUPPORTED_LANGS = ["it", "en", "fr", "de", "es"] as const;

export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export const DEFAULT_LANG: SupportedLang = "it";

export const getPathLanguage = (pathname: string): SupportedLang | null => {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return isSupportedLanguage(firstSegment) ? normalizeLanguage(firstSegment) : null;
};

export const isSupportedLanguage = (lang?: string | null): lang is SupportedLang => {
  if (!lang) return false;

  return SUPPORTED_LANGS.includes(lang.toLowerCase().split("-")[0] as SupportedLang);
};

export const normalizeLanguage = (lang?: string | null): SupportedLang => {
  if (!lang) return DEFAULT_LANG;

  const normalized = lang.toLowerCase().split("-")[0];
  return isSupportedLanguage(normalized) ? normalized : DEFAULT_LANG;
};

export const getPreferredLanguage = ({
  pathname = "/",
  search = "",
  fallbackLanguage,
}: {
  pathname?: string;
  search?: string;
  fallbackLanguage?: string | null;
} = {}): SupportedLang => {
  const pathLanguage = getPathLanguage(pathname);
  if (pathLanguage) return pathLanguage;

  const searchLanguage = new URLSearchParams(search).get("lang");
  if (isSupportedLanguage(searchLanguage)) return normalizeLanguage(searchLanguage);

  if (isSupportedLanguage(fallbackLanguage)) {
    return normalizeLanguage(fallbackLanguage);
  }

  return normalizeLanguage(fallbackLanguage);
};

export const stripLanguageFromPath = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return "/";
  if (!isSupportedLanguage(segments[0])) return pathname || "/";

  const strippedPath = `/${segments.slice(1).join("/")}`;
  return strippedPath === "/" ? "/" : strippedPath.replace(/\/$/, "") || "/";
};

export const getLocalizedPath = (pathname: string, lang: string, search = "", hash = "") => {
  const normalizedLanguage = normalizeLanguage(lang);
  const cleanPath = stripLanguageFromPath(pathname || "/");
  const basePath = cleanPath === "/" ? `/${normalizedLanguage}` : `/${normalizedLanguage}${cleanPath}`;

  return `${basePath}${search}${hash}`;
};