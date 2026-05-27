import { homeProcessOverview } from "@/content/home-process-overview";
import { impactJourneySectionCopy } from "@/content/home-impact-journey";
import { mealProgramSectionCopy } from "@/content/home-meal";
import {
  partnersHomeTitle,
  sponsoredChildrenSectionCopy,
  newsSectionCopy,
} from "@/content/home-sections";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createPublicClient } from "@/lib/supabase/public";

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
  if (!isSupabaseConfigured()) {
    return defaultHomeSectionsContent;
  }

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("homepage_content")
      .select("sections")
      .eq("locale", "vi")
      .maybeSingle();

    if (error || !data) {
      return defaultHomeSectionsContent;
    }

    return resolveHomeSectionsContent(
      (data.sections as Partial<HomeSectionsContent> | null | undefined) ?? null,
    );
  } catch {
    return defaultHomeSectionsContent;
  }
}
