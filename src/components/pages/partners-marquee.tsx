import Image from "next/image";
import { partnerSlugs } from "@/content/shared/partners";
import { partnerLogo } from "@/lib/images";

type PartnersMarqueeProps = {
  title: string;
};

export function PartnersMarquee({ title }: PartnersMarqueeProps) {
  const logos = [...partnerSlugs, ...partnerSlugs];

  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="mb-8 text-center font-heading text-2xl font-bold text-brand-blue">{title}</h2>
        <div className="overflow-hidden">
          <div className="animate-scroll flex w-max gap-8">
            {logos.map((slug, index) => (
              <div
                key={`${slug}-${index}`}
                className="flex h-20 w-36 shrink-0 items-center justify-center rounded-lg bg-white p-3 shadow-sm"
              >
                <Image
                  src={partnerLogo(slug)}
                  alt={slug}
                  width={120}
                  height={60}
                  className="max-h-14 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
