import { FileSpreadsheet } from "lucide-react";
import type { ComponentProps } from "react";
import { BankStatementExplorer } from "@/components/finance/bank-statement-explorer";
import { BankStatementLoadNotices } from "@/components/finance/bank-statement-load-notices";
import { FinanceDataPlaceholder } from "@/components/finance/finance-data-placeholder";
import { FinanceSectionHeader } from "@/components/finance/finance-section-header";
import type {
  VcbStatementCatalog,
  VcbStatementMonthPayload,
} from "@/lib/data/vcb-statements";

type BankStatementSectionProps = {
  id: string;
  basePath: string;
  title: string;
  description: string;
  loadNotices: readonly string[];
  emptyState: string;
  catalog: VcbStatementCatalog | null;
  payload: VcbStatementMonthPayload | null;
  labels: ComponentProps<typeof BankStatementExplorer>["labels"];
};

export function BankStatementSection({
  id,
  basePath,
  title,
  description,
  loadNotices,
  emptyState,
  catalog,
  payload,
  labels,
}: BankStatementSectionProps) {
  return (
    <section id={id} aria-labelledby="bank-statements-heading" className="scroll-mt-32">
      <div className="rounded-2xl border border-brand-border/60 bg-white/80 p-4 sm:p-6 lg:p-8">
        <FinanceSectionHeader
          eyebrow="Công khai tài chính"
          title={title}
          description={description}
          headingId="bank-statements-heading"
        />

        <BankStatementLoadNotices notices={loadNotices} />

        {catalog && payload ? (
          <BankStatementExplorer
            basePath={basePath}
            catalog={catalog}
            payload={payload}
            labels={labels}
          />
        ) : (
          <FinanceDataPlaceholder icon={FileSpreadsheet} message={emptyState} />
        )}
      </div>
    </section>
  );
}
