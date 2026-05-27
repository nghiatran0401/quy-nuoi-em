import { StaticPageShell } from "@/components/pages/static-page-shell";
import { OrgStructure } from "@/components/pages/org-structure";
import { getStaticPageHero, getUiLabel } from "@/content/pages/static-pages";

export function OrganizationView() {
  return (
    <StaticPageShell {...getStaticPageHero("organization")}>
      <OrgStructure chartTitle={getUiLabel("orgChart")} />
    </StaticPageShell>
  );
}
