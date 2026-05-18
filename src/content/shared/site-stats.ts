import type { Localized, StatItem } from "@/content/types";

export const siteStats: Localized<StatItem[]> = {
  vi: [
    { value: "387", label: "Tổng số trẻ", hint: "Đã được bảo trợ" },
    { value: "51.3 Tỷ+", label: "Tổng Tiền Nhận", hint: "Đóng góp từ cộng đồng" },
    { value: "23.8 Tỷ+", label: "Tổng Tiền Chi", hint: "Hỗ trợ trực tiếp" },
    { value: "27.5 Tỷ+", label: "Số Tiền Còn Lại", hint: "Minh bạch tài chính" },
  ],
  en: [
    { value: "387", label: "Children supported", hint: "Total sponsored" },
    { value: "51.3B+", label: "Total received", hint: "Community contributions" },
    { value: "23.8B+", label: "Total disbursed", hint: "Direct support" },
    { value: "27.5B+", label: "Remaining balance", hint: "Financial transparency" },
  ],
};

export const homeStats: Localized<StatItem[]> = {
  vi: [
    { value: "387", label: "Trẻ được bảo trợ" },
    { value: "17", label: "Đợt bảo trợ" },
    { value: "51.3T+", label: "Tổng tiền nhận" },
    { value: "27.5T+", label: "Số tiền còn lại" },
  ],
  en: [
    { value: "387", label: "Children sponsored" },
    { value: "17", label: "Sponsorship rounds" },
    { value: "51.3B+", label: "Total received" },
    { value: "27.5B+", label: "Remaining balance" },
  ],
};
