import { brandVisual } from "@/config/brand-visual";
import { campaignSectionCopy } from "@/content/home-campaign";

/** Homepage campaign block (hệ sinh thái + mùa mở mã + câu chuyện) — CMS shape. */
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
      title: "MỖI EM CHỈ 01 MÃ",
      description:
        "Mỗi em một mã và 01 ảnh duy nhất, không trùng trong hàng NGHÌN em nhỏ.",
      icon: "/images/nuoiem/1-lan-20220415042856.png",
    },
    {
      title: "MỖI EM CHỈ 01 NGƯỜI NUÔI",
      description:
        "Để đảm bảo an toàn, bảo mật thông tin cho các bé, mỗi bé chỉ có 01 người nhận nuôi duy nhất.",
      icon: "/images/nuoiem/2-lan-20220415042856.png",
    },
    {
      title: "KHUYẾN KHÍCH NUÔI BÉ NHIỀU HƠN 1 NĂM",
      description:
        "Mỗi bé đều đặn đi học, vì thế chúng tôi khuyến khích bạn tham gia nuôi bé nhiều hơn 1 năm.",
      icon: "/images/nuoiem/khuyen-khich-20220415045805.png",
    },
    {
      title: "MỘT NGƯỜI CÓ THỂ NUÔI NHIỀU BÉ",
      description: "Chúng tôi không giới hạn số lượng bé trên mỗi người nuôi.",
      icon: "/images/nuoiem/khuyen-khic-20220415045406.png",
    },
  ],
  heroImage: "/images/nuoiem/3-1541577888.png",
  heroAlt: "Em nhỏ vùng cao — Quỹ Nuôi Em",
  viewAlbum: "XEM ALBUM",
  albums: [
    {
      label: "3000+ bé huyện Mường Nhé",
      region: "Tỉnh Điện Biên",
      href: "https://www.facebook.com/trungbatigoltn/media_set?set=a.499673950498668&type=3",
      previewImage:
        "/images/nuoiem/46885457_527677681031628_8450686654137499648_n-1543441007.jpg",
    },
    {
      label: "3000+ bé huyện Nậm Pồ",
      region: "Tỉnh Điện Biên",
      href: "https://www.facebook.com/trungbatigoltn/media_set?set=a.511662429299820&type=3",
      previewImage:
        "/images/nuoiem/46679515_527103281089068_3479477362972688384_n-1543441007.jpg",
    },
    {
      label: "3000+ bé huyện Điện Biên Đông",
      region: "Tỉnh Điện Biên",
      href: "https://www.facebook.com/trungbatigoltn/media_set?set=a.510028126129917&type=3",
      previewImage:
        "/images/nuoiem/46686056_527118954420834_8288971600615702528_n-1543441007.jpg",
    },
  ],
} as const;

/** Homepage block: THAM KHẢO + collage bằng khen (nuoiem.com). */
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
  author: "Admin",
};

export const faqSectionCopy = {
  eyebrow: "Giải đáp thắc mắc",
  title: "Câu Hỏi Thường Gặp",
  intro:
    "Những thông tin phổ biến nhất về Quỹ Nuôi Em được tổng hợp tại đây để giải đáp nhanh các thắc mắc của bạn.",
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
