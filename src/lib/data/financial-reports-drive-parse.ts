import type { FinancialReportSheetRow } from "@/lib/data/financial-reports-parse";

function formatVndLabel(amount: string): string {
  return `${amount.trim()} ₫`;
}

function buildSlug(month: number, year: number): string {
  return `thang-${month}-${year}`;
}

function buildTitle(month: number, year: number): string {
  return `Tháng ${month}/${year}`;
}

function defaultSortOrder(year: number, month: number): number {
  return year * 100 + month;
}

export function parseFinancialTotalsFromDocumentText(
  text: string,
  month: number,
  year: number,
  fileId: string,
): FinancialReportSheetRow {
  const incomeMatch = text.match(
    new RegExp(
      `Tổng nguồn thu tiếp nhận trong tháng:\\s*([\\d.,]+)\\s*VNĐ`,
      "i",
    ),
  );
  const expenseMatch = text.match(
    new RegExp(
      `Tổng các khoản chi trong tháng:\\s*([\\d.,]+)\\s*VNĐ`,
      "i",
    ),
  );

  if (!incomeMatch?.[1] || !expenseMatch?.[1]) {
    throw new Error(`Could not parse income/expense totals for Tháng ${month}/${year} (${fileId}).`);
  }

  return {
    id: buildSlug(month, year),
    title: buildTitle(month, year),
    documentUrl: `https://docs.google.com/document/d/${fileId}/edit?usp=sharing`,
    totalIncome: formatVndLabel(incomeMatch[1]),
    totalExpense: formatVndLabel(expenseMatch[1]),
    summary: null,
    year,
    sortOrder: defaultSortOrder(year, month),
  };
}
