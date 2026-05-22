import Image from "next/image";
import { PageHero } from "@/components/pages/page-hero";
import { PartnersMarquee } from "@/components/pages/partners-marquee";
import { StatsGrid } from "@/components/pages/stats-grid";
import { siteStats } from "@/content/shared/site-stats";
import { getStaticPageHero, getUiLabel } from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";
import { siteImage } from "@/lib/images";

export function AboutView({ locale }: { locale: Locale }) {
  const hero = getStaticPageHero("about", locale);

  return (
    <>
      <section className="bg-gradient-to-b from-brand-sky-soft via-brand-warm to-white pb-8">
        <div className="relative mx-auto max-w-5xl px-4 pt-8">
          <div className="relative mb-8 aspect-[21/9] overflow-hidden rounded-2xl border border-brand-border/60 shadow-[var(--shadow-brand-card)]">
            <Image
              src={siteImage("/images/about/digital-heart-hero.png")}
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
          <PageHero {...hero} />
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-12">
          <StatsGrid stats={siteStats[locale]} />
        </div>
      </section>
      <PartnersMarquee title={getUiLabel(locale, "partners")} />
    </>
  );
}
