/** Official homepage finance totals (MB / Thiện Nguyện cumulative; not school-year filtered). */
import {
  formatVndAttached,
  formatVndCompactBillions,
  formatVndDots,
  VND_UNIT,
} from "@/lib/format-vnd";

export const homeFinanceStats = {
  totalThuVnd: 71_159_937_110,
  totalChiVnd: 78_507_521_826,
  period: { start: "1/6/2025", end: "31/5/2026" },
  openingBalanceVnd: 13_354_056_693,
  closingBalanceVnd: 6_006_471_977,
} as const;

export function getHomeFinanceDisplay() {
  return {
    thuCompact: formatVndCompactBillions(homeFinanceStats.totalThuVnd),
    thuDetail: formatVndAttached(homeFinanceStats.totalThuVnd),
    chiCompact: formatVndCompactBillions(homeFinanceStats.totalChiVnd),
    chiDetail: formatVndAttached(homeFinanceStats.totalChiVnd),
  };
}

export function getHomeFinanceSummary() {
  const { period, openingBalanceVnd, closingBalanceVnd } = homeFinanceStats;

  return {
    periodLabel: `Minh bạch tài chính: ${period.start}-${period.end}`,
    openingBalanceLabel: `Số dư đầu kỳ ngày ${period.start}: ${formatVndDots(openingBalanceVnd)} ${VND_UNIT}`,
    closingBalanceLabel: `Số dư cuối kỳ tại ngày ${period.end}: ${formatVndDots(closingBalanceVnd)} ${VND_UNIT}`,
  };
}
