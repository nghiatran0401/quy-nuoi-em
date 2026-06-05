"use server";

import { revalidatePath } from "next/cache";
import type { SupabaseClient } from "@supabase/supabase-js";
import { adminActionError, adminActionSuccess, type AdminActionResult, type AdminActionState } from "@/lib/admin/action-state";
import { getFormText, getActionErrorMessage, isNavigationRedirect } from "@/lib/admin/form-utils";
import { ADMIN_SUCCESS_MESSAGES } from "@/lib/admin/messages";
import { parseNewsFields } from "@/lib/admin/parsers/news";
import { resolveImageUrlFromForm } from "@/lib/admin/storage-upload";
import { requireAdminSession } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { DATA_PAGE_PATHS, newsArticlePath } from "@/lib/seo/routes";

const NEWS_STORAGE_FOLDER = "tin-tuc";

function revalidateNewsPaths(slug: string) {
  revalidatePath("/admin/news");
  revalidatePath(DATA_PAGE_PATHS.news);
  revalidatePath(newsArticlePath(slug));
}

async function requireEditorOrAdmin() {
  await requireAdminSession();
  const supabase = createAdminClient();
  return { supabase };
}

async function resolveImageUrl(formData: FormData, supabase: SupabaseClient): Promise<string | null> {
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

export async function createNewsArticle(
  _prevState: AdminActionState,
  formData: FormData,
): Promise<AdminActionResult> {
  try {
    const { supabase } = await requireEditorOrAdmin();
    const payload = await parseNewsForm(formData, supabase);

    const { error } = await supabase.from("news_articles").insert(payload);
    if (error) {
      throw new Error(error.message);
    }

    revalidateNewsPaths(payload.slug);
    return adminActionSuccess(ADMIN_SUCCESS_MESSAGES.created, "/admin/news");
  } catch (error) {
    if (isNavigationRedirect(error)) {
      throw error;
    }
    return adminActionError(getActionErrorMessage(error, "Không thể tạo bài viết."));
  }
}

export async function updateNewsArticle(
  id: string,
  _prevState: AdminActionState,
  formData: FormData,
): Promise<AdminActionResult> {
  try {
    const { supabase } = await requireEditorOrAdmin();
    const payload = await parseNewsForm(formData, supabase);

    const { error } = await supabase.from("news_articles").update(payload).eq("id", id);
    if (error) {
      throw new Error(error.message);
    }

    revalidateNewsPaths(payload.slug);
    return adminActionSuccess(ADMIN_SUCCESS_MESSAGES.saved);
  } catch (error) {
    if (isNavigationRedirect(error)) {
      throw error;
    }
    return adminActionError(getActionErrorMessage(error, "Không thể cập nhật bài viết."));
  }
}

export async function archiveNewsArticle(
  _prevState: AdminActionState,
  formData: FormData,
): Promise<AdminActionResult> {
  const id = getFormText(formData, "id");
  if (!id) {
    return adminActionError("Thiếu mã bài viết.");
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

    return adminActionSuccess(ADMIN_SUCCESS_MESSAGES.archived);
  } catch (error) {
    if (isNavigationRedirect(error)) {
      throw error;
    }
    return adminActionError(getActionErrorMessage(error, "Không thể lưu trữ bài viết."));
  }
}

export async function deleteNewsArticle(
  _prevState: AdminActionState,
  formData: FormData,
): Promise<AdminActionResult> {
  const id = getFormText(formData, "id");
  if (!id) {
    return adminActionError("Thiếu mã bài viết.");
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

    return adminActionSuccess(ADMIN_SUCCESS_MESSAGES.deleted);
  } catch (error) {
    if (isNavigationRedirect(error)) {
      throw error;
    }
    return adminActionError(getActionErrorMessage(error, "Không thể xóa bài viết."));
  }
}
