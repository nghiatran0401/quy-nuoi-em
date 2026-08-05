import Image from "next/image";
import Link from "next/link";
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
    "9.000đ/suất",
    "7.300đ/suất",
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
  const paragraphs = block.paragraphs?.length
    ? block.paragraphs
    : block.text
      ? [block.text]
      : [];

  return (
    <div className="space-y-3 text-left">
      {block.label ? (
        <p className="font-heading font-bold text-brand-ink">{block.label}</p>
      ) : null}
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="text-pretty">
          {protectLineBreaks(normalizeBlockText(paragraph))}
        </p>
      ))}
    </div>
  );
}

function MealProgramCostList({ block }: { block: MealProgramListBlock }) {
  return (
    <div>
      <p className="font-heading font-bold text-brand-ink">{block.label}</p>
      <ul className="mt-3 list-none space-y-3">
        {block.items.map((item) => (
          <li
            key={`${block.label}-${item.amount}-${item.audience}`}
            className="rounded-xl border border-brand-border/60 bg-white/90 px-4 py-3.5 sm:px-5 sm:py-4"
          >
            <p className="font-heading text-lg font-extrabold tabular-nums text-brand-accent-dark sm:text-xl">
              {item.amount}
            </p>
            <p className="mt-1.5 text-[15px] font-semibold leading-snug text-brand-ink sm:text-base">
              {item.audience}
            </p>
            {item.breakdown?.trim() ? (
              <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">{item.breakdown}</p>
            ) : null}
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
        <div className="mb-4 flex flex-wrap items-center gap-3 sm:mb-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-brand-border/80 bg-brand-sky-soft text-brand-green sm:h-11 sm:w-11">
            <MessageCircle className="h-5 w-5" strokeWidth={2.25} aria-hidden />
          </span>
          <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-brand-muted">
            {copy.since}
          </p>
          <span className="rounded-full bg-brand-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-accent-dark">
            {copy.seasonLabel}
          </span>
        </div>

        <div className="mb-6 flex items-start gap-3 sm:mb-8 sm:items-center sm:gap-5">
          <h2
            id="home-meal-heading"
            className="heading-section-xl min-w-0 flex-1 text-balance uppercase"
          >
            {copy.title}
          </h2>
          <div className="relative h-16 w-16 shrink-0 sm:h-24 sm:w-24 md:h-28 md:w-28">
            <Image
              src={copy.mascot.image}
              alt={copy.mascot.caption}
              fill
              className="object-contain drop-shadow-md"
              sizes="(max-width: 640px) 64px, (max-width: 768px) 96px, 112px"
            />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:gap-10">
          <div className="space-y-5 text-[15px] leading-relaxed text-brand-ink sm:text-base">
            {copy.blocks.map((block, index) =>
              isListBlock(block) ? (
                <MealProgramCostList key={block.label} block={block} />
              ) : (
                <MealProgramTextBlock
                  key={block.label ?? `meal-text-${index}`}
                  block={block}
                />
              ),
            )}
            <p className="text-sm text-brand-muted">
              Mức tài trợ chi tiết xem tại{" "}
              <Link href="/#muc-tai-tro" className="link-accent font-semibold">
                phần mức đóng góp
              </Link>
              .
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-brand-border/80 bg-brand-warm p-2 shadow-[var(--shadow-brand-card)] sm:p-2.5 lg:sticky lg:top-24">
            <YoutubeEmbed
              videoId={copy.media.youtubeId}
              title={copy.media.title}
              roundedClassName="rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
