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
  office: {
    address:
      "15 Ngách 352/15 đường Giải Phóng, Phường Phương Liệt, Thành phố Hà Nội, Việt Nam",
    street: "15 Ngách 352/15 đường Giải Phóng",
    locality: "Phường Phương Liệt",
    region: "Thành phố Hà Nội",
  },
  /** From Giấy chứng nhận đăng ký doanh nghiệp (22/05/2026). */
  companyRegistration: {
    legalName: "Công ty Cổ phần Doanh nghiệp Xã hội Quỹ Nuôi Em",
    legalNameEn: "NUOI EM FOUNDATION SOCIAL ENTERPRISE JOINT STOCK COMPANY",
    tradeName: "QUỸ NUÔI EM",
    /** Mã số doanh nghiệp / mã số thuế */
    enterpriseCode: "0111510373",
    firstRegisteredAt: "22/05/2026",
    issuedBy:
      "Phòng Đăng ký kinh doanh và Tài chính doanh nghiệp — Sở Tài chính Thành phố Hà Nội",
    charterCapitalVnd: "50.000.000",
    legalRepresentative: "Hoàng Hoa Trung",
    legalRepresentativeTitle: "Giám đốc",
  },
  social: {
    facebook: "https://www.facebook.com/duannuoiem",
    messenger: "https://www.messenger.com/t/duannuoiem",
    group: "https://www.facebook.com/groups/485546695224919",
  },
  financeUrl: "https://taichinh.nuoiem.com",
  donateQrPath: "/qr.png",
} as const;
