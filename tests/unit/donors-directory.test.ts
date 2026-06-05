import { describe, expect, it } from "vitest";
import {
  donorsDirectoryQueryString,
  parseDonorsDirectorySearchParams,
  summaryCardsFromResponse,
  type DonorsDirectoryResponse,
} from "@/lib/data/donors-directory";

const sample: DonorsDirectoryResponse = {
  version: 1,
  schoolYear: { label: "Năm học 9/2025–5/2026", code: "2025-2026" },
  summary: {
    total: 12345,
    provinceCount: 12,
    display: {
      total: "12.345",
      provinceCount: "12",
    },
  },
  provinceStats: [
    { province: "Lào Cai", donorCount: 420, display: { donorCount: "420" } },
    { province: "Điện Biên", donorCount: 380, display: { donorCount: "380" } },
  ],
  filters: {
    provinces: ["Lào Cai", "Điện Biên"],
    codeStatuses: ["Đã cấp", "Chờ cấp"],
  },
  donors: [
    {
      code: "NE00123",
      province: "Lào Cai",
      codeStatus: "Đã cấp",
      detailUrl: "https://nuoiem2025.quynuoiem.com/danh-sach-nha-tai-tro/NE00123",
      display: {
        representativeName: "Nguyễn V***",
        phone: "09** ***123",
        email: "a***@example.com",
        province: "Lào Cai",
        codeStatus: "Đã cấp",
      },
    },
  ],
  pagination: {
    page: 2,
    pageSize: 20,
    totalPages: 618,
    total: 12345,
    rangeStart: 21,
    rangeEnd: 40,
  },
  meta: {
    source: "nuoiem-directory",
    generatedAt: "2026-06-05T12:00:00.000Z",
    cacheMaxAgeSeconds: 300,
    directoryUrl: "https://nuoiem2025.quynuoiem.com",
    donorsPageUrl: "https://nuoiem2025.quynuoiem.com/danh-sach-nha-tai-tro",
  },
};

describe("summaryCardsFromResponse (donors)", () => {
  it("maps API display fields to summary cards", () => {
    expect(summaryCardsFromResponse(sample)).toEqual({
      total: "12.345",
      provinceCount: "12",
    });
  });
});

describe("parseDonorsDirectorySearchParams", () => {
  it("reads page, province, q, and codeStatus from search params", () => {
    expect(
      parseDonorsDirectorySearchParams({
        page: "3",
        province: "Lào Cai",
        q: "NE00123",
        codeStatus: "Đã cấp",
      }),
    ).toMatchObject({
      page: 3,
      province: "Lào Cai",
      query: "NE00123",
      codeStatus: "Đã cấp",
    });
  });

  it("defaults page to 1 and accepts query alias", () => {
    expect(parseDonorsDirectorySearchParams({ query: "09" })).toMatchObject({
      page: 1,
      query: "09",
    });
  });
});

describe("donorsDirectoryQueryString", () => {
  it("builds query string for pagination and filters", () => {
    const qs = donorsDirectoryQueryString({
      page: 2,
      province: "Lào Cai",
      query: "NE00123",
      codeStatus: "Đã cấp",
    });

    expect(qs).toContain("page=2");
    expect(qs).toContain("province=L%C3%A0o+Cai");
    expect(qs).toContain("q=NE00123");
    expect(qs).toContain("codeStatus=%C4%90%C3%A3+c%E1%BA%A5p");
  });

  it("omits page when on first page", () => {
    expect(donorsDirectoryQueryString({ page: 1, province: "Điện Biên" })).toBe(
      "?province=%C4%90i%E1%BB%87n+Bi%C3%AAn",
    );
  });
});
