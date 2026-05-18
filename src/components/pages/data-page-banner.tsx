import type { PageHero as PageHeroContent } from "@/content/types";

type DataPageBannerProps = PageHeroContent;

export function DataPageBanner({ eyebrow, title, description }: DataPageBannerProps) {
  return (
    <section className="bg-brand-deep text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        {eyebrow ? (
          <p className="eyebrow-on-dark mb-3">{eyebrow}</p>
        ) : null}
        <h1 className="mb-4 font-heading text-3xl font-bold md:text-4xl">{title}</h1>
        {description ? (
          <p className="max-w-2xl text-lg leading-relaxed text-on-primary">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
