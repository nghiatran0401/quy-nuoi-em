/**
 * Dự án Nuôi Em — brand, content, and visual identity.
 * Colors: see `src/app/globals.css` (Open Hearts — light sky, peach, sage, warm coral).
 */
export const brandVisual = {
  name: "Dự án Nuôi Em",
  shortName: "Nuôi Em",
  tagline: "Nuôi cơm trưa và giúp trẻ tới trường",
  logo: {
    /** Icon mark — transparent PNG for light header/footer */
    default: "/logo/logo-ne-transparent.png",
    /** Same mark; kept for API compatibility */
    onDark: "/logo/logo-ne-transparent.png",
    /** Horizontal lockup (Ánh Sáng Núi Rừng wordmark) */
    wide: "/logo/logo-ne-asnr-transparent.png",
    /** Opaque sources (black matte) — regenerate via `npm run logos:transparent` */
    opaque: {
      mark: "/logo/logo-ne.png",
      wide: "/logo/logo-ne-asnr.png",
    },
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
