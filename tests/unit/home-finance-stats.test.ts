import { describe, expect, it } from "vitest";
import { getHomeFinanceDisplay, homeFinanceStats } from "@/config/home-finance-stats";

describe("homeFinanceStats", () => {
  it("formats official homepage finance totals", () => {
    expect(homeFinanceStats.totalThuVnd).toBe(71_159_937_110);
    expect(homeFinanceStats.totalChiVnd).toBe(78_507_521_826);

    expect(getHomeFinanceDisplay()).toEqual({
      thuCompact: "71,2 tỷ đ",
      thuDetail: "71.159.937.110đ",
      chiCompact: "78,5 tỷ đ",
      chiDetail: "78.507.521.826đ",
    });
  });
});
