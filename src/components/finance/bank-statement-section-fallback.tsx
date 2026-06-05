import { BankStatementLoading } from "@/components/finance/bank-statement-loading";
import { FinanceSectionHeader } from "@/components/finance/finance-section-header";
import { taiChinhContent } from "@/content/tai-chinh-content";
import { Clock } from "lucide-react";

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

        <div className="mb-5 flex items-center gap-2 rounded-xl bg-brand-sky-soft/70 px-4 py-3 text-xs leading-relaxed text-brand-muted sm:text-sm">
          <Clock className="h-4 w-4 shrink-0 text-brand-green" aria-hidden />
          <p>{content.saoKeSection.loadNotice}</p>
        </div>

        <BankStatementLoading
          variant="page"
          title={content.statementTableLabels.loadingTitle}
          hint={content.statementTableLabels.loadingHint}
        />
      </div>
    </section>
  );
}
