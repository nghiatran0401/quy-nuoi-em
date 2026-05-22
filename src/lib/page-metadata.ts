import type { Metadata } from "next";
import type { DataPageKey } from "@/content/pages/data-pages";
import { getDataPageMeta } from "@/content/pages/data-pages";
import type { StaticPageKey } from "@/content/pages/static-pages";
import { getStaticPageMeta } from "@/content/pages/static-pages";
import type { PageMeta } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { buildMetadata, type BuildMetadataOptions } from "@/lib/seo/metadata";
import { DATA_PAGE_PATHS, STATIC_PAGE_PATHS } from "@/lib/seo/routes";

type PageMetadataOptions = Pick<
  BuildMetadataOptions,
  "ogImage" | "ogType" | "publishedTime" | "keywords" | "noIndex"
>;

export function createPageMetadata(
  meta: PageMeta,
  locale: Locale,
  pathname: string,
  options?: PageMetadataOptions,
): Metadata {
  return buildMetadata({
    locale,
    title: meta.title,
    description: meta.description,
    pathname,
    ...options,
  });
}

export function createStaticPageMetadata(
  page: StaticPageKey,
  locale: Locale,
  options?: PageMetadataOptions,
): Metadata {
  return createPageMetadata(getStaticPageMeta(page, locale), locale, STATIC_PAGE_PATHS[page], options);
}

export function createDataPageMetadata(
  page: DataPageKey,
  locale: Locale,
  options?: PageMetadataOptions,
): Metadata {
  return createPageMetadata(getDataPageMeta(page, locale), locale, DATA_PAGE_PATHS[page], options);
}
