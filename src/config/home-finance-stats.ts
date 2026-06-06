/** Official homepage finance totals (MB / Thiện Nguyện cumulative; not school-year filtered). */
export const homeFinanceStats = {
  totalThuVnd: 71_159_937_110,
  totalChiVnd: 78_507_521_826,
} as const;

function formatVndDetail(amount: number): string {
  return `${amount.toLocaleString("vi-VN").replace(/\s/g, ".")}đ`;
}

function formatVndCompactBillions(amount: number): string {
  const billions = amount / 1_000_000_000;
  const formatted = billions.toLocaleString("vi-VN", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return `${formatted} tỷ đ`;
}

export function getHomeFinanceDisplay() {
  return {
    thuCompact: formatVndCompactBillions(homeFinanceStats.totalThuVnd),
    thuDetail: formatVndDetail(homeFinanceStats.totalThuVnd),
    chiCompact: formatVndCompactBillions(homeFinanceStats.totalChiVnd),
    chiDetail: formatVndDetail(homeFinanceStats.totalChiVnd),
  };
}
