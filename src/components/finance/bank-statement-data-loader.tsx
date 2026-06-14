import { unstable_noStore as noStore } from "next/cache";
import { BankStatementSection } from "@/components/finance/bank-statement-section";
import { taiChinhContent } from "@/content/tai-chinh-content";
import { STATIC_PAGE_PATHS } from "@/lib/seo/routes";
import {
  getBankStatementCatalog,
  getBankStatementMonth,
  parseBankStatementSearchParams,
} from "@/lib/data/bank-statements";

type BankStatementDataLoaderProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function BankStatementDataLoader({ searchParams }: BankStatementDataLoaderProps) {
  noStore();
  const params = await searchParams;
  const content = taiChinhContent;
  const basePath = STATIC_PAGE_PATHS.taiChinh;

  let catalog = null;
  let payload = null;

  try {
    catalog = await getBankStatementCatalog();
    const selection = parseBankStatementSearchParams(params, catalog);
    payload = await getBankStatementMonth(selection.year, selection.month);
  } catch {
    catalog = null;
    payload = null;
  }

  return (
    <BankStatementSection
      id={content.saoKeSection.id}
      basePath={basePath}
      title={content.saoKeSection.title}
      description={content.saoKeSection.description}
      emptyState={content.saoKeSection.emptyState}
      catalog={catalog}
      payload={payload}
      labels={content.statementTableLabels}
    />
  );
}
