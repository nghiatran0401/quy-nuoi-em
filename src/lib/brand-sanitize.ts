import { rewriteLegacyFinanceUrls } from "@/lib/finance-url";

const CANONICAL_BRAND = "Quỹ Nuôi Em";

/** Unwrap Next.js image optimizer URLs to the underlying CDN URL. */
export function unwrapProxiedImageUrl(url: string | undefined): string | undefined {
  if (!url?.trim()) return undefined;
  if (!url.includes("_next/image")) return url;
  try {
    const parsed = new URL(url);
    const inner = parsed.searchParams.get("url");
    if (inner) return decodeURIComponent(inner);
  } catch {
    /* keep original */
  }
  return url;
}

/** Rewrite broken Next image proxy URLs inside markdown or plain text. */
function unwrapEmbeddedImageUrls(text: string): string {
  return text.replace(
    /https?:\/\/\/_next\/image\?url=([^&)\s]+)(?:&[^)\s]*)?/gi,
    (_, encoded: string) => decodeURIComponent(encoded),
  );
}

/** Normalize legacy fund naming in display copy. */
export function sanitizeBrandText(text: string): string {
  let out = unwrapEmbeddedImageUrls(text)
    .replace(/DỰ ÁN NUÔI EM/gi, "QUỸ NUÔI EM")
    .replace(/Dự án Nuôi Em/gi, CANONICAL_BRAND);

  out = rewriteLegacyFinanceUrls(out);
  out = out.replace(/ {2,}/g, " ");

  return out.replace(/\n{3,}/g, "\n\n").trim();
}

export function isAllowedNewsImage(url: string | undefined): boolean {
  if (!url) return false;
  const clean = unwrapProxiedImageUrl(url) ?? url;
  return (
    clean.startsWith("/") ||
    clean.includes("supabase.co") ||
    clean.includes("wixstatic.com") ||
    clean.includes("fbcdn.net") ||
    clean.includes("facebook.com")
  );
}
