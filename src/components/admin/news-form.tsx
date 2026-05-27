import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ImageIcon, Save } from "lucide-react";
import type { NewsArticleRow } from "@/types/supabase";
import { AdminAlert } from "@/components/admin/admin-alert";
import { formatAdminMessage, decodeAdminParam } from "@/lib/admin/messages";

type NewsFormValues = Pick<
  NewsArticleRow,
  "title" | "slug" | "excerpt" | "content" | "image_url" | "status" | "locale" | "published_at"
>;

type NewsFormProps = {
  mode: "create" | "edit";
  submitLabel: string;
  action: (formData: FormData) => Promise<void>;
  values?: Partial<NewsFormValues>;
  error?: string;
  message?: string;
};

function toDatetimeLocal(value: string | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const pad = (num: number) => String(num).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}`;
}

export function NewsForm({ mode, submitLabel, action, values, error, message }: NewsFormProps) {
  const successMessage = formatAdminMessage(message);
  const errorMessage = decodeAdminParam(error);

  return (
    <div className="space-y-6">
      <Link href="/admin/news" className="admin-btn-ghost -ml-2 w-fit">
        <ArrowLeft className="h-4 w-4" />
        Quay lại danh sách tin tức
      </Link>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {mode === "create" ? "Tạo bài viết mới" : "Chỉnh sửa bài viết"}
        </h1>
        <p className="mt-1.5 text-sm text-slate-600">
          {mode === "create"
            ? "Soạn nội dung, chọn trạng thái và xuất bản khi sẵn sàng."
            : "Cập nhật nội dung và thiết lập xuất bản."}
        </p>
      </div>

      {successMessage ? <AdminAlert variant="success" message={successMessage} /> : null}
      {errorMessage ? <AdminAlert variant="error" message={errorMessage} /> : null}

      <form action={action} className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="admin-card space-y-6 p-5 sm:p-6">
          <section className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Content</h2>
            <div>
              <label htmlFor="title" className="admin-label">
                Tiêu đề
              </label>
              <input
                id="title"
                name="title"
                required
                defaultValue={values?.title ?? ""}
                placeholder="Article headline"
                className="admin-input text-base font-medium"
              />
            </div>
            <div>
              <label htmlFor="slug" className="admin-label">
                Đường dẫn URL
              </label>
              <div className="flex rounded-xl border border-slate-200 bg-slate-50 shadow-sm focus-within:border-[var(--admin-accent)] focus-within:ring-2 focus-within:ring-[color-mix(in_srgb,var(--admin-accent)_25%,transparent)]">
                <span className="flex items-center border-r border-slate-200 px-3 text-xs text-slate-500">/news/</span>
                <input
                  id="slug"
                  name="slug"
                  required
                  defaultValue={values?.slug ?? ""}
                  placeholder="tieu-de-bai-viet"
                  className="min-w-0 flex-1 border-0 bg-transparent px-3 py-2.5 text-sm focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="excerpt" className="admin-label">
                Tóm tắt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows={3}
                defaultValue={values?.excerpt ?? ""}
                placeholder="Mô tả ngắn để hiển thị ở thẻ tin và SEO"
                className="admin-input resize-y"
              />
            </div>
            <div>
              <label htmlFor="content" className="admin-label">
                Nội dung
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={18}
                defaultValue={values?.content ?? ""}
                placeholder="Viết nội dung theo markdown (# tiêu đề, - danh sách)"
                className="admin-input resize-y font-mono text-sm leading-relaxed"
              />
            </div>
          </section>
        </div>

        <div className="space-y-4">
          <div className="admin-card space-y-4 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Publish</h2>
            <div>
              <label htmlFor="status" className="admin-label">
                Trạng thái
              </label>
              <select id="status" name="status" defaultValue={values?.status ?? "draft"} className="admin-input">
                <option value="draft">Bản nháp</option>
                <option value="published">Đã xuất bản</option>
                <option value="archived">Lưu trữ</option>
              </select>
            </div>
            <div>
              <label htmlFor="published_at" className="admin-label">
                Thời gian đăng
              </label>
              <input
                id="published_at"
                name="published_at"
                type="datetime-local"
                defaultValue={toDatetimeLocal(values?.published_at)}
                className="admin-input"
              />
              <p className="mt-1.5 text-xs text-slate-500">Áp dụng khi trạng thái là đã xuất bản. Để trống sẽ dùng thời gian hiện tại.</p>
            </div>
            <button type="submit" className="admin-btn-primary w-full">
              <Save className="h-4 w-4" />
              {submitLabel}
            </button>
          </div>

          <div className="admin-card space-y-4 p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
              <ImageIcon className="h-4 w-4" />
              Ảnh bìa
            </h2>
            {values?.image_url ? (
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                <Image src={values.image_url} alt="" fill className="object-cover" sizes="280px" />
              </div>
            ) : null}
            <div>
              <label htmlFor="cover_image" className="admin-label">
                Tải ảnh lên
              </label>
              <input
                id="cover_image"
                name="cover_image"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                className="admin-input file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-700"
              />
              <p className="mt-1.5 text-xs text-slate-500">Hỗ trợ JPEG, PNG, WebP, AVIF · tối đa 5 MB</p>
            </div>
            <div>
              <label htmlFor="image_url" className="admin-label">
                Hoặc dán URL ảnh
              </label>
              <input
                id="image_url"
                name="image_url"
                type="url"
                defaultValue={values?.image_url ?? ""}
                placeholder="https://..."
                className="admin-input"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
