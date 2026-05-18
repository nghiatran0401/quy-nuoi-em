import type { Localized, PageMeta, PageHero } from "@/content/types";
import type { Locale } from "@/i18n/config";

type DataPageContent = {
  meta: Localized<PageMeta>;
  hero: Localized<PageHero>;
};

const pages = {
  children: {
    meta: {
      vi: {
        title: "Danh sách trẻ em",
        description: "Danh sách các em nhỏ đang nhận được sự hỗ trợ từ Quỹ Tony Buổi Sáng.",
      },
      en: {
        title: "Children",
        description: "Children receiving support from the Tony Buoi Sang Fund.",
      },
    },
    hero: {
      vi: {
        title: "Danh sách trẻ em",
        description:
          "Mỗi em nhỏ là một câu chuyện, một ước mơ cần được chắp cánh. Hãy cùng chúng tôi viết tiếp những trang sách cuộc đời cho các em.",
      },
      en: {
        title: "Children",
        description:
          "Every child has a story and a dream worth nurturing. Join us in writing the next chapters of their lives.",
      },
    },
  },
  reports: {
    meta: {
      vi: {
        title: "Báo cáo tài chính",
        description: "Minh bạch tài chính là ưu tiên hàng đầu. Xem chi tiết thu chi hàng tháng của quỹ.",
      },
      en: {
        title: "Financial reports",
        description: "Financial transparency is our priority. View monthly income and expense reports.",
      },
    },
    hero: {
      vi: {
        title: "Minh bạch tài chính",
        description:
          "Chúng tôi cam kết công khai chi tiết mọi khoản đóng góp và chi tiêu. Niềm tin của cộng đồng chính là tài sản quý giá nhất của Quỹ Tony Buổi Sáng.",
      },
      en: {
        title: "Financial transparency",
        description:
          "We are committed to publishing every contribution and expense in detail. Community trust is our most valuable asset.",
      },
    },
  },
  news: {
    meta: {
      vi: {
        title: "Bản tin & Hoạt động",
        description: "Tin tức và hoạt động cộng đồng từ Quỹ Tony Buổi Sáng.",
      },
      en: {
        title: "News & Activities",
        description: "News and community activities from the Tony Buoi Sang Fund.",
      },
    },
    hero: {
      vi: {
        eyebrow: "Cập nhật mới nhất",
        title: "Bản tin & Hoạt động",
        description:
          "Những câu chuyện về hành trình gieo mầm yêu thương và các hoạt động cộng đồng từ Quỹ Tony Buổi Sáng.",
      },
      en: {
        eyebrow: "Latest updates",
        title: "News & Activities",
        description: "Stories of compassion and community activities from the Tony Buoi Sang Fund.",
      },
    },
  },
  statements: {
    meta: {
      vi: {
        title: "Sao kê tài khoản",
        description: "Thống kê tài khoản thiện nguyện minh bạch qua nền tảng Thiện Nguyện.",
      },
      en: {
        title: "Account statements",
        description: "Transparent charity account statistics via the Thien Nguyen platform.",
      },
    },
    hero: {
      vi: {
        title: "Sao kê tài khoản",
        description: "Theo dõi giao dịch minh bạch trên tài khoản thiện nguyện MB Bank của Quỹ.",
      },
      en: {
        title: "Account statements",
        description: "Track transparent transactions on the Fund's MB Bank charity account.",
      },
    },
  },
} as const satisfies Record<string, DataPageContent>;

export type DataPageKey = keyof typeof pages;

export function getDataPageMeta(page: DataPageKey, locale: Locale): PageMeta {
  return pages[page].meta[locale];
}

export function getDataPageHero(page: DataPageKey, locale: Locale): PageHero {
  return pages[page].hero[locale];
}

export const dataUiLabels: Localized<Record<string, string>> = {
  vi: {
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
    embedNote: "Dữ liệu sao kê được cung cấp bởi nền tảng Thiện Nguyện (MBBank).",
    openFullPage: "Mở trang sao kê đầy đủ",
    sampleDataNote:
      "Hiển thị {shown} hồ sơ mẫu từ dữ liệu crawl. Kết nối Supabase (Phase 4) để tải đủ 387 hồ sơ.",
  },
  en: {
    totalChildren: "Total children",
    active: "Currently sponsored",
    completed: "Completed sponsorship",
    terminated: "Terminated",
    statusBreakdown: "Status breakdown",
    allProvinces: "All provinces",
    allStatuses: "All statuses",
    searchPlaceholder: "Search by name or profile code...",
    profileCode: "Profile code",
    fullName: "Full name",
    birthYear: "Birth year",
    gender: "Gender",
    province: "Province",
    status: "Status",
    noResults: "No matching profiles found.",
    backToList: "Back to list",
    age: "Age",
    reportsCount: "reports",
    reportsListTitle: "Report list",
    reportsSampleNote:
      "Showing {shown} sample reports from crawl data. The live site lists 67 reports (Supabase in Phase 4).",
    allYears: "All",
    year: "Year",
    totalIncome: "Total income",
    totalExpense: "Total expense",
    downloadReport: "Download full report",
    readMore: "Read more",
    backToNews: "Back to news",
    publishedOn: "Published",
    embedNote: "Statement data is provided by the Thien Nguyen platform (MBBank).",
    openFullPage: "Open full statement page",
    sampleDataNote:
      "Showing {shown} sample profiles from crawl data. Connect Supabase (Phase 4) for all 387 profiles.",
  },
};

export function getDataUiLabel(locale: Locale, key: string, vars?: Record<string, string>): string {
  let text = dataUiLabels[locale][key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(`{${k}}`, v);
    }
  }
  return text;
}
