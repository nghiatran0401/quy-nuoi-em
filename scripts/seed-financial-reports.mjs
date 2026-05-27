/**
 * Seeds financial_reports from src/data/reports.json
 * Usage: node --env-file=.env scripts/seed-financial-reports.mjs
 */
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

function loadDotEnv() {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) return;
  try {
    const envPath = resolve(dirname(fileURLToPath(import.meta.url)), "../.env");
    for (const line of readFileSync(envPath, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      if (process.env[key]) continue;
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  } catch {
    /* optional */
  }
}

loadDotEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing Supabase env vars.");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const reportsPath = resolve(dirname(fileURLToPath(import.meta.url)), "../src/data/reports.json");
const reports = JSON.parse(readFileSync(reportsPath, "utf8"));

async function main() {
  const rows = reports.map((r, index) => ({
    id: r.id,
    title: r.title,
    image_url: r.imageUrl,
    document_url: r.documentUrl ?? null,
    total_income: r.totalIncome ?? null,
    total_expense: r.totalExpense ?? null,
    summary: r.summary ?? null,
    year: r.year,
    sort_order: reports.length - index,
  }));

  const { error } = await supabase.from("financial_reports").upsert(rows, { onConflict: "id" });
  if (error) throw error;
  console.log(`Seeded ${rows.length} financial_reports rows.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
