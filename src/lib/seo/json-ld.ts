import { brandVisual } from "@/config/brand-visual";
import { publicCatalog } from "@/config/public-catalog";
import { DEFAULT_OG_IMAGE_PATH, getSiteUrl, siteConfig, siteName } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/paths";

const SITE_URL = getSiteUrl();

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_ID = `${SITE_URL}/#logo`;

type JsonLdObject = Record<string, unknown>;

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
  const { office } = brandVisual;
  return {
    "@type": "PostalAddress",
    streetAddress: office.street,
    addressLocality: office.locality,
    addressRegion: office.region,
    addressCountry: "VN",
  };
}

function contactPoints(): JsonLdObject[] {
  return [
    {
      "@type": "ContactPoint",
      contactType: "khách hàng / nhà tài trợ",
      telephone: `+84${brandVisual.contact.phone.replace(/^0/, "")}`,
      email: brandVisual.contact.email,
      availableLanguage: ["Vietnamese"],
      areaServed: "VN",
    },
    {
      "@type": "ContactPoint",
      contactType: "donations",
      email: brandVisual.contact.email,
      url: absoluteUrl("/dong-gop"),
      availableLanguage: ["Vietnamese"],
      areaServed: "VN",
    },
  ];
}

export function organizationJsonLd(): JsonLdObject {
  const name = siteName();
  return {
    "@context": "https://schema.org",
    "@type": ["NGO", "NonprofitOrganization"],
    "@id": ORGANIZATION_ID,
    name,
    alternateName: [brandVisual.shortName],
    legalName: brandVisual.companyRegistration.legalName,
    url: SITE_URL,
    logo: logoImageObject(),
    image: `${SITE_URL}${DEFAULT_OG_IMAGE_PATH}`,
    description:
      "Quỹ Nuôi Em kết nối anh chị nuôi với trẻ vùng cao qua mã NE minh bạch — 150.000–170.000đ/tháng giúp bé no bụng và đến trường.",
    slogan: brandVisual.tagline,
    email: brandVisual.contact.email,
    telephone: `+84${brandVisual.contact.phone.replace(/^0/, "")}`,
    foundingDate: "2014",
    foundingLocation: {
      "@type": "Place",
      name: "Việt Nam",
      address: { "@type": "PostalAddress", addressCountry: "VN" },
    },
    address: postalAddress(),
    areaServed: { "@type": "Country", name: "Việt Nam" },
    nonprofitStatus: "NonprofitType",
    knowsAbout: [
      "Bảo trợ trẻ có hoàn cảnh khó khăn",
      "Hỗ trợ giáo dục vùng cao",
      "Minh bạch tài chính thiện nguyện",
      "Cơm trưa học đường",
    ],
    keywords:
      "Quỹ Nuôi Em, Nuôi Em, mã NE, bảo trợ trẻ em, trẻ vùng cao, thiện nguyện minh bạch",
    contactPoint: contactPoints(),
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.messenger,
      siteConfig.social.facebookGroup,
      brandVisual.financeUrl,
      publicCatalog.url,
    ].filter(Boolean),
    potentialAction: {
      "@type": "DonateAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl("/dong-gop"),
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      name: "Đóng góp cho Quỹ Nuôi Em",
      recipient: { "@id": ORGANIZATION_ID },
    },
  };
}

export function websiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteName(),
    alternateName: [brandVisual.shortName, "quynuoiem.com", "Nuôi Em"],
    url: SITE_URL,
    description: brandVisual.tagline,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "vi-VN",
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${absoluteUrl("/danh-sach-diem-truong-ho-tro")}?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      {
        "@type": "ReadAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: absoluteUrl("/dong-gop"),
        },
        name: "Đóng góp cho Quỹ Nuôi Em",
      },
    ],
  };
}

export function webPageJsonLd({
  title,
  description,
  pathname,
  imageUrl,
  datePublished,
  dateModified,
  breadcrumbId,
}: {
  title: string;
  description: string;
  pathname: string;
  imageUrl?: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumbId?: string;
}): JsonLdObject {
  const url = absoluteUrl(pathname);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    inLanguage: "vi-VN",
    ...(imageUrl ? { primaryImageOfPage: { "@type": "ImageObject", url: imageUrl } } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(breadcrumbId ? { breadcrumb: { "@id": breadcrumbId } } : {}),
  };
}

export type BreadcrumbItem = { name: string; pathname: string };

export function breadcrumbJsonLd(items: BreadcrumbItem[], id?: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    ...(id ? { "@id": id } : {}),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.pathname),
    })),
  };
}

export function siteBreadcrumb(trail: BreadcrumbItem[], id?: string): JsonLdObject {
  return breadcrumbJsonLd([{ name: "Trang chủ", pathname: "/" }, ...trail], id);
}

export function articleJsonLd({
  title,
  description,
  pathname,
  imageUrl,
  datePublished,
  dateModified,
  section,
  tags,
}: {
  title: string;
  description: string;
  pathname: string;
  imageUrl?: string;
  datePublished?: string;
  dateModified?: string;
  section?: string;
  tags?: string[];
}): JsonLdObject {
  const url = absoluteUrl(pathname);
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${url}#article`,
    headline: title.slice(0, 110),
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage` },
    image: imageUrl
      ? [{ "@type": "ImageObject", url: imageUrl, width: 1200, height: 630 }]
      : undefined,
    datePublished: datePublished || undefined,
    dateModified: dateModified || datePublished || undefined,
    author: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: siteName(),
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: siteName(),
      logo: logoImageObject(),
    },
    inLanguage: "vi-VN",
    isAccessibleForFree: true,
    articleSection: section,
    keywords: tags?.length ? tags.join(", ") : undefined,
  };
}

export function childProfileJsonLd({
  code,
  name,
  province,
  pathname,
  imageUrl,
}: {
  code: string;
  name: string;
  province?: string;
  pathname: string;
  imageUrl?: string;
}): JsonLdObject {
  const url = absoluteUrl(pathname);
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#profile`,
    url,
    name: `${code} — ${name}`,
    inLanguage: "vi-VN",
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

export function faqPageJsonLd(items: FaqEntry[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "vi-VN",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export type ItemListEntry = { name: string; pathname: string; description?: string };

export function itemListJsonLd({
  name,
  description,
  items,
}: {
  name: string;
  description?: string;
  items: ItemListEntry[];
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    inLanguage: "vi-VN",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.pathname),
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export function collectionPageJsonLd({
  title,
  description,
  pathname,
  hasPart,
}: {
  title: string;
  description: string;
  pathname: string;
  hasPart?: JsonLdObject;
}): JsonLdObject {
  const url = absoluteUrl(pathname);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name: title,
    description,
    inLanguage: "vi-VN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    ...(hasPart ? { hasPart } : {}),
  };
}

export function donatePageJsonLd({
  title,
  description,
  pathname,
}: {
  title: string;
  description: string;
  pathname: string;
}): JsonLdObject {
  const url = absoluteUrl(pathname);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "vi-VN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    potentialAction: {
      "@type": "DonateAction",
      name: "Đóng góp cho Quỹ Nuôi Em",
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
      description: "Mức bảo trợ tham khảo 150.000 – 170.000đ/tháng cho mỗi mã NE.",
    },
  };
}
