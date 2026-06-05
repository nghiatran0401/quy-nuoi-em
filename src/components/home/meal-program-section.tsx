import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { mealProgramSectionCopy } from "@/content/homepage-content";
import { YoutubeEmbed } from "@/components/shared/youtube-embed";

type MealProgramSectionProps = {
  content?: typeof mealProgramSectionCopy;
};

/** Keep common Vietnamese phrases on one line when the paragraph wraps. */
function protectLineBreaks(text: string): string {
  const phrases = [
    "địa phương",
    "gia đình",
    "đối ứng",
    "chi phí",
    "thứ Sáu",
    "trường chính",
    "giao ban",
    "mầm non",
    "Tiểu học",
    "Tây Nguyên",
    "cơ sở vật chất",
    "năm học",
    "8.500đ/suất",
    "6.800đ/suất",
  ];

  return phrases.reduce(
    (result, phrase) => result.replaceAll(phrase, phrase.replace(/ /g, "\u00A0")),
    text,
  );
}

function normalizeBlockText(text: string): string {
  return text.replace(/^\s*\d+\.\s+/, "");
}

export function MealProgramSection({ content }: MealProgramSectionProps) {
  const copy = content ?? mealProgramSectionCopy;

  return (
    <section
      className="border-b-[6px] border-brand-highlight bg-white home-section-pad"
      aria-labelledby="home-meal-heading"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-border/80 bg-brand-sky-soft text-brand-green">
                <MessageCircle className="h-5 w-5" strokeWidth={2.25} aria-hidden />
              </span>
              <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-brand-muted">
                {copy.since}
              </p>
            </div>

            <h2
              id="home-meal-heading"
              className="heading-display mb-6 text-2xl uppercase leading-tight tracking-tight text-brand-ink md:text-3xl lg:text-[2rem]"
            >
              {copy.title}
            </h2>

            <div className="space-y-5 text-left text-[15px] leading-relaxed text-brand-ink sm:text-base">
              {copy.blocks.map((block) => (
                <p key={block.label ?? block.text.slice(0, 28)} className="text-justify">
                  {block.label ? (
                    <span className="font-heading font-bold text-brand-ink">{block.label}: </span>
                  ) : null}
                  {protectLineBreaks(normalizeBlockText(block.text))}
                </p>
              ))}
            </div>

            <ul className="mt-8 flex flex-wrap gap-3">
              {copy.costs.map((cost) => (
                <li
                  key={cost.amount}
                  className="rounded-2xl border border-brand-accent/25 bg-brand-highlight-soft px-4 py-3"
                >
                  <span className="font-heading text-xl font-extrabold tabular-nums text-brand-accent-dark">
                    {cost.amount}
                  </span>
                  <span className="mt-0.5 block text-xs font-semibold text-brand-muted">{cost.note}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-brand-border/80 bg-brand-warm p-2 shadow-[var(--shadow-brand-card)] sm:p-2.5">
              <YoutubeEmbed
                videoId={copy.media.youtubeId}
                title={copy.media.title}
                roundedClassName="rounded-xl"
              />
            </div>

            <div className="flex flex-col items-center rounded-2xl border border-brand-border/60 bg-gradient-to-b from-brand-highlight-soft/80 to-white px-6 py-8 text-center">
              <div className="relative h-36 w-36 sm:h-40 sm:w-40">
                <Image
                  src={copy.mascot.image}
                  alt={copy.mascot.name}
                  fill
                  className="object-contain drop-shadow-md"
                  sizes="160px"
                />
              </div>
              <p className="mt-4 font-heading text-base font-bold text-brand-ink">{copy.mascot.caption}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
