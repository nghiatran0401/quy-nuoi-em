import { brandVisual } from "@/config/brand-visual";
import { defaultLocale, type Locale } from "@/i18n/config";

/** Default share image (1200×630 recommended; hero works for social previews). */
export const DEFAULT_OG_IMAGE_PATH = brandVisual.heroImage;

export const siteConfig = {
  name: brandVisual.name,
  shortName: brandVisual.shortName,
  tagline: brandVisual.tagline,
  defaultLocale,
  locales: ["vi", "en"] as const,
  contact: brandVisual.contact,
  financeUrl: brandVisual.financeUrl,
  social: {
    facebook: brandVisual.social.facebook,
    messenger: brandVisual.social.messenger,
    facebookGroup: brandVisual.social.group,
  },
  /** Twitter/X — set when available; OG still works without it */
  twitterHandle: undefined as string | undefined,
  defaultOgImage: DEFAULT_OG_IMAGE_PATH,
} as const;

export function siteName(locale: Locale): string {
  return locale === "vi" ? brandVisual.name : "Nuoi Em Project";
}

/**
 * Canonical site origin (no trailing slash).
 * Set `NEXT_PUBLIC_SITE_URL` in production (e.g. https://quy-nuoi-em.vercel.app).
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "https://quy-nuoi-em.vercel.app";
}

export function getMetadataBase(): URL {
  return new URL(`${getSiteUrl()}/`);
}

export function localeOgLocale(locale: Locale): string {
  return locale === "vi" ? "vi_VN" : "en_US";
}
