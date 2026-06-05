import type { StatItem } from "@/content/types";

export type FinanceChannel = {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  external?: boolean;
  featured?: boolean;
};

export type TransparencyPillar = {
  id: string;
  title: string;
  description: string;
};

export type TransparencyPillarGroup = {
  id: string;
  eyebrow: string;
  title: string;
  pillars: TransparencyPillar[];
};

export const taiChinhContent = {
  trustStats: [
    {
      value: "Vào buổi tối",
      label: "Update hàng tuần",
      hint: "Sao kê được cập nhật định kỳ",
    },
    {
      value: "Trước 3–5 ngày",
      label: "Sao kê toàn bộ tính tới",
      hint: "Tính đến thời điểm gần nhất",
    },
    {
      value: "20+ bạn Nuôi Em",
      label: "Giám sát bởi",
      hint: "Anh chị TNV cùng tham gia",
    },
  ] satisfies StatItem[],

  intro: {
    paragraphs: [
      'Trong những nỗ lực công khai tài chính, các bạn sẽ thấy Quỹ Nuôi Em là một dự án rất "kỳ lạ". Không quá trú trọng hết vào mặt "giấy tờ" — cái mà chúng tôi cho rằng có rất nhiều cách để làm được.',
      'Chúng tôi còn "tự làm khó mình" khi nghĩ ra rất nhiều cách, và còn cùng lắng nghe các cách khác mọi người góp ý để ngày càng minh bạch hơn theo-rất-nhiều-cách, luôn luôn cập nhật những cách làm mới. Nếu có cách nào, anh chị cứ liên hệ với chúng tôi ở phía dưới.',
      "Chúng tôi còn vinh dự được nhiều anh chị em ở tổ chức phi chính phủ, phi lợi nhuận, tổ chức kiểm toán uy tín tham gia nuôi em — sau này còn tham gia hỗ trợ kiểm soát, giúp tối ưu về mặt tài chính cho dự án.",
      "Khi đồng ý nuôi em, cũng có nghĩa anh chị đã hoàn toàn nắm rõ thông tin về Chương trình, uỷ quyền, đồng thuận, tin tưởng về cách thức quản lý tài chính, triển khai thực hiện do Nhóm Nuôi Em đang vận hành, triển khai, đồng thời trao quyền để Nhóm quyết định những vấn đề liên quan đến Chương trình.",
    ],
  },

  stewardNote:
    'Trang tài chính của Quỹ Nuôi Em được cập nhật bởi chính 20+ bạn TNV là anh chị Nuôi Em. Chúng tôi không có kiểm toán độc lập theo kiểu quỹ lớn, nhưng vẫn cố gắng tìm mọi cách "chặt chẽ" và "minh bạch" hơn cả kiểm toán.',

  sectionNav: [
    { id: "kenh-minh-bach", label: "Theo dõi tài chính" },
    { id: "cach-minh-bach", label: "8+ cách minh bạch" },
    { id: "sao-ke", label: "Sao kê" },
    { id: "chung-tu-chi", label: "Chứng từ chi" },
  ],

  channelsIntro: {
    eyebrow: "Theo dõi tài chính",
    title: "Một vài cách để xem",
    description:
      "Dưới đây là các kênh chúng tôi đang dùng để công khai — anh chị có thể chọn cách phù hợp với mình.",
  },

  channels: [
    {
      id: "archive",
      title: "Công khai sao kê tài khoản",
      description:
        "Ngay phía dưới phần này là công khai toàn bộ sao kê gửi tới cho dự án, được cập nhật 2 ngày 1 lần. Sao kê được chúng tôi nhập và 2 lần check.",
      ctaLabel: "Xuống phần sao kê",
      href: "#sao-ke",
    },
    {
      id: "live",
      title: "Sao kê trên Thiện Nguyện",
      description:
        "Ngoài sao kê tại đây, anh chị cũng có thể xem giao dịch qua nền tảng Thiện Nguyện — tài khoản đã được xác thực.",
      ctaLabel: "Xem sao kê Thiện Nguyện",
      href: "/sao-ke-tai-khoan",
      featured: true,
    },
    {
      id: "reports",
      title: "Báo cáo thu chi hàng tháng",
      description:
        "Báo cáo tóm tắt thu chi theo tháng — để anh chị theo dõi thêm ngoài sao kê chi tiết.",
      ctaLabel: "Xem báo cáo",
      href: "/bao-cao",
    },
  ] satisfies FinanceChannel[],

  pillarsIntro: {
    eyebrow: "Về mặt thực tế và giấy tờ",
    title: "8+ cách minh bạch",
    description: "Những cách Quỹ Nuôi Em đang cố gắng áp dụng — chưa hoàn hảo, nhưng luôn mở để cải thiện.",
  },

  pillarGroups: [
    {
      id: "practical",
      eyebrow: "Về mặt thực tế",
      title: "Mà Quỹ Nuôi Em đang cố gắng áp dụng",
      pillars: [
        {
          id: "phone",
          title: "Gọi điện bất kì lúc nào",
          description:
            "Bạn được cung cấp SĐT Thầy cô giáo, phụ huynh học sinh, trưởng bản, hiệu trưởng và cả phòng giáo dục để kiểm soát em đó có được ăn không.",
        },
        {
          id: "one-ne",
          title: "Mỗi NE — mỗi cháu 1 người nuôi",
          description:
            "Không có chuyện 1 cháu có 2 người nuôi khác nhau. Một NE tương ứng 1 cháu — 1 người nuôi cụ thể.",
        },
        {
          id: "oversight",
          title: "Có 20–30 giám sát từ chính người Nuôi Em",
          description:
            "Một điểm thú vị là dự án nuôi luôn mở rộng chào đón sự hỗ trợ, cũng chính là sự giám sát từ chính 40.000 anh chị Nuôi — các bạn hỗ trợ và được tham gia các công việc sao kê, hỗ trợ tài chính giúp dự án.",
        },
        {
          id: "visits",
          title: "Thăm nuôi 2–3 lần 1 năm",
          description:
            "Bạn thử nghĩ, cách nào là cách hùng hồn nhất cho việc minh bạch tài chính? Đó là thăm trực tiếp — 40.000 cháu không sai cháu nào thì tức là tài chính minh bạch. Tư duy rất đơn giản phải không? Dự án tổ chức thăm nuôi tập thể, 2–3 lần 1 năm, có thông báo rộng rãi để mọi người có thể đăng kí dự.",
        },
      ],
    },
    {
      id: "paperwork",
      eyebrow: "Về mặt giấy tờ",
      title: "Xác nhận và chứng từ",
      pillars: [
        {
          id: "inbox",
          title: "Xác nhận bằng văn bản qua inbox",
          description:
            "Mỗi khi nhận được 1 khoản tiền chuyển khoản Nuôi Em (có kèm mã NE), dự án sẽ gửi phản hồi sau 24–48h thông qua inbox, kèm theo mã giao dịch cụ thể — do người hỗ trợ cũng là bỉm sữa, đi làm, cũng là anh chị nuôi em tham gia dự án, tối tranh thủ.",
        },
        {
          id: "statements",
          title: "Có công khai sao kê tài khoản",
          description:
            "Ngay phía dưới phần này, là công khai toàn bộ sao kê gửi tới cho dự án. Được cập nhật 2 ngày 1 lần.",
        },
        {
          id: "single-account",
          title: "Chỉ có 01 tài khoản duy nhất",
          description:
            "Để tránh việc khó kiểm soát cũng như minh bạch, chúng tôi chỉ dùng 01 tài khoản duy nhất được công khai tại trang đóng góp.",
        },
        {
          id: "payment-docs",
          title: "Giấy tờ đề nghị thanh toán — xác nhận",
          description:
            "Dự án cung cấp các giấy tờ đề nghị thanh toán và xác nhận nhận tiền từ các bên liên quan, công khai trên Fanpage, Group.",
        },
      ],
    },
  ] satisfies TransparencyPillarGroup[],

  savingsNote: {
    title: "Tiền chưa sử dụng tới",
    description:
      "Theo thống nhất từ anh chị em dự án Nuôi Em năm 2019, đồng ý cho phép dự án gửi tiền tiết kiệm. Tiền lãi được sử dụng mục đích: chi phí vận hành, hỗ trợ cán sự hàng tháng và hỗ trợ công tác phí từ 1.500.000 VNĐ/cán sự/lần/tỉnh; khác vùng, khu vực: 2.000.000đ/tỉnh; nước ngoài: tối đa 3.000.000/quốc gia.",
  },

  saoKeSection: {
    id: "sao-ke",
    title: "Sao kê tài khoản",
    description:
      "Công khai sao kê VCB theo tháng — anh chị chọn năm và tháng để xem, hoặc mở bảng gốc trên Google Sheets.",
    loadNotice:
      "Lần đầu tải một tháng có thể mất vài giây. Một số tháng có hơn 10.000 giao dịch — anh chị có thể tìm theo nội dung hoặc mở bảng đầy đủ trên Google Sheets.",
    emptyState: "Không tải được sao kê lúc này. Anh chị thử lại sau hoặc mở trực tiếp trên Google Sheets.",
  },

  statementTableLabels: {
    year: "Năm",
    month: "Tháng",
    searchPlaceholder: "Tìm theo nội dung, ngày hoặc STT…",
    openSheet: "Mở trên Google Sheets",
    transactionCount: "Số giao dịch",
    totalChi: "Tổng chi",
    totalThu: "Tổng thu",
    columnStt: "STT",
    columnDate: "Ngày / Số CT",
    columnChi: "Chi",
    columnThu: "Thu",
    columnBalance: "Số dư",
    columnDetail: "Nội dung",
    noResults: "Không có giao dịch phù hợp trong tháng này.",
    page: "Trang",
    of: "/",
    prev: "Trước",
    next: "Sau",
    loadingTitle: "Đang tải sao kê…",
    loadingHint: "Tháng này có thể có hàng nghìn giao dịch — xin anh chị chờ chút nhé.",
  },

  expenseDocsSection: {
    id: "chung-tu-chi",
    title: "Một vài chứng từ",
    description:
      "Danh sách điểm trường giải ngân tiền ăn tập trung — kèm link Drive chứng từ (nếu đã có). Toàn bộ các khoản chi được cập nhật đều đặn trong group chính thức của dự án.",
    emptyState: "Chưa tải được danh sách chứng từ chi. Anh chị thử lại sau hoặc xem trên Group/Fanpage.",
    interimLabel: "Xem thêm trên",
  },

  expenseDocsTableLabels: {
    month: "Tháng",
    searchPlaceholder: "Tìm theo tên trường, xã, tỉnh…",
    openSheet: "Mở trên Google Sheets",
    schoolCount: "Số điểm trường",
    totalAmount: "Tổng giải ngân",
    withDriveLink: "Đã có link Drive",
    columnStt: "TT",
    columnSchool: "Trường",
    columnCommune: "Xã",
    columnProvince: "Tỉnh",
    columnStudents: "HS được hỗ trợ",
    columnAmount: "Số tiền giải ngân",
    columnDrive: "Chứng từ",
    viewDocuments: "Xem Drive",
    noDocuments: "Chưa có",
    noResults: "Không có điểm trường phù hợp.",
    page: "Trang",
    of: "/",
    prev: "Trước",
    next: "Sau",
  },

  cta: {
    title: "Để lại lời nhắn cho Quỹ Nuôi Em",
    description: "Chúng tôi sẽ phản hồi toàn bộ ý kiến của anh chị ngay khi nhận được.",
    donateLabel: "Đóng góp",
    contactLabel: "Liên hệ",
  },
} as const;
