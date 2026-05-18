"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
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
  "rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent";

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
      <p className="mb-4 text-center text-sm text-amber-700">
        {labels.sampleDataNote.replace("{shown}", String(records.length))}
      </p>

      <div className="mb-8 flex flex-col gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm lg:flex-row">
        <div className="relative flex-grow">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" aria-hidden />
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
        </div>
        <select
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          className={selectClassName}
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
        >
          <option value="">{labels.allStatuses}</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
          <thead className="bg-brand-warm text-xs font-bold uppercase tracking-wide text-brand-blue">
            <tr>
              <th className="px-4 py-3">{labels.profileCode}</th>
              <th className="px-4 py-3">{labels.fullName}</th>
              <th className="px-4 py-3">{labels.birthYear}</th>
              <th className="px-4 py-3">{labels.gender}</th>
              <th className="px-4 py-3">{labels.province}</th>
              <th className="px-4 py-3">{labels.status}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.map((child) => (
              <tr key={child.code} className="hover:bg-brand-surface">
                <td className="px-4 py-3 font-mono text-brand-blue">
                  <Link href={`/danh-sach-bao-tro/${child.code}`} className="hover:underline">
                    {child.code}
                  </Link>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{child.name}</td>
                <td className="px-4 py-3 text-gray-700">{child.birthYear}</td>
                <td className="px-4 py-3 text-gray-700">{child.gender}</td>
                <td className="px-4 py-3 text-gray-700">{child.province}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={child.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 ? (
          <p className="p-8 text-center text-gray-500">{labels.noResults}</p>
        ) : null}
      </div>
      <p className="mt-3 text-right text-xs text-gray-400">
        {filtered.length} / {summaryTotal}
      </p>
    </section>
  );
}
