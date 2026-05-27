import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { brandVisual } from "@/config/brand-visual";
import { siteImages } from "@/lib/images";

type DonateSectionProps = {
  bank: string;
  branch: string;
  accountName: string;
  accountNumber: string;
  transferFormat: string;
  transferExample: string;
  scanQrLabel: string;
  volunteerLabel: string;
  referChildLabel: string;
};

export function DonateSection({
  bank,
  branch,
  accountName,
  accountNumber,
  transferFormat,
  transferExample,
  scanQrLabel,
  volunteerLabel,
  referChildLabel,
}: DonateSectionProps) {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="brand-card space-y-4 p-8">
          <p className="text-sm font-bold uppercase text-brand-accent">Ngân hàng</p>
          <h2 className="font-heading text-2xl font-bold text-brand-ink">{bank}</h2>
          <p className="text-brand-muted">{branch}</p>
          <div className="border-t border-brand-border/60 pt-4">
            <p className="text-sm text-brand-muted">Chủ tài khoản</p>
            <p className="font-semibold text-brand-ink">{accountName}</p>
          </div>
          <div>
            <p className="text-sm text-brand-muted">Số tài khoản</p>
            <p className="stat-value text-3xl">{accountNumber}</p>
          </div>
          <div className="surface-info p-5">
            <p className="font-semibold text-brand-ink">Cú pháp chuyển khoản</p>
            <p className="text-body mt-2 text-sm">{transferFormat}</p>
            <p className="text-body mt-2 text-sm">Ví dụ: {transferExample}</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-brand-border/60 bg-white p-4 shadow-[var(--shadow-brand-card)]">
            <Image
              src={siteImages.donateQr}
              alt={`QR chuyển khoản ${brandVisual.name}`}
              fill
              className="object-contain p-4"
            />
          </div>
          <p className="mt-4 text-center text-brand-muted">{scanQrLabel}</p>
        </div>
      </div>
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
        <Link
          href="/contact"
          className="brand-card-interactive group flex items-center justify-between p-6"
        >
          <div>
            <p className="font-heading font-bold text-brand-ink">{referChildLabel}</p>
            <p className="mt-2 text-sm text-brand-muted">Giúp đỡ những hoàn cảnh khó khăn cần hỗ trợ.</p>
          </div>
          <ArrowRight className="h-6 w-6 text-brand-accent transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
