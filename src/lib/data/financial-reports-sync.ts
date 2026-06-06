import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  financialReportsCsvExportUrl,
  financialReportsSheetConfig,
  financialReportsSheetUrl,
} from "@/config/financial-reports-sheet";
import {
  parseFinancialReportRows,
  type FinancialReportSheetRow,
} from "@/lib/data/financial-reports-parse";

type FinancialReportDbRow = {
  id: string;
  image_url: string;
};

export type FinancialReportsSyncResult = {
  sheetUrl: string;
  parsed: number;
  inserted: number;
  updated: number;
  ids: string[];
};

export type FinancialReportsSyncOptions = {
  dryRun?: boolean;
  supabase?: SupabaseClient;
};

async function fetchSheetCsv(): Promise<string> {
  const response = await fetch(financialReportsCsvExportUrl(), { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Financial reports CSV fetch failed: ${response.status}`);
  }
  return response.text();
}

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

function toDbRow(
  row: FinancialReportSheetRow,
  existingImageUrl: string | undefined,
): Record<string, string | number | null> {
  return {
    id: row.id,
    title: row.title,
    image_url: existingImageUrl ?? financialReportsSheetConfig.defaultImageUrl,
    document_url: row.documentUrl,
    total_income: row.totalIncome || null,
    total_expense: row.totalExpense || null,
    closing_balance_date: row.closingBalanceDate,
    closing_balance: row.closingBalance,
    summary: row.summary,
    year: row.year,
    sort_order: row.sortOrder,
    updated_at: new Date().toISOString(),
  };
}

export async function syncFinancialReportsFromSheet(
  options: FinancialReportsSyncOptions = {},
): Promise<FinancialReportsSyncResult> {
  const csvText = await fetchSheetCsv();
  const parsedRows = parseFinancialReportRows(csvText);

  if (parsedRows.length === 0) {
    throw new Error("No financial report rows found in Google Sheet.");
  }

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
    sheetUrl: financialReportsSheetUrl(),
    parsed: parsedRows.length,
    inserted,
    updated,
    ids,
  };
}
