import type { Metadata } from "next";
import { ReportsList } from "@/components/data/reports-list";
import { DataPageBanner } from "@/components/pages/data-page-banner";
import { getDataPageHero, getDataUiLabel } from "@/content/pages/data-pages";
import { getReportYears, getReportsPayload } from "@/lib/data/financial-reports";
import { createDataPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createDataPageMetadata("reports");

export default async function ReportsPage() {
  const { reports, usedFallback } = await getReportsPayload();
  const years = await getReportYears();

  return (
    <article className="min-h-screen bg-brand-warm">
      <DataPageBanner {...getDataPageHero("reports")} />
      <ReportsList
        reports={reports}
        years={years}
        labels={{
          allYears: getDataUiLabel("allYears"),
          year: getDataUiLabel("year"),
          totalIncome: getDataUiLabel("totalIncome"),
          totalExpense: getDataUiLabel("totalExpense"),
          downloadReport: getDataUiLabel("downloadReport"),
          reportsListTitle: getDataUiLabel("reportsListTitle"),
          sampleDataNote: usedFallback
            ? getDataUiLabel("reportsSampleNote", {
                shown: String(reports.length),
              })
            : undefined,
        }}
      />
    </article>
  );
}
