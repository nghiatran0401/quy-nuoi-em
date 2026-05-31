import { adminActionError, adminActionSuccess, type AdminActionResult } from "@/lib/admin/action-state";
import { getActionErrorMessage, isNavigationRedirect } from "@/lib/admin/form-utils";
import { requireAdminSession } from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SupabaseClient } from "@supabase/supabase-js";

type SaveContext = {
  supabase: SupabaseClient;
};

/**
 * Runs an authenticated admin save and returns feedback for useActionState.
 * Re-throws Next.js navigation redirects (login) so they are not swallowed.
 */
export async function runAdminSave(
  successMessage: string,
  fallbackMessage: string,
  task: (ctx: SaveContext) => Promise<void>,
  options?: { redirectTo?: string },
): Promise<AdminActionResult> {
  try {
    await requireAdminSession();
    const supabase = createAdminClient();
    await task({ supabase });
    return adminActionSuccess(successMessage, options?.redirectTo);
  } catch (error) {
    if (isNavigationRedirect(error)) {
      throw error;
    }
    return adminActionError(getActionErrorMessage(error, fallbackMessage));
  }
}
