import type { Metadata } from "next";
import { MaGhepDirectoryUnavailable } from "@/components/data/ma-ghep-directory-unavailable";
import { MaGhepSummary } from "@/components/data/ma-ghep-summary";
import { MaGhepTable } from "@/components/data/ma-ghep-table";
import { DataPageBanner } from "@/components/pages/data-page-banner";
import { PublicCatalogPromo } from "@/components/shared/public-catalog-promo";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getDataPageHero,
  getDataPageMeta,
} from "@/content/pages/data-pages";
import {
  fetchMaGhepDirectory,
  parseMaGhepDirectorySearchParams,
  summaryCardsFromResponse,
  unavailableMaGhepSummary,
} from "@/lib/data/ma-ghep-directory";
import { createDataPageMetadata } from "@/lib/page-metadata";
import { DATA_PAGE_PATHS } from "@/lib/seo/routes";
import {
  collectionPageJsonLd,
  itemListJsonLd,
  siteBreadcrumb,
} from "@/lib/seo/json-ld";

export const metadata: Metadata = createDataPageMetadata("maGhep");
export const revalidate = 300;

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function MaGhepPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = parseMaGhepDirectorySearchParams(params);
  const directory = await fetchMaGhepDirectory(query);
  const meta = getDataPageMeta("maGhep");
  const basePath = DATA_PAGE_PATHS.maGhep;

  const summary = directory
    ? summaryCardsFromResponse(directory)
    : unavailableMaGhepSummary;

  const itemList = directory
    ? itemListJsonLd({
        name: meta.title,
        description: meta.description,
        items: directory.records.map((record) => ({
          name: record.representativeCode,
          pathname: basePath,
          description: record.display.mergedCode || record.representativeCode,
        })),
      })
    : null;

  return (
    <article className="min-h-screen bg-brand-warm pb-20">
      <JsonLd
        data={[
          collectionPageJsonLd({
            title: meta.title,
            description: meta.description,
            pathname: basePath,
            hasPart: itemList ?? undefined,
          }),
          ...(itemList ? [itemList] : []),
          siteBreadcrumb([{ name: meta.title, pathname: basePath }]),
        ]}
      />
      <DataPageBanner {...getDataPageHero("maGhep")} />
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <PublicCatalogPromo catalogUrl={directory?.meta.directoryUrl} />
        <MaGhepSummary
          summary={summary}
          schoolYearLabel={directory?.schoolYear.label}
        />
        {directory ? (
          <MaGhepTable basePath={basePath} data={directory} activeFilters={query} />
        ) : (
          <MaGhepDirectoryUnavailable />
        )}
      </div>
    </article>
  );
}
