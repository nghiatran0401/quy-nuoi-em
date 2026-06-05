import type { PageHero as PageHeroContent } from "@/content/types";

type DataPageBannerProps = PageHeroContent;

export function DataPageBanner({ eyebrow, title, description }: DataPageBannerProps) {
  return (
    <section className="banner-primary">
      <div className="page-container py-10 sm:py-12 md:py-16">
        {eyebrow ? (
          <p className="eyebrow mb-3">{eyebrow}</p>
        ) : null}
        <h1 className="heading-page mb-4">{title}</h1>
        {description ? (
          <p className="text-body max-w-2xl text-base sm:text-lg">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
