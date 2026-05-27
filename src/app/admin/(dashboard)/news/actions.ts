"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getFormText, getActionErrorMessage, isNavigationRedirect } from "@/lib/admin/form-utils";
import { parseNewsFields } from "@/lib/admin/parsers/news";
import { resolveImageUrlFromForm } from "@/lib/admin/storage-upload";
import { requireAdminSession } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";

const NEWS_STORAGE_FOLDER = "tin-tuc";

function encodeMessage(message: string): string {
  return encodeURIComponent(message);
}

function revalidateNewsPaths(slug: string) {
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath(`/news/${slug}`);
}

async function requireEditorOrAdmin() {
  await requireAdminSession();
  const supabase = createAdminClient();
  return { supabase };
}

async function resolveImageUrl(
  formData: FormData,
  supabase: SupabaseClient,
): Promise<string | null> {
  return resolveImageUrlFromForm(formData, supabase, {
    fileField: "cover_image",
    urlField: "image_url",
    storageFolder: NEWS_STORAGE_FOLDER,
  });
}

async function parseNewsForm(formData: FormData, supabase: SupabaseClient) {
  const image_url = await resolveImageUrl(formData, supabase);
  return parseNewsFields(formData, image_url);
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
    if (isNavigationRedirect(error)) {
      throw error;
    }
    const message = getActionErrorMessage(error, "Không thể tạo bài viết.");
    redirect(`/admin/news/new?error=${encodeMessage(message)}`);
  }

  revalidateNewsPaths(payload.slug);
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
    if (isNavigationRedirect(error)) {
      throw error;
    }
    const message = getActionErrorMessage(error, "Không thể cập nhật bài viết.");
    redirect(`/admin/news/${id}/edit?error=${encodeMessage(message)}`);
  }

  revalidateNewsPaths(payload.slug);
  redirect(`/admin/news/${id}/edit?message=saved`);
}

export async function archiveNewsArticle(formData: FormData) {
  const id = getFormText(formData, "id");
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
      revalidateNewsPaths(article.slug);
    }
  } catch (error) {
    if (isNavigationRedirect(error)) {
      throw error;
    }
    const message = getActionErrorMessage(error, "Không thể lưu trữ bài viết.");
    redirect(`/admin/news?error=${encodeMessage(message)}`);
  }

  redirect("/admin/news?message=archived");
}

export async function deleteNewsArticle(formData: FormData) {
  const id = getFormText(formData, "id");
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

    const { error } = await supabase.from("news_articles").delete().eq("id", id);
    if (error) {
      throw new Error(error.message);
    }

    if (article) {
      revalidateNewsPaths(article.slug);
    }
  } catch (error) {
    if (isNavigationRedirect(error)) {
      throw error;
    }
    const message = getActionErrorMessage(error, "Không thể xóa bài viết.");
    redirect(`/admin/news?error=${encodeMessage(message)}`);
  }

  redirect("/admin/news?message=deleted");
}
