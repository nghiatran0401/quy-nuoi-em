import type { StatItem } from "@/content/types";

/** Snapshot from Nuôi Em dashboard — school year 9/2025–5/2026 */
export const siteStats: StatItem[] = [
  {
    value: "81.937",
    label: "Tổng số em nuôi",
    hint: "Năm học 9/2025–5/2026",
  },
  {
    value: "56,6\u00a0tỷ\u00a0đ",
    label: "Tổng tiền thu",
    hint: "Chi tiết: 56.615.108.077đ",
  },
  {
    value: "52,3\u00a0tỷ\u00a0đ",
    label: "Tổng tiền chi",
    hint: "Chi tiết: 52.305.002.708đ",
  },
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
];

export const catalogBreakdownStats: StatItem[] = [
  { value: "29.322", label: "Đang ăn", hint: "Đang trong chương trình" },
  { value: "52.615", label: "Rút khỏi dự án", hint: "Đã rút khỏi danh mục" },
];

export const homeStats: StatItem[] = siteStats;
