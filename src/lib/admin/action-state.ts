export type AdminActionResult = {
  ok: boolean;
  message: string;
  /** Optional client redirect after a successful mutation (e.g. create → list). */
  redirectTo?: string;
};

export type AdminActionState = AdminActionResult | null;

export const ADMIN_ACTION_INITIAL: AdminActionState = null;

export function adminActionSuccess(message: string, redirectTo?: string): AdminActionResult {
  return { ok: true, message, redirectTo };
}

export function adminActionError(message: string): AdminActionResult {
  return { ok: false, message };
}

export type AdminFormAction = (
  prevState: AdminActionState,
  formData: FormData,
) => Promise<AdminActionResult>;
