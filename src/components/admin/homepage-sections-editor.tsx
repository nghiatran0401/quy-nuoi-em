"use client";

import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { HomeSectionsContent } from "@/lib/data/homepage-sections";

type Props = {
  locale: "vi";
  initialSections: HomeSectionsContent;
};

type SectionCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
        {description ? <p className="mt-1 text-xs text-slate-600">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}

type RepeaterProps<T> = {
  label: string;
  items: T[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  renderItem: (item: T, index: number) => ReactNode;
  addLabel?: string;
};

function Repeater<T>({
  label,
  items,
  onAdd,
  onRemove,
  renderItem,
  addLabel = "Thêm mục",
}: RepeaterProps<T>) {
  return (
    <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50/50 p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-700">{label}</p>
        <button type="button" className="admin-btn-secondary px-2.5 py-1.5 text-xs" onClick={onAdd}>
          <Plus className="h-3.5 w-3.5" />
          {addLabel}
        </button>
      </div>

      <div className="space-y-2.5">
        {items.map((item, index) => (
          <div key={`${label}-${index}`} className="rounded-lg border border-slate-200 bg-white p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-medium text-slate-700">
                Mục {index + 1}
              </p>
              <button
                type="button"
                className="admin-btn-ghost px-2 py-1 text-xs text-red-600 hover:bg-red-50"
                onClick={() => onRemove(index)}
                aria-label={`Xóa mục ${index + 1}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomepageSectionsEditor({ locale, initialSections }: Props) {
  const [sections, setSections] = useState<HomeSectionsContent>(() =>
    structuredClone(initialSections),
  );

  const payload = useMemo(() => JSON.stringify(sections), [sections]);

  const setSection = <K extends keyof HomeSectionsContent>(
    key: K,
    updater: (value: HomeSectionsContent[K]) => HomeSectionsContent[K],
  ) => {
    setSections((prev) => ({ ...prev, [key]: updater(prev[key]) }));
  };

  return (
    <div className="space-y-5">
      <input type="hidden" name={`${locale}_sections_json`} value={payload} />

      <SectionCard title="Bữa cơm níu chân trẻ tới trường">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="admin-label">Nhãn thời gian</label>
            <input
              className="admin-input"
              value={sections.meal.since}
              onChange={(e) =>
                setSection("meal", (meal) => ({ ...meal, since: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="admin-label">Tiêu đề</label>
            <input
              className="admin-input"
              value={sections.meal.title}
              onChange={(e) =>
                setSection("meal", (meal) => ({ ...meal, title: e.target.value }))
              }
            />
          </div>
        </div>

        <Repeater
          label="Các đoạn nội dung"
          items={[...sections.meal.blocks]}
          onAdd={() =>
            setSection("meal", (meal) => ({
              ...meal,
              blocks: [...meal.blocks, { label: "", text: "" }],
            }))
          }
          onRemove={(index) =>
            setSection("meal", (meal) => ({
              ...meal,
              blocks: meal.blocks.filter((_, i) => i !== index),
            }))
          }
          renderItem={(block, index) => (
            <div className="space-y-2">
              <div>
                <label className="admin-label">Nhãn (tuỳ chọn)</label>
                <input
                  className="admin-input"
                  value={block.label ?? ""}
                  onChange={(e) =>
                    setSection("meal", (meal) => ({
                      ...meal,
                      blocks: meal.blocks.map((row, i) =>
                        i === index ? { ...row, label: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </div>
              <div>
                <label className="admin-label">Nội dung</label>
                <textarea
                  rows={3}
                  className="admin-input resize-y"
                  value={block.text}
                  onChange={(e) =>
                    setSection("meal", (meal) => ({
                      ...meal,
                      blocks: meal.blocks.map((row, i) =>
                        i === index ? { ...row, text: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </div>
            </div>
          )}
        />

        <Repeater
          label="Mức đóng góp"
          items={[...sections.meal.costs]}
          onAdd={() =>
            setSection("meal", (meal) => ({
              ...meal,
              costs: [...meal.costs, { amount: "", note: "" }],
            }))
          }
          onRemove={(index) =>
            setSection("meal", (meal) => ({
              ...meal,
              costs: meal.costs.filter((_, i) => i !== index),
            }))
          }
          renderItem={(cost, index) => (
            <div className="grid gap-2 sm:grid-cols-2">
              <div>
                <label className="admin-label">Số tiền</label>
                <input
                  className="admin-input"
                  value={cost.amount}
                  onChange={(e) =>
                    setSection("meal", (meal) => ({
                      ...meal,
                      costs: meal.costs.map((row, i) =>
                        i === index ? { ...row, amount: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </div>
              <div>
                <label className="admin-label">Ghi chú</label>
                <input
                  className="admin-input"
                  value={cost.note}
                  onChange={(e) =>
                    setSection("meal", (meal) => ({
                      ...meal,
                      costs: meal.costs.map((row, i) =>
                        i === index ? { ...row, note: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </div>
            </div>
          )}
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="admin-label">YouTube ID</label>
            <input
              className="admin-input"
              value={sections.meal.media.youtubeId}
              onChange={(e) =>
                setSection("meal", (meal) => ({
                  ...meal,
                  media: { ...meal.media, youtubeId: e.target.value },
                }))
              }
            />
          </div>
          <div>
            <label className="admin-label">Tiêu đề video</label>
            <input
              className="admin-input"
              value={sections.meal.media.title}
              onChange={(e) =>
                setSection("meal", (meal) => ({
                  ...meal,
                  media: { ...meal.media, title: e.target.value },
                }))
              }
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="admin-label">Ảnh mascot</label>
            <input
              className="admin-input"
              value={sections.meal.mascot.image}
              onChange={(e) =>
                setSection("meal", (meal) => ({
                  ...meal,
                  mascot: { ...meal.mascot, image: e.target.value },
                }))
              }
            />
          </div>
          <div>
            <label className="admin-label">Tên mascot</label>
            <input
              className="admin-input"
              value={sections.meal.mascot.name}
              onChange={(e) =>
                setSection("meal", (meal) => ({
                  ...meal,
                  mascot: { ...meal.mascot, name: e.target.value },
                }))
              }
            />
          </div>
          <div>
            <label className="admin-label">Chú thích mascot</label>
            <input
              className="admin-input"
              value={sections.meal.mascot.caption}
              onChange={(e) =>
                setSection("meal", (meal) => ({
                  ...meal,
                  mascot: { ...meal.mascot, caption: e.target.value },
                }))
              }
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Hành trình mở rộng">
        <Repeater
          label="Mốc hành trình"
          items={[...sections.impact.milestones]}
          onAdd={() =>
            setSection("impact", (impact) => ({
              ...impact,
              milestones: [
                ...impact.milestones,
                {
                  id: "",
                  titleBefore: "",
                  titleHighlight: "",
                  titleAfter: "",
                  body: "",
                  initiatives: [],
                  footer: "",
                },
              ],
            }))
          }
          onRemove={(index) =>
            setSection("impact", (impact) => ({
              ...impact,
              milestones: impact.milestones.filter((_, i) => i !== index),
            }))
          }
          renderItem={(milestone, milestoneIndex) => (
            <div className="space-y-2">
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <label className="admin-label">ID</label>
                  <input
                    className="admin-input"
                    value={milestone.id}
                    onChange={(e) =>
                      setSection("impact", (impact) => ({
                        ...impact,
                        milestones: impact.milestones.map((row, i) =>
                          i === milestoneIndex ? { ...row, id: e.target.value } : row,
                        ),
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="admin-label">Tiêu đề trước highlight</label>
                  <input
                    className="admin-input"
                    value={milestone.titleBefore}
                    onChange={(e) =>
                      setSection("impact", (impact) => ({
                        ...impact,
                        milestones: impact.milestones.map((row, i) =>
                          i === milestoneIndex ? { ...row, titleBefore: e.target.value } : row,
                        ),
                      }))
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <label className="admin-label">Tiêu đề highlight</label>
                  <input
                    className="admin-input"
                    value={milestone.titleHighlight}
                    onChange={(e) =>
                      setSection("impact", (impact) => ({
                        ...impact,
                        milestones: impact.milestones.map((row, i) =>
                          i === milestoneIndex ? { ...row, titleHighlight: e.target.value } : row,
                        ),
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="admin-label">Tiêu đề sau highlight</label>
                  <input
                    className="admin-input"
                    value={milestone.titleAfter}
                    onChange={(e) =>
                      setSection("impact", (impact) => ({
                        ...impact,
                        milestones: impact.milestones.map((row, i) =>
                          i === milestoneIndex ? { ...row, titleAfter: e.target.value } : row,
                        ),
                      }))
                    }
                  />
                </div>
              </div>
              <div>
                <label className="admin-label">Nội dung</label>
                <textarea
                  rows={3}
                  className="admin-input resize-y"
                  value={milestone.body}
                  onChange={(e) =>
                    setSection("impact", (impact) => ({
                      ...impact,
                      milestones: impact.milestones.map((row, i) =>
                        i === milestoneIndex ? { ...row, body: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </div>
              <div>
                <label className="admin-label">Footer (tuỳ chọn)</label>
                <textarea
                  rows={2}
                  className="admin-input resize-y"
                  value={milestone.footer ?? ""}
                  onChange={(e) =>
                    setSection("impact", (impact) => ({
                      ...impact,
                      milestones: impact.milestones.map((row, i) =>
                        i === milestoneIndex ? { ...row, footer: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </div>

              <Repeater
                label="Sáng kiến"
                items={[...milestone.initiatives]}
                onAdd={() =>
                  setSection("impact", (impact) => ({
                    ...impact,
                    milestones: impact.milestones.map((row, i) =>
                      i === milestoneIndex
                        ? {
                            ...row,
                            initiatives: [
                              ...row.initiatives,
                              { title: "", description: "", image: "" },
                            ],
                          }
                        : row,
                    ),
                  }))
                }
                onRemove={(initiativeIndex) =>
                  setSection("impact", (impact) => ({
                    ...impact,
                    milestones: impact.milestones.map((row, i) =>
                      i === milestoneIndex
                        ? {
                            ...row,
                            initiatives: row.initiatives.filter((_, idx) => idx !== initiativeIndex),
                          }
                        : row,
                    ),
                  }))
                }
                renderItem={(initiative, initiativeIndex) => (
                  <div className="grid gap-2 sm:grid-cols-3">
                    <div>
                      <label className="admin-label">Tiêu đề</label>
                      <input
                        className="admin-input"
                        value={initiative.title}
                        onChange={(e) =>
                          setSection("impact", (impact) => ({
                            ...impact,
                            milestones: impact.milestones.map((row, i) =>
                              i === milestoneIndex
                                ? {
                                    ...row,
                                    initiatives: row.initiatives.map((it, idx) =>
                                      idx === initiativeIndex
                                        ? { ...it, title: e.target.value }
                                        : it,
                                    ),
                                  }
                                : row,
                            ),
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="admin-label">Mô tả</label>
                      <input
                        className="admin-input"
                        value={initiative.description}
                        onChange={(e) =>
                          setSection("impact", (impact) => ({
                            ...impact,
                            milestones: impact.milestones.map((row, i) =>
                              i === milestoneIndex
                                ? {
                                    ...row,
                                    initiatives: row.initiatives.map((it, idx) =>
                                      idx === initiativeIndex
                                        ? { ...it, description: e.target.value }
                                        : it,
                                    ),
                                  }
                                : row,
                            ),
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="admin-label">Ảnh</label>
                      <input
                        className="admin-input"
                        value={initiative.image}
                        onChange={(e) =>
                          setSection("impact", (impact) => ({
                            ...impact,
                            milestones: impact.milestones.map((row, i) =>
                              i === milestoneIndex
                                ? {
                                    ...row,
                                    initiatives: row.initiatives.map((it, idx) =>
                                      idx === initiativeIndex
                                        ? { ...it, image: e.target.value }
                                        : it,
                                    ),
                                  }
                                : row,
                            ),
                          }))
                        }
                      />
                    </div>
                  </div>
                )}
              />
            </div>
          )}
        />

        <SectionCard title="Khối cơ sở vật chất">
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="admin-label">Nhãn phụ</label>
              <input
                className="admin-input"
                value={sections.impact.infrastructure.eyebrow}
                onChange={(e) =>
                  setSection("impact", (impact) => ({
                    ...impact,
                    infrastructure: { ...impact.infrastructure, eyebrow: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="admin-label">Tiêu đề</label>
              <input
                className="admin-input"
                value={sections.impact.infrastructure.title}
                onChange={(e) =>
                  setSection("impact", (impact) => ({
                    ...impact,
                    infrastructure: { ...impact.infrastructure, title: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="admin-label">Số tiền nổi bật</label>
              <input
                className="admin-input"
                value={sections.impact.infrastructure.amount}
                onChange={(e) =>
                  setSection("impact", (impact) => ({
                    ...impact,
                    infrastructure: { ...impact.infrastructure, amount: e.target.value },
                  }))
                }
              />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="admin-label">Tiêu đề phụ</label>
              <input
                className="admin-input"
                value={sections.impact.infrastructure.subtitle}
                onChange={(e) =>
                  setSection("impact", (impact) => ({
                    ...impact,
                    infrastructure: { ...impact.infrastructure, subtitle: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="admin-label">URL công trình trường học</label>
              <input
                className="admin-input"
                value={sections.impact.infrastructure.schoolBuildUrl}
                onChange={(e) =>
                  setSection("impact", (impact) => ({
                    ...impact,
                    infrastructure: { ...impact.infrastructure, schoolBuildUrl: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="admin-label">Từ nhấn mạnh</label>
              <input
                className="admin-input"
                value={sections.impact.infrastructure.bodyEmphasis}
                onChange={(e) =>
                  setSection("impact", (impact) => ({
                    ...impact,
                    infrastructure: { ...impact.infrastructure, bodyEmphasis: e.target.value },
                  }))
                }
              />
            </div>
          </div>
          <div>
            <label className="admin-label">Nội dung</label>
            <textarea
              rows={3}
              className="admin-input resize-y"
              value={sections.impact.infrastructure.body}
              onChange={(e) =>
                setSection("impact", (impact) => ({
                  ...impact,
                  infrastructure: { ...impact.infrastructure, body: e.target.value },
                }))
              }
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            <div>
              <label className="admin-label">Ảnh trước</label>
              <input
                className="admin-input"
                value={sections.impact.infrastructure.beforeImage}
                onChange={(e) =>
                  setSection("impact", (impact) => ({
                    ...impact,
                    infrastructure: { ...impact.infrastructure, beforeImage: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="admin-label">Nhãn ảnh trước</label>
              <input
                className="admin-input"
                value={sections.impact.infrastructure.beforeLabel}
                onChange={(e) =>
                  setSection("impact", (impact) => ({
                    ...impact,
                    infrastructure: { ...impact.infrastructure, beforeLabel: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="admin-label">Ảnh sau</label>
              <input
                className="admin-input"
                value={sections.impact.infrastructure.afterImage}
                onChange={(e) =>
                  setSection("impact", (impact) => ({
                    ...impact,
                    infrastructure: { ...impact.infrastructure, afterImage: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="admin-label">Nhãn ảnh sau</label>
              <input
                className="admin-input"
                value={sections.impact.infrastructure.afterLabel}
                onChange={(e) =>
                  setSection("impact", (impact) => ({
                    ...impact,
                    infrastructure: { ...impact.infrastructure, afterLabel: e.target.value },
                  }))
                }
              />
            </div>
          </div>
        </SectionCard>
      </SectionCard>

      <SectionCard title="Quy trình 6 bước">
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="admin-label">Nhãn phụ</label>
            <input
              className="admin-input"
              value={sections.process.eyebrow}
              onChange={(e) =>
                setSection("process", (process) => ({ ...process, eyebrow: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="admin-label">Tiêu đề</label>
            <input
              className="admin-input"
              value={sections.process.title}
              onChange={(e) =>
                setSection("process", (process) => ({ ...process, title: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="admin-label">Tiêu đề phụ</label>
            <input
              className="admin-input"
              value={sections.process.subtitle}
              onChange={(e) =>
                setSection("process", (process) => ({ ...process, subtitle: e.target.value }))
              }
            />
          </div>
        </div>
        <div>
          <label className="admin-label">Ảnh sơ đồ tổng quan</label>
          <input
            className="admin-input"
            value={sections.process.guideImage}
            onChange={(e) =>
              setSection("process", (process) => ({ ...process, guideImage: e.target.value }))
            }
          />
        </div>

        <Repeater
          label="Thẻ quy trình"
          items={[...sections.process.cards]}
          onAdd={() =>
            setSection("process", (process) => ({
              ...process,
              cards: [
                ...process.cards,
                {
                  number: "",
                  title: "",
                  summary: "",
                  image: "",
                  ctaLabel: "",
                  href: "",
                  external: false,
                },
              ],
            }))
          }
          onRemove={(index) =>
            setSection("process", (process) => ({
              ...process,
              cards: process.cards.filter((_, i) => i !== index),
            }))
          }
          renderItem={(card, index) => (
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <label className="admin-label">Số bước</label>
                <input
                  className="admin-input"
                  value={card.number}
                  onChange={(e) =>
                    setSection("process", (process) => ({
                      ...process,
                      cards: process.cards.map((row, i) =>
                        i === index ? { ...row, number: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </div>
              <div>
                <label className="admin-label">Tiêu đề</label>
                <input
                  className="admin-input"
                  value={card.title}
                  onChange={(e) =>
                    setSection("process", (process) => ({
                      ...process,
                      cards: process.cards.map((row, i) =>
                        i === index ? { ...row, title: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </div>
              <div>
                <label className="admin-label">Ảnh</label>
                <input
                  className="admin-input"
                  value={card.image}
                  onChange={(e) =>
                    setSection("process", (process) => ({
                      ...process,
                      cards: process.cards.map((row, i) =>
                        i === index ? { ...row, image: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </div>
              <div className="sm:col-span-3">
                <label className="admin-label">Mô tả</label>
                <textarea
                  rows={2}
                  className="admin-input resize-y"
                  value={card.summary}
                  onChange={(e) =>
                    setSection("process", (process) => ({
                      ...process,
                      cards: process.cards.map((row, i) =>
                        i === index ? { ...row, summary: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </div>
              <div>
                <label className="admin-label">Nhãn nút</label>
                <input
                  className="admin-input"
                  value={card.ctaLabel}
                  onChange={(e) =>
                    setSection("process", (process) => ({
                      ...process,
                      cards: process.cards.map((row, i) =>
                        i === index ? { ...row, ctaLabel: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </div>
              <div>
                <label className="admin-label">URL</label>
                <input
                  className="admin-input"
                  value={card.href}
                  onChange={(e) =>
                    setSection("process", (process) => ({
                      ...process,
                      cards: process.cards.map((row, i) =>
                        i === index ? { ...row, href: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </div>
              <label className="mt-6 inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={Boolean(card.external)}
                  onChange={(e) =>
                    setSection("process", (process) => ({
                      ...process,
                      cards: process.cards.map((row, i) =>
                        i === index ? { ...row, external: e.target.checked } : row,
                      ),
                    }))
                  }
                />
                Mở link ngoài
              </label>
            </div>
          )}
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="admin-label">Tiêu đề lưu ý</label>
            <input
              className="admin-input"
              value={sections.process.notesTitle}
              onChange={(e) =>
                setSection("process", (process) => ({ ...process, notesTitle: e.target.value }))
              }
            />
          </div>
          <Repeater
            label="Danh sách lưu ý"
            items={[...sections.process.notes]}
            onAdd={() =>
              setSection("process", (process) => ({
                ...process,
                notes: [...process.notes, ""],
              }))
            }
            onRemove={(index) =>
              setSection("process", (process) => ({
                ...process,
                notes: process.notes.filter((_, i) => i !== index),
              }))
            }
            renderItem={(note, index) => (
              <input
                className="admin-input"
                value={note}
                onChange={(e) =>
                  setSection("process", (process) => ({
                    ...process,
                    notes: process.notes.map((row, i) => (i === index ? e.target.value : row)),
                  }))
                }
              />
            )}
          />
        </div>
      </SectionCard>

      <SectionCard title="Danh sách đã được nhận nuôi">
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="admin-label">Tiêu đề</label>
            <input
              className="admin-input"
              value={sections.sponsored.title}
              onChange={(e) =>
                setSection("sponsored", (sponsored) => ({ ...sponsored, title: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="admin-label">Ghi chú tiêu đề</label>
            <input
              className="admin-input"
              value={sections.sponsored.titleNote}
              onChange={(e) =>
                setSection("sponsored", (sponsored) => ({
                  ...sponsored,
                  titleNote: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label className="admin-label">Nút xem album</label>
            <input
              className="admin-input"
              value={sections.sponsored.viewAlbum}
              onChange={(e) =>
                setSection("sponsored", (sponsored) => ({
                  ...sponsored,
                  viewAlbum: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <div>
          <label className="admin-label">Mô tả</label>
          <textarea
            rows={2}
            className="admin-input resize-y"
            value={sections.sponsored.subtitle}
            onChange={(e) =>
              setSection("sponsored", (sponsored) => ({
                ...sponsored,
                subtitle: e.target.value,
              }))
            }
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="admin-label">Ảnh hero</label>
            <input
              className="admin-input"
              value={sections.sponsored.heroImage}
              onChange={(e) =>
                setSection("sponsored", (sponsored) => ({
                  ...sponsored,
                  heroImage: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label className="admin-label">Alt ảnh hero</label>
            <input
              className="admin-input"
              value={sections.sponsored.heroAlt}
              onChange={(e) =>
                setSection("sponsored", (sponsored) => ({
                  ...sponsored,
                  heroAlt: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <Repeater
          label="Điểm nổi bật"
          items={[...sections.sponsored.features]}
          onAdd={() =>
            setSection("sponsored", (sponsored) => ({
              ...sponsored,
              features: [
                ...sponsored.features,
                { title: "", description: "", icon: "" },
              ],
            }))
          }
          onRemove={(index) =>
            setSection("sponsored", (sponsored) => ({
              ...sponsored,
              features: sponsored.features.filter((_, i) => i !== index),
            }))
          }
          renderItem={(feature, index) => (
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <label className="admin-label">Tiêu đề</label>
                <input
                  className="admin-input"
                  value={feature.title}
                  onChange={(e) =>
                    setSection("sponsored", (sponsored) => ({
                      ...sponsored,
                      features: sponsored.features.map((row, i) =>
                        i === index ? { ...row, title: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </div>
              <div>
                <label className="admin-label">Mô tả</label>
                <input
                  className="admin-input"
                  value={feature.description}
                  onChange={(e) =>
                    setSection("sponsored", (sponsored) => ({
                      ...sponsored,
                      features: sponsored.features.map((row, i) =>
                        i === index ? { ...row, description: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </div>
              <div>
                <label className="admin-label">Icon</label>
                <input
                  className="admin-input"
                  value={feature.icon}
                  onChange={(e) =>
                    setSection("sponsored", (sponsored) => ({
                      ...sponsored,
                      features: sponsored.features.map((row, i) =>
                        i === index ? { ...row, icon: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </div>
            </div>
          )}
        />

        <Repeater
          label="Album"
          items={[...sections.sponsored.albums]}
          onAdd={() =>
            setSection("sponsored", (sponsored) => ({
              ...sponsored,
              albums: [
                ...sponsored.albums,
                { label: "", region: "", href: "", previewImage: "" },
              ],
            }))
          }
          onRemove={(index) =>
            setSection("sponsored", (sponsored) => ({
              ...sponsored,
              albums: sponsored.albums.filter((_, i) => i !== index),
            }))
          }
          renderItem={(album, index) => (
            <div className="grid gap-2 sm:grid-cols-4">
              <div>
                <label className="admin-label">Tiêu đề</label>
                <input
                  className="admin-input"
                  value={album.label}
                  onChange={(e) =>
                    setSection("sponsored", (sponsored) => ({
                      ...sponsored,
                      albums: sponsored.albums.map((row, i) =>
                        i === index ? { ...row, label: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </div>
              <div>
                <label className="admin-label">Khu vực</label>
                <input
                  className="admin-input"
                  value={album.region}
                  onChange={(e) =>
                    setSection("sponsored", (sponsored) => ({
                      ...sponsored,
                      albums: sponsored.albums.map((row, i) =>
                        i === index ? { ...row, region: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </div>
              <div>
                <label className="admin-label">Link album</label>
                <input
                  className="admin-input"
                  value={album.href}
                  onChange={(e) =>
                    setSection("sponsored", (sponsored) => ({
                      ...sponsored,
                      albums: sponsored.albums.map((row, i) =>
                        i === index ? { ...row, href: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </div>
              <div>
                <label className="admin-label">Ảnh preview</label>
                <input
                  className="admin-input"
                  value={album.previewImage}
                  onChange={(e) =>
                    setSection("sponsored", (sponsored) => ({
                      ...sponsored,
                      albums: sponsored.albums.map((row, i) =>
                        i === index ? { ...row, previewImage: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </div>
            </div>
          )}
        />
      </SectionCard>

      <SectionCard title="Tin tức & đơn vị đồng hành">
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="admin-label">Nhãn phụ tin tức</label>
            <input
              className="admin-input"
              value={sections.news.eyebrow}
              onChange={(e) =>
                setSection("news", (news) => ({ ...news, eyebrow: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="admin-label">Tiêu đề tin tức</label>
            <input
              className="admin-input"
              value={sections.news.title}
              onChange={(e) => setSection("news", (news) => ({ ...news, title: e.target.value }))}
            />
          </div>
          <div>
            <label className="admin-label">Tên tác giả mặc định</label>
            <input
              className="admin-input"
              value={sections.news.author}
              onChange={(e) =>
                setSection("news", (news) => ({ ...news, author: e.target.value }))
              }
            />
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="admin-label">Nhãn nút xem tất cả</label>
            <input
              className="admin-input"
              value={sections.news.viewAll}
              onChange={(e) =>
                setSection("news", (news) => ({ ...news, viewAll: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="admin-label">Nhãn nút đọc thêm</label>
            <input
              className="admin-input"
              value={sections.news.readMore}
              onChange={(e) =>
                setSection("news", (news) => ({ ...news, readMore: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="admin-label">Tiêu đề khối đối tác</label>
            <input
              className="admin-input"
              value={sections.partnersTitle}
              onChange={(e) =>
                setSections((prev) => ({ ...prev, partnersTitle: e.target.value }))
              }
            />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
