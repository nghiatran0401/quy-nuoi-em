import type { PageMeta, PageHero } from "@/content/types";

type DataPageContent = {
  meta: PageMeta;
  hero: PageHero;
};

const pages = {
  children: {
    meta: {
        title: "Danh sách điểm trường hỗ trợ",
        description: "Tra cứu điểm trường Nuôi Em theo tỉnh, quy mô học sinh và tình trạng hỗ trợ.",
    },
    hero: {
        title: "Danh sách điểm trường hỗ trợ",
        description:
          "Theo dõi điểm trường theo quy mô học sinh và tra cứu nhanh theo tên trường.",
    },
  },
  reports: {
    meta: {
        title: "Báo cáo tài chính",
        description: "Minh bạch tài chính là ưu tiên hàng đầu. Xem chi tiết thu chi hàng tháng của quỹ.",
    },
    hero: {
        title: "Minh bạch tài chính",
        description:
          "Chúng tôi cam kết công khai chi tiết mọi khoản đóng góp và chi tiêu. Niềm tin của cộng đồng chính là tài sản quý giá nhất của Quỹ Nuôi Em.",
    },
  },
  news: {
    meta: {
        title: "Bản tin & Hoạt động",
        description: "Tin tức và hoạt động cộng đồng từ Quỹ Nuôi Em.",
    },
    hero: {
        eyebrow: "Cập nhật mới nhất",
        title: "Bản tin & Hoạt động",
        description:
          "Những câu chuyện về hành trình gieo mầm yêu thương và các hoạt động cộng đồng từ Quỹ Nuôi Em.",
    },
  },
  statements: {
    meta: {
        title: "Sao kê tài khoản",
        description: "Thống kê tài khoản thiện nguyện minh bạch qua nền tảng Thiện Nguyện.",
    },
    hero: {
        title: "Sao kê tài khoản",
        description:
          "Theo dõi sao kê Ngân hàng Quân đội (MB) và hoạt động quyên góp minh bạch trên nền tảng Thiện Nguyện.",
    },
  },
  donors: {
    meta: {
      title: "Danh sách nhà tài trợ",
      description:
        "Tra cứu nhà tài trợ Nuôi Em theo mã NE, tỉnh và trạng thái mã — dữ liệu công khai, liên hệ đã được ẩn một phần.",
    },
    hero: {
      title: "Danh sách nhà tài trợ",
      description:
        "Danh sách công khai các nhà tài trợ đang đồng hành cùng Quỹ Nuôi Em. Thông tin liên hệ được ẩn một phần để bảo vệ quyền riêng tư.",
    },
  },
  maGhep: {
    meta: {
      title: "Bảng mã ghép NE giảm ăn",
      description:
        "Tra cứu mã ghép công khai cho NE giảm ăn — mã NE đại diện, thời gian hỗ trợ, số tiền và mã ghép mới theo niên khóa 2025–2026.",
    },
    hero: {
      title: "Bảng mã ghép NE giảm ăn",
      description:
        "Danh sách mã ghép công khai từ danh mục Nuôi Em. Các dòng đánh dấu X là NE giảm ăn cần ghép mã mới.",
    },
  },
} as const satisfies Record<string, DataPageContent>;

export type DataPageKey = keyof typeof pages;

export function getDataPageMeta(page: DataPageKey): PageMeta {
  return pages[page].meta;
}

export function getDataPageHero(page: DataPageKey): PageHero {
  return pages[page].hero;
}

export const dataUiLabels: Record<string, string> = {
    totalChildren: "Tổng số trẻ",
    active: "Đang nhận bảo trợ",
    completed: "Hoàn thành bảo trợ",
    terminated: "Chấm dứt bảo trợ",
    statusBreakdown: "Tỷ lệ hiện trạng",
    allProvinces: "Tất cả tỉnh thành",
    allStatuses: "Tất cả trạng thái",
    searchPlaceholder: "Tìm theo tên hoặc mã hồ sơ...",
    profileCode: "Mã hồ sơ",
    fullName: "Họ và tên",
    birthYear: "Năm sinh",
    gender: "Giới tính",
    province: "Tỉnh thành",
    status: "Trạng thái",
    noResults: "Không tìm thấy hồ sơ phù hợp.",
    backToList: "Quay lại danh sách",
    age: "Tuổi",
    reportsCount: "báo cáo",
    reportsListTitle: "Danh sách báo cáo",
    reportsSampleNote:
      "Hiển thị {shown} báo cáo mẫu từ dữ liệu crawl. Trang live có 67 báo cáo (kết nối Supabase ở Phase 4).",
    allYears: "Tất cả",
    year: "Năm",
    totalIncome: "Tổng thu",
    totalExpense: "Tổng chi",
    downloadReport: "Tải báo cáo chi tiết",
    readMore: "Xem chi tiết",
    backToNews: "Quay lại bản tin",
    publishedOn: "Đăng ngày",
    embedNote: "Dưới đây là giao dịch được lấy trực tiếp từ App thiện nguyện",
    openFullPage: "Mở trang sao kê đầy đủ",
    sampleDataNote:
      "Hiển thị {shown} hồ sơ mẫu từ dữ liệu crawl. Kết nối Supabase (Phase 4) để tải đủ 387 hồ sơ.",
  };

export function getDataUiLabel(key: string, vars?: Record<string, string>): string {
  let text = dataUiLabels[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(`{${k}}`, v);
    }
  }
  return text;
}
