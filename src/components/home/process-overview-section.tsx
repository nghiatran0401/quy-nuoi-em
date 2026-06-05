import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Process2026Body } from "@/components/process/process-2026-body";
import { homeProcessOverview } from "@/content/home-process-overview";
import {
  getProcess2026PageFallback,
  resolveProcess2026ImageSrc,
  type Process2026PageContent,
} from "@/lib/data/process-2026-page";

type ProcessOverviewSectionProps = {
  header?: typeof homeProcessOverview;
  processContent?: Process2026PageContent;
};

export function ProcessOverviewSection({
  header,
  processContent,
}: ProcessOverviewSectionProps) {
  const copy = header ?? homeProcessOverview;
  const process = processContent ?? getProcess2026PageFallback();
  const guideImageSrc = resolveProcess2026ImageSrc(copy.guideImage);

  return (
    <section
      className="section-warm relative overflow-hidden py-6 sm:py-8 lg:py-10"
      aria-labelledby="home-process-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgb(240 120 74 / 0.12), transparent 44%), radial-gradient(circle at 88% 80%, rgb(216 236 248 / 0.35), transparent 42%)",
        }}
      />
      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <header className="mx-auto max-w-5xl text-center">
          <p className="font-heading text-sm font-semibold tracking-wide text-brand-green md:text-base">{copy.eyebrow}</p>
          <h2 id="home-process-heading" className="heading-display mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
            {copy.title}
          </h2>
        </header>

        <div className="mx-auto mt-5 flex max-w-5xl flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <a href={process.links.messenger} target="_blank" rel="noreferrer" className="btn-primary w-full sm:w-auto">
            <MessageCircle className="mr-2 h-5 w-5" aria-hidden />
            {process.hero.messengerCta}
          </a>
          <a href={process.links.group} target="_blank" rel="noreferrer" className="btn-secondary w-full sm:w-auto">
            {process.hero.groupCta}
          </a>
        </div>

        <div className="mx-auto mt-6 max-w-6xl overflow-hidden rounded-2xl border border-brand-border/80 bg-white shadow-[var(--shadow-brand-card)]">
          <Image
            src={guideImageSrc}
            alt="Sơ đồ tổng quan 6 bước nhận mã Nuôi Em"
            width={1200}
            height={430}
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="mt-6 lg:mt-8">
          <Process2026Body content={process} />
        </div>
      </div>
    </section>
  );
}
