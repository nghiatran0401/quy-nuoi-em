import { afterEach, describe, expect, it } from "vitest";
import { buildMetadata } from "@/lib/seo/metadata";

describe("buildMetadata", () => {
  const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    if (originalSiteUrl === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
    }
  });

  it("sets canonical, Open Graph, and Twitter card fields", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://quynuoiem.com";

    const meta = buildMetadata({
      title: "Đóng góp",
      ogTitle: "Đóng góp | Nuôi Em",
      description: "Thông tin chuyển khoản **mã NE**.",
      pathname: "/dong-gop",
    });

    expect(meta.alternates?.canonical).toBe("https://quynuoiem.com/dong-gop");
    expect(meta.openGraph?.url).toBe("https://quynuoiem.com/dong-gop");
    expect(meta.openGraph?.title).toBe("Đóng góp | Nuôi Em");
    expect(meta.twitter?.card).toBe("summary_large_image");
    expect(meta.description).not.toContain("**");
    expect(meta.openGraph?.images?.[0]).toMatchObject({
      url: "https://quynuoiem.com/og/default.jpg",
      secureUrl: "https://quynuoiem.com/og/default.jpg",
    });
  });

  it("respects noIndex for admin-like routes", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://quynuoiem.com";

    const meta = buildMetadata({
      title: "Hidden",
      description: "Hidden page",
      pathname: "/hidden",
      noIndex: true,
    });

    expect(meta.robots).toMatchObject({ index: false, follow: false });
  });
});
