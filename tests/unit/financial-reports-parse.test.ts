import { describe, expect, it } from "vitest";
import { parseFinancialReportRows } from "@/lib/data/financial-reports-parse";

const sampleCsv = `id,title,document_url,total_income,total_expense,year,month,sort_order
thang-4-2026,Tháng 4/2026,https://docs.google.com/document/d/abc/edit,419.815.618 ₫,10.739.792.717 ₫,2026,4,100
thang-5-2026,Tháng 5/2026,https://docs.google.com/document/d/def/edit,115.517.225 ₫,3.358.193.920 ₫,2026,5,101
`;

describe("parseFinancialReportRows", () => {
  it("parses monthly financial report rows from a Google Sheet CSV export", () => {
    const rows = parseFinancialReportRows(sampleCsv);

    expect(rows).toHaveLength(2);
    expect(rows[0]).toMatchObject({
      id: "thang-5-2026",
      title: "Tháng 5/2026",
      documentUrl: "https://docs.google.com/document/d/def/edit",
      totalIncome: "115.517.225 đ",
      totalExpense: "3.358.193.920 đ",
      year: 2026,
      sortOrder: 101,
    });
    expect(rows[1]).toMatchObject({
      id: "thang-4-2026",
      title: "Tháng 4/2026",
      year: 2026,
      sortOrder: 100,
    });
  });

  it("derives id and title from month/year when omitted", () => {
    const csv = `tieu_de,link,tong_thu,tong_chi,nam,thang
Tháng 6/2026,https://docs.google.com/document/d/june/edit,10.000.000 ₫,20.000.000 ₫,2026,6`;

    const rows = parseFinancialReportRows(csv);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
      id: "thang-6-2026",
      title: "Tháng 6/2026",
      sortOrder: 202606,
    });
  });
});
