import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { createAdminSession, hasAdminSession, isValidAdminCredentials } from "@/lib/admin-auth";
import { decodeAdminParam } from "@/lib/admin/messages";
import "../admin.css";

export async function loginWithPassword(formData: FormData) {
  "use server";

  const username = (formData.get("username") as string | null)?.trim() ?? "";
  const password = (formData.get("password") as string | null) ?? "";

  if (!isValidAdminCredentials(username, password)) {
    redirect("/admin/login?error=Invalid%20username%20or%20password");
  }

  await createAdminSession();
  redirect("/admin/news");
}

type AdminLoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  if (await hasAdminSession()) {
    redirect("/admin/news");
  }

  const params = await searchParams;

  return (
    <section className="admin-app relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--admin-bg)] px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 0%, color-mix(in srgb, #f0784a 18%, transparent), transparent 55%), radial-gradient(ellipse 60% 45% at 100% 100%, color-mix(in srgb, #4a7c6a 12%, transparent), transparent 50%)",
        }}
      />
      <LoginForm action={loginWithPassword} error={decodeAdminParam(params.error)} />
    </section>
  );
}
