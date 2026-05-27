import Image from "next/image";
import { homeMemberImages } from "@/content/home";
import { membersSectionCopy } from "@/content/home-sections";
import { homeMediaImageSrc } from "@/lib/data/home-media";
import type { HomeMembersContent } from "@/lib/data/homepage";

type Props = { content?: HomeMembersContent; memberImageUrls: string[] };

/** 5 bằng khen bên phải — lưới 3×2 như nuoiem.com */
const awardLayout = [
  { index: 1, className: "col-span-2 aspect-[5/4] min-h-[180px] md:min-h-[220px]" },
  { index: 2, className: "col-span-1 row-span-1 aspect-[3/4] min-h-[200px] md:min-h-[280px]" },
  { index: 3, className: "col-span-1 aspect-square min-h-[120px]" },
  { index: 4, className: "col-span-1 aspect-[4/5] min-h-[140px]" },
  { index: 5, className: "col-span-1 aspect-[4/5] min-h-[140px]" },
] as const;

export function MembersSection({ content, memberImageUrls }: Props) {
  const copy = content ?? membersSectionCopy;
  const eyebrow = copy.eyebrow?.trim();
  const cta = copy.cta?.trim();

  return (
    <section className="section-warm overflow-hidden py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <div className="order-2 w-full lg:order-1 lg:w-5/12">
            {eyebrow ? <h2 className="eyebrow mb-4">{eyebrow}</h2> : null}
            <h3 className="heading-display mb-6 text-3xl leading-tight md:text-5xl">
              {copy.title}
            </h3>
            <div className="text-body space-y-5 text-justify text-lg lg:text-left">
              {copy.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 20)}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="order-1 w-full lg:order-2 lg:w-7/12">
            <div className="grid grid-cols-3 grid-rows-2 gap-3 md:gap-4">
              {awardLayout.map(({ index, className }) => {
                const item = homeMemberImages[index - 1];
                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg ${className}`}
                  >
                    <Image
                      src={homeMediaImageSrc(memberImageUrls[index - 1] ?? "")}
                      alt={item.alt}
                      fill
                      className="object-contain p-1 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
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
