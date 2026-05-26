"use client";

import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import type {
  Process2026CostTier,
  Process2026PaymentScenario,
  Process2026TimelineItem,
} from "@/lib/data/process-2026-page";

type CostTiersEditorProps = {
  name: string;
  initialItems: Process2026CostTier[];
};

export function CostTiersEditor({ name, initialItems }: CostTiersEditorProps) {
  const [items, setItems] = useState<Process2026CostTier[]>(
    initialItems.length > 0 ? initialItems : [{ label: "", amount: "", breakdown: "" }],
  );
  const payload = useMemo(() => JSON.stringify(items), [items]);

  return (
    <ListSection name={name} payload={payload} label="Mức chi phí" onAdd={() => setItems((prev) => [...prev, { label: "", amount: "", breakdown: "" }])}>
      {items.map((item, index) => (
        <ItemCard key={`${name}-${index}`} index={index} onRemove={() => setItems((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)))}>
          <input
            value={item.label}
            onChange={(event) => updateItem(setItems, index, { label: event.target.value })}
            className="admin-input"
            placeholder="Nhãn"
          />
          <input
            value={item.amount}
            onChange={(event) => updateItem(setItems, index, { amount: event.target.value })}
            className="admin-input mt-2"
            placeholder="Số tiền"
          />
          <input
            value={item.breakdown}
            onChange={(event) => updateItem(setItems, index, { breakdown: event.target.value })}
            className="admin-input mt-2"
            placeholder="Chi tiết"
          />
        </ItemCard>
      ))}
    </ListSection>
  );
}

type PaymentScenariosEditorProps = {
  name: string;
  initialItems: Process2026PaymentScenario[];
};

export function PaymentScenariosEditor({ name, initialItems }: PaymentScenariosEditorProps) {
  const [items, setItems] = useState<Process2026PaymentScenario[]>(
    initialItems.length > 0 ? initialItems : [{ label: "", tag: null, detail: "" }],
  );
  const payload = useMemo(() => JSON.stringify(items), [items]);

  return (
    <ListSection
      name={name}
      payload={payload}
      label="Kịch bản chuyển tiền"
      onAdd={() => setItems((prev) => [...prev, { label: "", tag: null, detail: "" }])}
    >
      {items.map((item, index) => (
        <ItemCard key={`${name}-${index}`} index={index} onRemove={() => setItems((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)))}>
          <div className="grid gap-2 sm:grid-cols-2">
            <input
              value={item.label}
              onChange={(event) => updateItem(setItems, index, { label: event.target.value })}
              className="admin-input"
              placeholder="Nhãn (vd. 1 lần)"
            />
            <input
              value={item.tag ?? ""}
              onChange={(event) =>
                updateItem(setItems, index, { tag: event.target.value.trim() ? event.target.value : null })
              }
              className="admin-input"
              placeholder="Tag (tuỳ chọn)"
            />
          </div>
          <textarea
            value={item.detail}
            rows={2}
            onChange={(event) => updateItem(setItems, index, { detail: event.target.value })}
            className="admin-input mt-2 resize-y"
            placeholder="Mô tả"
          />
        </ItemCard>
      ))}
    </ListSection>
  );
}

type TimelineEditorProps = {
  name: string;
  initialItems: Process2026TimelineItem[];
};

export function TimelineEditor({ name, initialItems }: TimelineEditorProps) {
  const [items, setItems] = useState<Process2026TimelineItem[]>(
    initialItems.length > 0 ? initialItems : [{ when: "", what: "" }],
  );
  const payload = useMemo(() => JSON.stringify(items), [items]);

  return (
    <ListSection
      name={name}
      payload={payload}
      label="Mốc thời gian"
      onAdd={() => setItems((prev) => [...prev, { when: "", what: "" }])}
    >
      {items.map((item, index) => (
        <ItemCard key={`${name}-${index}`} index={index} onRemove={() => setItems((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)))}>
          <div className="grid gap-2 sm:grid-cols-2">
            <input
              value={item.when}
              onChange={(event) => updateItem(setItems, index, { when: event.target.value })}
              className="admin-input"
              placeholder="Thời điểm"
            />
            <input
              value={item.what}
              onChange={(event) => updateItem(setItems, index, { what: event.target.value })}
              className="admin-input"
              placeholder="Nội dung"
            />
          </div>
        </ItemCard>
      ))}
    </ListSection>
  );
}

function updateItem<T extends object>(
  setItems: Dispatch<SetStateAction<T[]>>,
  index: number,
  patch: Partial<T>,
) {
  setItems((prev) => prev.map((row, i) => (i === index ? { ...row, ...patch } : row)));
}

function ListSection({
  name,
  payload,
  label,
  onAdd,
  children,
}: {
  name: string;
  payload: string;
  label: string;
  onAdd: () => void;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <input type="hidden" name={name} value={payload} />
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">{label}</h3>
        <button type="button" className="admin-btn-secondary px-3 py-1.5 text-xs" onClick={onAdd}>
          <Plus className="h-3.5 w-3.5" />
          Thêm mục
        </button>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function ItemCard({
  index,
  onRemove,
  children,
}: {
  index: number;
  onRemove: () => void;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase text-slate-500">Mục {index + 1}</p>
        <button type="button" className="admin-btn-ghost px-2 py-1 text-xs text-red-600" onClick={onRemove}>
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
      {children}
    </div>
  );
}
