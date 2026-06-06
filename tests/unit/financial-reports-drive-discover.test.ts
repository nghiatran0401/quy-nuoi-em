import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { parseFinancialReportDriveFiles } from "@/lib/data/financial-reports-drive-discover";

describe("parseFinancialReportDriveFiles", () => {
  it("extracts monthly report file IDs from Drive folder HTML", () => {
    const fixturePath = resolve(
      process.cwd(),
      "tests/fixtures/financial-reports-drive-folder-snippet.html",
    );
    const html = readFileSync(fixturePath, "utf8");
    const files = parseFinancialReportDriveFiles(html);

    expect(files).toEqual([
      { month: 5, year: 2026, fileId: "1l0D-8UW4i62MEOsA4iK7O-SZHO9sxj6k" },
      { month: 4, year: 2026, fileId: "1qMuH3UUmjgqhw286dU6GNEvI7Lf2uJ-2" },
      { month: 3, year: 2026, fileId: "1hD_s7_XsIsxtKP624onubj_woC2RcL_7" },
      { month: 2, year: 2026, fileId: "1T_zlURriSbb72w-grKtpa5wsKxnb-8S-" },
      { month: 1, year: 2026, fileId: "15aDgrQ7HXDtFZ_roswCjRjxqlQlLDu0q" },
    ]);
  });
});
