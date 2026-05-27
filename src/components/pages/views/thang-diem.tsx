import { StaticPageShell } from "@/components/pages/static-page-shell";
import { ScoringGrid } from "@/components/pages/scoring-grid";
import { getStaticPageHero, getUiLabel, scoringCategories } from "@/content/pages/static-pages";

type ScoringViewProps = {
  referenceImageUrl: string;
};

export function ScoringView({ referenceImageUrl }: ScoringViewProps) {
  return (
    <StaticPageShell {...getStaticPageHero("scoring")}>
      <ScoringGrid
        categories={scoringCategories}
        totalLabel={getUiLabel("scoringTotal")}
        maxLabel={getUiLabel("scoringMax")}
        referenceLabel={getUiLabel("referenceTable")}
        processLinkLabel={getUiLabel("viewProcess")}
        referenceImageUrl={referenceImageUrl}
      />
    </StaticPageShell>
  );
}
