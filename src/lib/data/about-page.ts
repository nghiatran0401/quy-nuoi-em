import type { PageHero, PageMeta, StatItem } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { getStaticPageHero, getStaticPageMeta, getUiLabel } from "@/content/pages/static-pages";
import { siteStats } from "@/content/shared/site-stats";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createPublicClient } from "@/lib/supabase/public";

export type AboutPageContent = {
  meta: PageMeta;
  hero: PageHero;
  stats: StatItem[];
  partnersTitle: string;
  heroImage: string;
};

type AboutPageRow = {
  locale: Locale;
  meta: PageMeta | null;
  hero: PageHero | null;
  stats: StatItem[] | null;
  partners_title: string | null;
  hero_image: string | null;
};

function fallback(locale: Locale): AboutPageContent {
  return {
    meta: getStaticPageMeta("about", locale),
    hero: getStaticPageHero("about", locale),
    stats: siteStats[locale],
    partnersTitle: getUiLabel(locale, "partners"),
    heroImage: "/images/about/digital-heart-hero.png",
  };
}

export async function getAboutPageContent(locale: Locale): Promise<AboutPageContent> {
  const base = fallback(locale);

  if (!isSupabaseConfigured()) {
    return base;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("about_page_content")
      .select("locale, meta, hero, stats, partners_title, hero_image")
      .eq("locale", locale)
      .maybeSingle();

    if (error || !data) {
      return base;
    }

    const row = data as AboutPageRow;
    return {
      meta: row.meta ?? base.meta,
      hero: row.hero ?? base.hero,
      stats: row.stats ?? base.stats,
      partnersTitle: row.partners_title ?? base.partnersTitle,
      heroImage: row.hero_image ?? base.heroImage,
    };
  } catch {
    return base;
  }
}
