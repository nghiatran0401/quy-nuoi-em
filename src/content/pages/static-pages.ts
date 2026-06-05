import type {
  PageHero,
  PageMeta,
  ProcessStep,
  ScoringCategory,
} from "@/content/types";
import { brandVisual } from "@/config/brand-visual";

export type StaticPageKey =
  | "logoStory"
  | "donate"
  | "process"
  | "scoring"
  | "volunteer"
  | "mou"
  | "members"
  | "careers"
  | "contact"
  | "taiChinh";

type StaticPageContent = {
  meta: PageMeta;
  hero: PageHero;
};

const pages: Record<StaticPageKey, StaticPageContent> = {
  logoStory: {
    meta: {
        title: "Câu chuyện logo",
        description: "Ý nghĩa và cấu trúc thiết kế logo Quỹ Nuôi Em.",
    },
    hero: {
        eyebrow: "Nhận diện thương hiệu",
        title: "Câu Chuyện Logo",
        description:
          "Như trẻ vào tuổi trưởng thành cần Căn cước công dân, Quỹ Nuôi Em khi phát triển cũng cần pháp nhân và logo mới để khẳng định mình.",
    },
  },
  donate: {
    meta: {
        title: "Đóng góp",
        description: "Thông tin chuyển khoản và quyên góp cho Quỹ Nuôi Em.",
    },
    hero: {
        eyebrow: "CHUNG TAY GÓP SỨC",
        title: "Đồng Hành Cùng Quỹ Nuôi Em",
        description: "Mọi sự đóng góp của anh chị đều trân quý và giúp các em nhỏ có thêm cơ hội đến trường.",
    },
  },
  process: {
    meta: {
        title: "Quy trình xét duyệt",
        description: "5 bước xét duyệt hồ sơ trẻ có hoàn cảnh khó khăn minh bạch và công tâm.",
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
        description: "Đăng ký đồng hành cùng Quỹ Nuôi Em và các em nhỏ được bảo trợ.",
    },
    hero: {
        eyebrow: "Chung tay vì cộng đồng",
        title: "Đăng ký trở thành Tình nguyện viên",
        description:
          "Quỹ Nuôi Em xin trân trọng cảm ơn anh chị đã đăng ký trở thành Tình nguyện viên — đồng hành cùng chúng mình và các em bé trên bản đang được bảo trợ!",
    },
  },
  mou: {
    meta: {
        title: "Biên bản ghi nhớ (MOU)",
        description: "Hợp tác doanh nghiệp với Quỹ Nuôi Em qua biên bản ghi nhớ (MOU).",
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
        description: "Các doanh nghiệp đồng hành và tài trợ Quỹ Nuôi Em.",
    },
    hero: {
        eyebrow: "Đối tác & Đồng hành",
        title: "Đối tác đồng hành",
        description:
          "Những cánh tay nối dài yêu thương — Cùng chung tay vì tương lai trẻ em Việt Nam. Quỹ Nuôi Em trân trọng sự đồng hành quý báu của các Doanh nghiệp thành viên.",
    },
  },
  careers: {
    meta: {
        title: "Tuyển dụng",
        description: "Cơ hội nghề nghiệp tại Quỹ Nuôi Em.",
    },
    hero: {
        eyebrow: "CƠ HỘI NGHỀ NGHIỆP",
        title: "Nhân viên Thư ký Quỹ Nuôi Em",
        description:
          "Cùng Quỹ Nuôi Em tiếp bước tới trường và sẻ chia yêu thương đến những hoàn cảnh khó khăn.",
    },
  },
  contact: {
    meta: {
        title: "Liên hệ",
        description: "Thông tin liên hệ Quỹ Nuôi Em — email, hotline, fanpage và địa chỉ văn phòng.",
    },
    hero: {
        eyebrow: "Kết nối với Quỹ",
        title: "Liên hệ Quỹ Nuôi Em",
        description:
          "Anh chị cần hỗ trợ về nuôi em, đóng góp hoặc hợp tác — dự án luôn sẵn sàng đồng hành cùng anh chị.",
    },
  },
  taiChinh: {
    meta: {
      title: "Tài chính — Công khai sao kê",
      description:
        "Trang tài chính Quỹ Nuôi Em — công khai sao kê tài khoản duy nhất, 8+ cách minh bạch, cập nhật bởi 20+ bạn TNV.",
    },
    hero: {
      eyebrow: "Công khai tài chính",
      title: "Sao kê tài khoản Quỹ Nuôi Em",
      description:
        "Hệ thống dữ liệu tài chính được cập nhật trực tiếp bởi chính 20+ Tình nguyện viên, đồng thời là anh chị Nuôi Em — Minh bạch, công khai dựa trên nền tảng dữ liệu số, giúp mọi khoản đóng góp đều có thể theo dõi và đối soát dễ dàng",
    },
  },
};

export function getStaticPageMeta(page: StaticPageKey): PageMeta {
  return pages[page].meta;
}

export function getStaticPageHero(page: StaticPageKey): PageHero {
  return pages[page].hero;
}

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
        "Logo Quỹ Nuôi Em là biểu tượng của sự ấm áp, nghị lực và lòng trắc ẩn — giống như một ngọn lửa nhỏ được thắp lên để sưởi ấm hành trình của các em.",
        "Biểu tượng kết hợp ngọn lửa cách điệo với dòng chữ “QUỸ NUÔI EM”, trên nền sáng — thể hiện tinh thần Open Hearts: gần gũi, minh bạch và đầy hy vọng.",
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
            'Dòng chữ “QUỸ NUÔI EM” viết hoa, rõ ràng — tên gọi chính thức của Quỹ Nuôi Em (nuôi cơm trưa và giúp trẻ tới trường).',
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
        "Quỹ Nuôi Em nhận hồ sơ trẻ có hoàn cảnh khó khăn do đọc giả và mạnh thường quân giới thiệu và tiến hành thu thập thông tin.",
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
      title: "BAN XÉT DUYỆT HỌP CHỐT DANH SÁCH",
      subTitle: "TRẺ ĐƯỢC BẢO TRỢ THEO TỪNG QUÝ",
      description:
        "Thành viên Ban xét duyệt thảo luận từng trường hợp và quyết định danh sách được bảo trợ.",
    },
    {
      round: "Vòng 05",
      title: "TRÌNH BAN ĐIỀU HÀNH QUỸ",
      subTitle: "THÔNG QUA DANH SÁCH BẢO TRỢ",
      description: "Ban điều hành phê duyệt danh sách trẻ được bảo trợ chính thức.",
    },
];

export const scoringCategories: ScoringCategory[] = [
    {
      icon: "🏠",
      title: "1. HOÀN CẢNH",
      items: [
        { label: "Không còn cha mẹ", points: "10 điểm", priority: "Ưu tiên 1" },
        { label: "Chỉ còn cha", points: "6 điểm", priority: "Ưu tiên 2" },
        { label: "Chỉ còn mẹ", points: "4 điểm", priority: "Ưu tiên 3" },
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

/** Internal registration flow — do not link to legacy third-party forms. */
export const volunteerRegisterPath = brandVisual.social.facebook;

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
      "Doanh nghiệp mong muốn hợp tác với Quỹ Nuôi Em nhằm đóng góp cho xã hội, giúp trẻ em có hoàn cảnh khó khăn — vui lòng liên hệ để trao đổi chi tiết về biên bản ghi nhớ (MOU).",
    cta: "Liên hệ: duannuoiem@gmail.com",
  };

export const contactContent: {
  intro: string;
  phoneContactName: string;
  facebookLabel: string;
  messengerLabel: string;
  officeLabel: string;
} = {
  intro:
    "Anh chị có thắc mắc về nuôi em, đóng góp, đăng ký tình nguyện hoặc hợp tác — vui lòng liên hệ dự án qua các kênh bên dưới.",
  phoneContactName: "Anh Trung",
  facebookLabel: "Fanpage Nuôi Em",
  messengerLabel: "Nhắn tin qua Messenger",
  officeLabel: "Địa chỉ văn phòng",
};

export const careersContent: {
  location: string;
  deadline: string;
  sections: { title: string; items: string[] }[];
} = {
    location: "Khánh Hòa / Thành phố Hồ Chí Minh / Địa phương hoạt động",
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
          "Viết bài truyền thông trên website và trang Facebook.",
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
  publicAccountLine:
    "Số tài khoản minh bạch công khai 4 số QUY NUOI EM tại Ngân hàng Quân đội (MB): 1805",
  transferFormat: "Mã NE + số điện thoại + tên anh chị",
  transferExample: "NE00123 09xxxxxxxx Nguyen Van A",
};

export const uiLabels: Record<string, string> = {
    partners: "Đơn vị đồng hành & Tài trợ",
    registerNow: "Đăng ký ngay",
    viewReports: "Xem báo cáo minh bạch",
    viewProcess: "Xem quy trình xét duyệt",
    scoringTotal: "Tổng điểm xét duyệt",
    scoringMax: "/ 50",
    referenceTable: "Bảng tham chiếu chi tiết",
    registerVolunteer: "Đăng ký Tình nguyện viên",
    referChild: "Giới thiệu hồ sơ trẻ",
    scanQr: "Quét mã QR để chuyển khoản nhanh",
    whatIsMou: "Biên bản ghi nhớ (MOU) là gì?",
    mouGallery: "Hình ảnh ký kết thực tế",
    donateWarning: "Lưu ý về quyên góp",
    applyNow: "Ứng tuyển qua email",
  };

export function getUiLabel(key: string): string {
  return uiLabels[key] ?? key;
}
