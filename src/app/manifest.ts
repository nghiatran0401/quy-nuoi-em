import type { MetadataRoute } from "next";
import { brandVisual } from "@/config/brand-visual";
import { siteConfig } from "@/config/site";

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
        name: "Danh sách trẻ",
        short_name: "Danh sách",
        description: "Danh sách trẻ đang được bảo trợ",
        url: "/danh-sach-diem-truong-ho-tro",
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
