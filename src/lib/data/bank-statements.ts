import { mbStatementsConfig } from "@/config/mb-statements";
import {
  getMbStatementMonthRows,
  getMbStatementPeriods,
} from "@/lib/data/mb-statements";
import {
  bankStatementSourceSummary,
} from "@/lib/data/bank-statement-sources";
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
import { getVpStatementCatalog, getVpStatementMonth } from "@/lib/data/vp-statements";
import { formatPeriodLabel, pickDefaultStatementSelection } from "@/lib/data/vcb-statements-parse";
import { parseVietnamDateTime } from "@/lib/format-statement-datetime";

function shouldMergeMb(year: number): boolean {
  return year >= mbStatementsConfig.mergeFromYear;
}

function mergePeriods(...periodLists: VcbStatementPeriod[][]): VcbStatementPeriod[] {
  const merged = new Map<string, VcbStatementPeriod>();

  for (const periods of periodLists) {
    for (const period of periods) {
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
    rows.map((row) => {
      const source = row.source ?? "vcb";
      return {
        ...row,
        source,
        rowKey: row.rowKey ?? `${source}-${row.stt}`,
      };
    }),
  );
}

function mergeRows(...rowLists: VcbStatementRow[][]): VcbStatementRow[] {
  return normalizeStatementRows(rowLists.flat());
}

function pickDefaultSelection(periods: VcbStatementPeriod[]): VcbStatementSelection {
  return pickDefaultStatementSelection(periods);
}

function pickMonthForYear(catalog: VcbStatementCatalog, year: number, monthRaw: string | undefined): number {
  if (monthRaw) return Number(monthRaw);
  const monthsForYear = catalog.periods
    .filter((period) => period.year === year)
    .sort((a, b) => b.month - a.month);
  return monthsForYear[0]?.month ?? catalog.defaultSelection.month;
}

export async function getBankStatementCatalog(): Promise<VcbStatementCatalog> {
  const [vcbCatalog, vpCatalog] = await Promise.all([
    getVcbStatementCatalog(),
    getVpStatementCatalog().catch(() => null),
  ]);

  const periodLists = [vcbCatalog.periods];
  if (vpCatalog) {
    periodLists.push(vpCatalog.periods);
  }

  try {
    const mbPeriods = await getMbStatementPeriods(mbStatementsConfig.mergeFromYear);
    periodLists.push(mbPeriods);
  } catch {
    // MB API optional for catalog
  }

  const periods = mergePeriods(...periodLists);
  return {
    periods,
    defaultSelection: pickDefaultSelection(periods),
  };
}

export async function getBankStatementMonth(
  year: number,
  month: number,
): Promise<VcbStatementMonthPayload> {
  const [vcbPayload, vpPayload] = await Promise.all([
    getVcbStatementMonth(year, month),
    getVpStatementMonth(year, month).catch(() => null),
  ]);

  const rowLists = [vcbPayload.rows];
  if (vpPayload) {
    rowLists.push(vpPayload.rows);
  }

  if (shouldMergeMb(year)) {
    try {
      const mbRows = await getMbStatementMonthRows(year, month);
      rowLists.push(mbRows);
    } catch {
      // MB API optional for month payload
    }
  }

  const rows = mergeRows(...rowLists);

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
  return bankStatementSourceSummary(year, mbStatementsConfig.mergeFromYear);
}
