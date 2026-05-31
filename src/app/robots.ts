import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin", "/admin/", "/admin/*"],
      },
      {
        userAgent: "facebookexternalhit",
        allow: "/",
        disallow: ["/admin", "/admin/", "/admin/*"],
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
        disallow: ["/admin", "/admin/", "/admin/*"],
      },
      {
        userAgent: "LinkedInBot",
        allow: "/",
        disallow: ["/admin", "/admin/", "/admin/*"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
