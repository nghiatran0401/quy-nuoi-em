import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { donateInfo, getStaticPageHero, getUiLabel } from "@/content/pages/static-pages";
import type { Locale } from "@/i18n/config";
import { siteImages } from "@/lib/images";

export function DonateView({ locale }: { locale: Locale }) {
  const hero = getStaticPageHero("donate", locale);
  const info = donateInfo[locale];

  return (
    <article className="min-h-screen bg-brand-warm pb-20">
      <section className="banner-primary">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="eyebrow mb-3">
            {hero.eyebrow ?? "CHUNG TAY GÓP SỨC"}
          </p>
          <h1 className="heading-display mb-4 text-3xl md:text-5xl">{hero.title}</h1>
          {hero.description ? (
            <p className="text-body max-w-2xl text-lg">{hero.description}</p>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="brand-card p-8">
            <p className="text-sm font-bold uppercase text-brand-accent">Ngân hàng</p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-brand-ink">{info.bank}</h2>
            <p className="mt-1 text-brand-muted">{info.branch}</p>
            <div className="mt-6 border-t border-brand-border/60 pt-4">
              <p className="text-sm text-brand-muted">Chủ tài khoản</p>
              <p className="font-semibold text-brand-ink">{info.accountName}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm text-brand-muted">Số tài khoản thiện nguyện</p>
              <p className="heading-display text-3xl font-bold text-brand-accent">{info.accountNumber}</p>
            </div>
            <div className="surface-info mt-6 p-5">
              <h3 className="font-semibold text-brand-ink">Cú pháp chuyển khoản</h3>
              <p className="mt-2 text-sm text-brand-muted">{info.transferFormat}</p>
              <p className="mt-2 text-sm text-brand-muted/90">Ví dụ: {info.transferExample}</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-brand-border/60 bg-white p-4 shadow-[var(--shadow-brand-card)]">
              <Image
                src={siteImages.donateQr}
                alt="QR đóng góp"
                fill
                className="object-contain p-2"
                sizes="(max-width: 512px) 100vw, 384px"
              />
            </div>
            <p className="mt-4 text-center text-brand-muted">{getUiLabel(locale, "scanQr")}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Link
            href="/dang-ky-tnv"
            className="brand-card-interactive group flex items-center justify-between p-6"
          >
            <div>
              <h3 className="font-heading text-lg font-bold text-brand-ink">Đăng ký tình nguyện</h3>
              <p className="mt-2 text-sm text-brand-muted">Cùng tham gia vào các hoạt động ý nghĩa.</p>
            </div>
            <ArrowRight className="h-6 w-6 text-brand-accent transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/danh-sach-bao-tro"
            className="brand-card-interactive group flex items-center justify-between p-6"
          >
            <div>
              <h3 className="font-heading text-lg font-bold text-brand-ink">Danh sách bảo trợ</h3>
              <p className="mt-2 text-sm text-brand-muted">Giúp đỡ những hoàn cảnh khó khăn cần hỗ trợ.</p>
            </div>
            <ArrowRight className="h-6 w-6 text-brand-accent transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </article>
  );
}
