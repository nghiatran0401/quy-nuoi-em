/** Vietnamese UI copy (nav, footer, home hero fallbacks, root metadata). */
export const siteCopy = {
  metadata: {
    title: "Dự án Nuôi Em - Nuôi cơm trưa, giúp trẻ tới trường",
    description:
      "Nuôi Em kết nối anh chị nuôi với trẻ vùng cao qua mã NE minh bạch — 150.000đ/tháng giúp bé no bụng và đến trường.",
    keywords:
      "Nuôi Em, dự án nuôi em, nuôi trẻ vùng cao, bảo trợ trẻ em, quyên góp, mã NE, cơm trưa, thiện nguyện, minh bạch tài chính",
  },
  nav: {
    about: "Giới thiệu",
    process2026: "Quy trình 2026",
    children: "Danh sách trẻ",
    reports: "Báo cáo",
    news: "Bản tin",
    statements: "Sao kê",
    contact: "Liên hệ",
    donate: "Đóng góp",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
  },
  footer: {
    companyName: "Dự án Nuôi Em",
    tagline: "Chương trình nuôi cơm trưa cho trẻ vùng cao",
    financePrefix: "Minh bạch tài chính tại",
    coverage: "Hỗ trợ trẻ bản cao tại hơn 25 tỉnh thành",
    info: "Thông tin",
    documents: "Văn bản, biểu mẫu",
    library: "Thư viện",
    vision: "Tầm nhìn sứ mệnh",
    history: "Lịch sử hình thành",
    logoStory: "Câu chuyện thương hiệu",
    organization: "Cơ cấu tổ chức",
    members: "Đối tác đồng hành",
    careers: "Tuyển dụng",
    process: "Quy trình nhận mã",
    scoring: "Thang điểm xét duyệt",
    volunteer: "Đăng ký tình nguyện viên",
    mou: "Biên bản ghi nhớ",
    photos: "Hình ảnh",
    activities: "Hoạt động",
    letters: "Thư gửi dự án",
    rights: "Dự án Nuôi Em. Bảo lưu mọi quyền.",
  },
  home: {
    eyebrow: "Bữa cơm níu chân trẻ tới trường",
    title: "Dự án Nuôi Em",
    description:
      "150.000đ - 170.000đ mỗi tháng giúp bé vùng cao no bụng, đi học đầy đủ. Biết rõ bé nào, có thể đi thăm — mỗi em một mã NE, mỗi em một người nuôi.",
    sponsorNow: "Đóng góp ngay",
    learnMore: "Tìm hiểu thêm",
  },
} as const;

export type NavLabelKey = keyof typeof siteCopy.nav;
export type FooterLabelKey = keyof typeof siteCopy.footer;
