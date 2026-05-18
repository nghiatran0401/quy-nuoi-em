/**
 * Dự án Nuôi Em — brand, content, and visual identity.
 * Colors: see `src/app/globals.css` (flame orange, ember brown, gold highlights).
 */
export const brandVisual = {
  name: "Dự án Nuôi Em",
  shortName: "Nuôi Em",
  tagline: "Nuôi cơm trưa và giúp trẻ tới trường",
  logo: {
    default: "/logo/logo-ne.png",
    onDark: "/logo/logo-ne.png",
    wide: "/logo/logo-ne-asnr.png",
  },
  heroImage: "/images/nuoiem/home-1528463943.jpg",
  contact: {
    email: "duannuoiem@gmail.com",
    phone: "0975302307",
    phoneDisplay: "0975 302 307",
  },
  social: {
    facebook: "https://www.facebook.com/duannuoiem",
    messenger: "https://www.messenger.com/t/duannuoiem",
    group: "https://www.facebook.com/groups/485546695224919",
  },
  financeUrl: "https://taichinh.nuoiem.com",
  donateQrPath: "/images/nuoiem/qr1-20221215184017-2izek.png",
} as const;

export function siteName(locale: "vi" | "en") {
  return locale === "vi" ? brandVisual.name : "Nuoi Em Project";
}
