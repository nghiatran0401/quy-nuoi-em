import { ctaSectionCopy, faqSectionCopy, membersSectionCopy } from "@/content/home-sections";
import { getStaticPageHero, getStaticPageMeta, getUiLabel } from "@/content/pages/static-pages";
import { siteCopy } from "@/content/site-copy";
import { unavailableHomeStats } from "@/lib/data/home-metrics";
import type { HomePageContent } from "@/lib/data/homepage";
import type { AboutPageContent } from "@/lib/data/about-page";

/** Canonical Vietnamese homepage content (matches admin editor defaults). */
export const defaultHomePageContent: HomePageContent = {
  hero: siteCopy.home,
  stats: unavailableHomeStats,
  cta: ctaSectionCopy,
  members: membersSectionCopy,
  faq: faqSectionCopy,
};

export function defaultAboutPageContent(): AboutPageContent {
  return {
    meta: getStaticPageMeta("about"),
    hero: getStaticPageHero("about"),
    stats: unavailableHomeStats,
    partnersTitle: getUiLabel("partners"),
    heroImage: "/images/about/digital-heart-hero.png",
  };
}
