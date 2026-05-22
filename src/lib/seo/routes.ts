import type { DataPageKey } from "@/content/pages/data-pages";
import type { StaticPageKey } from "@/content/pages/static-pages";
import { locales, type Locale } from "@/i18n/config";
import { getAllChildren } from "@/lib/data/children";
import { getNewsSlugs } from "@/lib/data/news";
import { localizedPath } from "@/lib/seo/paths";

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

export type SitemapEntry = {
  pathname: string;
  locale: Locale;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

function entriesForPath(
  pathname: string,
  changeFrequency: SitemapEntry["changeFrequency"],
  priority: number,
): SitemapEntry[] {
  return locales.map((locale) => ({
    pathname: localizedPath(pathname, locale),
    locale,
    changeFrequency,
    priority,
  }));
}

/** All indexable URL paths (with locale prefix applied in entries). */
export function getAllSitemapEntries(): SitemapEntry[] {
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

  for (const slug of getNewsSlugs()) {
    entries.push(...entriesForPath(`/news/${slug}`, "monthly", 0.6));
  }

  for (const child of getAllChildren()) {
    entries.push(...entriesForPath(`/danh-sach-bao-tro/${child.code}`, "monthly", 0.5));
  }

  return entries;
}
