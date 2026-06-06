import { describe, expect, it } from "vitest";
import { getHomeChildrenDisplay, homeChildrenStats } from "@/config/home-children-stats";

describe("homeChildrenStats", () => {
  it("formats official homepage children totals for school year 2025-2026", () => {
    expect(homeChildrenStats.total).toBe(81_909);
    expect(homeChildrenStats.sponsored).toBe(40_699);
    expect(homeChildrenStats.unsponsored).toBe(41_210);

    expect(getHomeChildrenDisplay()).toEqual({
      total: "81.909",
      sponsored: "40.699",
      unsponsored: "41.210",
      sponsoredPercent: expect.closeTo(49.7, 1),
      unsponsoredPercent: expect.closeTo(50.3, 1),
      sponsoredPercentLabel: "49,7",
      unsponsoredPercentLabel: "50,3",
      schoolYearLabel: "Năm học 9/2025–5/2026",
    });
  });
});
