"use client";

import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import type { StatItem } from "@/content/types";

type StatsListEditorProps = {
  name: string;
  initialStats: StatItem[];
  label?: string;
};

export function StatsListEditor({ name, initialStats, label = "Thống kê" }: StatsListEditorProps) {
  const [stats, setStats] = useState<StatItem[]>(initialStats.length > 0 ? initialStats : [{ value: "", label: "", hint: "" }]);
  const payload = useMemo(() => JSON.stringify(stats), [stats]);

  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <input type="hidden" name={name} value={payload} />
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">{label}</h3>
        <button
          type="button"
          className="admin-btn-secondary px-3 py-1.5 text-xs"
          onClick={() => setStats((prev) => [...prev, { value: "", label: "", hint: "" }])}
        >
          <Plus className="h-3.5 w-3.5" />
          Thêm chỉ số
        </button>
      </div>
      <div className="space-y-3">
        {stats.map((item, index) => (
          <div key={`${item.label}-${index}`} className="rounded-lg border border-slate-200 bg-white p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase text-slate-500">Chỉ số {index + 1}</p>
              <button
                type="button"
                className="admin-btn-ghost px-2 py-1 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => setStats((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)))}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                value={item.value}
                onChange={(event) =>
                  setStats((prev) => prev.map((row, i) => (i === index ? { ...row, value: event.target.value } : row)))
                }
                className="admin-input"
                placeholder="Giá trị"
              />
              <input
                value={item.label}
                onChange={(event) =>
                  setStats((prev) => prev.map((row, i) => (i === index ? { ...row, label: event.target.value } : row)))
                }
                className="admin-input"
                placeholder="Nhãn"
              />
            </div>
            <input
              value={item.hint ?? ""}
              onChange={(event) =>
                setStats((prev) => prev.map((row, i) => (i === index ? { ...row, hint: event.target.value } : row)))
              }
              className="admin-input mt-2"
              placeholder="Ghi chú (tuỳ chọn)"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
