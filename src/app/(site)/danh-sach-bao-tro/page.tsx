import type { Metadata } from "next";
import { PublicCatalogPromo } from "@/components/shared/public-catalog-promo";
import { SchoolsSummary } from "@/components/data/schools-summary";
import { SchoolsTable } from "@/components/data/schools-table";
import { DataPageBanner } from "@/components/pages/data-page-banner";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getDataPageHero,
  getDataPageMeta,
} from "@/content/pages/data-pages";
import {
  getAllSchools,
  getSchoolProvinces,
  getSchoolsSummary,
} from "@/lib/data/schools";
import { createDataPageMetadata } from "@/lib/page-metadata";
import {
  collectionPageJsonLd,
  itemListJsonLd,
  siteBreadcrumb,
} from "@/lib/seo/json-ld";

export const metadata: Metadata = createDataPageMetadata("children");
export const revalidate = 300;

export default async function ChildrenListPage() {
  const schools = getAllSchools();
  const summary = await getSchoolsSummary();
  const meta = getDataPageMeta("children");

  const itemList = itemListJsonLd({
    name: meta.title,
    description: meta.description,
    items: schools.slice(0, 100).map((school) => ({
      name: school.name,
      pathname: "/danh-sach-bao-tro",
      description: `${school.districtProvince} — ${school.status}`,
    })),
  });

  return (
    <article className="min-h-screen bg-brand-warm pb-20">
      <JsonLd
        data={[
          collectionPageJsonLd({
            title: meta.title,
            description: meta.description,
            pathname: "/danh-sach-bao-tro",
            hasPart: itemList,
          }),
          itemList,
          siteBreadcrumb([{ name: meta.title, pathname: "/danh-sach-bao-tro" }]),
        ]}
      />
      <DataPageBanner {...getDataPageHero("children")} />
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <PublicCatalogPromo />
        <SchoolsSummary summary={summary} />
        <SchoolsTable records={schools} provinces={getSchoolProvinces()} />
      </div>
    </article>
  );
}
