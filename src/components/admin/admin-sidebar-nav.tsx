"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, Info, ListOrdered, Newspaper, PieChart } from "lucide-react";

const navItems = [
  { href: "/admin/homepage", label: "Trang chủ", icon: House, match: "/admin/homepage" },
  { href: "/admin/about", label: "Giới thiệu", icon: Info, match: "/admin/about" },
  {
    href: "/admin/quy-trinh-cap-ma-2026",
    label: "Quy trình cấp mã",
    icon: ListOrdered,
    match: "/admin/quy-trinh-cap-ma-2026",
  },
  { href: "/admin/bao-cao", label: "Báo cáo", icon: PieChart, match: "/admin/bao-cao" },
  { href: "/admin/news", label: "Tin tức", icon: Newspaper, match: "/admin/news" },
] as const;

export function AdminSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const active = pathname === item.match || pathname.startsWith(`${item.match}/`);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-[color-mix(in_srgb,var(--admin-accent)_12%,white)] text-slate-900 shadow-sm ring-1 ring-[color-mix(in_srgb,var(--admin-accent)_25%,transparent)]"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Icon className={`h-4 w-4 shrink-0 ${active ? "text-[var(--admin-accent)]" : "text-slate-400"}`} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
