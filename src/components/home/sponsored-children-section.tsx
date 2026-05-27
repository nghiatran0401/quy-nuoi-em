import Image from "next/image";
import Link from "next/link";
import { sponsoredChildrenSectionCopy } from "@/content/home-sections";
import { homeMediaImageSrc } from "@/lib/data/home-media";

const copy = sponsoredChildrenSectionCopy;

export function SponsoredChildrenSection() {
  return (
    <section className="section-elevated py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="font-heading text-xl font-extrabold uppercase leading-snug tracking-tight text-brand-ink md:text-2xl">
              {copy.title}
              <span className="mt-1 block text-base font-bold normal-case text-brand-muted md:text-lg">
                {copy.titleNote}
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-muted">{copy.subtitle}</p>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-7">
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
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:mt-14">
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
              <Link
                href={album.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-4 w-full max-w-[240px] rounded-lg px-6 py-3 text-sm font-bold uppercase tracking-wide md:max-w-none"
              >
                {copy.viewAlbum}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
