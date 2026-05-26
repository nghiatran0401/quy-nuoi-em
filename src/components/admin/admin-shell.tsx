"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { AdminSidebarNav } from "@/components/admin/admin-sidebar-nav";

type AdminShellProps = {
  children: ReactNode;
  footer: ReactNode;
};

export function AdminShell({ children, footer }: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="admin-app min-h-screen bg-[var(--admin-bg)] text-slate-900">
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[var(--admin-sidebar-w)] flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-lg bg-brand-peach/40 ring-1 ring-brand-border/60">
              <Image src="/logo/logo-ne.png" alt="" fill className="object-contain p-1" sizes="36px" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Dự án Nuôi Em</p>
              <p className="text-sm font-bold text-slate-900">Admin</p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          <AdminSidebarNav />
        </div>

        <div className="border-t border-slate-100 p-4">{footer}</div>
      </aside>

      <div className="lg:pl-[var(--admin-sidebar-w)]">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-md lg:hidden">
          <button
            type="button"
            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <p className="text-sm font-semibold text-slate-900">Admin console</p>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
