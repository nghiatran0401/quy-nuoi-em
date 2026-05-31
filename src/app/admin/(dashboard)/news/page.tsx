import { archiveNewsArticle, deleteNewsArticle } from "@/app/admin/(dashboard)/news/actions";
import { NewsAdminTable } from "@/components/admin/news-admin-table";
import { requireAdminSession } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { NewsArticleRow } from "@/types/supabase";

export default async function AdminNewsPage() {
  await requireAdminSession();
  let data: unknown[] = [];
  let error: { message: string } | null = null;

  try {
    const supabase = createAdminClient();
    const result = await supabase
      .from("news_articles")
      .select("id, slug, title, status, locale, published_at, updated_at")
      .order("updated_at", { ascending: false })
      .limit(50);

    data = (result.data ?? []) as unknown[];
    error = result.error;
  } catch (caught) {
    error = {
      message: caught instanceof Error ? caught.message : "Không thể khởi tạo kết nối cơ sở dữ liệu quản trị.",
    };
  }

  const rows = (data ?? []) as Pick<
    NewsArticleRow,
    "id" | "slug" | "title" | "status" | "locale" | "published_at" | "updated_at"
  >[];

  return (
    <NewsAdminTable
      rows={rows}
      loadError={error?.message}
      archiveAction={archiveNewsArticle}
      deleteAction={deleteNewsArticle}
    />
  );
}
