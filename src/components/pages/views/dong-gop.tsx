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
    <article className="min-h-screen bg-brand-surface pb-20">
      <section className="banner-primary border-b border-brand-deep/20">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="eyebrow-on-dark mb-3">
            {hero.eyebrow ?? "CHUNG TAY GÓP SỨC"}
          </p>
          <h1 className="mb-4 font-heading text-3xl font-black md:text-5xl">{hero.title}</h1>
          {hero.description ? (
            <p className="max-w-2xl text-lg leading-relaxed text-on-primary">{hero.description}</p>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <p className="text-sm font-bold uppercase text-brand-accent">Ngân hàng</p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-brand-blue">{info.bank}</h2>
            <p className="mt-1 text-gray-600">{info.branch}</p>
            <div className="mt-6 border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-500">Chủ tài khoản</p>
              <p className="font-semibold text-gray-900">{info.accountName}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Số tài khoản thiện nguyện</p>
              <p className="heading-display text-3xl font-bold">{info.accountNumber}</p>
            </div>
            <div className="surface-info mt-6 p-5">
              <h3 className="font-semibold text-gray-900">Cú pháp chuyển khoản</h3>
              <p className="mt-2 text-sm text-gray-600">{info.transferFormat}</p>
              <p className="mt-2 text-sm text-gray-500">Ví dụ: {info.transferExample}</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <Image
                src={siteImages.donateQr}
                alt="QR chuyển khoản Dự án Nuôi Em"
                fill
                className="object-contain p-4"
              />
            </div>
            <p className="mt-4 text-center text-gray-600">{getUiLabel(locale, "scanQr")}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            href="/dang-ky-tnv"
            className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-brand-accent/30 hover:shadow-md"
          >
            <div>
              <p className="font-heading font-bold text-brand-blue">{getUiLabel(locale, "registerVolunteer")}</p>
              <p className="mt-2 text-sm text-gray-600">Cùng tham gia vào các hoạt động ý nghĩa.</p>
            </div>
            <ArrowRight className="h-5 w-5 text-brand-blue transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="group flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:border-brand-accent/30 hover:shadow-md"
          >
            <div>
              <p className="font-heading font-bold text-brand-blue">{getUiLabel(locale, "referChild")}</p>
              <p className="mt-2 text-sm text-gray-600">Giúp đỡ những hoàn cảnh khó khăn cần hỗ trợ.</p>
            </div>
            <ArrowRight className="h-5 w-5 text-brand-blue transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </article>
  );
}
