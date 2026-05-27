import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeProcessOverview } from "@/content/home-process-overview";

export function ProcessOverviewSection({
  content,
}: {
  content?: typeof homeProcessOverview;
}) {
  const copy = content ?? homeProcessOverview;

  return (
    <section className="relative overflow-hidden section-warm py-20 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgb(240 120 74 / 0.12), transparent 44%), radial-gradient(circle at 88% 80%, rgb(216 236 248 / 0.35), transparent 42%)",
        }}
      />
      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <header className="mx-auto max-w-5xl text-center">
          <p className="font-heading text-sm font-semibold tracking-wide text-brand-green md:text-base">{copy.eyebrow}</p>
          <h2 className="heading-display mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">{copy.title}</h2>
          <p className="mt-3 text-sm text-brand-muted md:text-base">{copy.subtitle}</p>
        </header>

        <div className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-2xl border border-brand-border/80 bg-white shadow-[var(--shadow-brand-card)]">
          <Image
            src={copy.guideImage}
            alt="Sơ đồ tổng quan 6 bước nhận mã Nuôi Em"
            width={1200}
            height={430}
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {copy.cards.map((card) => (
            <article
              key={card.number}
              className="relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-2xl border border-brand-border/80 bg-white"
            >
              <span className="absolute left-3 top-2 z-10 font-heading text-5xl font-black leading-none text-brand-accent/90">
                {card.number}
              </span>
              <div className="relative aspect-[5/3] w-full overflow-hidden border-b border-brand-border/70 bg-brand-sky-soft pl-8 pt-4">
                <Image src={card.image} alt="" fill className="object-contain p-3 opacity-95" sizes="(max-width: 768px) 100vw, 33vw" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-sky-soft/80 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col px-4 pb-4 pt-3 md:px-5">
                <h3 className="font-heading text-lg font-bold text-brand-ink md:text-xl">{card.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">{card.summary}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/quy-trinh-cap-ma-2026" className="btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm">
            Tìm hiểu thêm
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="mt-8 rounded-2xl border border-brand-accent/25 bg-brand-highlight-soft p-5 text-brand-ink shadow-[var(--shadow-brand-soft)]">
          <h3 className="font-heading text-xl font-extrabold uppercase text-brand-red">{copy.notesTitle}</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed sm:text-base">
            {copy.notes.map((note) => (
              <li key={note} className="flex gap-2">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-accent" aria-hidden />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
