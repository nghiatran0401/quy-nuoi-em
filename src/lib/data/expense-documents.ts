import {
  expenseDocumentsConfig,
  expenseDocumentsCsvExportUrl,
  expenseDocumentsSheetUrl,
  type ExpenseDocumentSheetSource,
} from "@/config/expense-documents";
import { parseExpenseDocumentRows } from "@/lib/data/expense-documents-parse";
import { formatVnd } from "@/lib/format-vnd";

export type ExpenseDocumentRow = {
  stt: number;
  school: string;
  commune: string;
  province: string;
  studentCount: number | null;
  amount: number | null;
  amountLabel: string;
  driveUrl: string | null;
};

export type ExpenseDocumentList = {
  id: string;
  year: number;
  month: number;
  label: string;
  title: string;
  sheetUrl: string;
  rows: ExpenseDocumentRow[];
  summary: {
    count: number;
    totalAmount: number;
    withDriveLink: number;
  };
};

export type ExpenseDocumentsPayload = {
  lists: ExpenseDocumentList[];
  defaultListId: string;
};

type MemoryCacheEntry<T> = {
  value: T;
  expiresAt: number;
};

const memoryCache = new Map<string, MemoryCacheEntry<unknown>>();
const inFlight = new Map<string, Promise<unknown>>();

function cacheTtlMs(): number {
  return expenseDocumentsConfig.revalidateSeconds * 1000;
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

async function fetchListCsv(source: ExpenseDocumentSheetSource): Promise<string> {
  const response = await fetch(expenseDocumentsCsvExportUrl(source), {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Expense documents CSV fetch failed (${source.id}): ${response.status}`);
  }

  return response.text();
}

function summarizeRows(rows: ExpenseDocumentRow[]): ExpenseDocumentList["summary"] {
  return {
    count: rows.length,
    totalAmount: rows.reduce((sum, row) => sum + (row.amount ?? 0), 0),
    withDriveLink: rows.filter((row) => row.driveUrl).length,
  };
}

async function loadExpenseDocumentList(source: ExpenseDocumentSheetSource): Promise<ExpenseDocumentList> {
  const csvText = await fetchListCsv(source);
  const rows = parseExpenseDocumentRows(csvText);

  return {
    id: source.id,
    year: source.year,
    month: source.month,
    label: source.label,
    title: source.title,
    sheetUrl: expenseDocumentsSheetUrl(source),
    rows,
    summary: summarizeRows(rows),
  };
}

export async function getExpenseDocumentsPayload(): Promise<ExpenseDocumentsPayload | null> {
  try {
    return await withMemoryCache("expense-documents:payload", async () => {
      const lists = await Promise.all(
        expenseDocumentsConfig.lists.map((source) => loadExpenseDocumentList(source)),
      );

      const sorted = [...lists].sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        return b.month - a.month;
      });

      return {
        lists: sorted,
        defaultListId: sorted[0]?.id ?? expenseDocumentsConfig.lists[0].id,
      };
    });
  } catch {
    return null;
  }
}

export function formatExpenseAmount(amount: number | null): string {
  return formatVnd(amount);
}
