import { BankStatementSection } from "@/components/finance/bank-statement-section";
import { taiChinhContent } from "@/content/tai-chinh-content";
import { STATIC_PAGE_PATHS } from "@/lib/seo/routes";
import {
  getVcbStatementCatalog,
  getVcbStatementMonth,
  parseVcbStatementSearchParams,
} from "@/lib/data/vcb-statements";

type BankStatementDataLoaderProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function BankStatementDataLoader({ searchParams }: BankStatementDataLoaderProps) {
  const params = await searchParams;
  const content = taiChinhContent;
  const basePath = STATIC_PAGE_PATHS.taiChinh;

  let catalog = null;
  let payload = null;

  try {
    catalog = await getVcbStatementCatalog();
    const selection = parseVcbStatementSearchParams(params, catalog);
    payload = await getVcbStatementMonth(selection.year, selection.month);
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
      loadNotice={content.saoKeSection.loadNotice}
      emptyState={content.saoKeSection.emptyState}
      catalog={catalog}
      payload={payload}
      labels={content.statementTableLabels}
    />
  );
}
