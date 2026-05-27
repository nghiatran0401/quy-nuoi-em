import type { Metadata } from "next";
import { ChildrenSummaryCards } from "@/components/data/children-summary";
import { ChildrenTable } from "@/components/data/children-table";
import { DataPageBanner } from "@/components/pages/data-page-banner";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getDataPageHero,
  getDataPageMeta,
  getDataUiLabel,
} from "@/content/pages/data-pages";
import {
  childrenSummary,
  getAllChildren,
  getProvinces,
  getStatuses,
} from "@/lib/data/children";
import { createDataPageMetadata } from "@/lib/page-metadata";
import {
  collectionPageJsonLd,
  itemListJsonLd,
  siteBreadcrumb,
} from "@/lib/seo/json-ld";

export const metadata: Metadata = createDataPageMetadata("children");

export default function ChildrenListPage() {
  const children = getAllChildren();
  const meta = getDataPageMeta("children");

  const itemList = itemListJsonLd({
    name: meta.title,
    description: meta.description,
    items: children.slice(0, 100).map((child) => ({
      name: `${child.name} (${child.code})`,
      pathname: `/danh-sach-bao-tro/${child.code}`,
      description: `Hồ sơ bảo trợ ${child.code} — ${child.province}`,
    })),
  });

  const labels = {
    totalChildren: getDataUiLabel("totalChildren"),
    active: getDataUiLabel("active"),
    completed: getDataUiLabel("completed"),
    terminated: getDataUiLabel("terminated"),
    statusBreakdown: getDataUiLabel("statusBreakdown"),
    searchPlaceholder: getDataUiLabel("searchPlaceholder"),
    allProvinces: getDataUiLabel("allProvinces"),
    allStatuses: getDataUiLabel("allStatuses"),
    profileCode: getDataUiLabel("profileCode"),
    fullName: getDataUiLabel("fullName"),
    birthYear: getDataUiLabel("birthYear"),
    gender: getDataUiLabel("gender"),
    province: getDataUiLabel("province"),
    status: getDataUiLabel("status"),
    noResults: getDataUiLabel("noResults"),
    sampleDataNote: getDataUiLabel("sampleDataNote"),
  };

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
        <ChildrenSummaryCards summary={childrenSummary} labels={labels} />
        <ChildrenTable
          records={children}
          provinces={getProvinces()}
          statuses={getStatuses()}
          labels={labels}
          summaryTotal={childrenSummary.total}
        />
      </div>
    </article>
  );
}
