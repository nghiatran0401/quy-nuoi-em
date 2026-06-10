import { BankStatementLoadNotices } from "@/components/finance/bank-statement-load-notices";
import { BankStatementLoading } from "@/components/finance/bank-statement-loading";
import { FinanceSectionHeader } from "@/components/finance/finance-section-header";
import { taiChinhContent } from "@/content/tai-chinh-content";

export function BankStatementSectionFallback() {
  const content = taiChinhContent;

  return (
    <section id={content.saoKeSection.id} aria-labelledby="bank-statements-heading" className="scroll-mt-32">
      <div className="rounded-2xl border border-brand-border/60 bg-white/80 p-4 sm:p-6 lg:p-8">
        <FinanceSectionHeader
          eyebrow="Công khai tài chính"
          title={content.saoKeSection.title}
          description={content.saoKeSection.description}
          headingId="bank-statements-heading"
        />

        <BankStatementLoadNotices notices={content.saoKeSection.loadNotices} />

        <BankStatementLoading
          variant="page"
          title={content.statementTableLabels.loadingTitle}
          hint={content.statementTableLabels.loadingHint}
        />
      </div>
    </section>
  );
}
