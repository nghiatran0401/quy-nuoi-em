import { describe, expect, it } from "vitest";
import { parseFormJson, toUserFacingDbError } from "@/lib/admin/form-utils";
import { buildAboutUpsertPayload } from "@/lib/admin/parsers/about";
import { defaultAboutPageContent } from "@/lib/cms/vietnamese-defaults";
import { resolveAboutPageContent } from "@/lib/data/about-page";
import { buildHomepageUpsertPayload } from "@/lib/admin/parsers/homepage";
import { defaultHomeMedia } from "@/lib/data/home-media";
import { parseNewsFields, slugifyNews } from "@/lib/admin/parsers/news";
import { buildProcess2026UpsertPayload } from "@/lib/admin/parsers/process-2026";
import { getProcess2026PageFallback } from "@/lib/data/process-2026-page";
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
    const message = toUserFacingDbError("Could not find the table 'public.homepage_content' in the schema cache");
    expect(message).toContain("migration");
  });
});

describe("homepage parser", () => {
  it("builds vi/en upsert payload from form fields", () => {
    const base = {
      vi_stats_json: JSON.stringify([{ value: "1", label: "A", hint: "" }]),
      vi_faq_json: JSON.stringify({
        eyebrow: "FAQ",
        title: "Câu hỏi",
        intro: "Intro",
        items: [],
      }),
      vi_cta_paragraphs_json: JSON.stringify(["p1"]),
      vi_members_paragraphs_json: JSON.stringify(["m1"]),
      en_stats_json: JSON.stringify([{ value: "2", label: "B", hint: "" }]),
      en_faq_json: JSON.stringify({
        eyebrow: "FAQ",
        title: "Questions",
        intro: "Intro",
        items: [],
      }),
      en_cta_paragraphs_json: JSON.stringify(["p2"]),
      en_members_paragraphs_json: JSON.stringify(["m2"]),
    };

    const formData = makeFormData({
      ...base,
      vi_hero_eyebrow: "vi eyebrow",
      vi_hero_title: "vi title",
      vi_hero_description: "vi desc",
      vi_hero_sponsor_now: "Donate",
      vi_hero_learn_more: "Learn",
      vi_cta_title: "CTA",
      vi_cta_donate: "D",
      vi_cta_reports: "R",
      vi_members_eyebrow: "M",
      vi_members_title: "Members",
      vi_members_cta: "Join",
      vi_donate_bank: "MB",
      vi_donate_branch: "Branch",
      vi_donate_account_name: "Name",
      vi_donate_account_number: "1805",
      vi_donate_account_highlight: "Highlight",
      vi_donate_public_line: "Public",
      vi_donate_transfer_format: "Format",
      vi_donate_transfer_example: "NE001",
      en_hero_eyebrow: "en eyebrow",
      en_hero_title: "en title",
      en_hero_description: "en desc",
      en_hero_sponsor_now: "Donate EN",
      en_hero_learn_more: "Learn EN",
      en_cta_title: "CTA EN",
      en_cta_donate: "D EN",
      en_cta_reports: "R EN",
      en_members_eyebrow: "M EN",
      en_members_title: "Members EN",
      en_members_cta: "Join EN",
    });

    const payload = buildHomepageUpsertPayload(formData, defaultHomeMedia);
    expect(payload.locale).toBe("vi");
    expect(payload.stats[0].label).toBe("A");
    expect(payload.donate_info.accountNumber).toBe("1805");
  });
});

describe("resolveAboutPageContent", () => {
  it("falls back to Vietnamese defaults when row has test pollution", () => {
    const base = defaultAboutPageContent();
    const resolved = resolveAboutPageContent({
      meta: { title: "vitest-about-1", description: "desc" },
      hero: { title: "About VI" },
      stats: [{ value: "1", label: "A", hint: "" }],
      partners_title: "Partners",
      hero_image: null,
    });

    expect(resolved.meta.title).toBe(base.meta.title);
    expect(resolved.hero.title).toBe(base.hero.title);
    expect(resolved.stats).toEqual(base.stats);
    expect(resolved.partnersTitle).toBe(base.partnersTitle);
  });
});

describe("about parser", () => {
  it("builds about payload with defaults", () => {
    const formData = makeFormData({
      vi_meta_title: "Về chúng tôi",
      vi_meta_description: "Mô tả",
      vi_hero_eyebrow: "Eyebrow",
      vi_hero_title: "Title",
      vi_hero_description: "Desc",
      vi_partners_title: "Đối tác",
      vi_hero_image: "/images/about/test.png",
      vi_stats_json: JSON.stringify([{ value: "10", label: "Trẻ", hint: "" }]),
      en_meta_title: "About",
      en_meta_description: "Desc EN",
      en_hero_title: "Title EN",
      en_partners_title: "Partners",
      en_stats_json: JSON.stringify([{ value: "10", label: "Kids", hint: "" }]),
    });

    const payload = buildAboutUpsertPayload(formData);
    expect(payload.locale).toBe("vi");
    expect(payload.hero_image).toBe("/images/about/test.png");
    expect(payload.meta.title).toBe("Về chúng tôi");
  });
});

describe("process-2026 parser", () => {
  it("builds nested process page content", () => {
    const step = {
      number: "01",
      title: "Nhận mã",
      timing: "2 phút",
      summary: "Tóm tắt",
      bullets: ["a"],
    };

    const formData = makeFormData({
      vi_meta_title: "Quy trình",
      vi_meta_description: "Mô tả",
      vi_hero_eyebrow: "Mùa",
      vi_hero_title: "Quy trình",
      vi_hero_title_accent: " mới",
      vi_hero_description: "Desc",
      vi_hero_messenger_cta: "Messenger",
      vi_hero_group_cta: "Group",
      vi_steps_eyebrow: "6 bước",
      vi_steps_title: "Steps",
      vi_steps_description: "Desc",
      vi_steps_json: JSON.stringify([step]),
      vi_cost_eyebrow: "Cost",
      vi_cost_title: "Chi phí",
      vi_cost_description: "Desc",
      vi_cost_tiers_json: JSON.stringify([{ label: "A", amount: "1", breakdown: "b" }]),
      vi_transfer_eyebrow: "CK",
      vi_transfer_title: "Chuyển khoản",
      vi_transfer_warning: "Warn",
      vi_transfer_account_number: "123",
      vi_transfer_bank: "VCB",
      vi_transfer_account_name: "Name",
      vi_transfer_scenarios_title: "Kịch bản",
      vi_transfer_scenarios_footnote: "Note",
      vi_transfer_qr_caption: "QR",
      vi_transfer_qr_cta: "CTA",
      vi_payment_scenarios_json: JSON.stringify([{ label: "1 lần", tag: null, detail: "x" }]),
      vi_timeline_eyebrow: "Time",
      vi_timeline_title: "Lịch",
      vi_timeline_json: JSON.stringify([{ when: "T1", what: "W1" }]),
      vi_notes_eyebrow: "Note",
      vi_notes_title: "Lưu ý",
      vi_important_notes_json: JSON.stringify(["n1"]),
      vi_code_meaning_label: "Label",
      vi_code_meaning_url: "https://example.com",
      vi_hero_image_url: "/images/hero.jpg",
      vi_qr_image_url: "/qr.png",
      vi_links_messenger: "https://messenger.example",
      vi_links_group: "https://group.example",
      vi_transfer_phone: "0900000000",
      vi_transfer_phone_display: "0900 000 000",
      vi_finance_eyebrow: "Finance",
      vi_finance_title: "Title",
      vi_finance_body_before: "Before ",
      vi_finance_report_link_label: "report.example",
      vi_finance_report_link_url: "https://report.example",
      vi_finance_body_after: " after",
      vi_finance_footnote_before: "Note ",
      vi_finance_school_build_link_label: "School",
      vi_finance_footnote_after: ".",
      vi_school_build_url: "https://school.example",
      vi_cta_title: "Help",
      vi_cta_description: "Desc",
      vi_cta_messenger: "Inbox",
      vi_cta_contact_label: "Contact",
      vi_cta_reference_label: "Ref",
      vi_cta_reference_link_label: "site.example",
      vi_cta_reference_url: "https://nuoiem.com",
      en_meta_title: "Process EN",
      en_meta_description: "EN",
      en_hero_eyebrow: "Season",
      en_hero_title: "Process",
      en_hero_title_accent: " new",
      en_hero_description: "EN desc",
      en_hero_messenger_cta: "Messenger EN",
      en_hero_group_cta: "Group EN",
      en_steps_eyebrow: "6 steps",
      en_steps_title: "Steps EN",
      en_steps_description: "EN",
      en_steps_json: JSON.stringify([step]),
      en_cost_eyebrow: "Cost",
      en_cost_title: "Cost EN",
      en_cost_description: "EN",
      en_cost_tiers_json: JSON.stringify([{ label: "A", amount: "1", breakdown: "b" }]),
      en_transfer_eyebrow: "Transfer",
      en_transfer_title: "Bank",
      en_transfer_warning: "Warn",
      en_transfer_account_number: "123",
      en_transfer_bank: "VCB",
      en_transfer_account_name: "Name",
      en_transfer_scenarios_title: "Scenarios",
      en_transfer_scenarios_footnote: "Note",
      en_transfer_qr_caption: "QR",
      en_transfer_qr_cta: "CTA",
      en_payment_scenarios_json: JSON.stringify([{ label: "Once", tag: null, detail: "x" }]),
      en_timeline_eyebrow: "Timeline",
      en_timeline_title: "Schedule",
      en_timeline_json: JSON.stringify([{ when: "T1", what: "W1" }]),
      en_notes_eyebrow: "Notes",
      en_notes_title: "Important",
      en_important_notes_json: JSON.stringify(["n1"]),
      en_code_meaning_label: "Code",
      en_code_meaning_url: "https://example.com",
      en_hero_image_url: "/images/hero-en.jpg",
      en_qr_image_url: "/qr-en.png",
      en_links_messenger: "https://messenger.example",
      en_links_group: "https://group.example",
      en_transfer_phone: "0900000000",
      en_transfer_phone_display: "0900 000 000",
      en_finance_eyebrow: "Finance",
      en_finance_title: "Title",
      en_finance_body_before: "Before ",
      en_finance_report_link_label: "report.example",
      en_finance_report_link_url: "https://report.example",
      en_finance_body_after: " after",
      en_finance_footnote_before: "Note ",
      en_finance_school_build_link_label: "School",
      en_finance_footnote_after: ".",
      en_school_build_url: "https://school.example",
      en_cta_title: "Help",
      en_cta_description: "Desc",
      en_cta_messenger: "Inbox",
      en_cta_contact_label: "Contact",
      en_cta_reference_label: "Ref",
      en_cta_reference_link_label: "site.example",
      en_cta_reference_url: "https://nuoiem.com",
    });

    const payload = buildProcess2026UpsertPayload(formData);
    expect(payload.locale).toBe("vi");
    expect(payload.meta.title).toBe(getProcess2026PageFallback().meta.title);
    expect(payload.content.steps).toHaveLength(1);
    expect(payload.content.steps[0].title).toBe("Nhận mã");
    expect(payload.content.media.heroImage).toBe("/images/hero.jpg");
    expect(payload.content.finance.reportLinkUrl).toBe("https://report.example");
  });
});
