import { StaticPageShell } from "@/components/pages/static-page-shell";
import { ProcessSteps } from "@/components/pages/process-steps";
import { getStaticPageHero, processSteps } from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";

export function ProcessView({ locale }: { locale: Locale }) {
  return (
    <StaticPageShell {...getStaticPageHero("process", locale)} contentClassName="max-w-4xl">
      <ProcessSteps steps={processSteps[locale]} />
    </StaticPageShell>
  );
}
