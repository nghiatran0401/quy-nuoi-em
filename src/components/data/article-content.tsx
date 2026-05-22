type ArticleContentProps = {
  content: string;
};

export function ArticleContent({ content }: ArticleContentProps) {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("[←"));

  return (
    <article className="prose prose-gray mt-6 max-w-none">
      {lines.map((line, index) => {
        if (line.startsWith("# ")) {
          return (
            <h1 key={index} className="mb-6 heading-display text-3xl font-bold">
              {line.slice(2)}
            </h1>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2 key={index} className="mb-4 mt-8 font-heading text-xl font-bold text-brand-blue">
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
