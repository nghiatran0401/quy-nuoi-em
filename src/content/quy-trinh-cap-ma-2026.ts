/** Nội dung quy trình — đối chiếu https://www.nuoiem.com/ */

export type ProcessStepContent = {
  number: string;
  title: string;
  timing: string;
  summary: string;
  bullets: readonly string[];
};

export const processSteps2026: readonly ProcessStepContent[] = [
  {
    number: "01",
    title: "Nhận mã NE",
    timing: "Trong ~2 phút",
    summary:
      "Dự án chỉ cấp mã qua tin nhắn trang Facebook Nuôi Em (chatbot tự động). Mỗi mã gắn với một anh/chị nuôi duy nhất.",
    bullets: [
      "Ấn nút Nhận mã trên trang Facebook hoặc nhắn: «Nhận mã nuôi em».",
      "Hoặc chọn Menu «Nhận mã Nuôi Em» trong hộp thoại Messenger.",
      "Không nhận mã qua comment công khai — dễ bỏ lỡ tin nhắn.",
    ],
  },
  {
    number: "02",
    title: "Gửi tiền",
    timing: "Trong 24 giờ",
    summary:
      "Chuyển khoản ngay sau khi có mã. Thiếu mã NE trên nội dung chuyển khoản → không hoàn lại, chuyển vào quỹ vô danh (xây trường).",
    bullets: [
      "Nội dung chuyển khoản: Mã NE + số điện thoại + tên anh/chị (bắt buộc có mã NE).",
      "Sau 24 giờ có thể bị thu hồi mã — cần chuyển lại từ đầu.",
      "Khuyến khích gửi 1 lần; có thể chia 2–3 lần (xem kịch bản bên dưới).",
    ],
  },
  {
    number: "03",
    title: "Vào nhóm Facebook Nuôi Em",
    timing: "Sau khi chuyển khoản",
    summary:
      "Nhóm Facebook chính thức là kênh cập nhật lịch thăm, thông báo dự án và lấy ý kiến minh bạch. Nên tham gia khi đã có mã và đã chuyển khoản.",
    bullets: [
      "Theo dõi trang Facebook Nuôi Em song song với nhóm Facebook.",
      "Chủ động đọc thông báo — dự án không nhắc riêng từng người.",
    ],
  },
  {
    number: "04",
    title: "Tra mã / nhận thông tin bé",
    timing: "Tháng 10 – 11",
    summary:
      "Đầu tháng 9 các bé bắt đầu ăn; cuối tháng 9 trường gửi hồ sơ; tháng 10 dự án rà soát ~70.000 hồ sơ; tháng 11 mở tra cứu trên trang Facebook.",
    bullets: [
      "Tra cứu theo hướng dẫn chatbot trang Facebook khi có thông báo.",
      "Mỗi mã trả về thông tin và ảnh bé tương ứng sau khi xử lý dữ liệu.",
    ],
  },
  {
    number: "05",
    title: "Ảnh & video hàng tháng",
    timing: "Định kỳ mỗi tháng",
    summary:
      "Sau tra mã thành công, anh/chị nhận link nhóm lớp có thầy cô cắm bản — cập nhật ảnh/video đầu mỗi tháng.",
    bullets: [
      "Có thể tương tác với thầy cô qua nhóm lớp.",
      "Không gửi quần áo cũ lên bản qua kênh này.",
    ],
  },
  {
    number: "06",
    title: "Thăm em",
    timing: "Theo lịch dự án",
    summary:
      "Lịch thăm công bố trên nhóm Facebook và trang Facebook trước khoảng 3 tuần. Ai nuôi bé nào thăm bé đó.",
    bullets: [
      "Mỗi mã: một người đi thăm.",
      "Tuyệt đối không đưa trẻ ra khỏi địa bàn.",
      "Có thể thăm không cùng đoàn — báo trước để dự án hỗ trợ đường và xin phép.",
    ],
  },
] as const;

export const paymentScenarios = [
  {
    label: "1 lần",
    tag: "Khuyến khích",
    detail: "Gửi đủ 9 tháng tiền ăn + tiền cơ sở vật chất trong một giao dịch.",
  },
  {
    label: "2 lần",
    tag: null,
    detail:
      "Lần 1: tối thiểu 450.000đ (3 tháng). Lần 2: tháng 11 khi nhận thông tin bé. Hoặc theo thời gian thực khi đăng ký.",
  },
  {
    label: "3 lần",
    tag: null,
    detail:
      "Lần 1: tối thiểu 450.000đ (3 tháng). Lần 2: tháng 11. Hoặc theo thời gian thực khi đăng ký. Lần 3: tháng 12.",
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
  "Mỗi mã NE chỉ có một người nuôi duy nhất.",
  "Qua các năm học, mã NE giữ nguyên nhưng thông tin học sinh có thể đổi (bé được nhà nước nuôi, không còn trong danh sách đề xuất, vân vận).",
  "Mã đuôi S/T (ví dụ: NE00001S — mã ăn trưa, NE00001T — mã ăn tối): Bé ở nội trú ăn 2 bữa/ngày — tách thành 2 mã, mỗi mã một người nuôi một bữa.",
] as const;

export const timelineMilestones = [
  { when: "Trong 24 giờ", what: "Chuyển khoản lần đầu (giữ mã)" },
  { when: "Tháng 9", what: "Các bé bắt đầu ăn bữa trưa" },
  { when: "Tháng 10 – 11", what: "Tra mã & nhận thông tin/ảnh bé" },
  { when: "31/12", what: "Hoàn tất 100% tiền ăn theo kịch bản đã chọn" },
] as const;

export const CODE_MEANING_URL = "http://bit.ly/2sLs7HC";
export const SCHOOL_BUILD_URL = "https://web.sucmanh2000.com/";
