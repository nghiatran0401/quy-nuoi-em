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
    sampleDataNote?: string;
  };
};

const pillActive = "rounded-full bg-brand-accent px-4 py-2 text-sm font-semibold text-white shadow-sm";
const pillInactive =
  "rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-brand-accent/30 hover:text-brand-blue";

export function ReportsList({ reports, years, labels }: ReportsListProps) {
  const [year, setYear] = useState<number | "all">("all");

  const filtered = useMemo(() => {
    if (year === "all") return reports;
    return reports.filter((report) => report.year === year);
  }, [reports, year]);

  return (
    <section className="bg-brand-surface pb-20">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {labels.sampleDataNote ? (
          <p className="mb-6 text-center text-sm text-amber-700">{labels.sampleDataNote}</p>
        ) : null}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Filter className="h-5 w-5 text-brand-blue" aria-hidden />
            {labels.reportsListTitle} ({reports.length})
          </h2>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setYear("all")} className={year === "all" ? pillActive : pillInactive}>
              {labels.allYears}
            </button>
            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => setYear(y)}
                className={year === y ? pillActive : pillInactive}
              >
                {labels.year} {y}
              </button>
            ))}
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((report) => (
            <li
              key={report.id}
              className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {report.imageUrl ? (
                <div className="relative aspect-[16/10] w-full bg-gray-100">
                  <Image
                    src={report.imageUrl}
                    alt={report.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-4">
                <h3 className="mb-4 font-heading text-lg font-bold text-gray-900">{report.title}</h3>
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-green-50 p-3">
                    <p className="mb-1 flex items-center gap-1 text-xs font-medium text-green-700">
                      <ArrowUp className="h-3.5 w-3.5" aria-hidden />
                      {labels.totalIncome}
                    </p>
                    <p className="text-sm font-bold leading-tight text-green-700">{report.totalIncome}</p>
                  </div>
                  <div className="rounded-lg bg-red-50 p-3">
                    <p className="mb-1 flex items-center gap-1 text-xs font-medium text-red-600">
                      <ArrowDown className="h-3.5 w-3.5" aria-hidden />
                      {labels.totalExpense}
                    </p>
                    <p className="text-sm font-bold leading-tight text-red-600">{report.totalExpense}</p>
                  </div>
                </div>
                {report.documentUrl ? (
                  <a
                    href={report.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
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
