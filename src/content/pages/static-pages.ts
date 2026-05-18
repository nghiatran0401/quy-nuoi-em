import type {
  Localized,
  PageHero,
  PageMeta,
  ProcessStep,
  ScoringCategory,
  TimelineEvent,
  ValueCard,
} from "@/content/types";
import type { Locale } from "@/i18n/config";

export type StaticPageKey =
  | "about"
  | "vision"
  | "history"
  | "logoStory"
  | "organization"
  | "contact"
  | "donate"
  | "process"
  | "scoring"
  | "volunteer"
  | "mou"
  | "members"
  | "careers";

type StaticPageContent = {
  meta: Localized<PageMeta>;
  hero: Localized<PageHero>;
};

const pages: Record<StaticPageKey, StaticPageContent> = {
  about: {
    meta: {
      vi: {
        title: "Về Chúng Tôi",
        description:
          "Tìm hiểu về Dự án Nuôi Em — sứ mệnh gieo mầm hy vọng và minh bạch tài chính.",
      },
      en: {
        title: "About Us",
        description:
          "Learn about the Nuoi Em Project — planting seeds of hope with financial transparency.",
      },
    },
    hero: {
      vi: {
        eyebrow: "Nuôi cơm trưa — giúp trẻ tới trường",
        title: "Dự án Nuôi Em",
        description:
          "Kết nối anh chị nuôi với trẻ vùng cao qua mã NE minh bạch. 150.000đ/tháng giúp bé no bụng, đi học đầy đủ — biết rõ bé nào, có thể đi thăm.",
      },
      en: {
        eyebrow: "School lunches — keeping children in class",
        title: "Nuoi Em Project",
        description:
          "Connecting sponsors with children in remote areas through transparent NE codes. 150,000 VND per month helps children eat well and stay in school.",
      },
    },
  },
  vision: {
    meta: {
      vi: {
        title: "Tầm nhìn sứ mệnh",
        description: "Tầm nhìn, sứ mệnh và tôn chỉ hoạt động của Dự án Nuôi Em.",
      },
      en: {
        title: "Vision & Mission",
        description: "Vision, mission, and core principles of the Nuoi Em Project.",
      },
    },
    hero: {
      vi: {
        title: "TẦM NHÌN, SỨ MỆNH",
        description:
          "Giúp trẻ em thiệt thòi không may mồ côi cha mẹ trên khắp mọi miền tổ quốc được tiếp bước đến trường cho đến tuổi trưởng thành và có thể tự lao động kiếm sống.",
      },
      en: {
        title: "VISION & MISSION",
        description:
          "Help disadvantaged orphan children nationwide stay in school through adulthood and become self-sufficient.",
      },
    },
  },
  history: {
    meta: {
      vi: {
        title: "Lịch sử hình thành",
        description: "Hành trình phát triển của Dự án Nuôi Em qua các cột mốc đáng nhớ.",
      },
      en: {
        title: "Our History",
        description: "Key milestones in the journey of the Nuoi Em Project.",
      },
    },
    hero: {
      vi: {
        title: "Lịch sử hình thành",
        description:
          "Hành trình gieo mầm hy vọng và lan tỏa yêu thương của Dự án Nuôi Em qua các cột mốc đáng nhớ.",
      },
      en: {
        title: "Our History",
        description:
          "The journey of planting hope and spreading compassion through memorable milestones.",
      },
    },
  },
  logoStory: {
    meta: {
      vi: {
        title: "Câu chuyện logo",
        description: "Ý nghĩa và cấu trúc thiết kế logo Dự án Nuôi Em.",
      },
      en: {
        title: "Logo Story",
        description: "Meaning and design structure of the Nuoi Em Project logo.",
      },
    },
    hero: {
      vi: {
        eyebrow: "Nhận diện thương hiệu",
        title: "Câu Chuyện Logo",
        description:
          "Như trẻ vào tuổi trưởng thành cần Căn cước công dân, Quỹ khi phát triển cũng cần pháp nhân và logo mới để khẳng định mình.",
      },
      en: {
        eyebrow: "Brand identity",
        title: "Logo Story",
        description:
          "Just as young adults need identity documents, the Fund needed legal status and a new logo to affirm its growth.",
      },
    },
  },
  organization: {
    meta: {
      vi: {
        title: "Cơ cấu tổ chức",
        description: "Sơ đồ tổ chức và đội ngũ các Ban chức năng của Quỹ.",
      },
      en: {
        title: "Organization",
        description: "Organizational chart and functional teams of the Fund.",
      },
    },
    hero: {
      vi: {
        eyebrow: "BỘ MÁY NHÂN SỰ",
        title: "Cơ Cấu Tổ Chức",
        description:
          "Quy tụ những trái tim nhiệt huyết, tài năng và trách nhiệm, cùng chung tay kiến tạo tương lai tươi sáng cho trẻ em Việt Nam.",
      },
      en: {
        eyebrow: "OUR TEAM",
        title: "Organization Structure",
        description:
          "Dedicated hearts working together to build a brighter future for Vietnamese children.",
      },
    },
  },
  contact: {
    meta: {
      vi: {
        title: "Liên hệ",
        description: "Thông tin liên hệ Ban điều hành Dự án Nuôi Em.",
      },
      en: {
        title: "Contact",
        description: "Contact information for the Nuoi Em Project executive board.",
      },
    },
    hero: {
      vi: {
        title: "Liên hệ với chúng tôi",
        description: "Mọi ý kiến đóng góp và thắc mắc xin vui lòng gửi về cho Ban quản trị.",
      },
      en: {
        title: "Contact Us",
        description: "Please send your questions and feedback to the executive board.",
      },
    },
  },
  donate: {
    meta: {
      vi: {
        title: "Đóng góp",
        description: "Thông tin chuyển khoản và quyên góp cho Dự án Nuôi Em.",
      },
      en: {
        title: "Donate",
        description: "Bank transfer details to support the Nuoi Em Project.",
      },
    },
    hero: {
      vi: {
        eyebrow: "CHUNG TAY GÓP SỨC",
        title: "Đồng Hành Cùng Dự án Nuôi Em",
        description: "Mọi sự đóng góp của bạn đều trân quý và giúp các em nhỏ có thêm cơ hội đến trường.",
      },
      en: {
        eyebrow: "JOIN US",
        title: "Partner With Nuoi Em Project",
        description: "Every contribution helps children gain more opportunities to stay in school.",
      },
    },
  },
  process: {
    meta: {
      vi: {
        title: "Quy trình xét duyệt",
        description: "5 bước xét duyệt hồ sơ trẻ mồ côi minh bạch và công tâm.",
      },
      en: {
        title: "Review Process",
        description: "Five-step transparent review process for orphan child profiles.",
      },
    },
    hero: {
      vi: {
        eyebrow: "Minh bạch - Công tâm - Kịp thời",
        title: "Quy Trình Xét Duyệt",
        description: "5 bước sàng lọc kỹ lưỡng để đảm bảo sự hỗ trợ đến đúng người, đúng thời điểm.",
      },
      en: {
        eyebrow: "Transparent · Fair · Timely",
        title: "Review Process",
        description: "Five careful screening steps to ensure support reaches the right children at the right time.",
      },
    },
  },
  scoring: {
    meta: {
      vi: {
        title: "Thang điểm xét duyệt",
        description: "Hệ thống chấm điểm minh bạch dựa trên 5 nhóm tiêu chí cốt lõi.",
      },
      en: {
        title: "Scoring Criteria",
        description: "Transparent scoring system based on five core criteria groups.",
      },
    },
    hero: {
      vi: {
        eyebrow: "Công cụ hỗ trợ xét duyệt",
        title: "Thang Điểm Xét Duyệt Hồ Sơ",
        description:
          "Hệ thống chấm điểm minh bạch dựa trên 5 nhóm tiêu chí cốt lõi, đảm bảo công bằng cho mọi hoàn cảnh.",
      },
      en: {
        eyebrow: "Review support tool",
        title: "Profile Scoring Criteria",
        description: "A transparent scoring system across five core criteria groups for fair evaluation.",
      },
    },
  },
  volunteer: {
    meta: {
      vi: {
        title: "Đăng ký tình nguyện viên",
        description: "Đăng ký đồng hành cùng Quỹ và các em nhỏ được bảo trợ.",
      },
      en: {
        title: "Volunteer Registration",
        description: "Register to volunteer with the Fund and sponsored children.",
      },
    },
    hero: {
      vi: {
        eyebrow: "Chung tay vì cộng đồng",
        title: "Đăng ký trở thành Tình nguyện viên",
        description:
          "Dự án Nuôi Em cảm ơn Bạn đã quan tâm đăng ký trở thành Tình nguyện viên đồng hành với Quỹ và các con trẻ mồ côi đang được bảo trợ!",
      },
      en: {
        eyebrow: "For the community",
        title: "Become a Volunteer",
        description:
          "Thank you for your interest in volunteering alongside the Fund and the orphan children we support.",
      },
    },
  },
  mou: {
    meta: {
      vi: {
        title: "Biên bản ghi nhớ (MOU)",
        description: "Hợp tác doanh nghiệp với Dự án Nuôi Em qua MOU.",
      },
      en: {
        title: "Memorandum of Understanding",
        description: "Corporate partnership with the Nuoi Em Project through MOU.",
      },
    },
    hero: {
      vi: {
        eyebrow: "Hợp tác & Phát triển",
        title: "Biên Bản Ghi Nhớ (MOU)",
        description: "Tiếp bước tới trường - Sẻ chia yêu thương",
      },
      en: {
        eyebrow: "Partnership & Growth",
        title: "Memorandum of Understanding (MOU)",
        description: "Stepping to school — Sharing compassion",
      },
    },
  },
  members: {
    meta: {
      vi: {
        title: "Thành viên Quỹ",
        description: "Các doanh nghiệp đồng hành và tài trợ Dự án Nuôi Em.",
      },
      en: {
        title: "Fund Members",
        description: "Partner businesses supporting the Nuoi Em Project.",
      },
    },
    hero: {
      vi: {
        eyebrow: "Đối tác & Đồng hành",
        title: "Thành viên Quỹ",
        description:
          "Những cánh tay nối dài yêu thương — Cùng chung tay vì tương lai trẻ em Việt Nam. Quỹ trân trọng sự đồng hành quý báu của các Doanh nghiệp thành viên.",
      },
      en: {
        eyebrow: "Partners & Supporters",
        title: "Fund Members",
        description:
          "Extending hands of compassion for Vietnam's children. We deeply appreciate our member businesses.",
      },
    },
  },
  careers: {
    meta: {
      vi: {
        title: "Tuyển dụng",
        description: "Cơ hội nghề nghiệp tại Dự án Nuôi Em.",
      },
      en: {
        title: "Careers",
        description: "Career opportunities at the Nuoi Em Project.",
      },
    },
    hero: {
      vi: {
        eyebrow: "CƠ HỘI NGHỀ NGHIỆP",
        title: "Nhân viên Thư ký Quỹ",
        description:
          "Cùng Dự án Nuôi Em tiếp bước tới trường và sẻ chia yêu thương đến những hoàn cảnh khó khăn.",
      },
      en: {
        eyebrow: "CAREER OPPORTUNITY",
        title: "Fund Secretary",
        description:
          "Join the Nuoi Em Project in helping children reach school and sharing compassion with those in need.",
      },
    },
  },
};

export function getStaticPageMeta(page: StaticPageKey, locale: Locale): PageMeta {
  return pages[page].meta[locale];
}

export function getStaticPageHero(page: StaticPageKey, locale: Locale): PageHero {
  return pages[page].hero[locale];
}

export const visionMission: Localized<{ intro: string[]; sponsorship: string }> = {
  vi: {
    intro: [
      "Giúp trẻ em thiệt thòi không may mồ côi cha mẹ trên khắp mọi miền tổ quốc được tiếp bước đến trường cho đến tuổi trưởng thành và có thể tự lao động kiếm sống.",
    ],
    sponsorship:
      "Mức bảo trợ từ 1,5 – 2 triệu đồng đều đặn mỗi tháng dựa trên mức thu chi từng vùng miền, cấp học và độ tuổi của trẻ. Tiền được chuyển trực tiếp đến người đang nuôi dạy trẻ sau khi được khảo sát kỹ lưỡng và có sự giám sát chặt chẽ.",
  },
  en: {
    intro: [
      "Help orphaned and disadvantaged children across Vietnam stay in school until adulthood and gain the ability to earn a living.",
    ],
    sponsorship:
      "Monthly sponsorship of 1.5–2 million VND based on regional costs, education level, and age. Funds are transferred directly to caregivers after thorough assessment and close monitoring.",
  },
};

export const visionValues: Localized<{ heading: string; items: ValueCard[]; cta: string }> = {
  vi: {
    heading: "Tôn chỉ hoạt động",
    items: [
      {
        title: "CÔNG TÂM",
        description:
          "Mọi quy trình, hoạt động đều vì mục đích chung của Quỹ, chính trực, không tư lợi, thiên vị hay chịu sự tác động của bên thứ ba.",
      },
      {
        title: "CÔNG KHAI",
        description:
          "Mọi thông tin đều được công khai, minh bạch tại Fanpage và các phương tiện truyền thông chính thức của Quỹ.",
      },
      {
        title: "CÔNG BẰNG",
        description: "Các hoạt động của Quỹ luôn đảm bảo công bằng dựa trên các tiêu chí đã đặt ra.",
      },
    ],
    cta: "Chúng tôi cam kết duy trì sự minh bạch và công tâm trong mọi hoạt động để xứng đáng với niềm tin của cộng đồng.",
  },
  en: {
    heading: "Core principles",
    items: [
      {
        title: "IMPARTIALITY",
        description:
          "All processes serve the Fund's shared purpose with integrity, without self-interest, bias, or third-party influence.",
      },
      {
        title: "TRANSPARENCY",
        description: "Information is openly shared on our Fanpage and official communication channels.",
      },
      {
        title: "FAIRNESS",
        description: "Fund activities ensure fairness based on established criteria.",
      },
    ],
    cta: "We are committed to transparency and fairness in all activities to honor the community's trust.",
  },
};

export const historyTimeline: Localized<TimelineEvent[]> = {
  vi: [
    { date: "Tháng 10/2020", title: "Tiền thân nhóm Quỹ", description: "Nhóm trẻ thành lập để cứu trợ bà con miền Trung bị thiệt hại do lũ lụt." },
    { date: "Tháng 12/2020", title: "17 trẻ được bảo trợ", description: "Tổng số trẻ mồ côi được nhận bảo trợ là 17 trẻ." },
    { date: "Tháng 01/2021", title: "Thành lập các Ban", description: "Ban điều hành, xét duyệt, truyền thông, thư ký, tài chính." },
    { date: "Tháng 12/2021", title: "77 trẻ được bảo trợ" },
    { date: "Tháng 01/2022", title: "Bổ sung nhân sự", description: "Nhân viên Thư ký, nhân viên Truyền thông." },
    { date: "Tháng 12/2022", title: "200 trẻ được bảo trợ" },
    { date: "Tháng 12/2023", title: "255 trẻ được bảo trợ" },
    { date: "Năm 2024", title: "295 trẻ được bảo trợ", description: "02 đợt xét duyệt 13 & 14. Đến 12/2024 có 73 trẻ hoàn thành bảo trợ." },
    { date: "Đến 06/2025", title: "350 trẻ được bảo trợ", description: "02 đợt xét duyệt 15 & 16." },
  ],
  en: [
    { date: "Oct 2020", title: "Fund origins", description: "Youth group formed to aid Central Vietnam flood victims." },
    { date: "Dec 2020", title: "17 children sponsored" },
    { date: "Jan 2021", title: "Functional boards established", description: "Executive, review, communications, secretariat, finance." },
    { date: "Dec 2021", title: "77 children sponsored" },
    { date: "Jan 2022", title: "Dedicated staff added", description: "Secretary and communications staff." },
    { date: "Dec 2022", title: "200 children sponsored" },
    { date: "Dec 2023", title: "255 children sponsored" },
    { date: "2024", title: "295 children sponsored", description: "Review rounds 13 & 14. 73 completed sponsorship by Dec 2024." },
    { date: "By Jun 2025", title: "350 children sponsored", description: "Review rounds 15 & 16." },
  ],
};

export const logoStorySections: Localized<
  {
    title: string;
    paragraphs: string[];
    bullets?: { title: string; items: string[] }[];
    colors?: { name: string; meaning: string }[];
  }[]
> = {
  vi: [
    {
      title: "Bỗng dưng muốn bé",
      paragraphs: [
        "Là muốn bé lại như ngày xưa. Nhưng quy luật tự nhiên là phát triển — ai rồi cũng sẽ lớn. Và Dự án Nuôi Em cũng vậy.",
        "Logo Quỹ là tổ hợp hình và chữ, gồm 2 màu xanh lá và xanh dương trên nền trắng — diện mạo mới khẳng định sứ mệnh lớn lao hơn.",
      ],
    },
    {
      title: "Cấu trúc thiết kế",
      paragraphs: [],
      bullets: [
        {
          title: "Phần Hình",
          items: [
            "Mô phỏng hình người với hai tay hướng lên, vươn vai đón bình minh.",
            "Thân người cách điệu từ chữ V — Việt Nam kiêu hãnh vươn cao.",
            "Hai vòng cung xanh lá tượng trưng sự bao bọc, dung dưỡng, tiếp nối các thế hệ.",
          ],
        },
        {
          title: "Phần Chữ",
          items: [
            'Dòng chữ "DỰ ÁN NUÔI EM" viết hoa, màu xanh dương đậm — tri ân Tác giả Nuôi Em.',
          ],
        },
      ],
    },
    {
      title: "Ý nghĩa màu sắc",
      paragraphs: [],
      colors: [
        { name: "Màu Trắng", meaning: "Nền tảng & Sự minh bạch" },
        { name: "Màu Xanh Dương", meaning: "Niềm tin & Sự vững chắc" },
        { name: "Màu Xanh Lá", meaning: "Hy vọng & Sự phát triển" },
      ],
    },
  ],
  en: [
    {
      title: "Growing up",
      paragraphs: [
        "We sometimes wish to be small again — yet growth is natural. The Nuoi Em Project has matured the same way.",
        "The logo combines icon and wordmark in green and blue on white — a new identity for a greater mission.",
      ],
    },
    {
      title: "Design structure",
      paragraphs: [],
      bullets: [
        {
          title: "Icon",
          items: [
            "A stylized figure with raised arms greeting a new dawn.",
            "Body shaped from the letter V — proud Vietnam reaching upward.",
            "Green arcs symbolize nurture and continuity across generations.",
          ],
        },
        {
          title: "Wordmark",
          items: ['"TONY BUOI SANG FUND" in bold blue — honoring author Nuoi Em.'],
        },
      ],
    },
    {
      title: "Color meaning",
      paragraphs: [],
      colors: [
        { name: "White", meaning: "Foundation & transparency" },
        { name: "Blue", meaning: "Trust & stability" },
        { name: "Green", meaning: "Hope & growth" },
      ],
    },
  ],
};

export const processSteps: Localized<ProcessStep[]> = {
  vi: [
    {
      round: "Vòng 01",
      title: "THU THẬP THÔNG TIN",
      description:
        "Quỹ nhận hồ sơ trẻ mồ côi, khó khăn do đọc giả và mạnh thường quân giới thiệu và tiến hành thu thập thông tin.",
    },
    {
      round: "Vòng 02",
      title: "CHẤM ĐIỂM VÀ PHÂN LOẠI HỒ SƠ",
      description:
        "Ban xét duyệt xác minh qua điện thoại, bổ sung thông tin, chấm điểm và phân loại theo bảng tiêu chí.",
    },
    {
      round: "Vòng 03",
      title: "XẾP HẠNG VÀ LỰA CHỌN HỒ SƠ",
      subTitle: "PHỎNG VẤN KHẢO SÁT TRỰC TIẾP",
      description:
        "Chọn danh sách phỏng vấn/khảo sát trực tiếp theo điểm từ cao xuống thấp cho đến khi đủ chỉ tiêu.",
    },
    {
      round: "Vòng 04",
      title: "BXD HỌP CHỐT DANH SÁCH",
      subTitle: "TRẺ MỒ CÔI ĐƯỢC BẢO TRỢ THEO TỪNG QUÝ",
      description: "Thành viên BXD thảo luận từng trường hợp và quyết định danh sách được bảo trợ.",
    },
    {
      round: "Vòng 05",
      title: "TRÌNH BAN ĐIỀU HÀNH QUỸ",
      subTitle: "THÔNG QUA DANH SÁCH BẢO TRỢ",
      description: "Ban điều hành phê duyệt danh sách trẻ mồ côi được bảo trợ chính thức.",
    },
  ],
  en: [
    {
      round: "Round 01",
      title: "INFORMATION GATHERING",
      description: "Profiles referred by readers and benefactors are collected and documented.",
    },
    {
      round: "Round 02",
      title: "SCORING & CLASSIFICATION",
      description: "Review board verifies by phone, completes information, scores and classifies profiles.",
    },
    {
      round: "Round 03",
      title: "RANKING & SELECTION",
      subTitle: "DIRECT INTERVIEW / SURVEY",
      description: "Candidates are selected for direct interview based on scores until quotas are met.",
    },
    {
      round: "Round 04",
      title: "REVIEW BOARD MEETING",
      subTitle: "QUARTERLY SPONSORSHIP LIST",
      description: "Board members discuss each case and finalize the sponsorship list.",
    },
    {
      round: "Round 05",
      title: "EXECUTIVE BOARD APPROVAL",
      subTitle: "OFFICIAL SPONSORSHIP LIST",
      description: "Executive board approves the final list of sponsored children.",
    },
  ],
};

export const scoringCategories: Localized<ScoringCategory[]> = {
  vi: [
    {
      icon: "🏠",
      title: "1. HOÀN CẢNH",
      items: [
        { label: "Mồ côi cả cha lẫn mẹ", points: "10 điểm", priority: "Ưu tiên 1" },
        { label: "Mồ côi mẹ", points: "6 điểm", priority: "Ưu tiên 2" },
        { label: "Mồ côi cha", points: "4 điểm", priority: "Ưu tiên 3" },
      ],
    },
    {
      icon: "💰",
      title: "2. THU NHẬP",
      items: [
        { label: "Chuẩn nghèo", points: "10 điểm", priority: "Ưu tiên 1" },
        { label: "Cận nghèo", points: "6 điểm", priority: "Ưu tiên 2" },
        { label: "Trung bình", points: "4 điểm", priority: "Ưu tiên 3" },
      ],
    },
    {
      icon: "📚",
      title: "3. CẤP HỌC",
      items: [
        { label: "Cấp 3", points: "12.5 điểm", priority: "Ưu tiên 1" },
        { label: "Cấp 2", points: "7.5 điểm", priority: "Ưu tiên 2" },
        { label: "Cấp 1", points: "5 điểm", priority: "Ưu tiên 3" },
      ],
    },
    {
      icon: "⭐",
      title: "4. HẠNH KIỂM",
      items: [
        { label: "Tốt", points: "5 điểm", priority: "Ưu tiên 1" },
        { label: "Khá", points: "3 điểm", priority: "Ưu tiên 2" },
        { label: "Trung bình", points: "2 điểm", priority: "Ưu tiên 3" },
      ],
    },
    {
      icon: "👥",
      title: "5. SỐ ANH/EM",
      items: [
        { label: "3 trở lên", points: "12.5 điểm", priority: "Ưu tiên 1" },
        { label: "2", points: "7.5 điểm", priority: "Ưu tiên 2" },
        { label: "1", points: "5 điểm", priority: "Ưu tiên 3" },
      ],
    },
  ],
  en: [
    {
      icon: "🏠",
      title: "1. CIRCUMSTANCE",
      items: [
        { label: "Orphaned (both parents)", points: "10 pts", priority: "Priority 1" },
        { label: "Orphaned (mother)", points: "6 pts", priority: "Priority 2" },
        { label: "Orphaned (father)", points: "4 pts", priority: "Priority 3" },
      ],
    },
    {
      icon: "💰",
      title: "2. INCOME",
      items: [
        { label: "Below poverty line", points: "10 pts", priority: "Priority 1" },
        { label: "Near poverty", points: "6 pts", priority: "Priority 2" },
        { label: "Average", points: "4 pts", priority: "Priority 3" },
      ],
    },
    {
      icon: "📚",
      title: "3. EDUCATION LEVEL",
      items: [
        { label: "High school", points: "12.5 pts", priority: "Priority 1" },
        { label: "Middle school", points: "7.5 pts", priority: "Priority 2" },
        { label: "Primary school", points: "5 pts", priority: "Priority 3" },
      ],
    },
    {
      icon: "⭐",
      title: "4. CONDUCT",
      items: [
        { label: "Excellent", points: "5 pts", priority: "Priority 1" },
        { label: "Good", points: "3 pts", priority: "Priority 2" },
        { label: "Average", points: "2 pts", priority: "Priority 3" },
      ],
    },
    {
      icon: "👥",
      title: "5. SIBLINGS",
      items: [
        { label: "3 or more", points: "12.5 pts", priority: "Priority 1" },
        { label: "2", points: "7.5 pts", priority: "Priority 2" },
        { label: "1", points: "5 pts", priority: "Priority 3" },
      ],
    },
  ],
};

export const volunteerContent: Localized<{
  formUrl: string;
  roles: { title: string; items: string[] };
  audiences: { title: string; description: string }[];
  commitment: string;
}> = {
  vi: {
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSc9Ldr1JXKSbWcg9e3tj3WSP2GWXwozN5HkBPNFK7bodWRr9A/viewform",
    roles: {
      title: "Vai trò của bạn",
      items: [
        "Cập nhật tình hình sinh hoạt/học tập của con trên trường/lớp.",
        "Động viên con tham gia hoạt động phong trào của trường, Quỹ, cộng đồng.",
        "Tham gia/đồng tổ chức các hoạt động chung của Quỹ tại địa phương.",
        "Thăm hỏi, động viên, lắng nghe con chia sẻ như người con/cháu của mình.",
      ],
    },
    audiences: [
      {
        title: "Nhà trường & Giáo viên",
        description: "Người thầy, người cô trực tiếp dạy dỗ và quan tâm sự phát triển của các em.",
      },
      {
        title: "Cán bộ địa phương",
        description: "Hội Liên hiệp Phụ nữ, Đoàn thanh niên các cấp cùng hỗ trợ cộng đồng.",
      },
      {
        title: "Cá nhân hảo tâm",
        description: "Các cá nhân mong muốn giúp trẻ em mồ côi có tương lai tươi sáng hơn.",
      },
    ],
    commitment:
      "Để đảm bảo hiệu quả đồng hành, Quỹ mong muốn Tình nguyện viên cam kết thời gian và phối hợp thường xuyên với Ban Vận hành.",
  },
  en: {
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSc9Ldr1JXKSbWcg9e3tj3WSP2GWXwozN5HkBPNFK7bodWRr9A/viewform",
    roles: {
      title: "Your role",
      items: [
        "Update children's living and school progress.",
        "Encourage participation in school, fund, and community activities.",
        "Join or co-organize local fund activities.",
        "Visit, listen, and support children like family.",
      ],
    },
    audiences: [
      { title: "Schools & Teachers", description: "Educators who directly guide children's development." },
      { title: "Local officials", description: "Women's unions and youth unions supporting communities." },
      { title: "Individual donors", description: "People who want to help orphaned children build a brighter future." },
    ],
    commitment:
      "To ensure effective support, volunteers are asked to commit time and coordinate regularly with the Operations Board.",
  },
};

export const mouContent: Localized<{
  definition: string;
  pillars: { title: string; description: string }[];
  quote: string;
  cta: string;
}> = {
  vi: {
    definition:
      'MOU (Memorandum of Understanding) là thỏa thuận không ràng buộc giữa hai hoặc nhiều bên, thiết lập sự hiểu biết chung về hoạt động hợp tác.',
    pillars: [
      { title: "Xác định mục đích", description: "Tạo cơ sở, hành lang cho hoạt động chung, xác định ý định hợp tác rõ ràng." },
      { title: "Thể hiện cam kết", description: "Cam kết đóng góp tài chính, truyền thông và sử dụng hình ảnh thương hiệu." },
      { title: "Trách nhiệm các bên", description: "Quy định phạm vi trách nhiệm sau khi thống nhất mục tiêu và vai trò." },
    ],
    quote:
      "Doanh nghiệp mong muốn hợp tác với Quỹ nhằm đóng góp cho xã hội, giúp trẻ em mồ côi có hoàn cảnh khó khăn — vui lòng liên hệ để trao đổi chi tiết về MOU.",
    cta: "Liên hệ: duannuoiem@gmail.com",
  },
  en: {
    definition:
      "An MOU (Memorandum of Understanding) is a non-binding agreement establishing shared understanding of cooperative activities.",
    pillars: [
      { title: "Define purpose", description: "Creates a foundation and clear intent for future joint activities." },
      { title: "Show commitment", description: "Financial contribution, communications, and brand image usage." },
      { title: "Party responsibilities", description: "Defines each party's scope after goals and roles are agreed." },
    ],
    quote:
      "Businesses wishing to partner with the Fund to support orphaned children in difficult circumstances — please contact us to discuss MOU details.",
    cta: "Contact: duannuoiem@gmail.com",
  },
};

export const careersContent: Localized<{
  location: string;
  deadline: string;
  sections: { title: string; items: string[] }[];
}> = {
  vi: {
    location: "Khánh Hòa / TP.HCM / Địa phương hoạt động",
    deadline: "Hạn nộp: 05/03/2024",
    sections: [
      {
        title: "Nhiệm vụ chính",
        items: [
          "Lập và đề xuất kế hoạch công việc theo tuần/tháng/quý.",
          "Xây dựng và duy trì mối quan hệ với trẻ, gia đình và tình nguyện viên.",
          "Chăm sóc, cập nhật và quản lý thông tin trẻ được bảo trợ.",
        ],
      },
      {
        title: "Công việc cụ thể",
        items: [
          "Thực hiện thanh quyết toán, văn bản, chứng từ.",
          "Viết bài truyền thông trên Website, Fanpage.",
          "Thu thập và lưu trữ hình ảnh về trẻ.",
        ],
      },
      {
        title: "Trách nhiệm",
        items: [
          "Triển khai, theo dõi và báo cáo hoạt động Ban Vận hành.",
          "Chăm sóc, cập nhật trạng thái bảo trợ và báo cáo chi tiêu.",
          "Hỗ trợ tổ chức các hoạt động của Ban Truyền thông.",
        ],
      },
    ],
  },
  en: {
    location: "Khanh Hoa / Ho Chi Minh City / Local operations",
    deadline: "Application deadline: Mar 5, 2024",
    sections: [
      {
        title: "Main duties",
        items: [
          "Plan weekly/monthly/quarterly work.",
          "Build relationships with children, families, and volunteers.",
          "Care for and manage sponsored children's information.",
        ],
      },
      {
        title: "Specific tasks",
        items: [
          "Handle settlements, documents, and vouchers.",
          "Write communications for Website and Fanpage.",
          "Collect and archive children's photos.",
        ],
      },
      {
        title: "Responsibilities",
        items: [
          "Implement, monitor, and report Operations Board activities.",
          "Update sponsorship status and spending reports.",
          "Support Communications Board events.",
        ],
      },
    ],
  },
};

export const contactInfo: Localized<{
  address: string;
  email: string;
  phone: string;
  donationNote: string;
  warning: string;
}> = {
  vi: {
    address: "Dự án hỗ trợ trẻ bản cao tại hơn 25 tỉnh thành trên cả nước",
    email: "duannuoiem@gmail.com",
    phone: "0975 302 307",
    donationNote: "Dự án chỉ tiếp nhận quyên góp qua số tài khoản công khai trên trang Đóng góp. Bắt buộc ghi mã NE khi chuyển khoản.",
    warning: "Vui lòng cảnh giác với các hành vi mạo danh. Báo cáo tài chính tại taichinh.nuoiem.com",
  },
  en: {
    address: "Supporting children in remote areas across 25+ provinces in Vietnam",
    email: "duannuoiem@gmail.com",
    phone: "0975 302 307",
    donationNote: "Donations are accepted only via the public bank account on the Donate page. Include your NE code in the transfer note.",
    warning: "Please beware of impersonation scams. Financial reports at taichinh.nuoiem.com",
  },
};

export const donateInfo: Localized<{
  bank: string;
  branch: string;
  accountName: string;
  accountNumber: string;
  transferFormat: string;
  transferExample: string;
}> = {
  vi: {
    bank: "Vietcombank",
    branch: "Chi nhánh Thanh Xuân - Hà Nội",
    accountName: "Hoàng Hoa Trung",
    accountNumber: "0711000280294",
    transferFormat: "“Mã bé nhận nuôi” + Tên bạn (bắt buộc có mã NE)",
    transferExample: "NE00123 Nguyen Van A",
  },
  en: {
    bank: "Vietcombank",
    branch: "Thanh Xuan Branch - Hanoi",
    accountName: "Hoang Hoa Trung",
    accountNumber: "0711000280294",
    transferFormat: "\"Child sponsorship code\" + Your name (NE code required)",
    transferExample: "NE00123 Nguyen Van A",
  },
};

export const uiLabels: Localized<Record<string, string>> = {
  vi: {
    partners: "Đơn vị đồng hành & Tài trợ",
    orgChart: "Sơ đồ tổ chức",
    registerNow: "Đăng ký ngay",
    viewReports: "Xem báo cáo minh bạch",
    viewProcess: "Xem quy trình xét duyệt",
    scoringTotal: "Tổng điểm xét duyệt",
    scoringMax: "/ 50",
    referenceTable: "Bảng tham chiếu chi tiết",
    registerVolunteer: "Đăng ký Tình nguyện viên",
    referChild: "Giới thiệu hồ sơ trẻ",
    scanQr: "Quét mã QR để chuyển khoản nhanh",
    whatIsMou: "MOU là gì?",
    mouGallery: "Hình ảnh ký kết thực tế",
    contactInfo: "Thông tin liên lạc",
    donateWarning: "Lưu ý về quyên góp",
    applyNow: "Ứng tuyển qua email",
  },
  en: {
    partners: "Partners & Sponsors",
    orgChart: "Organization chart",
    registerNow: "Register now",
    viewReports: "View transparent reports",
    viewProcess: "View review process",
    scoringTotal: "Total review score",
    scoringMax: "/ 50",
    referenceTable: "Detailed reference table",
    registerVolunteer: "Register as volunteer",
    referChild: "Refer a child profile",
    scanQr: "Scan QR for quick transfer",
    whatIsMou: "What is an MOU?",
    mouGallery: "Signing ceremony photos",
    contactInfo: "Contact information",
    donateWarning: "Donation notice",
    applyNow: "Apply via email",
  },
};

export function getUiLabel(locale: Locale, key: string): string {
  return uiLabels[locale][key] ?? key;
}
