import type { Metadata } from "next";
import { MaGhepDirectoryUnavailable } from "@/components/data/ma-ghep-directory-unavailable";
import { MaGhepTable } from "@/components/data/ma-ghep-table";
import { DataPageBanner } from "@/components/pages/data-page-banner";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getDataPageHero,
  getDataPageMeta,
} from "@/content/pages/data-pages";
import {
  fetchMaGhepDirectory,
  parseMaGhepDirectorySearchParams,
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
  const hero = getDataPageHero("maGhep");
  const basePath = DATA_PAGE_PATHS.maGhep;

  const bannerTitle = directory
    ? `Bảng mã ghép NE ${directory.schoolYear.label}`
    : hero.title;

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
          siteBreadcrumb([{ name: "Mã ghép", pathname: basePath }]),
        ]}
      />
      <DataPageBanner
        eyebrow={hero.eyebrow}
        title={bannerTitle}
        description={hero.description}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {directory ? (
          <MaGhepTable basePath={basePath} data={directory} activeFilters={query} />
        ) : (
          <MaGhepDirectoryUnavailable />
        )}
      </div>
    </article>
  );
}
