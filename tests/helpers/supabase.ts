import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export function hasIntegrationEnv(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      process.env.SUPABASE_SERVICE_ROLE_KEY !== "your_service_role_key",
  );
}

export function createTestAdminClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing Supabase env for integration tests");
  }
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function assertTableReadable(supabase: SupabaseClient, table: string) {
  const { error } = await supabase.from(table).select("*").limit(1);
  if (error) {
    throw new Error(`Table "${table}" is not readable: ${error.message}`);
  }
}
