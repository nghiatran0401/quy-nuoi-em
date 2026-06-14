import { describe, expect, it } from "vitest";
import {
  bankStatementSourceSummary,
  formatBankAccountLabel,
  resolveStatementSource,
} from "@/lib/data/bank-statement-sources";
import { iterateCsvRecords } from "@/lib/data/vcb-statements-parse";

const SAMPLE_VP_CSV = `Danh sách chi dự án Nuôi em tại ngân hàng VP Bank,,,,,,,
Từ 01/01/2018 đến 31/05/2026,,,,,,,
,,,Tổng chi,200.250.831.395,,,
STT,Ngày hiệu lực,Nội dung giao dịch,Mã GD,Chi,Thu,Năm,Tháng
1,07/12/2018,NHOM TINH NGUYEN CHUYEN TIEN,FT18341CNQH00059,80.000.000,,2018,12
2,05/01/2019,DUA N NUOI EM TT TIEN,FT19005CCMO00005,62.560.000,,2019,1
`;

function parseVpRow(record: string[]) {
  if (record.length < 8) return null;
  const stt = Number(record[0]);
  const year = Number(record[6]);
  const month = Number(record[7]);
  if (!Number.isFinite(stt) || !Number.isFinite(year) || !Number.isFinite(month)) return null;
  return { stt, year, month, source: "vp" as const };
}

describe("VP sheet CSV", () => {
  it("parses data rows after header", () => {
    const records = [...iterateCsvRecords(SAMPLE_VP_CSV)];
    const dataRows = records.slice(3).map(parseVpRow).filter(Boolean);
    expect(dataRows).toHaveLength(2);
    expect(dataRows[0]).toMatchObject({ stt: 1, year: 2018, month: 12, source: "vp" });
    expect(dataRows[1]).toMatchObject({ stt: 2, year: 2019, month: 1, source: "vp" });
  });
});

describe("bankStatementSourceSummary", () => {
  it("includes all three banks from 2026", () => {
    const summary = bankStatementSourceSummary(2026, 2026);
    expect(summary).toContain("Vietcombank");
    expect(summary).toContain("VPBank");
    expect(summary).toContain("1805");
  });

  it("excludes MB before merge year", () => {
    const summary = bankStatementSourceSummary(2025, 2026);
    expect(summary).toContain("Vietcombank");
    expect(summary).toContain("VPBank");
    expect(summary).not.toContain("1805");
  });
});

describe("resolveStatementSource", () => {
  it("defaults to vcb when source is missing", () => {
    expect(resolveStatementSource({ stt: 1 } as never)).toBe("vcb");
  });
});

describe("formatBankAccountLabel", () => {
  it("omits account number when unavailable", () => {
    expect(
      formatBankAccountLabel({
        shortLabel: "VP",
        bankName: "VPBank (VP)",
        accountNumber: null,
        badgeClassName: "",
      }),
    ).toBe("VPBank (VP)");
  });
});
