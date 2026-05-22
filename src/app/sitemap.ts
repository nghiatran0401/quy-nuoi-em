import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/site";
import { getAllSitemapEntries } from "@/lib/seo/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  return getAllSitemapEntries().map((entry) => ({
    url: `${base}${entry.pathname === "/" ? "" : entry.pathname}`,
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
