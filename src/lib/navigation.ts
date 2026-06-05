import { siteCopy, type NavLabelKey } from "@/content/site-copy";
import { publicCatalog } from "@/config/public-catalog";
import { DATA_PAGE_PATHS } from "@/lib/seo/routes";

export type NavItem = {
  href: string;
  labelKey: NavLabelKey;
  external?: boolean;
};

export const mainNavItems: NavItem[] = [
  { href: DATA_PAGE_PATHS.children, labelKey: "children" },
  { href: DATA_PAGE_PATHS.donors, labelKey: "donors" },
  { href: publicCatalog.url, labelKey: "catalog", external: true },
  { href: DATA_PAGE_PATHS.reports, labelKey: "reports" },
  { href: DATA_PAGE_PATHS.news, labelKey: "news" },
  { href: DATA_PAGE_PATHS.statements, labelKey: "statements" },
  { href: "/lien-he", labelKey: "contact" },
];

export const footerResourceItems = [
  { href: DATA_PAGE_PATHS.children, label: "Danh sách điểm trường" },
  { href: DATA_PAGE_PATHS.donors, label: "Danh sách nhà tài trợ" },
  { href: DATA_PAGE_PATHS.reports, label: "Báo cáo tài chính" },
  { href: DATA_PAGE_PATHS.news, label: "Bản tin & hoạt động" },
] as const;

export function navLabel(key: NavLabelKey): string {
  return siteCopy.nav[key];
}
