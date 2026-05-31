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
    <section className="hero-backdrop relative overflow-hidden py-10 sm:py-14 lg:py-24">
      <div className="page-container relative z-10">
        <div className="flex flex-col items-center gap-8 sm:gap-12 lg:flex-row lg:gap-20">
          <div className="w-full min-w-0 text-center lg:w-1/2 lg:text-left">
            <p className="eyebrow mb-3 sm:mb-4">{copy.eyebrow}</p>
            <h1 className="heading-display mb-4 text-[1.75rem] leading-[1.15] sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
              {copy.title}
            </h1>
            <p className="text-body mb-8 text-base leading-relaxed sm:mb-10 sm:text-lg md:text-xl lg:text-left">
              {copy.description}
            </p>
            <div className="flex w-full flex-col justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start">
              <Link href="/dong-gop" className="btn-primary w-full sm:w-auto">
                {copy.sponsorNow}
              </Link>
              <Link href="/about" className="btn-secondary w-full sm:w-auto">
                {copy.learnMore}
              </Link>
            </div>
          </div>
          <div className="relative w-full lg:w-1/2">
            <div className="absolute top-1/2 left-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-brand-accent/20 via-brand-highlight/25 to-transparent blur-3xl" />
            <Image
              src={homeMediaImageSrc(heroImageUrl)}
              alt={brandVisual.name}
              width={800}
              height={600}
              className="h-auto w-full rotate-1 rounded-3xl border border-brand-border/80 shadow-[var(--shadow-brand-card)] transition-transform duration-500 hover:rotate-0"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
