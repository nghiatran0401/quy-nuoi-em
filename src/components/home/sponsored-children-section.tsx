import Image from "next/image";
import { sponsoredChildrenSectionCopy } from "@/content/home-sections";
import { homeMediaImageSrc } from "@/lib/data/home-media";

export function SponsoredChildrenSection({
  content,
}: {
  content?: typeof sponsoredChildrenSectionCopy;
}) {
  const copy = content ?? sponsoredChildrenSectionCopy;
  return (
    <section className="section-elevated pb-14 pt-6 lg:pb-16 lg:pt-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="font-heading text-xl font-extrabold uppercase leading-snug tracking-tight text-brand-ink md:text-2xl">
              {copy.title}
              <span className="mt-1 block text-base font-bold normal-case text-brand-muted md:text-lg">
                {copy.titleNote}
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-muted">{copy.subtitle}</p>
          </div>

            <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-6 text-left sm:grid-cols-2 sm:gap-x-8 sm:gap-y-7">
              {copy.features.map((feature) => (
                <div key={feature.title} className="flex gap-3">
                  <div className="relative h-12 w-12 shrink-0">
                    <Image
                      src={homeMediaImageSrc(feature.icon)}
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

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:mt-12">
          {copy.albums.map((album) => (
            <article key={album.label} className="flex flex-col items-center text-center">
              <div className="relative mb-4 aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-xl shadow-md md:max-w-none">
                <Image
                  src={homeMediaImageSrc(album.previewImage)}
                  alt={`Album ảnh bé — ${album.label}`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 80vw, 30vw"
                />
              </div>
              <h3 className="font-heading text-base font-bold leading-snug text-brand-ink">
                {album.label}
                <span className="block text-sm font-semibold text-brand-muted">{album.region}</span>
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
