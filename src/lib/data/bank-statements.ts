import { mbStatementsConfig } from "@/config/mb-statements";
import { vcbStatementsConfig } from "@/config/vcb-statements";
import {
  getMbStatementMonthRows,
  getMbStatementPeriods,
} from "@/lib/data/mb-statements";
import {
  getVcbStatementCatalog,
  getVcbStatementMonth,
  parseVcbStatementSearchParams,
  type VcbStatementCatalog,
  type VcbStatementMonthPayload,
  type VcbStatementPeriod,
  type VcbStatementRow,
  type VcbStatementSelection,
} from "@/lib/data/vcb-statements";
import { formatPeriodLabel } from "@/lib/data/vcb-statements-parse";
import { parseVietnamDateTime } from "@/lib/format-statement-datetime";

function shouldMergeMb(year: number): boolean {
  return year >= mbStatementsConfig.mergeFromYear;
}

function mergePeriods(vcbPeriods: VcbStatementPeriod[], mbPeriods: VcbStatementPeriod[]): VcbStatementPeriod[] {
  const merged = new Map<string, VcbStatementPeriod>();

  for (const period of vcbPeriods) {
    merged.set(`${period.year}-${period.month}`, { ...period });
  }

  for (const period of mbPeriods) {
    const key = `${period.year}-${period.month}`;
    const existing = merged.get(key);
    if (existing) {
      merged.set(key, {
        ...existing,
        count: existing.count + period.count,
      });
      continue;
    }
    merged.set(key, { ...period });
  }

  return [...merged.values()].sort((a, b) => b.year - a.year || b.month - a.month);
}

function summarizeRows(rows: VcbStatementRow[]) {
  let totalChi = 0;
  let totalThu = 0;
  for (const row of rows) {
    if (row.chi !== null) totalChi += row.chi;
    if (row.thu !== null) totalThu += row.thu;
  }
  return { count: rows.length, totalChi, totalThu };
}

function rowTimestamp(row: VcbStatementRow): number {
  if (row.occurredAt) {
    const date = parseVietnamDateTime(row.occurredAt);
    if (!Number.isNaN(date.getTime())) return date.getTime();
  }

  const match = row.dateDoc.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (!match) return 0;
  const [, day, month, year] = match;
  return new Date(`${year}-${month}-${day}`).getTime();
}

function sortStatementRowsNewestFirst(rows: VcbStatementRow[]): VcbStatementRow[] {
  return [...rows].sort((a, b) => {
    const byDate = rowTimestamp(b) - rowTimestamp(a);
    if (byDate !== 0) return byDate;
    return b.stt - a.stt;
  });
}

function normalizeStatementRows(rows: VcbStatementRow[]): VcbStatementRow[] {
  return sortStatementRowsNewestFirst(
    rows.map((row) => ({
      ...row,
      source: row.source ?? "vcb",
      rowKey: row.rowKey ?? `vcb-${row.stt}`,
    })),
  );
}

function mergeRows(vcbRows: VcbStatementRow[], mbRows: VcbStatementRow[]): VcbStatementRow[] {
  return normalizeStatementRows([...vcbRows, ...mbRows]);
}

function pickDefaultSelection(periods: VcbStatementPeriod[]): VcbStatementSelection {
  const substantial = periods.find((period) => period.count >= 100);
  const chosen = substantial ?? periods[0];
  return { year: chosen.year, month: chosen.month };
}

function pickMonthForYear(catalog: VcbStatementCatalog, year: number, monthRaw: string | undefined): number {
  if (monthRaw) return Number(monthRaw);
  const monthsForYear = catalog.periods
    .filter((period) => period.year === year)
    .sort((a, b) => b.month - a.month);
  return monthsForYear[0]?.month ?? catalog.defaultSelection.month;
}

export async function getBankStatementCatalog(): Promise<VcbStatementCatalog> {
  const vcbCatalog = await getVcbStatementCatalog();

  try {
    const mbPeriods = await getMbStatementPeriods(mbStatementsConfig.mergeFromYear);
    const periods = mergePeriods(vcbCatalog.periods, mbPeriods);
    return {
      periods,
      defaultSelection: pickDefaultSelection(periods),
    };
  } catch {
    return vcbCatalog;
  }
}

export async function getBankStatementMonth(
  year: number,
  month: number,
): Promise<VcbStatementMonthPayload> {
  const vcbPayload = await getVcbStatementMonth(year, month);
  if (!shouldMergeMb(year)) {
    return {
      ...vcbPayload,
      rows: normalizeStatementRows(vcbPayload.rows),
    };
  }

  let mbRows: VcbStatementRow[] = [];
  try {
    mbRows = await getMbStatementMonthRows(year, month);
  } catch {
    mbRows = [];
  }

  const rows = mergeRows(vcbPayload.rows, mbRows);

  return {
    selection: { year, month },
    label: formatPeriodLabel(year, month),
    rows,
    summary: summarizeRows(rows),
  };
}

export function parseBankStatementSearchParams(
  params: Record<string, string | string[] | undefined>,
  catalog: VcbStatementCatalog,
): VcbStatementSelection {
  const yearRaw = Array.isArray(params.year) ? params.year[0] : params.year;
  const monthRaw = Array.isArray(params.month) ? params.month[0] : params.month;

  const year = yearRaw ? Number(yearRaw) : catalog.defaultSelection.year;
  const month = yearRaw
    ? pickMonthForYear(catalog, year, monthRaw)
    : monthRaw
      ? Number(monthRaw)
      : catalog.defaultSelection.month;

  const valid = catalog.periods.some((period) => period.year === year && period.month === month);
  if (valid && Number.isFinite(year) && Number.isFinite(month) && month >= 1 && month <= 12) {
    return { year, month };
  }

  return parseVcbStatementSearchParams(params, catalog);
}

export function bankStatementSourceLabel(year: number): string {
  if (!shouldMergeMb(year)) {
    return `${vcbStatementsConfig.bankName} ${vcbStatementsConfig.accountNumber}`;
  }

  return `${vcbStatementsConfig.bankName} ${vcbStatementsConfig.accountNumber} + ${mbStatementsConfig.bankName} ${mbStatementsConfig.accountNumber}`;
}
