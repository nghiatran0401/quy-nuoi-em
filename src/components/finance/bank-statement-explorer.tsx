"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { BankStatementLoading } from "@/components/finance/bank-statement-loading";
import { vcbStatementsConfig, vcbStatementsSheetUrl } from "@/config/vcb-statements";
import type {
  VcbStatementCatalog,
  VcbStatementMonthPayload,
  VcbStatementRow,
} from "@/lib/data/vcb-statements";
import { formatVnd, vcbStatementQueryString } from "@/lib/data/vcb-statements";
import { maskTransactionDetail } from "@/lib/privacy/mask-pii";

type BankStatementExplorerProps = {
  basePath: string;
  catalog: VcbStatementCatalog;
  payload: VcbStatementMonthPayload;
  labels: {
    year: string;
    month: string;
    searchPlaceholder: string;
    openSheet: string;
    transactionCount: string;
    totalChi: string;
    totalThu: string;
    columnStt: string;
    columnDate: string;
    columnChi: string;
    columnThu: string;
    columnBalance: string;
    columnDetail: string;
    noResults: string;
    page: string;
    of: string;
    prev: string;
    next: string;
    loadingTitle: string;
    loadingHint: string;
  };
};

function formatVndSummary(amount: number): string {
  return `${new Intl.NumberFormat("vi-VN").format(amount)} đ`;
}

function StatementRowCells({ row }: { row: VcbStatementRow }) {
  return (
    <>
      <td className="whitespace-nowrap px-3 py-2.5 text-sm text-brand-muted">{row.stt}</td>
      <td className="whitespace-nowrap px-3 py-2.5 text-sm text-brand-ink">{row.dateDoc}</td>
      <td className="whitespace-nowrap px-3 py-2.5 text-right text-sm tabular-nums">
        {row.chi !== null ? (
          <span className="text-brand-danger">{formatVnd(row.chi)}</span>
        ) : (
          <span className="text-brand-muted">—</span>
        )}
      </td>
      <td className="whitespace-nowrap px-3 py-2.5 text-right text-sm tabular-nums">
        {row.thu !== null ? (
          <span className="text-brand-success">{formatVnd(row.thu)}</span>
        ) : (
          <span className="text-brand-muted">—</span>
        )}
      </td>
      <td className="whitespace-nowrap px-3 py-2.5 text-right text-sm tabular-nums text-brand-ink">
        {formatVnd(row.balance)}
      </td>
      <td className="max-w-md px-3 py-2.5 text-sm leading-relaxed text-brand-muted">
        {maskTransactionDetail(row.detail)}
      </td>
    </>
  );
}

function StatementCard({ row, labels }: { row: VcbStatementRow; labels: BankStatementExplorerProps["labels"] }) {
  return (
    <li className="rounded-xl border border-brand-border/60 bg-white p-4 text-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="font-medium text-brand-ink">
          #{row.stt} · {row.dateDoc}
        </p>
        <p className="shrink-0 tabular-nums text-brand-muted">{formatVnd(row.balance)}</p>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-2 border-t border-brand-border/50 pt-3">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted/80">{labels.columnChi}</dt>
          <dd className="tabular-nums text-brand-danger">{formatVnd(row.chi)}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted/80">{labels.columnThu}</dt>
          <dd className="tabular-nums text-brand-success">{formatVnd(row.thu)}</dd>
        </div>
      </dl>
      <p className="mt-3 text-sm leading-relaxed text-brand-muted">{maskTransactionDetail(row.detail)}</p>
    </li>
  );
}

export function BankStatementExplorer({
  basePath,
  catalog,
  payload,
  labels,
}: BankStatementExplorerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [navigatingTo, setNavigatingTo] = useState<{ year: number; month: number } | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const isLoading =
    isPending ||
    (navigatingTo !== null &&
      (navigatingTo.year !== payload.selection.year ||
        navigatingTo.month !== payload.selection.month));

  useEffect(() => {
    if (
      navigatingTo &&
      navigatingTo.year === payload.selection.year &&
      navigatingTo.month === payload.selection.month
    ) {
      setNavigatingTo(null);
    }
  }, [navigatingTo, payload.selection.month, payload.selection.year]);

  const years = useMemo(
    () => [...new Set(catalog.periods.map((period) => period.year))].sort((a, b) => b - a),
    [catalog.periods],
  );

  const monthsForYear = useMemo(
    () =>
      catalog.periods
        .filter((period) => period.year === payload.selection.year)
        .sort((a, b) => b.month - a.month),
    [catalog.periods, payload.selection.year],
  );

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return payload.rows;
    return payload.rows.filter(
      (row) =>
        row.detail.toLowerCase().includes(query) ||
        row.dateDoc.toLowerCase().includes(query) ||
        String(row.stt).includes(query),
    );
  }, [payload.rows, search]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / vcbStatementsConfig.pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filteredRows.slice(
    (currentPage - 1) * vcbStatementsConfig.pageSize,
    currentPage * vcbStatementsConfig.pageSize,
  );

  const navigatePeriod = (year: number, month: number) => {
    setNavigatingTo({ year, month });
    setPage(1);
    setSearch("");
    startTransition(() => {
      router.push(`${basePath}?${vcbStatementQueryString({ year, month })}#sao-ke`);
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {years.map((year) => (
            <button
              key={year}
              type="button"
              disabled={isLoading}
              onClick={() => {
                const firstMonth =
                  catalog.periods.find((period) => period.year === year)?.month ??
                  payload.selection.month;
                navigatePeriod(year, firstMonth);
              }}
              className={
                payload.selection.year === year ? "pill-active" : "pill-inactive"
              }
            >
              {labels.year} {year}
            </button>
          ))}
        </div>
        <a
          href={vcbStatementsSheetUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-brand-green transition hover:text-brand-accent"
        >
          {labels.openSheet}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>

      <div className="flex flex-wrap gap-2">
        {monthsForYear.map((period) => (
          <button
            key={`${period.year}-${period.month}`}
            type="button"
            disabled={isLoading}
            onClick={() => navigatePeriod(period.year, period.month)}
            className={
              payload.selection.month === period.month ? "pill-active" : "pill-inactive"
            }
          >
            {labels.month} {period.month}
            <span className="ml-1 text-xs opacity-70">({period.count.toLocaleString("vi-VN")})</span>
          </button>
        ))}
      </div>

      {isLoading ? (
        <BankStatementLoading
          variant="banner"
          title={labels.loadingTitle}
          hint={labels.loadingHint}
        />
      ) : null}

      <div className="relative min-h-[320px]">
        <div className={isLoading ? "pointer-events-none select-none opacity-35" : undefined}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-brand-border/60 bg-brand-warm/70 px-4 py-3 text-sm">
              <p className="text-brand-muted">{labels.transactionCount}</p>
              <p className="mt-1 font-heading text-lg font-bold text-brand-ink">
                {payload.summary.count.toLocaleString("vi-VN")}
              </p>
            </div>
            <div className="rounded-xl border border-brand-border/60 bg-brand-warm/70 px-4 py-3 text-sm">
              <p className="text-brand-muted">{labels.totalThu}</p>
              <p className="mt-1 font-heading text-lg font-bold text-brand-success">
                {formatVndSummary(payload.summary.totalThu)}
              </p>
            </div>
            <div className="rounded-xl border border-brand-border/60 bg-brand-warm/70 px-4 py-3 text-sm">
              <p className="text-brand-muted">{labels.totalChi}</p>
              <p className="mt-1 font-heading text-lg font-bold text-brand-danger">
                {formatVndSummary(payload.summary.totalChi)}
              </p>
            </div>
          </div>

          <div className="relative mt-5">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted"
              aria-hidden
            />
            <input
              type="search"
              value={search}
              disabled={isLoading}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder={labels.searchPlaceholder}
              className="w-full rounded-xl border border-brand-border/70 bg-white py-2.5 pl-10 pr-4 text-sm text-brand-ink outline-none ring-brand-green/30 transition focus:ring-2 disabled:cursor-wait disabled:opacity-60"
            />
          </div>

          {pageRows.length === 0 ? (
            <p className="mt-5 rounded-xl border border-dashed border-brand-border/80 px-4 py-8 text-center text-sm text-brand-muted">
              {labels.noResults}
            </p>
          ) : (
            <>
              <div className="mt-5 hidden overflow-x-auto rounded-xl border border-brand-border/60 md:block">
                <table className="min-w-full divide-y divide-brand-border/60 text-left">
                  <thead className="bg-brand-surface text-xs font-semibold uppercase tracking-wide text-brand-muted">
                    <tr>
                      <th className="px-3 py-3">{labels.columnStt}</th>
                      <th className="px-3 py-3">{labels.columnDate}</th>
                      <th className="px-3 py-3 text-right">{labels.columnChi}</th>
                      <th className="px-3 py-3 text-right">{labels.columnThu}</th>
                      <th className="px-3 py-3 text-right">{labels.columnBalance}</th>
                      <th className="px-3 py-3">{labels.columnDetail}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/40 bg-white">
                    {pageRows.map((row) => (
                      <tr key={row.stt} className="align-top hover:bg-brand-surface/50">
                        <StatementRowCells row={row} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ul className="mt-5 space-y-3 md:hidden">
                {pageRows.map((row) => (
                  <StatementCard key={row.stt} row={row} labels={labels} />
                ))}
              </ul>
            </>
          )}

          {totalPages > 1 ? (
            <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-brand-border/50 pt-4 sm:flex-row">
              <p className="text-sm text-brand-muted">
                {labels.page} {currentPage} {labels.of} {totalPages}
                {search.trim() ? ` · ${filteredRows.length.toLocaleString("vi-VN")} dòng` : null}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={currentPage <= 1 || isLoading}
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  className="pill-inactive inline-flex items-center gap-1 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                  {labels.prev}
                </button>
                <button
                  type="button"
                  disabled={currentPage >= totalPages || isLoading}
                  onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                  className="pill-inactive inline-flex items-center gap-1 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {labels.next}
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {isLoading ? (
          <BankStatementLoading title={labels.loadingTitle} hint={labels.loadingHint} />
        ) : null}
      </div>

      <p className="text-center text-xs text-brand-muted">
        {payload.label} · {vcbStatementsConfig.bankName} {vcbStatementsConfig.accountNumber}
      </p>
    </div>
  );
}
