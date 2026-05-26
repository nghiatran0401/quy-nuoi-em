"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { PageHero, PageMeta, StatItem } from "@/content/types";
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
  const meta: PageMeta = {
    title: getText(formData, `${locale}_meta_title`),
    description: getText(formData, `${locale}_meta_description`),
  };

  const hero: PageHero = {
    eyebrow: getText(formData, `${locale}_hero_eyebrow`) || undefined,
    title: getText(formData, `${locale}_hero_title`),
    description: getText(formData, `${locale}_hero_description`) || undefined,
  };

  const stats = parseJson<StatItem[]>(
    getText(formData, `${locale}_stats_json`),
    `${locale.toUpperCase()} thống kê trang about`,
  );

  return {
    locale,
    meta,
    hero,
    stats,
    partners_title: getText(formData, `${locale}_partners_title`),
    hero_image: getText(formData, `${locale}_hero_image`) || "/images/about/digital-heart-hero.png",
  };
}

export async function saveAboutPageContent(formData: FormData) {
  try {
    await requireAdminSession();
    const supabase = createAdminClient();
    const payload = [parseLocalePayload(formData, "vi"), parseLocalePayload(formData, "en")];
    const { error } = await supabase.from("about_page_content").upsert(payload, {
      onConflict: "locale",
    });
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể lưu nội dung trang giới thiệu.";
    redirect(`/admin/about?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/about");
  revalidatePath("/en/about");
  revalidatePath("/admin/about");
  redirect("/admin/about?message=about_saved");
}
