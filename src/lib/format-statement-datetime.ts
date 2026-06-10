import type { VcbStatementRow } from "@/lib/data/vcb-statements";

const VIETNAM_TIME_ZONE = "Asia/Ho_Chi_Minh";

export function parseVietnamDateTime(value: string): Date {
  const trimmed = value.trim();
  if (!trimmed) return new Date(Number.NaN);
  if (/[zZ]$/.test(trimmed) || /[+-]\d{2}:\d{2}$/.test(trimmed)) {
    return new Date(trimmed);
  }
  return new Date(`${trimmed}+07:00`);
}

function partsFromDate(date: Date): Record<"day" | "month" | "year" | "hour" | "minute" | "second", string> {
  const formatted = new Intl.DateTimeFormat("en-GB", {
    timeZone: VIETNAM_TIME_ZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    formatted.find((part) => part.type === type)?.value ?? "";

  return {
    day: read("day"),
    month: read("month"),
    year: read("year"),
    hour: read("hour"),
    minute: read("minute"),
    second: read("second"),
  };
}

export function formatVietnamDate(date: Date): string {
  const { day, month, year } = partsFromDate(date);
  return `${day}/${month}/${year}`;
}

export function formatVietnamDateTime(date: Date): string {
  const { day, month, year, hour, minute, second } = partsFromDate(date);
  return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
}

/** Display value for the sao kê "Ngày giờ" column. */
export function formatStatementDateTime(row: VcbStatementRow): string {
  if (row.occurredAt) {
    const date = parseVietnamDateTime(row.occurredAt);
    if (!Number.isNaN(date.getTime())) {
      return formatVietnamDateTime(date);
    }
  }

  const match = row.dateDoc.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (match) {
    return `${match[1]}/${match[2]}/${match[3]}`;
  }

  return row.dateDoc;
}
