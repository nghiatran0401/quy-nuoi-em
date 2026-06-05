import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { campaignSectionCopy, type HomeEcosystemCard } from "@/content/homepage-content";

const toneStyles: Record<HomeEcosystemCard["tone"], string> = {
  peach: "from-brand-peach/90 via-brand-highlight-soft to-brand-warm",
  sky: "from-brand-sky-soft via-white to-brand-sky/40",
  amber: "from-amber-100/90 via-brand-highlight-soft to-brand-peach/50",
};

function EcosystemCard({ card }: { card: HomeEcosystemCard }) {
  const inner = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={card.image} alt="" fill className="object-cover" sizes="(max-width: 768px) 90vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/50 via-transparent to-transparent" />
        {card.chips?.length ? (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {card.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-accent-dark shadow-sm"
              >
                {chip}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-brand-accent-dark">{card.description}</p>
        <h3 className="font-heading mt-1 text-base font-extrabold leading-snug text-brand-ink sm:text-lg">
          {card.title}
        </h3>
        {card.detail ? (
          <p className="text-body home-prose mt-2 flex-1 text-sm leading-relaxed">{card.detail}</p>
        ) : null}
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-accent-dark">
          {card.ctaLabel}
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
    </>
  );

  const className = `group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-border/70 bg-gradient-to-br ${toneStyles[card.tone]} shadow-[var(--shadow-brand-soft)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-brand-card)]`;

  if (card.external) {
    return (
      <a href={card.href} target="_blank" rel="noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={card.href} className={className}>
      {inner}
    </Link>
  );
}

type HomeEcosystemSectionProps = {
  ecosystem?: readonly HomeEcosystemCard[];
  eyebrow?: string;
  title?: string;
};

export function HomeEcosystemSection({
  ecosystem = campaignSectionCopy.ecosystem,
  eyebrow = campaignSectionCopy.ecosystemSection.eyebrow,
  title = campaignSectionCopy.ecosystemSection.title,
}: HomeEcosystemSectionProps) {
  return (
    <section
      className="relative overflow-hidden border-y border-brand-border/40 bg-[#faf6ee] home-section-pad"
      aria-labelledby="home-ecosystem-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgb(255 232 214 / 0.5), transparent 45%), radial-gradient(circle at 80% 90%, rgb(216 236 248 / 0.45), transparent 40%)",
        }}
        aria-hidden
      />

      <div className="page-container relative z-10">
        <header className="mx-auto mb-7 max-w-3xl text-center sm:mb-8">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="home-ecosystem-heading" className="heading-section-xl mt-2">
            {title}
          </h2>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {ecosystem.map((card) => (
            <EcosystemCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
