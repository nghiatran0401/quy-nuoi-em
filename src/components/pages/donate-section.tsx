import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { brandVisual } from "@/config/brand-visual";
import { BankTransferPanel } from "@/components/shared/bank-transfer-panel";
import type { DonateInfoContent } from "@/lib/data/donate-info";

type DonateSectionProps = {
  bank: DonateInfoContent;
  donateQrUrl: string;
  volunteerLabel: string;
  referChildLabel: string;
};

/** Legacy section wrapper — prefer `BankTransferPanel` or `DonateView`. */
export function DonateSection({
  bank,
  donateQrUrl,
  volunteerLabel,
  referChildLabel,
}: DonateSectionProps) {
  const fanpageUrl = brandVisual.social.facebook;

  return (
    <section className="mx-auto max-w-5xl px-4 pb-16">
      <BankTransferPanel bank={bank} donateQrUrl={donateQrUrl} variant="page" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          href="/dang-ky-tnv"
          className="brand-card-interactive group flex items-center justify-between p-6"
        >
          <div>
            <p className="font-heading font-bold text-brand-ink">{volunteerLabel}</p>
            <p className="mt-2 text-sm text-brand-muted">Cùng tham gia các hoạt động ý nghĩa.</p>
          </div>
          <ArrowRight className="h-6 w-6 text-brand-accent transition-transform group-hover:translate-x-1" />
        </Link>
        <a
          href={fanpageUrl}
          target="_blank"
          rel="noreferrer"
          className="brand-card-interactive group flex items-center justify-between p-6"
        >
          <div>
            <p className="font-heading font-bold text-brand-ink">{referChildLabel}</p>
            <p className="mt-2 text-sm text-brand-muted">Giúp đỡ những hoàn cảnh khó khăn cần hỗ trợ.</p>
          </div>
          <ArrowRight className="h-6 w-6 text-brand-accent transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
