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

const DRIVE_FOLDER_ID =
  process.env.FINANCIAL_REPORTS_DRIVE_FOLDER_ID ?? "1tlzUAOJrMtL5pZtvTSwPAMNFqz7OlPoK";
const DRIVE_FOLDER_URL =
  process.env.FINANCIAL_REPORTS_DRIVE_FOLDER_URL ??
  `https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}`;
const DEFAULT_IMAGE_URL = "/logo.webp";

const REPORT_FILE_PATTERN =
  /data-id="([^"]+)" jsname="vtaz5c" data-tooltip="Báo cáo tình hình tài chính Dự án Nuôi em_T(\d{2})\/(\d{4})\.docx/g;

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

function extractClosingBalance(text) {
  const match = text.match(
    /3\.2\.\s*Báo cáo thu\s*-\s*chi hoạt động vận hành[\s\S]*?Số dư cuối ngày\s+(\d{2}\/\d{2}\/\d{4}):\s*([\d.,]+)\s*VNĐ/i,
  );
  if (!match?.[1] || !match?.[2]) {
    return null;
  }

  return { date: match[1], amount: match[2].trim() };
}

function extractMonthlyTotals(text) {
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

function parseFinancialTotalsFromDocumentText(text, month, year, fileId) {
  const totals = extractMonthlyTotals(text);
  const closingBalance = extractClosingBalance(text);

  if (!totals) {
    throw new Error(`Could not parse income/expense totals for Tháng ${month}/${year} (${fileId}).`);
  }

  return {
    id: buildSlug(month, year),
    title: buildTitle(month, year),
    documentUrl: `https://docs.google.com/document/d/${fileId}/edit?usp=sharing`,
    totalIncome: `${totals.income.trim()} đ`,
    totalExpense: `${totals.expense.trim()} đ`,
    closingBalanceDate: closingBalance?.date ?? null,
    closingBalance: closingBalance ? `${closingBalance.amount} đ` : null,
    summary: null,
    year,
    sortOrder: defaultSortOrder(year, month),
  };
}

function parseFinancialReportDriveFiles(html) {
  const files = [];

  for (const match of html.matchAll(REPORT_FILE_PATTERN)) {
    const [, fileId, monthText, yearText] = match;
    files.push({
      month: Number(monthText),
      year: Number(yearText),
      fileId,
    });
  }

  return files.sort((a, b) => b.year - a.year || b.month - a.month);
}

async function discoverFinancialReportDriveFiles(folderId = DRIVE_FOLDER_ID) {
  const response = await fetch(`https://drive.google.com/drive/folders/${folderId}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Drive folder fetch failed (${folderId}): ${response.status}`);
  }

  const files = parseFinancialReportDriveFiles(await response.text());
  if (files.length === 0) {
    throw new Error(`No monthly financial report documents found in Drive folder (${folderId}).`);
  }

  return files;
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
    closing_balance_date: row.closingBalanceDate,
    closing_balance: row.closingBalance,
    summary: row.summary,
    year: row.year,
    sort_order: row.sortOrder,
    updated_at: new Date().toISOString(),
  };
}

async function syncFinancialReportsFromDrive({ dryRun = false } = {}) {
  const driveFiles = await discoverFinancialReportDriveFiles();
  const parsedRows = await Promise.all(
    driveFiles.map(async ({ month, year, fileId }) => {
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
