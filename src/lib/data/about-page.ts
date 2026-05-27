import type { PageHero, PageMeta, StatItem } from "@/content/types";
import { defaultAboutPageContent } from "@/lib/cms/vietnamese-defaults";
import {
  isTestOrEnglishMeta,
  isTestOrEnglishPageHero,
  isTestOrEnglishPartnersTitle,
  isTestOrEnglishStats,
} from "@/lib/cms/sanitize-cms";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createPublicClient } from "@/lib/supabase/public";

export type AboutPageContent = {
  meta: PageMeta;
  hero: PageHero;
  stats: StatItem[];
  partnersTitle: string;
  heroImage: string;
};

export type AboutPageContentRow = {
  locale?: string;
  meta: PageMeta | null;
  hero: PageHero | null;
  stats: StatItem[] | null;
  partners_title: string | null;
  hero_image: string | null;
};

/** Same merge/sanitize rules as the public /about page (admin editor uses this). */
export function resolveAboutPageContent(row: AboutPageContentRow | null | undefined): AboutPageContent {
  const base = defaultAboutPageContent();
  if (!row) {
    return base;
  }

  const meta = isTestOrEnglishMeta(row.meta) ? base.meta : { ...base.meta, ...row.meta };
  const hero = isTestOrEnglishPageHero(row.hero) ? base.hero : { ...base.hero, ...row.hero };
  const stats = isTestOrEnglishStats(row.stats) ? base.stats : (row.stats ?? base.stats);
  const partnersTitle = isTestOrEnglishPartnersTitle(row.partners_title)
    ? base.partnersTitle
    : (row.partners_title ?? base.partnersTitle);
  const heroImage = row.hero_image?.trim() ? row.hero_image : base.heroImage;

  return { meta, hero, stats, partnersTitle, heroImage };
}

export async function getAboutPageContent(): Promise<AboutPageContent> {
  if (!isSupabaseConfigured()) {
    return defaultAboutPageContent();
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("about_page_content")
      .select("meta, hero, stats, partners_title, hero_image")
      .eq("locale", "vi")
      .maybeSingle();

    if (error || !data) {
      return defaultAboutPageContent();
    }

    return resolveAboutPageContent(data as AboutPageContentRow);
  } catch {
    return defaultAboutPageContent();
  }
}

/** Upsert payload for restoring Vietnamese /about content in Supabase (admin/scripts). */
export function getDefaultAboutUpsertPayload() {
  const content = defaultAboutPageContent();
  return {
    locale: "vi" as const,
    meta: content.meta,
    hero: content.hero,
    stats: content.stats,
    partners_title: content.partnersTitle,
    hero_image: content.heroImage,
  };
}
