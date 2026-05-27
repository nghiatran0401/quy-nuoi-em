import { siteCopy, type FooterLabelKey, type NavLabelKey } from "@/content/site-copy";

export type NavItem = {
  href: string;
  labelKey: NavLabelKey;
};

export const mainNavItems: NavItem[] = [
  { href: "/about", labelKey: "about" },
  { href: "/quy-trinh-cap-ma-2026", labelKey: "process2026" },
  { href: "/danh-sach-bao-tro", labelKey: "children" },
  { href: "/bao-cao", labelKey: "reports" },
  { href: "/news", labelKey: "news" },
  { href: "/sao-ke-tai-khoan", labelKey: "statements" },
  { href: "/contact", labelKey: "contact" },
];

export type FooterLink = {
  href: string;
  labelKey: FooterLabelKey;
};

export const footerInfoLinks: FooterLink[] = [
  { href: "https://web.sucmanh2000.com/", labelKey: "vision" },
  { href: "https://phongtinhocchoem.nuoiem.com/", labelKey: "history" },
  { href: "https://bepgascongnghiep.nuoiem.com/", labelKey: "organization" },
];

export const footerDocumentLinks: FooterLink[] = [
  { href: "https://web.sucmanh2000.com/", labelKey: "process" },
  { href: "https://phongtinhocchoem.nuoiem.com/", labelKey: "scoring" },
  { href: "https://bepgascongnghiep.nuoiem.com/", labelKey: "volunteer" },
];

export const footerLibraryLinks: FooterLink[] = [
  { href: "https://web.sucmanh2000.com/", labelKey: "photos" },
  { href: "https://phongtinhocchoem.nuoiem.com/", labelKey: "activities" },
  { href: "https://bepgascongnghiep.nuoiem.com/", labelKey: "letters" },
];

export function navLabel(key: NavLabelKey): string {
  return siteCopy.nav[key];
}

export function footerLabel(key: FooterLabelKey): string {
  return siteCopy.footer[key];
}
