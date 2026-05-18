import type { Metadata } from "next";
import type { PageMeta } from "@/content/types";
import type { Locale } from "@/i18n/config";

export function createPageMetadata(meta: PageMeta, locale: Locale): Metadata {
  const siteName = locale === "vi" ? "Quỹ Tony Buổi Sáng" : "Tony Buoi Sang Fund";

  return {
    title: `${meta.title} | ${siteName}`,
    description: meta.description,
  };
}
