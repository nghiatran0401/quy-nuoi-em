import { describe, expect, it } from "vitest";
import {
  homeMetricsToStatItems,
  type HomeMetricsResponse,
} from "@/lib/data/home-metrics";

const sample: HomeMetricsResponse = {
  version: 1,
  schoolYear: { label: "Năm học 9/2025–5/2026", code: "2025-2026" },
  children: {
    total: 81909,
    sponsored: 40699,
    unsponsored: 41210,
    sponsoredPercent: 49.7,
    unsponsoredPercent: 50.3,
  },
  finance: {
    totalThuVnd: 56613274077,
    totalChiVnd: 56733595908,
    display: {
      thuCompact: "56,6 tỷ đ",
      thuDetail: "56.613.274.077đ",
      chiCompact: "56,7 tỷ đ",
      chiDetail: "56.733.595.908đ",
    },
  },
  display: {
    childrenTotal: "81.909",
    sponsored: "40.699",
    unsponsored: "41.210",
  },
  meta: {
    source: "nuoiem-directory",
    generatedAt: "2026-06-04T05:50:32.470Z",
    cacheMaxAgeSeconds: 300,
    directoryUrl: "https://nuoiem2025.quynuoiem.com",
  },
};

describe("homeMetricsToStatItems", () => {
  it("maps API display fields to homepage StatItem layout", () => {
    const stats = homeMetricsToStatItems(sample);

    expect(stats).toHaveLength(5);
    expect(stats[0]).toMatchObject({
      value: "81.909",
      label: "Tổng số em nuôi",
      hint: "Năm học 9/2025–5/2026",
    });
    expect(stats[1]).toMatchObject({
      value: "71,2 tỷ đ",
      label: "Tổng tiền thu",
      hint: "Chi tiết: 71.159.937.110đ",
    });
    expect(stats[2]).toMatchObject({
      value: "78,5 tỷ đ",
      label: "Tổng tiền chi",
      hint: "Chi tiết: 78.507.521.826đ",
    });
    expect(stats[3]).toMatchObject({
      value: "40.699",
      label: "Đã có người nuôi",
      hint: "49,7% tổng số em nuôi",
    });
    expect(stats[4]).toMatchObject({
      value: "41.210",
      label: "Chưa có người nuôi",
      hint: "50,3% tổng số em nuôi",
    });
  });

  it("uses live directory children totals from the API response", () => {
    const liveApiSample: HomeMetricsResponse = {
      ...sample,
      children: {
        total: 81901,
        sponsored: 40701,
        unsponsored: 41200,
        sponsoredPercent: 49.7,
        unsponsoredPercent: 50.3,
      },
      display: {
        childrenTotal: "81.901",
        sponsored: "40.701",
        unsponsored: "41.200",
      },
    };

    const stats = homeMetricsToStatItems(liveApiSample);

    expect(stats[0]?.value).toBe("81.901");
    expect(stats[3]?.value).toBe("40.701");
    expect(stats[3]?.hint).toBe("49,7% tổng số em nuôi");
    expect(stats[4]?.value).toBe("41.200");
    expect(stats[4]?.hint).toBe("50,3% tổng số em nuôi");
  });
});
