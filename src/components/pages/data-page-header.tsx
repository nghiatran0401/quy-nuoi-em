import type { PageHero as PageHeroContent } from "@/content/types";

type DataPageHeaderProps = PageHeroContent;

export function DataPageHeader({ eyebrow, title, description }: DataPageHeaderProps) {
  return (
    <div className="banner-primary">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {eyebrow ? (
          <p className="eyebrow mb-2">{eyebrow}</p>
        ) : null}
        <h1 className="heading-page">{title}</h1>
        {description ? <p className="text-body mt-3 max-w-2xl text-base sm:text-lg">{description}</p> : null}
      </div>
    </div>
  );
}
