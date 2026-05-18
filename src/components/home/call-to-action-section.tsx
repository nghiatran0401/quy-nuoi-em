import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ctaSectionCopy } from "@/content/home-sections";
import { siteImages } from "@/lib/images";
import type { Locale } from "@/i18n/config";

type Props = { locale: Locale };

export function CallToActionSection({ locale }: Props) {
  const copy = ctaSectionCopy[locale];

  return (
    <section className="relative overflow-hidden bg-brand-blue py-20">
      <div className="absolute inset-0 z-0">
        <Image
          src={siteImages.ctaBackground}
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-blue/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/95 via-transparent to-brand-blue/95" />
      </div>
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h2 className="mb-8 font-heading text-3xl font-bold uppercase tracking-wide text-white md:text-4xl">
          {copy.title}
        </h2>
        <div className="mx-auto mb-10 max-w-3xl space-y-6 font-body text-lg leading-relaxed text-blue-50">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/dong-gop"
            className="rounded-full bg-brand-green px-8 py-3 text-lg font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-brand-green-light hover:shadow-xl"
          >
            {copy.donate}
          </Link>
          <Link
            href="/bao-cao"
            className="rounded-full border border-white/30 bg-white/10 px-8 py-3 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            {copy.reports}
          </Link>
        </div>
      </div>
    </section>
  );
}
