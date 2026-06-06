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

  it("extracts totals from the current Drive report section format", () => {
    const text = `
3. Báo cáo tình hình tài chính chi tiết tháng 05/2026
Tổng thu: 21.499.900 VNĐ. Chi tiết gồm:
Tổng chi: 3.259.425.000 VNĐ. Chi tiết gồm:
3.2. Báo cáo thu - chi hoạt động vận hành - Toàn hệ sinh thái Nuôi em
Tổng thu: 44.377.325 VNĐ. Chi tiết gồm:
Tổng chi: 111.868.920 VNĐ. Chi tiết gồm:
`;

    const row = parseFinancialTotalsFromDocumentText(text, 5, 2026, "doc-may");

    expect(row).toMatchObject({
      totalIncome: "21.499.900 đ",
      totalExpense: "3.259.425.000 đ",
    });
  });

  it("extracts closing balance from section 3.1 charity project report", () => {
    const text = `
3. Báo cáo tình hình tài chính chi tiết tháng 01/2026
3.1. Báo cáo thu - chi hoạt động từ thiện Dự án Nuôi em
Số dư Dự án Nuôi em đầu ngày 01/01/2026: 19.746.928.722 VNĐ
Tổng thu: 0 VNĐ. Chi tiết gồm:
Tổng chi: 23.072.569.302 VNĐ. Chi tiết gồm:
Số dư Dự án Nuôi em tính cuối ngày 31/01/2026: 23.882.673.277 VNĐ
3.2. Báo cáo thu - chi hoạt động vận hành - Toàn hệ sinh thái Nuôi em
Số dư đầu ngày 01/01/2026: 4.002.740.418 VNĐ
Tổng thu: 270.793.599 VNĐ. Chi tiết gồm:
Tổng chi: 143.613.252 VNĐ. Chi tiết gồm:
Số dư cuối ngày 31/01/2026: 4.129.920.765 VNĐ
`;

    const row = parseFinancialTotalsFromDocumentText(text, 1, 2026, "doc-jan");

    expect(row).toMatchObject({
      closingBalanceDate: "31/01/2026",
      closingBalance: "23.882.673.277 đ",
    });
  });
});
