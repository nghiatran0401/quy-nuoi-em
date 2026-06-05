import { describe, expect, it } from "vitest";
import {
  formatMaGhepSyncedAt,
  maGhepDirectoryQueryString,
  parseMaGhepDirectorySearchParams,
  summaryFromResponse,
  type MaGhepResponse,
} from "@/lib/data/ma-ghep-directory";

const sample: MaGhepResponse = {
  version: 1,
  schoolYear: { label: "Năm học 9/2025–5/2026", code: "2025-2026" },
  summary: {
    total: 9735,
    filteredTotal: 42,
    display: {
      total: "9.735",
      filteredTotal: "42",
    },
  },
  records: [
    {
      representativeCode: "NELS00017",
      eatingMonths: 4,
      supportStart: "9/25",
      supportEnd: "1/26",
      sponsorAmount: 1450000,
      actualMealAmount: 700000,
      mergedCode: "NELS00017A",
      mergedEatingMonths: 5,
      mergedAmount: 750000,
      display: {
        eatingMonths: "4",
        supportStart: "tháng 9 năm 2025",
        supportEnd: "tháng 1 năm 2026",
        sponsorAmount: "1.450.000đ",
        actualMealAmount: "700.000đ",
        mergedCode: "NELS00017A",
        mergedEatingMonths: "5",
        mergedAmount: "750.000đ",
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

describe("summaryFromResponse", () => {
  it("maps API display fields to summary", () => {
    expect(summaryFromResponse(sample)).toEqual({
      total: "9.735",
      filteredTotal: "42",
    });
  });
});

describe("parseMaGhepDirectorySearchParams", () => {
  it("reads page and q from search params", () => {
    expect(
      parseMaGhepDirectorySearchParams({
        page: "3",
        q: "NELS00017",
      }),
    ).toMatchObject({
      page: 3,
      query: "NELS00017",
    });
  });

  it("defaults page to 1 and accepts query alias", () => {
    expect(parseMaGhepDirectorySearchParams({ query: "NELS03837" })).toMatchObject({
      page: 1,
      query: "NELS03837",
    });
  });

  it("ignores legacy filter params", () => {
    expect(
      parseMaGhepDirectorySearchParams({
        filterMode: "reduced",
        filter: "giam-an",
      }),
    ).toMatchObject({
      page: 1,
      query: undefined,
    });
  });
});

describe("maGhepDirectoryQueryString", () => {
  it("builds query string for pagination and search", () => {
    const qs = maGhepDirectoryQueryString({
      page: 2,
      query: "NELS00017",
    });

    expect(qs).toBe("?page=2&q=NELS00017");
  });

  it("omits page when on first page", () => {
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
