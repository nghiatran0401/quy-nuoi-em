"use client";

import Image from "next/image";
import { LockKeyhole } from "lucide-react";

type LoginFormProps = {
  action: (formData: FormData) => Promise<void>;
  error?: string;
};

export function LoginForm({ action, error }: LoginFormProps) {
  return (
    <div className="admin-app w-full max-w-md">
      <div className="admin-card overflow-hidden">
        <div className="border-b border-slate-100 bg-gradient-to-br from-brand-peach/30 via-white to-brand-sky-soft/40 px-6 py-8 text-center">
          <div className="relative mx-auto mb-4 h-14 w-14 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80">
            <Image src="/logo/logo-ne.png" alt="Dự án Nuôi Em" fill className="object-contain p-2" sizes="56px" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Trang quản trị</h1>
          <p className="mt-2 text-sm text-slate-600">Đăng nhập để quản lý bài viết và nội dung website.</p>
        </div>

        <form action={action} className="space-y-5 p-6 sm:p-8">
          <div>
            <label htmlFor="username" className="admin-label">
              Tên đăng nhập
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              placeholder="admin"
              className="admin-input"
            />
          </div>

          <div>
            <label htmlFor="password" className="admin-label">
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="admin-input"
            />
          </div>

          <button type="submit" className="admin-btn-primary w-full">
            <LockKeyhole className="h-4 w-4" />
            Đăng nhập
          </button>

          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        Chỉ dành cho quản trị viên được cấp quyền.
      </p>
    </div>
  );
}
