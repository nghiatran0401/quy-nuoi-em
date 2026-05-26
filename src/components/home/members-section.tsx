import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { homeMemberImages } from "@/content/home";
import { membersSectionCopy } from "@/content/home-sections";
import { siteImages } from "@/lib/images";
import type { Locale } from "@/i18n/config";
import type { HomeMembersContent } from "@/lib/data/homepage";

type Props = { locale: Locale; content?: HomeMembersContent };

const memberLayout = [
  { index: 1, className: "col-span-full aspect-[4/3] md:col-span-4" },
  { index: 2, className: "col-span-full aspect-[4/3] md:col-span-2 md:aspect-auto" },
  { index: 3, className: "col-span-1 aspect-square md:col-span-2" },
  { index: 4, className: "col-span-1 aspect-square md:col-span-2" },
  { index: 5, className: "col-span-full aspect-video md:col-span-2 md:aspect-square" },
] as const;

export function MembersSection({ locale, content }: Props) {
  const copy = content ?? membersSectionCopy[locale];

  return (
    <section className="section-warm overflow-hidden py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <div className="order-2 w-full lg:order-1 lg:w-5/12">
            <h2 className="eyebrow mb-4">{copy.eyebrow}</h2>
            <h3 className="heading-display mb-6 text-3xl leading-tight md:text-5xl">
              {copy.title}
            </h3>
            <div className="text-body space-y-5 text-justify text-lg lg:text-left">
              {copy.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 20)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 flex justify-center lg:justify-start">
              <Link
                href="/thanh-vien-quy"
                className="btn-primary group gap-2 px-8 py-4 text-lg"
              >
                {copy.cta}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <div className="order-1 w-full lg:order-2 lg:w-7/12">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
              {memberLayout.map(({ index, className }) => {
                const item = homeMemberImages[index - 1];
                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-2xl shadow-lg ${className}`}
                  >
                    <Image
                      src={siteImages.member(index)}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    {index === 1 ? (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
