import Image from "next/image";
import { PageHero } from "@/components/pages/page-hero";
import { PartnersMarquee } from "@/components/pages/partners-marquee";
import { StatsSection } from "@/components/shared/stats-section";
import { unavailableHomeStats } from "@/lib/data/home-metrics";
import { getStaticPageHero, getUiLabel } from "@/content/pages/static-pages";
import type { AboutPageContent } from "@/lib/data/about-page";
import type { PartnerLogoDisplay } from "@/lib/data/partner-logos";
import { siteImage } from "@/lib/images";

type AboutViewProps = {
  content?: AboutPageContent;
  partnerLogos: PartnerLogoDisplay[];
  stats?: AboutPageContent["stats"];
};

export function AboutView({ content, partnerLogos, stats: statsOverride }: AboutViewProps) {
  const hero = content?.hero ?? getStaticPageHero("about");
  const stats = statsOverride ?? content?.stats ?? unavailableHomeStats;
  const partnersTitle = content?.partnersTitle ?? getUiLabel("partners");
  const heroImage = content?.heroImage ?? "/images/about/digital-heart-hero.png";
  const heroImageSrc = heroImage.startsWith("http://") || heroImage.startsWith("https://") ? heroImage : siteImage(heroImage);

  return (
    <>
      <section className="bg-gradient-to-b from-brand-sky-soft via-brand-warm to-white pb-8">
        <div className="relative mx-auto max-w-5xl px-4 pt-8">
          <div className="mb-8 overflow-hidden rounded-2xl border border-brand-border/60 bg-white shadow-[var(--shadow-brand-card)]">
            <Image
              src={heroImageSrc}
              alt="Hệ sinh thái Nuôi Em là đây — 16 dự án hỗ trợ trẻ bản cao"
              width={1024}
              height={667}
              className="h-auto w-full object-contain"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
          <PageHero {...hero} />
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-12">
          <StatsSection stats={stats} variant="inline" />
        </div>
      </section>
      <PartnersMarquee title={partnersTitle} logos={partnerLogos} />
    </>
  );
}
