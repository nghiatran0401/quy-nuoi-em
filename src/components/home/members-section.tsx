import Image from "next/image";
import { homeMemberImages } from "@/content/home";
import { membersSectionCopy } from "@/content/home-sections";
import { homeMediaImageSrc } from "@/lib/data/home-media";
import type { HomeMembersContent } from "@/lib/data/homepage";

type Props = { content?: HomeMembersContent; memberImageUrls: string[] };

/** 5 bằng khen bên phải — lưới 3×2 như nuoiem.com */
const awardLayout = [
  { index: 1, className: "col-span-2 aspect-[16/10] min-h-[190px] md:min-h-[240px]" },
  { index: 2, className: "col-span-1 aspect-[4/5] min-h-[190px] md:min-h-[240px]" },
  { index: 3, className: "col-span-1 aspect-[16/10] min-h-[125px] md:min-h-[150px]" },
  { index: 4, className: "col-span-1 aspect-[16/10] min-h-[125px] md:min-h-[150px]" },
  { index: 5, className: "col-span-1 aspect-[16/10] min-h-[125px] md:min-h-[150px]" },
] as const;

export function MembersSection({ content, memberImageUrls }: Props) {
  const copy = content ?? membersSectionCopy;
  const eyebrow = copy.eyebrow?.trim();

  return (
    <section className="section-warm overflow-hidden pb-6 pt-14 lg:pb-8 lg:pt-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid items-start gap-7 lg:grid-cols-12 lg:gap-8">
          <div className="order-2 w-full lg:order-1 lg:col-span-5">
            {eyebrow ? <h2 className="eyebrow mb-4">{eyebrow}</h2> : null}
            <h3 className="heading-display mb-4 text-3xl leading-tight md:text-5xl">
              {copy.title}
            </h3>
            <div className="text-body max-w-xl space-y-3 text-base leading-relaxed text-brand-muted sm:text-lg lg:text-left">
              {copy.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 20)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="order-1 w-full lg:order-2 lg:col-span-7">
            <div className="grid grid-cols-3 grid-rows-2 gap-2.5 md:gap-3 lg:gap-3.5">
              {awardLayout.map(({ index, className }) => {
                const item = homeMemberImages[index - 1];
                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-2xl border border-brand-border/70 bg-white shadow-[var(--shadow-brand-soft)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-brand-card)] ${className}`}
                  >
                    <Image
                      src={homeMediaImageSrc(memberImageUrls[index - 1] ?? "")}
                      alt={item.alt}
                      fill
                      className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 33vw, 25vw"
                    />
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
