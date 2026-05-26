"use client";

import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

type ParagraphListEditorProps = {
  name: string;
  label: string;
  initialItems: string[];
  emptyItemPlaceholder?: string;
};

export function ParagraphListEditor({
  name,
  label,
  initialItems,
  emptyItemPlaceholder = "Nội dung đoạn văn",
}: ParagraphListEditorProps) {
  const [items, setItems] = useState<string[]>(initialItems.length > 0 ? initialItems : [""]);
  const payload = useMemo(() => JSON.stringify(items), [items]);

  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <input type="hidden" name={name} value={payload} />

      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">{label}</h3>
        <button
          type="button"
          className="admin-btn-secondary px-3 py-1.5 text-xs"
          onClick={() => setItems((prev) => [...prev, ""])}
        >
            <Plus className="h-3.5 w-3.5" />
            Thêm đoạn
        </button>
      </div>

      <div className="space-y-2">
        {items.map((value, index) => (
          <div key={`${name}-${index}`} className="rounded-lg border border-slate-200 bg-white p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase text-slate-500">Đoạn {index + 1}</p>
              <button
                type="button"
                className="admin-btn-ghost px-2 py-1 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() =>
                  setItems((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)))
                }
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <textarea
              value={value}
              rows={3}
              className="admin-input resize-y"
              placeholder={emptyItemPlaceholder}
              onChange={(event) =>
                setItems((prev) => prev.map((item, i) => (i === index ? event.target.value : item)))
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
}
