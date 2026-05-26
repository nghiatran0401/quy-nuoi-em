"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { StatItem } from "@/content/types";
import type { HomeFaqContent, HomeHeroContent, HomeCtaContent, HomeMembersContent } from "@/lib/data/homepage";
import { requireAdminSession } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";

function getText(formData: FormData, key: string): string {
  const raw = formData.get(key);
  return typeof raw === "string" ? raw.trim() : "";
}

function parseJson<T>(value: string, label: string): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    throw new Error(`${label} phải là JSON hợp lệ.`);
  }
}

function parseLocalePayload(formData: FormData, locale: "vi" | "en") {
  const hero: HomeHeroContent = {
    eyebrow: getText(formData, `${locale}_hero_eyebrow`),
    title: getText(formData, `${locale}_hero_title`),
    description: getText(formData, `${locale}_hero_description`),
    sponsorNow: getText(formData, `${locale}_hero_sponsor_now`),
    learnMore: getText(formData, `${locale}_hero_learn_more`),
  };

  const cta: HomeCtaContent = {
    title: getText(formData, `${locale}_cta_title`),
    paragraphs: parseJson<string[]>(
      getText(formData, `${locale}_cta_paragraphs_json`),
      `${locale.toUpperCase()} đoạn văn CTA`,
    ),
    donate: getText(formData, `${locale}_cta_donate`),
    reports: getText(formData, `${locale}_cta_reports`),
  };

  const members: HomeMembersContent = {
    eyebrow: getText(formData, `${locale}_members_eyebrow`),
    title: getText(formData, `${locale}_members_title`),
    paragraphs: parseJson<string[]>(
      getText(formData, `${locale}_members_paragraphs_json`),
      `${locale.toUpperCase()} đoạn văn mục thành viên`,
    ),
    cta: getText(formData, `${locale}_members_cta`),
  };

  const stats = parseJson<StatItem[]>(getText(formData, `${locale}_stats_json`), `${locale.toUpperCase()} thống kê`);
  const faq = parseJson<HomeFaqContent>(getText(formData, `${locale}_faq_json`), `${locale.toUpperCase()} FAQ`);

  return { locale, hero, cta, members, stats, faq };
}

export async function saveHomepageContent(formData: FormData) {
  try {
    await requireAdminSession();
    const supabase = createAdminClient();

    const payload = [parseLocalePayload(formData, "vi"), parseLocalePayload(formData, "en")];

    const { error } = await supabase.from("homepage_content").upsert(payload, {
      onConflict: "locale",
    });
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể lưu nội dung trang chủ.";
    redirect(`/admin/homepage?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/");
  revalidatePath("/en");
  revalidatePath("/admin/homepage");
  redirect("/admin/homepage?message=homepage_saved");
}
