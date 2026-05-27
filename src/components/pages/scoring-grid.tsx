import Image from "next/image";
import Link from "next/link";
import type { ScoringCategory } from "@/content/types";
type ScoringGridProps = {
  categories: ScoringCategory[];
  totalLabel: string;
  maxLabel: string;
  referenceLabel: string;
  processLinkLabel: string;
  referenceImageUrl: string;
};

export function ScoringGrid({
  categories,
  totalLabel,
  maxLabel,
  referenceLabel,
  processLinkLabel,
  referenceImageUrl,
}: ScoringGridProps) {
  return (
    <div>
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold text-brand-muted">{totalLabel}</p>
        <p className="font-heading text-4xl font-black text-brand-ink">
          0<span className="text-2xl text-brand-muted/70">{maxLabel}</span>
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <article key={category.title} className="brand-card p-5">
            <p className="text-2xl">{category.icon}</p>
            <h3 className="mt-2 font-heading font-bold text-brand-ink">{category.title}</h3>
            <ul className="mt-4 space-y-3">
              {category.items.map((item) => (
                <li key={item.label} className="rounded-lg bg-brand-warm p-3 text-sm">
                  <p className="font-semibold text-brand-accent">{item.priority}</p>
                  <p className="font-medium text-brand-ink">{item.label}</p>
                  <p className="text-brand-ink">{item.points}</p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <section className="mt-12">
        <h2 className="mb-4 text-center font-heading text-xl font-bold text-brand-ink">{referenceLabel}</h2>
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-brand-border/60">
          <Image
            src={referenceImageUrl}
            alt={referenceLabel}
            fill
            className="object-contain"
          />
        </div>
        <p className="mt-6 text-center">
          <Link href="/quy-trinh-xet-duyet" className="link-accent">
            {processLinkLabel}
          </Link>
        </p>
      </section>
    </div>
  );
}
