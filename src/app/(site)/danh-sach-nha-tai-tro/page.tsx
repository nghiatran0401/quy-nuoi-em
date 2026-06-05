import type { Metadata } from "next";
import { DonorsDirectoryUnavailable } from "@/components/data/donors-directory-unavailable";
import { DonorsProvinceStats } from "@/components/data/donors-province-stats";
import { DonorsSummary } from "@/components/data/donors-summary";
import { DonorsTable } from "@/components/data/donors-table";
import { DataPageBanner } from "@/components/pages/data-page-banner";
import { PublicCatalogPromo } from "@/components/shared/public-catalog-promo";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getDataPageHero,
  getDataPageMeta,
} from "@/content/pages/data-pages";
import {
  fetchDonorsDirectory,
  parseDonorsDirectorySearchParams,
  summaryCardsFromResponse,
  unavailableDonorsSummary,
} from "@/lib/data/donors-directory";
import { createDataPageMetadata } from "@/lib/page-metadata";
import { DATA_PAGE_PATHS } from "@/lib/seo/routes";
import {
  collectionPageJsonLd,
  itemListJsonLd,
  siteBreadcrumb,
} from "@/lib/seo/json-ld";

export const metadata: Metadata = createDataPageMetadata("donors");
export const revalidate = 300;

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DonorsDirectoryPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = parseDonorsDirectorySearchParams(params);
  const directory = await fetchDonorsDirectory(query);
  const meta = getDataPageMeta("donors");
  const basePath = DATA_PAGE_PATHS.donors;

  const summary = directory
    ? summaryCardsFromResponse(directory)
    : unavailableDonorsSummary;

  const itemList = directory
    ? itemListJsonLd({
        name: meta.title,
        description: meta.description,
        items: directory.donors.map((donor) => ({
          name: donor.code,
          pathname: basePath,
          description: `${donor.display.representativeName} — ${donor.display.province}`,
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
      <DataPageBanner {...getDataPageHero("donors")} />
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <PublicCatalogPromo catalogUrl={directory?.meta.directoryUrl} />
        <DonorsSummary summary={summary} />
        {directory ? (
          <>
            <DonorsProvinceStats provinceStats={directory.provinceStats} />
            <DonorsTable basePath={basePath} data={directory} activeFilters={query} />
          </>
        ) : (
          <DonorsDirectoryUnavailable />
        )}
      </div>
    </article>
  );
}
