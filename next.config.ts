import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ckmvgvvcbqntbmhjzjof.supabase.co",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
    ],
  },
  async redirects() {
    const legacyNewsSlugs = [
      "quy-tony-buoi-sang-can-tim",
      "du-an-nuoi-em-tuyen-giam-doc",
      "vong-2-dot-xet-duyet-18",
      "chuc-mung-91-ho-so-vuot-qua-vong-1-tien-vao-vong-2-dot-xet-duyet-lan-thu-17",
      "chuc-mung-37-em-nho-trong-dot-xet-duyet-17",
      "hanh-trinh-05-nam-yeu-thuong-truong-thanh",
      "gieo-yeu-thuong-giua-dai-ngan-dak-lak",
      "chuc-mung-28-tre-duoc-bao-tro-dot-xet-duyet-lan-16",
      "thong-tin-dot-xet-duyet-16",
      "buoi-gap-mat-mua-he-cua-quy-cung-cac-tre-bao-tro-tai-tphcm",
      "buoi-sinh-hoat-tre-ha-nam",
    ];

    return legacyNewsSlugs.flatMap((slug) => [
      { source: `/news/${slug}`, destination: "/news", permanent: true },
      { source: `/en/news/${slug}`, destination: "/en/news", permanent: true },
    ]);
  },
};

export default withNextIntl(nextConfig);
