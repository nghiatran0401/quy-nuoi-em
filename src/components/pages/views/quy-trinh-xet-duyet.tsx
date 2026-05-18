import { PageHero } from "@/components/pages/page-hero";
import { ProcessSteps } from "@/components/pages/process-steps";
import { getStaticPageHero, processSteps } from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";

export function ProcessView({ locale }: { locale: Locale }) {
  return (
    <article className="pb-16">
      <PageHero {...getStaticPageHero("process", locale)} />
      <ProcessSteps steps={processSteps[locale]} />
    </article>
  );
}
