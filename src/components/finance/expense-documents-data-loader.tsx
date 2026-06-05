import { ExpenseDocumentsSection } from "@/components/finance/expense-documents-section";
import { taiChinhContent } from "@/content/tai-chinh-content";
import { getExpenseDocumentsPayload } from "@/lib/data/expense-documents";

export async function ExpenseDocumentsDataLoader() {
  const content = taiChinhContent;
  const payload = await getExpenseDocumentsPayload();

  return (
    <ExpenseDocumentsSection
      id={content.expenseDocsSection.id}
      title={content.expenseDocsSection.title}
      description={content.expenseDocsSection.description}
      emptyState={content.expenseDocsSection.emptyState}
      interimLabel={content.expenseDocsSection.interimLabel}
      payload={payload}
      labels={content.expenseDocsTableLabels}
    />
  );
}
