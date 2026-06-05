import Image from "next/image";
import type { HomeCampaignBlock } from "@/content/homepage-content";

type HomeCampaignBannerProps = {
  campaign: HomeCampaignBlock;
  logos: readonly { src: string; alt: string; className?: string }[];
  headingId?: string;
  showDivider?: boolean;
  className?: string;
};

export function HomeCampaignBanner({
  campaign,
  logos,
  headingId,
  showDivider = true,
  className = "",
}: HomeCampaignBannerProps) {
  return (
    <header className={`mx-auto max-w-5xl text-center ${className}`.trim()}>
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
        {logos.map((logo) => (
          <div
            key={logo.alt}
            className="flex h-14 w-28 items-center justify-center sm:h-16 sm:w-32 md:h-[4.5rem] md:w-36"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={160}
              height={80}
              className={`max-h-full max-w-full object-contain ${logo.className ?? ""}`.trim()}
            />
          </div>
        ))}
      </div>

      <h2
        id={headingId}
        className="heading-display mx-auto mt-5 max-w-4xl text-[clamp(1.35rem,4vw+0.5rem,2.35rem)] font-extrabold leading-tight tracking-tight text-brand-accent sm:mt-6"
      >
        {campaign.headline}
      </h2>
      <p className="mt-3 text-center font-heading text-base font-bold text-brand-ink sm:mt-4 md:text-xl">
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
