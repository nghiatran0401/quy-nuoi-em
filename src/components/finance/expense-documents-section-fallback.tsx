import { BankStatementLoading, bankStatementLoadingCopy } from "@/components/finance/bank-statement-loading";
import { FinanceSectionHeader } from "@/components/finance/finance-section-header";
import { taiChinhContent } from "@/content/tai-chinh-content";

export function ExpenseDocumentsSectionFallback() {
  const content = taiChinhContent;

  return (
    <section id={content.expenseDocsSection.id} aria-labelledby="expense-docs-heading" className="scroll-mt-32">
      <div className="rounded-2xl border border-brand-border/60 bg-white/80 p-4 sm:p-6 lg:p-8">
        <FinanceSectionHeader
          eyebrow="Chứng từ & xác nhận"
          title={content.expenseDocsSection.title}
          description={content.expenseDocsSection.description}
          headingId="expense-docs-heading"
        />
        <BankStatementLoading
          variant="page"
          title="Đang tải chứng từ chi…"
          hint={bankStatementLoadingCopy.hint}
        />
      </div>
    </section>
  );
}
