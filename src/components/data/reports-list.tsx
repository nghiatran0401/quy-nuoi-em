"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUp, ExternalLink, Filter } from "lucide-react";
import type { FinancialReport } from "@/lib/data/types";

type ReportsListProps = {
  reports: FinancialReport[];
  years: number[];
  labels: {
    allYears: string;
    year: string;
    totalIncome: string;
    totalExpense: string;
    downloadReport: string;
    reportsListTitle: string;
  };
};

export function ReportsList({ reports, years, labels }: ReportsListProps) {
  const [year, setYear] = useState<number | "all">("all");

  const filtered = useMemo(() => {
    if (year === "all") return reports;
    return reports.filter((report) => report.year === year);
  }, [reports, year]);

  return (
    <section className="section-surface pb-20">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-brand-ink">
            <Filter className="h-5 w-5 text-brand-accent" aria-hidden />
            {labels.reportsListTitle} ({reports.length})
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setYear("all")}
              className={year === "all" ? "pill-active" : "pill-inactive"}
            >
              {labels.allYears}
            </button>
            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYear(y)}
                className={year === y ? "pill-active" : "pill-inactive"}
              >
                {labels.year} {y}
              </button>
            ))}
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((report) => (
            <li key={report.id} className="brand-card-interactive flex flex-col overflow-hidden">
              {report.imageUrl ? (
                <div className="relative aspect-[16/10] w-full bg-brand-surface">
                  <Image
                    src={report.imageUrl}
                    alt={report.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-4 font-heading text-lg font-bold text-brand-ink">{report.title}</h3>
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div className="income-chip">
                    <p className="mb-1 flex items-center gap-1 text-xs font-medium text-brand-success">
                      <ArrowUp className="h-3.5 w-3.5" aria-hidden />
                      {labels.totalIncome}
                    </p>
                    <p className="text-sm font-bold leading-tight text-brand-success">{report.totalIncome}</p>
                  </div>
                  <div className="expense-chip">
                    <p className="mb-1 flex items-center gap-1 text-xs font-medium text-brand-danger">
                      <ArrowDown className="h-3.5 w-3.5" aria-hidden />
                      {labels.totalExpense}
                    </p>
                    <p className="text-sm font-bold leading-tight text-brand-danger">{report.totalExpense}</p>
                  </div>
                </div>
                {report.documentUrl ? (
                  <a
                    href={report.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-accent mt-auto inline-flex items-center justify-center gap-2 self-center text-sm"
                  >
                    {labels.downloadReport}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
