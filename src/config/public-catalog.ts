/**
 * Public catalog & NE code lookup (separate app at nuoiem2025.quynuoiem.com).
 * Set NEXT_PUBLIC_PUBLIC_CATALOG_URL.
 */
const DEFAULT_PUBLIC_CATALOG_URL = "https://nuoiem2025.quynuoiem.com/";
const NUOIEM2025_HOST = "nuoiem2025.quynuoiem.com";

/** Temporarily hide UI links to the catalog site. API calls to nuoiem2025 stay active. */
export const publicCatalogLinksEnabled = false;

export const publicCatalog = {
  url:
    process.env.NEXT_PUBLIC_PUBLIC_CATALOG_URL?.trim() || DEFAULT_PUBLIC_CATALOG_URL,
  title: "Danh mục em nuôi công khai",
  shortDescription:
    "Hệ thống minh bạch, công khai: Tra cứu mã NE và tổng hợp số liệu em nuôi theo tỉnh",
  ctaLabel: "Tra cứu mã NE",
  statsCtaLabel: "Xem danh mục & tra cứu",
} as const;

export function publicCatalogHost(): string {
  if (!publicCatalog.url) return "";
  try {
    return new URL(publicCatalog.url).host;
  } catch {
    return NUOIEM2025_HOST;
  }
}

export function isNuoiem2025SitePageUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;

  try {
    const parsed = new URL(trimmed);
    if (parsed.hostname !== NUOIEM2025_HOST) return false;
    return !parsed.pathname.startsWith("/api/");
  } catch {
    return false;
  }
}

/** Returns href when catalog page links are allowed; otherwise null. */
export function resolveCatalogPageHref(url: string): string | null {
  if (!publicCatalogLinksEnabled && isNuoiem2025SitePageUrl(url)) {
    return null;
  }

  return trimmedOrNull(url);
}

function trimmedOrNull(url: string): string | null {
  const trimmed = url.trim();
  return trimmed || null;
}
