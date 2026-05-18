import type { ValueCard } from "@/content/types";

type ValueCardsProps = {
  heading: string;
  items: ValueCard[];
  footer?: string;
};

export function ValueCards({ heading, items, footer }: ValueCardsProps) {
  return (
    <section className="py-10">
      <h2 className="mb-8 text-center font-heading text-2xl font-bold text-brand-blue">{heading}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="brand-card p-6">
            <h3 className="font-heading text-lg font-bold text-brand-accent">{item.title}</h3>
            <p className="mt-3 text-gray-600">{item.description}</p>
          </article>
        ))}
      </div>
      {footer ? (
        <p className="mx-auto mt-10 max-w-3xl text-center text-lg text-gray-600">{footer}</p>
      ) : null}
    </section>
  );
}
