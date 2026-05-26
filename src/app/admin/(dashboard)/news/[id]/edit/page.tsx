import { notFound } from "next/navigation";
import { NewsForm } from "@/components/admin/news-form";
import { updateNewsArticle } from "@/app/admin/(dashboard)/news/actions";
import { requireAdminSession } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { NewsArticleRow } from "@/types/supabase";

type EditNewsPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; message?: string }>;
};

export default async function EditNewsPage({ params, searchParams }: EditNewsPageProps) {
  await requireAdminSession();
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const supabase = createAdminClient();
  const { data } = await supabase.from("news_articles").select("*").eq("id", id).maybeSingle();

  if (!data) {
    notFound();
  }

  const values = data as NewsArticleRow;
  const action = updateNewsArticle.bind(null, id);

  return (
    <NewsForm
      mode="edit"
      submitLabel="Save changes"
      action={action}
      values={values}
      error={query.error}
      message={query.message}
    />
  );
}
