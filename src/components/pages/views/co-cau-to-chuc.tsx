import { PageHero } from "@/components/pages/page-hero";
import { OrgStructure } from "@/components/pages/org-structure";
import { getStaticPageHero, getUiLabel } from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";

export function OrganizationView({ locale }: { locale: Locale }) {
  return (
    <article className="pb-16">
      <PageHero {...getStaticPageHero("organization", locale)} />
      <OrgStructure chartTitle={getUiLabel(locale, "orgChart")} />
    </article>
  );
}
