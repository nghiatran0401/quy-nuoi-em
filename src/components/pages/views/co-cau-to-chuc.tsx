import { StaticPageShell } from "@/components/pages/static-page-shell";
import { OrgStructure } from "@/components/pages/org-structure";
import { getStaticPageHero, getUiLabel } from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";

export function OrganizationView({ locale }: { locale: Locale }) {
  return (
    <StaticPageShell {...getStaticPageHero("organization", locale)}>
      <OrgStructure chartTitle={getUiLabel(locale, "orgChart")} />
    </StaticPageShell>
  );
}
