import type { Metadata } from "next";
import type { DataPageKey } from "@/content/pages/data-pages";
import { getDataPageMeta } from "@/content/pages/data-pages";
import type { StaticPageKey } from "@/content/pages/static-pages";
import { getStaticPageMeta } from "@/content/pages/static-pages";
import type { PageMeta } from "@/content/types";
import { buildMetadata, type BuildMetadataOptions } from "@/lib/seo/metadata";
import { DATA_PAGE_PATHS, STATIC_PAGE_PATHS } from "@/lib/seo/routes";

type PageMetadataOptions = Pick<
  BuildMetadataOptions,
  | "ogImage"
  | "ogImageAlt"
  | "ogType"
  | "publishedTime"
  | "modifiedTime"
  | "keywords"
  | "noIndex"
  | "articleSection"
  | "articleAuthors"
  | "articleTags"
>;

export function createPageMetadata(
  meta: PageMeta,
  pathname: string,
  options?: PageMetadataOptions,
): Metadata {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    pathname,
    ...options,
  });
}

export function createStaticPageMetadata(
  page: StaticPageKey,
  options?: PageMetadataOptions,
): Metadata {
  return createPageMetadata(getStaticPageMeta(page), STATIC_PAGE_PATHS[page], options);
}

export function createDataPageMetadata(
  page: DataPageKey,
  options?: PageMetadataOptions,
): Metadata {
  return createPageMetadata(getDataPageMeta(page), DATA_PAGE_PATHS[page], options);
}
