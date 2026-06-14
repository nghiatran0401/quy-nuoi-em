/** RFC 4180 CSV record iterator (handles quoted fields and embedded newlines). */
export function* iterateCsvRecords(text: string): Generator<string[]> {
  const rows: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;

  const pushField = () => {
    rows.push(field);
    field = "";
  };

  const pushRow = (): string[] | null => {
    if (rows.length === 1 && rows[0] === "" && field === "") {
      rows.length = 0;
      return null;
    }
    pushField();
    const record = rows.map((cell) => cell.replace(/\r/g, ""));
    rows.length = 0;
    return record;
  };

  while (i < text.length) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      field += char;
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }

    if (char === ",") {
      pushField();
      i += 1;
      continue;
    }

    if (char === "\n") {
      const record = pushRow();
      if (record) yield record;
      i += 1;
      continue;
    }

    if (char === "\r") {
      i += 1;
      continue;
    }

    field += char;
    i += 1;
  }

  if (field.length > 0 || rows.length > 0) {
    const record = pushRow();
    if (record) yield record;
  }
}

export function parseVndCell(value: string | undefined): number | null {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return null;
  const digits = trimmed.replace(/\./g, "").replace(/,/g, "");
  if (!/^\d+$/.test(digits)) return null;
  return Number(digits);
}

export function parseIntCell(value: string | undefined): number | null {
  const trimmed = value?.trim() ?? "";
  if (!trimmed || !/^\d+$/.test(trimmed)) return null;
  return Number(trimmed);
}

export function normalizeDateDoc(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function formatPeriodLabel(year: number, month: number): string {
  return `Tháng ${month}/${year}`;
}

export type StatementPeriod = {
  year: number;
  month: number;
};

export function currentYearMonthInVietnam(now = new Date()): { year: number; month: number } {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
  });
  const parts = formatter.formatToParts(now);

  return {
    year: Number(parts.find((part) => part.type === "year")?.value),
    month: Number(parts.find((part) => part.type === "month")?.value),
  };
}

/** Prefer the current calendar month; fall back to the newest period with data. */
export function pickDefaultStatementSelection(
  periods: StatementPeriod[],
  now = new Date(),
): { year: number; month: number } {
  if (periods.length === 0) {
    return currentYearMonthInVietnam(now);
  }

  const { year: currentYear, month: currentMonth } = currentYearMonthInVietnam(now);

  if (periods.some((period) => period.year === currentYear && period.month === currentMonth)) {
    return { year: currentYear, month: currentMonth };
  }

  const latestInCurrentYear = periods
    .filter((period) => period.year === currentYear)
    .sort((a, b) => b.month - a.month)[0];
  if (latestInCurrentYear) {
    return { year: latestInCurrentYear.year, month: latestInCurrentYear.month };
  }

  const sorted = [...periods].sort((a, b) => b.year - a.year || b.month - a.month);
  return { year: sorted[0].year, month: sorted[0].month };
}
