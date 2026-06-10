"use client";

import { ArrowRight } from "lucide-react";
import { useHomeWelcomePopup } from "@/components/home/home-welcome-popup";

type TransferQrCtaProps = {
  label: string;
  fanpageUrl: string;
};

export function TransferQrCta({ label, fanpageUrl }: TransferQrCtaProps) {
  const welcomePopup = useHomeWelcomePopup();

  if (welcomePopup) {
    return (
      <button type="button" onClick={welcomePopup.openPopup} className="btn-primary mt-6 w-full">
        {label}
        <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
      </button>
    );
  }

  return (
    <a href={fanpageUrl} target="_blank" rel="noreferrer" className="btn-primary mt-6 w-full">
      {label}
      <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
    </a>
  );
}
