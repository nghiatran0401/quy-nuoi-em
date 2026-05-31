"use client";

import { ChevronDown, ChevronUp, CreditCard, FileCheck, MapPin, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { FaqBankPreview } from "@/components/admin/faq-bank-preview";
import type { DonateInfoContent } from "@/lib/data/donate-info";
import type { HomeFaqContent, HomeFaqItem } from "@/lib/data/homepage";
import { normalizeHomeFaqContent, normalizeHomeFaqItem } from "@/lib/data/homepage";
import {
  FAQ_ITEM_TYPE_OPTIONS,
  faqTypeLabel,
  type HomeFaqItemType,
} from "@/lib/faq-item-types";

type HomepageFaqEditorProps = {
  locale: "vi";
  initialFaq: HomeFaqContent;
  donateInfo: DonateInfoContent;
};

const TYPE_ICONS = {
  "dia-chi": MapPin,
  "ngan-hang": CreditCard,
  "quy-trinh": FileCheck,
} as const;

function emptyFaqItem(): HomeFaqItem {
  return {
    id: `cau-hoi-${crypto.randomUUID().slice(0, 8)}`,
    question: "Câu hỏi mới",
    type: "dia-chi",
    body: "",
    address: "",
    steps: [],
  };
}

function serializeFaqItem(item: HomeFaqItem): HomeFaqItem {
  const normalized = normalizeHomeFaqItem(item);
  const base = {
    id: normalized.id,
    question: normalized.question.trim(),
    type: normalized.type,
  };

  if (normalized.type === "dia-chi") {
    return {
      ...base,
      body: normalized.body?.trim() || undefined,
      address: normalized.address?.trim() || undefined,
    };
  }

  if (normalized.type === "quy-trinh") {
    return {
      ...base,
      steps: normalized.steps?.map((step) => step.trim()).filter(Boolean) ?? [],
    };
  }

  return base;
}

function toFaqPayload(faq: HomeFaqContent): HomeFaqContent {
  return normalizeHomeFaqContent({
    ...faq,
    eyebrow: faq.eyebrow.trim(),
    title: faq.title.trim(),
    intro: faq.intro.trim(),
    items: faq.items.map(serializeFaqItem),
  });
}

type FaqItemCardProps = {
  item: HomeFaqItem;
  index: number;
  expanded: boolean;
  donateInfo: DonateInfoContent;
  onToggle: () => void;
  onRemove: () => void;
  onChange: (patch: Partial<HomeFaqItem>) => void;
};

function FaqItemCard({
  item,
  index,
  expanded,
  donateInfo,
  onToggle,
  onRemove,
  onChange,
}: FaqItemCardProps) {
  const Icon = TYPE_ICONS[item.type];
  const typeLabel = faqTypeLabel(item.type);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-start gap-2 border-b border-slate-100 bg-slate-50/80 px-3 py-2.5">
        <button
          type="button"
          onClick={onToggle}
          className="flex min-w-0 flex-1 items-start gap-3 text-left"
          aria-expanded={expanded}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[var(--admin-accent)] shadow-sm ring-1 ring-slate-200">
            <Icon className="h-4 w-4" aria-hidden />
          </span>
          <span className="min-w-0 flex-1 pt-0.5">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              Câu hỏi {index + 1} · {typeLabel}
            </span>
            <span className="mt-0.5 block truncate text-sm font-semibold text-slate-900">
              {item.question.trim() || "Chưa có tiêu đề câu hỏi"}
            </span>
          </span>
          {expanded ? (
            <ChevronUp className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
          ) : (
            <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
          )}
        </button>
        <button
          type="button"
          className="admin-btn-ghost shrink-0 px-2 py-1 text-xs text-red-600 hover:bg-red-50"
          onClick={onRemove}
          aria-label={`Xóa câu hỏi ${index + 1}`}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {expanded ? (
        <div className="space-y-4 p-4">
          <div>
            <span className="admin-label mb-2 block">Kiểu câu trả lời</span>
            <div className="flex flex-wrap gap-2">
              {FAQ_ITEM_TYPE_OPTIONS.map((option) => {
                const OptionIcon = TYPE_ICONS[option.value];
                const selected = item.type === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      const type = option.value as HomeFaqItemType;
                      onChange({
                        type,
                        steps: type === "quy-trinh" ? (item.steps?.length ? item.steps : [""]) : undefined,
                        address: type === "dia-chi" ? (item.address ?? "") : undefined,
                        body: type === "dia-chi" ? (item.body ?? "") : undefined,
                      });
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                      selected
                        ? "border-[var(--admin-accent)] bg-[color-mix(in_srgb,var(--admin-accent)_10%,white)] text-slate-900 ring-1 ring-[var(--admin-accent)]"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <OptionIcon className="h-3.5 w-3.5" />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="admin-label" htmlFor={`faq-q-${item.id}`}>
              Câu hỏi (tiêu đề khi mở/đóng mục)
            </label>
            <input
              id={`faq-q-${item.id}`}
              value={item.question}
              onChange={(event) => onChange({ question: event.target.value })}
              className="admin-input"
              placeholder="Ví dụ: Số tài khoản của Dự án Nuôi Em?"
            />
          </div>

          {item.type === "dia-chi" ? (
            <div className="space-y-3 rounded-lg border border-emerald-100 bg-emerald-50/40 p-3">
              <p className="text-xs font-medium text-emerald-900">Nội dung loại Địa chỉ</p>
              <div>
                <label className="admin-label" htmlFor={`faq-body-${item.id}`}>
                  Đoạn giải thích
                </label>
                <textarea
                  id={`faq-body-${item.id}`}
                  value={item.body ?? ""}
                  onChange={(event) => onChange({ body: event.target.value })}
                  rows={3}
                  className="admin-input resize-y"
                />
              </div>
              <div>
                <label className="admin-label" htmlFor={`faq-addr-${item.id}`}>
                  Địa chỉ hiển thị
                </label>
                <input
                  id={`faq-addr-${item.id}`}
                  value={item.address ?? ""}
                  onChange={(event) => onChange({ address: event.target.value })}
                  className="admin-input"
                  placeholder="15 Ngách 352/15 đường Giải Phóng, Phường Phương Liệt, Thành phố Hà Nội"
                />
              </div>
            </div>
          ) : null}

          {item.type === "quy-trinh" ? (
            <div className="space-y-3 rounded-lg border border-blue-100 bg-blue-50/40 p-3">
              <p className="text-xs font-medium text-blue-900">Nội dung loại Quy trình (các bước)</p>
              <div>
                <label className="admin-label" htmlFor={`faq-steps-${item.id}`}>
                  Các bước — mỗi dòng một bước
                </label>
                <textarea
                  id={`faq-steps-${item.id}`}
                  value={(item.steps ?? []).join("\n")}
                  onChange={(event) => onChange({ steps: event.target.value.split("\n") })}
                  rows={6}
                  className="admin-input resize-y font-mono text-sm"
                />
              </div>
            </div>
          ) : null}

          {item.type === "ngan-hang" ? (
            <div className="space-y-3 rounded-lg border border-amber-100 bg-amber-50/50 p-3">
              <p className="text-xs leading-relaxed text-amber-950">
                Khối ngân hàng (tên ngân hàng, số tài khoản, mã QR, cú pháp) chỉnh ở mục{" "}
                <strong>Thông tin chuyển khoản</strong> bên dưới form. Ở đây chỉ cần sửa câu hỏi.
              </p>
              <FaqBankPreview bank={donateInfo} question={item.question} />
              <a href="#donate-info-section" className="text-xs font-medium text-[var(--admin-accent)] underline">
                Nhảy tới Thông tin chuyển khoản ↓
              </a>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function HomepageFaqEditor({ locale, initialFaq, donateInfo }: HomepageFaqEditorProps) {
  const [faq, setFaq] = useState<HomeFaqContent>(() => normalizeHomeFaqContent(initialFaq));
  const [expandedId, setExpandedId] = useState<string | null>(initialFaq.items[0]?.id ?? null);

  const faqJson = useMemo(() => JSON.stringify(toFaqPayload(faq)), [faq]);

  const updateItem = (itemId: string, patch: Partial<HomeFaqItem>) => {
    setFaq((prev) => ({
      ...prev,
      items: prev.items.map((row) => (row.id === itemId ? normalizeHomeFaqItem({ ...row, ...patch }) : row)),
    }));
  };

  const addItem = () => {
    const item = emptyFaqItem();
    setFaq((prev) => ({ ...prev, items: [...prev.items, item] }));
    setExpandedId(item.id);
  };

  return (
    <div className="space-y-4">
      <input type="hidden" name={`${locale}_faq_json`} value={faqJson} />

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="admin-label" htmlFor={`${locale}_faq_eyebrow`}>
            Nhãn phụ FAQ
          </label>
          <input
            id={`${locale}_faq_eyebrow`}
            value={faq.eyebrow}
            onChange={(event) => setFaq((prev) => ({ ...prev, eyebrow: event.target.value }))}
            className="admin-input"
          />
        </div>
        <div>
          <label className="admin-label" htmlFor={`${locale}_faq_title`}>
            Tiêu đề FAQ
          </label>
          <input
            id={`${locale}_faq_title`}
            value={faq.title}
            onChange={(event) => setFaq((prev) => ({ ...prev, title: event.target.value }))}
            className="admin-input"
          />
        </div>
      </div>

      <div>
        <label className="admin-label" htmlFor={`${locale}_faq_intro`}>
          Mô tả mở đầu FAQ
        </label>
        <textarea
          id={`${locale}_faq_intro`}
          value={faq.intro}
          onChange={(event) => setFaq((prev) => ({ ...prev, intro: event.target.value }))}
          rows={2}
          className="admin-input resize-y"
        />
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-slate-200 pt-4">
        <p className="text-sm font-medium text-slate-800">Danh sách câu hỏi</p>
        <button type="button" className="admin-btn-secondary px-3 py-1.5 text-xs" onClick={addItem}>
          <Plus className="h-3.5 w-3.5" />
          Thêm câu hỏi
        </button>
      </div>

      <div className="space-y-2">
        {faq.items.map((item, index) => (
          <FaqItemCard
            key={item.id}
            item={item}
            index={index}
            expanded={expandedId === item.id}
            donateInfo={donateInfo}
            onToggle={() => setExpandedId((current) => (current === item.id ? null : item.id))}
            onRemove={() => {
              setFaq((prev) => ({ ...prev, items: prev.items.filter((row) => row.id !== item.id) }));
              if (expandedId === item.id) {
                setExpandedId(null);
              }
            }}
            onChange={(patch) => updateItem(item.id, patch)}
          />
        ))}
      </div>
    </div>
  );
}
