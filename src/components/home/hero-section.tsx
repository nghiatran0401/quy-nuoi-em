import Image from "next/image";
import Link from "next/link";
import { brandVisual } from "@/config/brand-visual";
import { siteCopy } from "@/content/site-copy";
import { homeMediaImageSrc } from "@/lib/data/home-media";
import type { HomeHeroContent } from "@/lib/data/homepage";

type HeroSectionProps = {
  content?: HomeHeroContent;
  heroImageUrl: string;
};

export function HeroSection({ content, heroImageUrl }: HeroSectionProps) {
  const copy = content ?? siteCopy.home;

  return (
    <section className="hero-backdrop relative overflow-hidden py-10 sm:py-12 lg:py-16">
      <div className="page-container relative z-10">
        <div className="flex flex-col items-center gap-8 sm:gap-10 lg:flex-row lg:items-center lg:gap-12 xl:gap-16">
          <div className="w-full min-w-0 text-center lg:w-1/2 lg:text-left">
            <p className="eyebrow mb-3 sm:mb-4">{copy.eyebrow}</p>
            <h1 className="heading-hero mb-4 sm:mb-6">{copy.title}</h1>
            <p className="text-body home-prose mx-auto mb-8 max-w-prose text-[15px] leading-relaxed sm:mb-10 sm:text-lg md:text-xl lg:mx-0 lg:max-w-none">
              {copy.description}
            </p>
            <div className="flex w-full max-w-md flex-col justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-4 lg:justify-start">
              <Link href="/dong-gop" className="btn-primary w-full sm:w-auto">
                {copy.sponsorNow}
              </Link>
              <Link href="#home-process-heading" className="btn-secondary w-full sm:w-auto">
                {copy.learnMore}
              </Link>
            </div>
          </div>

          <div className="relative w-full lg:w-1/2">
            <div className="absolute top-1/2 left-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-brand-accent/20 via-brand-highlight/25 to-transparent blur-3xl" />
            <Image
              src={homeMediaImageSrc(heroImageUrl)}
              alt={brandVisual.name}
              width={1920}
              height={1080}
              className="h-auto w-full rounded-2xl border border-brand-border/80 shadow-[var(--shadow-brand-card)] sm:rounded-3xl"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
