import { describe, expect, it } from "vitest";
import {
  formatVnd,
  formatVndAttached,
  formatVndCompactBillions,
  formatVndDots,
  formatVndLabelFromText,
  normalizeVndUnit,
} from "@/lib/format-vnd";

describe("format-vnd", () => {
  it("formats amounts with đ unit", () => {
    expect(formatVndDots(13_354_056_693)).toBe("13.354.056.693");
    expect(formatVnd(1_900_000)).toBe("1.900.000 đ");
    expect(formatVndAttached(71_159_937_110)).toBe("71.159.937.110đ");
    expect(formatVndCompactBillions(71_159_937_110)).toBe("71,2 tỷ đ");
    expect(formatVndLabelFromText("419.815.618")).toBe("419.815.618 đ");
  });

  it("normalizes legacy currency suffixes to đ", () => {
    expect(normalizeVndUnit("419.815.618 ₫")).toBe("419.815.618 đ");
    expect(normalizeVndUnit("419.815.618 VNĐ")).toBe("419.815.618 đ");
    expect(normalizeVndUnit("419.815.618 VND")).toBe("419.815.618 đ");
  });
});
