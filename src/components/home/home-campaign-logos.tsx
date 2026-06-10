import Image from "next/image";
import type { campaignSectionCopy } from "@/content/homepage-content";

type HomeCampaignLogosProps = {
  logos: typeof campaignSectionCopy.logos;
  className?: string;
};

export function HomeCampaignLogos({ logos, className = "" }: HomeCampaignLogosProps) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 md:gap-10 ${className}`.trim()}>
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
  );
}
