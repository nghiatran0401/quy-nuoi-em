import { brandVisual } from "@/config/brand-visual";
import { getSiteUrl, siteConfig, siteName } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { absoluteUrl } from "@/lib/seo/paths";

const ORG_ID = `${getSiteUrl()}/#organization`;
const WEBSITE_ID = `${getSiteUrl()}/#website`;

export function organizationJsonLd(locale: Locale) {
  const name = siteName(locale);
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": ORG_ID,
    name,
    alternateName: brandVisual.shortName,
    url: getSiteUrl(),
    logo: `${getSiteUrl()}${brandVisual.logo.default}`,
    description: brandVisual.tagline,
    email: brandVisual.contact.email,
    telephone: brandVisual.contact.phone,
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.messenger,
      siteConfig.social.facebookGroup,
      brandVisual.financeUrl,
    ].filter(Boolean),
  };
}

export function websiteJsonLd(locale: Locale) {
  const name = siteName(locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name,
    url: getSiteUrl(),
    description: brandVisual.tagline,
    publisher: { "@id": ORG_ID },
    inLanguage: locale === "vi" ? "vi-VN" : "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/danh-sach-bao-tro", locale)}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function webPageJsonLd({
  locale,
  title,
  description,
  pathname,
}: {
  locale: Locale;
  title: string;
  description: string;
  pathname: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(pathname, locale),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: locale === "vi" ? "vi-VN" : "en-US",
  };
}

export function breadcrumbJsonLd(
  items: { name: string; pathname: string }[],
  locale: Locale,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.pathname, locale),
    })),
  };
}

export function articleJsonLd({
  locale,
  title,
  description,
  pathname,
  imageUrl,
  datePublished,
}: {
  locale: Locale;
  title: string;
  description: string;
  pathname: string;
  imageUrl?: string;
  datePublished?: string;
}) {
  const url = absoluteUrl(pathname, locale);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    mainEntityOfPage: url,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: datePublished || undefined,
    author: { "@id": ORG_ID },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: siteName(locale),
      logo: {
        "@type": "ImageObject",
        url: `${getSiteUrl()}${brandVisual.logo.default}`,
      },
    },
    inLanguage: locale === "vi" ? "vi-VN" : "en-US",
  };
}

export function childProfileJsonLd({
  locale,
  code,
  name,
  pathname,
}: {
  locale: Locale;
  code: string;
  name: string;
  pathname: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${code} — ${name}`,
    url: absoluteUrl(pathname, locale),
    mainEntity: {
      "@type": "Person",
      identifier: code,
      name,
    },
    isPartOf: { "@id": WEBSITE_ID },
  };
}
