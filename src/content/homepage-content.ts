import { brandVisual } from "@/config/brand-visual";
import { SCHOOL_BUILD_URL } from "@/content/process-2026-content";
import { impactJourneySectionCopy } from "@/content/home-impact-journey";
import { homeProcessOverview } from "@/content/home-process-overview";
import { siteCopy } from "@/content/site-copy";
import { unavailableHomeStats } from "@/lib/data/home-metrics";
import { nuoiEmImage, nuoiEmMemberGallery } from "@/lib/images";
import { nuoiEmImage as legacyNuoiEmImage } from "@/lib/nuoiem-images";

const HOME_MEMBER_IMAGE_COUNT = 5;

export type MealProgramSupportCost = {
  amount: string;
  audience: string;
  breakdown: string;
};

export type MealProgramTextBlock = { label?: string; text: string };
export type MealProgramListBlock = { label: string; items: MealProgramSupportCost[] };
export type MealProgramBlock = MealProgramTextBlock | MealProgramListBlock;

export const mealProgramSectionCopy = {
  since: "Từ 2014",
  title: "Bữa cơm níu chân trẻ tới trường",
  blocks: [
    {
      text: "Mỗi bữa, các bé được ăn thịt, đậu, canh, rau, ... - còn gạo, gia vị, chất đốt do địa phương, gia đình đối ứng. Tiểu học, Trung học cơ sở, Trung học phổ thông thường ăn 4 bữa/tuần với chi phí 8.500đ/suất; mầm non ăn 5 bữa/tuần với chi phí 6.800đ/suất.",
    },
    {
      label: "Đối tượng nuôi",
      text: "Học sinh mầm non (từ năm học 2025 - 2026, dự án mở rộng thêm đối tượng học sinh mầm non được hưởng chế độ 105 của nhà nước — 160.000đ/tháng) và học sinh cấp 1–2–3 chưa được nhà nước nuôi cơm trưa. Một số bé nội trú xa được hỗ trợ cơm trưa và tối — mỗi bữa một mã NE (ví dụ NE00001S — ăn trưa, NE00001T — ăn tối). Khi bé được nhà nước nuôi, dự án đổi sang bé khác và giữ nguyên mã NE khi anh chị tiếp tục tham gia dự án.",
    },
    {
      label: "Chi phí hỗ trợ",
      items: [
        {
          amount: "1.450.000đ/mã",
          audience: "Mã phía Bắc và mã Mầm non trong Tây Nguyên",
          breakdown:
            "Chi phí gồm 150.000đ/tháng/bé × 9 tháng học + 100.000đ (tiền cơ sở vật chất)",
        },
        {
          amount: "1.650.000đ/mã",
          audience: "Mã Tiểu học, THCS, THPT trong Tây Nguyên",
          breakdown:
            "Chi phí gồm 170.000đ/tháng/bé × 9 tháng học + 120.000đ (tiền cơ sở vật chất)",
        },
      ],
    },
  ] satisfies MealProgramBlock[],
  media: {
    youtubeId: "ouYY0ri-vIs",
    title: "Bữa cơm trưa tại điểm trường vùng cao",
  },
  mascot: {
    image: legacyNuoiEmImage("mascotASang"),
    name: "A Sáng",
    caption: "A Sáng — Linh vật của Quỹ Nuôi Em",
  },
} as const;

export type HomeEcosystemCard = {
  title: string;
  description: string;
  detail?: string;
  chips?: readonly string[];
  ctaLabel: string;
  href: string;
  image: string;
  external?: boolean;
  tone: "peach" | "sky" | "amber";
};

export type HomeCampaignBlock = {
  headline: string;
  phase: string;
  goal: string;
};

export type HomeCampaignStory = {
  paragraphs: readonly string[];
  ctaLabel: string;
  ctaHref: string;
};

export type HomeCampaignSectionContent = {
  ecosystem: readonly HomeEcosystemCard[];
  ecosystemSection: {
    eyebrow: string;
    title: string;
  };
  storySection: {
    eyebrow: string;
    title: string;
  };
  campaign: HomeCampaignBlock;
  story: HomeCampaignStory;
  logos: readonly { src: string; alt: string; className?: string }[];
  media: {
    youtubeId: string;
    title: string;
  };
};

export const campaignSectionCopy: HomeCampaignSectionContent = {
  ecosystem: [
    {
      title: "Sức Mạnh 2000",
      description: "Góp tiền lẻ mỗi ngày",
      detail: "Đồng hành xây điểm trường mới bằng đóng góp nhỏ, đều đặn và minh bạch.",
      chips: ["Mỗi ngày 2.000đ"],
      ctaLabel: "Vào dự án",
      href: SCHOOL_BUILD_URL,
      image: "/sm2000.jpg",
      external: true,
      tone: "peach",
    },
    {
      title: "Phòng Tin Học Cho Em",
      description: "Trao máy tính cho điểm trường",
      detail: "Dự án trao máy tính và thiết bị để học sinh vùng cao tiếp cận môn Tin học.",
      ctaLabel: "Vào dự án",
      href: "https://phongtinhocchoem.nuoiem.com/",
      image: "/phongtin.jpg",
      external: true,
      tone: "sky",
    },
    {
      title: "Bếp Gas Công Nghiệp",
      description: "Tặng bản xa, giảm bếp củi",
      detail:
        "Rút thời gian nấu từ ~2 giờ còn ~1 giờ cho thầy cô; hạn chế khai thác củi làm bếp bản.",
      ctaLabel: "Vào dự án",
      href: "https://bepgascongnghiep.nuoiem.com/",
      image: "/bepgas.png",
      external: true,
      tone: "amber",
    },
  ],
  ecosystemSection: {
    eyebrow: "Hệ sinh thái",
    title: "Các dự án đồng hành cùng Quỹ Nuôi Em",
  },
  storySection: {
    eyebrow: "Câu chuyện",
    title: "Hành trình Quỹ Nuôi Em",
  },
  logos: [
    {
      src: "/images/nuoiem/logo-asnr-200-20191125231531.png",
      alt: "Ánh Sáng Núi Rừng",
    },
    {
      src: "/images/nuoiem/logo_vvc_v_0-1518031210.png",
      alt: "Volunteer Vietnam Center",
    },
    {
      src: "/images/nuoiem/logo-niem-tin-1510299904291.png",
      alt: "Nhóm tình nguyện Niềm Tin",
    },
  ],
  campaign: {
    headline: "MÃ NUÔI EM MÙA 12 — ĐANG MỞ",
    phase: "2025 – 2026 · Thêm 30.000 bé đợt 1",
    goal: "Mục tiêu +120.000 bé được nhận nuôi trên cả nước",
  },
  story: {
    paragraphs: [
      "Năm 2018 thật sự là một bước chuyển mình lớn đối với Quỹ Nuôi Em, khi hơn 5.436 em nhỏ bản cao đã được tìm thấy anh chị nuôi cơm trưa. Đó là hạnh phúc không chỉ riêng với người làm quỹ mà còn hơn 95.000+ niềm vui đến từ anh chị nuôi và các em học sinh đã tìm đến được với nhau.",
      "Đến nay hơn 1.000 nhóm Facebook theo trường thuộc hơn 500 xã tại Điện Biên, Hà Giang, Lào Cai, Yên Bái, Lai Châu, Bắc Kạn, Lạng Sơn, Hòa Bình, Cao Bằng, Thanh Hóa, Đắk Nông, Đắk Lắk, Kon Tum, Gia Lai… hoạt động tích cực và cập nhật tình hình các bé hàng tháng.",
      "Ngay từ bây giờ hãy đăng ký là một phần trong số các anh chị nuôi của các bé trong 2025 – 2026.",
    ],
    ctaLabel: "Tìm hiểu thêm",
    ctaHref: "https://web.sucmanh2000.com/",
  },
  media: {
    youtubeId: "Yvlxf68nMsI",
    title: "Quỹ Nuôi Em — Nhóm tình nguyện Niềm Tin",
  },
};

export const ctaSectionCopy = {
  title: campaignSectionCopy.campaign.headline,
  paragraphs: [...campaignSectionCopy.story.paragraphs],
  donate: campaignSectionCopy.story.ctaLabel,
  reports: "Báo cáo tài chính",
  campaign: campaignSectionCopy.campaign,
  story: {
    paragraphs: [...campaignSectionCopy.story.paragraphs],
    ctaLabel: campaignSectionCopy.story.ctaLabel,
    ctaHref: campaignSectionCopy.story.ctaHref,
  },
};

export const sponsoredChildrenSectionCopy = {
  title: "DANH SÁCH ĐÃ ĐƯỢC NHẬN NUÔI",
  titleNote: "(Tham khảo, dữ liệu từ 2024-2025)",
  subtitle:
    "Có ảnh hơn 65.000 bé đã được nhận nuôi. Con số tiếp tục ngày đêm được tăng và đăng tải",
  features: [
    {
      title: "MỖI EM CHỈ MỘT MÃ MỖI BỮA",
      description:
        "Mỗi em chỉ một mã mỗi bữa và một ảnh bé duy nhất, không trùng trong hàng nghìn em nhỏ.",
      icon: "/images/nuoiem/1-lan-20220415042856.png",
    },
    {
      title: "MỖI EM CHỈ 01 NGƯỜI NUÔI TRONG 1 NĂM HỌC",
      description:
        "Để đảm bảo an toàn, bảo mật thông tin cho các bé, mỗi bé, mỗi bữa, mỗi mã chỉ có một người nhận nuôi duy nhất.",
      icon: "/images/nuoiem/2-lan-20220415042856.png",
    },
    {
      title: "KHUYẾN KHÍCH NUÔI MÃ NHIỀU HƠN 1 NĂM",
      description:
        "Mỗi bé đều đặn đi học, vì thế chúng tôi khuyến khích anh chị tham gia nuôi bé nhiều hơn 1 năm.",
      icon: "/images/nuoiem/khuyen-khich-20220415045805.png",
    },
    {
      title: "MỘT NGƯỜI CÓ THỂ NUÔI NHIỀU BÉ",
      description: "Chúng tôi không giới hạn số lượng bé trên mỗi người nuôi.",
      icon: "/images/nuoiem/khuyen-khic-20220415045406.png",
    },
  ],
  exampleImage: "/emnuoi_vidu.jpg",
  exampleImageAlt: "Ví dụ album ảnh em đã được nhận nuôi — Quỹ Nuôi Em",
} as const;

export const membersSectionCopy = {
  eyebrow: "",
  title: "THAM KHẢO",
  paragraphs: [
    "Những giải thưởng, bằng khen cấp Quốc Gia mà nhóm, dự án và chủ nhiệm dự án đã vinh dự được nhận: 02 Giải thưởng tình nguyện Quốc Gia 2012, 2017 ...",
  ],
  cta: "",
};

export const newsSectionCopy = {
  eyebrow: "Tin Tức & Sự Kiện",
  title: "Hoạt động mới nhất",
  viewAll: "Xem tất cả tin tức",
  readMore: "Xem chi tiết",
  author: "Ban quản trị",
};

export const faqSectionCopy = {
  eyebrow: "Giải đáp thắc mắc",
  title: "Câu Hỏi Thường Gặp",
  intro:
    "Những thông tin phổ biến nhất về Quỹ Nuôi Em được tổng hợp tại đây để giải đáp nhanh các thắc mắc của anh chị.",
  items: [
    {
      id: "dia-chi",
      question: "Địa chỉ văn phòng của Quỹ Nuôi Em ở đâu?",
      type: "dia-chi" as const,
      body: "Xin mời cả nhà, các anh chị ghé thăm văn phòng Quỹ để cùng lắng nghe những câu chuyện, để hiểu về hành trình mà Quỹ đang làm cho các con.",
      address: brandVisual.office.address,
    },
    {
      id: "ngan-hang",
      question: "Số tài khoản của Quỹ Nuôi Em?",
      type: "ngan-hang" as const,
    },
    {
      id: "quy-trinh",
      question: "Quy trình xét duyệt bảo trợ ra sao?",
      type: "quy-trinh" as const,
      steps: [
        "Gửi công văn tới các Sở giáo dục và nhà trường tại các tỉnh",
        "Thống nhất nội dung, điều kiện hỗ trợ bao gồm chưa nhận được sự hỗ trợ từ nhà nước, bữa cơm trưa ảnh hưởng việc học",
        "Tiếp nhận thông tin, số liệu ban đầu đăng ký từ Sở giáo dục / Nhà trường",
        "Bắt đầu cấp mã từ tháng 6-7",
        "Toàn quỹ ăn cơm trưa từ tháng 9",
        "Nhận thông tin chi tiết từ Sở giáo dục / Nhà trường tháng 9 - 10",
        "Nhận đầy đủ thông tin học sinh và làm ảnh thẻ, đưa lên hệ thống tra cứu tháng 11",
        "Anh chị nuôi tra cứu và vào nhóm Facebook theo bản có thầy cô giáo cắm bản nấu ăn hàng ngày báo cáo theo tháng",
        "Thăm em thực tế Tháng 11-12 và Tháng 3-4",
      ],
    },
  ],
};

export const partnersHomeTitle = "Đơn vị đồng hành & Tài trợ";

/**
 * Single in-code source of truth for homepage content.
 * Edit this file to update homepage copy/media and see hot-reload in dev.
 */
export const homepageContent = {
  page: {
    hero: siteCopy.home,
    stats: unavailableHomeStats,
    cta: ctaSectionCopy,
    members: membersSectionCopy,
    faq: faqSectionCopy,
  },
  sections: {
    meal: mealProgramSectionCopy,
    impact: impactJourneySectionCopy,
    process: homeProcessOverview,
    sponsored: sponsoredChildrenSectionCopy,
    news: newsSectionCopy,
    partnersTitle: partnersHomeTitle,
  },
  media: {
    heroImage: brandVisual.heroImage,
    ctaImage: nuoiEmImage("ctaVisit"),
    donateQr: brandVisual.donateQrPath,
    memberImages: nuoiEmMemberGallery.slice(0, HOME_MEMBER_IMAGE_COUNT),
  },
} as const;
