import { describe, expect, it } from "vitest";
import {
  FINANCE_PAGE_PATH,
  FINANCE_STATEMENTS_PATH,
  getFinancePageUrl,
  legacyFinancePath,
  rewriteLegacyFinanceUrls,
} from "@/lib/finance-url";

describe("finance-url", () => {
  it("rewrites legacy taichinh.nuoiem.com URLs to quynuoiem.com/tai-chinh", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://quynuoiem.com";

    expect(rewriteLegacyFinanceUrls("Xem tại https://taichinh.nuoiem.com/")).toBe(
      "Xem tại https://quynuoiem.com/tai-chinh",
    );
    expect(rewriteLegacyFinanceUrls("https://www.taichinh.nuoiem.com#sao-ke")).toBe(
      "https://quynuoiem.com/tai-chinh#sao-ke",
    );
  });

  it("maps legacy finance hostnames to in-app routes", () => {
    expect(legacyFinancePath("https://taichinh.nuoiem.com/")).toBe(FINANCE_PAGE_PATH);
    expect(legacyFinancePath("https://taichinh.nuoiem.com/#sao-ke")).toBe(FINANCE_STATEMENTS_PATH);
  });

  it("builds canonical finance page URL", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://quynuoiem.com";
    expect(getFinancePageUrl()).toBe("https://quynuoiem.com/tai-chinh");
  });
});
