import { describe, expect, it } from "vitest";
import { parseExpenseDocumentRows, parseVndAmountCell } from "@/lib/data/expense-documents-parse";

const sampleCsv = `TT,Trường,Xã,Tỉnh,Số học sinh được hỗ trợ trong năm,Số tiền giải ngân trong tháng,Link drive
1,Tiểu học Cao Thăng,Đoài Dương,Cao Bằng,  14 , 8.449.000 VNĐ ,
2,Mầm non Thanh Minh,Điện Biên Phủ,Điện Biên,  56 , 12.940.400 VNĐ ,https://drive.google.com/drive/u/0/folders/1vFPMCLDgt4rFtxrIHmgAYxTlUeYvsZrZ
`;

describe("parseVndAmountCell", () => {
  it("parses Vietnamese currency strings", () => {
    expect(parseVndAmountCell("8.449.000 VNĐ")).toBe(8449000);
    expect(parseVndAmountCell(" 12.940.400 VNĐ ")).toBe(12940400);
  });

  it("returns null for empty values", () => {
    expect(parseVndAmountCell("")).toBeNull();
    expect(parseVndAmountCell(undefined)).toBeNull();
  });
});

describe("parseExpenseDocumentRows", () => {
  it("parses school disbursement rows with optional drive links", () => {
    const rows = parseExpenseDocumentRows(sampleCsv);

    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({
      stt: 1,
      school: "Tiểu học Cao Thăng",
      commune: "Đoài Dương",
      province: "Cao Bằng",
      studentCount: 14,
      amount: 8449000,
      driveUrl: null,
    });
    expect(rows[1]?.driveUrl).toBe(
      "https://drive.google.com/drive/u/0/folders/1vFPMCLDgt4rFtxrIHmgAYxTlUeYvsZrZ",
    );
  });
});
