import type { SupabaseClient } from "@supabase/supabase-js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { parseNewsFields } from "@/lib/admin/parsers/news";
import { makeFormData } from "../helpers/form-data";
import { assertTableReadable, createTestAdminClient, hasIntegrationEnv } from "../helpers/supabase";

const REQUIRED_TABLES = [
  "news_articles",
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

});
