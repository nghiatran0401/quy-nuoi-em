import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const DEFAULT_REDIRECT = "/admin/news";

function getSafeNextPath(next: string | null): string {
  if (!next || !next.startsWith("/")) {
    return DEFAULT_REDIRECT;
  }

  return next.startsWith("/admin") ? next : DEFAULT_REDIRECT;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = getSafeNextPath(requestUrl.searchParams.get("next"));

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
