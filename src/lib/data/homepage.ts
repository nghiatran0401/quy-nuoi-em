import {
  campaignSectionCopy,
  ctaSectionCopy,
  homepageContent,
  type HomeCampaignBlock,
  type HomeCampaignSectionContent,
  type HomeCampaignStory,
} from "@/content/homepage-content";
import {
  normalizeFaqItemId,
  normalizeFaqItemType,
  type HomeFaqItemType,
} from "@/lib/faq-item-types";
import type { StatItem } from "@/content/types";

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
  campaign?: HomeCampaignBlock;
  story?: HomeCampaignStory;
};

export type ResolvedHomeCampaignContent = HomeCampaignSectionContent;

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

export async function getHomePageContent(): Promise<HomePageContent> {
  return homepageContent.page as HomePageContent;
}
