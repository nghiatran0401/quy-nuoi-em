import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { brandVisual } from "@/config/brand-visual";
import type { Locale } from "@/i18n/config";
import type { HomeHeroContent } from "@/lib/data/homepage";

type HeroSectionProps = {
  locale: Locale;
  content?: HomeHeroContent;
};

export async function HeroSection({ locale, content }: HeroSectionProps) {
  const t = content ? null : await getTranslations({ locale, namespace: "home" });
  const copy = content ?? {
    eyebrow: t?.("eyebrow") ?? "",
    title: t?.("title") ?? "",
    description: t?.("description") ?? "",
    sponsorNow: t?.("sponsorNow") ?? "",
    learnMore: t?.("learnMore") ?? "",
  };

  return (
    <section className="hero-backdrop relative overflow-hidden py-14 lg:py-24">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <div className="w-full text-center lg:w-1/2 lg:text-left">
            <p className="eyebrow mb-4">{copy.eyebrow}</p>
            <h1 className="heading-display mb-6 text-4xl leading-tight md:text-6xl">{copy.title}</h1>
            <p className="text-body mb-10 text-justify text-lg md:text-xl lg:text-left">
              {copy.description}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link href="/dong-gop" className="btn-primary px-8 py-4">
                {copy.sponsorNow}
              </Link>
              <Link href="/about" className="btn-secondary px-8 py-4">
                {copy.learnMore}
              </Link>
            </div>
          </div>
          <div className="relative w-full lg:w-1/2">
            <div className="absolute top-1/2 left-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-brand-accent/20 via-brand-highlight/25 to-transparent blur-3xl" />
            <Image
              src={brandVisual.heroImage}
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
