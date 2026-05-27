"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { SchoolRecord } from "@/lib/data/schools";

type SchoolsTableProps = {
  records: SchoolRecord[];
  provinces: string[];
};

const selectClassName =
  "rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-muted focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent";
const PAGE_SIZE = 20;

function statusBadgeClass(status: string): string {
  if (status === "Đang ăn") {
    return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200";
  }
  return "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200";
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("vi-VN").format(value);
}

export function SchoolsTable({ records, provinces }: SchoolsTableProps) {
  const [query, setQuery] = useState("");
  const [province, setProvince] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return records.filter((row) => {
      if (province && row.province !== province) return false;
      if (!q) return true;
      return (
        row.name.toLowerCase().includes(q) ||
        row.districtProvince.toLowerCase().includes(q) ||
        row.schoolPointsSummary.toLowerCase().includes(q)
      );
    });
  }, [records, province, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pagedRecords = filtered.slice(pageStart, pageStart + PAGE_SIZE);
  const shownFrom = filtered.length === 0 ? 0 : pageStart + 1;
  const shownTo = Math.min(pageStart + PAGE_SIZE, filtered.length);

  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-brand-border/60 bg-white p-4 shadow-sm">
        <h2 className="text-xl font-semibold text-brand-ink">{formatNumber(filtered.length)} điểm trường phù hợp</h2>
        <p className="text-sm text-brand-muted">
          Hiển thị {shownFrom}-{shownTo} trên tổng {filtered.length} điểm trường
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-brand-border/60 bg-white p-4 shadow-sm lg:flex-row">
        <div className="relative flex-grow">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-brand-muted/70" aria-hidden />
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Tìm điểm trường..."
            className="w-full rounded-lg border border-brand-border py-3 pl-10 pr-4 text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
        </div>
        <select
          value={province}
          onChange={(e) => {
            setProvince(e.target.value);
            setPage(1);
          }}
          className={selectClassName}
        >
          <option value="">Tất cả tỉnh</option>
          {provinces.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-brand-border/60 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-brand-border text-left text-sm">
          <thead className="bg-brand-sky-soft text-xs font-bold uppercase tracking-wide text-brand-ink">
            <tr>
              <th className="px-4 py-3">STT</th>
              <th className="px-4 py-3">Tên trường</th>
              <th className="px-4 py-3">Địa chỉ / Tỉnh</th>
              <th className="px-4 py-3">Số học sinh</th>
              <th className="px-4 py-3">Mã đã được cấp</th>
              <th className="px-4 py-3">Công văn dừng ăn</th>
              <th className="px-4 py-3">Tình trạng ăn</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {pagedRecords.map((row) => (
              <tr key={row.stt} className="hover:bg-brand-surface">
                <td className="px-4 py-3 font-medium text-brand-muted">{row.stt}</td>
                <td className="px-4 py-3 font-semibold text-brand-ink">{row.name}</td>
                <td className="px-4 py-3 text-brand-muted">
                  <p>{row.districtProvince}</p>
                  <p className="text-xs">{row.schoolPointsSummary}</p>
                </td>
                <td className="px-4 py-3 font-semibold text-brand-ink">{formatNumber(row.students)}</td>
                <td className="px-4 py-3 text-brand-muted">
                  {row.issuedCount === null ? "—" : formatNumber(row.issuedCount)}
                </td>
                <td className="px-4 py-3">
                  {row.documentUrl ? (
                    <a
                      href={row.documentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="link-accent text-xs"
                    >
                      Xem công văn
                    </a>
                  ) : (
                    <span className="text-brand-muted">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadgeClass(row.status)}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 ? (
          <p className="p-8 text-center text-brand-muted">Không tìm thấy điểm trường phù hợp.</p>
        ) : null}
      </div>
      {filtered.length > 0 ? (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-brand-border/60 bg-white px-4 py-3 shadow-sm">
          <p className="text-sm text-brand-muted">
            Trang {currentPage} / {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="rounded-md border border-brand-border px-3 py-1.5 text-sm text-brand-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              Trước
            </button>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="rounded-md border border-brand-border px-3 py-1.5 text-sm text-brand-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              Sau
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
