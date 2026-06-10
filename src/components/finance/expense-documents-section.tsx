import { FileText } from "lucide-react";
import type { ComponentProps } from "react";
import { ExpenseDocumentsExplorer } from "@/components/finance/expense-documents-explorer";
import { FinanceDataPlaceholder } from "@/components/finance/finance-data-placeholder";
import { FinanceSectionHeader } from "@/components/finance/finance-section-header";
import type { ExpenseDocumentsPayload } from "@/lib/data/expense-documents";

type ExpenseDocumentsSectionProps = {
  id: string;
  title: string;
  description: string;
  emptyState: string;
  payload: ExpenseDocumentsPayload | null;
  labels: ComponentProps<typeof ExpenseDocumentsExplorer>["labels"];
};

export function ExpenseDocumentsSection({
  id,
  title,
  description,
  emptyState,
  payload,
  labels,
}: ExpenseDocumentsSectionProps) {
  return (
    <section id={id} aria-labelledby="expense-docs-heading" className="scroll-mt-32">
      <div className="rounded-2xl border border-brand-border/60 bg-white/80 p-4 sm:p-6 lg:p-8">
        <FinanceSectionHeader
          eyebrow="Chứng từ & xác nhận"
          title={title}
          description={description}
          headingId="expense-docs-heading"
        />

        {payload && payload.lists.length > 0 ? (
          <ExpenseDocumentsExplorer payload={payload} labels={labels} />
        ) : (
          <FinanceDataPlaceholder icon={FileText} message={emptyState} />
        )}
      </div>
    </section>
  );
}
