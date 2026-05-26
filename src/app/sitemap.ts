import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/site";
import { getAllSitemapEntries } from "@/lib/seo/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const buildTime = new Date();
  const entries = await getAllSitemapEntries();

  return entries.map((entry) => ({
    url: `${base}${entry.pathname === "/" ? "" : entry.pathname}`,
    lastModified: entry.lastModified ? new Date(entry.lastModified) : buildTime,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    alternates: {
      languages: entry.alternates,
    },
  }));
}
