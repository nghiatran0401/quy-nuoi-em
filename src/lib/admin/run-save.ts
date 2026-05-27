import { isNavigationRedirect, getActionErrorMessage } from "@/lib/admin/form-utils";
import { requireAdminSession } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SupabaseClient } from "@supabase/supabase-js";

type SaveContext = {
  supabase: SupabaseClient;
};

/**
 * Runs an authenticated admin save. Re-throws Next.js navigation redirects
 * so login/success redirects are not swallowed by action catch blocks.
 */
export async function runAdminSave<T>(
  errorPath: string,
  fallbackMessage: string,
  task: (ctx: SaveContext) => Promise<T>,
): Promise<T> {
  try {
    await requireAdminSession();
    const supabase = createAdminClient();
    return await task({ supabase });
  } catch (error) {
    if (isNavigationRedirect(error)) {
      throw error;
    }
    const message = getActionErrorMessage(error, fallbackMessage);
    const { redirect } = await import("next/navigation");
    redirect(`${errorPath}?error=${encodeURIComponent(message)}`);
    throw new Error("unreachable");
  }
}
