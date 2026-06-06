import { describe, expect, it } from "vitest";
import { parseFinancialTotalsFromDocumentText } from "@/lib/data/financial-reports-drive-parse";

const sampleText = `
3. Báo cáo tình hình tài chính chi tiết tháng 04/2026
a. Chi tiết các khoản thu phát sinh trong tháng 04/2026:
Tổng nguồn thu tiếp nhận trong tháng: 419.815.618 VNĐ. Chi tiết gồm:
b. Chi tiết các khoản chi phát sinh trong tháng 04/2026:
Tổng các khoản chi trong tháng: 10.768.292.617 VNĐ. Chi tiết gồm:
`;

describe("parseFinancialTotalsFromDocumentText", () => {
  it("extracts monthly totals and document metadata from exported report text", () => {
    const row = parseFinancialTotalsFromDocumentText(sampleText, 4, 2026, "doc-abc");

    expect(row).toMatchObject({
      id: "thang-4-2026",
      title: "Tháng 4/2026",
      documentUrl: "https://docs.google.com/document/d/doc-abc/edit?usp=sharing",
      totalIncome: "419.815.618 đ",
      totalExpense: "10.768.292.617 đ",
      year: 2026,
      sortOrder: 202604,
    });
  });
});
