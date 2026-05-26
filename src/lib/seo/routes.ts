import type { DataPageKey } from "@/content/pages/data-pages";
import type { StaticPageKey } from "@/content/pages/static-pages";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { getAllChildren } from "@/lib/data/children";
import { getNewsSitemapEntries } from "@/lib/data/news";
import { absoluteUrl, localizedPath } from "@/lib/seo/paths";

export const STATIC_PAGE_PATHS: Record<StaticPageKey, string> = {
  about: "/about",
  vision: "/tam-nhin-su-menh",
  history: "/lich-su-hinh-thanh",
  logoStory: "/cau-chuyen-logo",
  organization: "/co-cau-to-chuc",
  contact: "/contact",
  donate: "/dong-gop",
  process: "/quy-trinh-xet-duyet",
  scoring: "/thang-diem",
  volunteer: "/dang-ky-tnv",
  mou: "/mou",
  members: "/thanh-vien-quy",
  careers: "/tuyen-dung",
};

export const DATA_PAGE_PATHS: Record<DataPageKey, string> = {
  children: "/danh-sach-bao-tro",
  reports: "/bao-cao",
  news: "/news",
  statements: "/sao-ke-tai-khoan",
};

/**
 * Routes that don't belong to the static- or data-page registries but should
 * still be indexed (high-intent landing pages, campaign pages, etc.).
 */
export const EXTRA_INDEXED_PATHS: Array<{
  pathname: string;
  changeFrequency: SitemapEntry["changeFrequency"];
  priority: number;
}> = [
  { pathname: "/quy-trinh-cap-ma-2026", changeFrequency: "monthly", priority: 0.9 },
];

export type SitemapEntry = {
  pathname: string;
  locale: Locale;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
  /** Per-entry last modified ISO timestamp (falls back to build time when omitted). */
  lastModified?: string;
  /**
   * Map of locale → absolute alternate URL for hreflang annotations in sitemap.
   * Includes `x-default` automatically.
   */
  alternates: Record<string, string>;
};

function buildAlternates(pathname: string): SitemapEntry["alternates"] {
  const alternates: Record<string, string> = {};
  for (const locale of locales) {
    alternates[locale] = absoluteUrl(pathname, locale);
  }
  alternates["x-default"] = absoluteUrl(pathname, defaultLocale);
  return alternates;
}

function entriesForPath(
  pathname: string,
  changeFrequency: SitemapEntry["changeFrequency"],
  priority: number,
  lastModified?: string,
): SitemapEntry[] {
  const alternates = buildAlternates(pathname);
  return locales.map((locale) => ({
    pathname: localizedPath(pathname, locale),
    locale,
    changeFrequency,
    priority,
    lastModified,
    alternates,
  }));
}

/** All indexable URL paths (with locale prefix applied in entries). */
export async function getAllSitemapEntries(): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [];

  entries.push(...entriesForPath("/", "weekly", 1));

  for (const pathname of Object.values(STATIC_PAGE_PATHS)) {
    const priority = pathname === "/dong-gop" ? 0.95 : 0.75;
    entries.push(...entriesForPath(pathname, "monthly", priority));
  }

  for (const pathname of Object.values(DATA_PAGE_PATHS)) {
    const priority =
      pathname === "/danh-sach-bao-tro" ? 0.9 : pathname === "/news" ? 0.85 : 0.7;
    entries.push(...entriesForPath(pathname, "weekly", priority));
  }

  for (const extra of EXTRA_INDEXED_PATHS) {
    entries.push(...entriesForPath(extra.pathname, extra.changeFrequency, extra.priority));
  }

  for (const news of await getNewsSitemapEntries()) {
    entries.push(
      ...entriesForPath(`/news/${news.slug}`, "monthly", 0.6, news.lastModified),
    );
  }

  for (const child of getAllChildren()) {
    entries.push(...entriesForPath(`/danh-sach-bao-tro/${child.code}`, "monthly", 0.5));
  }

  return entries;
}
