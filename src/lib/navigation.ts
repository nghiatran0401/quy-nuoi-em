import { siteCopy, type NavLabelKey } from "@/content/site-copy";
import { publicCatalog, publicCatalogLinksEnabled } from "@/config/public-catalog";
import { DATA_PAGE_PATHS, STATIC_PAGE_PATHS } from "@/lib/seo/routes";

export type NavItem = {
  href: string;
  labelKey: NavLabelKey;
  external?: boolean;
};

export const mainNavItems: NavItem[] = [
  { href: DATA_PAGE_PATHS.children, labelKey: "children" },
  { href: DATA_PAGE_PATHS.donors, labelKey: "donors" },
  // { href: DATA_PAGE_PATHS.maGhep, labelKey: "maGhep" },
  ...(publicCatalogLinksEnabled
    ? [{ href: publicCatalog.url, labelKey: "catalog" as const, external: true }]
    : []),
  { href: STATIC_PAGE_PATHS.taiChinh, labelKey: "taiChinh" },
  { href: DATA_PAGE_PATHS.reports, labelKey: "reports" },
  { href: DATA_PAGE_PATHS.statements, labelKey: "statements" },
];

export type FooterResourceItem = {
  href: string;
  label: string;
  external?: boolean;
};

export const footerResourceItems: FooterResourceItem[] = [
  { href: DATA_PAGE_PATHS.children, label: "Danh sách điểm trường" },
  { href: DATA_PAGE_PATHS.donors, label: "Danh sách nhà tài trợ" },
  // { href: DATA_PAGE_PATHS.maGhep, label: "Bảng mã ghép NE" },
  { href: STATIC_PAGE_PATHS.taiChinh, label: "Minh bạch tài chính" },
  { href: DATA_PAGE_PATHS.reports, label: "Báo cáo tài chính" },
  { href: DATA_PAGE_PATHS.statements, label: "Sao kê tài khoản" },
  { href: DATA_PAGE_PATHS.news, label: "Bản tin & hoạt động" },
  ...(publicCatalogLinksEnabled
    ? [{ href: publicCatalog.url, label: "Tra cứu mã NE", external: true }]
    : []),
];

export function navLabel(key: NavLabelKey): string {
  return siteCopy.nav[key];
}
