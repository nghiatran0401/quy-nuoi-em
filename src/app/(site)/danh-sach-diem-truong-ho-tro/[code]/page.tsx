import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { StatusBadge } from "@/components/data/status-badge";
import { JsonLd } from "@/components/seo/json-ld";
import { ShareButtons } from "@/components/seo/share-buttons";
import { getDataPageMeta, getDataUiLabel } from "@/content/pages/data-pages";
import { getAllChildren, getChildByCode } from "@/lib/data/children";
import { childProfileJsonLd, siteBreadcrumb } from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { absoluteUrl } from "@/lib/seo/paths";

type PageProps = { params: Promise<{ code: string }> };

export function generateStaticParams() {
  return getAllChildren().map((child) => ({ code: child.code }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const child = getChildByCode(code);
  if (!child) return {};

  const listMeta = getDataPageMeta("children");
  const title = `${child.name} (${child.code})`;
  const description = `Hồ sơ bảo trợ ${child.code} — ${child.name}, ${child.province}. ${listMeta.description}`;

  return buildMetadata({
    title,
    description,
    pathname: `/danh-sach-diem-truong-ho-tro/${child.code}`,
    ogType: "website",
  });
}

export default async function ChildDetailPage({ params }: PageProps) {
  const { code } = await params;
  const child = getChildByCode(code);

  if (!child) notFound();

  const age = new Date().getFullYear() - child.birthYear;
  const listMeta = getDataPageMeta("children");
  const pathname = `/danh-sach-diem-truong-ho-tro/${child.code}`;
  const shareUrl = absoluteUrl(pathname);
  const shareTitle = `${child.name} (${child.code})`;

  return (
    <article className="min-h-screen bg-brand-warm pb-20">
      <JsonLd
        data={[
          childProfileJsonLd({
            code: child.code,
            name: child.name,
            province: child.province,
            pathname,
          }),
          siteBreadcrumb([
            { name: listMeta.title, pathname: "/danh-sach-diem-truong-ho-tro" },
            { name: `${child.code} — ${child.name}`, pathname },
          ]),
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Link href="/danh-sach-diem-truong-ho-tro" className="back-link mb-8">
          <ArrowLeft className="h-4 w-4" />
          {getDataUiLabel("backToList")}
        </Link>
        <div className="brand-card p-8">
          <p className="font-mono text-sm font-bold text-brand-accent">{child.code}</p>
          <h1 className="heading-display mt-2 text-3xl">{child.name}</h1>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-brand-muted">{getDataUiLabel("birthYear")}</p>
              <p className="font-medium text-brand-ink">{child.birthYear}</p>
            </div>
            <div>
              <p className="text-sm text-brand-muted">{getDataUiLabel("age")}</p>
              <p className="font-medium text-brand-ink">{age}</p>
            </div>
            <div>
              <p className="text-sm text-brand-muted">{getDataUiLabel("gender")}</p>
              <p className="font-medium text-brand-ink">{child.gender}</p>
            </div>
            <div>
              <p className="text-sm text-brand-muted">{getDataUiLabel("province")}</p>
              <p className="font-medium text-brand-ink">{child.province}</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-2 text-sm text-brand-muted">{getDataUiLabel("status")}</p>
            <StatusBadge status={child.status} />
          </div>
          <ShareButtons
            className="mt-8 border-t border-brand-border/60 pt-6"
            title={shareTitle}
            url={shareUrl}
          />
        </div>
      </div>
    </article>
  );
}
