import type { Locale } from "@/i18n/config";

export const sponsorshipSectionCopy: Record<
  Locale,
  {
    title: string;
    description: string;
    rounds: string;
    children: string;
    years: string;
    cta: string;
    chartLabel: string;
  }
> = {
  vi: {
    title: "Các Đợt Bảo Trợ",
    description:
      "Hành trình đồng hành cùng các em nhỏ mồ côi qua từng đợt bảo trợ, mang đến cơ hội và hy vọng cho tương lai.",
    rounds: "Đợt bảo trợ",
    children: "trẻ",
    years: "Năm hoạt động",
    cta: "Xem danh sách bảo trợ",
    chartLabel: "Biểu đồ bảo trợ: 387 trẻ em qua 17 đợt",
  },
  en: {
    title: "Sponsorship rounds",
    description:
      "Walking alongside orphaned children through each sponsorship round, bringing opportunity and hope for the future.",
    rounds: "Rounds",
    children: "children",
    years: "Years active",
    cta: "View sponsorship list",
    chartLabel: "Sponsorship chart: 387 children across 17 rounds",
  },
};

export const ctaSectionCopy: Record<
  Locale,
  {
    title: string;
    paragraphs: string[];
    donate: string;
    reports: string;
  }
> = {
  vi: {
    title: "Lời Kêu Gọi",
    paragraphs: [
      "Chúng tôi mong muốn nhận được sự đồng hành của quý độc giả từ khắp mọi miền trên đất nước, bằng cách giới thiệu trẻ mồ côi (cha, mẹ hoặc cả cha lẫn mẹ) có hoàn cảnh khó khăn về cho chúng tôi.",
      'Hãy cùng chúng tôi tạo ra giá trị tốt đẹp cho cộng đồng, giúp xã hội ngày càng nhân ái nhân văn, phát huy truyền thống bác ái hào sảng của một dân tộc "thương người như thể thương thân".',
    ],
    donate: "Đóng góp",
    reports: "Thống kê báo cáo",
  },
  en: {
    title: "Call to action",
    paragraphs: [
      "We hope for companionship from readers nationwide by referring orphaned children (father, mother, or both) in difficult circumstances to us.",
      "Join us in creating good for the community and nurturing a more humane society.",
    ],
    donate: "Donate",
    reports: "View reports",
  },
};

export const membersSectionCopy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    cta: string;
  }
> = {
  vi: {
    eyebrow: "Ảnh minh hoạ",
    title: "Hình ảnh hoạt động",
    paragraphs: [
      "Đây là các hình ảnh minh hoạ cho hoạt động đồng hành, bảo trợ và kết nối cộng đồng của Dự án Nuôi Em.",
      "Nội dung ảnh có thể thay đổi theo từng giai đoạn để phản ánh hành trình hỗ trợ các em nhỏ trên nhiều tỉnh thành.",
    ],
    cta: "Xem thêm hình ảnh",
  },
  en: {
    eyebrow: "Fund members",
    title: "Bonded by love",
    paragraphs: [
      "Starting with 20 members from the Nuoi Em production team spread across Vietnam, the fund has nearly doubled in size over three years.",
      "We keep working every day to sponsor more children and bring them more joy!",
    ],
    cta: "Fund members",
  },
};

export const newsSectionCopy: Record<
  Locale,
  { eyebrow: string; title: string; viewAll: string; readMore: string; author: string }
> = {
  vi: {
    eyebrow: "Tin Tức & Sự Kiện",
    title: "Hoạt động mới nhất",
    viewAll: "Xem tất cả tin tức",
    readMore: "Xem chi tiết",
    author: "Admin",
  },
  en: {
    eyebrow: "News & events",
    title: "Latest activities",
    viewAll: "View all news",
    readMore: "Read more",
    author: "Admin",
  },
};

export const faqSectionCopy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      id: string;
      question: string;
      type: "address" | "bank" | "process";
      body?: string;
      address?: string;
      steps?: string[];
    }>;
  }
> = {
  vi: {
    eyebrow: "Giải đáp thắc mắc",
    title: "Câu Hỏi Thường Gặp",
    intro:
      "Những thông tin phổ biến nhất về Dự án Nuôi Em được tổng hợp tại đây để giải đáp nhanh các thắc mắc của bạn.",
    items: [
      {
        id: "address",
        question: "Địa chỉ văn phòng của Dự án Nuôi Em ở đâu?",
        type: "address",
        body: "Xin mời cả nhà, các anh chị ghé thăm văn phòng Dự án Nuôi Em để cùng lắng nghe những câu chuyện, để hiểu về hành trình mà Dự án Nuôi Em đang làm cho các con.",
        address: "Số 383 đường Nguyễn Duy Trinh, phường Bình Trưng, TP. HCM.",
      },
      {
        id: "bank",
        question: "Số tài khoản của Dự án Nuôi Em?",
        type: "bank",
      },
      {
        id: "process",
        question: "Quy trình xét duyệt bảo trợ ra sao?",
        type: "process",
        steps: [
          "Thu thập thông tin",
          "Chấm điểm và phân loại hồ sơ",
          "Xếp hạng và lựa chọn hồ sơ phỏng vấn/khảo sát trực tiếp",
          "BXD họp chốt danh sách trẻ mồ côi được bảo trợ theo từng quý",
          "Trình Ban điều hành Dự án Nuôi Em thông qua danh sách bảo trợ trẻ mồ côi",
        ],
      },
    ],
  },
  en: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    intro: "Common information about the Nuoi Em Project, answered quickly here.",
    items: [
      {
        id: "address",
        question: "Where is the fund office?",
        type: "address",
        body: "We welcome you to visit our office to hear stories and understand the journey we are on for the children.",
        address: "383 Nguyen Duy Trinh Street, Binh Trung Ward, Ho Chi Minh City.",
      },
      {
        id: "bank",
        question: "What is the fund bank account?",
        type: "bank",
      },
      {
        id: "process",
        question: "What is the sponsorship review process?",
        type: "process",
        steps: [
          "Collect information",
          "Score and classify profiles",
          "Rank and select profiles for interview/site visit",
          "Board meeting to finalize quarterly sponsorship list",
          "Executive board approval of sponsored children",
        ],
      },
    ],
  },
};

export const partnersHomeTitle: Record<Locale, string> = {
  vi: "Đơn vị đồng hành & Tài trợ",
  en: "Partners & sponsors",
};
