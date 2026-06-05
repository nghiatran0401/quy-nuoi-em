const DEFAULT_MA_GHEP_DIRECTORY_URL =
  "https://nuoiem2025.quynuoiem.com/api/cong-khai/ma-ghep";

export const MA_GHEP_DIRECTORY_REVALIDATE_SECONDS = 300;
export const MA_GHEP_DIRECTORY_PAGE_SIZE = 20;

export type MaGhepRecord = {
  representativeCode: string;
  eatingMonths: number | null;
  supportStart: string | null;
  supportEnd: string | null;
  sponsorAmount: number | null;
  actualMealAmount: number | null;
  mergedCode: string | null;
  mergedEatingMonths: number | null;
  mergedAmount: number | null;
  display: {
    eatingMonths: string;
    supportStart: string;
    supportEnd: string;
    sponsorAmount: string;
    actualMealAmount: string;
    mergedCode: string;
    mergedEatingMonths: string;
    mergedAmount: string;
  };
};

export type MaGhepResponse = {
  version: 1;
  schoolYear: { label: string; code: "2025-2026" };
  summary: {
    total: number;
    filteredTotal: number;
    display: {
      total: string;
      filteredTotal: string;
    };
  };
  records: MaGhepRecord[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    total: number;
    rangeStart: number;
    rangeEnd: number;
  };
  meta: {
    source: "nuoiem-directory";
    generatedAt: string;
    lastSyncedAt: string;
    cacheMaxAgeSeconds: number;
    directoryUrl: string;
    maGhepPageUrl: string;
  };
};

export type MaGhepDirectoryQuery = {
  page?: number;
  pageSize?: number;
  query?: string;
};

export type MaGhepDirectorySummary = {
  total: string;
  filteredTotal: string;
};

export const unavailableMaGhepSummary: MaGhepDirectorySummary = {
  total: "—",
  filteredTotal: "—",
};

function maGhepDirectoryEndpoint(): string {
  return (
    process.env.NUOIEM_DIRECTORY_MA_GHEP_URL?.trim() || DEFAULT_MA_GHEP_DIRECTORY_URL
  );
}

function isMaGhepResponse(value: unknown): value is MaGhepResponse {
  if (!value || typeof value !== "object") return false;
  const row = value as MaGhepResponse;
  return (
    row.version === 1 &&
    Array.isArray(row.records) &&
    Boolean(row.summary?.display?.total) &&
    Boolean(row.pagination)
  );
}

export function maGhepDirectoryQueryString(
  params: MaGhepDirectoryQuery,
  options?: { omitPageWhenFirst?: boolean },
): string {
  const sp = new URLSearchParams();

  if (params.page && params.page > 1 && !options?.omitPageWhenFirst) {
    sp.set("page", String(params.page));
  }
  if (params.pageSize && params.pageSize !== MA_GHEP_DIRECTORY_PAGE_SIZE) {
    sp.set("pageSize", String(params.pageSize));
  }
  if (params.query?.trim()) {
    sp.set("q", params.query.trim());
  }

  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

export function parseMaGhepDirectorySearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): MaGhepDirectoryQuery {
  const read = (key: string) => {
    const value = searchParams[key];
    return typeof value === "string" ? value : undefined;
  };

  const pageRaw = read("page");
  const page = pageRaw ? Math.max(1, Number.parseInt(pageRaw, 10) || 1) : 1;

  return {
    page,
    pageSize: MA_GHEP_DIRECTORY_PAGE_SIZE,
    query: read("q") ?? read("query"),
  };
}

export function summaryFromResponse(data: MaGhepResponse): MaGhepDirectorySummary {
  return {
    total: data.summary.display.total,
    filteredTotal: data.summary.display.filteredTotal,
  };
}

export function formatMaGhepSyncedAt(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export async function fetchMaGhepDirectory(
  query: MaGhepDirectoryQuery = {},
): Promise<MaGhepResponse | null> {
  const url = new URL(maGhepDirectoryEndpoint());

  url.searchParams.set("page", String(query.page ?? 1));
  url.searchParams.set("pageSize", String(query.pageSize ?? MA_GHEP_DIRECTORY_PAGE_SIZE));

  if (query.query?.trim()) {
    url.searchParams.set("q", query.query.trim());
  }

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: MA_GHEP_DIRECTORY_REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return null;
    }

    const data: unknown = await response.json();
    if (!isMaGhepResponse(data)) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}
