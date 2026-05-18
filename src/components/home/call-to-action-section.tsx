import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ctaSectionCopy } from "@/content/home-sections";
import { siteImages } from "@/lib/images";
import type { Locale } from "@/i18n/config";

type Props = { locale: Locale };

export function CallToActionSection({ locale }: Props) {
  const copy = ctaSectionCopy[locale];

  return (
    <section className="relative overflow-hidden bg-brand-deep py-20">
      <div className="absolute inset-0 z-0">
        <Image
          src={siteImages.ctaBackground}
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-deep/88 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/35 to-brand-deep-mid/85" />
      </div>
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h2 className="heading-display mb-8 text-3xl text-white md:text-4xl">
          {copy.title}
        </h2>
        <div className="mx-auto mb-10 max-w-3xl space-y-6 font-body text-lg leading-relaxed text-on-primary">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/dong-gop"
            className="btn-on-dark"
          >
            {copy.donate}
          </Link>
          <Link
            href="/bao-cao"
            className="btn-ghost-on-dark"
          >
            {copy.reports}
          </Link>
        </div>
      </div>
    </section>
  );
}
