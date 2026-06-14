import { describe, expect, it } from "vitest";
import { bankStatementSourceLabel, parseBankStatementSearchParams } from "@/lib/data/bank-statements";
import type { VcbStatementCatalog } from "@/lib/data/vcb-statements";

const catalog: VcbStatementCatalog = {
  defaultSelection: { year: 2018, month: 3 },
  periods: [
    { year: 2026, month: 6, count: 10, label: "Tháng 6/2026" },
    { year: 2026, month: 2, count: 1, label: "Tháng 2/2026" },
    { year: 2026, month: 1, count: 87, label: "Tháng 1/2026" },
    { year: 2018, month: 3, count: 2, label: "Tháng 3/2018" },
  ],
};

describe("parseBankStatementSearchParams", () => {
  it("uses catalog default when no params are provided", () => {
    expect(parseBankStatementSearchParams({}, catalog)).toEqual({
      year: 2018,
      month: 3,
    });
  });

  it("picks latest month when only year is provided", () => {
    expect(parseBankStatementSearchParams({ year: "2026" }, catalog)).toEqual({
      year: 2026,
      month: 6,
    });
  });

  it("keeps explicit month selection", () => {
    expect(parseBankStatementSearchParams({ year: "2026", month: "2" }, catalog)).toEqual({
      year: 2026,
      month: 2,
    });
  });
});

describe("bankStatementSourceLabel", () => {
  it("shows all three banks from 2026 onward", () => {
    expect(bankStatementSourceLabel(2026)).toContain("Vietcombank");
    expect(bankStatementSourceLabel(2026)).toContain("VPBank");
    expect(bankStatementSourceLabel(2026)).toContain("MB");
    expect(bankStatementSourceLabel(2026)).toContain("1805");
  });

  it("shows VCB and VP before 2026", () => {
    expect(bankStatementSourceLabel(2025)).toContain("Vietcombank");
    expect(bankStatementSourceLabel(2025)).toContain("VPBank");
    expect(bankStatementSourceLabel(2025)).not.toContain("1805");
  });
});
