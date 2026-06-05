import type { Metadata } from "next";
import { Suspense } from "react";
import { TaiChinhView } from "@/components/pages/views/tai-chinh";
import { BankStatementDataLoader } from "@/components/finance/bank-statement-data-loader";
import { BankStatementSectionFallback } from "@/components/finance/bank-statement-section-fallback";
import { ExpenseDocumentsDataLoader } from "@/components/finance/expense-documents-data-loader";
import { ExpenseDocumentsSectionFallback } from "@/components/finance/expense-documents-section-fallback";
import { JsonLd } from "@/components/seo/json-ld";
import { getStaticPageMeta } from "@/content/pages/static-pages";
import { createStaticPageMetadata } from "@/lib/page-metadata";
import { STATIC_PAGE_PATHS } from "@/lib/seo/routes";
import { siteBreadcrumb, webPageJsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = createStaticPageMetadata("taiChinh", {
  keywords: [
    "minh bạch tài chính Nuôi Em",
    "sao kê Quỹ Nuôi Em",
    "công khai thu chi",
    "chứng từ chi Nuôi Em",
    "tài chính thiện nguyện",
  ],
});

export const revalidate = 3600;

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function TaiChinhPage({ searchParams }: PageProps) {
  const meta = getStaticPageMeta("taiChinh");
  const pathname = STATIC_PAGE_PATHS.taiChinh;

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: meta.title,
            description: meta.description,
            pathname,
          }),
          siteBreadcrumb([{ name: meta.title, pathname }]),
        ]}
      />
      <TaiChinhView
        statementSection={
          <Suspense fallback={<BankStatementSectionFallback />}>
            <BankStatementDataLoader searchParams={searchParams} />
          </Suspense>
        }
        expenseDocumentsSection={
          <Suspense fallback={<ExpenseDocumentsSectionFallback />}>
            <ExpenseDocumentsDataLoader />
          </Suspense>
        }
      />
    </>
  );
}
