import { StaticPageShell } from "@/components/pages/static-page-shell";
import { Timeline } from "@/components/pages/timeline";
import { getStaticPageHero, historyTimeline } from "@/content/pages/static-pages";

export function HistoryView() {
  return (
    <StaticPageShell {...getStaticPageHero("history")} contentClassName="max-w-3xl">
      <Timeline events={historyTimeline} />
    </StaticPageShell>
  );
}
