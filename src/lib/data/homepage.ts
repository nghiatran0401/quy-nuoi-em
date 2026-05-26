import enMessages from "@/i18n/messages/en.json";
import viMessages from "@/i18n/messages/vi.json";
import { ctaSectionCopy, faqSectionCopy, membersSectionCopy } from "@/content/home-sections";
import { homeStats } from "@/content/shared/site-stats";
import type { StatItem } from "@/content/types";
import type { Locale } from "@/i18n/config";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createPublicClient } from "@/lib/supabase/public";

export type HomeHeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  sponsorNow: string;
  learnMore: string;
};

export type HomeCtaContent = {
  title: string;
  paragraphs: string[];
  donate: string;
  reports: string;
};

export type HomeMembersContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  cta: string;
};

export type HomeFaqItem = {
  id: string;
  question: string;
  type: "address" | "bank" | "process";
  body?: string;
  address?: string;
  steps?: string[];
};

export type HomeFaqContent = {
  eyebrow: string;
  title: string;
  intro: string;
  items: HomeFaqItem[];
};

export type HomePageContent = {
  hero: HomeHeroContent;
  stats: StatItem[];
  cta: HomeCtaContent;
  members: HomeMembersContent;
  faq: HomeFaqContent;
};

type HomePageContentRow = {
  locale: Locale;
  hero: HomeHeroContent | null;
  stats: StatItem[] | null;
  cta: HomeCtaContent | null;
  members: HomeMembersContent | null;
  faq: HomeFaqContent | null;
};

const fallbackHeroByLocale: Record<Locale, HomeHeroContent> = {
  vi: viMessages.home,
  en: enMessages.home,
};

function getFallbackContent(locale: Locale): HomePageContent {
  return {
    hero: fallbackHeroByLocale[locale],
    stats: homeStats[locale],
    cta: ctaSectionCopy[locale],
    members: membersSectionCopy[locale],
    faq: faqSectionCopy[locale],
  };
}

export async function getHomePageContent(locale: Locale): Promise<HomePageContent> {
  const fallback = getFallbackContent(locale);

  if (!isSupabaseConfigured()) {
    return fallback;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("homepage_content")
      .select("locale, hero, stats, cta, members, faq")
      .eq("locale", locale)
      .maybeSingle();

    if (error || !data) {
      return fallback;
    }

    const row = data as HomePageContentRow;
    return {
      hero: row.hero ?? fallback.hero,
      stats: row.stats ?? fallback.stats,
      cta: row.cta ?? fallback.cta,
      members: row.members ?? fallback.members,
      faq: row.faq ?? fallback.faq,
    };
  } catch {
    return fallback;
  }
}
