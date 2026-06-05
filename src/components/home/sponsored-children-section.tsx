import Image from "next/image";
import { sponsoredChildrenSectionCopy } from "@/content/homepage-content";

export function SponsoredChildrenSection({
  content,
}: {
  content?: typeof sponsoredChildrenSectionCopy;
}) {
  const copy = content ?? sponsoredChildrenSectionCopy;
  return (
    <section className="section-elevated pb-14 pt-6 lg:pb-16 lg:pt-8">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center lg:gap-12">
          <div>
            <div className="text-center lg:text-left">
              <h2 className="font-heading text-xl font-extrabold uppercase leading-snug tracking-tight text-brand-ink md:text-2xl">
                {copy.title}
                <span className="mt-1 block text-base font-bold normal-case text-brand-muted md:text-lg">
                  {copy.titleNote}
                </span>
              </h2>
              <p className="mt-4 text-center text-base leading-relaxed text-brand-muted">{copy.subtitle}</p>
            </div>

            <div className="home-prose mt-8 grid grid-cols-1 gap-6 text-left sm:grid-cols-2 sm:gap-x-8 sm:gap-y-7">
              {copy.features.map((feature) => (
                <div key={feature.title} className="flex gap-3">
                  <div className="relative h-12 w-12 shrink-0">
                    <Image
                      src={feature.icon}
                      alt=""
                      fill
                      className="object-contain"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold uppercase leading-snug text-brand-ink">
                      {feature.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-[220px] sm:max-w-[240px] lg:max-w-[260px]">
              <Image
                src={copy.exampleImage}
                alt={copy.exampleImageAlt}
                width={975}
                height={1300}
                className="h-auto w-full"
                sizes="(max-width: 640px) 220px, (max-width: 1024px) 240px, 260px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
