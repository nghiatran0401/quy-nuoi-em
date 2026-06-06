import { describe, expect, it } from "vitest";
import {
  isNuoiem2025SitePageUrl,
  publicCatalogLinksEnabled,
  resolveCatalogPageHref,
} from "@/config/public-catalog";

describe("public-catalog link gating", () => {
  it("treats nuoiem2025 API URLs as non-page links", () => {
    expect(
      isNuoiem2025SitePageUrl("https://nuoiem2025.quynuoiem.com/api/cong-khai/thong-ke-tong-quan"),
    ).toBe(false);
  });

  it("treats nuoiem2025 site URLs as page links", () => {
    expect(isNuoiem2025SitePageUrl("https://nuoiem2025.quynuoiem.com/")).toBe(true);
    expect(
      isNuoiem2025SitePageUrl("https://nuoiem2025.quynuoiem.com/danh-sach-nha-tai-tro/NE00123"),
    ).toBe(true);
  });

  it("blocks catalog page hrefs while links are disabled", () => {
    expect(publicCatalogLinksEnabled).toBe(false);
    expect(resolveCatalogPageHref("https://nuoiem2025.quynuoiem.com/")).toBeNull();
    expect(
      resolveCatalogPageHref("https://nuoiem2025.quynuoiem.com/api/cong-khai/thong-ke-tong-quan"),
    ).toBe("https://nuoiem2025.quynuoiem.com/api/cong-khai/thong-ke-tong-quan");
    expect(resolveCatalogPageHref("https://quynuoiem.com/danh-sach-nha-tai-tro")).toBe(
      "https://quynuoiem.com/danh-sach-nha-tai-tro",
    );
  });
});
