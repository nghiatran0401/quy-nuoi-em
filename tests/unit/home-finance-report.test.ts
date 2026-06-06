import { describe, expect, it } from "vitest";
import {
  formatFinanceReportAmount,
  getHomeFinancePeriodReport,
  homeFinancePeriodReport,
} from "@/config/home-finance-report";

describe("homeFinancePeriodReport", () => {
  it("formats report amounts with dotted VND suffix", () => {
    expect(formatFinanceReportAmount(13_354_056_693)).toBe("13.354.056.693 đ");
    expect(formatFinanceReportAmount(0)).toBe("0 đ");
  });

  it("includes both charity and operations sections", () => {
    const report = getHomeFinancePeriodReport();

    expect(report.sections).toHaveLength(2);
    expect(report.sections[0]).toMatchObject({
      id: "charity",
      totalIncomeVnd: 71_159_937_110,
      totalExpenseVnd: 78_507_521_826,
      closingBalanceVnd: 6_006_471_977,
    });
    expect(report.sections[1]).toMatchObject({
      id: "operations",
      totalIncomeVnd: 2_175_441_815,
      totalExpenseVnd: 1_492_728_279,
      closingBalanceVnd: 4_538_822_078,
    });
    expect(homeFinancePeriodReport.periodShort).toBe("01/06/2025-31/05/2026");
    expect(report.sections[1]?.incomeItems?.[1]?.note).toBe(
      "bao gồm trong khoản tất toán 63.074.062.680 đ để chi cho các dự án thiện nguyện",
    );
    expect(report.sections[1]?.expenseItems[0]?.label).toBe("Hỗ trợ cán sự (20 người)");
  });
});
