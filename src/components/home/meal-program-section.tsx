import Image from "next/image";
import { MessageCircle } from "lucide-react";
import {
  mealProgramSectionCopy,
  type MealProgramBlock,
  type MealProgramListBlock,
  type MealProgramTextBlock as MealProgramTextBlockContent,
} from "@/content/homepage-content";
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

function isListBlock(block: MealProgramBlock): block is MealProgramListBlock {
  return "items" in block;
}

function MealProgramTextBlock({ block }: { block: MealProgramTextBlockContent }) {
  return (
    <p className="text-left sm:text-justify">
      {block.label ? (
        <span className="font-heading font-bold text-brand-ink">{block.label}: </span>
      ) : null}
      {protectLineBreaks(normalizeBlockText(block.text))}
    </p>
  );
}

function MealProgramCostList({ block }: { block: MealProgramListBlock }) {
  return (
    <div>
      <p className="font-heading font-bold text-brand-ink">{block.label}</p>
      <ul className="mt-3 list-none space-y-3">
        {block.items.map((item) => (
          <li
            key={item.amount}
            className="rounded-xl border border-brand-border/60 bg-brand-warm/50 px-4 py-3.5 sm:px-5 sm:py-4"
          >
            <p className="font-heading text-lg font-extrabold tabular-nums text-brand-accent-dark sm:text-xl">
              {item.amount}
            </p>
            <p className="mt-1.5 text-[15px] font-semibold leading-snug text-brand-ink sm:text-base">
              {item.audience}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">{item.breakdown}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MealProgramSection({ content }: MealProgramSectionProps) {
  const copy = content ?? mealProgramSectionCopy;

  return (
    <section
      className="border-b-[6px] border-brand-highlight bg-white home-section-pad"
      aria-labelledby="home-meal-heading"
    >
      <div className="page-container">
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
              className="heading-section-xl mb-6 uppercase"
            >
              {copy.title}
            </h2>

            <div className="space-y-5 text-left text-[15px] leading-relaxed text-brand-ink sm:text-base">
              {copy.blocks.map((block) =>
                isListBlock(block) ? (
                  <MealProgramCostList key={block.label} block={block} />
                ) : (
                  <MealProgramTextBlock key={block.label ?? block.text.slice(0, 28)} block={block} />
                ),
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
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
