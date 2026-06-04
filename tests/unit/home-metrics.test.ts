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
      value: "56,6 tỷ đ",
      label: "Tổng tiền thu",
      hint: "Chi tiết: 56.613.274.077đ",
    });
    expect(stats[2]).toMatchObject({
      value: "56,7 tỷ đ",
      label: "Tổng tiền chi",
      hint: "Chi tiết: 56.733.595.908đ",
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
});
