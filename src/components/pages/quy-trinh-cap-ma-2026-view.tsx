import Image from "next/image";
import {
  ArrowRight,
  Building2,
  CircleAlert,
  Clock3,
  ExternalLink,
  MessageCircle,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { publicCatalog } from "@/config/public-catalog";
import { donateInfo } from "@/content/pages/static-pages";
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
  const singlePayment = c.paymentScenarios[0];

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
        <header className="mb-8 max-w-2xl">
          <p className="eyebrow">{c.transfer.eyebrow}</p>
          <h2 className="heading-section mt-2">{c.transfer.title}</h2>
          <p className="text-body mt-3">
            Sau khi có mã NE, chuyển đủ một lần trong 24 giờ — không chia nhiều đợt.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-10">
          <div className="space-y-5">
            <div className="rounded-2xl border border-brand-danger/25 bg-brand-danger-soft/60 p-4 sm:p-5">
              <p className="flex items-start gap-2 text-sm font-semibold leading-relaxed text-brand-ink">
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand-danger" aria-hidden />
                {c.transfer.warning}
              </p>
            </div>

            <div className="brand-card overflow-hidden p-5 sm:p-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-brand-green">
                <Building2 className="h-4 w-4 shrink-0" aria-hidden />
                Tài khoản nhận quyên góp
              </p>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2 rounded-xl border border-brand-border/60 bg-brand-warm px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Số tài khoản</p>
                  <p className="mt-1 font-mono text-3xl font-bold tabular-nums text-brand-accent">
                    {c.transfer.accountNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Ngân hàng</p>
                  <p className="mt-1 text-sm leading-relaxed text-brand-ink">{c.transfer.bank}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Điện thoại</p>
                  <p className="mt-1">
                    <a href={`tel:${c.transfer.phone}`} className="link-accent text-sm font-semibold">
                      {c.transfer.phoneDisplay}
                    </a>
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Chủ tài khoản</p>
                  <p className="mt-1 text-sm font-medium text-brand-ink">{c.transfer.accountName}</p>
                </div>
              </div>

              <div className="mt-5 space-y-2 rounded-xl border border-brand-border/70 bg-white px-4 py-3 text-sm">
                <p>
                  <span className="font-semibold text-brand-ink">Cú pháp nội dung CK:</span>{" "}
                  {donateInfo.transferFormat}
                </p>
                <p className="text-brand-muted">
                  <span className="font-semibold text-brand-ink">Ví dụ:</span>{" "}
                  <span className="font-mono text-brand-ink">{donateInfo.transferExample}</span>
                </p>
              </div>
            </div>

            {singlePayment ? (
              <div className="rounded-2xl border-2 border-brand-accent/35 bg-gradient-to-br from-brand-highlight/25 via-white to-brand-warm p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold text-brand-ink">{singlePayment.label}</h3>
                  {singlePayment.tag ? (
                    <span className="rounded-full bg-brand-accent px-2.5 py-0.5 text-xs font-bold text-white">
                      {singlePayment.tag}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 leading-relaxed text-brand-muted">{singlePayment.detail}</p>
                <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-ink">
                  <Clock3 className="h-4 w-4 text-brand-accent" aria-hidden />
                  Trong vòng 24 giờ sau khi nhận mã NE
                </p>
              </div>
            ) : null}

            <p className="text-sm leading-relaxed text-brand-muted">{c.transfer.scenariosFootnote}</p>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-3xl border border-brand-border bg-white p-6 shadow-[var(--shadow-brand-card)]">
              <p className="text-center text-sm font-semibold text-brand-ink">{c.transfer.qrCaption}</p>
              <div className="relative mx-auto mt-4 aspect-square w-full max-w-[220px]">
                <Image
                  src={qrImageSrc}
                  alt="Mã QR chuyển khoản Quỹ Nuôi Em"
                  fill
                  className="object-contain"
                  sizes="220px"
                />
              </div>
              <a href={messengerUrl} target="_blank" rel="noreferrer" className="btn-primary mt-6 w-full">
                {c.transfer.qrCta}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </a>
            </div>
          </aside>
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
