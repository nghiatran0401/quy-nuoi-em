"use client";

import { useState } from "react";
import { ChevronDown, CreditCard, FileCheck, MapPin } from "lucide-react";
import { faqSectionCopy } from "@/content/home-sections";
import type { Locale } from "@/i18n/config";

type Props = { locale: Locale };

const icons = {
  address: MapPin,
  bank: CreditCard,
  process: FileCheck,
} as const;

export function FaqSection({ locale }: Props) {
  const copy = faqSectionCopy[locale];
  const [openId, setOpenId] = useState(copy.items[0]?.id ?? "");

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-brand-green">{copy.eyebrow}</h2>
          <h3 className="mb-6 font-heading text-3xl font-black text-brand-blue md:text-5xl">{copy.title}</h3>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-500">{copy.intro}</p>
        </div>
        <div className="flex flex-col gap-4">
          {copy.items.map((item) => {
            const open = openId === item.id;
            const Icon = icons[item.type];
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-300 ${
                  open
                    ? "scale-[1.02] border-brand-blue/20 bg-white shadow-lg"
                    : "border-transparent bg-gray-50 hover:border-gray-200 hover:bg-white hover:shadow-md"
                }`}
              >
                <button
                  type="button"
                  className="flex w-full items-center gap-5 p-6 text-left focus:outline-none md:p-8"
                  onClick={() => setOpenId(open ? "" : item.id)}
                  aria-expanded={open}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors ${
                      open ? "bg-brand-blue text-white" : "bg-white text-brand-blue shadow-sm"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`font-heading text-lg font-bold md:text-xl ${
                        open ? "text-brand-blue" : "text-gray-900"
                      }`}
                    >
                      {item.question}
                    </h4>
                  </div>
                  <ChevronDown
                    className={`h-6 w-6 shrink-0 transition-transform duration-300 ${
                      open ? "rotate-180 text-brand-blue" : "text-gray-400"
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-8 pt-0 pl-[5.5rem] md:px-8 md:pl-[6.5rem]">
                      {item.type === "address" ? (
                        <div className="font-body text-lg leading-relaxed text-gray-600">
                          <p>{item.body}</p>
                          <div className="mt-3 flex items-start gap-2">
                            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                            <span className="text-gray-700">
                              <strong>Địa chỉ:</strong> {item.address}
                            </span>
                          </div>
                        </div>
                      ) : null}
                      {item.type === "bank" ? (
                        <div className="mt-2 rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-brand-blue">
                              <CreditCard className="h-5 w-5" />
                              <span className="text-sm font-semibold uppercase tracking-wide">
                                Thông tin chuyển khoản
                              </span>
                            </div>
                            <div className="text-3xl font-bold tracking-tight text-brand-blue">2010</div>
                            <div>
                              <p className="font-bold text-gray-900">QUỸ TONY BUỔI SÁNG</p>
                              <p className="text-gray-600">Ngân hàng MB - PGD Tân Hương - HCM</p>
                            </div>
                          </div>
                        </div>
                      ) : null}
                      {item.type === "process" && item.steps ? (
                        <div className="relative pl-2 font-body text-lg leading-relaxed text-gray-600">
                          <div className="absolute bottom-2 left-2 top-2 w-0.5 bg-gray-100" />
                          <ul className="space-y-4">
                            {item.steps.map((step, index) => (
                              <li key={step} className="relative flex items-start gap-4">
                                <div className="z-10 bg-white p-1">
                                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-green text-xs font-bold text-white shadow-sm">
                                    {index + 1}
                                  </span>
                                </div>
                                <span className="pt-0.5 text-gray-700">{step}</span>
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
