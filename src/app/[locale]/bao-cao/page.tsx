import type { Metadata } from "next";
import { ReportsList } from "@/components/data/reports-list";
import { DataPageBanner } from "@/components/pages/data-page-banner";
import { getDataPageHero, getDataPageMeta, getDataUiLabel } from "@/content/pages/data-pages";
import { getAllReports, getReportYears } from "@/lib/data/reports";
import type { Locale } from "@/i18n/config";
import { createPageMetadata } from "@/lib/page-metadata";
import { resolveLocale } from "@/lib/locale-page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return createPageMetadata(getDataPageMeta("reports", locale), locale);
}

export default async function ReportsPage({ params }: PageProps) {
  const locale = (await resolveLocale(params)) as Locale;
  const reports = getAllReports();

  return (
    <article>
      <DataPageBanner {...getDataPageHero("reports", locale)} />
      <ReportsList
        reports={reports}
        years={getReportYears()}
        labels={{
          allYears: getDataUiLabel(locale, "allYears"),
          year: getDataUiLabel(locale, "year"),
          totalIncome: getDataUiLabel(locale, "totalIncome"),
          totalExpense: getDataUiLabel(locale, "totalExpense"),
          downloadReport: getDataUiLabel(locale, "downloadReport"),
          reportsListTitle: getDataUiLabel(locale, "reportsListTitle"),
          sampleDataNote: getDataUiLabel(locale, "reportsSampleNote", {
            shown: String(reports.length),
          }),
        }}
      />
    </article>
  );
}
