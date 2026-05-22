import { getSiteUrl } from "@/config/site";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

/**
 * Path without origin. Respects `localePrefix: 'as-needed'` (vi has no prefix).
 */
export function localizedPath(pathname: string, locale: Locale): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (locale === defaultLocale) {
    return normalized === "/" ? "/" : normalized;
  }
  if (normalized === "/") {
    return `/${locale}`;
  }
  return `/${locale}${normalized}`;
}

export function absoluteUrl(pathname: string, locale: Locale): string {
  const base = getSiteUrl();
  const path = localizedPath(pathname, locale);
  return path === "/" ? base : `${base}${path}`;
}

export function alternateLanguages(pathname: string): Record<string, string> {
  const entries = locales.map((locale) => [locale, absoluteUrl(pathname, locale)] as const);
  return Object.fromEntries([
    ...entries,
    ["x-default", absoluteUrl(pathname, defaultLocale)],
  ]);
}
