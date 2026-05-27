import type { SupabaseClient } from "@supabase/supabase-js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { buildAboutUpsertPayload } from "@/lib/admin/parsers/about";
import { buildHomepageUpsertPayload } from "@/lib/admin/parsers/homepage";
import { defaultHomeMedia } from "@/lib/data/home-media";
import { parseNewsFields } from "@/lib/admin/parsers/news";
import { buildProcess2026UpsertPayload } from "@/lib/admin/parsers/process-2026";
import { makeFormData } from "../helpers/form-data";
import { assertTableReadable, createTestAdminClient, hasIntegrationEnv } from "../helpers/supabase";

const REQUIRED_TABLES = [
  "news_articles",
  "homepage_content",
  "about_page_content",
  "process_2026_page_content",
  "partner_logos",
  "static_media",
  "financial_reports",
] as const;

describe.skipIf(!hasIntegrationEnv())("Admin CRUD integration (Supabase)", () => {
  let supabase: SupabaseClient;
  const testSlug = `vitest-${Date.now()}`;
  let createdNewsId: string | null = null;

  beforeAll(async () => {
    supabase = createTestAdminClient();
    for (const table of REQUIRED_TABLES) {
      await assertTableReadable(supabase, table);
    }
  });

  afterAll(async () => {
    if (createdNewsId) {
      await supabase.from("news_articles").delete().eq("id", createdNewsId);
    }
  });

  it("creates, reads, updates, archives, and deletes a news article", async () => {
    const createForm = makeFormData({
      title: `Vitest ${testSlug}`,
      slug: testSlug,
      excerpt: "Excerpt",
      content: "Integration test content",
      locale: "vi",
      status: "draft",
      published_at: "",
    });
    const createPayload = parseNewsFields(createForm, null);

    const { data: created, error: createError } = await supabase
      .from("news_articles")
      .insert(createPayload)
      .select("id, slug, status")
      .single();

    expect(createError).toBeNull();
    expect(created?.slug).toBe(testSlug);
    createdNewsId = created?.id ?? null;

    const { data: fetched, error: fetchError } = await supabase
      .from("news_articles")
      .select("id, title, status")
      .eq("id", createdNewsId!)
      .single();

    expect(fetchError).toBeNull();
    expect(fetched?.title).toContain("Vitest");

    const { error: updateError } = await supabase
      .from("news_articles")
      .update({ status: "published", published_at: new Date().toISOString() })
      .eq("id", createdNewsId!);
    expect(updateError).toBeNull();

    const { error: archiveError } = await supabase
      .from("news_articles")
      .update({ status: "archived" })
      .eq("id", createdNewsId!);
    expect(archiveError).toBeNull();

    const { error: deleteError } = await supabase.from("news_articles").delete().eq("id", createdNewsId!);
    expect(deleteError).toBeNull();
    createdNewsId = null;

    const { data: afterDelete } = await supabase
      .from("news_articles")
      .select("id")
      .eq("slug", testSlug)
      .maybeSingle();
    expect(afterDelete).toBeNull();
  });

  it("upserts homepage content for vi", async () => {
    const { data: before } = await supabase
      .from("homepage_content")
      .select("*")
      .eq("locale", "vi")
      .maybeSingle();

    const formData = makeFormData({
      vi_hero_eyebrow: "vi",
      vi_hero_title: "Home VI",
      vi_hero_description: "desc",
      vi_hero_sponsor_now: "Donate",
      vi_hero_learn_more: "Learn",
      vi_cta_title: "CTA",
      vi_cta_paragraphs_json: JSON.stringify(["p"]),
      vi_cta_donate: "D",
      vi_cta_reports: "R",
      vi_members_eyebrow: "M",
      vi_members_title: "Members",
      vi_members_paragraphs_json: JSON.stringify(["m"]),
      vi_members_cta: "Join",
      vi_stats_json: JSON.stringify([{ value: "1", label: "A", hint: "" }]),
      vi_faq_json: JSON.stringify({ eyebrow: "f", title: "t", intro: "i", items: [] }),
      vi_donate_bank: "MB",
      vi_donate_branch: "Ngân hàng TMCP Quân đội",
      vi_donate_account_name: "CTCP DNXH QUY NUOI EM",
      vi_donate_account_number: "1805",
      vi_donate_account_highlight: "STK test",
      vi_donate_public_line: "STK public test",
      vi_donate_transfer_format: "NE + tên",
      vi_donate_transfer_example: "NE00123 Test",
    });

    const payload = buildHomepageUpsertPayload(formData, defaultHomeMedia);
    const marker = `vitest-home-${Date.now()}`;
    payload.hero.title = marker;

    try {
      const { error } = await supabase.from("homepage_content").upsert([payload], { onConflict: "locale" });
      expect(error).toBeNull();

      const { data, error: readError } = await supabase
        .from("homepage_content")
        .select("hero")
        .eq("locale", "vi")
        .single();

      expect(readError).toBeNull();
      expect((data?.hero as { title?: string } | null)?.title).toBe(marker);
    } finally {
      if (before) {
        await supabase.from("homepage_content").upsert(before, { onConflict: "locale" });
      } else {
        await supabase.from("homepage_content").delete().eq("locale", "vi");
      }
    }
  });

  it("upserts about page content for vi", async () => {
    const { data: before } = await supabase
      .from("about_page_content")
      .select("*")
      .eq("locale", "vi")
      .maybeSingle();

    const marker = `vitest-about-${Date.now()}`;
    const formData = makeFormData({
      vi_meta_title: marker,
      vi_meta_description: "desc",
      vi_hero_title: "About VI",
      vi_partners_title: "Partners",
      vi_stats_json: JSON.stringify([{ value: "1", label: "A", hint: "" }]),
    });

    const payload = buildAboutUpsertPayload(formData);

    try {
      const { error } = await supabase.from("about_page_content").upsert([payload], { onConflict: "locale" });
      expect(error).toBeNull();

      const { data, error: readError } = await supabase
        .from("about_page_content")
        .select("meta")
        .eq("locale", "vi")
        .single();

      expect(readError).toBeNull();
      expect((data?.meta as { title?: string } | null)?.title).toBe(marker);
    } finally {
      if (before) {
        await supabase.from("about_page_content").upsert(before, { onConflict: "locale" });
      } else {
        await supabase.from("about_page_content").delete().eq("locale", "vi");
      }
    }
  });

  it("creates and deletes a partner logo row", async () => {
    const marker = `vitest-partner-${Date.now()}`;
    let createdId: string | null = null;

    try {
      const { data: inserted, error } = await supabase
        .from("partner_logos")
        .insert({
          name: marker,
          image_url: "/images/nuoiem/vtv3_logo-1554880679.png",
          sort_order: 9999,
          is_active: true,
        })
        .select("id")
        .single();

      expect(error).toBeNull();
      createdId = inserted?.id ?? null;
      expect(createdId).toBeTruthy();

      const { data: readBack, error: readError } = await supabase
        .from("partner_logos")
        .select("name")
        .eq("id", createdId!)
        .single();

      expect(readError).toBeNull();
      expect(readBack?.name).toBe(marker);
    } finally {
      if (createdId) {
        await supabase.from("partner_logos").delete().eq("id", createdId);
      }
    }
  });

  it("upserts process 2026 page content for vi/en", async () => {
    const marker = `vitest-process-hero-${Date.now()}`;
    const step = {
      number: "01",
      title: "Step",
      timing: "Now",
      summary: "Summary",
      bullets: ["one"],
    };

    const formData = makeFormData({
      vi_meta_title: marker,
      vi_meta_description: "desc",
      vi_hero_eyebrow: "e",
      vi_hero_title: marker,
      vi_hero_title_accent: " a",
      vi_hero_description: "d",
      vi_hero_messenger_cta: "m",
      vi_hero_group_cta: "g",
      vi_steps_eyebrow: "s",
      vi_steps_title: "st",
      vi_steps_description: "sd",
      vi_steps_json: JSON.stringify([step]),
      vi_cost_eyebrow: "c",
      vi_cost_title: "ct",
      vi_cost_description: "cd",
      vi_cost_tiers_json: JSON.stringify([{ label: "l", amount: "1", breakdown: "b" }]),
      vi_transfer_eyebrow: "tr",
      vi_transfer_title: "tt",
      vi_transfer_warning: "w",
      vi_transfer_account_number: "1",
      vi_transfer_bank: "b",
      vi_transfer_account_name: "n",
      vi_transfer_scenarios_title: "st",
      vi_transfer_scenarios_footnote: "sf",
      vi_transfer_qr_caption: "q",
      vi_transfer_qr_cta: "c",
      vi_payment_scenarios_json: JSON.stringify([{ label: "1", tag: null, detail: "d" }]),
      vi_timeline_eyebrow: "t",
      vi_timeline_title: "tl",
      vi_timeline_json: JSON.stringify([{ when: "w", what: "x" }]),
      vi_notes_eyebrow: "n",
      vi_notes_title: "nt",
      vi_important_notes_json: JSON.stringify(["note"]),
      vi_code_meaning_label: "l",
      vi_code_meaning_url: "https://example.com",
      vi_hero_image_url: "/images/hero.jpg",
      vi_qr_image_url: "/qr.png",
      vi_links_messenger: "https://messenger.example",
      vi_links_group: "https://group.example",
      vi_transfer_phone: "0900000000",
      vi_transfer_phone_display: "0900 000 000",
      vi_finance_eyebrow: "f",
      vi_finance_title: "ft",
      vi_finance_body_before: "before ",
      vi_finance_report_link_label: "report.example",
      vi_finance_report_link_url: "https://report.example",
      vi_finance_body_after: " after",
      vi_finance_footnote_before: "note ",
      vi_finance_school_build_link_label: "School",
      vi_finance_footnote_after: ".",
      vi_school_build_url: "https://school.example",
      vi_cta_title: "cta",
      vi_cta_description: "cd",
      vi_cta_messenger: "m",
      vi_cta_contact_label: "c",
      vi_cta_reference_label: "r",
      vi_cta_reference_link_label: "site.example",
      vi_cta_reference_url: "https://nuoiem.com",
      en_meta_title: "EN",
      en_meta_description: "d",
      en_hero_eyebrow: "e",
      en_hero_title: "t",
      en_hero_title_accent: " a",
      en_hero_description: "d",
      en_hero_messenger_cta: "m",
      en_hero_group_cta: "g",
      en_steps_eyebrow: "s",
      en_steps_title: "st",
      en_steps_description: "sd",
      en_steps_json: JSON.stringify([step]),
      en_cost_eyebrow: "c",
      en_cost_title: "ct",
      en_cost_description: "cd",
      en_cost_tiers_json: JSON.stringify([{ label: "l", amount: "1", breakdown: "b" }]),
      en_transfer_eyebrow: "tr",
      en_transfer_title: "tt",
      en_transfer_warning: "w",
      en_transfer_account_number: "1",
      en_transfer_bank: "b",
      en_transfer_account_name: "n",
      en_transfer_scenarios_title: "st",
      en_transfer_scenarios_footnote: "sf",
      en_transfer_qr_caption: "q",
      en_transfer_qr_cta: "c",
      en_payment_scenarios_json: JSON.stringify([{ label: "1", tag: null, detail: "d" }]),
      en_timeline_eyebrow: "t",
      en_timeline_title: "tl",
      en_timeline_json: JSON.stringify([{ when: "w", what: "x" }]),
      en_notes_eyebrow: "n",
      en_notes_title: "nt",
      en_important_notes_json: JSON.stringify(["note"]),
      en_code_meaning_label: "l",
      en_code_meaning_url: "https://example.com",
      en_hero_image_url: "/images/hero-en.jpg",
      en_qr_image_url: "/qr-en.png",
      en_links_messenger: "https://messenger.example",
      en_links_group: "https://group.example",
      en_transfer_phone: "0900000000",
      en_transfer_phone_display: "0900 000 000",
      en_finance_eyebrow: "f",
      en_finance_title: "ft",
      en_finance_body_before: "before ",
      en_finance_report_link_label: "report.example",
      en_finance_report_link_url: "https://report.example",
      en_finance_body_after: " after",
      en_finance_footnote_before: "note ",
      en_finance_school_build_link_label: "School",
      en_finance_footnote_after: ".",
      en_school_build_url: "https://school.example",
      en_cta_title: "cta",
      en_cta_description: "cd",
      en_cta_messenger: "m",
      en_cta_contact_label: "c",
      en_cta_reference_label: "r",
      en_cta_reference_link_label: "site.example",
      en_cta_reference_url: "https://nuoiem.com",
    });

    const payload = buildProcess2026UpsertPayload(formData);
    const { error } = await supabase.from("process_2026_page_content").upsert([payload], { onConflict: "locale" });
    expect(error).toBeNull();

    const { data, error: readError } = await supabase
      .from("process_2026_page_content")
      .select("content")
      .eq("locale", "vi")
      .single();

    expect(readError).toBeNull();
    expect((data?.content as { hero?: { title?: string } } | null)?.hero?.title).toBe(marker);
  });
});
