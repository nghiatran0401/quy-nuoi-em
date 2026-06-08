import type { Metadata } from "next";
import { PublicCatalogPromo } from "@/components/shared/public-catalog-promo";
import { SchoolsDirectoryUnavailable } from "@/components/data/schools-directory-unavailable";
import { SchoolsPageHeader } from "@/components/data/schools-page-header";
import { SchoolsTable } from "@/components/data/schools-table";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getDataPageHero,
  getDataPageMeta,
} from "@/content/pages/data-pages";
import {
  fetchSchoolsDirectory,
  parseSchoolsDirectorySearchParams,
  summaryCardsFromResponse,
  unavailableSchoolsSummary,
} from "@/lib/data/schools-directory";
import { createDataPageMetadata } from "@/lib/page-metadata";
import { DATA_PAGE_PATHS } from "@/lib/seo/routes";
import {
  collectionPageJsonLd,
  itemListJsonLd,
  siteBreadcrumb,
} from "@/lib/seo/json-ld";

export const metadata: Metadata = createDataPageMetadata("children");
export const revalidate = 300;

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SchoolsDirectoryPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = parseSchoolsDirectorySearchParams(params);
  const directory = await fetchSchoolsDirectory(query);
  const meta = getDataPageMeta("children");
  const basePath = DATA_PAGE_PATHS.children;

  const summary = directory
    ? summaryCardsFromResponse(directory)
    : unavailableSchoolsSummary;

  const itemList = directory
    ? itemListJsonLd({
        name: meta.title,
        description: meta.description,
        items: directory.schools.map((school) => ({
          name: school.school,
          pathname: basePath,
          description: `${school.locationLabel} — ${school.eatingStatus}`,
        })),
      })
    : null;

  return (
    <article className="min-h-screen bg-brand-warm page-bottom-pad">
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
      <SchoolsPageHeader {...getDataPageHero("children")} summary={summary} />
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <PublicCatalogPromo catalogUrl={directory?.meta.directoryUrl} />
        {directory ? (
          <SchoolsTable basePath={basePath} data={directory} activeFilters={query} />
        ) : (
          <SchoolsDirectoryUnavailable />
        )}
      </div>
    </article>
  );
}
