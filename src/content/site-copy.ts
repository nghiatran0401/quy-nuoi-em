/** Vietnamese UI copy (nav, footer, home hero fallbacks, root metadata). */
export const siteCopy = {
  metadata: {
    title: "Dự án Nuôi Em - Nuôi cơm trưa, giúp trẻ tới trường",
    /** Shorter label for Open Graph / Zalo / Facebook link previews. */
    ogTitle: "Dự án Nuôi Em",
    description:
      "Nuôi cơm trưa cho trẻ vùng cao: mỗi em một mã NE, một người nuôi. 150.000–170.000đ/tháng, minh bạch thu chi, tra cứu hồ sơ và đi thăm bé trên quynuoiem.com.",
    keywords:
      "Nuôi Em, dự án nuôi em, quynuoiem, nuôi trẻ vùng cao, bảo trợ trẻ em, mã NE, cơm trưa học đường, quyên góp thiện nguyện, minh bạch tài chính, Điện Biên, Hà Giang, Tây Nguyên, nhận nuôi em",
  },
  nav: {
    about: "Giới thiệu",
    process2026: "Quy trình 2026",
    children: "Điểm trường",
    catalog: "Tra cứu mã",
    reports: "Báo cáo",
    news: "Bản tin",
    statements: "Sao kê",
    contact: "Liên hệ",
    donate: "Đóng góp",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
  },
  footer: {
    projectName: "Dự án Nuôi Em",
    taxCode: "Mã số thuế",
    businessLicense: "Giấy ĐKKD số",
    enterpriseTypeSuffix: "DNXH",
    issuedOn: "Cấp ngày",
    issuedBy: "bởi",
    registeredAddress: "Địa chỉ",
    registrationSection: "Thông tin đăng ký",
    resourcesSection: "Liên kết",
    contactSection: "Liên hệ",
    facebookPage: "Fanpage Facebook",
    tagline: "Chương trình nuôi cơm trưa cho trẻ vùng cao",
    financePrefix: "Minh bạch tài chính tại",
    catalogPrefix: "Tra cứu mã & danh mục em nuôi tại",
    coverage: "Hỗ trợ trẻ bản cao tại hơn 25 tỉnh thành",
    rights: "Dự án Nuôi Em. Bảo lưu mọi quyền.",
  },
  home: {
    eyebrow: "Bữa cơm níu chân trẻ tới trường",
    title: "Dự án Nuôi Em",
    description:
      "Trên những mái nhà tranh vùng cao, 150.000–170.000đ mỗi tháng là đủ để một em no bụng và đi học đầy đủ. Anh chị biết rõ em nào, có thể đến thăm — mỗi em một mã NE, mỗi em một người nuôi.",
    sponsorNow: "Đóng góp ngay",
    learnMore: "Tìm hiểu thêm",
  },
} as const;

export type NavLabelKey = keyof typeof siteCopy.nav;
