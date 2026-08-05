import Image from "next/image";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import {
  impactJourneySectionCopy,
  type ImpactInitiative,
  type ImpactMilestone,
} from "@/content/home-impact-journey";

type InfrastructureCopy = typeof impactJourneySectionCopy.infrastructure;

function SectionRule() {
  return <div className="my-8 h-0 border-t-4 border-brand-highlight lg:my-10" aria-hidden />;
}

function MilestoneHeading({ milestone }: { milestone: ImpactMilestone }) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-border/80 bg-brand-sky-soft text-brand-green">
        <MessageCircle className="h-4 w-4" strokeWidth={2.25} aria-hidden />
      </span>
      <h3 className="font-heading text-lg font-extrabold uppercase leading-snug tracking-tight text-brand-ink sm:text-xl md:text-2xl">
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
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    <article className="relative rounded-2xl border border-brand-border/70 bg-white/90 p-4 shadow-[var(--shadow-brand-soft)] sm:p-6 lg:p-7" aria-labelledby={`impact-${milestone.id}`}>
      <MilestoneHeading milestone={milestone} />
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
        <div id={`impact-${milestone.id}`} className="home-prose">
          <p className="text-body text-[15px] leading-relaxed sm:text-base">{milestone.body}</p>
          {milestone.footer ? (
            <p className="text-body mt-5 text-sm leading-relaxed text-brand-muted">{milestone.footer}</p>
          ) : null}
        </div>
        <div>{variant === "grid" ? <InitiativeGrid items={milestone.initiatives} /> : <InitiativeStack items={milestone.initiatives} />}</div>
      </div>
    </article>
  );
}

function InfrastructureFundBlock({ infra }: { infra: InfrastructureCopy }) {
  return (
    <article className="mx-auto max-w-4xl text-center" aria-labelledby="impact-infra-heading">
      <p className="eyebrow">{infra.eyebrow}</p>
      <h3 id="impact-infra-heading" className="heading-display mt-2 text-2xl md:text-3xl">
        {infra.title}
      </h3>
      <p className="mt-3 font-heading text-2xl font-extrabold tabular-nums text-brand-accent sm:text-3xl md:text-4xl">
        {infra.amount}
      </p>
      <p className="mt-1 text-sm font-bold uppercase tracking-wide text-brand-ink">{infra.subtitle}</p>

      <p className="home-prose mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-brand-muted sm:text-base">
        {infra.body.split(infra.bodyEmphasis).map((part, i, arr) =>
          i < arr.length - 1 ? (
            <span key={part.slice(0, 12)}>
              {part}
              <strong className="font-semibold text-brand-ink">{infra.bodyEmphasis}</strong>
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
        {infra.ctaLabel}
        <ArrowUpRight className="h-4 w-4" aria-hidden />
      </a>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-brand-border/70">
            <Image
              src={infra.beforeImage}
              alt={infra.beforeImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 360px"
            />
          </div>
          <figcaption className="mt-2 text-sm font-medium text-brand-muted">{infra.beforeLabel}</figcaption>
        </figure>
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-brand-border/70">
            <Image
              src={infra.afterImage}
              alt={infra.afterImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 360px"
            />
          </div>
          <figcaption className="mt-2 text-sm font-medium text-brand-ink">{infra.afterLabel}</figcaption>
        </figure>
      </div>

      {infra.pauseNote ? (
        <div className="mt-8 rounded-2xl border border-brand-accent/25 bg-gradient-to-br from-brand-accent/[0.08] via-white to-brand-warm/70 px-4 py-4 text-left sm:px-6 sm:py-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-accent-dark">
            {infra.pauseNote.eyebrow}
          </p>
          <p className="mt-2 text-pretty text-[15px] leading-relaxed text-brand-ink sm:text-base">
            {infra.pauseNote.body}
          </p>
        </div>
      ) : null}
    </article>
  );
}

export function ImpactJourneySection({
  content,
}: {
  content?: typeof impactJourneySectionCopy;
}) {
  const copy = content ?? impactJourneySectionCopy;
  const [m2018, m2019] = copy.milestones;
  const infra = copy.infrastructure;

  return (
    <section className="home-section-pad bg-white" aria-label="Hành trình mở rộng Quỹ Nuôi Em">
      <div className="page-container">
        <div className="space-y-5">
          <MilestoneBlock milestone={m2018} variant="stack" />
          <MilestoneBlock milestone={m2019} variant="grid" />
        </div>

        <SectionRule />

        <InfrastructureFundBlock infra={infra} />

        <SectionRule />

      </div>
    </section>
  );
}
