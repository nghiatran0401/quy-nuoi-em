"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, ChevronDown, Landmark, PiggyBank } from "lucide-react";
import {
  formatFinanceReportAmount,
  getHomeFinancePeriodReport,
  type FinanceReportLineItem,
  type FinanceReportSection,
} from "@/config/home-finance-report";
import { FinanceSectionHeader } from "@/components/finance/finance-section-header";
import Link from "next/link";
import { STATIC_PAGE_PATHS } from "@/lib/seo/routes";

type FinancePeriodReportProps = {
  id?: string;
  variant?: "home" | "page";
  showPageLink?: boolean;
};

const sectionStyles = {
  charity: {
    icon: Landmark,
    badge: "bg-brand-green-light text-brand-deep ring-brand-deep/15",
    accent: "text-brand-deep",
    surface: "bg-brand-green-light/40 ring-brand-deep/10",
    totalThu: "text-brand-deep",
    totalChi: "text-brand-cyan",
  },
  operations: {
    icon: PiggyBank,
    badge: "bg-brand-sky-soft text-brand-cyan ring-brand-cyan/15",
    accent: "text-brand-cyan",
    surface: "bg-brand-sky-soft/60 ring-brand-cyan/10",
    totalThu: "text-brand-deep",
    totalChi: "text-brand-cyan",
  },
} as const;

function ReportLineItem({ item }: { item: FinanceReportLineItem }) {
  return (
    <div className="border-b border-brand-border/35 py-2.5 last:border-0">
      <div className="flex items-start justify-between gap-4">
        <span className="min-w-0 text-sm leading-snug text-brand-ink">{item.label}</span>
        <span className="shrink-0 text-sm font-semibold tabular-nums text-brand-ink">
          {formatFinanceReportAmount(item.amountVnd)}
        </span>
      </div>
      {item.note ? (
        <p className="mt-1 text-xs leading-relaxed text-brand-muted">({item.note})</p>
      ) : null}
    </div>
  );
}

function BalanceBlock({
  label,
  amountVnd,
  note,
  tone,
}: {
  label: string;
  amountVnd: number;
  note?: string;
  tone: "opening" | "closing";
}) {
  return (
    <div
      className={`rounded-xl px-4 py-3 ring-1 ring-inset ${
        tone === "opening"
          ? "bg-white/80 ring-brand-border/50"
          : "bg-brand-warm/70 ring-brand-accent/15"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">{label}</p>
      <p className="mt-1 font-heading text-lg font-bold tabular-nums text-brand-ink sm:text-xl">
        {formatFinanceReportAmount(amountVnd)}
      </p>
      {note ? <p className="mt-1.5 text-xs leading-relaxed text-brand-muted">({note})</p> : null}
    </div>
  );
}

function ReportSectionCard({ section }: { section: FinanceReportSection }) {
  const styles = sectionStyles[section.id];
  const Icon = styles.icon;

  return (
    <article className={`flex h-full flex-col rounded-2xl p-4 ring-1 ring-inset sm:p-5 ${styles.surface}`}>
      <div className="flex items-start gap-3">
        <span
          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ${styles.badge}`}
          aria-hidden
        >
          <Icon className="h-5 w-5" strokeWidth={2.25} />
        </span>
        <div className="min-w-0">
          <p className={`text-[11px] font-bold uppercase tracking-[0.14em] ${styles.accent}`}>
            Phần {section.index}
          </p>
          <h3 className="mt-1 font-heading text-base font-bold leading-snug text-brand-ink sm:text-lg">
            {section.title}
          </h3>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <BalanceBlock
          tone="opening"
          label={`Số dư đầu ngày ${section.openingDate}`}
          amountVnd={section.openingBalanceVnd}
        />

        <div className="rounded-xl bg-white/85 p-4 ring-1 ring-inset ring-brand-border/45">
          <div className="flex items-center justify-between gap-3 border-b border-brand-border/40 pb-3">
            <p className="text-sm font-bold text-brand-ink">1. Tổng thu</p>
            <p className={`font-heading text-base font-bold tabular-nums sm:text-lg ${styles.totalThu}`}>
              {formatFinanceReportAmount(section.totalIncomeVnd)}
            </p>
          </div>
          {section.incomeItems?.length ? (
            <div className="mt-1">
              {section.incomeItems.map((item) => (
                <ReportLineItem key={item.label} item={item} />
              ))}
            </div>
          ) : null}
        </div>

        <div className="rounded-xl bg-white/85 p-4 ring-1 ring-inset ring-brand-border/45">
          <div className="flex items-center justify-between gap-3 border-b border-brand-border/40 pb-3">
            <p className="text-sm font-bold text-brand-ink">2. Tổng chi</p>
            <p className={`font-heading text-base font-bold tabular-nums sm:text-lg ${styles.totalChi}`}>
              {formatFinanceReportAmount(section.totalExpenseVnd)}
            </p>
          </div>
          <div className="mt-1">
            {section.expenseItems.map((item) => (
              <ReportLineItem key={item.label} item={item} />
            ))}
          </div>
        </div>

        <BalanceBlock
          tone="closing"
          label={`Số dư cuối ngày ${section.closingDate}`}
          amountVnd={section.closingBalanceVnd}
          note={section.closingNote}
        />
      </div>
    </article>
  );
}

export function FinancePeriodReport({
  id = "bc-thu-chi",
  variant = "page",
  showPageLink = false,
}: FinancePeriodReportProps) {
  const report = getHomeFinancePeriodReport();
  const isHome = variant === "home";
  const [open, setOpen] = useState(!isHome);

  useEffect(() => {
    if (!isHome) return;

    const syncFromHash = () => {
      setOpen(window.location.hash === `#${id}`);
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [isHome, id]);

  const reportBody = (
    <>
      <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-green-light/70 px-3 py-1.5 text-xs font-semibold text-brand-deep ring-1 ring-inset ring-brand-deep/10">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-deep" aria-hidden />
        {report.periodShort}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {report.sections.map((section) => (
          <ReportSectionCard key={section.id} section={section} />
        ))}
      </div>

      {showPageLink ? (
        <div className="mt-5 flex justify-center border-t border-brand-border/50 pt-5">
          <Link
            href={`${STATIC_PAGE_PATHS.taiChinh}#${id}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-deep transition hover:text-brand-accent-dark"
          >
            Xem đầy đủ trên trang Minh bạch tài chính
            <ArrowDownRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      ) : null}
    </>
  );

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-28">
      <div
        className={`rounded-2xl ring-1 ring-inset ring-brand-border/60 ${
          isHome ? "bg-white" : "border border-brand-border/60 bg-white/80 p-4 sm:p-6 lg:p-8"
        }`}
      >
        {isHome ? (
          <>
            <button
              type="button"
              className="focus-ring flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls={`${id}-panel`}
            >
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-deep">
                  Báo cáo tổng kết
                </p>
                <h2
                  id={`${id}-heading`}
                  className="mt-1 font-heading text-base font-bold leading-snug text-brand-ink sm:text-lg"
                >
                  {report.periodLabel}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                  Chi tiết thu chi hai luồng: dự án Nuôi em và vận hành hệ sinh thái trong giai đoạn năm học.
                </p>
              </div>
              <ChevronDown
                className={`mt-1 h-5 w-5 shrink-0 text-brand-muted transition-transform duration-300 ${
                  open ? "rotate-180 text-brand-deep" : ""
                }`}
                aria-hidden
              />
            </button>

            <div
              id={`${id}-panel`}
              className={`grid transition-all duration-300 ease-in-out ${
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-brand-border/50 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
                  {reportBody}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <FinanceSectionHeader
              eyebrow="Báo cáo tổng kết"
              title={report.periodLabel}
              description="Báo cáo thu chi tổng hợp theo hai luồng: hoạt động từ thiện Nuôi em và vận hành toàn hệ sinh thái."
              headingId={`${id}-heading`}
            />
            {reportBody}
          </>
        )}
      </div>
    </section>
  );
}
