import Image from "next/image";
import { ArrowRight, CircleAlert, Clock3, ExternalLink, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { publicCatalog } from "@/config/public-catalog";
import {
  getProcess2026PageFallback,
  resolveProcess2026ImageSrc,
  type Process2026PageContent,
} from "@/lib/data/process-2026-page";

type QuyTrinhCapMa2026ViewProps = {
  content?: Process2026PageContent;
};

export function QuyTrinhCapMa2026View({ content }: QuyTrinhCapMa2026ViewProps) {
  const c = content ?? getProcess2026PageFallback();
  const heroImageSrc = resolveProcess2026ImageSrc(c.media.heroImage);
  const qrImageSrc = resolveProcess2026ImageSrc(c.media.qrImage);
  const messengerUrl = c.links.messenger;
  const groupUrl = c.links.group;

  return (
    <div className="section-warm">
      <section className="banner-primary relative overflow-hidden border-b border-brand-border/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_18%,rgba(255,228,168,0.32),transparent_45%),radial-gradient(circle_at_85%_12%,rgba(240,120,74,0.16),transparent_42%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div>
            <p className="eyebrow mb-3">{c.hero.eyebrow}</p>
            <h1 className="heading-display max-w-4xl text-[1.65rem] leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {c.hero.title}
              <span className="text-brand-accent-dark">{c.hero.titleAccent}</span>
            </h1>
            <p className="text-body mt-5 max-w-3xl text-lg">{c.hero.description}</p>
            <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <a href={messengerUrl} target="_blank" rel="noreferrer" className="btn-primary w-full sm:w-auto">
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden />
                {c.hero.messengerCta}
              </a>
              <a href={groupUrl} target="_blank" rel="noreferrer" className="btn-secondary w-full sm:w-auto">
                {c.hero.groupCta}
              </a>
            </div>
          </div>
          <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-brand-border/70 bg-white shadow-[var(--shadow-brand-card)] lg:max-w-none">
            <Image
              src={heroImageSrc}
              alt="Sơ đồ 6 bước quy trình nhận mã Nuôi Em"
              fill
              className="object-contain p-2"
              sizes="(max-width: 1024px) 90vw, 420px"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <header className="mb-10 max-w-2xl">
          <p className="eyebrow">{c.stepsIntro.eyebrow}</p>
          <h2 className="heading-section mt-2">{c.stepsIntro.title}</h2>
          <p className="text-body mt-3">{c.stepsIntro.description}</p>
        </header>

        <ol className="space-y-5">
          {c.steps.map((step) => (
            <li
              key={step.number}
              className="brand-card grid gap-5 p-5 sm:p-6 md:grid-cols-[4.5rem_minmax(0,1fr)] md:gap-8 md:p-7"
            >
              <div className="flex items-start md:pt-1">
                <span
                  className="font-heading text-5xl leading-none font-extrabold tracking-tight text-brand-accent sm:text-6xl"
                  aria-hidden
                >
                  {step.number}
                </span>
                <span className="sr-only">Bước {step.number}</span>
              </div>

              <div className="min-w-0 space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-xl font-bold text-brand-ink">{step.title}</h3>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-border bg-brand-sky-soft px-3 py-1 text-xs font-semibold text-brand-muted">
                    <Clock3 className="h-3.5 w-3.5 text-brand-accent" aria-hidden />
                    {step.timing}
                  </span>
                </div>
                <p className="leading-relaxed text-brand-muted">{step.summary}</p>
                {step.bullets.length > 0 ? (
                  <ul className="space-y-2 border-t border-brand-border/60 pt-3">
                    {step.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-brand-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-accent" aria-hidden />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-brand-border/60 bg-brand-surface">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <p className="eyebrow">{c.costIntro.eyebrow}</p>
          <h2 className="heading-section mt-2">{c.costIntro.title}</h2>
          <p className="text-body mt-3 max-w-3xl">{c.costIntro.description}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {c.costTiers.map((tier) => (
              <div key={tier.label} className="rounded-2xl border border-brand-border/70 bg-white p-6">
                <p className="text-sm font-semibold text-brand-green">{tier.label}</p>
                <p className="mt-2 font-heading text-3xl font-bold text-brand-accent">{tier.amount}</p>
                <p className="mt-2 text-sm text-brand-muted">{tier.breakdown}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="eyebrow">{c.transfer.eyebrow}</p>
            <h2 className="heading-section mt-2">{c.transfer.title}</h2>

            <div className="mt-5 rounded-2xl border border-brand-danger/25 bg-brand-danger-soft/60 p-4">
              <p className="flex items-start gap-2 text-sm font-semibold text-brand-ink">
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand-danger" aria-hidden />
                {c.transfer.warning}
              </p>
            </div>

            <dl className="mt-6 space-y-3 text-brand-muted">
              <div>
                <dt className="text-sm font-semibold text-brand-ink">Số tài khoản</dt>
                <dd className="mt-0.5 font-mono text-lg font-bold text-brand-accent">{c.transfer.accountNumber}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-brand-ink">Ngân hàng</dt>
                <dd>{c.transfer.bank}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-brand-ink">Chủ tài khoản</dt>
                <dd>{c.transfer.accountName}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold text-brand-ink">Điện thoại</dt>
                <dd>
                  <a href={`tel:${c.transfer.phone}`} className="link-accent">
                    {c.transfer.phoneDisplay}
                  </a>
                </dd>
              </div>
            </dl>

            <h3 className="mt-8 text-lg font-bold text-brand-ink">{c.transfer.scenariosTitle}</h3>
            <ul className="mt-4 space-y-3">
              {c.paymentScenarios.map((scenario) => (
                <li
                  key={scenario.label}
                  className="rounded-xl border border-brand-border/70 bg-brand-warm px-4 py-3"
                >
                  <p className="font-semibold text-brand-ink">
                    {scenario.label}
                    {scenario.tag ? (
                      <span className="ml-2 rounded-full bg-brand-highlight px-2 py-0.5 text-xs font-bold text-brand-ink">
                        {scenario.tag}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1 text-sm text-brand-muted">{scenario.detail}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-brand-muted">{c.transfer.scenariosFootnote}</p>
          </div>

          <div className="flex flex-col items-center lg:items-end">
            <div className="w-full max-w-sm rounded-3xl border border-brand-border bg-white p-6 shadow-[var(--shadow-brand-card)]">
              <p className="text-center text-sm font-semibold text-brand-ink">{c.transfer.qrCaption}</p>
              <div className="relative mx-auto mt-4 aspect-square w-full max-w-[240px]">
                <Image
                  src={qrImageSrc}
                  alt="Mã QR chuyển khoản Nuôi Em"
                  fill
                  className="object-contain"
                  sizes="240px"
                />
              </div>
              <a href={messengerUrl} target="_blank" rel="noreferrer" className="btn-primary mt-6 w-full">
                {c.transfer.qrCta}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/80">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <p className="eyebrow">{c.timelineIntro.eyebrow}</p>
          <h2 className="heading-section mt-2">{c.timelineIntro.title}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.timeline.map((item) => (
              <div
                key={`${item.when}-${item.what}`}
                className="rounded-2xl border border-brand-border/70 bg-brand-warm px-5 py-4"
              >
                <p className="text-sm font-bold text-brand-accent">{item.when}</p>
                <p className="mt-2 font-semibold text-brand-ink">{item.what}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">{c.notesIntro.eyebrow}</p>
            <h2 className="heading-section mt-2">{c.notesIntro.title}</h2>
            <ul className="mt-6 space-y-4">
              {c.importantNotes.map((note, i) => (
                <li key={note} className="flex gap-3 text-brand-muted">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-accent/15 text-sm font-bold text-brand-accent-dark">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>
            <a
              href={c.codeMeaningUrl}
              target="_blank"
              rel="noreferrer"
              className="link-accent mt-6 inline-flex items-center gap-1 text-sm"
            >
              {c.codeMeaningLabel}
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </div>

          <div className="surface-info rounded-2xl p-6">
            <p className="eyebrow">{c.finance.eyebrow}</p>
            <h3 className="mt-2 text-xl font-bold text-brand-ink">{c.finance.title}</h3>
            <p className="mt-3 leading-relaxed text-brand-muted">
              {c.finance.bodyBefore}
              {c.finance.reportLinkLabel && c.finance.reportLinkUrl ? (
                <a href={c.finance.reportLinkUrl} target="_blank" rel="noreferrer" className="link-accent">
                  {c.finance.reportLinkLabel}
                </a>
              ) : null}
              {c.finance.bodyAfter}
            </p>
            <p className="mt-3 text-sm text-brand-muted">
              {c.finance.footnoteBefore}
              {c.finance.schoolBuildLinkLabel ? (
                <a href={c.schoolBuildUrl} target="_blank" rel="noreferrer" className="link-accent">
                  {c.finance.schoolBuildLinkLabel}
                </a>
              ) : null}
              {c.finance.footnoteAfter}
            </p>
            <p className="mt-4 border-t border-brand-border/60 pt-4 text-sm text-brand-muted">
              Danh mục em nuôi & tra cứu mã NE:{" "}
              <a href={publicCatalog.url} target="_blank" rel="noreferrer" className="link-accent">
                {publicCatalog.ctaLabel}
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="cta-warm border-t border-brand-border/40">
        <div className="relative mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="heading-section">{c.cta.title}</h2>
          <p className="text-body mx-auto mt-3 max-w-2xl">{c.cta.description}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={messengerUrl} target="_blank" rel="noreferrer" className="btn-primary">
              <MessageCircle className="mr-2 h-5 w-5" aria-hidden />
              {c.cta.messengerCta}
            </a>
            <a href={`tel:${c.transfer.phone}`} className="btn-secondary">
              <Phone className="mr-2 h-5 w-5" aria-hidden />
              {c.transfer.phoneDisplay}
            </a>
            <Link href="/contact" className="btn-secondary">
              {c.cta.contactLinkLabel}
            </Link>
          </div>
          {c.cta.referenceUrl.trim() ? (
            <p className="mt-6 text-sm text-brand-muted">
              {c.cta.referenceLabel}{" "}
              <a href={c.cta.referenceUrl} target="_blank" rel="noreferrer" className="link-accent">
                {c.cta.referenceLinkLabel}
              </a>
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
