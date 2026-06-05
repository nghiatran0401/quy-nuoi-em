import { BankStatementLoading, bankStatementLoadingCopy } from "@/components/finance/bank-statement-loading";
import { DataPageBanner } from "@/components/pages/data-page-banner";
import { getStaticPageHero } from "@/content/pages/static-pages";

export default function TaiChinhLoading() {
  const hero = getStaticPageHero("taiChinh");

  return (
    <article className="min-h-screen bg-brand-warm page-bottom-pad">
      <DataPageBanner {...hero} />
      <div className="page-container py-8 sm:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <BankStatementLoading
            variant="page"
            title={bankStatementLoadingCopy.title}
            hint={bankStatementLoadingCopy.hint}
          />
        </div>
      </div>
    </article>
  );
}
