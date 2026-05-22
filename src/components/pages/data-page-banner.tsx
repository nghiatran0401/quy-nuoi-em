import type { PageHero as PageHeroContent } from "@/content/types";

type DataPageBannerProps = PageHeroContent;

export function DataPageBanner({ eyebrow, title, description }: DataPageBannerProps) {
  return (
    <section className="banner-primary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {eyebrow ? (
          <p className="eyebrow mb-3">{eyebrow}</p>
        ) : null}
        <h1 className="heading-display mb-4 text-3xl md:text-4xl lg:text-[2.75rem]">{title}</h1>
        {description ? (
          <p className="text-body max-w-2xl text-lg">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
