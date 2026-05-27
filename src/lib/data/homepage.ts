import { campaignSectionCopy } from "@/content/home-campaign";
import { ctaSectionCopy } from "@/content/home-sections";
import { defaultHomePageContent } from "@/lib/cms/vietnamese-defaults";
import {
  normalizeFaqItemId,
  normalizeFaqItemType,
  type HomeFaqItemType,
} from "@/lib/faq-item-types";
import {
  isTestOrEnglishCta,
  isTestOrEnglishFaq,
  isTestOrEnglishHero,
  isLegacyMembersSectionContent,
  isTestOrEnglishMembers,
  isTestOrEnglishStats,
} from "@/lib/cms/sanitize-cms";
import type { StatItem } from "@/content/types";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createPublicClient } from "@/lib/supabase/public";
import { defaultHomeSectionsContent } from "@/lib/data/homepage-sections";

export type HomeHeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  sponsorNow: string;
  learnMore: string;
};

import type {
  HomeCampaignBlock,
  HomeCampaignSectionContent,
  HomeCampaignStory,
} from "@/content/home-campaign";

/** CMS-editable slice of the campaign section (stored in `homepage_content.cta`). */
export type HomeCtaContent = {
  title: string;
  paragraphs: string[];
  donate: string;
  reports: string;
  campaign?: HomeCampaignBlock;
  story?: HomeCampaignStory;
};

/** Full campaign section after merging CMS + defaults. */
export type ResolvedHomeCampaignContent = HomeCampaignSectionContent;

/** Merge CMS overrides with canonical nuoiem.com campaign layout. */
export function resolveHomeCampaignContent(
  content: HomeCtaContent | undefined,
  fallback: HomeCtaContent = ctaSectionCopy,
): ResolvedHomeCampaignContent {
  const merged = { ...fallback, ...content };
  const paragraphs =
    merged.paragraphs?.filter((p) => p.trim().length > 0) ??
    [...campaignSectionCopy.story.paragraphs];

  return {
    ...campaignSectionCopy,
    campaign: {
      headline:
        merged.campaign?.headline?.trim() ||
        merged.title?.trim() ||
        fallback.campaign?.headline ||
        campaignSectionCopy.campaign.headline,
      phase:
        merged.campaign?.phase?.trim() || campaignSectionCopy.campaign.phase,
      goal: merged.campaign?.goal?.trim() || campaignSectionCopy.campaign.goal,
    },
    story: {
      paragraphs: merged.story?.paragraphs?.length ? merged.story.paragraphs : paragraphs,
      ctaLabel:
        merged.story?.ctaLabel?.trim() ||
        merged.donate?.trim() ||
        campaignSectionCopy.story.ctaLabel,
      ctaHref: merged.story?.ctaHref?.trim() || campaignSectionCopy.story.ctaHref,
    },
  };
}

export type HomeMembersContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  cta: string;
};

export type HomeFaqItem = {
  /** Mã nội bộ (không hiển thị ra trang công khai). */
  id: string;
  question: string;
  type: HomeFaqItemType;
  body?: string;
  address?: string;
  steps?: string[];
};

export function normalizeHomeFaqItem(item: HomeFaqItem): HomeFaqItem {
  const type = normalizeFaqItemType(item.type);
  return {
    ...item,
    id: normalizeFaqItemId(item.id, type),
    type,
  };
}

export function normalizeHomeFaqContent(faq: HomeFaqContent): HomeFaqContent {
  return {
    ...faq,
    items: faq.items.map(normalizeHomeFaqItem),
  };
}

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
  locale: string;
  hero: HomeHeroContent | null;
  stats: StatItem[] | null;
  cta: HomeCtaContent | null;
  members: HomeMembersContent | null;
  faq: HomeFaqContent | null;
};

/** Same merge/sanitize rules as the public homepage (admin editor uses this). */
export function resolveHomePageContent(row: HomePageContentRow | null | undefined): HomePageContent {
  if (!row) {
    return defaultHomePageContent;
  }
  return mergeHomePageContent(row);
}

function mergeHomePageContent(row: HomePageContentRow): HomePageContent {
  const fallback = defaultHomePageContent;
  return {
    hero: isTestOrEnglishHero(row.hero) ? fallback.hero : row.hero!,
    stats: isTestOrEnglishStats(row.stats) ? fallback.stats : row.stats!,
    cta: isTestOrEnglishCta(row.cta) ? fallback.cta : row.cta!,
    members:
      isTestOrEnglishMembers(row.members) || isLegacyMembersSectionContent(row.members)
        ? fallback.members
        : row.members!,
    faq: isTestOrEnglishFaq(row.faq) ? fallback.faq : normalizeHomeFaqContent(row.faq!),
  };
}

export async function getHomePageContent(): Promise<HomePageContent> {
  if (!isSupabaseConfigured()) {
    return defaultHomePageContent;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("homepage_content")
      .select("locale, hero, stats, cta, members, faq")
      .eq("locale", "vi")
      .maybeSingle();

    if (error || !data) {
      return defaultHomePageContent;
    }

    return resolveHomePageContent(data as HomePageContentRow);
  } catch {
    return defaultHomePageContent;
  }
}

/** Upsert payload for restoring Vietnamese homepage in Supabase (admin/scripts). */
export function getDefaultHomepageUpsertPayload() {
  const content = defaultHomePageContent;
  return {
    locale: "vi" as const,
    hero: content.hero,
    stats: content.stats,
    cta: content.cta,
    members: content.members,
    faq: content.faq,
    sections: defaultHomeSectionsContent,
  };
}
