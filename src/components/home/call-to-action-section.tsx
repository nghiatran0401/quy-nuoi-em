import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { YoutubeEmbed } from "@/components/shared/youtube-embed";
import { resolveHomeCampaignContent, type HomeCtaContent } from "@/lib/data/homepage";
import type { HomeEcosystemCard } from "@/content/home-campaign";

type Props = { content?: HomeCtaContent; ctaImageUrl?: string };

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
          <p className="text-body mt-2 flex-1 text-sm leading-relaxed">{card.detail}</p>
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

export function CallToActionSection({ content }: Props) {
  const copy = resolveHomeCampaignContent(content);

  return (
    <section
      className="relative overflow-hidden border-y border-brand-border/40 bg-[#faf6ee] py-14 lg:py-20"
      aria-labelledby="home-campaign-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgb(255 232 214 / 0.5), transparent 45%), radial-gradient(circle at 80% 90%, rgb(216 236 248 / 0.45), transparent 40%)",
        }}
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        {/* Hệ sinh thái — 3 thẻ */}
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {copy.ecosystem.map((card) => (
            <EcosystemCard key={card.title} card={card} />
          ))}
        </div>

        {/* Mở mã mùa 12 */}
        <div className="mt-14 text-center md:mt-16">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {copy.logos.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={48}
                className={logo.className ?? "h-10 w-auto"}
              />
            ))}
          </div>

          <h2
            id="home-campaign-heading"
            className="heading-display mx-auto mt-8 max-w-4xl text-2xl leading-tight text-brand-accent md:text-4xl lg:text-[2.35rem]"
          >
            {copy.campaign.headline}
          </h2>
          <p className="mt-4 font-heading text-lg font-bold text-brand-ink md:text-xl">{copy.campaign.phase}</p>
          <p className="mt-2 text-base font-semibold text-brand-muted md:text-lg">{copy.campaign.goal}</p>

          <div
            className="mx-auto mt-8 h-0 w-full max-w-3xl border-t-2 border-dashed border-brand-accent/50"
            aria-hidden
          />
        </div>

        {/* Câu chuyện + ảnh truyền thông */}
        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-2 lg:items-center lg:gap-10">
          <div className="relative rounded-[2rem] border-2 border-brand-accent/35 bg-gradient-to-br from-brand-accent/15 via-brand-peach/30 to-brand-highlight-soft p-6 shadow-[var(--shadow-brand-soft)] sm:p-8 lg:min-h-0">
            <div
              className="pointer-events-none absolute -top-3 left-8 h-6 w-10 rounded-t-lg bg-brand-accent/20"
              aria-hidden
            />
            <div className="space-y-4 text-justify text-[15px] leading-relaxed text-brand-ink sm:text-base">
              {copy.story.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
            <Link
              href={copy.story.ctaHref}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#5c4033] px-8 py-4 text-center text-base font-bold text-white shadow-md transition hover:bg-[#4a3329] active:scale-[0.98] sm:w-auto"
            >
              {copy.story.ctaLabel}
            </Link>
          </div>

          <div className="rounded-[2rem] border-2 border-brand-accent/20 bg-white/80 p-2 shadow-[var(--shadow-brand-soft)] backdrop-blur-sm sm:p-2.5">
            <YoutubeEmbed videoId={copy.media.youtubeId} title={copy.media.title} />
          </div>
        </div>
      </div>
    </section>
  );
}
