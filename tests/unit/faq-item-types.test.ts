import { describe, expect, it } from "vitest";
import { normalizeHomeFaqItem } from "@/lib/data/homepage";
import { normalizeFaqItemType } from "@/lib/faq-item-types";

describe("faq-item-types", () => {
  it("migrates legacy English type and id", () => {
    expect(normalizeFaqItemType("address")).toBe("dia-chi");
    const item = normalizeHomeFaqItem({
      id: "address",
      question: "Q",
      type: "address",
      body: "B",
      address: "HN",
    });
    expect(item.type).toBe("dia-chi");
    expect(item.id).toBe("dia-chi");
  });
});
