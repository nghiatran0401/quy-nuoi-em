import { brandVisual } from "@/config/brand-visual";
import { publicCatalog } from "@/config/public-catalog";

/** Default share image (1200×630; committed under public/og for reliable social crawlers). */
export const DEFAULT_OG_IMAGE_PATH = "/og/default.jpg";

export const siteConfig = {
  name: brandVisual.name,
  shortName: brandVisual.shortName,
  tagline: brandVisual.tagline,
  contact: brandVisual.contact,
  financeUrl: brandVisual.financeUrl,
  publicCatalogUrl: publicCatalog.url,
  social: {
    facebook: brandVisual.social.facebook,
    messenger: brandVisual.social.messenger,
    facebookGroup: brandVisual.social.group,
  },
  /** Optional @handle for X/Twitter cards (without @). */
  twitterHandle: undefined as string | undefined,
  defaultOgImage: DEFAULT_OG_IMAGE_PATH,
  /** Primary brand hashtags for social copy / metadata (lowercase, no #). */
  socialHashtags: ["nuoiem", "duannuoiem", "treemvungcao", "thiennguyen"] as const,
} as const;

export function siteName(): string {
  return brandVisual.name;
}

/**
 * Canonical site origin (no trailing slash).
 * Set `NEXT_PUBLIC_SITE_URL` in production (e.g. https://quynuoiem.com).
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  return "http://localhost:3000";
}

export function getMetadataBase(): URL {
  return new URL(`${getSiteUrl()}/`);
}

export function localeOgLocale(): string {
  return "vi_VN";
}
