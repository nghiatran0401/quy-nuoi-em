import Link from "next/link";

type FinanceCtaProps = {
  title: string;
  description: string;
  donateLabel: string;
  contactLabel: string;
};

export function FinanceCta({ title, description, donateLabel, contactLabel }: FinanceCtaProps) {
  return (
    <section
      aria-labelledby="finance-cta-heading"
      className="rounded-2xl border border-brand-border/60 bg-brand-surface px-5 py-6 sm:px-8 sm:py-8"
    >
      <h2 id="finance-cta-heading" className="font-heading text-lg font-bold text-brand-ink sm:text-xl">
        {title}
      </h2>
      <p className="text-body mt-2 max-w-2xl text-sm sm:text-base">{description}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link href="/lien-he" className="btn-primary-sm sm:min-w-[10rem]">
          {contactLabel}
        </Link>
        <Link href="/dong-gop" className="text-sm font-semibold text-brand-muted transition hover:text-brand-accent">
          {donateLabel}
        </Link>
      </div>
    </section>
  );
}
