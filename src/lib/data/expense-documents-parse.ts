import { iterateCsvRecords, parseIntCell } from "@/lib/data/vcb-statements-parse";
import type { ExpenseDocumentRow } from "@/lib/data/expense-documents";

const HEADER_MARKERS = ["tt", "trường", "truong"];

function normalizeHeader(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isHeaderRow(cells: string[]): boolean {
  if (cells.length === 0) return false;
  const first = normalizeHeader(cells[0] ?? "");
  return HEADER_MARKERS.includes(first);
}

export function parseVndAmountCell(value: string | undefined): number | null {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return null;
  const digits = trimmed.replace(/[^\d]/g, "");
  if (!digits) return null;
  return Number(digits);
}

function normalizeDriveUrl(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return null;
  if (!/^https?:\/\//i.test(trimmed)) return null;
  return trimmed.replace(/\\_/g, "_");
}

function normalizeText(value: string | undefined): string {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

export function parseExpenseDocumentRows(csvText: string): ExpenseDocumentRow[] {
  const rows: ExpenseDocumentRow[] = [];

  for (const cells of iterateCsvRecords(csvText)) {
    if (isHeaderRow(cells)) continue;

    const stt = parseIntCell(cells[0]);
    if (stt === null) continue;

    const school = normalizeText(cells[1]);
    if (!school) continue;

    rows.push({
      stt,
      school,
      commune: normalizeText(cells[2]),
      province: normalizeText(cells[3]),
      studentCount: parseIntCell(cells[4]?.replace(/\s/g, "")),
      amount: parseVndAmountCell(cells[5]),
      amountLabel: normalizeText(cells[5]) || "—",
      driveUrl: normalizeDriveUrl(cells[6]),
    });
  }

  return rows;
}
