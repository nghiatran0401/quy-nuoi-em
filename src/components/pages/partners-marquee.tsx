import Image from "next/image";
import { partnerSlugs } from "@/content/shared/partners";
import { partnerLogo } from "@/lib/images";

type PartnersMarqueeProps = {
  title: string;
  variant?: "home" | "about";
};

export function PartnersMarquee({ title, variant = "about" }: PartnersMarqueeProps) {
  const logos = [...partnerSlugs, ...partnerSlugs];
  const isHome = variant === "home";

  return (
    <section
      className={isHome ? "overflow-hidden bg-white py-12" : "bg-gray-50 py-12"}
      data-testid="partner-marquee"
    >
      <div className={`mx-auto max-w-7xl px-4 ${isHome ? "mb-8 text-center" : "sm:px-6"}`}>
        <h3
          className={
            isHome
              ? "text-xl font-bold uppercase tracking-widest text-gray-500"
              : "mb-8 text-center font-heading text-2xl font-bold text-brand-blue"
          }
        >
          {title}
        </h3>
      </div>
      <div className="relative w-full overflow-hidden">
        {isHome ? (
          <>
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-white to-transparent" />
          </>
        ) : null}
        <div className="animate-scroll flex w-max gap-8 hover:[animation-play-state:paused]">
          {logos.map((slug, index) => (
            <div
              key={`${slug}-${index}`}
              className={
                isHome
                  ? "mx-4 flex h-16 w-24 items-center justify-center opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:mx-8 md:h-20 md:w-32"
                  : "flex h-20 w-36 shrink-0 items-center justify-center rounded-lg bg-white p-3 shadow-sm"
              }
            >
              <Image
                src={partnerLogo(slug)}
                alt={slug}
                width={128}
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
