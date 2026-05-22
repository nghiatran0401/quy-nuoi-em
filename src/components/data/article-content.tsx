import { sanitizeBrandText } from "@/lib/brand-sanitize";

type ArticleContentProps = {
  content: string;
  /** When the page already renders an <h1>, skip the first markdown H1. */
  skipTopHeading?: boolean;
};

export function ArticleContent({ content, skipTopHeading = false }: ArticleContentProps) {
  const lines = sanitizeBrandText(content)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("[←"));

  let skippedTopHeading = false;

  return (
    <article className="mt-6 max-w-none">
      {lines.map((line, index) => {
        if (line.startsWith("# ")) {
          if (skipTopHeading && !skippedTopHeading) {
            skippedTopHeading = true;
            return null;
          }
          return (
            <h2 key={index} className="heading-display mb-6 text-2xl font-bold">
              {line.slice(2)}
            </h2>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2 key={index} className="mb-4 mt-8 font-heading text-xl font-bold text-brand-ink">
              {line.slice(3)}
            </h2>
          );
        }
        if (line.startsWith("- ")) {
          return (
            <li key={index} className="ml-4 list-disc text-brand-muted">
              {line.slice(2)}
            </li>
          );
        }
        if (line.startsWith("![")) return null;
        if (line.startsWith("[")) return null;
        return (
          <p key={index} className="mb-4 leading-relaxed text-brand-muted">
            {line}
          </p>
        );
      })}
    </article>
  );
}
