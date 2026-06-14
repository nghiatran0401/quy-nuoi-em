import type { Metadata } from "next";
import {
  DEFAULT_OG_IMAGE_PATH,
  getMetadataBase,
  getSiteUrl,
  localeOgLocale,
  OG_IMAGE_SIZE,
  siteConfig,
  siteName,
} from "@/config/site";
import { absoluteAssetUrl, absoluteUrl } from "@/lib/seo/paths";
import { getSiteVerification, getSocialMetaOther } from "@/lib/seo/verification";

export type BuildMetadataOptions = {
  /** Page title without site suffix (layout template adds site name). */
  title: string;
  description: string;
  /** App path e.g. `/about`, `/news/my-slug` */
  pathname: string;
  /** Social preview title when different from `title` (e.g. shorter for Facebook/Zalo). */
  ogTitle?: string;
  keywords?: string[];
  ogImage?: string | null;
  ogImageAlt?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  articleSection?: string;
  articleAuthors?: string[];
  articleTags?: string[];
  noIndex?: boolean;
  canonicalPathname?: string;
};

function imageMimeType(path: string): string {
  const lower = path.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  return "image/jpeg";
}

function resolveImageUrl(imagePath: string | undefined | null): string {
  return absoluteAssetUrl(imagePath?.trim() || DEFAULT_OG_IMAGE_PATH) ?? absoluteAssetUrl(DEFAULT_OG_IMAGE_PATH)!;
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
    title,
    description,
    pathname,
    ogTitle,
    keywords,
    ogImage,
    ogImageAlt,
    ogType = "website",
    publishedTime,
    modifiedTime,
    articleSection,
    articleAuthors,
    articleTags,
    noIndex = false,
    canonicalPathname = pathname,
  } = options;

  const name = siteName();
  const desc = stripMarkdown(description, 200);
  const socialTitle = ogTitle?.trim() || title;
  const canonical = absoluteUrl(canonicalPathname);
  const imageUrl = resolveImageUrl(ogImage);
  const imageType = imageMimeType(imageUrl);
  const isHttps = getSiteUrl().startsWith("https://");

  const openGraph: Metadata["openGraph"] = {
    type: ogType,
    locale: localeOgLocale(),
    url: canonical,
    siteName: name,
    title: socialTitle,
    description: desc,
    images: [
      {
        url: imageUrl,
        ...(isHttps ? { secureUrl: imageUrl } : {}),
        width: OG_IMAGE_SIZE.width,
        height: OG_IMAGE_SIZE.height,
        alt: ogImageAlt ?? socialTitle,
        type: imageType,
      },
    ],
    ...(ogType === "article"
      ? {
          ...(publishedTime ? { publishedTime } : {}),
          ...(modifiedTime ? { modifiedTime } : {}),
          ...(articleSection ? { section: articleSection } : {}),
          ...(articleAuthors?.length ? { authors: articleAuthors } : {}),
          ...(articleTags?.length ? { tags: articleTags } : {}),
        }
      : {}),
  };

  const twitter: Metadata["twitter"] = {
    card: "summary_large_image",
    title: socialTitle,
    description: desc,
    images: [
      {
        url: imageUrl,
        alt: ogImageAlt ?? socialTitle,
      },
    ],
    ...(siteConfig.twitterHandle
      ? { site: `@${siteConfig.twitterHandle}`, creator: `@${siteConfig.twitterHandle}` }
      : {}),
  };

  const verification = getSiteVerification();
  const socialOther = getSocialMetaOther();

  return {
    title,
    description: desc,
    keywords: keywords?.length ? keywords : undefined,
    metadataBase: getMetadataBase(),
    applicationName: name,
    authors: [{ name, url: getSiteUrl() }],
    creator: name,
    publisher: name,
    category: "Thiện nguyện",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      telephone: false,
      address: false,
      email: false,
    },
    alternates: {
      canonical,
    },
    openGraph,
    twitter,
    ...(verification ? { verification } : {}),
    ...(Object.keys(socialOther).length > 0 ? { other: socialOther } : {}),
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
            "max-image-preview": "none",
            "max-snippet": 0,
          },
        }
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
  title,
  description,
  keywords,
  ogTitle,
}: {
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
}): Metadata {
  const name = siteName();
  const base = buildMetadata({
    title,
    description,
    pathname: "/",
    keywords,
    ogType: "website",
    ogTitle,
    ogImageAlt: `${name} — ${siteConfig.tagline}`,
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
