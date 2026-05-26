import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { clearAdminSession, requireAdminSession } from "@/lib/admin-auth";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  await requireAdminSession();

  async function signOut() {
    "use server";

    await clearAdminSession();
    redirect("/admin/login");
  }

  const footer = (
    <div className="space-y-3">
      <div className="rounded-xl bg-slate-50 px-3 py-2.5">
        <p className="text-xs font-medium text-slate-500">Đăng nhập với vai trò</p>
        <p className="truncate text-sm font-semibold text-slate-800">Quản trị viên</p>
      </div>
      <form action={signOut}>
        <button type="submit" className="admin-btn-secondary w-full">
          <LogOut className="h-4 w-4" />
          Đăng xuất
        </button>
      </form>
    </div>
  );

  return <AdminShell footer={footer}>{children}</AdminShell>;
}
