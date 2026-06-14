import { describe, expect, it } from "vitest";
import {
  formatPeriodLabel,
  iterateCsvRecords,
  parseIntCell,
  parseVndCell,
  pickDefaultStatementSelection,
} from "@/lib/data/vcb-statements-parse";
import { parseVcbStatementSearchParams } from "@/lib/data/vcb-statements";
import type { VcbStatementCatalog } from "@/lib/data/vcb-statements";

const SAMPLE_CSV = `"Sao kê tài khoản ngân hàng VCB 0711000280294",,,,,,,
Từ 01/01/2018 đến 25/02/2026,,,,,,,
STT,"Ngày/
TNX Date/ Số CT/ Doc No",Chi,Thu,"Số dư/
Balance","Nội dung chi tiết/
Transactions in detail",Năm,Tháng
1,"08/02/2018
YG61.000093",,50.000,50.000,HOANG HOA TRUNG;NOP TIEN;,2018,2
2,"11/02/2018
VNCK.989657",,200.000,250.000,IBVCB.1002180282334001.em tuan ung ho,2018,2
3,"01/03/2018
VNCK.100000",1.000.000,,750.000,Chi phi van hanh,2018,3
4,"01/03/2018
VNCK.100001",,500.000,1.250.000,NE1234 ung ho com,2018,3
`;

describe("iterateCsvRecords", () => {
  it("parses multiline quoted fields", () => {
    const records = [...iterateCsvRecords(SAMPLE_CSV)];
    expect(records.length).toBeGreaterThanOrEqual(6);
    expect(records[3][0]).toBe("1");
    expect(records[3][1]).toContain("08/02/2018");
    expect(records[3][3]).toBe("50.000");
  });
});

describe("parseVndCell", () => {
  it("parses dotted VND amounts", () => {
    expect(parseVndCell("1.900.000")).toBe(1900000);
    expect(parseVndCell("")).toBeNull();
  });
});

describe("parseIntCell", () => {
  it("parses year and month integers", () => {
    expect(parseIntCell("2018")).toBe(2018);
    expect(parseIntCell("")).toBeNull();
  });
});

describe("formatPeriodLabel", () => {
  it("formats Vietnamese month label", () => {
    expect(formatPeriodLabel(2025, 9)).toBe("Tháng 9/2025");
  });
});

describe("pickDefaultStatementSelection", () => {
  const periods = [
    { year: 2026, month: 6, count: 10, label: "Tháng 6/2026" },
    { year: 2026, month: 2, count: 1, label: "Tháng 2/2026" },
    { year: 2018, month: 3, count: 2, label: "Tháng 3/2018" },
  ];

  it("selects the current month when data exists", () => {
    const now = new Date("2026-06-14T10:00:00+07:00");
    expect(pickDefaultStatementSelection(periods, now)).toEqual({ year: 2026, month: 6 });
  });

  it("falls back to the latest month in the current year when the current month has no data", () => {
    const now = new Date("2026-03-01T10:00:00+07:00");
    expect(pickDefaultStatementSelection(periods, now)).toEqual({ year: 2026, month: 6 });
  });

  it("falls back to the newest period when the current year has no data", () => {
    const now = new Date("2025-01-01T10:00:00+07:00");
    expect(pickDefaultStatementSelection(periods, now)).toEqual({ year: 2026, month: 6 });
  });
});

describe("parseVcbStatementSearchParams", () => {
  const catalog: VcbStatementCatalog = {
    defaultSelection: { year: 2018, month: 3 },
    periods: [
      { year: 2018, month: 2, count: 2, label: "Tháng 2/2018" },
      { year: 2018, month: 3, count: 2, label: "Tháng 3/2018" },
    ],
  };

  it("uses query params when valid", () => {
    expect(parseVcbStatementSearchParams({ year: "2018", month: "2" }, catalog)).toEqual({
      year: 2018,
      month: 2,
    });
  });

  it("falls back to default for invalid period", () => {
    expect(parseVcbStatementSearchParams({ year: "2099", month: "12" }, catalog)).toEqual({
      year: 2018,
      month: 3,
    });
  });
});
