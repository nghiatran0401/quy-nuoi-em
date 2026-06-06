import type { FinancialReportSheetRow } from "@/lib/data/financial-reports-parse";
import { formatVndLabelFromText } from "@/lib/format-vnd";

function formatVndLabel(amount: string): string {
  return formatVndLabelFromText(amount);
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

function extractClosingBalance(text: string): { date: string; amount: string } | null {
  const section32Index = text.search(/3\.2\.\s*Báo cáo thu\s*-\s*chi hoạt động vận hành/i);
  const charitySection = section32Index >= 0 ? text.slice(0, section32Index) : text;
  const match = charitySection.match(
    /Số dư Dự án Nuôi em tính cuối ngày\s+(\d{2}\/\d{2}\/\d{4}):\s*([\d.,]+)\s*VNĐ/i,
  );
  if (!match?.[1] || !match?.[2]) {
    return null;
  }

  return { date: match[1], amount: match[2] };
}

function extractMonthlyTotals(text: string): { income: string; expense: string } | null {
  const legacyIncome = text.match(/Tổng nguồn thu tiếp nhận trong tháng:\s*([\d.,]+)\s*VNĐ/i);
  const legacyExpense = text.match(/Tổng các khoản chi trong tháng:\s*([\d.,]+)\s*VNĐ/i);
  if (legacyIncome?.[1] && legacyExpense?.[1]) {
    return { income: legacyIncome[1], expense: legacyExpense[1] };
  }

  const sectionMatch = text.match(
    /3\.\s*Báo cáo tình hình tài chính chi tiết tháng[\s\S]*?Tổng thu:\s*([\d.,]+)\s*VNĐ[\s\S]*?Tổng chi:\s*([\d.,]+)\s*VNĐ/i,
  );
  if (sectionMatch?.[1] && sectionMatch?.[2]) {
    return { income: sectionMatch[1], expense: sectionMatch[2] };
  }

  return null;
}

export function parseFinancialTotalsFromDocumentText(
  text: string,
  month: number,
  year: number,
  fileId: string,
): FinancialReportSheetRow {
  const totals = extractMonthlyTotals(text);
  const closingBalance = extractClosingBalance(text);

  if (!totals) {
    throw new Error(`Could not parse income/expense totals for Tháng ${month}/${year} (${fileId}).`);
  }

  return {
    id: buildSlug(month, year),
    title: buildTitle(month, year),
    documentUrl: `https://docs.google.com/document/d/${fileId}/edit?usp=sharing`,
    totalIncome: formatVndLabel(totals.income),
    totalExpense: formatVndLabel(totals.expense),
    closingBalanceDate: closingBalance?.date ?? null,
    closingBalance: closingBalance ? formatVndLabel(closingBalance.amount) : null,
    summary: null,
    year,
    sortOrder: defaultSortOrder(year, month),
  };
}
