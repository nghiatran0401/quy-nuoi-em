import type {
  PageHero,
  PageMeta,
  ProcessStep,
  ScoringCategory,
  TimelineEvent,
  ValueCard,
} from "@/content/types";

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
  meta: PageMeta;
  hero: PageHero;
};

const pages: Record<StaticPageKey, StaticPageContent> = {
  about: {
    meta: {
        title: "Về Chúng Tôi",
        description:
          "Tìm hiểu về Dự án Nuôi Em — sứ mệnh gieo mầm hy vọng và minh bạch tài chính.",
    },
    hero: {
        eyebrow: "Nuôi cơm trưa — giúp trẻ tới trường",
        title: "Dự án Nuôi Em",
        description:
          "Kết nối anh chị nuôi với trẻ vùng cao qua mã NE minh bạch. 150.000đ/tháng giúp bé no bụng, đi học đầy đủ — biết rõ bé nào, có thể đi thăm.",
    },
  },
  vision: {
    meta: {
        title: "Tầm nhìn sứ mệnh",
        description: "Tầm nhìn, sứ mệnh và tôn chỉ hoạt động của Dự án Nuôi Em.",
    },
    hero: {
        title: "TẦM NHÌN, SỨ MỆNH",
        description:
          "Giúp trẻ em thiệt thòi không may mồ côi cha mẹ trên khắp mọi miền tổ quốc được tiếp bước đến trường cho đến tuổi trưởng thành và có thể tự lao động kiếm sống.",
    },
  },
  history: {
    meta: {
        title: "Lịch sử hình thành",
        description: "Hành trình phát triển của Dự án Nuôi Em qua các cột mốc đáng nhớ.",
    },
    hero: {
        title: "Lịch sử hình thành",
        description:
          "Hành trình gieo mầm hy vọng và lan tỏa yêu thương của Dự án Nuôi Em qua các cột mốc đáng nhớ.",
    },
  },
  logoStory: {
    meta: {
        title: "Câu chuyện logo",
        description: "Ý nghĩa và cấu trúc thiết kế logo Dự án Nuôi Em.",
    },
    hero: {
        eyebrow: "Nhận diện thương hiệu",
        title: "Câu Chuyện Logo",
        description:
          "Như trẻ vào tuổi trưởng thành cần Căn cước công dân, Dự án Nuôi Em khi phát triển cũng cần pháp nhân và logo mới để khẳng định mình.",
    },
  },
  organization: {
    meta: {
        title: "Cơ cấu tổ chức",
        description: "Sơ đồ tổ chức và đội ngũ các Ban chức năng của Dự án Nuôi Em.",
    },
    hero: {
        eyebrow: "BỘ MÁY NHÂN SỰ",
        title: "Cơ Cấu Tổ Chức",
        description:
          "Quy tụ những trái tim nhiệt huyết, tài năng và trách nhiệm, cùng chung tay kiến tạo tương lai tươi sáng cho trẻ em Việt Nam.",
    },
  },
  contact: {
    meta: {
        title: "Liên hệ",
        description: "Thông tin liên hệ Ban điều hành Dự án Nuôi Em.",
    },
    hero: {
        title: "Liên hệ với chúng tôi",
        description: "Mọi ý kiến đóng góp và thắc mắc xin vui lòng gửi về cho Ban quản trị.",
    },
  },
  donate: {
    meta: {
        title: "Đóng góp",
        description: "Thông tin chuyển khoản và quyên góp cho Dự án Nuôi Em.",
    },
    hero: {
        eyebrow: "CHUNG TAY GÓP SỨC",
        title: "Đồng Hành Cùng Dự án Nuôi Em",
        description: "Mọi sự đóng góp của bạn đều trân quý và giúp các em nhỏ có thêm cơ hội đến trường.",
    },
  },
  process: {
    meta: {
        title: "Quy trình xét duyệt",
        description: "5 bước xét duyệt hồ sơ trẻ mồ côi minh bạch và công tâm.",
    },
    hero: {
        eyebrow: "Minh bạch - Công tâm - Kịp thời",
        title: "Quy Trình Xét Duyệt",
        description: "5 bước sàng lọc kỹ lưỡng để đảm bảo sự hỗ trợ đến đúng người, đúng thời điểm.",
    },
  },
  scoring: {
    meta: {
        title: "Thang điểm xét duyệt",
        description: "Hệ thống chấm điểm minh bạch dựa trên 5 nhóm tiêu chí cốt lõi.",
    },
    hero: {
        eyebrow: "Công cụ hỗ trợ xét duyệt",
        title: "Thang Điểm Xét Duyệt Hồ Sơ",
        description:
          "Hệ thống chấm điểm minh bạch dựa trên 5 nhóm tiêu chí cốt lõi, đảm bảo công bằng cho mọi hoàn cảnh.",
    },
  },
  volunteer: {
    meta: {
        title: "Đăng ký tình nguyện viên",
        description: "Đăng ký đồng hành cùng Dự án Nuôi Em và các em nhỏ được bảo trợ.",
    },
    hero: {
        eyebrow: "Chung tay vì cộng đồng",
        title: "Đăng ký trở thành Tình nguyện viên",
        description:
          "Dự án Nuôi Em cảm ơn Bạn đã quan tâm đăng ký trở thành Tình nguyện viên đồng hành với Dự án Nuôi Em và các con trẻ mồ côi đang được bảo trợ!",
    },
  },
  mou: {
    meta: {
        title: "Biên bản ghi nhớ (MOU)",
        description: "Hợp tác doanh nghiệp với Dự án Nuôi Em qua MOU.",
    },
    hero: {
        eyebrow: "Hợp tác & Phát triển",
        title: "Biên Bản Ghi Nhớ (MOU)",
        description: "Tiếp bước tới trường - Sẻ chia yêu thương",
    },
  },
  members: {
    meta: {
        title: "Đối tác đồng hành",
        description: "Các doanh nghiệp đồng hành và tài trợ Dự án Nuôi Em.",
    },
    hero: {
        eyebrow: "Đối tác & Đồng hành",
        title: "Đối tác đồng hành",
        description:
          "Những cánh tay nối dài yêu thương — Cùng chung tay vì tương lai trẻ em Việt Nam. Dự án Nuôi Em trân trọng sự đồng hành quý báu của các Doanh nghiệp thành viên.",
    },
  },
  careers: {
    meta: {
        title: "Tuyển dụng",
        description: "Cơ hội nghề nghiệp tại Dự án Nuôi Em.",
    },
    hero: {
        eyebrow: "CƠ HỘI NGHỀ NGHIỆP",
        title: "Nhân viên Thư ký Dự án Nuôi Em",
        description:
          "Cùng Dự án Nuôi Em tiếp bước tới trường và sẻ chia yêu thương đến những hoàn cảnh khó khăn.",
    },
  },
};

export function getStaticPageMeta(page: StaticPageKey): PageMeta {
  return pages[page].meta;
}

export function getStaticPageHero(page: StaticPageKey): PageHero {
  return pages[page].hero;
}

export const visionMission: { intro: string[]; sponsorship: string } = {
    intro: [
      "Giúp trẻ em thiệt thòi không may mồ côi cha mẹ trên khắp mọi miền tổ quốc được tiếp bước đến trường cho đến tuổi trưởng thành và có thể tự lao động kiếm sống.",
    ],
    sponsorship:
      "Mức bảo trợ từ 1,5 – 2 triệu đồng đều đặn mỗi tháng dựa trên mức thu chi từng vùng miền, cấp học và độ tuổi của trẻ. Tiền được chuyển trực tiếp đến người đang nuôi dạy trẻ sau khi được khảo sát kỹ lưỡng và có sự giám sát chặt chẽ.",
  };

export const visionValues: { heading: string; items: ValueCard[]; cta: string } = {
    heading: "Tôn chỉ hoạt động",
    items: [
      {
        title: "CÔNG TÂM",
        description:
          "Mọi quy trình, hoạt động đều vì mục đích chung của Dự án Nuôi Em, chính trực, không tư lợi, thiên vị hay chịu sự tác động của bên thứ ba.",
      },
      {
        title: "CÔNG KHAI",
        description:
          "Mọi thông tin đều được công khai, minh bạch tại Fanpage và các phương tiện truyền thông chính thức của Dự án Nuôi Em.",
      },
      {
        title: "CÔNG BẰNG",
        description: "Các hoạt động của Dự án Nuôi Em luôn đảm bảo công bằng dựa trên các tiêu chí đã đặt ra.",
      },
    ],
    cta: "Chúng tôi cam kết duy trì sự minh bạch và công tâm trong mọi hoạt động để xứng đáng với niềm tin của cộng đồng.",
  };

export const historyTimeline: TimelineEvent[] = [
    { date: "Tháng 10/2020", title: "Tiền thân nhóm thiện nguyện", description: "Nhóm trẻ thành lập để cứu trợ bà con miền Trung bị thiệt hại do lũ lụt." },
    { date: "Tháng 12/2020", title: "17 trẻ được bảo trợ", description: "Tổng số trẻ mồ côi được nhận bảo trợ là 17 trẻ." },
    { date: "Tháng 01/2021", title: "Thành lập các Ban", description: "Ban điều hành, xét duyệt, truyền thông, thư ký, tài chính." },
    { date: "Tháng 12/2021", title: "77 trẻ được bảo trợ" },
    { date: "Tháng 01/2022", title: "Bổ sung nhân sự", description: "Nhân viên Thư ký, nhân viên Truyền thông." },
    { date: "Tháng 12/2022", title: "200 trẻ được bảo trợ" },
    { date: "Tháng 12/2023", title: "255 trẻ được bảo trợ" },
    { date: "Năm 2024", title: "295 trẻ được bảo trợ", description: "02 đợt xét duyệt 13 & 14. Đến 12/2024 có 73 trẻ hoàn thành bảo trợ." },
    { date: "Đến 06/2025", title: "350 trẻ được bảo trợ", description: "02 đợt xét duyệt 15 & 16." },
];

export const logoStorySections: 
  {
    title: string;
    paragraphs: string[];
    bullets?: { title: string; items: string[] }[];
    colors?: { name: string; meaning: string }[];
  }[]
 = [
    {
      title: "Ngọn lửa nuôi dưỡng",
      paragraphs: [
        "Logo Dự án Nuôi Em là biểu tượng của sự ấm áp, nghị lực và lòng trắc ẩn — giống như một ngọn lửa nhỏ được thắp lên để sưởi ấm hành trình của các em.",
        "Biểu tượng kết hợp ngọn lửa cách điệo với dòng chữ “DỰ ÁN NUÔI EM”, trên nền sáng — thể hiện tinh thần Open Hearts: gần gũi, minh bạch và đầy hy vọng.",
      ],
    },
    {
      title: "Cấu trúc thiết kế",
      paragraphs: [],
      bullets: [
        {
          title: "Phần hình — ngọn lửa",
          items: [
            "Ngọn lửa tượng trưng cho nghị lực, sự sưởi ấm và niềm tin được lan tỏa từ cộng đồng.",
            "Đường cong mềm mại gợi sự bao bọc, dung dưỡng — mỗi đóng góp là một tia sáng thêm vào ngọn lửa chung.",
            "Tông cam san hô là điểm nhấn thương hiệu, hài hòa với bảng màu sky – peach – sage trên website.",
          ],
        },
        {
          title: "Phần chữ",
          items: [
            'Dòng chữ “DỰ ÁN NUÔI EM” viết hoa, rõ ràng — tên gọi chính thức của dự án thiện nguyện Nuôi cơm trưa và giúp trẻ tới trường.',
            "Phiên bản ngang có thêm dòng “Ánh Sáng Núi Rừng” khi cần nhận diện đối tác sáng lập.",
          ],
        },
      ],
    },
    {
      title: "Ý nghĩa màu sắc",
      paragraphs: [],
      colors: [
        { name: "Cam san hô (#f0784a)", meaning: "Ấm áp, nghị lực & điểm nhấn thương hiệu" },
        { name: "Vàng kim (#ffe4a8)", meaning: "Hy vọng, ánh sáng & sự lan tỏa yêu thương" },
        { name: "Đỏ ấm (#d85a52)", meaning: "Trái tim, sự sẻ chia & cam kết vì trẻ em" },
        { name: "Xanh sage", meaning: "Phát triển bền vững & sự tin cậy" },
      ],
    },
];

export const processSteps: ProcessStep[] = [
    {
      round: "Vòng 01",
      title: "THU THẬP THÔNG TIN",
      description:
        "Dự án Nuôi Em nhận hồ sơ trẻ mồ côi, khó khăn do đọc giả và mạnh thường quân giới thiệu và tiến hành thu thập thông tin.",
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
      title: "TRÌNH BAN ĐIỀU HÀNH DỰ ÁN",
      subTitle: "THÔNG QUA DANH SÁCH BẢO TRỢ",
      description: "Ban điều hành phê duyệt danh sách trẻ mồ côi được bảo trợ chính thức.",
    },
];

export const scoringCategories: ScoringCategory[] = [
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
];

export const volunteerContent: {
  formUrl: string;
  roles: { title: string; items: string[] };
  audiences: { title: string; description: string }[];
  commitment: string;
} = {
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSc9Ldr1JXKSbWcg9e3tj3WSP2GWXwozN5HkBPNFK7bodWRr9A/viewform",
    roles: {
      title: "Vai trò của bạn",
      items: [
        "Cập nhật tình hình sinh hoạt/học tập của con trên trường/lớp.",
        "Động viên con tham gia hoạt động phong trào của trường, Dự án Nuôi Em, cộng đồng.",
        "Tham gia/đồng tổ chức các hoạt động chung của Dự án Nuôi Em tại địa phương.",
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
      "Để đảm bảo hiệu quả đồng hành, Dự án Nuôi Em mong muốn Tình nguyện viên cam kết thời gian và phối hợp thường xuyên với Ban Vận hành.",
  };

export const mouContent: {
  definition: string;
  pillars: { title: string; description: string }[];
  quote: string;
  cta: string;
} = {
    definition:
      'MOU (Memorandum of Understanding) là thỏa thuận không ràng buộc giữa hai hoặc nhiều bên, thiết lập sự hiểu biết chung về hoạt động hợp tác.',
    pillars: [
      { title: "Xác định mục đích", description: "Tạo cơ sở, hành lang cho hoạt động chung, xác định ý định hợp tác rõ ràng." },
      { title: "Thể hiện cam kết", description: "Cam kết đóng góp tài chính, truyền thông và sử dụng hình ảnh thương hiệu." },
      { title: "Trách nhiệm các bên", description: "Quy định phạm vi trách nhiệm sau khi thống nhất mục tiêu và vai trò." },
    ],
    quote:
      "Doanh nghiệp mong muốn hợp tác với Dự án Nuôi Em nhằm đóng góp cho xã hội, giúp trẻ em mồ côi có hoàn cảnh khó khăn — vui lòng liên hệ để trao đổi chi tiết về MOU.",
    cta: "Liên hệ: duannuoiem@gmail.com",
  };

export const careersContent: {
  location: string;
  deadline: string;
  sections: { title: string; items: string[] }[];
} = {
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
  };

export const contactInfo: {
  address: string;
  email: string;
  phone: string;
  donationNote: string;
  warning: string;
} = {
    address: "Dự án hỗ trợ trẻ bản cao tại hơn 25 tỉnh thành trên cả nước",
    email: "duannuoiem@gmail.com",
    phone: "0975 302 307",
    donationNote: "Dự án chỉ tiếp nhận quyên góp qua số tài khoản công khai trên trang Đóng góp. Bắt buộc ghi mã NE khi chuyển khoản.",
    warning: "Vui lòng cảnh giác với các hành vi mạo danh. Báo cáo tài chính tại taichinh.nuoiem.com",
  };

export const donateInfo: {
  bank: string;
  branch: string;
  accountName: string;
  accountNumber: string;
  publicAccountLine: string;
  transferFormat: string;
  transferExample: string;
} = {
  bank: "MB",
  branch: "Ngân hàng TMCP Quân đội",
  accountName: "CTCP DNXH QUY NUOI EM",
  accountNumber: "1805",
  publicAccountLine: "STK Minh bạch công khai 4 số QUY NUOI EM tại MB: 1805",
  transferFormat: "“Mã bé nhận nuôi” + Tên bạn (bắt buộc có mã NE)",
  transferExample: "NE00123 Nguyen Van A",
};

export const uiLabels: Record<string, string> = {
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
  };

export function getUiLabel(key: string): string {
  return uiLabels[key] ?? key;
}
