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
        <h2 className="font-heading text-xl font-bold text-brand-blue">{getUiLabel(locale, "whatIsMou")}</h2>
        <p className="mt-4 text-gray-600">{content.definition}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {content.pillars.map((pillar) => (
            <article key={pillar.title} className="brand-card p-5">
              <h3 className="font-semibold text-brand-accent">{pillar.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{pillar.description}</p>
            </article>
          ))}
        </div>
        <blockquote className="mt-10 border-l-4 border-brand-accent pl-4 italic text-gray-700">
          {content.quote}
        </blockquote>
        <p className="mt-6 font-semibold text-brand-blue">
          <a href={`mailto:${content.cta.split(": ")[1]}`}>{content.cta}</a>
        </p>
      </div>
      <section className="mt-12">
        <h2 className="mb-6 text-center font-heading text-xl font-bold text-brand-blue">
          {getUiLabel(locale, "mouGallery")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {mouImages.map((src) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image src={src} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>
    </StaticPageShell>
  );
}
