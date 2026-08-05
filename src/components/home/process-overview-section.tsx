import Image from "next/image";
import { HomeCampaignBanner } from "@/components/home/home-campaign-banner";
import { Process2026Body } from "@/components/process/process-2026-body";
import { siteConfig } from "@/config/site";
import { campaignSectionCopy, type HomeCampaignBlock } from "@/content/homepage-content";
import { homeProcessOverview } from "@/content/home-process-overview";
import { siteCopy } from "@/content/site-copy";
import {
  getProcess2026PageFallback,
  resolveProcess2026ImageSrc,
  type Process2026PageContent,
} from "@/lib/data/process-2026-page";

type ProcessOverviewSectionProps = {
  header?: typeof homeProcessOverview;
  processContent?: Process2026PageContent;
  campaign?: HomeCampaignBlock;
};

export function ProcessOverviewSection({
  header,
  processContent,
  campaign = campaignSectionCopy.campaign,
}: ProcessOverviewSectionProps) {
  const copy = header ?? homeProcessOverview;
  const process = processContent ?? getProcess2026PageFallback();
  const guideImageSrc = resolveProcess2026ImageSrc(copy.guideImage);
  const popupCopy = siteCopy.homePopup;

  return (
    <section
      className="section-warm relative overflow-hidden py-6 sm:py-8 lg:py-10"
      aria-labelledby="home-campaign-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgb(240 120 74 / 0.12), transparent 44%), radial-gradient(circle at 88% 80%, rgb(216 236 248 / 0.35), transparent 42%)",
        }}
      />
      <div className="page-container relative z-10">
        <HomeCampaignBanner
          campaign={campaign}
          headingId="home-campaign-heading"
          showDivider={false}
        />

        <div className="mx-auto mt-6 flex max-w-5xl flex-col items-stretch justify-center gap-3 sm:mt-7 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
          <a
            href={process.links.group}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full sm:w-auto"
          >
            {process.hero.groupCta}
          </a>
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto"
          >
            {popupCopy.fanpageButton}
          </a>
          <a
            href={siteConfig.social.messenger}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#0084FF] px-6 py-3 text-center text-base font-bold text-white transition duration-200 hover:bg-[#0078EB] active:scale-[0.98] sm:w-auto sm:px-8 sm:py-3.5"
          >
            {popupCopy.chatbotButton}
          </a>
        </div>

        <div
          className="mx-auto mt-8 h-0 w-full max-w-3xl border-t-2 border-dashed border-brand-accent/50 sm:mt-10"
          aria-hidden
        />

        <div className="-mx-4 mt-6 overflow-hidden border-y border-brand-border/80 bg-white shadow-[var(--shadow-brand-card)] sm:mx-auto sm:max-w-6xl sm:rounded-2xl sm:border">
          <Image
            src={guideImageSrc}
            alt="Sơ đồ tổng quan 6 bước nhận mã Nuôi Em"
            width={1200}
            height={430}
            className="h-auto w-full object-contain"
            sizes="(max-width: 768px) 100vw, 1152px"
          />
        </div>

        <div className="mt-6 lg:mt-8">
          <Process2026Body content={process} showTimeline={false} />
        </div>
      </div>
    </section>
  );
}
