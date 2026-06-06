const DEFAULT_DONORS_DIRECTORY_URL =
  "https://nuoiem2025.quynuoiem.com/api/cong-khai/danh-sach-nha-tai-tro";

export const DONORS_DIRECTORY_PAGE_SIZE = 20;

export type DonorsDirectoryDonor = {
  code: string;
  totalCodes: number | null;
  detailUrl: string;
  display: {
    representativeName: string;
    phone: string;
    email: string;
    totalCodes: string;
    codeRange: string;
  };
};

export type DonorsDirectoryResponse = {
  version: 1 | 2;
  schoolYear: { label: string; code: "2025-2026" };
  summary: {
    total: number;
    display: {
      total: string;
      provinceCount?: string;
    };
  };
  filters: {
    provinces: string[];
    codeStatuses?: string[];
  };
  donors: DonorsDirectoryDonor[];
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
    cacheMaxAgeSeconds: number;
    directoryUrl: string;
    donorsPageUrl: string;
  };
};

export type DonorsDirectoryQuery = {
  page?: number;
  pageSize?: number;
  province?: string;
  query?: string;
};

export type DonorsDirectorySummaryCards = {
  total: string;
};

export const unavailableDonorsSummary: DonorsDirectorySummaryCards = {
  total: "—",
};

function donorsDirectoryEndpoint(): string {
  return (
    process.env.NUOIEM_DONORS_API_URL?.trim() ||
    process.env.NUOIEM_DIRECTORY_DONORS_URL?.trim() ||
    DEFAULT_DONORS_DIRECTORY_URL
  );
}

function isDonorsDirectoryResponse(value: unknown): value is DonorsDirectoryResponse {
  if (!value || typeof value !== "object") return false;
  const row = value as DonorsDirectoryResponse;
  return (
    (row.version === 1 || row.version === 2) &&
    Array.isArray(row.donors) &&
    Boolean(row.summary?.display?.total) &&
    Boolean(row.pagination)
  );
}

export function donorsDirectoryQueryString(params: DonorsDirectoryQuery): string {
  const sp = new URLSearchParams();

  if (params.page && params.page > 1) {
    sp.set("page", String(params.page));
  }
  if (params.pageSize && params.pageSize !== DONORS_DIRECTORY_PAGE_SIZE) {
    sp.set("pageSize", String(params.pageSize));
  }
  if (params.province?.trim()) {
    sp.set("province", params.province.trim());
  }
  if (params.query?.trim()) {
    sp.set("q", params.query.trim());
  }

  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

export function parseDonorsDirectorySearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): DonorsDirectoryQuery {
  const read = (key: string) => {
    const value = searchParams[key];
    return typeof value === "string" ? value : undefined;
  };

  const pageRaw = read("page");
  const page = pageRaw ? Math.max(1, Number.parseInt(pageRaw, 10) || 1) : 1;

  return {
    page,
    pageSize: DONORS_DIRECTORY_PAGE_SIZE,
    province: read("province"),
    query: read("q") ?? read("query"),
  };
}

export function summaryCardsFromResponse(
  data: DonorsDirectoryResponse,
): DonorsDirectorySummaryCards {
  return {
    total: data.summary.display.total,
  };
}

export async function fetchDonorsDirectory(
  query: DonorsDirectoryQuery = {},
): Promise<DonorsDirectoryResponse | null> {
  const url = new URL(donorsDirectoryEndpoint());

  url.searchParams.set("page", String(query.page ?? 1));
  url.searchParams.set("pageSize", String(query.pageSize ?? DONORS_DIRECTORY_PAGE_SIZE));

  if (query.province?.trim()) {
    url.searchParams.set("province", query.province.trim());
  }
  if (query.query?.trim()) {
    url.searchParams.set("q", query.query.trim());
  }

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 300 },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return null;
    }

    const data: unknown = await response.json();
    if (!isDonorsDirectoryResponse(data)) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}
