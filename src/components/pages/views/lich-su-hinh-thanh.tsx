import { PageHero } from "@/components/pages/page-hero";
import { Timeline } from "@/components/pages/timeline";
import { getStaticPageHero, historyTimeline } from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";

export function HistoryView({ locale }: { locale: Locale }) {
  return (
    <article className="pb-16">
      <PageHero {...getStaticPageHero("history", locale)} />
      <Timeline events={historyTimeline[locale]} />
    </article>
  );
}
