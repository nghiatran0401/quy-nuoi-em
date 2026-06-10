"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Search } from "lucide-react";
import { expenseDocumentsConfig } from "@/config/expense-documents";
import type { ExpenseDocumentList, ExpenseDocumentRow, ExpenseDocumentsPayload } from "@/lib/data/expense-documents";
import { formatExpenseAmount } from "@/lib/data/expense-documents";
import { formatVnd } from "@/lib/format-vnd";

type ExpenseDocumentsExplorerProps = {
  payload: ExpenseDocumentsPayload;
  labels: {
    month: string;
    searchPlaceholder: string;
    schoolCount: string;
    totalAmount: string;
    withDriveLink: string;
    columnStt: string;
    columnSchool: string;
    columnCommune: string;
    columnProvince: string;
    columnStudents: string;
    columnAmount: string;
    columnDrive: string;
    viewDocuments: string;
    noDocuments: string;
    noResults: string;
    page: string;
    of: string;
    prev: string;
    next: string;
  };
};

function ExpenseRowCells({
  row,
  labels,
}: {
  row: ExpenseDocumentRow;
  labels: ExpenseDocumentsExplorerProps["labels"];
}) {
  return (
    <>
      <td className="whitespace-nowrap px-3 py-2.5 text-sm text-brand-muted">{row.stt}</td>
      <td className="min-w-[180px] px-3 py-2.5 text-sm font-medium text-brand-ink">{row.school}</td>
      <td className="whitespace-nowrap px-3 py-2.5 text-sm text-brand-muted">{row.commune}</td>
      <td className="whitespace-nowrap px-3 py-2.5 text-sm text-brand-muted">{row.province}</td>
      <td className="whitespace-nowrap px-3 py-2.5 text-right text-sm tabular-nums text-brand-muted">
        {row.studentCount?.toLocaleString("vi-VN") ?? "—"}
      </td>
      <td className="whitespace-nowrap px-3 py-2.5 text-right text-sm tabular-nums text-brand-danger">
        {formatExpenseAmount(row.amount)}
      </td>
      <td className="px-3 py-2.5 text-sm">
        {row.driveUrl ? (
          <a
            href={row.driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-brand-green transition hover:text-brand-accent"
          >
            {labels.viewDocuments}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        ) : (
          <span className="text-brand-muted">{labels.noDocuments}</span>
        )}
      </td>
    </>
  );
}

function ExpenseCard({
  row,
  labels,
}: {
  row: ExpenseDocumentRow;
  labels: ExpenseDocumentsExplorerProps["labels"];
}) {
  return (
    <li className="rounded-xl border border-brand-border/60 bg-white p-4 text-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium text-brand-ink">
            #{row.stt} · {row.school}
          </p>
          <p className="mt-1 text-brand-muted">
            {row.commune}
            {row.commune && row.province ? " · " : null}
            {row.province}
          </p>
        </div>
        <p className="shrink-0 tabular-nums font-medium text-brand-danger">
          {formatExpenseAmount(row.amount)}
        </p>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-2 border-t border-brand-border/50 pt-3">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted/80">
            {labels.columnStudents}
          </dt>
          <dd className="tabular-nums text-brand-muted">
            {row.studentCount?.toLocaleString("vi-VN") ?? "—"}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted/80">
            {labels.columnDrive}
          </dt>
          <dd>
            {row.driveUrl ? (
              <a
                href={row.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-brand-green"
              >
                {labels.viewDocuments}
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            ) : (
              <span className="text-brand-muted">{labels.noDocuments}</span>
            )}
          </dd>
        </div>
      </dl>
    </li>
  );
}

export function ExpenseDocumentsExplorer({ payload, labels }: ExpenseDocumentsExplorerProps) {
  const [selectedListId, setSelectedListId] = useState(payload.defaultListId);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const activeList: ExpenseDocumentList | undefined = useMemo(
    () => payload.lists.find((list) => list.id === selectedListId) ?? payload.lists[0],
    [payload.lists, selectedListId],
  );

  const filteredRows = useMemo(() => {
    if (!activeList) return [];
    const query = search.trim().toLowerCase();
    if (!query) return activeList.rows;
    return activeList.rows.filter(
      (row) =>
        row.school.toLowerCase().includes(query) ||
        row.commune.toLowerCase().includes(query) ||
        row.province.toLowerCase().includes(query),
    );
  }, [activeList, search]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / expenseDocumentsConfig.pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filteredRows.slice(
    (currentPage - 1) * expenseDocumentsConfig.pageSize,
    currentPage * expenseDocumentsConfig.pageSize,
  );

  if (!activeList) return null;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {payload.lists.map((list) => (
          <button
            key={list.id}
            type="button"
            onClick={() => {
              setSelectedListId(list.id);
              setPage(1);
              setSearch("");
            }}
            className={activeList.id === list.id ? "pill-active" : "pill-inactive"}
          >
            {labels.month} {list.month}/{list.year}
            <span className="ml-1 text-xs opacity-70">({list.summary.count.toLocaleString("vi-VN")})</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-brand-border/60 bg-brand-warm/70 px-4 py-3 text-sm">
          <p className="text-brand-muted">{labels.schoolCount}</p>
          <p className="mt-1 font-heading text-lg font-bold text-brand-ink">
            {activeList.summary.count.toLocaleString("vi-VN")}
          </p>
        </div>
        <div className="rounded-xl border border-brand-border/60 bg-brand-warm/70 px-4 py-3 text-sm">
          <p className="text-brand-muted">{labels.totalAmount}</p>
          <p className="mt-1 font-heading text-lg font-bold text-brand-danger">
            {formatVnd(activeList.summary.totalAmount)}
          </p>
        </div>
        <div className="rounded-xl border border-brand-border/60 bg-brand-warm/70 px-4 py-3 text-sm">
          <p className="text-brand-muted">{labels.withDriveLink}</p>
          <p className="mt-1 font-heading text-lg font-bold text-brand-green">
            {activeList.summary.withDriveLink.toLocaleString("vi-VN")}
          </p>
        </div>
      </div>

      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted"
          aria-hidden
        />
        <input
          type="search"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder={labels.searchPlaceholder}
          className="w-full rounded-xl border border-brand-border/70 bg-white py-2.5 pl-10 pr-4 text-sm text-brand-ink outline-none ring-brand-green/30 transition focus:ring-2"
        />
      </div>

      {pageRows.length === 0 ? (
        <p className="rounded-xl border border-dashed border-brand-border/80 px-4 py-8 text-center text-sm text-brand-muted">
          {labels.noResults}
        </p>
      ) : (
        <>
          <div className="table-scroll hidden rounded-xl border border-brand-border/60 lg:block">
            <table className="min-w-[52rem] w-full divide-y divide-brand-border/60 text-left">
              <thead className="bg-brand-surface text-xs font-semibold uppercase tracking-wide text-brand-muted">
                <tr>
                  <th className="px-3 py-3">{labels.columnStt}</th>
                  <th className="px-3 py-3">{labels.columnSchool}</th>
                  <th className="px-3 py-3">{labels.columnCommune}</th>
                  <th className="px-3 py-3">{labels.columnProvince}</th>
                  <th className="px-3 py-3 text-right">{labels.columnStudents}</th>
                  <th className="px-3 py-3 text-right">{labels.columnAmount}</th>
                  <th className="px-3 py-3">{labels.columnDrive}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40 bg-white">
                {pageRows.map((row) => (
                  <tr key={`${activeList.id}-${row.stt}`} className="align-top hover:bg-brand-surface/50">
                    <ExpenseRowCells row={row} labels={labels} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="space-y-3 lg:hidden">
            {pageRows.map((row) => (
              <ExpenseCard key={`${activeList.id}-${row.stt}`} row={row} labels={labels} />
            ))}
          </ul>
        </>
      )}

      {totalPages > 1 ? (
        <div className="flex flex-col items-center justify-between gap-3 border-t border-brand-border/50 pt-4 sm:flex-row">
          <p className="text-sm text-brand-muted">
            {labels.page} {currentPage} {labels.of} {totalPages}
            {search.trim() ? ` · ${filteredRows.length.toLocaleString("vi-VN")} dòng` : null}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              className="pill-inactive inline-flex items-center gap-1 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              {labels.prev}
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
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
  );
}
