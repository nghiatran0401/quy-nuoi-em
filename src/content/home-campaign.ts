import { SCHOOL_BUILD_URL } from "@/content/quy-trinh-cap-ma-2026";

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
  logos: [
    {
      src: "/images/nuoiem/logo-asnr-200-20191125231531.png",
      alt: "Ánh Sáng Núi Rừng",
      className: "h-10 w-auto md:h-12",
    },
    {
      src: "/images/nuoiem/logo_vvc_v_0-1518031210.png",
      alt: "Volunteer Vietnam Center",
      className: "h-9 w-auto md:h-10",
    },
    {
      src: "/images/nuoiem/logo-niem-tin-1510299904291.png",
      alt: "Nhóm tình nguyện Niềm Tin",
      className: "h-10 w-auto md:h-11",
    },
  ],
  campaign: {
    headline: "MỞ MÃ NUÔI EM MÙA 12 — ĐANG MỞ",
    phase: "2025 – 2026 · Thêm 30.000 bé đợt 1",
    goal: "Mục tiêu +120.000 bé được nhận nuôi trên cả nước",
  },
  story: {
    paragraphs: [
      "Năm 2018 thật sự là một bước chuyển mình lớn đối với dự án Nuôi Em, khi hơn 5.436 em nhỏ bản cao đã được tìm thấy anh chị nuôi cơm trưa. Đó là hạnh phúc không chỉ với người làm dự án mà còn hơn 95.000+ niềm vui đến hết 2023 từ anh chị nuôi và các em tìm đến được với nhau.",
      "Đến nay hơn 1.000 group theo trường thuộc hơn 500 xã tại Điện Biên, Hà Giang, Lào Cai, Yên Bái, Lai Châu, Bắc Kạn, Lạng Sơn, Hòa Bình, Cao Bằng, Thanh Hóa, Đắk Nông, Đắk Lắk, Kon Tum, Gia Lai… hoạt động tích cực và cập nhật tình hình các bé hàng tháng.",
      "Ngay từ bây giờ hãy đăng ký là một phần trong số +120.000 anh chị nuôi của các bé trong 2025 – 2026.",
    ],
    ctaLabel: "Tìm hiểu thêm",
    ctaHref: "https://web.sucmanh2000.com/",
  },
  media: {
    youtubeId: "Yvlxf68nMsI",
    title: "Dự án Nuôi Em — Nhóm tình nguyện Niềm Tin",
  },
};
