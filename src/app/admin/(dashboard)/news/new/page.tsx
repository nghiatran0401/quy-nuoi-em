import { NewsForm } from "@/components/admin/news-form";
import { createNewsArticle } from "@/app/admin/(dashboard)/news/actions";

type NewNewsPageProps = {
  searchParams: Promise<{ error?: string; message?: string }>;
};

export default async function NewNewsPage({ searchParams }: NewNewsPageProps) {
  const params = await searchParams;

  return (
    <NewsForm
      mode="create"
      submitLabel="Create article"
      action={createNewsArticle}
      error={params.error}
      message={params.message}
    />
  );
}
