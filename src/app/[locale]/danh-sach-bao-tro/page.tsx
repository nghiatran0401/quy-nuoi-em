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
import type { Locale } from "@/i18n/config";
import { createDataPageMetadata } from "@/lib/page-metadata";
import { resolveLocale } from "@/lib/locale-page";
import {
  collectionPageJsonLd,
  itemListJsonLd,
  siteBreadcrumb,
} from "@/lib/seo/json-ld";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return createDataPageMetadata("children", locale);
}

export default async function ChildrenListPage({ params }: PageProps) {
  const locale = (await resolveLocale(params)) as Locale;
  const children = getAllChildren();
  const meta = getDataPageMeta("children", locale);

  const itemList = itemListJsonLd({
    locale,
    name: meta.title,
    description: meta.description,
    items: children.slice(0, 100).map((child) => ({
      name: `${child.name} (${child.code})`,
      pathname: `/danh-sach-bao-tro/${child.code}`,
      description:
        locale === "vi"
          ? `Hồ sơ bảo trợ ${child.code} — ${child.province}`
          : `Sponsorship profile ${child.code} — ${child.province}`,
    })),
  });

  const labels = {
    totalChildren: getDataUiLabel(locale, "totalChildren"),
    active: getDataUiLabel(locale, "active"),
    completed: getDataUiLabel(locale, "completed"),
    terminated: getDataUiLabel(locale, "terminated"),
    statusBreakdown: getDataUiLabel(locale, "statusBreakdown"),
    searchPlaceholder: getDataUiLabel(locale, "searchPlaceholder"),
    allProvinces: getDataUiLabel(locale, "allProvinces"),
    allStatuses: getDataUiLabel(locale, "allStatuses"),
    profileCode: getDataUiLabel(locale, "profileCode"),
    fullName: getDataUiLabel(locale, "fullName"),
    birthYear: getDataUiLabel(locale, "birthYear"),
    gender: getDataUiLabel(locale, "gender"),
    province: getDataUiLabel(locale, "province"),
    status: getDataUiLabel(locale, "status"),
    noResults: getDataUiLabel(locale, "noResults"),
    sampleDataNote: getDataUiLabel(locale, "sampleDataNote"),
  };

  return (
    <article className="min-h-screen bg-brand-warm pb-20">
      <JsonLd
        data={[
          collectionPageJsonLd({
            locale,
            title: meta.title,
            description: meta.description,
            pathname: "/danh-sach-bao-tro",
            hasPart: itemList,
          }),
          itemList,
          siteBreadcrumb(
            [{ name: meta.title, pathname: "/danh-sach-bao-tro" }],
            locale,
          ),
        ]}
      />
      <DataPageBanner {...getDataPageHero("children", locale)} />
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
