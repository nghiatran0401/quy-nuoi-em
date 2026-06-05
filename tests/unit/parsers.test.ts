import { describe, expect, it } from "vitest";
import { parseFormJson, toUserFacingDbError } from "@/lib/admin/form-utils";
import { parseNewsFields, slugifyNews } from "@/lib/admin/parsers/news";
import { makeFormData } from "../helpers/form-data";

describe("slugifyNews", () => {
  it("normalizes Vietnamese title to slug", () => {
    expect(slugifyNews("Tin tức Nuôi Em 2026")).toBe("tin-tuc-nuoi-em-2026");
  });
});

describe("parseNewsFields", () => {
  it("parses required news fields", () => {
    const formData = makeFormData({
      title: "Bài test",
      slug: "",
      excerpt: "Tóm tắt",
      content: "Nội dung đầy đủ",
      locale: "vi",
      status: "draft",
      published_at: "",
    });

    const payload = parseNewsFields(formData, null);
    expect(payload.slug).toBe("bai-test");
    expect(payload.status).toBe("draft");
    expect(payload.published_at).toBeNull();
  });

  it("sets published_at when status is published", () => {
    const formData = makeFormData({
      title: "Bài test",
      slug: "bai-test",
      excerpt: "",
      content: "Nội dung",
      locale: "vi",
      status: "published",
      published_at: "2026-05-27T10:00:00.000Z",
    });

    const payload = parseNewsFields(formData, "https://example.com/a.jpg");
    expect(payload.status).toBe("published");
    expect(payload.published_at).toBe("2026-05-27T10:00:00.000Z");
    expect(payload.image_url).toBe("https://example.com/a.jpg");
  });
});

describe("parseFormJson", () => {
  it("throws when JSON field is missing", () => {
    expect(() => parseFormJson("[]", "TEST")).not.toThrow();
    expect(() => parseFormJson("", "TEST")).toThrow(/thiếu dữ liệu/i);
  });
});

describe("toUserFacingDbError", () => {
  it("maps missing table errors to migration hint", () => {
    const message = toUserFacingDbError("Could not find the table 'public.news_articles' in the schema cache");
    expect(message).toContain("migration");
  });
});
