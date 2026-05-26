import { brandVisual } from "@/config/brand-visual";
import { getSiteUrl, siteConfig, siteName } from "@/config/site";
import type { Locale } from "@/i18n/config";
import { absoluteUrl } from "@/lib/seo/paths";

const SITE_URL = getSiteUrl();

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_ID = `${SITE_URL}/#logo`;

type JsonLdObject = Record<string, unknown>;

function inLanguage(locale: Locale): string {
  return locale === "vi" ? "vi-VN" : "en-US";
}

function logoImageObject(): JsonLdObject {
  return {
    "@type": "ImageObject",
    "@id": LOGO_ID,
    url: `${SITE_URL}${brandVisual.logo.default}`,
    width: 512,
    height: 512,
    caption: brandVisual.name,
  };
}

function postalAddress(): JsonLdObject {
  return {
    "@type": "PostalAddress",
    streetAddress: "383 Nguyễn Duy Trinh",
    addressLocality: "Phường Bình Trưng",
    addressRegion: "TP. Hồ Chí Minh",
    addressCountry: "VN",
  };
}

function contactPoints(locale: Locale): JsonLdObject[] {
  const available = ["Vietnamese", locale === "en" ? "English" : null].filter(
    Boolean,
  ) as string[];
  return [
    {
      "@type": "ContactPoint",
      contactType: locale === "vi" ? "khách hàng / nhà tài trợ" : "customer support",
      telephone: `+84${brandVisual.contact.phone.replace(/^0/, "")}`,
      email: brandVisual.contact.email,
      availableLanguage: available,
      areaServed: "VN",
    },
    {
      "@type": "ContactPoint",
      contactType: "donations",
      email: brandVisual.contact.email,
      url: absoluteUrl("/dong-gop", locale),
      availableLanguage: available,
      areaServed: "VN",
    },
  ];
}

const ORGANIZATION_KEYWORDS_VI = [
  "Dự án Nuôi Em",
  "Nuôi Em",
  "mã NE",
  "bảo trợ trẻ em",
  "trẻ vùng cao",
  "trẻ mồ côi",
  "cơm trưa cho trẻ",
  "thiện nguyện minh bạch",
  "anh chị nuôi",
  "Ánh Sáng Núi Rừng",
];

const ORGANIZATION_KEYWORDS_EN = [
  "Nuoi Em Project",
  "child sponsorship Vietnam",
  "NE code",
  "highland children",
  "orphan children Vietnam",
  "school lunch program",
  "transparent charity",
  "Vietnam non-profit",
];

export function organizationJsonLd(locale: Locale): JsonLdObject {
  const name = siteName(locale);
  const description =
    locale === "vi"
      ? "Dự án Nuôi Em kết nối anh chị nuôi với trẻ vùng cao qua mã NE minh bạch — 150.000đ/tháng giúp bé no bụng và đến trường."
      : "Nuoi Em Project connects sponsors with highland children in Vietnam through transparent NE codes — 150,000 VND per month for school meals and education.";

  return {
    "@context": "https://schema.org",
    "@type": ["NGO", "NonprofitOrganization"],
    "@id": ORGANIZATION_ID,
    name,
    alternateName:
      locale === "vi"
        ? [brandVisual.shortName, "Nuoi Em Project"]
        : [brandVisual.name, brandVisual.shortName],
    legalName: brandVisual.name,
    url: SITE_URL,
    logo: logoImageObject(),
    image: `${SITE_URL}${brandVisual.heroImage}`,
    description,
    slogan: brandVisual.tagline,
    email: brandVisual.contact.email,
    telephone: `+84${brandVisual.contact.phone.replace(/^0/, "")}`,
    foundingDate: "2020-10",
    foundingLocation: {
      "@type": "Place",
      name: "Việt Nam",
      address: { "@type": "PostalAddress", addressCountry: "VN" },
    },
    address: postalAddress(),
    areaServed: {
      "@type": "Country",
      name: "Việt Nam",
    },
    nonprofitStatus: "NonprofitType",
    knowsAbout:
      locale === "vi"
        ? [
            "Bảo trợ trẻ mồ côi",
            "Hỗ trợ giáo dục vùng cao",
            "Minh bạch tài chính thiện nguyện",
            "Cơm trưa học đường",
          ]
        : [
            "Orphan child sponsorship",
            "Highland education support",
            "Charity financial transparency",
            "School lunch programs",
          ],
    keywords:
      locale === "vi"
        ? ORGANIZATION_KEYWORDS_VI.join(", ")
        : ORGANIZATION_KEYWORDS_EN.join(", "),
    contactPoint: contactPoints(locale),
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.messenger,
      siteConfig.social.facebookGroup,
      brandVisual.financeUrl,
    ].filter(Boolean),
    potentialAction: {
      "@type": "DonateAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl("/dong-gop", locale),
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      name: locale === "vi" ? "Đóng góp cho Dự án Nuôi Em" : "Donate to Nuoi Em Project",
      recipient: { "@id": ORGANIZATION_ID },
    },
  };
}

export function websiteJsonLd(locale: Locale): JsonLdObject {
  const name = siteName(locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name,
    alternateName: locale === "vi" ? "Nuoi Em Project" : brandVisual.name,
    url: SITE_URL,
    description: brandVisual.tagline,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: [inLanguage("vi"), inLanguage("en")],
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
  imageUrl,
  datePublished,
  dateModified,
  breadcrumbId,
}: {
  locale: Locale;
  title: string;
  description: string;
  pathname: string;
  imageUrl?: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumbId?: string;
}): JsonLdObject {
  const url = absoluteUrl(pathname, locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    inLanguage: inLanguage(locale),
    ...(imageUrl ? { primaryImageOfPage: { "@type": "ImageObject", url: imageUrl } } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(breadcrumbId ? { breadcrumb: { "@id": breadcrumbId } } : {}),
  };
}

export type BreadcrumbItem = { name: string; pathname: string };

export function breadcrumbJsonLd(
  items: BreadcrumbItem[],
  locale: Locale,
  id?: string,
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    ...(id ? { "@id": id } : {}),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.pathname, locale),
    })),
  };
}

/** Builds a localized breadcrumb starting with the home page. */
export function siteBreadcrumb(
  trail: BreadcrumbItem[],
  locale: Locale,
  id?: string,
): JsonLdObject {
  const home: BreadcrumbItem = {
    name: locale === "vi" ? "Trang chủ" : "Home",
    pathname: "/",
  };
  return breadcrumbJsonLd([home, ...trail], locale, id);
}

export function articleJsonLd({
  locale,
  title,
  description,
  pathname,
  imageUrl,
  datePublished,
  dateModified,
  section,
  tags,
}: {
  locale: Locale;
  title: string;
  description: string;
  pathname: string;
  imageUrl?: string;
  datePublished?: string;
  dateModified?: string;
  section?: string;
  tags?: string[];
}): JsonLdObject {
  const url = absoluteUrl(pathname, locale);
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${url}#article`,
    headline: title.slice(0, 110),
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage` },
    image: imageUrl
      ? [
          {
            "@type": "ImageObject",
            url: imageUrl,
            width: 1200,
            height: 630,
          },
        ]
      : undefined,
    datePublished: datePublished || undefined,
    dateModified: dateModified || datePublished || undefined,
    author: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: siteName(locale),
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: siteName(locale),
      logo: logoImageObject(),
    },
    inLanguage: inLanguage(locale),
    isAccessibleForFree: true,
    articleSection: section,
    keywords: tags?.length ? tags.join(", ") : undefined,
  };
}

export function childProfileJsonLd({
  locale,
  code,
  name,
  province,
  pathname,
  imageUrl,
}: {
  locale: Locale;
  code: string;
  name: string;
  province?: string;
  pathname: string;
  imageUrl?: string;
}): JsonLdObject {
  const url = absoluteUrl(pathname, locale);
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#profile`,
    url,
    name: `${code} — ${name}`,
    inLanguage: inLanguage(locale),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    ...(imageUrl
      ? { primaryImageOfPage: { "@type": "ImageObject", url: imageUrl } }
      : {}),
    mainEntity: {
      "@type": "Person",
      identifier: code,
      name,
      ...(province
        ? {
            homeLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressRegion: province,
                addressCountry: "VN",
              },
            },
          }
        : {}),
    },
  };
}

export type FaqEntry = { question: string; answer: string };

export function faqPageJsonLd(items: FaqEntry[], locale: Locale): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: inLanguage(locale),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export type ItemListEntry = { name: string; pathname: string; description?: string };

export function itemListJsonLd({
  name,
  description,
  items,
  locale,
}: {
  name: string;
  description?: string;
  items: ItemListEntry[];
  locale: Locale;
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    inLanguage: inLanguage(locale),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.pathname, locale),
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export function collectionPageJsonLd({
  locale,
  title,
  description,
  pathname,
  hasPart,
}: {
  locale: Locale;
  title: string;
  description: string;
  pathname: string;
  hasPart?: JsonLdObject;
}): JsonLdObject {
  const url = absoluteUrl(pathname, locale);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name: title,
    description,
    inLanguage: inLanguage(locale),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    ...(hasPart ? { hasPart } : {}),
  };
}

export function donatePageJsonLd({
  locale,
  title,
  description,
  pathname,
}: {
  locale: Locale;
  title: string;
  description: string;
  pathname: string;
}): JsonLdObject {
  const url = absoluteUrl(pathname, locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: inLanguage(locale),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    potentialAction: {
      "@type": "DonateAction",
      name: locale === "vi" ? "Đóng góp cho Dự án Nuôi Em" : "Donate to Nuoi Em Project",
      target: {
        "@type": "EntryPoint",
        urlTemplate: url,
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      recipient: { "@id": ORGANIZATION_ID },
      price: 150000,
      priceCurrency: "VND",
      description:
        locale === "vi"
          ? "Mức bảo trợ tham khảo 150.000 – 170.000đ/tháng cho mỗi mã NE."
          : "Suggested sponsorship 150,000 – 170,000 VND per month per NE code.",
    },
  };
}
