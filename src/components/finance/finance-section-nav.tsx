"use client";

import { useEffect, useState } from "react";

type FinanceSectionNavProps = {
  items: readonly { id: string; label: string }[];
};

export function FinanceSectionNav({ items }: FinanceSectionNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sectionElements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-28% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.55],
      },
    );

    for (const element of sectionElements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Mục trên trang tài chính"
      className="sticky top-16 z-20 -mx-4 border-b border-brand-border/50 bg-brand-warm/90 px-4 py-3 backdrop-blur-md sm:top-20 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      <div className="mx-auto max-w-4xl rounded-full border border-brand-border/60 bg-white/90 p-1 shadow-[var(--shadow-brand-soft)]">
        <ul className="flex gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id} className="min-w-0 flex-1">
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={`block rounded-full px-3 py-2 text-center text-xs font-semibold transition sm:px-4 sm:text-sm ${
                    isActive
                      ? "bg-brand-green text-white shadow-sm"
                      : "text-brand-muted hover:bg-brand-sky-soft hover:text-brand-ink"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
