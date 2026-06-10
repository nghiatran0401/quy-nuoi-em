import { unstable_noStore as noStore } from "next/cache";
import { mbStatementsConfig, mbStatementsTransactionsUrl } from "@/config/mb-statements";
import { formatPeriodLabel } from "@/lib/data/vcb-statements-parse";
import { parseVietnamDateTime } from "@/lib/format-statement-datetime";
import type { VcbStatementPeriod, VcbStatementRow } from "@/lib/data/vcb-statements";

type MbTransactionType = "CREDIT" | "DEBIT";

type MbTransaction = {
  id: string;
  refId: string;
  transactionTime: string;
  type: MbTransactionType;
  transactionAmount: number;
  narrative: string;
  otherAccountDisplayName: string | null;
};

type MbTransactionsPage = {
  transactions: MbTransaction[];
  hasNextPage: boolean;
  pageNumber: number;
};

type MbTransactionsResponse = {
  status: number;
  data?: MbTransactionsPage;
};

function monthRange(year: number, month: number): { fromDate: string; toDate: string } {
  const lastDay = new Date(year, month, 0).getDate();
  const pad = (value: number) => String(value).padStart(2, "0");
  return {
    fromDate: `${year}-${pad(month)}-01`,
    toDate: `${year}-${pad(month)}-${pad(lastDay)}`,
  };
}

function yearRange(year: number): { fromDate: string; toDate: string } {
  return {
    fromDate: `${year}-01-01`,
    toDate: `${year}-12-31`,
  };
}

async function fetchMbTransactionsPage(
  fromDate: string,
  toDate: string,
  pageNumber: number,
): Promise<MbTransactionsPage> {
  const url = new URL(mbStatementsTransactionsUrl(mbStatementsConfig.bankAccountId));
  url.searchParams.append("types", "DEBIT");
  url.searchParams.append("types", "CREDIT");
  url.searchParams.set("fromDate", fromDate);
  url.searchParams.set("toDate", toDate);
  url.searchParams.set("pageNumber", String(pageNumber));
  url.searchParams.set("pageSize", String(mbStatementsConfig.pageSize));

  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`MB statements fetch failed: ${response.status}`);
  }

  const payload = (await response.json()) as MbTransactionsResponse;
  if (payload.status !== 200 || !payload.data) {
    throw new Error("MB statements response is invalid");
  }

  return payload.data;
}

async function fetchAllMbTransactions(fromDate: string, toDate: string): Promise<MbTransaction[]> {
  const rows: MbTransaction[] = [];
  let pageNumber = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const page = await fetchMbTransactionsPage(fromDate, toDate, pageNumber);
    rows.push(...page.transactions);
    hasNextPage = page.hasNextPage;
    pageNumber += 1;
  }

  return rows;
}

function yearMonthFromTransactionTime(transactionTime: string): { year: number; month: number } {
  const date = parseVietnamDateTime(transactionTime);
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "numeric",
  }).formatToParts(date);

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? Number.NaN);

  return { year: read("year"), month: read("month") };
}

function mbSttFromId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function buildMbDetail(transaction: MbTransaction): string {
  const narrative = transaction.narrative.trim();
  const counterparty = transaction.otherAccountDisplayName?.trim();
  if (counterparty && counterparty !== narrative) {
    return `${counterparty}; ${narrative}`;
  }
  return narrative;
}

export function mbTransactionToRow(transaction: MbTransaction): VcbStatementRow {
  const { year, month } = yearMonthFromTransactionTime(transaction.transactionTime);
  const amount = Math.round(transaction.transactionAmount);
  const isCredit = transaction.type === "CREDIT";

  return {
    stt: mbSttFromId(transaction.id),
    dateDoc: transaction.refId,
    occurredAt: transaction.transactionTime,
    chi: isCredit ? null : amount,
    thu: isCredit ? amount : null,
    balance: null,
    detail: buildMbDetail(transaction),
    year,
    month,
    source: "mb",
    rowKey: `mb-${transaction.id}`,
  };
}

function periodsFromRows(rows: VcbStatementRow[]): VcbStatementPeriod[] {
  const periodMap = new Map<string, number>();
  for (const row of rows) {
    const key = `${row.year}-${row.month}`;
    periodMap.set(key, (periodMap.get(key) ?? 0) + 1);
  }

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

function sortMbRowsNewestFirst(rows: VcbStatementRow[]): VcbStatementRow[] {
  return [...rows].sort((a, b) => (b.occurredAt ?? "").localeCompare(a.occurredAt ?? ""));
}

export async function getMbStatementYearRows(year: number): Promise<VcbStatementRow[]> {
  noStore();
  const { fromDate, toDate } = yearRange(year);
  const transactions = await fetchAllMbTransactions(fromDate, toDate);
  return sortMbRowsNewestFirst(transactions.map(mbTransactionToRow));
}

export async function getMbStatementPeriods(year: number): Promise<VcbStatementPeriod[]> {
  const rows = await getMbStatementYearRows(year);
  return periodsFromRows(rows);
}

export async function getMbStatementMonthRows(year: number, month: number): Promise<VcbStatementRow[]> {
  noStore();
  const { fromDate, toDate } = monthRange(year, month);
  const transactions = await fetchAllMbTransactions(fromDate, toDate);
  return sortMbRowsNewestFirst(transactions.map(mbTransactionToRow));
}
