"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { AdminAlert } from "@/components/admin/admin-alert";
import {
  ADMIN_ACTION_INITIAL,
  type AdminActionState,
  type AdminFormAction,
} from "@/lib/admin/action-state";

const AdminFormPendingContext = createContext(false);

export function useAdminFormPending(): boolean {
  return useContext(AdminFormPendingContext);
}

type AdminActionFormProps = {
  action: AdminFormAction;
  children: ReactNode;
  className?: string;
  encType?: "multipart/form-data" | "application/x-www-form-urlencoded";
  alertClassName?: string;
  showAlert?: boolean;
};

export function AdminActionForm({
  action,
  children,
  className,
  encType,
  alertClassName = "space-y-3",
  showAlert = true,
}: AdminActionFormProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(action, ADMIN_ACTION_INITIAL);

  useEffect(() => {
    if (state?.ok && state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state, router]);

  return (
    <AdminFormPendingContext.Provider value={pending}>
      {showAlert && state?.message ? (
        <div className={alertClassName}>
          <AdminAlert variant={state.ok ? "success" : "error"} message={state.message} />
        </div>
      ) : null}
      <form action={formAction} className={className} encType={encType}>
        <fieldset disabled={pending} className="min-w-0 border-0 p-0 m-0 disabled:opacity-70">
          {children}
        </fieldset>
      </form>
    </AdminFormPendingContext.Provider>
  );
}

type AdminActionFeedbackProps = {
  state: AdminActionState;
  className?: string;
};

export function AdminActionFeedback({ state, className }: AdminActionFeedbackProps) {
  if (!state?.message) return null;
  return (
    <div className={className}>
      <AdminAlert variant={state.ok ? "success" : "error"} message={state.message} />
    </div>
  );
}
