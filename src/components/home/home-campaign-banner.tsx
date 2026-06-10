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
        className="heading-display mx-auto max-w-4xl text-[clamp(1.35rem,4vw+0.5rem,2.35rem)] font-extrabold leading-tight tracking-tight text-brand-accent"
      >
        {campaign.headline}
      </h2>
      <p className="mt-3 text-center font-heading text-[clamp(1.25rem,3.5vw+0.4rem,2.25rem)] font-bold leading-tight text-brand-ink sm:mt-4">
        {campaign.phase}
      </p>
      <p className="mt-1.5 text-center text-sm font-semibold text-brand-muted sm:text-base md:text-lg">
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
