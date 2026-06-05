type FinanceSectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  headingId: string;
};

export function FinanceSectionHeader({
  eyebrow,
  title,
  description,
  headingId,
}: FinanceSectionHeaderProps) {
  return (
    <header className="mb-6 max-w-2xl sm:mb-8">
      <p className="eyebrow mb-2">{eyebrow}</p>
      <h2 id={headingId} className="font-heading text-xl font-bold text-brand-ink sm:text-2xl md:text-[1.75rem]">
        {title}
      </h2>
      {description ? <p className="text-body mt-3 text-sm sm:text-base">{description}</p> : null}
    </header>
  );
}
