import {
  getProcess2026PageFallback,
  type Process2026PageContent,
} from "@/lib/data/process-2026-page";

type HomeSupportCtaSectionProps = {
  content?: Process2026PageContent;
};

export function HomeSupportCtaSection({ content }: HomeSupportCtaSectionProps) {
  const c = content ?? getProcess2026PageFallback();
  const fanpageUrl = c.links.messenger;
  const hotlineDisplay = "097 530 23 07";

  return (
    <section className="cta-warm border-t border-brand-border/40 py-8 sm:py-10" aria-label="Liên hệ Quỹ Nuôi Em">
      <div className="container mx-auto max-w-7xl px-4 text-center">
        <p className="text-sm text-brand-muted sm:text-base">
          Liên hệ:{" "}
          <a
            href={fanpageUrl}
            target="_blank"
            rel="noreferrer"
            className="link-accent font-semibold"
          >
            Fanpage Nuôi Em
          </a>
          <span className="mx-2 text-brand-border" aria-hidden>
            |
          </span>
          Hotline:{" "}
          <a href={`tel:${c.transfer.phone}`} className="link-accent font-semibold tabular-nums">
            {hotlineDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
