/** Official homepage children totals (báo cáo tổng kết năm học 2025–2026). */
export const homeChildrenStats = {
  total: 81_909,
  sponsored: 40_699,
  unsponsored: 41_210,
  schoolYearLabel: "Năm học 9/2025–5/2026",
} as const;

function formatCountVi(count: number): string {
  return count.toLocaleString("vi-VN").replace(/\s/g, ".");
}

function formatPercentVi(percent: number): string {
  return percent.toLocaleString("vi-VN", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

export function getHomeChildrenDisplay() {
  const { total, sponsored, unsponsored, schoolYearLabel } = homeChildrenStats;
  const sponsoredPercent = (sponsored / total) * 100;
  const unsponsoredPercent = (unsponsored / total) * 100;

  return {
    total: formatCountVi(total),
    sponsored: formatCountVi(sponsored),
    unsponsored: formatCountVi(unsponsored),
    sponsoredPercent,
    unsponsoredPercent,
    sponsoredPercentLabel: formatPercentVi(sponsoredPercent),
    unsponsoredPercentLabel: formatPercentVi(unsponsoredPercent),
    schoolYearLabel,
  };
}
