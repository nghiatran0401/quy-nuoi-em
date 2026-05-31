import Image from "next/image";
import type { PartnerLogoDisplay } from "@/lib/data/partner-logos";

type PartnersMarqueeProps = {
  title: string;
  logos: PartnerLogoDisplay[];
  variant?: "home" | "about";
};

function MarqueeLogo({
  logo,
  variant,
}: {
  logo: PartnerLogoDisplay;
  variant: "home" | "about";
}) {
  const isHome = variant === "home";
  const className = isHome
    ? "mx-4 flex h-16 w-28 items-center justify-center md:mx-8 md:h-20 md:w-36"
    : "flex h-20 w-40 shrink-0 items-center justify-center rounded-lg bg-white p-3 shadow-sm";

  const image = (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={160}
      height={80}
      className="max-h-full max-w-full object-contain"
      style={{ width: "auto", height: "auto" }}
    />
  );

  if (logo.href) {
    return (
      <a
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        title={logo.alt}
      >
        {image}
      </a>
    );
  }

  return <div className={className}>{image}</div>;
}

export function PartnersMarquee({ title, logos, variant = "about" }: PartnersMarqueeProps) {
  const looped = logos.length > 0 ? [...logos, ...logos] : [];
  const isHome = variant === "home";

  return (
    <section
      className={isHome ? "section-surface overflow-hidden py-12" : "section-surface py-12"}
      data-testid="partner-marquee"
    >
      <div className={`mx-auto max-w-7xl px-4 ${isHome ? "mb-8 text-center" : "sm:px-6"}`}>
        <h3
          className={
            isHome
              ? "eyebrow"
              : "heading-section mb-8 text-center"
          }
        >
          {title}
        </h3>
      </div>
      {looped.length > 0 ? (
        <div className="relative w-full overflow-hidden">
          {isHome ? (
            <>
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-brand-surface to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-brand-surface to-transparent" />
            </>
          ) : null}
          <div className="animate-scroll flex w-max gap-8 hover:[animation-play-state:paused]">
            {looped.map((logo, index) => (
              <MarqueeLogo
                key={`${logo.id ?? logo.src}-${index}`}
                logo={logo}
                variant={variant}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
