import type { Metadata } from "next";
import { siteName } from "@/config/brand-visual";
import type { PageMeta } from "@/content/types";
import type { Locale } from "@/i18n/config";

export function createPageMetadata(meta: PageMeta, locale: Locale): Metadata {
  const name = siteName(locale);

  return {
    title: `${meta.title} | ${name}`,
    description: meta.description,
  };
}
