export type NavItem = {
  href: string;
  labelKey:
    | "about"
    | "children"
    | "reports"
    | "news"
    | "statements"
    | "contact";
};

export const mainNavItems: NavItem[] = [
  { href: "/about", labelKey: "about" },
  { href: "/danh-sach-bao-tro", labelKey: "children" },
  { href: "/bao-cao", labelKey: "reports" },
  { href: "/news", labelKey: "news" },
  { href: "/sao-ke-tai-khoan", labelKey: "statements" },
  { href: "/contact", labelKey: "contact" },
];

export type FooterLink = {
  href: string;
  labelKey: string;
};

export const footerInfoLinks: FooterLink[] = [
  { href: "/tam-nhin-su-menh", labelKey: "vision" },
  { href: "/lich-su-hinh-thanh", labelKey: "history" },
  { href: "/cau-chuyen-logo", labelKey: "logoStory" },
  { href: "/co-cau-to-chuc", labelKey: "organization" },
  { href: "/thanh-vien-quy", labelKey: "members" },
  { href: "/tuyen-dung", labelKey: "careers" },
];

export const footerDocumentLinks: FooterLink[] = [
  { href: "/quy-trinh-xet-duyet", labelKey: "process" },
  { href: "/thang-diem", labelKey: "scoring" },
  { href: "/dang-ky-tnv", labelKey: "volunteer" },
  { href: "/mou", labelKey: "mou" },
];

export const footerLibraryLinks: FooterLink[] = [
  { href: "#", labelKey: "photos" },
  { href: "#", labelKey: "activities" },
  { href: "#", labelKey: "letters" },
];
