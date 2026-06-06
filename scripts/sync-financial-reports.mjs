#!/usr/bin/env node
/**
 * Sync /bao-cao document items into Supabase from Google Drive reports.
 * Plain Node.js — no tsx or Supabase CLI required.
 *
 * Usage:
 *   npm run sync:bao-cao
 *   npm run sync:bao-cao -- --dry-run
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

const DRIVE_FOLDER_URL =
  process.env.FINANCIAL_REPORTS_DRIVE_FOLDER_URL ??
  "https://drive.google.com/drive/folders/1tlzUAOJrMtL5pZtvTSwPAMNFqz7OlPoK";
const DEFAULT_IMAGE_URL = "/logo.webp";

const REPORTS = [
  { month: 1, year: 2026, fileId: "15aDgrQ7HXDtFZ_roswCjRjxqlQlLDu0q" },
  { month: 2, year: 2026, fileId: "1T_zlURriSbb72w-grKtpa5wsKxnb-8S-" },
  { month: 3, year: 2026, fileId: "1hD_s7_XsIsxtKP624onubj_woC2RcL_7" },
  { month: 4, year: 2026, fileId: "1qMuH3UUmjgqhw286dU6GNEvI7Lf2uJ-2" },
  { month: 5, year: 2026, fileId: "1l0D-8UW4i62MEOsA4iK7O-SZHO9sxj6k" },
];

function loadDotEnv(filePath) {
  try {
    const raw = readFileSync(filePath, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const index = trimmed.indexOf("=");
      if (index === -1) continue;
      const key = trimmed.slice(0, index).trim();
      const value = trimmed.slice(index + 1).trim();
      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
  } catch {
    // .env is optional when env vars are already exported
  }
}

function buildSlug(month, year) {
  return `thang-${month}-${year}`;
}

function buildTitle(month, year) {
  return `Tháng ${month}/${year}`;
}

function defaultSortOrder(year, month) {
  return year * 100 + month;
}

function parseFinancialTotalsFromDocumentText(text, month, year, fileId) {
  const incomeMatch = text.match(/Tổng nguồn thu tiếp nhận trong tháng:\s*([\d.,]+)\s*VNĐ/i);
  const expenseMatch = text.match(/Tổng các khoản chi trong tháng:\s*([\d.,]+)\s*VNĐ/i);

  if (!incomeMatch?.[1] || !expenseMatch?.[1]) {
    throw new Error(`Could not parse income/expense totals for Tháng ${month}/${year} (${fileId}).`);
  }

  return {
    id: buildSlug(month, year),
    title: buildTitle(month, year),
    documentUrl: `https://docs.google.com/document/d/${fileId}/edit?usp=sharing`,
    totalIncome: `${incomeMatch[1].trim()} đ`,
    totalExpense: `${expenseMatch[1].trim()} đ`,
    summary: null,
    year,
    sortOrder: defaultSortOrder(year, month),
  };
}

async function fetchDocumentText(fileId) {
  const url = `https://docs.google.com/document/d/${fileId}/export?format=txt`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Document export failed (${fileId}): ${response.status}`);
  }
  return response.text();
}

function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function toDbRow(row, existingImageUrl) {
  return {
    id: row.id,
    title: row.title,
    image_url: existingImageUrl ?? DEFAULT_IMAGE_URL,
    document_url: row.documentUrl,
    total_income: row.totalIncome || null,
    total_expense: row.totalExpense || null,
    summary: row.summary,
    year: row.year,
    sort_order: row.sortOrder,
    updated_at: new Date().toISOString(),
  };
}

async function syncFinancialReportsFromDrive({ dryRun = false } = {}) {
  const parsedRows = await Promise.all(
    REPORTS.map(async ({ month, year, fileId }) => {
      const text = await fetchDocumentText(fileId);
      return parseFinancialTotalsFromDocumentText(text, month, year, fileId);
    }),
  );

  parsedRows.sort((a, b) => b.sortOrder - a.sortOrder || b.year - a.year);

  const supabase = createServiceClient();
  const ids = parsedRows.map((row) => row.id);

  const { data: existingRows, error: existingError } = await supabase
    .from("financial_reports")
    .select("id, image_url")
    .in("id", ids);

  if (existingError) {
    throw new Error(`Failed to read existing financial reports: ${existingError.message}`);
  }

  const existingById = new Map((existingRows ?? []).map((row) => [row.id, row.image_url]));
  const upsertRows = parsedRows.map((row) => toDbRow(row, existingById.get(row.id)));
  const inserted = parsedRows.filter((row) => !existingById.has(row.id)).length;
  const updated = parsedRows.length - inserted;

  if (!dryRun) {
    const { error } = await supabase.from("financial_reports").upsert(upsertRows, { onConflict: "id" });
    if (error) {
      throw new Error(`Failed to upsert financial reports: ${error.message}`);
    }
  }

  return {
    sheetUrl: DRIVE_FOLDER_URL,
    parsed: parsedRows.length,
    inserted,
    updated,
    ids,
  };
}

loadDotEnv(resolve(process.cwd(), ".env"));

const dryRun = process.argv.includes("--dry-run");

try {
  const result = await syncFinancialReportsFromDrive({ dryRun });
  const mode = dryRun ? "DRY RUN" : "SYNCED";
  console.log(`[${mode}] Financial reports from Google Drive`);
  console.log(`  Folder: ${result.sheetUrl}`);
  console.log(`  Parsed: ${result.parsed}`);
  console.log(`  Inserted: ${result.inserted}`);
  console.log(`  Updated: ${result.updated}`);
  console.log(`  IDs: ${result.ids.join(", ")}`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`sync:bao-cao failed: ${message}`);
  process.exit(1);
}
