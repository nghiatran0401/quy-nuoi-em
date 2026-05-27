import { describe, expect, it } from "vitest";
import { isTestOrEnglishProcess2026Row } from "@/lib/cms/sanitize-cms";
import {
  getProcess2026PageFallback,
  mergeProcess2026PageContent,
  resolveProcess2026PageContentForAdmin,
} from "@/lib/data/process-2026-page";

describe("mergeProcess2026PageContent", () => {
  it("migrates legacy finance body and footnote into structured fields", () => {
    const fallback = getProcess2026PageFallback();
    const merged = mergeProcess2026PageContent(fallback, null, {
      finance: {
        eyebrow: "Minh bạch",
        title: "Xác nhận",
        body: "Báo cáo công khai tại taichinh.nuoiem.com. Team tài chính xác nhận.",
        footnote: "Có thể chuyển sang dự án xây trường Sức mạnh 2000.",
      },
    });

    expect(merged.finance.bodyBefore).toBe("Báo cáo công khai tại ");
    expect(merged.finance.reportLinkLabel).toBe("taichinh.nuoiem.com");
    expect(merged.finance.bodyAfter).toBe(". Team tài chính xác nhận.");
    expect(merged.finance.footnoteBefore).toBe("Có thể chuyển sang dự án xây trường ");
    expect(merged.finance.schoolBuildLinkLabel).toBe("Sức mạnh 2000");
    expect(merged.finance.footnoteAfter).toBe(".");
  });

  it("merges media and links from partial CMS rows", () => {
    const fallback = getProcess2026PageFallback();
    const merged = mergeProcess2026PageContent(fallback, null, {
      media: { heroImage: "/custom-hero.png", qrImage: "/custom-qr.png" },
      links: { messenger: "https://m.example", group: "https://g.example" },
    });

    expect(merged.media.heroImage).toBe("/custom-hero.png");
    expect(merged.media.qrImage).toBe("/custom-qr.png");
    expect(merged.links.messenger).toBe("https://m.example");
  });

  it("always uses code-defined SEO meta when merging CMS rows", () => {
    const fallback = getProcess2026PageFallback();
    const merged = mergeProcess2026PageContent(fallback, { title: "Custom SEO", description: "Custom desc" }, {
      meta: { title: "Also custom", description: "Also custom" },
      hero: { title: "Real hero title" },
    });

    expect(merged.meta.title).toBe(fallback.meta.title);
    expect(merged.hero.title).toBe("Real hero title");
  });

  it("sanitizes vitest placeholder notes and finance sections", () => {
    const fallback = getProcess2026PageFallback();
    const merged = mergeProcess2026PageContent(fallback, null, {
      notesIntro: { eyebrow: "n", title: "nt" },
      importantNotes: ["note"],
      codeMeaningUrl: "https://example.com",
      finance: { eyebrow: "f", title: "ft", body: "fb", footnote: "ff" },
    });

    expect(merged.notesIntro.title).toBe(fallback.notesIntro.title);
    expect(merged.finance.title).toBe(fallback.finance.title);
  });

  it("clears legacy nuoiem.com CTA reference from CMS rows", () => {
    const fallback = getProcess2026PageFallback();
    const merged = mergeProcess2026PageContent(fallback, null, {
      cta: {
        title: "Cần hỗ trợ?",
        description: "desc",
        messengerCta: "Inbox",
        contactLinkLabel: "Liên hệ",
        referenceLabel: "Tham khảo thêm tại",
        referenceLinkLabel: "nuoiem.com",
        referenceUrl: "https://www.nuoiem.com/",
      },
    });

    expect(merged.cta.referenceUrl).toBe("");
    expect(merged.cta.referenceLabel).toBe("");
  });

  it("ignores vitest placeholder rows in the admin resolver", () => {
    const fallback = getProcess2026PageFallback();
    const testRow = {
      meta: { title: "vitest-process-123", description: "desc" },
      content: {
        meta: { title: "vitest-process-123", description: "desc" },
        hero: { eyebrow: "e", title: "t", description: "d" },
      },
    };

    expect(isTestOrEnglishProcess2026Row(testRow)).toBe(true);
    const resolved = resolveProcess2026PageContentForAdmin(testRow);
    expect(resolved.meta.title).toBe(fallback.meta.title);
    expect(resolved.hero.title).toBe(fallback.hero.title);
  });
});
