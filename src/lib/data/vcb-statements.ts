import {
  vcbStatementsConfig,
  vcbStatementsCsvExportUrl,
} from "@/config/vcb-statements";
import {
  formatPeriodLabel,
  iterateCsvRecords,
  normalizeDateDoc,
  parseIntCell,
  parseVndCell,
} from "@/lib/data/vcb-statements-parse";

export type VcbStatementRow = {
  stt: number;
  dateDoc: string;
  chi: number | null;
  thu: number | null;
  balance: number | null;
  detail: string;
  year: number;
  month: number;
};

export type VcbStatementPeriod = {
  year: number;
  month: number;
  count: number;
  label: string;
};

export type VcbStatementSelection = {
  year: number;
  month: number;
};

export type VcbStatementMonthPayload = {
  selection: VcbStatementSelection;
  label: string;
  rows: VcbStatementRow[];
  summary: {
    count: number;
    totalChi: number;
    totalThu: number;
  };
};

export type VcbStatementCatalog = {
  periods: VcbStatementPeriod[];
  defaultSelection: VcbStatementSelection;
};

const DATA_HEADER = "stt";

type MemoryCacheEntry<T> = {
  value: T;
  expiresAt: number;
};

const memoryCache = new Map<string, MemoryCacheEntry<unknown>>();
const inFlight = new Map<string, Promise<unknown>>();

function cacheTtlMs(): number {
  return vcbStatementsConfig.revalidateSeconds * 1000;
}

/** In-process cache — Next.js unstable_cache rejects payloads over 2MB (CSV is ~37MB). */
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
  const response = await fetch(vcbStatementsCsvExportUrl(), {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`VCB statements CSV fetch failed: ${response.status}`);
  }

  return response.text();
}

function getCachedCsvText(): Promise<string> {
  return withMemoryCache("vcb-statements-csv", fetchCsvText);
}

function rowFromRecord(record: string[]): VcbStatementRow | null {
  if (record.length < 8) return null;

  const stt = parseIntCell(record[0]);
  const year = parseIntCell(record[6]);
  const month = parseIntCell(record[7]);
  if (stt === null || year === null || month === null) return null;

  return {
    stt,
    dateDoc: normalizeDateDoc(record[1] ?? ""),
    chi: parseVndCell(record[2]),
    thu: parseVndCell(record[3]),
    balance: parseVndCell(record[4]),
    detail: (record[5] ?? "").trim(),
    year,
    month,
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

function pickDefaultSelection(periods: VcbStatementPeriod[]): VcbStatementSelection {
  const substantial = periods.find((period) => period.count >= 100);
  const chosen = substantial ?? periods[0];
  return { year: chosen.year, month: chosen.month };
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
    throw new Error("VCB statements catalog is empty");
  }

  return {
    periods,
    defaultSelection: pickDefaultSelection(periods),
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

export function getVcbStatementCatalog(): Promise<VcbStatementCatalog> {
  return withMemoryCache("vcb-statements-catalog", buildCatalog);
}

export function getVcbStatementMonth(
  year: number,
  month: number,
): Promise<VcbStatementMonthPayload> {
  return withMemoryCache(`vcb-statements-month-${year}-${month}`, () =>
    buildMonthPayload(year, month),
  );
}

export function parseVcbStatementSearchParams(
  params: Record<string, string | string[] | undefined>,
  catalog: VcbStatementCatalog,
): VcbStatementSelection {
  const yearRaw = pickParam(params.year);
  const monthRaw = pickParam(params.month);

  const year = yearRaw ? Number(yearRaw) : catalog.defaultSelection.year;
  const month = monthRaw ? Number(monthRaw) : catalog.defaultSelection.month;

  const valid = catalog.periods.some((period) => period.year === year && period.month === month);
  if (valid && Number.isFinite(year) && Number.isFinite(month) && month >= 1 && month <= 12) {
    return { year, month };
  }

  return catalog.defaultSelection;
}

function pickParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export function formatVnd(amount: number | null): string {
  if (amount === null) return "—";
  return new Intl.NumberFormat("vi-VN").format(amount);
}

export function vcbStatementQueryString(selection: VcbStatementSelection): string {
  const params = new URLSearchParams({
    year: String(selection.year),
    month: String(selection.month),
  });
  return params.toString();
}
