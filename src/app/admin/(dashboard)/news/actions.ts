"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { NewsStatus } from "@/types/supabase";
import { requireAdminSession } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";

const VALID_STATUSES: NewsStatus[] = ["draft", "published", "archived"];
const VALID_LOCALES = ["vi", "en"] as const;
const STORAGE_BUCKET = "images";
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getText(formData: FormData, key: string): string {
  const raw = formData.get(key);
  return typeof raw === "string" ? raw.trim() : "";
}

function encodeMessage(message: string): string {
  return encodeURIComponent(message);
}

function revalidateNewsPaths(slug: string, locale: string) {
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath(`/news/${slug}`);
  revalidatePath("/en/news");
  if (locale === "en") {
    revalidatePath(`/en/news/${slug}`);
  }
}

async function requireEditorOrAdmin() {
  await requireAdminSession();
  const supabase = createAdminClient();
  return { supabase };
}

async function requireAdmin() {
  return requireEditorOrAdmin();
}

async function resolveImageUrl(
  formData: FormData,
  supabase: SupabaseClient,
): Promise<string | null> {
  const file = formData.get("cover_image");
  const urlFromField = getText(formData, "image_url");

  if (file instanceof File && file.size > 0) {
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      throw new Error("Cover image must be JPEG, PNG, WebP, or AVIF.");
    }
    if (file.size > MAX_IMAGE_BYTES) {
      throw new Error("Cover image must be under 5 MB.");
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `tin-tuc/${crypto.randomUUID()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });

    if (error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
    return data.publicUrl;
  }

  return urlFromField || null;
}

async function parseNewsForm(formData: FormData, supabase: SupabaseClient) {
  const title = getText(formData, "title");
  const slugInput = getText(formData, "slug");
  const excerpt = getText(formData, "excerpt");
  const content = getText(formData, "content");
  const localeInput = getText(formData, "locale");
  const statusInput = getText(formData, "status");
  const publishedAtInput = getText(formData, "published_at");

  const slug = slugify(slugInput || title);
  const locale = VALID_LOCALES.includes(localeInput as (typeof VALID_LOCALES)[number]) ? localeInput : "vi";
  const status = VALID_STATUSES.includes(statusInput as NewsStatus) ? (statusInput as NewsStatus) : "draft";
  const publishedAt =
    status === "published"
      ? publishedAtInput
        ? new Date(publishedAtInput).toISOString()
        : new Date().toISOString()
      : null;

  if (!title) {
    throw new Error("Title is required.");
  }
  if (!slug) {
    throw new Error("Slug is required.");
  }
  if (!content) {
    throw new Error("Content is required.");
  }

  const image_url = await resolveImageUrl(formData, supabase);

  return {
    slug,
    title,
    excerpt: excerpt || null,
    content,
    image_url,
    locale,
    status,
    published_at: publishedAt,
    display_date: null,
  };
}

export async function createNewsArticle(formData: FormData) {
  let payload: Awaited<ReturnType<typeof parseNewsForm>>;

  try {
    const { supabase } = await requireEditorOrAdmin();
    payload = await parseNewsForm(formData, supabase);

    const { error } = await supabase.from("news_articles").insert(payload);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not create article.";
    redirect(`/admin/news/new?error=${encodeMessage(message)}`);
  }

  revalidateNewsPaths(payload.slug, payload.locale);
  redirect("/admin/news?message=created");
}

export async function updateNewsArticle(id: string, formData: FormData) {
  let payload: Awaited<ReturnType<typeof parseNewsForm>>;

  try {
    const { supabase } = await requireEditorOrAdmin();
    payload = await parseNewsForm(formData, supabase);

    const { error } = await supabase.from("news_articles").update(payload).eq("id", id);
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not update article.";
    redirect(`/admin/news/${id}/edit?error=${encodeMessage(message)}`);
  }

  revalidateNewsPaths(payload.slug, payload.locale);
  redirect(`/admin/news/${id}/edit?message=saved`);
}

export async function archiveNewsArticle(formData: FormData) {
  const id = getText(formData, "id");
  if (!id) {
    redirect("/admin/news?error=missing-id");
  }

  try {
    const { supabase } = await requireEditorOrAdmin();
    const { data: article } = await supabase
      .from("news_articles")
      .select("slug, locale")
      .eq("id", id)
      .maybeSingle();

    const { error } = await supabase.from("news_articles").update({ status: "archived" }).eq("id", id);
    if (error) {
      throw new Error(error.message);
    }

    if (article) {
      revalidateNewsPaths(article.slug, article.locale);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not archive article.";
    redirect(`/admin/news?error=${encodeMessage(message)}`);
  }

  redirect("/admin/news?message=archived");
}

export async function deleteNewsArticle(formData: FormData) {
  const id = getText(formData, "id");
  if (!id) {
    redirect("/admin/news?error=missing-id");
  }

  try {
    const { supabase } = await requireAdmin();
    const { data: article } = await supabase
      .from("news_articles")
      .select("slug, locale")
      .eq("id", id)
      .maybeSingle();

    const { error } = await supabase.from("news_articles").delete().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }

    if (article) {
      revalidateNewsPaths(article.slug, article.locale);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not delete article.";
    redirect(`/admin/news?error=${encodeMessage(message)}`);
  }

  redirect("/admin/news?message=deleted");
}
