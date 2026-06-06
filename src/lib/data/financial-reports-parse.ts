import { iterateCsvRecords } from "@/lib/data/vcb-statements-parse";
import { normalizeVndUnit } from "@/lib/format-vnd";

export type FinancialReportSheetRow = {
  id: string;
  title: string;
  documentUrl: string | null;
  totalIncome: string;
  totalExpense: string;
  summary: string | null;
  year: number;
  sortOrder: number;
};

const COLUMN_ALIASES = {
  id: ["id", "ma", "slug"],
  title: ["title", "tieu_de", "tieu de", "ten"],
  documentUrl: ["document_url", "document url", "link", "link_tai_lieu", "link tai lieu", "url", "tai_lieu", "tai lieu"],
  totalIncome: ["total_income", "total income", "tong_thu", "tong thu", "thu"],
  totalExpense: ["total_expense", "total expense", "tong_chi", "tong chi", "chi"],
  year: ["year", "nam"],
  month: ["month", "thang"],
  sortOrder: ["sort_order", "sort order", "thu_tu", "thu tu", "order"],
  summary: ["summary", "tom_tat", "tom tat", "ghi_chu", "ghi chu"],
} as const;

type ColumnKey = keyof typeof COLUMN_ALIASES;

function normalizeHeader(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function normalizeText(value: string | undefined): string {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

function normalizeUrl(value: string | undefined): string | null {
  const trimmed = normalizeText(value);
  if (!trimmed) return null;
  if (!/^https?:\/\//i.test(trimmed)) return null;
  return trimmed.replace(/\\_/g, "_");
}

function parseIntCell(value: string | undefined): number | null {
  const trimmed = normalizeText(value);
  if (!trimmed) return null;
  const digits = trimmed.replace(/[^\d]/g, "");
  if (!digits) return null;
  const parsed = Number(digits);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseMonthYearFromTitle(title: string): { month: number | null; year: number | null } {
  const match = title.match(/th[aá]ng\s*(\d{1,2})\s*\/\s*(\d{4})/i);
  if (!match) return { month: null, year: null };
  return {
    month: Number(match[1]),
    year: Number(match[2]),
  };
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

function resolveColumnMap(headers: string[]): Partial<Record<ColumnKey, number>> {
  const map: Partial<Record<ColumnKey, number>> = {};

  headers.forEach((header, index) => {
    const normalized = normalizeHeader(header);
    for (const [key, aliases] of Object.entries(COLUMN_ALIASES) as [ColumnKey, readonly string[]][]) {
      if (aliases.includes(normalized)) {
        map[key] = index;
      }
    }
  });

  return map;
}

function hasRecognizedHeader(headers: string[]): boolean {
  const map = resolveColumnMap(headers);
  return Boolean(map.title || map.documentUrl || map.totalIncome || map.totalExpense || map.month);
}

function readCell(cells: string[], index: number | undefined): string {
  if (index === undefined) return "";
  return cells[index] ?? "";
}

function rowFromCells(cells: string[], columnMap: Partial<Record<ColumnKey, number>>): FinancialReportSheetRow | null {
  const titleFromSheet = normalizeText(readCell(cells, columnMap.title));
  const monthFromSheet = parseIntCell(readCell(cells, columnMap.month));
  const yearFromSheet = parseIntCell(readCell(cells, columnMap.year));
  const parsedFromTitle = parseMonthYearFromTitle(titleFromSheet);

  const month = monthFromSheet ?? parsedFromTitle.month;
  const year = yearFromSheet ?? parsedFromTitle.year;

  const id = normalizeText(readCell(cells, columnMap.id)) || (month && year ? buildSlug(month, year) : "");
  const title = titleFromSheet || (month && year ? buildTitle(month, year) : "");

  if (!id || !title || !year || !month) return null;

  const totalIncome = normalizeText(readCell(cells, columnMap.totalIncome));
  const totalExpense = normalizeText(readCell(cells, columnMap.totalExpense));
  const documentUrl = normalizeUrl(readCell(cells, columnMap.documentUrl));

  if (!totalIncome && !totalExpense && !documentUrl) return null;

  const sortOrder = parseIntCell(readCell(cells, columnMap.sortOrder)) ?? defaultSortOrder(year, month);
  const summary = normalizeText(readCell(cells, columnMap.summary)) || null;

  return {
    id,
    title,
    documentUrl,
    totalIncome: normalizeVndUnit(totalIncome),
    totalExpense: normalizeVndUnit(totalExpense),
    summary,
    year,
    sortOrder,
  };
}

export function parseFinancialReportRows(csvText: string): FinancialReportSheetRow[] {
  const records = [...iterateCsvRecords(csvText)];
  if (records.length === 0) return [];

  const [firstRow, ...dataRows] = records;
  const useHeader = hasRecognizedHeader(firstRow);
  const columnMap = useHeader ? resolveColumnMap(firstRow) : {};
  const rowsToParse = useHeader ? dataRows : records;

  const parsed: FinancialReportSheetRow[] = [];
  const seenIds = new Set<string>();

  for (const cells of rowsToParse) {
    if (cells.every((cell) => !normalizeText(cell))) continue;

    const row = rowFromCells(cells, columnMap);
    if (!row || seenIds.has(row.id)) continue;

    seenIds.add(row.id);
    parsed.push(row);
  }

  return parsed.sort((a, b) => b.sortOrder - a.sortOrder || b.year - a.year);
}
