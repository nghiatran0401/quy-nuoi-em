import type { NewsStatus } from "@/types/supabase";
import { getFormText } from "@/lib/admin/form-utils";

const VALID_STATUSES: NewsStatus[] = ["draft", "published", "archived"];

export function slugifyNews(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseNewsFields(formData: FormData, imageUrl: string | null = null) {
  const title = getFormText(formData, "title");
  const slugInput = getFormText(formData, "slug");
  const excerpt = getFormText(formData, "excerpt");
  const content = getFormText(formData, "content");
  const statusInput = getFormText(formData, "status");
  const publishedAtInput = getFormText(formData, "published_at");

  const slug = slugifyNews(slugInput || title);
  const locale = "vi" as const;
  const status = VALID_STATUSES.includes(statusInput as NewsStatus) ? (statusInput as NewsStatus) : "draft";
  const publishedAt =
    status === "published"
      ? publishedAtInput
        ? new Date(publishedAtInput).toISOString()
        : new Date().toISOString()
      : null;

  if (!title) {
    throw new Error("Tiêu đề là bắt buộc.");
  }
  if (!slug) {
    throw new Error("Đường dẫn slug là bắt buộc.");
  }
  if (!content) {
    throw new Error("Nội dung là bắt buộc.");
  }

  return {
    slug,
    title,
    excerpt: excerpt || null,
    content,
    image_url: imageUrl,
    locale,
    status,
    published_at: publishedAt,
    display_date: null,
  };
}
