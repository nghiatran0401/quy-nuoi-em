import { ctaSectionCopy, faqSectionCopy, membersSectionCopy } from "@/content/home-sections";
import { getStaticPageHero, getStaticPageMeta, getUiLabel } from "@/content/pages/static-pages";
import { siteCopy } from "@/content/site-copy";
import { homeStats, siteStats } from "@/content/shared/site-stats";
import type { HomePageContent } from "@/lib/data/homepage";
import type { AboutPageContent } from "@/lib/data/about-page";

/** Canonical Vietnamese homepage content (matches admin editor defaults). */
export const defaultHomePageContent: HomePageContent = {
  hero: siteCopy.home,
  stats: homeStats,
  cta: ctaSectionCopy,
  members: membersSectionCopy,
  faq: faqSectionCopy,
};

export function defaultAboutPageContent(): AboutPageContent {
  return {
    meta: getStaticPageMeta("about"),
    hero: getStaticPageHero("about"),
    stats: siteStats,
    partnersTitle: getUiLabel("partners"),
    heroImage: "/images/about/digital-heart-hero.png",
  };
}
