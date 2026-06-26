import { brandVisual } from "@/config/brand-visual";
import { nuoiEmImage } from "@/lib/nuoiem-images";

/** Nội dung quy trình — đối chiếu https://www.nuoiem.com/ */

export type ProcessStepContent = {
  number: string;
  title: string;
  timing: string;
  summary: string;
  bullets: readonly string[];
  link?: { href: string; label: string };
};

export const processSteps2026: readonly ProcessStepContent[] = [
  {
    number: "01",
    title: "Nhận mã NE",
    timing: "Trong ~2 phút",
    summary:
      "Quỹ chỉ cấp mã qua tin nhắn trang Facebook Nuôi Em (chatbot tự động). Mỗi mã gắn với một anh chị nuôi duy nhất.",
    bullets: [
      "Ấn nút Nhận mã trên trang Facebook hoặc nhắn: «Nhận mã nuôi em».",
      "Hoặc chọn Menu «Nhận mã Nuôi Em» trong hộp thoại tin nhắn Fanpage.",
      "Không nhận mã qua comment công khai — dễ bỏ lỡ tin nhắn.",
    ],
  },
  {
    number: "02",
    title: "Gửi tiền (sau khi anh chị được cấp mã)",
    timing: "Trong 24 giờ",
    summary:
      "Chuyển khoản ngay sau khi có mã. Thiếu mã NE trên nội dung chuyển khoản → không hoàn lại, chuyển vào quỹ vô danh (xây trường).",
    bullets: [
      "Ghi nội dung chuyển khoản: Mã NE + tên anh chị + 2526.",
      "Sau 24 giờ có thể bị thu hồi mã — cần đăng ký lại từ đầu.",
      "Chuyển một lần đủ 9 tháng tiền ăn + cơ sở vật chất (xem mức đóng góp và tài khoản bên dưới).",
    ],
  },
  {
    number: "03",
    title: "Vào nhóm Facebook tổng Nuôi Em",
    timing: "Sau khi chuyển khoản",
    summary:
      "Nhóm Facebook chính thức là nhóm có các anh chị nuôi tham gia, và là nhóm chính thức cập nhật lịch thăm, thông báo quỹ và lấy ý kiến minh bạch.",
    bullets: [
      "Theo dõi trang Facebook Nuôi Em song song với nhóm Facebook.",
      "Chủ động đọc thông báo — quỹ chưa thể nhắc riêng từng người.",
    ],
  },
  {
    number: "04",
    title: "Tra mã và nhận thông tin bé",
    timing: "Tháng 10 – 11",
    summary:
      "Đầu tháng 9 các bé bắt đầu ăn; tháng 10 trường gửi hồ sơ — dự án tiếp nhận và làm ảnh thẻ; tháng 11 mở tra cứu trên trang Facebook.",
    bullets: [
      "Tra cứu mã NE trên danh mục em nuôi công khai (nuoiem2025.quynuoiem.com) khi quỹ mở cổng.",
      "Theo dõi thông báo trên trang Facebook Nuôi Em song song.",
      "Mỗi mã trả về thông tin và ảnh bé tương ứng sau khi xử lý dữ liệu.",
    ],
  },
  {
    number: "05",
    title: "Ảnh hàng tháng",
    timing: "Định kỳ mỗi tháng",
    summary:
      "Sau khi tra mã thành công, anh chị nhận link nhóm lớp có thầy cô cắm bản — cập nhật quá trình ăn của học sinh đầu mỗi tháng.",
    bullets: [
      "Có thể liên lạc, trao đổi với thầy cô qua nhóm lớp.",
      "Không gửi quần áo cũ lên bản.",
    ],
  },
  {
    number: "06",
    title: "Thăm em",
    timing: "Theo lịch quỹ",
    summary:
      "Lịch thăm công bố trên nhóm Facebook và trang Facebook trước khoảng 3 tuần. Ai nuôi bé nào thăm bé đó.",
    bullets: [
      "Mỗi mã: một người đi thăm.",
      "Tuyệt đối không đưa trẻ ra khỏi địa bàn.",
      "Có thể thăm không cùng đoàn — anh chị vui lòng báo trước để quỹ hỗ trợ thông báo và lên lịch trình cùng thầy cô.",
    ],
    link: { href: "https://thamem.nuoiem.com/", label: "Lịch thăm em" },
  },
] as const;

/** Quỹ chỉ nhận chuyển khoản một lần đủ cho cả năm học. */
export const paymentScenarios = [
  {
    label: "Chuyển một lần",
    detail:
      "Anh chị vui lòng chuyển khoản 1 lần 9 tháng tiền ăn + tiền cơ sở vật chất trong một giao dịch, trong vòng 24 giờ sau khi nhận mã NE.",
  },
] as const;

export const costTiers = [
  {
    label: "Phổ biến (tiểu học & mầm non)",
    amount: "1.450.000đ / năm học",
    breakdown: "150.000đ × 9 tháng + 100.000đ cơ sở vật chất",
  },
  {
    label: "Một số vùng Tây Nguyên (trung học cơ sở / trung học phổ thông)",
    amount: "1.650.000đ / năm học",
    breakdown: "170.000đ × 9 tháng + 120.000đ cơ sở vật chất",
  },
] as const;

export const importantNotes = [
  "Mỗi mã NE chỉ có một người nuôi duy nhất trong 1 năm học.",
  "Qua các năm học, nếu anh chị tiếp tục tham gia, mã NE có thể giữ nguyên nhưng thông tin học sinh có thể thay đổi.",
  "Mã đuôi S/T (ví dụ: NE00001S — mã ăn trưa, NE00001T — mã ăn tối). Lưu ý: ở một số tỉnh Tây Nguyên có cách đánh mã riêng — bé nội trú ăn 2 bữa mỗi ngày được tách thành 2 mã, mỗi mã một người nuôi một bữa.",
] as const;

export const timelineMilestones = [
  { when: "Trong 24 giờ", what: "Chuyển khoản đủ một lần (giữ mã)" },
  { when: "Tháng 9", what: "Các bé bắt đầu đi học và ăn trưa" },
  { when: "Tháng 10 – 11", what: "Tra mã, nhận thông tin và ảnh bé" },
] as const;

export const CODE_MEANING_URL = "http://bit.ly/2sLs7HC";
export const SCHOOL_BUILD_URL = "https://web.sucmanh2000.com/";

/**
 * Nội dung đầy đủ trang Quy trình cấp mã 2026.
 * Chỉnh file này để cập nhật copy/ảnh — hot reload khi chạy dev.
 */
export const process2026PageContent = {
  meta: {
    title: "Quy trình cấp và nhận mã Nuôi Em 2026",
    description:
      "Hướng dẫn đầy đủ cho anh chị nuôi mới: nhận mã NE qua trang Facebook, chuyển khoản đúng cú pháp, vào nhóm Facebook, tra mã, nhận ảnh hàng tháng và lịch thăm em.",
  },
  media: {
    heroImage: nuoiEmImage("processGuide"),
    qrImage: brandVisual.donateQrPath,
  },
  links: {
    messenger: brandVisual.social.facebook,
    group: brandVisual.social.group,
  },
  hero: {
    eyebrow: "Mùa nuôi 2025 – 2026",
    title: "Quy trình cấp và nhận mã",
    titleAccent: " cho anh chị nuôi mới",
    description:
      "Khi đã có mã NE, làm đúng 6 bước dưới đây để giữ mã, chuyển khoản đúng cú pháp, nhận thông tin bé và theo dõi suốt năm học. Nội dung tham chiếu từ quy trình chính thức của Quỹ Nuôi Em.",
    messengerCta: "Nhận mã qua Fanpage",
    groupCta: "Group Nuôi Em tổng",
  },
  stepsIntro: {
    eyebrow: "6 bước cốt lõi",
    title: "Từ nhận mã đến thăm em",
    description:
      "Làm lần lượt — không bỏ bước. Mốc thời gian ghi trên từng bước để anh chị chủ động theo dõi.",
  },
  steps: processSteps2026.map((step) => ({
    number: step.number,
    title: step.title,
    timing: step.timing,
    summary: step.summary,
    bullets: [...step.bullets],
    ...(step.link ? { link: { ...step.link } } : {}),
  })),
  costIntro: {
    eyebrow: "Mức đóng góp",
    title: "Nuôi một em, một bữa, một năm học",
    description:
      "Bữa ăn ~8.500đ/suất (tiểu học), mầm non ~6.800đ/suất. Khoản cơ sở vật chất 100.000đ/mã (120.000đ/mã tại một số vùng Tây Nguyên) dùng cho các dự án bổ trợ (không đóng thêm).",
  },
  costTiers: costTiers.map((tier) => ({ ...tier })),
  transfer: {
    eyebrow: "Chuyển khoản",
    title: "Thông tin chuyển khoản và Lưu ý quan trọng",
    transferReminder:
      "Anh chị lưu ý giúp dự án CHỈ CHUYỂN KHOẢN KHI ĐÃ NHẬN ĐƯỢC MÃ NE, anh chị giúp dự án chuyển khoản MỘT LẦN đủ chi phí đã thoả thuận trong vòng 24H. Dự án cảm ơn anh chị đã đồng hành",
    warning:
      "Nếu anh chị vô tình quên ghi nội dung hãy báo ngay lại với dự án qua trang Nuôi Em. Trong trường hợp dự án nhận được chuyển khoản nhưng không có nội dung sẽ không hoàn lại và chuyển thành giao dịch vô danh (xây trường).",
    codeExpiryNote:
      "Anh chị lưu ý giúp dự án: sau 24 giờ chưa chuyển, mã NE sẽ bị thu hồi. Khi mã đã thu hồi, anh chị vui lòng đăng ký lại từ đầu.",
    transferFormat: "Mã NE + tên anh chị + 2526",
    transferExample: "NE05559 Nguyen Tai 2526",
    accountNumber: "1805",
    bank: "Ngân hàng Quân đội (MB) — Ngân hàng TMCP Quân đội",
    accountName: "CTCP DNXH QUY NUOI EM",
    phone: brandVisual.contact.phone,
    phoneDisplay: brandVisual.contact.phoneDisplay,
    phoneContactName: "Anh Trung",
    scenariosTitle: "Quy định gửi tiền",
    scenariosFootnote: "",
    qrCaption: "Quét mã chuyển khoản",
    qrCta: "Nhận mã NE",
  },
  paymentScenarios: paymentScenarios.map((item) => ({ ...item, tag: null })),
  timelineIntro: {
    eyebrow: "Mốc thời gian",
    title: "Lịch quan trọng trong năm học",
  },
  timeline: timelineMilestones.map((item) => ({ ...item })),
  notesIntro: {
    eyebrow: "Lưu ý quan trọng",
    title: "Về mã NE và thông tin bé",
  },
  importantNotes: [...importantNotes],
  codeMeaningLabel: "Mã mỗi em có ý nghĩa gì?",
  codeMeaningUrl: CODE_MEANING_URL,
  finance: {
    eyebrow: "Minh bạch tài chính",
    title: "Xác nhận chuyển khoản",
    bodyBefore: "Báo cáo công khai tại ",
    reportLinkLabel: "trang Tài chính",
    reportLinkUrl: brandVisual.financeUrl,
    bodyAfter:
      ". Đội ngũ tài chính xác nhận chuyển khoản thành công qua tin nhắn Facebook sau khoảng 7 ngày, kèm mã giao dịch.",
    footnoteBefore: "Số tiền chuyển dư hoặc chưa dùng hết có thể chuyển sang dự án xây trường ",
    schoolBuildLinkLabel: "Sức mạnh 2000",
    footnoteAfter: ".",
  },
  schoolBuildUrl: SCHOOL_BUILD_URL,
  cta: {
    title: "Cần hỗ trợ?",
    description:
      "Chỉ hỏi qua tin nhắn Fanpage Nuôi Em — không hỏi ở comment để tránh bỏ lỡ tin. Gọi đường dây nóng khi cần gấp.",
    messengerCta: "Mở Fanpage Nuôi Em",
    contactLinkLabel: "Trang liên hệ Quỹ",
    referenceLabel: "",
    referenceLinkLabel: "",
    referenceUrl: "",
  },
} as const;
