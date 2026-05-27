/**
 * Public catalog & NE code lookup (aggregate stats, tra cứu mã).
 * Deployed separately from the main CMS site.
 */
const DEFAULT_PUBLIC_CATALOG_URL = "https://nuoiem-lovat.vercel.app/";

export const publicCatalog = {
  url:
    process.env.NEXT_PUBLIC_PUBLIC_CATALOG_URL?.trim() || DEFAULT_PUBLIC_CATALOG_URL,
  title: "Danh mục em nuôi công khai",
  shortDescription:
    "Tra cứu mã NE, xem thống kê quy mô và bảng tổng hợp em nuôi theo tỉnh — minh bạch công khai.",
  ctaLabel: "Tra cứu mã NE",
  statsCtaLabel: "Xem danh mục & tra cứu",
} as const;

export function publicCatalogHost(): string {
  try {
    return new URL(publicCatalog.url).host;
  } catch {
    return "nuoiem-lovat.vercel.app";
  }
}
