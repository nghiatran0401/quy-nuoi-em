import Link from "next/link";
import { YoutubeEmbed } from "@/components/shared/youtube-embed";
import { campaignSectionCopy } from "@/content/homepage-content";
import { resolveHomeCampaignContent, type HomeCtaContent } from "@/lib/data/homepage";

type HomeStorySectionProps = {
  content?: HomeCtaContent;
  eyebrow?: string;
  title?: string;
};

export function HomeStorySection({
  content,
  eyebrow = campaignSectionCopy.storySection.eyebrow,
  title = campaignSectionCopy.storySection.title,
}: HomeStorySectionProps) {
  const copy = resolveHomeCampaignContent(content);

  return (
    <section
      className="relative overflow-hidden border-y border-brand-border/40 bg-white home-section-pad"
      aria-labelledby="home-story-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgb(255 232 214 / 0.35), transparent 42%), radial-gradient(circle at 85% 80%, rgb(216 236 248 / 0.3), transparent 38%)",
        }}
        aria-hidden
      />

      <div className="page-container relative z-10">
        <header className="mx-auto mb-7 max-w-3xl text-center sm:mb-8">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="home-story-heading" className="heading-section-xl mt-2">
            {title}
          </h2>
        </header>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          <div className="relative rounded-2xl border-2 border-brand-accent/35 bg-gradient-to-br from-brand-accent/15 via-brand-peach/30 to-brand-highlight-soft p-5 shadow-[var(--shadow-brand-soft)] sm:rounded-[1.75rem] sm:p-7 lg:min-h-0">
            <div
              className="pointer-events-none absolute -top-3 left-8 h-6 w-10 rounded-t-lg bg-brand-accent/20"
              aria-hidden
            />
            <div className="home-prose space-y-4 text-[15px] leading-relaxed text-brand-ink sm:text-base">
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

          <div className="rounded-2xl border-2 border-brand-accent/20 bg-white/80 p-2 shadow-[var(--shadow-brand-soft)] backdrop-blur-sm sm:rounded-[1.75rem] sm:p-2.5">
            <YoutubeEmbed videoId={copy.media.youtubeId} title={copy.media.title} />
          </div>
        </div>
      </div>
    </section>
  );
}
