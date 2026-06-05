import type { MetadataRoute } from "next";
import { brandVisual } from "@/config/brand-visual";
import { siteConfig } from "@/config/site";
import { DATA_PAGE_PATHS } from "@/lib/seo/routes";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description:
      "Quỹ Nuôi Em — nuôi cơm trưa cho trẻ vùng cao qua mã NE minh bạch trên quynuoiem.com. 150.000–170.000đ/tháng.",
    start_url: "/",
    scope: "/",
    id: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fffcf8",
    theme_color: "#f0784a",
    lang: "vi-VN",
    dir: "ltr",
    categories: ["education", "social", "lifestyle"],
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
    shortcuts: [
      {
        name: "Đóng góp",
        short_name: "Đóng góp",
        description: "Trang đóng góp & thông tin chuyển khoản",
        url: "/dong-gop",
      },
      {
        name: "Điểm trường",
        short_name: "Điểm trường",
        description: "Danh sách điểm trường hỗ trợ",
        url: DATA_PAGE_PATHS.children,
      },
      {
        name: "Nhà tài trợ",
        short_name: "Nhà tài trợ",
        description: "Danh sách nhà tài trợ công khai",
        url: DATA_PAGE_PATHS.donors,
      },
      {
        name: "Bản tin",
        short_name: "Bản tin",
        description: "Tin tức & hoạt động mới nhất",
        url: "/news",
      },
    ],
  };
}
