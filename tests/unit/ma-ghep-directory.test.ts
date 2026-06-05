import { describe, expect, it } from "vitest";
import {
  formatMaGhepSyncedAt,
  maGhepDirectoryQueryString,
  parseMaGhepDirectorySearchParams,
  summaryCardsFromResponse,
  type MaGhepResponse,
} from "@/lib/data/ma-ghep-directory";

const sample: MaGhepResponse = {
  version: 1,
  schoolYear: { label: "Năm học 9/2025–5/2026", code: "2025-2026" },
  summary: {
    total: 1200,
    reducedCount: 84,
    filteredTotal: 42,
    display: {
      total: "1.200",
      reducedCount: "84",
      filteredTotal: "42",
    },
  },
  filters: {
    modes: [
      { value: "all", label: "Tất cả" },
      { value: "reduced", label: "NE giảm ăn" },
    ],
  },
  records: [
    {
      representativeCode: "NELS00017",
      isReduced: true,
      eatingMonths: 8,
      supportStart: "2025-09",
      supportEnd: "2026-05",
      sponsorAmount: 1200000,
      actualMealAmount: 960000,
      mergedCode: "NELS03837",
      mergedEatingMonths: 4,
      mergedAmount: 480000,
      display: {
        eatingMonths: "8",
        supportStart: "09/2025",
        supportEnd: "05/2026",
        sponsorAmount: "1.200.000",
        actualMealAmount: "960.000",
        mergedCode: "NELS03837",
        mergedEatingMonths: "4",
        mergedAmount: "480.000",
        reducedLabel: "X",
      },
    },
  ],
  pagination: {
    page: 2,
    pageSize: 20,
    totalPages: 3,
    total: 42,
    rangeStart: 21,
    rangeEnd: 40,
  },
  meta: {
    source: "nuoiem-directory",
    generatedAt: "2026-06-05T12:00:00.000Z",
    lastSyncedAt: "2026-06-05T11:55:00.000Z",
    cacheMaxAgeSeconds: 300,
    directoryUrl: "https://nuoiem2025.quynuoiem.com",
    maGhepPageUrl: "https://nuoiem2025.quynuoiem.com/ma-ghep",
  },
};

describe("summaryCardsFromResponse", () => {
  it("maps API display fields to summary cards", () => {
    expect(summaryCardsFromResponse(sample)).toEqual({
      total: "1.200",
      reducedCount: "84",
      filteredTotal: "42",
    });
  });
});

describe("parseMaGhepDirectorySearchParams", () => {
  it("reads page, q, and filterMode from search params", () => {
    expect(
      parseMaGhepDirectorySearchParams({
        page: "3",
        q: "NELS00017",
        filterMode: "reduced",
      }),
    ).toMatchObject({
      page: 3,
      query: "NELS00017",
      filterMode: "reduced",
    });
  });

  it("defaults page to 1 and accepts query and filter aliases", () => {
    expect(parseMaGhepDirectorySearchParams({ query: "NELS03837" })).toMatchObject({
      page: 1,
      query: "NELS03837",
      filterMode: "all",
    });

    expect(parseMaGhepDirectorySearchParams({ filter: "giam-an" })).toMatchObject({
      filterMode: "reduced",
    });
  });
});

describe("maGhepDirectoryQueryString", () => {
  it("builds query string for pagination, search, and filter", () => {
    const qs = maGhepDirectoryQueryString({
      page: 2,
      query: "NELS00017",
      filterMode: "reduced",
    });

    expect(qs).toBe("?page=2&q=NELS00017&filterMode=reduced");
  });

  it("omits page when on first page and filter when all", () => {
    expect(maGhepDirectoryQueryString({ page: 1, query: "NELS" })).toBe("?q=NELS");
  });
});

describe("formatMaGhepSyncedAt", () => {
  it("formats ISO timestamps for vi-VN locale", () => {
    const formatted = formatMaGhepSyncedAt("2026-06-05T11:55:00.000Z");
    expect(formatted).toMatch(/2026/);
    expect(formatted).not.toBe("2026-06-05T11:55:00.000Z");
  });
});
