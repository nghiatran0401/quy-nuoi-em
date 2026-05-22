import type { Metadata } from "next";
import {
  DEFAULT_OG_IMAGE_PATH,
  getMetadataBase,
  localeOgLocale,
  siteConfig,
  siteName,
} from "@/config/site";
import { locales, type Locale } from "@/i18n/config";
import { absoluteUrl, alternateLanguages, localizedPath } from "@/lib/seo/paths";

export type BuildMetadataOptions = {
  locale: Locale;
  /** Page title without site suffix (layout template adds site name). */
  title: string;
  description: string;
  /** App path e.g. `/about`, `/news/my-slug` */
  pathname: string;
  keywords?: string[];
  ogImage?: string | null;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  /** Override canonical path (defaults to pathname) */
  canonicalPathname?: string;
};

function resolveImageUrl(imagePath: string | undefined | null): string {
  const path = imagePath?.trim() || DEFAULT_OG_IMAGE_PATH;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const base = getMetadataBase();
  return new URL(path.startsWith("/") ? path.slice(1) : path, base).toString();
}

function stripMarkdown(text: string, maxLength = 160): string {
  const plain = text
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/[#*_`>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength - 1).trim()}…`;
}

export function buildMetadata(options: BuildMetadataOptions): Metadata {
  const {
    locale,
    title,
    description,
    pathname,
    keywords,
    ogImage,
    ogType = "website",
    publishedTime,
    modifiedTime,
    noIndex = false,
    canonicalPathname = pathname,
  } = options;

  const name = siteName(locale);
  const desc = stripMarkdown(description, 200);
  const canonical = absoluteUrl(canonicalPathname, locale);
  const imageUrl = resolveImageUrl(ogImage);
  const languages = alternateLanguages(pathname);

  const openGraph: Metadata["openGraph"] = {
    type: ogType,
    locale: localeOgLocale(locale),
    alternateLocale: locales.filter((l) => l !== locale).map(localeOgLocale),
    url: canonical,
    siteName: name,
    title,
    description: desc,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    ...(ogType === "article" && publishedTime
      ? {
          publishedTime,
          ...(modifiedTime ? { modifiedTime } : {}),
        }
      : {}),
  };

  const twitter: Metadata["twitter"] = {
    card: "summary_large_image",
    title,
    description: desc,
    images: [imageUrl],
    ...(siteConfig.twitterHandle
      ? { site: siteConfig.twitterHandle, creator: siteConfig.twitterHandle }
      : {}),
  };

  return {
    title,
    description: desc,
    keywords: keywords?.length ? keywords : undefined,
    metadataBase: getMetadataBase(),
    alternates: {
      canonical,
      languages,
    },
    openGraph,
    twitter,
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function buildRootMetadata({
  locale,
  title,
  description,
  keywords,
}: {
  locale: Locale;
  title: string;
  description: string;
  keywords?: string[];
}): Metadata {
  const name = siteName(locale);
  const base = buildMetadata({
    locale,
    title,
    description,
    pathname: "/",
    keywords,
    ogType: "website",
  });

  return {
    ...base,
    title: {
      default: title,
      template: `%s | ${name}`,
    },
  };
}

export { stripMarkdown };
