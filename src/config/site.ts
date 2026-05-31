import { brandVisual } from "@/config/brand-visual";
import { publicCatalog } from "@/config/public-catalog";

/** Default share image (1200×630 recommended; hero works for social previews). */
export const DEFAULT_OG_IMAGE_PATH = brandVisual.heroImage;

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
  twitterHandle: undefined as string | undefined,
  defaultOgImage: DEFAULT_OG_IMAGE_PATH,
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
