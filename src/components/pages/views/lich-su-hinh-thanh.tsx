import { StaticPageShell } from "@/components/pages/static-page-shell";
import { Timeline } from "@/components/pages/timeline";
import { getStaticPageHero, historyTimeline } from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";

export function HistoryView({ locale }: { locale: Locale }) {
  return (
    <StaticPageShell {...getStaticPageHero("history", locale)} contentClassName="max-w-3xl">
      <Timeline events={historyTimeline[locale]} />
    </StaticPageShell>
  );
}
