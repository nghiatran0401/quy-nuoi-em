import type { MetadataRoute } from "next";
import { brandVisual } from "@/config/brand-visual";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#fffcf8",
    theme_color: "#f0784a",
    lang: "vi",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: brandVisual.logo.default,
        sizes: "200x202",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
