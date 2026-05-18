import type { PageHero as PageHeroContent } from "@/content/types";

type DataPageHeaderProps = PageHeroContent;

export function DataPageHeader({ eyebrow, title, description }: DataPageHeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {eyebrow ? (
          <p className="eyebrow mb-2">{eyebrow}</p>
        ) : null}
        <h1 className="heading-display mb-4 text-3xl">{title}</h1>
        {description ? <p className="max-w-2xl text-gray-600">{description}</p> : null}
      </div>
    </div>
  );
}
