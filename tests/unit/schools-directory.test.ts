import { describe, expect, it } from "vitest";
import {
  parseSchoolsDirectorySearchParams,
  schoolsDirectoryQueryString,
  summaryCardsFromResponse,
  type SchoolsDirectoryResponse,
} from "@/lib/data/schools-directory";

const sample: SchoolsDirectoryResponse = {
  version: 1,
  schoolYear: { label: "Năm học 9/2025–5/2026", code: "2025-2026" },
  summary: {
    schools: { count: 761, studentCount: 81937, provinceCount: 12 },
    children: {
      total: 81909,
      sponsored: 40699,
      unsponsored: 41210,
      sponsoredPercent: 49.7,
      unsponsoredPercent: 50.3,
    },
    display: {
      schoolCount: "761",
      studentCount: "81.937",
      provinceCount: "12",
      childrenTotal: "81.909",
      sponsored: "40.699",
      unsponsored: "41.210",
    },
  },
  filters: {
    provinces: ["Điện Biên", "Lào Cai"],
    eatingStatuses: ["Đang ăn", "Đã dừng / rút"],
  },
  schools: [
    {
      schoolIdentity: "school-1",
      school: "PTDTBT TH Nậm Khắt",
      commune: "Púng Luông",
      province: "Lào Cai",
      locationLabel: "Púng Luông / Lào Cai",
      campuses: ["Nậm Khắt"],
      campusesDisplay: "Nậm Khắt",
      studentCount: 120,
      codesIssued: 80,
      eatingStatus: "Đang ăn",
      stopLetterUrl: "",
      childrenListUrl: "https://nuoiem2025.quynuoiem.com/danh-sach-em-nuoi?school=example",
      display: { studentCount: "120", codesIssued: "80" },
    },
  ],
  pagination: {
    page: 2,
    pageSize: 20,
    totalPages: 39,
    total: 761,
    rangeStart: 21,
    rangeEnd: 40,
  },
  meta: {
    source: "nuoiem-directory",
    generatedAt: "2026-06-05T12:00:00.000Z",
    cacheMaxAgeSeconds: 300,
    directoryUrl: "https://nuoiem2025.quynuoiem.com",
    schoolsPageUrl: "https://nuoiem2025.quynuoiem.com/danh-sach-diem-truong-ho-tro",
  },
};

describe("summaryCardsFromResponse", () => {
  it("maps API display fields to summary cards", () => {
    expect(summaryCardsFromResponse(sample)).toEqual({
      schoolCount: "761",
      studentCount: "81.937",
      sponsored: "40.699",
      unsponsored: "41.210",
    });
  });
});

describe("parseSchoolsDirectorySearchParams", () => {
  it("reads page, province, q, and eatingStatus from search params", () => {
    expect(
      parseSchoolsDirectorySearchParams({
        page: "3",
        province: "Điện Biên",
        q: "mầm non",
        eatingStatus: "Đang ăn",
      }),
    ).toMatchObject({
      page: 3,
      province: "Điện Biên",
      query: "mầm non",
      eatingStatus: "Đang ăn",
    });
  });

  it("defaults page to 1 and accepts query alias", () => {
    expect(parseSchoolsDirectorySearchParams({ query: "THCS" })).toMatchObject({
      page: 1,
      query: "THCS",
    });
  });
});

describe("schoolsDirectoryQueryString", () => {
  it("builds query string for pagination and filters", () => {
    const qs = schoolsDirectoryQueryString({
      page: 2,
      province: "Lào Cai",
      query: "nậm khắt",
      eatingStatus: "Đang ăn",
    });

    expect(qs).toBe("?page=2&province=L%C3%A0o+Cai&q=n%E1%BA%ADm+kh%E1%BA%AFt&eatingStatus=%C4%90ang+%C4%83n");
  });

  it("omits page when on first page", () => {
    expect(
      schoolsDirectoryQueryString({ page: 1, province: "Điện Biên" }),
    ).toBe("?province=%C4%90i%E1%BB%87n+Bi%C3%AAn");
  });
});
