import { siteCopy, type NavLabelKey } from "@/content/site-copy";
import { publicCatalog } from "@/config/public-catalog";
import { STATIC_PAGE_PATHS } from "@/lib/seo/routes";

export type NavItem = {
  href: string;
  labelKey: NavLabelKey;
  external?: boolean;
};

export const mainNavItems: NavItem[] = [
  { href: "/about", labelKey: "about" },
  { href: "/quy-trinh-cap-ma-2026", labelKey: "process2026" },
  { href: "/danh-sach-bao-tro", labelKey: "children" },
  { href: publicCatalog.url, labelKey: "catalog", external: true },
  { href: "/bao-cao", labelKey: "reports" },
  { href: "/news", labelKey: "news" },
  { href: "/sao-ke-tai-khoan", labelKey: "statements" },
  { href: "/contact", labelKey: "contact" },
];

export const footerSiteLinks: NavItem[] = [
  ...mainNavItems,
  { href: STATIC_PAGE_PATHS.donate, labelKey: "donate" },
];

export const footerSitePrimaryLinks: NavItem[] = footerSiteLinks.slice(0, 4);
export const footerSiteSecondaryLinks: NavItem[] = footerSiteLinks.slice(4);

export function navLabel(key: NavLabelKey): string {
  return siteCopy.nav[key];
}
