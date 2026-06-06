import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  financialReportDocumentExportUrl,
  financialReportsDriveConfig,
} from "@/config/financial-reports-drive";
import { parseFinancialTotalsFromDocumentText } from "@/lib/data/financial-reports-drive-parse";
import type { FinancialReportSheetRow } from "@/lib/data/financial-reports-parse";
import type { FinancialReportsSyncOptions, FinancialReportsSyncResult } from "@/lib/data/financial-reports-sync";

type FinancialReportDbRow = {
  id: string;
  image_url: string;
};

function createServiceClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for sync.");
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function fetchDocumentText(fileId: string): Promise<string> {
  const response = await fetch(financialReportDocumentExportUrl(fileId), { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Document export failed (${fileId}): ${response.status}`);
  }
  return response.text();
}

async function loadReportsFromDrive(): Promise<FinancialReportSheetRow[]> {
  const rows = await Promise.all(
    financialReportsDriveConfig.reports.map(async ({ month, year, fileId }) => {
      const text = await fetchDocumentText(fileId);
      return parseFinancialTotalsFromDocumentText(text, month, year, fileId);
    }),
  );

  return rows.sort((a, b) => b.sortOrder - a.sortOrder || b.year - a.year);
}

function toDbRow(
  row: FinancialReportSheetRow,
  existingImageUrl: string | undefined,
): Record<string, string | number | null> {
  return {
    id: row.id,
    title: row.title,
    image_url: existingImageUrl ?? financialReportsDriveConfig.defaultImageUrl,
    document_url: row.documentUrl,
    total_income: row.totalIncome || null,
    total_expense: row.totalExpense || null,
    summary: row.summary,
    year: row.year,
    sort_order: row.sortOrder,
    updated_at: new Date().toISOString(),
  };
}

export async function syncFinancialReportsFromDrive(
  options: FinancialReportsSyncOptions = {},
): Promise<FinancialReportsSyncResult> {
  const parsedRows = await loadReportsFromDrive();

  const supabase = options.supabase ?? createServiceClient();
  const ids = parsedRows.map((row) => row.id);

  const { data: existingRows, error: existingError } = await supabase
    .from("financial_reports")
    .select("id, image_url")
    .in("id", ids);

  if (existingError) {
    throw new Error(`Failed to read existing financial reports: ${existingError.message}`);
  }

  const existingById = new Map(
    ((existingRows ?? []) as FinancialReportDbRow[]).map((row) => [row.id, row.image_url]),
  );

  const upsertRows = parsedRows.map((row) => toDbRow(row, existingById.get(row.id)));
  const inserted = parsedRows.filter((row) => !existingById.has(row.id)).length;
  const updated = parsedRows.length - inserted;

  if (!options.dryRun) {
    const { error } = await supabase.from("financial_reports").upsert(upsertRows, { onConflict: "id" });
    if (error) {
      throw new Error(`Failed to upsert financial reports: ${error.message}`);
    }
  }

  return {
    sheetUrl: financialReportsDriveConfig.folderUrl,
    parsed: parsedRows.length,
    inserted,
    updated,
    ids,
  };
}
