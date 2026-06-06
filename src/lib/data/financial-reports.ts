import type { FinancialReport } from "@/lib/data/types";
import { normalizeVndUnit } from "@/lib/format-vnd";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createAdminClient } from "@/lib/supabase/admin";
import { createPublicClient } from "@/lib/supabase/public";

type FinancialReportRow = {
  id: string;
  title: string;
  image_url: string;
  document_url: string | null;
  total_income: string | null;
  total_expense: string | null;
  summary: string | null;
  year: number;
  sort_order: number;
};

function rowToReport(row: FinancialReportRow): FinancialReport {
  return {
    id: row.id,
    title: row.title,
    imageUrl: row.image_url,
    documentUrl: row.document_url ?? undefined,
    totalIncome: normalizeVndUnit(row.total_income ?? ""),
    totalExpense: normalizeVndUnit(row.total_expense ?? ""),
    year: row.year,
  };
}

async function fetchReportsFromDb(): Promise<FinancialReport[] | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("financial_reports")
      .select("*")
      .order("year", { ascending: false })
      .order("sort_order", { ascending: false });

    if (error) return null;
    return ((data ?? []) as FinancialReportRow[]).map(rowToReport);
  } catch {
    return null;
  }
}

export async function getAllReports(): Promise<FinancialReport[]> {
  return (await fetchReportsFromDb()) ?? [];
}

export async function getReportsPayload(): Promise<{ reports: FinancialReport[] }> {
  const reports = await fetchReportsFromDb();
  return { reports: reports ?? [] };
}

export async function getReportYears(): Promise<number[]> {
  const reports = await getAllReports();
  return [...new Set(reports.map((report) => report.year))].sort((a, b) => b - a);
}

export async function getReportById(id: string): Promise<FinancialReport | undefined> {
  const reports = await getAllReports();
  return reports.find((report) => report.id === id);
}

export async function getReportsByYear(year: number | null): Promise<FinancialReport[]> {
  const reports = await getAllReports();
  if (!year) return reports;
  return reports.filter((report) => report.year === year);
}

export type FinancialReportAdminRow = FinancialReportRow;

export async function listFinancialReportsForAdmin(): Promise<FinancialReportAdminRow[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("financial_reports")
    .select("*")
    .order("year", { ascending: false })
    .order("sort_order", { ascending: false });

  if (error) {
    return [];
  }

  return (data ?? []) as FinancialReportAdminRow[];
}

export const FINANCIAL_REPORTS_STORAGE_FOLDER = "bao-cao";
