import { vpStatementsConfig, vpStatementsCsvExportUrl } from "@/config/vp-statements";
import {
  formatPeriodLabel,
  iterateCsvRecords,
  normalizeDateDoc,
  parseIntCell,
  parseVndCell,
  pickDefaultStatementSelection,
} from "@/lib/data/vcb-statements-parse";
import type {
  VcbStatementCatalog,
  VcbStatementMonthPayload,
  VcbStatementPeriod,
  VcbStatementRow,
  VcbStatementSelection,
} from "@/lib/data/vcb-statements";

const DATA_HEADER = "stt";

type MemoryCacheEntry<T> = {
  value: T;
  expiresAt: number;
};

const memoryCache = new Map<string, MemoryCacheEntry<unknown>>();
const inFlight = new Map<string, Promise<unknown>>();

function cacheTtlMs(): number {
  return vpStatementsConfig.revalidateSeconds * 1000;
}

async function withMemoryCache<T>(key: string, factory: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const cached = memoryCache.get(key);
  if (cached && cached.expiresAt > now) {
    return cached.value as T;
  }

  const pending = inFlight.get(key);
  if (pending) {
    return pending as Promise<T>;
  }

  const promise = factory()
    .then((value) => {
      memoryCache.set(key, { value, expiresAt: Date.now() + cacheTtlMs() });
      inFlight.delete(key);
      return value;
    })
    .catch((error) => {
      inFlight.delete(key);
      throw error;
    });

  inFlight.set(key, promise);
  return promise;
}

async function fetchCsvText(): Promise<string> {
  const response = await fetch(vpStatementsCsvExportUrl(), {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`VP statements CSV fetch failed: ${response.status}`);
  }

  return response.text();
}

function getCachedCsvText(): Promise<string> {
  return withMemoryCache("vp-statements-csv", fetchCsvText);
}

function rowFromRecord(record: string[]): VcbStatementRow | null {
  if (record.length < 8) return null;

  const stt = parseIntCell(record[0]);
  const year = parseIntCell(record[6]);
  const month = parseIntCell(record[7]);
  if (stt === null || year === null || month === null) return null;

  const date = normalizeDateDoc(record[1] ?? "");
  const description = (record[2] ?? "").trim();
  const transactionCode = (record[3] ?? "").trim();
  const dateDoc = transactionCode ? `${date}\n${transactionCode}` : date;

  return {
    stt,
    dateDoc,
    chi: parseVndCell(record[4]),
    thu: parseVndCell(record[5]),
    balance: null,
    detail: description,
    year,
    month,
    source: "vp",
    rowKey: `vp-${stt}`,
  };
}

function scanCsvRecords(
  csvText: string,
  filter?: VcbStatementSelection,
): { periods: Map<string, number>; rows: VcbStatementRow[] } {
  const periods = new Map<string, number>();
  const rows: VcbStatementRow[] = [];
  let passedHeader = false;

  for (const record of iterateCsvRecords(csvText)) {
    const first = record[0]?.trim().toLowerCase() ?? "";
    if (!passedHeader) {
      if (first === DATA_HEADER) passedHeader = true;
      continue;
    }

    const row = rowFromRecord(record);
    if (!row) continue;

    const key = `${row.year}-${row.month}`;
    periods.set(key, (periods.get(key) ?? 0) + 1);

    if (filter && row.year === filter.year && row.month === filter.month) {
      rows.push(row);
    }
  }

  return { periods, rows };
}

function periodsFromMap(periodMap: Map<string, number>): VcbStatementPeriod[] {
  return [...periodMap.entries()]
    .map(([key, count]) => {
      const [yearRaw, monthRaw] = key.split("-");
      const year = Number(yearRaw);
      const month = Number(monthRaw);
      return {
        year,
        month,
        count,
        label: formatPeriodLabel(year, month),
      };
    })
    .sort((a, b) => b.year - a.year || b.month - a.month);
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

async function buildCatalog(): Promise<VcbStatementCatalog> {
  const csvText = await getCachedCsvText();
  const { periods: periodMap } = scanCsvRecords(csvText);
  const periods = periodsFromMap(periodMap);

  if (periods.length === 0) {
    throw new Error("VP statements catalog is empty");
  }

  return {
    periods,
    defaultSelection: pickDefaultStatementSelection(periods),
  };
}

async function buildMonthPayload(
  year: number,
  month: number,
): Promise<VcbStatementMonthPayload> {
  const csvText = await getCachedCsvText();
  const { rows } = scanCsvRecords(csvText, { year, month });
  rows.sort((a, b) => a.stt - b.stt);

  return {
    selection: { year, month },
    label: formatPeriodLabel(year, month),
    rows,
    summary: summarizeRows(rows),
  };
}

export function getVpStatementCatalog(): Promise<VcbStatementCatalog> {
  return withMemoryCache("vp-statements-catalog", buildCatalog);
}

export function getVpStatementMonth(
  year: number,
  month: number,
): Promise<VcbStatementMonthPayload> {
  return withMemoryCache(`vp-statements-month-${year}-${month}`, () =>
    buildMonthPayload(year, month),
  );
}
