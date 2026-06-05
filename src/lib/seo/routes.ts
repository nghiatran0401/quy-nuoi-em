import type { DataPageKey } from "@/content/pages/data-pages";
import type { StaticPageKey } from "@/content/pages/static-pages";
import { getAllChildren } from "@/lib/data/children";
import { getNewsSitemapEntries } from "@/lib/data/news";
import { localizedPath } from "@/lib/seo/paths";

export const STATIC_PAGE_PATHS: Record<StaticPageKey, string> = {
  logoStory: "/cau-chuyen-logo",
  donate: "/dong-gop",
  process: "/quy-trinh-xet-duyet",
  scoring: "/thang-diem",
  volunteer: "/dang-ky-tnv",
  mou: "/mou",
  members: "/thanh-vien-quy",
  careers: "/tuyen-dung",
  contact: "/lien-he",
};

export const DATA_PAGE_PATHS: Record<DataPageKey, string> = {
  children: "/danh-sach-diem-truong-ho-tro",
  donors: "/danh-sach-nha-tai-tro",
  maGhep: "/ma-ghep",
  reports: "/bao-cao",
  news: "/news",
  statements: "/sao-ke-tai-khoan",
};

export const EXTRA_INDEXED_PATHS: Array<{
  pathname: string;
  changeFrequency: SitemapEntry["changeFrequency"];
  priority: number;
}> = [
];

export type SitemapEntry = {
  pathname: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
  lastModified?: string;
};

function entryForPath(
  pathname: string,
  changeFrequency: SitemapEntry["changeFrequency"],
  priority: number,
  lastModified?: string,
): SitemapEntry {
  return {
    pathname: localizedPath(pathname),
    changeFrequency,
    priority,
    lastModified,
  };
}

export async function getAllSitemapEntries(): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [];

  entries.push(entryForPath("/", "weekly", 1));

  for (const pathname of Object.values(STATIC_PAGE_PATHS)) {
    const priority = pathname === "/dong-gop" ? 0.95 : 0.75;
    entries.push(entryForPath(pathname, "monthly", priority));
  }

  for (const pathname of Object.values(DATA_PAGE_PATHS)) {
    const priority =
      pathname === "/danh-sach-diem-truong-ho-tro"
        ? 0.9
        : pathname === "/danh-sach-nha-tai-tro"
          ? 0.85
          : pathname === "/ma-ghep"
            ? 0.85
          : pathname === "/news"
            ? 0.85
            : 0.7;
    entries.push(entryForPath(pathname, "weekly", priority));
  }

  for (const extra of EXTRA_INDEXED_PATHS) {
    entries.push(entryForPath(extra.pathname, extra.changeFrequency, extra.priority));
  }

  for (const news of await getNewsSitemapEntries()) {
    entries.push(entryForPath(`/news/${news.slug}`, "monthly", 0.6, news.lastModified));
  }

  for (const child of getAllChildren()) {
    entries.push(entryForPath(`/danh-sach-diem-truong-ho-tro/${child.code}`, "monthly", 0.5));
  }

  return entries;
}
