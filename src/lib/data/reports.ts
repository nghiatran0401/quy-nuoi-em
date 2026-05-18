import reportsJson from "@/data/reports.json";
import type { FinancialReport } from "@/lib/data/types";

const reports = (reportsJson as FinancialReport[]).sort((a, b) => {
  if (a.year !== b.year) return b.year - a.year;
  return b.title.localeCompare(a.title, "vi");
});

export function getAllReports(): FinancialReport[] {
  return reports;
}

export function getReportYears(): number[] {
  return [...new Set(reports.map((report) => report.year))].sort((a, b) => b - a);
}

export function getReportById(id: string): FinancialReport | undefined {
  return reports.find((report) => report.id === id);
}

export function getReportsByYear(year: number | null): FinancialReport[] {
  if (!year) return reports;
  return reports.filter((report) => report.year === year);
}
