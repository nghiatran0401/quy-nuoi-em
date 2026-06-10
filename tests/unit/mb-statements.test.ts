import { describe, expect, it } from "vitest";
import { mbTransactionToRow } from "@/lib/data/mb-statements";

describe("mbTransactionToRow", () => {
  it("maps credit transactions to thu", () => {
    const row = mbTransactionToRow({
      id: "2064522891461926912",
      refId: "FT26161327864090",
      transactionTime: "2026-06-10T08:39:00",
      type: "CREDIT",
      transactionAmount: 1450000,
      narrative: "NGUYEN THI HONG PHUC chuyen tien",
      otherAccountDisplayName: "NGƯỜI ỦNG HỘ ẨN DANH",
    });

    expect(row.year).toBe(2026);
    expect(row.month).toBe(6);
    expect(row.thu).toBe(1450000);
    expect(row.chi).toBeNull();
    expect(row.balance).toBeNull();
    expect(row.source).toBe("mb");
    expect(row.occurredAt).toBe("2026-06-10T08:39:00");
    expect(row.dateDoc).toBe("FT26161327864090");
  });

  it("maps debit transactions to chi", () => {
    const row = mbTransactionToRow({
      id: "20649080140125",
      refId: "FT26149080140125",
      transactionTime: "2026-05-29T12:00:00",
      type: "DEBIT",
      transactionAmount: 2000,
      narrative: "Phi dich vu",
      otherAccountDisplayName: null,
    });

    expect(row.chi).toBe(2000);
    expect(row.thu).toBeNull();
  });
});
