import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ctaSectionCopy } from "@/content/home-sections";
import { siteImages } from "@/lib/images";
import type { Locale } from "@/i18n/config";
import type { HomeCtaContent } from "@/lib/data/homepage";

type Props = { locale: Locale; content?: HomeCtaContent };

export function CallToActionSection({ locale, content }: Props) {
  const copy = content ?? ctaSectionCopy[locale];

  return (
    <section className="cta-warm">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={siteImages.ctaBackground}
          alt=""
          fill
          className="object-cover opacity-[0.18]"
          sizes="100vw"
        />
      </div>
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h2 className="heading-display mb-8 text-3xl md:text-4xl">{copy.title}</h2>
        <div className="text-body mx-auto mb-10 max-w-3xl space-y-6 text-lg">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/dong-gop" className="btn-primary">
            {copy.donate}
          </Link>
          <Link href="/bao-cao" className="btn-secondary">
            {copy.reports}
          </Link>
        </div>
      </div>
    </section>
  );
}
