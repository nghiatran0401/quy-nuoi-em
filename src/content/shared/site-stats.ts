import type { Localized, StatItem } from "@/content/types";

/** Snapshot from https://nuoiem-lovat.vercel.app/ — school year 9/2025–5/2026 */
export const siteStats: Localized<StatItem[]> = {
  vi: [
    {
      value: "81.937",
      label: "Tổng số em nuôi",
      hint: "Năm học 9/2025–5/2026",
    },
    {
      value: "56,9 Tỷ",
      label: "Tổng tiền đã nhận",
      hint: "Chi tiết: 56.890.334.781đ",
    },
    { value: "761", label: "Tổng trường học", hint: "Trong danh mục công khai" },
    {
      value: "40.690",
      label: "Đã có người nuôi",
      hint: "49,7% tổng số em nuôi",
    },
    {
      value: "41.247",
      label: "Chưa có người nuôi",
      hint: "50,3% tổng số em nuôi",
    },
  ],
  en: [
    {
      value: "81,937",
      label: "Children in catalog",
      hint: "School year Sep 2025–May 2026",
    },
    {
      value: "56.9B VND",
      label: "Total received",
      hint: "Detail: 56,890,334,781 VND",
    },
    { value: "761", label: "Partner schools", hint: "In the public catalog" },
    {
      value: "40,690",
      label: "With a sponsor",
      hint: "49.7% of all children",
    },
    {
      value: "41,247",
      label: "Awaiting a sponsor",
      hint: "50.3% of all children",
    },
  ],
};

export const catalogBreakdownStats: Localized<StatItem[]> = {
  vi: [
    { value: "29.322", label: "Đang ăn", hint: "Đang trong chương trình" },
    { value: "52.615", label: "Rút khỏi dự án", hint: "Đã rút khỏi danh mục" },
  ],
  en: [
    { value: "29,322", label: "Currently enrolled", hint: "Active in the program" },
    { value: "52,615", label: "Withdrawn", hint: "Left the catalog" },
  ],
};

export const homeStats: Localized<StatItem[]> = siteStats;
