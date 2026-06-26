#!/usr/bin/env node
/**
 * Validate / discover monthly school disbursement sheets for /tai-chinh#chung-tu-chi.
 * Data is served live from Google Sheets — this script checks CSV access and row counts.
 *
 * Usage:
 *   npm run sync:chung-tu-chi
 *   npm run sync:chung-tu-chi -- --dry-run
 *   npm run sync:chung-tu-chi -- --discover
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const DRIVE_FOLDER_ID =
  process.env.EXPENSE_DOCS_DRIVE_FOLDER_ID ?? "1YJD2fy_dL12yUU4Q6GX8IdeNRgcSWONH";
const DRIVE_FOLDER_URL = `https://drive.google.com/drive/folders/${DRIVE_FOLDER_ID}`;

const CONFIGURED_SHEETS = [
  {
    id: "2025-12",
    year: 2025,
    month: 12,
    sheetId: process.env.EXPENSE_DOCS_SHEET_DEC_2025_ID ?? "1hB6wCXQmhTemqUyB1hG2fYm8yhxcirB5DgHdiBrnJb8",
    gid: process.env.EXPENSE_DOCS_SHEET_DEC_2025_GID ?? "0",
  },
  {
    id: "2025-11",
    year: 2025,
    month: 11,
    sheetId: process.env.EXPENSE_DOCS_SHEET_NOV_2025_ID ?? "1Ywo-ZXhIo3K_sqeBKPSlGsEpQ-zGAHXK4CmYRT_6Xms",
    gid: process.env.EXPENSE_DOCS_SHEET_NOV_2025_GID ?? "0",
  },
  {
    id: "2026-05",
    year: 2026,
    month: 5,
    sheetId: process.env.EXPENSE_DOCS_SHEET_MAY_2026_ID ?? "13cljtyGE0FRoTY92intN8cw5zFhLY07FzyOHPnNux0I",
    gid: process.env.EXPENSE_DOCS_SHEET_MAY_2026_GID ?? "0",
  },
  {
    id: "2026-04",
    year: 2026,
    month: 4,
    sheetId: process.env.EXPENSE_DOCS_SHEET_APR_2026_ID ?? "1_QLIHpM2mRYcCKA_D7-nKTP-P5lUuEfWRgl3pnPOB4Q",
    gid: process.env.EXPENSE_DOCS_SHEET_APR_2026_GID ?? "0",
  },
  {
    id: "2026-03",
    year: 2026,
    month: 3,
    sheetId: process.env.EXPENSE_DOCS_SHEET_MAR_2026_ID ?? "1ZVi-R3vbeMs4DHt-AIpc-ouylS1ffeIX2iPMsWUS2a8",
    gid: process.env.EXPENSE_DOCS_SHEET_MAR_2026_GID ?? "0",
  },
  {
    id: "2026-02",
    year: 2026,
    month: 2,
    sheetId: process.env.EXPENSE_DOCS_SHEET_FEB_2026_ID ?? "1QbLJi1MtUV2km08W1C827DvRAOmhU0u7TR-d1buQsh0",
    gid: process.env.EXPENSE_DOCS_SHEET_FEB_2026_GID ?? "0",
  },
  {
    id: "2026-01",
    year: 2026,
    month: 1,
    sheetId: process.env.EXPENSE_DOCS_SHEET_JAN_2026_ID ?? "1KMXRK7iB8lgzuink7m_8JBdeF_W_xoXSUDo4A5SpJ2Y",
    gid: process.env.EXPENSE_DOCS_SHEET_JAN_2026_GID ?? "0",
  },
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

function csvExportUrl(sheetId, gid = "0") {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
}

function parseVndAmountCell(value) {
  const trimmed = (value ?? "").trim();
  if (!trimmed) return null;
  const digits = trimmed.replace(/[^\d]/g, "");
  if (!digits) return null;
  return Number(digits);
}

function parseIntCell(value) {
  const trimmed = (value ?? "").trim();
  if (!trimmed) return null;
  const digits = trimmed.replace(/[^\d-]/g, "");
  if (!digits) return null;
  const parsed = Number.parseInt(digits, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeHeader(value) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isHeaderRow(cells) {
  if (cells.length === 0) return false;
  const first = normalizeHeader(cells[0] ?? "");
  return ["tt", "truong", "trường"].includes(first);
}

function* iterateCsvRecords(csvText) {
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const char = csvText[index];
    const next = csvText[index + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      if (row.some((value) => value.trim())) {
        yield row;
      }
      row = [];
      cell = "";
    } else if (char !== "\r") {
      cell += char;
    }
  }

  row.push(cell);
  if (row.some((value) => value.trim())) {
    yield row;
  }
}

function normalizeDriveUrl(value) {
  const trimmed = (value ?? "").trim();
  if (!trimmed) return null;
  if (!/^https?:\/\//i.test(trimmed)) return null;
  return trimmed.replace(/\\_/g, "_");
}

function parseExpenseDocumentRows(csvText) {
  const rows = [];

  for (const cells of iterateCsvRecords(csvText)) {
    if (isHeaderRow(cells)) continue;

    const stt = parseIntCell(cells[0]);
    if (stt === null) continue;

    const school = (cells[1] ?? "").replace(/\s+/g, " ").trim();
    if (!school) continue;

    rows.push({
      stt,
      school,
      amount: parseVndAmountCell(cells[5]),
      driveUrl: normalizeDriveUrl(cells[6]),
    });
  }

  return rows;
}

function summarizeRows(rows) {
  return {
    count: rows.length,
    totalAmount: rows.reduce((sum, row) => sum + (row.amount ?? 0), 0),
    withDriveLink: rows.filter((row) => row.driveUrl).length,
  };
}

function formatVnd(amount) {
  return `${amount.toLocaleString("vi-VN")} đ`;
}

async function fetchCsv(sheetId, gid = "0") {
  const response = await fetch(csvExportUrl(sheetId, gid), { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`CSV fetch failed (${sheetId}): ${response.status}`);
  }
  return response.text();
}

async function discoverSheetsFromDriveFolder(folderId = DRIVE_FOLDER_ID) {
  const response = await fetch(`https://drive.google.com/drive/folders/${folderId}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Drive folder fetch failed (${folderId}): ${response.status}`);
  }

  const html = await response.text();
  const pattern =
    /data-id="([^"]+)" jsname="vtaz5c" data-tooltip="Danh sách Điểm trường giải ngân tiền ăn tập trung trong tháng (\d{2})\/(\d{4}) Google Sheets"/g;
  const discovered = [];

  for (const match of html.matchAll(pattern)) {
    const [, sheetId, monthText, yearText] = match;
    discovered.push({
      sheetId,
      year: Number(yearText),
      month: Number(monthText),
      id: `${yearText}-${monthText}`,
    });
  }

  discovered.sort((a, b) => b.year - a.year || b.month - a.month);
  return discovered;
}

async function validateConfiguredSheets() {
  const results = [];

  for (const source of CONFIGURED_SHEETS) {
    const csvText = await fetchCsv(source.sheetId, source.gid);
    const rows = parseExpenseDocumentRows(csvText);
    const summary = summarizeRows(rows);

    results.push({
      ...source,
      sheetUrl: `https://docs.google.com/spreadsheets/d/${source.sheetId}/edit?gid=${source.gid}`,
      ...summary,
    });
  }

  return results;
}

function printDiscoverOutput(discovered) {
  console.log(`Discovered ${discovered.length} spreadsheet(s) in Drive folder:`);
  console.log(`  ${DRIVE_FOLDER_URL}\n`);

  for (const sheet of discovered) {
    console.log(
      `  ${sheet.id}: ${sheet.sheetId}  →  https://docs.google.com/spreadsheets/d/${sheet.sheetId}/edit`,
    );
  }

  console.log("\nSuggested env overrides (if IDs change):");
  for (const sheet of discovered) {
    const monthKey = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][
      sheet.month - 1
    ];
    console.log(`EXPENSE_DOCS_SHEET_${monthKey}_${sheet.year}_ID=${sheet.sheetId}`);
  }
}

loadDotEnv(resolve(process.cwd(), ".env"));

const dryRun = process.argv.includes("--dry-run");
const discover = process.argv.includes("--discover");

try {
  if (discover) {
    const discovered = await discoverSheetsFromDriveFolder();
    printDiscoverOutput(discovered);
    process.exit(0);
  }

  const results = await validateConfiguredSheets();
  const discovered = await discoverSheetsFromDriveFolder();
  const discoveredById = new Map(discovered.map((sheet) => [sheet.id, sheet.sheetId]));
  const mode = dryRun ? "DRY RUN" : "OK";

  console.log(`[${mode}] Expense documents from Google Sheets`);
  console.log(`  Drive folder: ${DRIVE_FOLDER_URL}\n`);

  for (const result of results) {
    const discoveredId = discoveredById.get(result.id);
    const idMatch = discoveredId ? discoveredId === result.sheetId : null;
    const idNote =
      idMatch === null ? "" : idMatch ? " · ID matches Drive" : ` · WARN: Drive has ${discoveredId}`;

    console.log(`  Tháng ${String(result.month).padStart(2, "0")}/${result.year}`);
    console.log(`    Schools: ${result.count.toLocaleString("vi-VN")}`);
    console.log(`    Total:   ${formatVnd(result.totalAmount)}`);
    console.log(`    Drive:   ${result.withDriveLink.toLocaleString("vi-VN")} / ${result.count.toLocaleString("vi-VN")}${idNote}`);
    console.log(`    Sheet:   ${result.sheetUrl}`);
  }

  const missingInConfig = discovered.filter(
    (sheet) => !CONFIGURED_SHEETS.some((configured) => configured.id === sheet.id),
  );

  if (missingInConfig.length > 0) {
    console.log("\n  New sheet(s) in Drive folder not yet in config:");
    for (const sheet of missingInConfig) {
      console.log(`    - ${sheet.id}: ${sheet.sheetId}`);
    }
    console.log("  Run with --discover to print env overrides.");
  }

  console.log("\n  Site section: /tai-chinh#chung-tu-chi (live CSV fetch, no Supabase sync).");
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`sync:chung-tu-chi failed: ${message}`);
  process.exit(1);
}
