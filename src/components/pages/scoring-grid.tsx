import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ScoringCategory } from "@/content/types";
import { siteImage } from "@/lib/images";

type ScoringGridProps = {
  categories: ScoringCategory[];
  totalLabel: string;
  maxLabel: string;
  referenceLabel: string;
  processLinkLabel: string;
};

export function ScoringGrid({
  categories,
  totalLabel,
  maxLabel,
  referenceLabel,
  processLinkLabel,
}: ScoringGridProps) {
  return (
    <div>
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold text-gray-500">{totalLabel}</p>
        <p className="font-heading text-4xl font-black text-brand-blue">
          0<span className="text-2xl text-gray-400">{maxLabel}</span>
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <article key={category.title} className="brand-card p-5">
            <p className="text-2xl">{category.icon}</p>
            <h3 className="mt-2 font-heading font-bold text-brand-blue">{category.title}</h3>
            <ul className="mt-4 space-y-3">
              {category.items.map((item) => (
                <li key={item.label} className="rounded-lg bg-brand-warm p-3 text-sm">
                  <p className="font-semibold text-brand-accent">{item.priority}</p>
                  <p className="font-medium text-gray-800">{item.label}</p>
                  <p className="text-brand-blue">{item.points}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <section className="mt-12">
        <h2 className="mb-4 text-center font-heading text-xl font-bold text-brand-blue">{referenceLabel}</h2>
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-gray-100">
          <Image
            src={siteImage("/images/scoring/reference.png")}
            alt={referenceLabel}
            fill
            className="object-contain"
          />
        </div>
        <p className="mt-6 text-center">
          <Link href="/quy-trinh-xet-duyet" className="font-semibold text-brand-blue hover:underline">
            {processLinkLabel}
          </Link>
        </p>
      </section>
    </div>
  );
}
