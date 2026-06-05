"use client";

import { useState } from "react";
import { ChevronDown, CreditCard, FileCheck, MapPin } from "lucide-react";
import { FaqBankPanel } from "@/components/home/faq-bank-panel";
import { faqSectionCopy } from "@/content/homepage-content";
import type { DonateInfoContent } from "@/lib/data/donate-info";
import type { HomeFaqContent } from "@/lib/data/homepage";
import { normalizeHomeFaqContent } from "@/lib/data/homepage";

type Props = {
  content?: HomeFaqContent;
  donateInfo: DonateInfoContent;
  donateQrUrl: string;
};

const icons = {
  "dia-chi": MapPin,
  "ngan-hang": CreditCard,
  "quy-trinh": FileCheck,
} as const;

export function FaqSection({ content, donateInfo, donateQrUrl }: Props) {
  const copy = normalizeHomeFaqContent(content ?? faqSectionCopy);
  const [openId, setOpenId] = useState(copy.items[0]?.id ?? "");

  return (
    <section className="section-elevated section-pad-lg">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-10 text-center sm:mb-16">
          <h2 className="eyebrow mb-3">{copy.eyebrow}</h2>
          <h3 className="heading-display mb-4 text-2xl sm:mb-6 sm:text-3xl md:text-5xl">{copy.title}</h3>
          <p className="text-body mx-auto max-w-2xl text-base sm:text-lg">{copy.intro}</p>
        </div>
        <div className="flex flex-col gap-3">
          {copy.items.map((item) => {
            const open = openId === item.id;
            const Icon = icons[item.type];
            return (
              <div
                key={item.id}
                className={`faq-item ${open ? "faq-item-open" : "faq-item-closed"}`}
              >
                <button
                  type="button"
                  className="focus-ring flex w-full items-center gap-3 p-4 text-left sm:gap-5 sm:p-6 md:p-8"
                  onClick={() => setOpenId(open ? "" : item.id)}
                  aria-expanded={open}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors sm:h-12 sm:w-12 ${
                      open ? "bg-brand-accent text-white" : "bg-white text-brand-accent shadow-sm ring-1 ring-brand-border/80"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`font-heading text-base font-bold sm:text-lg md:text-xl ${
                        open ? "text-brand-ink" : "text-brand-ink/90"
                      }`}
                    >
                      {item.question}
                    </h4>
                  </div>
                  <ChevronDown
                    className={`h-6 w-6 shrink-0 transition-transform duration-300 ${
                      open ? "rotate-180 text-brand-accent" : "text-brand-muted"
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`px-4 pb-6 pt-0 sm:px-6 sm:pb-8 md:px-8 ${
                        item.type === "ngan-hang"
                          ? ""
                          : "sm:pl-[5.5rem] md:pl-[6.5rem]"
                      }`}
                    >
                      {item.type === "dia-chi" ? (
                        <div className="text-body text-lg">
                          <p>{item.body}</p>
                          <div className="mt-3 flex items-start gap-2">
                            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" />
                            <span>
                              <strong className="text-brand-ink">Địa chỉ:</strong> {item.address}
                            </span>
                          </div>
                        </div>
                      ) : null}
                      {item.type === "ngan-hang" ? (
                        <FaqBankPanel bank={donateInfo} donateQrUrl={donateQrUrl} />
                      ) : null}
                      {item.type === "quy-trinh" && item.steps ? (
                        <div className="relative pl-2 text-body text-lg">
                          <div className="absolute bottom-2 left-2 top-2 w-0.5 bg-brand-border" />
                          <ul className="space-y-4">
                            {item.steps.map((step, index) => (
                              <li key={step} className="relative flex items-start gap-4">
                                <div className="z-10 bg-white p-1">
                                  <span className="step-badge">{index + 1}</span>
                                </div>
                                <span className="pt-0.5">{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
