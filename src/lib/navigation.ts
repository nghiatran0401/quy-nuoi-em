import { siteCopy, type NavLabelKey } from "@/content/site-copy";
import { publicCatalog } from "@/config/public-catalog";

export type NavItem = {
  href: string;
  labelKey: NavLabelKey;
  external?: boolean;
};

export const mainNavItems: NavItem[] = [
  { href: "/danh-sach-bao-tro", labelKey: "children" },
  { href: publicCatalog.url, labelKey: "catalog", external: true },
  { href: "/bao-cao", labelKey: "reports" },
  { href: "/news", labelKey: "news" },
  { href: "/sao-ke-tai-khoan", labelKey: "statements" },
];

export function navLabel(key: NavLabelKey): string {
  return siteCopy.nav[key];
}
