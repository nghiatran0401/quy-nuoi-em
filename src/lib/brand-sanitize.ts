const LEGACY_SITE = /quytonybuoisang\.com/gi;
const LEGACY_HASHTAG = /#Quỹ[_\s]*TNBS/gi;
const TONY_SLUG = "quy-tony-buoi-sang-can-tim";
const NEW_SLUG = "du-an-nuoi-em-tuyen-giam-doc";

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
    .replace(LEGACY_SITE, "")
    .replace(/\[←[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[\*\*#Quỹ\\?_TNBS\*\*\]\([^)]*\)/gi, "Dự án Nuôi Em")
    .replace(LEGACY_HASHTAG, "Dự án Nuôi Em")
    .replace(/TONY BUỎI SÁNG/gi, "Dự án Nuôi Em")
    .replace(/TONY BUOI SANG/gi, "Dự án Nuôi Em")
    .replace(/\bFund\b/gi, "Dự án Nuôi Em");

  out = out
    .replace(/\[\*\*#Dự án Nuôi Em\\?_TNBS\*\*\]\([^)]*\)/gi, "Dự án Nuôi Em")
    .replace(/Dự án Nuôi Em TNBS/gi, "Dự án Nuôi Em")
    .replace(/\bTNBS\b/g, "")
    .replace(/Quỹ/g, "Dự án Nuôi Em")
    .replace(/Dự án Nuôi Em Nuôi Em/g, "Dự án Nuôi Em")
    .replace(/ {2,}/g, " ");

  return out.replace(/\n{3,}/g, "\n\n").trim();
}

export function normalizeNewsSlug(slug: string): string {
  return slug === TONY_SLUG ? NEW_SLUG : slug;
}

export function isAllowedNewsImage(url: string | undefined): boolean {
  if (!url) return false;
  const clean = unwrapProxiedImageUrl(url) ?? url;
  if (clean.includes("quytonybuoisang.com")) return false;
  return (
    clean.startsWith("/") ||
    clean.includes("supabase.co") ||
    clean.includes("wixstatic.com") ||
    clean.includes("fbcdn.net") ||
    clean.includes("facebook.com")
  );
}

export const legacyNewsSlugRedirect = {
  from: TONY_SLUG,
  to: NEW_SLUG,
} as const;
