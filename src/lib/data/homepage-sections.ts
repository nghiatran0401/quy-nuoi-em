import { homeProcessOverview } from "@/content/home-process-overview";
import { homepageContent } from "@/content/homepage-content";
import { impactJourneySectionCopy } from "@/content/home-impact-journey";
import {
  mealProgramSectionCopy,
  newsSectionCopy,
  partnersHomeTitle,
  sponsoredChildrenSectionCopy,
} from "@/content/homepage-content";

export type HomeSectionsContent = {
  meal: typeof mealProgramSectionCopy;
  impact: typeof impactJourneySectionCopy;
  process: typeof homeProcessOverview;
  sponsored: typeof sponsoredChildrenSectionCopy;
  news: typeof newsSectionCopy;
  partnersTitle: string;
};

export const defaultHomeSectionsContent: HomeSectionsContent = {
  meal: mealProgramSectionCopy,
  impact: impactJourneySectionCopy,
  process: homeProcessOverview,
  sponsored: sponsoredChildrenSectionCopy,
  news: newsSectionCopy,
  partnersTitle: partnersHomeTitle,
};

export function resolveHomeSectionsContent(
  raw: Partial<HomeSectionsContent> | null | undefined,
): HomeSectionsContent {
  if (!raw) {
    return defaultHomeSectionsContent;
  }

  return {
    meal: raw.meal ?? defaultHomeSectionsContent.meal,
    impact: raw.impact ?? defaultHomeSectionsContent.impact,
    process: raw.process ?? defaultHomeSectionsContent.process,
    sponsored: raw.sponsored ?? defaultHomeSectionsContent.sponsored,
    news: raw.news ?? defaultHomeSectionsContent.news,
    partnersTitle: raw.partnersTitle?.trim() || defaultHomeSectionsContent.partnersTitle,
  };
}

export async function getHomeSectionsContent(): Promise<HomeSectionsContent> {
  return homepageContent.sections as HomeSectionsContent;
}
