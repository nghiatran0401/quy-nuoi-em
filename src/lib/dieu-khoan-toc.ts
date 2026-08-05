/** Shared heading IDs for Điều khoản TOC + ArticleContent anchors. */

export type TocItem = {
  id: string;
  label: string;
};

export function slugifyHeading(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueHeadingId(base: string, usedCounts: Map<string, number>): string {
  const count = usedCounts.get(base) ?? 0;
  usedCounts.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

/** Extract `##` headings from markdown body for table of contents. */
export function extractMarkdownH2Toc(content: string): TocItem[] {
  const usedCounts = new Map<string, number>();
  const items: TocItem[] = [];

  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();
    if (!line.startsWith("## ")) continue;

    const label = line.slice(3).trim();
    if (!label) continue;

    const base = slugifyHeading(label) || "muc";
    items.push({ id: uniqueHeadingId(base, usedCounts), label });
  }

  return items;
}

/** Assign the same unique IDs ArticleContent will use for `##` headings. */
export function createHeadingIdAssigner(): (label: string) => string {
  const usedCounts = new Map<string, number>();
  return (label: string) => {
    const base = slugifyHeading(label) || "muc";
    return uniqueHeadingId(base, usedCounts);
  };
}
