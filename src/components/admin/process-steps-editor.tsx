"use client";

import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import type { Process2026Step } from "@/lib/data/process-2026-page";

type ProcessStepsEditorProps = {
  name: string;
  initialSteps: Process2026Step[];
  label?: string;
};

function normalizeSteps(steps: Process2026Step[]): Process2026Step[] {
  if (steps.length === 0) {
    return [{ number: "01", title: "", timing: "", summary: "", bullets: [""] }];
  }
  return steps.map((step) => ({
    ...step,
    bullets: step.bullets.length > 0 ? step.bullets : [""],
  }));
}

export function ProcessStepsEditor({
  name,
  initialSteps,
  label = "6 bước quy trình",
}: ProcessStepsEditorProps) {
  const [steps, setSteps] = useState<Process2026Step[]>(normalizeSteps(initialSteps));
  const payload = useMemo(() => JSON.stringify(steps), [steps]);

  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <input type="hidden" name={name} value={payload} />
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-800">{label}</h3>
        <button
          type="button"
          className="admin-btn-secondary px-3 py-1.5 text-xs"
          onClick={() =>
            setSteps((prev) => [
              ...prev,
              {
                number: String(prev.length + 1).padStart(2, "0"),
                title: "",
                timing: "",
                summary: "",
                bullets: [""],
              },
            ])
          }
        >
          <Plus className="h-3.5 w-3.5" />
          Thêm bước
        </button>
      </div>

      <div className="space-y-4">
        {steps.map((step, stepIndex) => (
          <div key={`${name}-step-${stepIndex}`} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase text-slate-500">Bước {stepIndex + 1}</p>
              <button
                type="button"
                className="admin-btn-ghost px-2 py-1 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => setSteps((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== stepIndex)))}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              <input
                value={step.number}
                onChange={(event) =>
                  setSteps((prev) =>
                    prev.map((row, i) => (i === stepIndex ? { ...row, number: event.target.value } : row)),
                  )
                }
                className="admin-input"
                placeholder="Số bước (01)"
              />
              <input
                value={step.title}
                onChange={(event) =>
                  setSteps((prev) =>
                    prev.map((row, i) => (i === stepIndex ? { ...row, title: event.target.value } : row)),
                  )
                }
                className="admin-input sm:col-span-2"
                placeholder="Tiêu đề bước"
              />
            </div>

            <input
              value={step.timing}
              onChange={(event) =>
                setSteps((prev) =>
                  prev.map((row, i) => (i === stepIndex ? { ...row, timing: event.target.value } : row)),
                )
              }
              className="admin-input mt-2"
              placeholder="Mốc thời gian"
            />

            <textarea
              value={step.summary}
              rows={2}
              onChange={(event) =>
                setSteps((prev) =>
                  prev.map((row, i) => (i === stepIndex ? { ...row, summary: event.target.value } : row)),
                )
              }
              className="admin-input mt-2 resize-y"
              placeholder="Tóm tắt"
            />

            <div className="mt-3 space-y-2">
              <p className="text-xs font-semibold text-slate-600">Gạch đầu dòng</p>
              {step.bullets.map((bullet, bulletIndex) => (
                <div key={`${name}-step-${stepIndex}-bullet-${bulletIndex}`} className="flex gap-2">
                  <input
                    value={bullet}
                    onChange={(event) =>
                      setSteps((prev) =>
                        prev.map((row, i) =>
                          i === stepIndex
                            ? {
                                ...row,
                                bullets: row.bullets.map((item, j) =>
                                  j === bulletIndex ? event.target.value : item,
                                ),
                              }
                            : row,
                        ),
                      )
                    }
                    className="admin-input"
                    placeholder="Nội dung gạch đầu dòng"
                  />
                  <button
                    type="button"
                    className="admin-btn-ghost shrink-0 px-2 text-red-600"
                    onClick={() =>
                      setSteps((prev) =>
                        prev.map((row, i) =>
                          i === stepIndex
                            ? {
                                ...row,
                                bullets:
                                  row.bullets.length === 1
                                    ? row.bullets
                                    : row.bullets.filter((_, j) => j !== bulletIndex),
                              }
                            : row,
                        ),
                      )
                    }
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="admin-btn-secondary px-3 py-1.5 text-xs"
                onClick={() =>
                  setSteps((prev) =>
                    prev.map((row, i) =>
                      i === stepIndex ? { ...row, bullets: [...row.bullets, ""] } : row,
                    ),
                  )
                }
              >
                <Plus className="h-3.5 w-3.5" />
                Thêm gạch đầu dòng
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
