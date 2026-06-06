#!/usr/bin/env node
/**
 * Sync /bao-cao document items into Supabase.
 *
 * Default source: Google Drive folder "Báo cáo công bố" (monthly Word reports).
 * Optional source: Google Sheet catalog via --from-sheet.
 *
 * Usage:
 *   npm run sync:bao-cao
 *   npm run sync:bao-cao -- --dry-run
 *   npm run sync:bao-cao -- --from-sheet
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { syncFinancialReportsFromDrive } from "../src/lib/data/financial-reports-drive-sync";
import { syncFinancialReportsFromSheet } from "../src/lib/data/financial-reports-sync";

function loadDotEnv(filePath: string) {
  try {
    const raw = readFileSync(filePath, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const index = trimmed.indexOf("=");
      if (index === -1) continue;
      const key = trimmed.slice(0, index).trim();
      const value = trimmed.slice(index + 1).trim();
      if (!(key in process.env)) {
        process.env[key] = value;
      }
    }
  } catch {
    // .env is optional when env vars are already exported
  }
}

loadDotEnv(resolve(process.cwd(), ".env"));

const dryRun = process.argv.includes("--dry-run");
const fromSheet = process.argv.includes("--from-sheet");

async function main() {
  const result = fromSheet
    ? await syncFinancialReportsFromSheet({ dryRun })
    : await syncFinancialReportsFromDrive({ dryRun });

  const mode = dryRun ? "DRY RUN" : "SYNCED";
  const source = fromSheet ? "Google Sheets" : "Google Drive";
  console.log(`[${mode}] Financial reports from ${source}`);
  console.log(`  Sheet: ${result.sheetUrl}`);
  console.log(`  Parsed: ${result.parsed}`);
  console.log(`  Inserted: ${result.inserted}`);
  console.log(`  Updated: ${result.updated}`);
  console.log(`  IDs: ${result.ids.join(", ")}`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`sync:bao-cao failed: ${message}`);
  process.exit(1);
});
