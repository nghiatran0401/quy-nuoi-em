import { describe, expect, it } from "vitest";
import {
  formatStatementDateTime,
  formatVietnamDateTime,
  parseVietnamDateTime,
} from "@/lib/format-statement-datetime";
import type { VcbStatementRow } from "@/lib/data/vcb-statements";

describe("formatVietnamDateTime", () => {
  it("formats MB timestamps in Vietnam time", () => {
    const date = parseVietnamDateTime("2026-06-10T08:39:00");
    expect(formatVietnamDateTime(date)).toBe("10/06/2026 08:39:00");
  });
});

describe("formatStatementDateTime", () => {
  it("shows date and time for MB rows", () => {
    const row: VcbStatementRow = {
      stt: 1,
      dateDoc: "FT26161327864090",
      occurredAt: "2026-06-10T08:39:00",
      chi: null,
      thu: 1_450_000,
      balance: null,
      detail: "test",
      year: 2026,
      month: 6,
      source: "mb",
    };

    expect(formatStatementDateTime(row)).toBe("10/06/2026 08:39:00");
  });

  it("shows date only for VCB rows without time", () => {
    const row: VcbStatementRow = {
      stt: 238173,
      dateDoc: "25/02/2026 9701 - 0008477811",
      chi: null,
      thu: 807,
      balance: 9_506_481,
      detail: "test",
      year: 2026,
      month: 2,
      source: "vcb",
    };

    expect(formatStatementDateTime(row)).toBe("25/02/2026");
  });
});
