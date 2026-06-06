import { getHomeChildrenDisplay } from "@/config/home-children-stats";
import { getHomeFinanceDisplay } from "@/config/home-finance-stats";
import { publicCatalog } from "@/config/public-catalog";
import type { StatItem } from "@/content/types";

const DEFAULT_HOME_METRICS_URL =
  "https://nuoiem2025.quynuoiem.com/api/cong-khai/thong-ke-tong-quan";

const REVALIDATE_SECONDS = 300;

export type HomeMetricsResponse = {
  version: 1;
  schoolYear: { label: string; code: "2025-2026" };
  children: {
    total: number;
    sponsored: number;
    unsponsored: number;
    sponsoredPercent: number;
    unsponsoredPercent: number;
  };
  finance: {
    totalThuVnd: number;
    totalChiVnd: number;
    display: {
      thuCompact: string;
      thuDetail: string;
      chiCompact: string;
      chiDetail: string;
    };
  };
  display: {
    childrenTotal: string;
    sponsored: string;
    unsponsored: string;
  };
  meta: {
    source: "nuoiem-directory";
    generatedAt: string;
    cacheMaxAgeSeconds: number;
    directoryUrl: string;
  };
};

export type LiveHomeStats = {
  stats: StatItem[];
  directoryUrl: string;
  fromLiveApi: boolean;
};

/** Placeholder stats when the directory API is unreachable and nothing is cached yet. */
export const unavailableHomeStats: StatItem[] = [
  {
    value: "—",
    label: "Tổng số em nuôi",
    hint: "Đang cập nhật từ danh mục công khai",
  },
  {
    value: "—",
    label: "Tổng tiền thu",
    hint: "Đang cập nhật",
  },
  {
    value: "—",
    label: "Tổng tiền chi",
    hint: "Đang cập nhật",
  },
  {
    value: "—",
    label: "Đã có người nuôi",
    hint: "Đang cập nhật",
  },
  {
    value: "—",
    label: "Chưa có người nuôi",
    hint: "Đang cập nhật",
  },
];

function homeMetricsEndpoint(): string {
  return (
    process.env.NUOIEM_DIRECTORY_STATS_URL?.trim() || DEFAULT_HOME_METRICS_URL
  );
}

function financeDetailHint(detail: string): string {
  const trimmed = detail.trim();
  if (/^chi tiết:/i.test(trimmed)) return trimmed;
  return `Chi tiết: ${trimmed}`;
}

export function homeMetricsToStatItems(data: HomeMetricsResponse): StatItem[] {
  const finance = getHomeFinanceDisplay();
  const children = getHomeChildrenDisplay();

  return [
    {
      value: children.total,
      label: "Tổng số em nuôi",
      hint: children.schoolYearLabel,
    },
    {
      value: finance.thuCompact,
      label: "Tổng tiền thu",
      hint: financeDetailHint(finance.thuDetail),
    },
    {
      value: finance.chiCompact,
      label: "Tổng tiền chi",
      hint: financeDetailHint(finance.chiDetail),
    },
    {
      value: children.sponsored,
      label: "Đã có người nuôi",
      hint: `${children.sponsoredPercentLabel}% tổng số em nuôi`,
    },
    {
      value: children.unsponsored,
      label: "Chưa có người nuôi",
      hint: `${children.unsponsoredPercentLabel}% tổng số em nuôi`,
    },
  ];
}

function isHomeMetricsResponse(value: unknown): value is HomeMetricsResponse {
  if (!value || typeof value !== "object") return false;
  const row = value as HomeMetricsResponse;
  return row.version === 1 && Boolean(row.display?.childrenTotal);
}

export async function fetchHomeMetrics(): Promise<HomeMetricsResponse | null> {
  const url = homeMetricsEndpoint();

  try {
    const response = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return null;
    }

    const data: unknown = await response.json();
    if (!isHomeMetricsResponse(data)) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

export async function getLiveHomeStats(): Promise<LiveHomeStats> {
  const metrics = await fetchHomeMetrics();
  const directoryFallback = publicCatalog.url.replace(/\/$/, "") || publicCatalog.url;

  if (!metrics) {
    return {
      stats: unavailableHomeStats,
      directoryUrl: directoryFallback,
      fromLiveApi: false,
    };
  }

  return {
    stats: homeMetricsToStatItems(metrics),
    directoryUrl: metrics.meta.directoryUrl?.trim() || directoryFallback,
    fromLiveApi: true,
  };
}
