import { notFound } from "next/navigation";
import { NewsForm } from "@/components/admin/news-form";
import { updateNewsArticle } from "@/app/admin/(dashboard)/news/actions";
import { requireAdminSession } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { NewsArticleRow } from "@/types/supabase";

type EditNewsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditNewsPage({ params }: EditNewsPageProps) {
  await requireAdminSession();
  const { id } = await params;
  const supabase = createAdminClient();
  const { data } = await supabase.from("news_articles").select("*").eq("id", id).maybeSingle();

  if (!data) {
    notFound();
  }

  const values = data as NewsArticleRow;
  const action = updateNewsArticle.bind(null, id);

  return <NewsForm mode="edit" submitLabel="Lưu thay đổi" action={action} values={values} />;
}
