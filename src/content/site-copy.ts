/** Vietnamese UI copy (nav, footer, home hero fallbacks, root metadata). */
export const siteCopy = {
  metadata: {
    title: "Quỹ Nuôi Em - Nuôi cơm trưa, giúp trẻ tới trường",
    /** Shorter label for Open Graph / Zalo / Facebook link previews. */
    ogTitle: "Quỹ Nuôi Em",
    description:
      "Nuôi cơm trưa cho trẻ vùng cao: mỗi em một mã NE, một người nuôi. 150.000–170.000đ/tháng, minh bạch thu chi, tra cứu hồ sơ và đi thăm bé trên quynuoiem.com.",
    keywords:
      "Nuôi Em, quỹ nuôi em, quynuoiem, nuôi trẻ vùng cao, bảo trợ trẻ em, mã NE, cơm trưa học đường, quyên góp thiện nguyện, minh bạch tài chính, Điện Biên, Hà Giang, Tây Nguyên, nhận nuôi em",
  },
  nav: {
    children: "Điểm trường",
    donors: "Nhà tài trợ",
    maGhep: "Mã ghép",
    catalog: "Tra cứu mã",
    reports: "Báo cáo",
    news: "Bản tin",
    statements: "Sao kê",
    taiChinh: "Tài chính",
    contact: "Liên hệ",
    donate: "Đóng góp",
    receiveCode: "Nhận mã qua Fanpage",
    receiveCodeShort: "Nhận mã",
    openMenu: "Mở menu",
    closeMenu: "Đóng menu",
  },
  buildNotice: {
    prefix: "Lưu ý:",
    body: "Hệ thống website đang được hoàn thiện và tối ưu dữ liệu liên tục. Nếu gặp bất kỳ sự cố kỹ thuật hoặc thông tin chưa chính xác nào, mong anh chị",
    line1Closing: "gửi phản hồi về",
    linkLabel: "Fanpage",
    suffix: "để Ban điều hành Dự án kiểm tra và cập nhật lại ❤",
    closeLabel: "Đóng thông báo",
  },
  footer: {
    projectName: "Quỹ Nuôi Em",
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
    coverage: "Hỗ trợ trẻ bản cao tại 12 tỉnh",
    rights: "Quỹ Nuôi Em. Bảo lưu mọi quyền.",
  },
  home: {
    eyebrow: "Bữa cơm níu chân trẻ tới trường",
    title: "Quỹ Nuôi Em",
    description:
      'Trên những mái nhà tranh vùng cao, chỉ từ 150.000đ – 170.000đ mỗi tháng, anh chị đã mang đến những bữa cơm trưa no bụng, giữ bước chân các em nhỏ đi học đều đặn. Với mô hình "Mỗi mã NE tương ứng 1 bữa ăn", anh chị sẽ biết rõ thông tin và có thể đến thăm em nuôi của mình.',
    sponsorNow: "Đóng góp ngay",
    learnMore: "Tra cứu mã",
  },
  homePopup: {
    eyebrow: "NUÔI EM",
    titlePrefix: "Nhận mã NE qua chatbot",
    titleHighlight: "Fanpage Nuôi Em",
    descriptionPrefix: "Chỉ 2 phút – nhắn",
    descriptionBold: "Nhận mã nuôi em",
    descriptionSuffix: "và làm theo hướng dẫn.",
    fanpageButton: "Fanpage Nuôi Em",
    chatbotButton: "Cấp mã chatbot",
    closeLabel: "Đóng",
    imageAlt: "Các em nhỏ tham gia chương trình Nuôi Em tại điểm trường vùng cao",
  },
} as const;

export type NavLabelKey = keyof typeof siteCopy.nav;
