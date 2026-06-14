import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/config/site";

const SOCIAL_CRAWLERS = [
  "facebookexternalhit",
  "Facebot",
  "Twitterbot",
  "LinkedInBot",
  "WhatsApp",
  "TelegramBot",
  "Slackbot",
  "Discordbot",
  "Zalo",
  "ZaloBot",
  "Applebot",
  "Googlebot",
  "bingbot",
] as const;

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  const adminDisallow = ["/admin", "/admin/", "/admin/*"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", ...adminDisallow],
      },
      ...SOCIAL_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: adminDisallow,
      })),
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
