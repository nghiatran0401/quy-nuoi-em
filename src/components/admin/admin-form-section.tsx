import type { ReactNode } from "react";

type AdminFormSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function AdminFormSection({ title, description, children }: AdminFormSectionProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {description ? <p className="mt-1 text-xs leading-relaxed text-slate-600">{description}</p> : null}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
