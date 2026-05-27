import { StaticPageShell } from "@/components/pages/static-page-shell";
import { ProcessSteps } from "@/components/pages/process-steps";
import { getStaticPageHero, processSteps } from "@/content/pages/static-pages";

type ProcessViewProps = {
  stepImageUrls: string[];
};

export function ProcessView({ stepImageUrls }: ProcessViewProps) {
  return (
    <StaticPageShell {...getStaticPageHero("process")} contentClassName="max-w-4xl">
      <ProcessSteps steps={processSteps} stepImageUrls={stepImageUrls} />
    </StaticPageShell>
  );
}
