"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { StatusBadge } from "@/components/data/status-badge";
import type { Child } from "@/lib/data/types";

type ChildrenTableProps = {
  records: Child[];
  provinces: string[];
  statuses: Child["status"][];
  labels: {
    searchPlaceholder: string;
    allProvinces: string;
    allStatuses: string;
    profileCode: string;
    fullName: string;
    birthYear: string;
    gender: string;
    province: string;
    status: string;
    noResults: string;
    sampleDataNote: string;
  };
  summaryTotal: number;
};

const selectClassName =
  "min-h-11 w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-base text-brand-muted focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent sm:text-sm lg:w-auto";

export function ChildrenTable({
  records,
  provinces,
  statuses,
  labels,
  summaryTotal,
}: ChildrenTableProps) {
  const [query, setQuery] = useState("");
  const [province, setProvince] = useState("");
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return records.filter((child) => {
      if (province && child.province !== province) return false;
      if (status && child.status !== status) return false;
      if (!q) return true;
      return (
        child.name.toLowerCase().includes(q) || child.code.toLowerCase().includes(q)
      );
    });
  }, [records, province, query, status]);

  return (
    <section>
      <p className="notice-info mx-auto mb-6 max-w-2xl px-1">
        {labels.sampleDataNote.replace("{shown}", String(records.length))}
      </p>

      <div className="mb-6 flex flex-col gap-3 rounded-xl border border-brand-border/60 bg-white p-4 shadow-sm sm:mb-8 sm:gap-4 lg:flex-row">
        <div className="relative min-w-0 flex-grow">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-brand-muted/70" aria-hidden />
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className="min-h-11 w-full rounded-lg border border-brand-border py-3 pl-10 pr-4 text-base focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent sm:text-sm"
          />
        </div>
        <select
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className={selectClassName}
          aria-label={labels.allProvinces}
        >
          <option value="">{labels.allProvinces}</option>
          {provinces.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={selectClassName}
          aria-label={labels.allStatuses}
        >
          <option value="">{labels.allStatuses}</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile: card list */}
      <ul className="space-y-3 lg:hidden" aria-label={labels.fullName}>
        {filtered.map((child) => (
          <li
            key={child.code}
            className="rounded-xl border border-brand-border/60 bg-white p-4 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <Link href={`/danh-sach-diem-truong-ho-tro/${child.code}`} className="link-accent font-mono text-sm">
                {child.code}
              </Link>
              <StatusBadge status={child.status} />
            </div>
            <p className="mt-2 font-medium text-brand-ink">{child.name}</p>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-brand-muted">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted/80">
                  {labels.birthYear}
                </dt>
                <dd className="text-brand-ink">{child.birthYear}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted/80">
                  {labels.gender}
                </dt>
                <dd className="text-brand-ink">{child.gender}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted/80">
                  {labels.province}
                </dt>
                <dd className="text-brand-ink">{child.province}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
      {filtered.length === 0 ? (
        <p className="rounded-xl border border-brand-border/60 bg-white p-8 text-center text-brand-muted lg:hidden">
          {labels.noResults}
        </p>
      ) : null}

      {/* Desktop: table */}
      <div className="table-scroll hidden rounded-xl border border-brand-border/60 bg-white shadow-sm lg:block">
        <table className="w-full divide-y divide-brand-border text-left text-sm">
          <thead className="bg-brand-sky-soft text-xs font-bold uppercase tracking-wide text-brand-ink">
            <tr>
              <th className="px-4 py-3">{labels.profileCode}</th>
              <th className="px-4 py-3">{labels.fullName}</th>
              <th className="px-4 py-3">{labels.birthYear}</th>
              <th className="px-4 py-3">{labels.gender}</th>
              <th className="px-4 py-3">{labels.province}</th>
              <th className="px-4 py-3">{labels.status}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {filtered.map((child) => (
              <tr key={child.code} className="hover:bg-brand-surface">
                <td className="px-4 py-3 font-mono">
                  <Link href={`/danh-sach-diem-truong-ho-tro/${child.code}`} className="link-accent text-sm">
                    {child.code}
                  </Link>
                </td>
                <td className="px-4 py-3 font-medium text-brand-ink">{child.name}</td>
                <td className="px-4 py-3 text-brand-muted">{child.birthYear}</td>
                <td className="px-4 py-3 text-brand-muted">{child.gender}</td>
                <td className="px-4 py-3 text-brand-muted">{child.province}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={child.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 ? (
          <p className="p-8 text-center text-brand-muted">{labels.noResults}</p>
        ) : null}
      </div>

      <p className="mt-3 text-center text-xs text-brand-muted/70 sm:text-right">
        {filtered.length} / {summaryTotal}
      </p>
    </section>
  );
}
