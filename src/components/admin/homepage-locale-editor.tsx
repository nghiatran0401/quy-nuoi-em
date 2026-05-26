"use client";

import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import type { HomeFaqContent, HomeFaqItem } from "@/lib/data/homepage";
import type { StatItem } from "@/content/types";
import { StatsListEditor } from "@/components/admin/stats-list-editor";

type HomepageLocaleEditorProps = {
  locale: "vi" | "en";
  initialStats: StatItem[];
  initialFaq: HomeFaqContent;
};

function normalizeFaq(locale: "vi" | "en", input: HomeFaqContent | undefined): HomeFaqContent {
  if (input) return input;
  return {
    eyebrow: locale === "vi" ? "Giải đáp thắc mắc" : "FAQ",
    title: locale === "vi" ? "Câu hỏi thường gặp" : "Frequently asked questions",
    intro: "",
    items: [],
  };
}

function emptyFaqItem(locale: "vi" | "en"): HomeFaqItem {
  return {
    id: crypto.randomUUID().slice(0, 8),
    question: "Câu hỏi mới",
    type: "address",
    body: "",
    address: "",
    steps: [],
  };
}

function toFaqPayload(faq: HomeFaqContent): HomeFaqContent {
  return {
    ...faq,
    items: faq.items.map((item) => ({
      id: item.id,
      question: item.question,
      type: item.type,
      body: item.body?.trim() || undefined,
      address: item.address?.trim() || undefined,
      steps: item.steps?.map((step) => step.trim()).filter(Boolean) ?? undefined,
    })),
  };
}

export function HomepageLocaleEditor({ locale, initialStats, initialFaq }: HomepageLocaleEditorProps) {
  const [faq, setFaq] = useState<HomeFaqContent>(normalizeFaq(locale, initialFaq));

  const faqJson = useMemo(() => JSON.stringify(toFaqPayload(faq)), [faq]);

  return (
    <div className="space-y-5">
      <input type="hidden" name={`${locale}_faq_json`} value={faqJson} />

      <StatsListEditor name={`${locale}_stats_json`} initialStats={initialStats} />

      <section className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-800">FAQ</h3>
          <button
            type="button"
            className="admin-btn-secondary px-3 py-1.5 text-xs"
            onClick={() => setFaq((prev) => ({ ...prev, items: [...prev.items, emptyFaqItem(locale)] }))}
          >
            <Plus className="h-3.5 w-3.5" />
            Thêm câu hỏi
          </button>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <input
            value={faq.eyebrow}
            onChange={(event) => setFaq((prev) => ({ ...prev, eyebrow: event.target.value }))}
            className="admin-input"
            placeholder="Nhãn phụ FAQ"
          />
          <input
            value={faq.title}
            onChange={(event) => setFaq((prev) => ({ ...prev, title: event.target.value }))}
            className="admin-input"
            placeholder="Tiêu đề FAQ"
          />
        </div>
        <textarea
          value={faq.intro}
          onChange={(event) => setFaq((prev) => ({ ...prev, intro: event.target.value }))}
          rows={2}
          className="admin-input mt-2 resize-y"
          placeholder="Mô tả mở đầu FAQ"
        />

        <div className="mt-3 space-y-3">
          {faq.items.map((item, index) => (
            <div key={item.id} className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase text-slate-500">Câu hỏi {index + 1}</p>
                <button
                  type="button"
                  className="admin-btn-ghost px-2 py-1 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => setFaq((prev) => ({ ...prev, items: prev.items.filter((row) => row.id !== item.id) }))}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <input
                  value={item.id}
                  onChange={(event) =>
                    setFaq((prev) => ({
                      ...prev,
                      items: prev.items.map((row) => (row.id === item.id ? { ...row, id: event.target.value } : row)),
                    }))
                  }
                  className="admin-input"
                  placeholder="Mã (id)"
                />
                <select
                  value={item.type}
                  onChange={(event) =>
                    setFaq((prev) => ({
                      ...prev,
                      items: prev.items.map((row) =>
                        row.id === item.id
                          ? {
                              ...row,
                              type: event.target.value as HomeFaqItem["type"],
                              steps: event.target.value === "process" ? row.steps ?? [""] : [],
                            }
                          : row,
                      ),
                    }))
                  }
                  className="admin-input"
                >
                  <option value="address">Địa chỉ</option>
                  <option value="bank">Ngân hàng</option>
                  <option value="process">Quy trình</option>
                </select>
              </div>

              <input
                value={item.question}
                onChange={(event) =>
                  setFaq((prev) => ({
                    ...prev,
                    items: prev.items.map((row) =>
                      row.id === item.id ? { ...row, question: event.target.value } : row,
                    ),
                  }))
                }
                className="admin-input mt-2"
                placeholder="Nội dung câu hỏi"
              />

              <textarea
                value={item.body ?? ""}
                onChange={(event) =>
                  setFaq((prev) => ({
                    ...prev,
                    items: prev.items.map((row) =>
                      row.id === item.id ? { ...row, body: event.target.value } : row,
                    ),
                  }))
                }
                rows={2}
                className="admin-input mt-2 resize-y"
                placeholder="Nội dung trả lời"
              />

              {item.type === "address" ? (
                <input
                  value={item.address ?? ""}
                  onChange={(event) =>
                    setFaq((prev) => ({
                      ...prev,
                      items: prev.items.map((row) =>
                        row.id === item.id ? { ...row, address: event.target.value } : row,
                      ),
                    }))
                  }
                  className="admin-input mt-2"
                  placeholder="Địa chỉ"
                />
              ) : null}

              {item.type === "process" ? (
                <textarea
                  value={(item.steps ?? []).join("\n")}
                  onChange={(event) =>
                    setFaq((prev) => ({
                      ...prev,
                      items: prev.items.map((row) =>
                        row.id === item.id
                          ? { ...row, steps: event.target.value.split("\n") }
                          : row,
                      ),
                    }))
                  }
                  rows={4}
                  className="admin-input mt-2 resize-y"
                  placeholder="Mỗi dòng là một bước"
                />
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
