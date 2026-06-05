const DEFAULT_SCHOOLS_DIRECTORY_URL =
  "https://nuoiem2025.quynuoiem.com/api/cong-khai/danh-sach-diem-truong-ho-tro";

export const SCHOOLS_DIRECTORY_REVALIDATE_SECONDS = 300;
export const SCHOOLS_DIRECTORY_PAGE_SIZE = 20;

export type SchoolsDirectorySchool = {
  schoolIdentity: string;
  school: string;
  commune: string;
  province: string;
  locationLabel: string;
  campuses: string[];
  campusesDisplay: string;
  studentCount: number;
  codesIssued: number | null;
  eatingStatus: string;
  stopLetterUrl: string;
  childrenListUrl: string;
  display: {
    studentCount: string;
    codesIssued: string | null;
  };
};

export type SchoolsDirectoryResponse = {
  version: 1;
  schoolYear: { label: string; code: "2025-2026" };
  summary: {
    schools: {
      count: number;
      studentCount: number;
      provinceCount: number;
    };
    children: {
      total: number;
      sponsored: number;
      unsponsored: number;
      sponsoredPercent: number;
      unsponsoredPercent: number;
    };
    display: {
      schoolCount: string;
      studentCount: string;
      provinceCount: string;
      childrenTotal: string;
      sponsored: string;
      unsponsored: string;
    };
  };
  filters: {
    provinces: string[];
    eatingStatuses: string[];
  };
  schools: SchoolsDirectorySchool[];
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
    schoolsPageUrl: string;
  };
};

export type SchoolsDirectoryQuery = {
  page?: number;
  pageSize?: number;
  province?: string;
  commune?: string;
  query?: string;
  eatingStatus?: string;
};

export type SchoolsDirectorySummaryCards = {
  schoolCount: string;
  studentCount: string;
  sponsored: string;
  unsponsored: string;
};

export const unavailableSchoolsSummary: SchoolsDirectorySummaryCards = {
  schoolCount: "—",
  studentCount: "—",
  sponsored: "—",
  unsponsored: "—",
};

function schoolsDirectoryEndpoint(): string {
  return (
    process.env.NUOIEM_DIRECTORY_SCHOOLS_URL?.trim() || DEFAULT_SCHOOLS_DIRECTORY_URL
  );
}

function isSchoolsDirectoryResponse(value: unknown): value is SchoolsDirectoryResponse {
  if (!value || typeof value !== "object") return false;
  const row = value as SchoolsDirectoryResponse;
  return (
    row.version === 1 &&
    Array.isArray(row.schools) &&
    Boolean(row.summary?.display?.schoolCount) &&
    Boolean(row.pagination)
  );
}

export function schoolsDirectoryQueryString(
  params: SchoolsDirectoryQuery,
  options?: { omitPageWhenFirst?: boolean },
): string {
  const sp = new URLSearchParams();

  if (params.page && params.page > 1 && !options?.omitPageWhenFirst) {
    sp.set("page", String(params.page));
  }
  if (params.pageSize && params.pageSize !== SCHOOLS_DIRECTORY_PAGE_SIZE) {
    sp.set("pageSize", String(params.pageSize));
  }
  if (params.province?.trim()) {
    sp.set("province", params.province.trim());
  }
  if (params.commune?.trim()) {
    sp.set("commune", params.commune.trim());
  }
  if (params.query?.trim()) {
    sp.set("q", params.query.trim());
  }
  if (params.eatingStatus?.trim()) {
    sp.set("eatingStatus", params.eatingStatus.trim());
  }

  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

export function parseSchoolsDirectorySearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): SchoolsDirectoryQuery {
  const read = (key: string) => {
    const value = searchParams[key];
    return typeof value === "string" ? value : undefined;
  };

  const pageRaw = read("page");
  const page = pageRaw ? Math.max(1, Number.parseInt(pageRaw, 10) || 1) : 1;

  return {
    page,
    pageSize: SCHOOLS_DIRECTORY_PAGE_SIZE,
    province: read("province"),
    commune: read("commune"),
    query: read("q") ?? read("query"),
    eatingStatus: read("eatingStatus"),
  };
}

export function summaryCardsFromResponse(
  data: SchoolsDirectoryResponse,
): SchoolsDirectorySummaryCards {
  return {
    schoolCount: data.summary.display.schoolCount,
    studentCount: data.summary.display.studentCount,
    sponsored: data.summary.display.sponsored,
    unsponsored: data.summary.display.unsponsored,
  };
}

export async function fetchSchoolsDirectory(
  query: SchoolsDirectoryQuery = {},
): Promise<SchoolsDirectoryResponse | null> {
  const url = new URL(schoolsDirectoryEndpoint());

  url.searchParams.set("page", String(query.page ?? 1));
  url.searchParams.set("pageSize", String(query.pageSize ?? SCHOOLS_DIRECTORY_PAGE_SIZE));

  if (query.province?.trim()) {
    url.searchParams.set("province", query.province.trim());
  }
  if (query.commune?.trim()) {
    url.searchParams.set("commune", query.commune.trim());
  }
  if (query.query?.trim()) {
    url.searchParams.set("q", query.query.trim());
  }
  if (query.eatingStatus?.trim()) {
    url.searchParams.set("eatingStatus", query.eatingStatus.trim());
  }

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: SCHOOLS_DIRECTORY_REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return null;
    }

    const data: unknown = await response.json();
    if (!isSchoolsDirectoryResponse(data)) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}
