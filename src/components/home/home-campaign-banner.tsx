import type { HomeCampaignBlock } from "@/content/homepage-content";

type HomeCampaignBannerProps = {
  campaign: HomeCampaignBlock;
  headingId?: string;
  showDivider?: boolean;
  className?: string;
};

export function HomeCampaignBanner({
  campaign,
  headingId,
  showDivider = true,
  className = "",
}: HomeCampaignBannerProps) {
  return (
    <header className={`mx-auto max-w-5xl text-center ${className}`.trim()}>
      <h2
        id={headingId}
        className="heading-display mx-auto max-w-4xl text-balance text-[clamp(1.25rem,4vw+0.4rem,2.35rem)] font-extrabold leading-tight tracking-tight text-brand-accent"
      >
        {campaign.headline}
      </h2>
      <p className="mt-3 text-balance text-center font-heading text-[clamp(1.15rem,3.2vw+0.35rem,2.1rem)] font-bold leading-tight text-brand-ink sm:mt-4">
        {campaign.phase}
      </p>
      <p className="mx-auto mt-3 max-w-3xl text-pretty text-center text-sm font-medium leading-relaxed text-brand-muted sm:mt-4 sm:text-[0.95rem] md:text-base">
        {campaign.goal}
      </p>

      {showDivider ? (
        <div
          className="mx-auto mt-5 h-0 w-full max-w-3xl border-t-2 border-dashed border-brand-accent/50 sm:mt-6"
          aria-hidden
        />
      ) : null}
    </header>
  );
}
