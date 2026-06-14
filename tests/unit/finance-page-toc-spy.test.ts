import { describe, expect, it } from "vitest";
import { resolveActiveTocSection } from "@/lib/finance-page-toc-spy";

const sections = [
  { id: "bc-thu-chi", top: -2400 },
  { id: "kenh-minh-bach", top: -1800 },
  { id: "cach-minh-bach", top: -900 },
  { id: "sao-ke", top: -500 },
  { id: "chung-tu-chi", top: -120 },
];

describe("resolveActiveTocSection", () => {
  const offset = 128;

  it("highlights the section that contains the activation line", () => {
    expect(resolveActiveTocSection(sections, offset)).toBe("chung-tu-chi");
  });

  it("keeps the previous section active until the next heading crosses the line", () => {
    const enteringChungTu = [
      ...sections.slice(0, 4),
      { id: "chung-tu-chi", top: 200 },
    ];

    expect(resolveActiveTocSection(enteringChungTu, offset)).toBe("sao-ke");
  });

  it("activates sao ke when its heading is aligned under the header", () => {
    const atSaoKe = [
      ...sections.slice(0, 3),
      { id: "sao-ke", top: 120 },
      { id: "chung-tu-chi", top: 1800 },
    ];

    expect(resolveActiveTocSection(atSaoKe, offset)).toBe("sao-ke");
  });

  it("selects the last section near the page bottom", () => {
    expect(resolveActiveTocSection(sections, offset, { nearPageBottom: true })).toBe("chung-tu-chi");
  });

  it("falls back to the first section at the top of the page", () => {
    const atTop = [
      { id: "bc-thu-chi", top: 220 },
      { id: "kenh-minh-bach", top: 900 },
      { id: "cach-minh-bach", top: 1600 },
      { id: "sao-ke", top: 2400 },
      { id: "chung-tu-chi", top: 3200 },
    ];

    expect(resolveActiveTocSection(atTop, offset)).toBe("bc-thu-chi");
  });
});
