import { PageHero } from "@/components/pages/page-hero";
import { ScoringGrid } from "@/components/pages/scoring-grid";
import { getStaticPageHero, getUiLabel, scoringCategories } from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";

export function ScoringView({ locale }: { locale: Locale }) {
  return (
    <article className="pb-16">
      <PageHero {...getStaticPageHero("scoring", locale)} />
      <ScoringGrid
        categories={scoringCategories[locale]}
        totalLabel={getUiLabel(locale, "scoringTotal")}
        maxLabel={getUiLabel(locale, "scoringMax")}
        referenceLabel={getUiLabel(locale, "referenceTable")}
        processLinkLabel={getUiLabel(locale, "viewProcess")}
      />
    </article>
  );
}
