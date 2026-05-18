#!/usr/bin/env node
/**
 * Download Ladipage assets referenced on https://www.nuoiem.com/
 * into public/images/nuoiem and refresh src/data/nuoiem-images.json
 */
import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const OUT_DIR = join(ROOT, "public/images/nuoiem");
const MANIFEST = join(ROOT, "src/data/nuoiem-images.json");
const CDN = "https://static.ladipage.net/";
const PAGE_URL = "https://www.nuoiem.com/";

mkdirSync(OUT_DIR, { recursive: true });

const html = execSync(`curl -fsSL "${PAGE_URL}"`, { encoding: "utf8" });
const paths = [
  ...new Set(html.match(/59fb4d0b9bc14c499ef70892\/[a-zA-Z0-9_\-]+\.(?:jpg|jpeg|png|webp|gif|JPG)/g) ?? []),
];

const files = {};
let ok = 0;
for (const rel of paths.sort()) {
  const filename = rel.split("/").pop().toLowerCase();
  const dest = join(OUT_DIR, filename);
  const url = CDN + rel;
  if (!existsSync(dest) || statSync(dest).size < 200) {
    try {
      execSync(`curl -fsSL --max-time 90 -o "${dest}" "${url}"`, { stdio: "pipe" });
    } catch {
      console.warn("skip", rel);
      continue;
    }
  }
  if (existsSync(dest) && statSync(dest).size > 200) {
    files[rel] = `/images/nuoiem/${filename}`;
    ok++;
  }
}

const existing = existsSync(MANIFEST)
  ? JSON.parse(readFileSync(MANIFEST, "utf8"))
  : { aliases: {}, memberGallery: [], mediaLogos: [], mouGallery: [] };

writeFileSync(
  MANIFEST,
  JSON.stringify({ ...existing, files }, null, 2),
  "utf8",
);

console.log(`Downloaded ${ok}/${paths.length} images to public/images/nuoiem`);
