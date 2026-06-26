import { FinanceChannelCards } from "@/components/finance/finance-channel-cards";
import { FinanceOpening } from "@/components/finance/finance-opening";
import { FinancePeriodReport } from "@/components/finance/finance-period-report";
import { FinancePageToc } from "@/components/finance/finance-section-nav";
import { TransparencyPillars } from "@/components/finance/transparency-pillars";
import { DataPageBanner } from "@/components/pages/data-page-banner";
import { taiChinhContent } from "@/content/tai-chinh-content";
import { getStaticPageHero } from "@/content/pages/static-pages";
import type { ReactNode } from "react";

function FinanceSectionRule() {
  return <div className="h-px bg-brand-border/60" aria-hidden />;
}

type TaiChinhViewProps = {
  statementSection: ReactNode;
  expenseDocumentsSection: ReactNode;
};

export function TaiChinhView({ statementSection, expenseDocumentsSection }: TaiChinhViewProps) {
  const hero = getStaticPageHero("taiChinh");
  const content = taiChinhContent;

  return (
    <article className="min-h-screen bg-brand-warm pb-8 sm:pb-10">
      <DataPageBanner {...hero} />
      <div className="page-container pt-8 sm:pt-10 lg:pt-12">
        <div className="mx-auto max-w-7xl space-y-10 md:space-y-14">
          <FinanceOpening
            paragraphs={content.intro.paragraphs}
            stats={content.trustStats}
            stewardNoteTitle={content.stewardNoteTitle}
            stewardNote={content.stewardNote}
          />

          <FinancePeriodReport />

          <FinanceSectionRule />

          <FinanceChannelCards
            eyebrow={content.channelsIntro.eyebrow}
            title={content.channelsIntro.title}
            channels={content.channels}
          />

          <FinanceSectionRule />

          <TransparencyPillars
            eyebrow={content.pillarsIntro.eyebrow}
            title={content.pillarsIntro.title}
            description={content.pillarsIntro.description}
            groups={content.pillarGroups}
            savingsNote={content.savingsNote}
          />

          <FinanceSectionRule />

          {statementSection}

          {expenseDocumentsSection}
        </div>
      </div>

      <FinancePageToc items={content.sectionNav} />
    </article>
  );
}
