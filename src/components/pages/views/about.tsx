import Image from "next/image";
import { PageHero } from "@/components/pages/page-hero";
import { PartnersMarquee } from "@/components/pages/partners-marquee";
import { StatsGrid } from "@/components/pages/stats-grid";
import { siteStats } from "@/content/shared/site-stats";
import { getStaticPageHero, getUiLabel } from "@/content/pages/static-pages";
import type { AboutPageContent } from "@/lib/data/about-page";
import type { Locale } from "@/i18n/config";
import { siteImage } from "@/lib/images";

type AboutViewProps = {
  locale: Locale;
  content?: AboutPageContent;
};

export function AboutView({ locale, content }: AboutViewProps) {
  const hero = content?.hero ?? getStaticPageHero("about", locale);
  const stats = content?.stats ?? siteStats[locale];
  const partnersTitle = content?.partnersTitle ?? getUiLabel(locale, "partners");
  const heroImage = content?.heroImage ?? "/images/about/digital-heart-hero.png";
  const heroImageSrc = heroImage.startsWith("http://") || heroImage.startsWith("https://") ? heroImage : siteImage(heroImage);

  return (
    <>
      <section className="bg-gradient-to-b from-brand-sky-soft via-brand-warm to-white pb-8">
        <div className="relative mx-auto max-w-5xl px-4 pt-8">
          <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-2xl border border-brand-border/60 shadow-[var(--shadow-brand-card)]">
            <Image
              src={heroImageSrc}
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
          <PageHero {...hero} />
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-12">
          <StatsGrid stats={stats} />
        </div>
      </section>
      <PartnersMarquee title={partnersTitle} />
    </>
  );
}
