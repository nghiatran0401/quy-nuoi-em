import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import {
  impactJourneySectionCopy,
  type ImpactInitiative,
  type ImpactMilestone,
} from "@/content/home-impact-journey";

function SectionRule() {
  return <div className="my-12 h-0 border-t-4 border-brand-highlight lg:my-14" aria-hidden />;
}

function MilestoneHeading({ milestone }: { milestone: ImpactMilestone }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-border/80 bg-brand-sky-soft text-brand-green">
        <MessageCircle className="h-4 w-4" strokeWidth={2.25} aria-hidden />
      </span>
      <h3 className="font-heading text-xl font-extrabold uppercase leading-snug tracking-tight text-brand-ink md:text-2xl">
        {milestone.titleBefore}
        <span className="rounded-sm bg-brand-highlight px-1.5 py-0.5 text-brand-ink">
          {milestone.titleHighlight}
        </span>
        {milestone.titleAfter}
      </h3>
    </div>
  );
}

function InitiativeStack({ items }: { items: readonly ImpactInitiative[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.title} className="flex gap-4 rounded-2xl border border-brand-border/70 bg-brand-warm/80 p-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white p-1.5 shadow-sm">
            <Image src={item.image} alt="" fill className="object-contain" sizes="64px" />
          </div>
          <div>
            <p className="font-heading text-sm font-bold text-brand-ink sm:text-base">{item.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-brand-muted">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function InitiativeGrid({ items }: { items: readonly ImpactInitiative[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <li
          key={item.title}
          className="flex flex-col items-center rounded-2xl border-2 border-brand-red/35 bg-white p-4 text-center shadow-sm"
        >
          <div className="relative mb-3 h-20 w-20">
            <Image src={item.image} alt="" fill className="object-contain" sizes="80px" />
          </div>
          <p className="font-heading text-sm font-bold text-brand-ink">{item.title}</p>
          <p className="mt-2 text-xs leading-relaxed text-brand-muted">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}

function MilestoneBlock({ milestone, variant }: { milestone: ImpactMilestone; variant: "stack" | "grid" }) {
  return (
    <article aria-labelledby={`impact-${milestone.id}`}>
      <MilestoneHeading milestone={milestone} />
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div id={`impact-${milestone.id}`}>
          <p className="text-body text-justify text-[15px] leading-relaxed sm:text-base">{milestone.body}</p>
          {milestone.footer ? (
            <p className="text-body mt-5 text-justify text-sm leading-relaxed text-brand-muted">{milestone.footer}</p>
          ) : null}
        </div>
        <div>{variant === "grid" ? <InitiativeGrid items={milestone.initiatives} /> : <InitiativeStack items={milestone.initiatives} />}</div>
      </div>
    </article>
  );
}

export function ImpactJourneySection() {
  const copy = impactJourneySectionCopy;
  const [m2018, m2019] = copy.milestones;
  const infra = copy.infrastructure;
  const results = copy.results;
  const banner = copy.banner;

  return (
    <section className="bg-white py-14 lg:py-20" aria-label="Hành trình mở rộng dự án Nuôi Em">
      <div className="container mx-auto max-w-7xl px-4">
        <MilestoneBlock milestone={m2018} variant="stack" />

        <SectionRule />

        <MilestoneBlock milestone={m2019} variant="grid" />

        <SectionRule />

        <article className="text-center" aria-labelledby="impact-infra-heading">
          <p className="eyebrow mb-3">{infra.eyebrow}</p>
          <h3 id="impact-infra-heading" className="heading-display text-2xl md:text-3xl lg:text-4xl">
            {infra.title}
          </h3>
          <p className="mt-2 font-heading text-3xl font-extrabold tabular-nums text-brand-accent md:text-4xl">
            {infra.amount}
          </p>
          <p className="mt-1 text-lg font-bold uppercase tracking-wide text-brand-ink">{infra.subtitle}</p>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 sm:gap-6">
            <figure className="overflow-hidden rounded-2xl border border-brand-border/80 shadow-[var(--shadow-brand-soft)]">
              <div className="relative aspect-[4/3]">
                <Image src={infra.beforeImage} alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, 400px" />
              </div>
              <figcaption className="bg-brand-warm px-3 py-2 text-sm font-semibold text-brand-muted">
                {infra.beforeLabel}
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-2xl border border-brand-border/80 shadow-[var(--shadow-brand-card)]">
              <div className="relative aspect-[4/3]">
                <Image src={infra.afterImage} alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, 400px" />
              </div>
              <figcaption className="bg-brand-highlight-soft px-3 py-2 text-sm font-semibold text-brand-ink">
                {infra.afterLabel}
              </figcaption>
            </figure>
          </div>

          <p className="text-body mx-auto mt-8 max-w-3xl text-justify text-[15px] leading-relaxed sm:text-base">
            {infra.body.split(infra.bodyEmphasis).map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={part.slice(0, 12)}>
                  {part}
                  <strong className="font-bold text-brand-red">{infra.bodyEmphasis}</strong>
                </span>
              ) : (
                <span key={part.slice(0, 12)}>{part}</span>
              ),
            )}
          </p>
          <a
            href={infra.schoolBuildUrl}
            target="_blank"
            rel="noreferrer"
            className="link-accent mt-4 inline-flex items-center gap-1 text-sm font-semibold"
          >
            {infra.schoolBuildUrl.replace("https://", "")}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        </article>

        <SectionRule />

        <article className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12" aria-labelledby="impact-results-heading">
          <div className="overflow-hidden rounded-2xl border border-brand-border/80 shadow-[var(--shadow-brand-card)]">
            <Image
              src={results.posterImage}
              alt={results.posterAlt}
              width={640}
              height={900}
              className="h-auto w-full object-contain"
            />
          </div>
          <div>
            <h3 id="impact-results-heading" className="heading-display mb-5 text-xl leading-snug md:text-2xl">
              {results.title}
            </h3>
            <p className="text-body text-justify text-[15px] leading-relaxed sm:text-base">{results.body}</p>
            <a
              href={results.linkHref}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary mt-8 inline-flex gap-2 px-6 py-3 text-sm"
            >
              {results.linkLabel}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </article>

        <SectionRule />

        <article className="relative overflow-hidden rounded-3xl border border-brand-border/80 shadow-[var(--shadow-brand-card)]">
          <div className="relative min-h-[280px] sm:min-h-[360px]">
            <Image src={banner.image} alt={banner.alt} fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-brand-ink/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/70 to-brand-ink/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-8 pt-16 text-center sm:pb-10">
              <div className="rounded-2xl border border-white/20 bg-brand-ink/35 px-5 py-4 backdrop-blur-[2px] sm:px-7">
                <p className="font-heading text-4xl font-extrabold tabular-nums text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)] sm:text-5xl">
                  {banner.stat}
                </p>
              {banner.lines.map((line) => (
                  <p
                    key={line}
                    className="mt-1 text-sm font-bold uppercase tracking-[0.12em] text-brand-highlight drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)] sm:text-base"
                  >
                    {line}
                  </p>
              ))}
              </div>
              <a
                href={banner.footerUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 rounded-md bg-brand-ink/45 px-2 py-1 text-sm font-semibold text-white underline-offset-4 backdrop-blur-[1px] hover:bg-brand-ink/55 hover:underline"
              >
                {banner.footerLabel}
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
