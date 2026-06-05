import type { PageHero as PageHeroContent } from "@/content/types";

type PageHeroProps = PageHeroContent & {
  centered?: boolean;
  className?: string;
};

export function PageHero({ eyebrow, title, description, centered = true, className = "" }: PageHeroProps) {
  return (
    <header
      className={`mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16 ${centered ? "text-center" : ""} ${className}`}
    >
      {eyebrow ? (
        <p className="eyebrow mb-3">{eyebrow}</p>
      ) : null}
        <h1 className="heading-page">{title}</h1>
        {description ? <p className="text-body mt-4 text-base sm:text-lg">{description}</p> : null}
    </header>
  );
}
