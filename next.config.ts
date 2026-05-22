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
        hostname: "static.wixstatic.com",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/news/quy-tony-buoi-sang-can-tim",
        destination: "/news/du-an-nuoi-em-tuyen-giam-doc",
        permanent: true,
      },
      {
        source: "/en/news/quy-tony-buoi-sang-can-tim",
        destination: "/en/news/du-an-nuoi-em-tuyen-giam-doc",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
