import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { DEFAULT_OG_IMAGE_PATH } from "@/config/site";
import { absoluteAssetUrl } from "@/lib/seo/paths";

describe("SEO assets", () => {
  it("ships the default Open Graph image for social crawlers", () => {
    const filePath = resolve(process.cwd(), "public", DEFAULT_OG_IMAGE_PATH.replace(/^\//, ""));
    expect(existsSync(filePath)).toBe(true);
  });

  it("resolves relative asset paths to absolute URLs", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://quynuoiem.com";
    expect(absoluteAssetUrl("/hero.jpg")).toBe("https://quynuoiem.com/hero.jpg");
    expect(absoluteAssetUrl("https://cdn.example.com/a.jpg")).toBe("https://cdn.example.com/a.jpg");
  });
});
