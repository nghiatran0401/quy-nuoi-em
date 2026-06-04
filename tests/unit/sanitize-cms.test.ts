import { describe, expect, it } from "vitest";
import {
  isLegacyMembersSectionContent,
  isTestOrEnglishHero,
  isTestOrEnglishMeta,
  isTestOrEnglishPageHero,
  isTestOrEnglishPartnersTitle,
} from "@/lib/cms/sanitize-cms";

describe("sanitize-cms", () => {
  it("detects vitest pollution in hero", () => {
    expect(
      isTestOrEnglishHero({
        eyebrow: "vi",
        title: "vitest-home-123",
        description: "desc",
        sponsorNow: "Donate",
        learnMore: "Learn",
      }),
    ).toBe(true);
  });

  it("allows real Vietnamese hero", () => {
    expect(
      isTestOrEnglishHero({
        eyebrow: "Bữa cơm níu chân trẻ tới trường",
        title: "Quỹ Nuôi Em",
        description: "150.000đ mỗi tháng giúp bé vùng cao no bụng.",
        sponsorNow: "Đóng góp ngay",
        learnMore: "Tìm hiểu thêm",
      }),
    ).toBe(false);
  });

  it("detects legacy Thành viên Quỹ copy on awards block", () => {
    expect(
      isLegacyMembersSectionContent({
        eyebrow: "Thành viên Quỹ",
        title: "Gắn Kết Yêu Thương",
        paragraphs: [
          "Bắt đầu từ con số 20 thành viên Quỹ là các anh chị trong nhóm sản xuất Nuôi Em...",
        ],
        cta: "Thành viên Quỹ",
      }),
    ).toBe(true);
    expect(
      isLegacyMembersSectionContent({
        eyebrow: "",
        title: "THAM KHẢO",
        paragraphs: ["Những giải thưởng, bằng khen cấp Quốc Gia..."],
        cta: "",
      }),
    ).toBe(false);
  });

  it("detects vitest pollution on about page fields", () => {
    expect(isTestOrEnglishMeta({ title: "vitest-about-1", description: "desc" })).toBe(true);
    expect(isTestOrEnglishPageHero({ title: "About VI", description: "desc" })).toBe(true);
    expect(isTestOrEnglishPartnersTitle("Partners")).toBe(true);
  });
});
