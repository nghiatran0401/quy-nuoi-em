import { NewsForm } from "@/components/admin/news-form";
import { createNewsArticle } from "@/app/admin/(dashboard)/news/actions";

export default function NewNewsPage() {
  return <NewsForm mode="create" submitLabel="Tạo bài viết" action={createNewsArticle} />;
}
