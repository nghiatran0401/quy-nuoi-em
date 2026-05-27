/**
 * Strips English locale branches and unwraps `vi:` wrappers in content TS files.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

const files = [
  "src/content/pages/static-pages.ts",
  "src/content/pages/data-pages.ts",
  "src/content/home-sections.ts",
  "src/content/shared/site-stats.ts",
];

function findMatchingEnd(source, openIndex, openChar, closeChar) {
  let depth = 0;
  for (let i = openIndex; i < source.length; i++) {
    const ch = source[i];
    if (ch === openChar) depth++;
    else if (ch === closeChar) {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function removePropertyBlocks(source, propName) {
  let result = source;
  const pattern = new RegExp(`\\b${propName}:\\s*(\\{|\\[)`, "g");
  let match;
  const removals = [];

  while ((match = pattern.exec(result)) !== null) {
    const start = match.index;
    const opener = match[1];
    const close = opener === "{" ? "}" : "]";
    const openIndex = match.index + match[0].length - 1;
    const end = findMatchingEnd(result, openIndex, opener, close);
    if (end === -1) continue;
    let removeEnd = end + 1;
    if (result[removeEnd] === ",") removeEnd++;
    let blockStart = start;
    while (blockStart > 0 && result[blockStart - 1] !== "\n") blockStart--;
    removals.push([blockStart, removeEnd]);
  }

  for (const [start, end] of removals.sort((a, b) => b[0] - a[0])) {
    result = result.slice(0, start) + result.slice(end);
  }

  return result;
}

function unwrapAllViBlocks(source) {
  let result = source;
  let changed = true;

  while (changed) {
    changed = false;
    const pattern = /\bvi:\s*(\{|\[)/g; // eslint-disable-line no-useless-escape
    let match;

    while ((match = pattern.exec(result)) !== null) {
      const viKeyStart = match.index;
      const opener = match[1];
      const close = opener === "{" ? "}" : "]";
      const openIndex = match.index + match[0].length - 1;
      const end = findMatchingEnd(result, openIndex, opener, close);
      if (end === -1) continue;

      const before = result.slice(0, viKeyStart);
      const parentKey = before.match(/(\w+):\s*(\{|\[)\s*$/);
      const assignMatch = before.match(/=\s*(\{|\[)\s*$/);

      if (!parentKey && !assignMatch) continue;

      const inner = result.slice(openIndex, end + 1);
      let removeEnd = end + 1;
      if (result[removeEnd] === ",") removeEnd++;

      if (parentKey) {
        const keyStart = viKeyStart - parentKey[0].length;
        result = result.slice(0, keyStart) + `${parentKey[1]}: ${inner}` + result.slice(removeEnd);
      } else {
        const eqIndex = before.lastIndexOf("=");
        result = result.slice(0, eqIndex + 1) + ` ${inner}` + result.slice(removeEnd);
      }

      changed = true;
      break;
    }
  }

  return result;
}

function transformFile(relPath) {
  const filePath = path.join(root, relPath);
  let source = fs.readFileSync(filePath, "utf8");

  source = source.replace(/import type \{ Locale \} from "@\/i18n\/config";\n?/g, "");
  source = source.replace(
    /import type \{\s*Localized,([^}]+)\} from "@\/content\/types";/g,
    'import type {$1} from "@/content/types";',
  );
  source = source.replace(/import type \{ Localized, StatItem \}/, "import type { StatItem }");
  source = source.replace(/Localized<([^>]+)>/g, "$1");
  source = source.replace(/Record<Locale,\s*([^>]+)>/g, "$1");

  let prev;
  do {
    prev = source;
    source = removePropertyBlocks(source, "en");
  } while (source !== prev);

  do {
    prev = source;
    source = unwrapAllViBlocks(source);
  } while (source !== prev);
  source = source.replace(/\n\s*\}\n\n\s*\},/g, "\n    },");
  source = source.replace(/\n\s*\}\n\n\s*\}/g, "\n  }");

  source = source.replace(
    /export function getStaticPageMeta\(page: StaticPageKey, locale: Locale\): PageMeta \{\s*return pages\[page\]\.meta\[locale\];\s*\}/,
    "export function getStaticPageMeta(page: StaticPageKey): PageMeta {\n  return pages[page].meta;\n}",
  );
  source = source.replace(
    /export function getStaticPageHero\(page: StaticPageKey, locale: Locale\): PageHero \{\s*return pages\[page\]\.hero\[locale\];\s*\}/,
    "export function getStaticPageHero(page: StaticPageKey): PageHero {\n  return pages[page].hero;\n}",
  );
  source = source.replace(
    /export function getUiLabel\(locale: Locale, key: string\): string \{\s*return uiLabels\[locale\]\[key\] \?\? key;\s*\}/,
    "export function getUiLabel(key: string): string {\n  return uiLabels[key] ?? key;\n}",
  );
  source = source.replace(
    /export function getDataPageMeta\(page: DataPageKey, locale: Locale\): PageMeta \{\s*return pages\[page\]\.meta\[locale\];\s*\}/,
    "export function getDataPageMeta(page: DataPageKey): PageMeta {\n  return pages[page].meta;\n}",
  );
  source = source.replace(
    /export function getDataPageHero\(page: DataPageKey, locale: Locale\): PageHero \{\s*return pages\[page\]\.hero\[locale\];\s*\}/,
    "export function getDataPageHero(page: DataPageKey): PageHero {\n  return pages[page].hero;\n}",
  );
  source = source.replace(
    /export function getDataUiLabel\(locale: Locale, key: string, vars\?: Record<string, string>\): string \{\s*let text = dataUiLabels\[locale\]\[key\] \?\? key;/,
    "export function getDataUiLabel(key: string, vars?: Record<string, string>): string {\n  let text = dataUiLabels[key] ?? key;",
  );

  fs.writeFileSync(filePath, source);
  console.log("flattened", relPath);
}

for (const file of files) {
  transformFile(file);
}
