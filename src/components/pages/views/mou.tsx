import Image from "next/image";
import { StaticPageShell } from "@/components/pages/static-page-shell";
import { getStaticPageHero, getUiLabel, mouContent } from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";
import { siteImages } from "@/lib/images";

const mouImages = [siteImages.mou(1), siteImages.mou(2), siteImages.mou(3)];

export function MouView({ locale }: { locale: Locale }) {
  const content = mouContent[locale];

  return (
    <StaticPageShell {...getStaticPageHero("mou", locale)} contentClassName="max-w-5xl">
      <div className="max-w-3xl">
        <h2 className="heading-section text-xl md:text-2xl">{getUiLabel(locale, "whatIsMou")}</h2>
        <p className="mt-4 text-brand-muted">{content.definition}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {content.pillars.map((pillar) => (
            <article key={pillar.title} className="brand-card p-5">
              <h3 className="font-semibold text-brand-accent">{pillar.title}</h3>
              <p className="mt-2 text-sm text-brand-muted">{pillar.description}</p>
            </article>
          ))}
        </div>
        <blockquote className="mt-10 border-l-4 border-brand-accent pl-4 italic text-brand-muted">
          {content.quote}
        </blockquote>
        <p className="mt-6 font-semibold text-brand-ink">
          <a href={`mailto:${content.cta.split(": ")[1]}`}>{content.cta}</a>
        </p>
      </div>
      <section className="mt-12">
        <h2 className="heading-section mb-6 text-center text-xl md:text-2xl">
          {getUiLabel(locale, "mouGallery")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {mouImages.map((src) => (
            <div
              key={src}
              className="relative aspect-[4/3] overflow-hidden rounded-xl border border-brand-border/60 shadow-sm"
            >
              <Image src={src} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>
    </StaticPageShell>
  );
}
