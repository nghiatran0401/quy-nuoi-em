"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Newspaper } from "lucide-react";

const navItems = [
  { href: "/admin/news", label: "News", icon: Newspaper, match: "/admin/news" },
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
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
      >
        <ExternalLink className="h-4 w-4 shrink-0 text-slate-400" />
        View public site
      </a>
    </nav>
  );
}
