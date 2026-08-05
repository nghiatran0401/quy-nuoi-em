import Image from "next/image";
import { MessageCircle } from "lucide-react";
import {
  mealProgramSectionCopy,
  type MealProgramBlock,
  type MealProgramListBlock,
  type MealProgramPeriod,
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

function MealProgramTextBlock({
  block,
  showLabel = true,
}: {
  block: MealProgramTextBlockContent;
  showLabel?: boolean;
}) {
  const paragraphs = block.paragraphs?.length
    ? block.paragraphs
    : block.text
      ? [block.text]
      : [];

  return (
    <div className="space-y-3 text-left">
      {showLabel && block.label ? (
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

function MealProgramCostList({
  block,
  showLabel = true,
}: {
  block: MealProgramListBlock;
  showLabel?: boolean;
}) {
  return (
    <div>
      {showLabel ? <p className="font-heading font-bold text-brand-ink">{block.label}</p> : null}
      <ul className={`list-none space-y-3 ${showLabel ? "mt-3" : ""}`}>
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

function MealProgramBlockContent({
  block,
  showLabel = false,
}: {
  block: MealProgramBlock;
  showLabel?: boolean;
}) {
  if (isListBlock(block)) {
    return <MealProgramCostList block={block} showLabel={showLabel} />;
  }
  return <MealProgramTextBlock block={block} showLabel={showLabel} />;
}

function rowLabel(periods: typeof mealProgramSectionCopy.periods, rowIndex: number): string {
  for (const period of periods) {
    const block = period.blocks[rowIndex];
    if (block && "label" in block && block.label) {
      return block.label;
    }
  }
  return "";
}

function MealProgramPeriodPanel({
  period,
  tone,
}: {
  period: MealProgramPeriod;
  tone: "past" | "next";
}) {
  const isPast = tone === "past";

  return (
    <article
      className={`rounded-2xl border p-4 sm:p-5 ${
        isPast
          ? "border-brand-border/70 bg-brand-warm/45"
          : "border-brand-accent/25 bg-gradient-to-b from-brand-accent/[0.07] to-white"
      }`}
    >
      <header className="mb-4 border-b border-brand-border/50 pb-3">
        <p
          className={`text-[11px] font-bold uppercase tracking-[0.14em] ${
            isPast ? "text-brand-muted" : "text-brand-accent-dark"
          }`}
        >
          {period.shortLabel}
        </p>
        <h3 className="mt-1 font-heading text-base font-bold leading-snug text-brand-ink">
          {period.title}
        </h3>
      </header>

      <div className="space-y-5 text-[15px] leading-relaxed text-brand-ink sm:text-base">
        {period.blocks.map((block, index) => (
          <MealProgramBlockContent
            key={`${period.title}-${isListBlock(block) ? block.label : (block.label ?? index)}`}
            block={block}
            showLabel
          />
        ))}
      </div>
    </article>
  );
}

function MealProgramCompareTable({
  periods,
}: {
  periods: typeof mealProgramSectionCopy.periods;
}) {
  const rowCount = Math.max(...periods.map((period) => period.blocks.length), 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-border/70 bg-white shadow-[var(--shadow-brand-soft)]">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          So sánh dự án bữa cơm giữa các năm học trước đến 2025-2026 và từ năm học 2026-2027
        </caption>
        <thead>
          <tr className="border-b border-brand-border/60">
            {periods.map((period, groupIndex) => (
              <th
                key={period.title}
                scope="col"
                className={`w-1/2 px-5 py-4 align-bottom xl:px-6 ${
                  groupIndex === 0
                    ? "border-r border-brand-border/60 bg-brand-warm/80"
                    : "bg-brand-accent/10"
                }`}
              >
                <span
                  className={`block text-[11px] font-bold uppercase tracking-[0.14em] ${
                    groupIndex === 0 ? "text-brand-muted" : "text-brand-accent-dark"
                  }`}
                >
                  {period.shortLabel}
                </span>
                <span className="mt-1 block font-heading text-base font-bold leading-snug text-brand-ink">
                  {period.title}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <tr
              key={`meal-row-${rowIndex}`}
              className="border-t border-brand-border/50 align-top odd:bg-brand-warm/15"
            >
              {periods.map((period, groupIndex) => {
                const block = period.blocks[rowIndex];
                const label =
                  block && "label" in block && block.label ? block.label : rowLabel(periods, rowIndex);
                return (
                  <td
                    key={`${period.title}-${rowIndex}`}
                    className={`px-5 py-5 text-[15px] leading-relaxed text-brand-ink xl:px-6 xl:text-base ${
                      groupIndex === 0 ? "border-r border-brand-border/50" : ""
                    }`}
                  >
                    {block && label ? (
                      <p className="mb-3 font-heading font-bold text-brand-ink">{label}</p>
                    ) : null}
                    {block ? (
                      <MealProgramBlockContent block={block} />
                    ) : (
                      <span className="text-brand-muted/55">—</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
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
        <div className="mb-4 flex items-center gap-3 sm:mb-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-brand-border/80 bg-brand-sky-soft text-brand-green sm:h-11 sm:w-11">
            <MessageCircle className="h-5 w-5" strokeWidth={2.25} aria-hidden />
          </span>
          <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-brand-muted">
            {copy.since}
          </p>
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

        {/* Mobile / tablet: stacked periods for readable scanning */}
        <div className="space-y-4 lg:hidden">
          {copy.periods.map((period, index) => (
            <MealProgramPeriodPanel
              key={period.title}
              period={period}
              tone={index === 0 ? "past" : "next"}
            />
          ))}
        </div>

        {/* Desktop: aligned comparison table */}
        <div className="hidden lg:block">
          <MealProgramCompareTable periods={copy.periods} />
        </div>

        <div className="mt-8 border-t border-brand-border/50 pt-8 sm:mt-10 sm:pt-10">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-brand-border/80 bg-brand-warm p-2 shadow-[var(--shadow-brand-card)] sm:p-2.5">
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
