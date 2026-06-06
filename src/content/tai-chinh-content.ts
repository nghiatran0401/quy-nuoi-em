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
      value: "Ngay lập tức",
      label: "Cập nhật",
      hint: "Sao kê trực tiếp từ App Thiện Nguyện MB Bank.",
    },
    {
      value: "Báo cáo tài chính",
      label: "Định kỳ hàng tháng",
      hint: "Bao gồm tiền dự án Nuôi Em và Vận hành",
    },
    {
      value: "20+ bạn Nuôi Em",
      label: "Giám sát bởi",
      hint: "Anh chị TNV cùng tham gia",
    },
  ] satisfies StatItem[],

  intro: {
    paragraphs: [
      'Trong những nỗ lực công khai tài chính, các bạn sẽ thấy Quỹ Nuôi Em kết hợp giữa "giấy tờ" và cả cơ chế giám sát từ xa, giám sát thực tế.',
      "Khi đồng ý nuôi em, cũng có nghĩa anh chị đã hoàn toàn nắm rõ thông tin về Chương trình, uỷ quyền, đồng thuận, tin tưởng về cách thức quản lý tài chính, triển khai thực hiện do Nhóm Nuôi Em đang vận hành, triển khai, đồng thời trao quyền để Nhóm quyết định những vấn đề liên quan đến Chương trình.",
    ],
  },

  stewardNoteTitle: "Cập nhật bởi cộng đồng và địa phương",
  stewardNote:
    "Báo cáo hàng tháng vận hành có sự tham gia đóng góp công sức, chụp ảnh, thông tin của hơn 700 thầy cô giáo cắm bản, hiệu trưởng, hiệu phó, đang trực tiếp dạy học và nấu ăn cho học sinh tham gia dự án, được đưa trực tiếp lên Nhóm Facebook theo từng trường / lớp và giao lưu, chia sẻ trực tiếp với các anh chị nuôi định danh của các học sinh. Đồng thời sẽ hỗ trợ anh chị lên thăm thực tế lớp học, gia đình 2-3 lần/năm học.",

  sectionNav: [
    { id: "bc-thu-chi", label: "BC tổng kết" },
    { id: "kenh-minh-bach", label: "Theo dõi tài chính" },
    { id: "cach-minh-bach", label: "8+ cách minh bạch" },
    { id: "sao-ke", label: "Sao kê" },
    { id: "chung-tu-chi", label: "Chứng từ chi" },
  ],

  channelsIntro: {
    eyebrow: "Theo dõi tài chính",
    title: "Một vài cách để xem",
  },

  channels: [
    {
      id: "archive",
      title: "Công khai sao kê tài khoản",
      description:
        "Ngay phía dưới phần này là công khai toàn bộ sao kê gửi tới cho dự án. Sao kê được chúng tôi nhập và 2 lần check.",
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
    description: "Các phương thức minh bạch Nuôi Em đang vận hành:",
  },

  pillarGroups: [
    {
      id: "practical",
      eyebrow: "Về mặt thực tế",
      title: "Quỹ Nuôi em đã và đang áp dụng",
      pillars: [
        {
          id: "phone",
          title: "Gọi điện bất kì lúc nào",
          description:
            "Có thể chủ động liên hệ thầy, cô hiệu trưởng hoặc Phòng Công tác Xã hội theo số điện thoại được cung cấp để kiểm tra và xác minh thực tế",
        },
        {
          id: "one-ne",
          title: "Mỗi mã NE tương ứng 1 bữa ăn - 1 học sinh - 1 người nuôi",
          description:
            "Để đảm bảo tính minh bạch, mỗi mã NE luôn tương ứng với 1 bữa ăn - 1 học sinh - 1 người nuôi cụ thể, hoàn toàn không có sự trùng lặp",
        },
        {
          id: "oversight",
          title: "Có 20+ Tình nguyện viên, đồng thời nhận anh chị nuôi",
          description:
            "Không chỉ dừng lại ở việc đóng góp tài chính, các anh chị nuôi chính là những người trực tiếp đồng hành giám sát. Dự án luôn chào đón sự tham gia của các bạn vào công tác đối soát, kiểm tra sao kê và quản lý dòng tiền, cùng nhau xây dựng một hệ sinh thái minh bạch tuyệt đối.",
        },
        {
          id: "visits",
          title: "Thăm em nuôi 2–3 lần/ năm",
          description:
            "Bạn thử nghĩ, cách nào là cách hùng hồn nhất cho việc minh bạch tài chính? Đó là thăm trực tiếp 70.000+ cháu không sai cháu nào thì tức là tài chính minh bạch. Tư duy rất đơn giản phải không? Dự án tổ chức thăm nuôi định kỳ 2–3 lần/ năm, có thông báo rộng rãi để mọi người có thể đăng kí dự.",
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
          title: "Xác nhận bằng văn bản qua tin nhắn Fanpage",
          description:
            "Mỗi khi nhận được khoản đóng góp kèm mã NE, Dự án sẽ gửi phản hồi trong vòng 24–48 giờ qua tin nhắn, tiếp sau đó là xác nhận kèm mã giao dịch cụ thể. Vì đội ngũ vận hành hoàn toàn là các bạn Tình nguyện viên — cũng là những người đi làm, đi học,... tranh thủ thời gian trong ngày để hỗ trợ dự án, Nuôi Em rất mong anh chị thông cảm và thấu hiểu sự nỗ lực này.",
        },
        {
          id: "statements",
          title: "Có công khai sao kê tài khoản",
          description:
            "Ngay phía dưới phần này, là công khai toàn bộ sao kê gửi tới cho dự án.",
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
      "Theo sự đồng thuận và thống nhất từ các anh chị nuôi tham gia dự án từ năm 2019, Nuôi Em được phép tối ưu hóa chi phí nhàn rỗi bằng hình thức gửi tiết kiệm. Toàn bộ tiền lãi phát sinh được cam kết sử dụng 100% cho mục đích vận hành, hỗ trợ cán sự đi khảo sát thực địa, hỗ trợ công các phí cho tình nguyện viên: từ 1.500.000đ/ cán sự/ lần/ tỉnh; khác vùng, khu vực: 2.000.000đ/ tỉnh; nước ngoài: tối đa 3.000.000đ/ quốc gia.",
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
      "Danh sách điểm trường giải ngân tiền ăn tập trung — kèm link Drive chứng từ (nếu đã có).",
    emptyState: "Chưa tải được danh sách chứng từ chi. Anh chị thử lại sau hoặc xem trên Group/Fanpage.",
    interimLabel: "Xem thêm trên",
  },

  expenseDocsTableLabels: {
    month: "Tháng",
    searchPlaceholder: "Tìm theo tên trường, xã, tỉnh…",
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
    noDocuments: "Đang cập nhật",
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
