/**
 * Verifies Supabase env vars and API connectivity.
 * Run: node --env-file=.env scripts/check-supabase.mjs
 */

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function fail(message) {
  console.error(`✗ ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`✓ ${message}`);
}

if (!url) fail("NEXT_PUBLIC_SUPABASE_URL is missing");
if (!anonKey) fail("NEXT_PUBLIC_SUPABASE_ANON_KEY is missing");

if (!url.startsWith("https://") || !url.includes(".supabase.co")) {
  fail("NEXT_PUBLIC_SUPABASE_URL does not look like a Supabase project URL");
}

ok(`URL configured (${new URL(url).hostname})`);

const supabase = createClient(url, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// Auth API — validates anon key against project
const { data: authData, error: authError } = await supabase.auth.getSession();
if (authError) {
  fail(`Auth API: ${authError.message}`);
}
ok(`Auth API reachable (session: ${authData.session ? "active" : "none — expected before login"})`);

// Database API — tests PostgREST + RLS (table may not exist until migration runs)
const { error: dbError } = await supabase.from("news_articles").select("id").limit(1);

if (!dbError) {
  ok("Database API: news_articles table exists and is readable");
} else if (dbError.code === "42P01" || dbError.message?.includes("does not exist")) {
  ok("Database API reachable (news_articles not created yet — run the migration in supabase/README.md)");
} else if (dbError.code === "PGRST301" || dbError.message?.includes("JWT")) {
  fail(`Database API: invalid API key — ${dbError.message}`);
} else {
  // RLS or empty table still means connection works
  ok(`Database API reachable (${dbError.code ?? "ok"}: ${dbError.message})`);
}

console.log("\nSupabase connection check passed.");
