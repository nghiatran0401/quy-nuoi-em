import Image from "next/image";
import { nuoiEmMediaLogos } from "@/lib/images";

type PartnersMarqueeProps = {
  title: string;
  variant?: "home" | "about";
};

export function PartnersMarquee({ title, variant = "about" }: PartnersMarqueeProps) {
  const logos = [...nuoiEmMediaLogos, ...nuoiEmMediaLogos];
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
      <div className="relative w-full overflow-hidden">
        {isHome ? (
          <>
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-brand-surface to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-brand-surface to-transparent" />
          </>
        ) : null}
        <div className="animate-scroll flex w-max gap-8 hover:[animation-play-state:paused]">
          {logos.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className={
                isHome
                  ? "mx-4 flex h-16 w-28 items-center justify-center opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:mx-8 md:h-20 md:w-36"
                  : "flex h-20 w-40 shrink-0 items-center justify-center rounded-lg bg-white p-3 shadow-sm"
              }
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={80}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
