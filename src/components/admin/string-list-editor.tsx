"use client";

import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

type StringListEditorProps = {
  name: string;
  label: string;
  initialItems: string[];
  itemPlaceholder?: string;
};

export function StringListEditor({
  name,
  label,
  initialItems,
  itemPlaceholder = "Nội dung",
}: StringListEditorProps) {
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
          Thêm mục
        </button>
      </div>
      <div className="space-y-2">
        {items.map((value, index) => (
          <div key={`${name}-${index}`} className="flex gap-2">
            <textarea
              value={value}
              rows={2}
              className="admin-input resize-y"
              placeholder={itemPlaceholder}
              onChange={(event) =>
                setItems((prev) => prev.map((item, i) => (i === index ? event.target.value : item)))
              }
            />
            <button
              type="button"
              className="admin-btn-ghost shrink-0 px-2 text-red-600"
              onClick={() =>
                setItems((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)))
              }
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
