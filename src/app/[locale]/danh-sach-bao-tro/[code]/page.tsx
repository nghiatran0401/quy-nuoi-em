import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { StatusBadge } from "@/components/data/status-badge";
import { getDataUiLabel } from "@/content/pages/data-pages";
import { getAllChildren, getChildByCode } from "@/lib/data/children";
import type { Locale } from "@/i18n/config";
import { resolveLocale } from "@/lib/locale-page";

type PageProps = { params: Promise<{ locale: string; code: string }> };

export function generateStaticParams() {
  return getAllChildren().map((child) => ({ code: child.code }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const locale = await resolveLocale(params);
  const child = getChildByCode(code);
  if (!child) return {};

  const siteName = locale === "vi" ? "Quỹ Tony Buổi Sáng" : "Tony Buoi Sang Fund";
  return {
    title: `${child.name} (${child.code}) | ${siteName}`,
    description: `${child.name} — ${child.province}, ${child.status}`,
  };
}

export default async function ChildDetailPage({ params }: PageProps) {
  const { code } = await params;
  const locale = (await resolveLocale(params)) as Locale;
  const child = getChildByCode(code);

  if (!child) notFound();

  const age = new Date().getFullYear() - child.birthYear;

  return (
    <article className="min-h-screen bg-gray-50 pb-20">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Link
          href="/danh-sach-bao-tro"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {getDataUiLabel(locale, "backToList")}
        </Link>
        <div className="brand-card p-8">
          <p className="font-mono text-sm font-bold text-brand-green">{child.code}</p>
          <h1 className="mt-2 font-heading text-3xl font-bold text-gray-900">{child.name}</h1>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">{getDataUiLabel(locale, "birthYear")}</p>
              <p className="font-medium text-gray-900">{child.birthYear}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{getDataUiLabel(locale, "age")}</p>
              <p className="font-medium text-gray-900">{age}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{getDataUiLabel(locale, "gender")}</p>
              <p className="font-medium text-gray-900">{child.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">{getDataUiLabel(locale, "province")}</p>
              <p className="font-medium text-gray-900">{child.province}</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-2 text-sm text-gray-500">{getDataUiLabel(locale, "status")}</p>
            <StatusBadge status={child.status} />
          </div>
        </div>
      </div>
    </article>
  );
}
