import {
  Building2,
  ClipboardList,
  FileCheck,
  Handshake,
  Inbox,
  Phone,
  PiggyBank,
  Users,
} from "lucide-react";
import { FinanceSectionHeader } from "@/components/finance/finance-section-header";
import type { TransparencyPillarGroup } from "@/content/tai-chinh-content";

const pillarIcons = {
  phone: Phone,
  "one-ne": Handshake,
  oversight: Users,
  visits: Building2,
  inbox: Inbox,
  statements: ClipboardList,
  "single-account": FileCheck,
  "payment-docs": FileCheck,
} as const;

type TransparencyPillarsProps = {
  eyebrow: string;
  title: string;
  description: string;
  groups: readonly TransparencyPillarGroup[];
  savingsNote: {
    title: string;
    description: string;
  };
};

function PillarGroupBlock({ group }: { group: TransparencyPillarGroup }) {
  return (
    <article className="rounded-2xl border border-brand-border/60 bg-white/70 p-4 sm:p-6">
      <header className="mb-5 border-b border-brand-border/50 pb-4">
        <p className="eyebrow">{group.eyebrow}</p>
        <h3 className="mt-1 font-heading text-lg font-bold text-brand-ink sm:text-xl">{group.title}</h3>
      </header>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {group.pillars.map((pillar) => {
          const Icon = pillarIcons[pillar.id as keyof typeof pillarIcons] ?? FileCheck;
          const isLong = pillar.description.length > 180;

          return (
            <li
              key={pillar.id}
              className={`rounded-xl border border-brand-border/50 bg-brand-warm/60 p-4 ${isLong ? "md:col-span-2" : ""}`}
            >
              <div className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h4 className="font-heading text-sm font-bold leading-snug text-brand-ink sm:text-base">
                    {pillar.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">{pillar.description}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export function TransparencyPillars({
  eyebrow,
  title,
  description,
  groups,
  savingsNote,
}: TransparencyPillarsProps) {
  return (
    <section id="cach-minh-bach" aria-labelledby="transparency-pillars-heading" className="scroll-mt-32">
      <FinanceSectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        headingId="transparency-pillars-heading"
      />

      <div className="space-y-5">
        {groups.map((group) => (
          <PillarGroupBlock key={group.id} group={group} />
        ))}
      </div>

      <aside className="mt-5 flex gap-3 rounded-2xl border border-brand-border/60 bg-brand-highlight-soft/60 p-4 sm:p-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
          <PiggyBank className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <h3 className="font-heading text-sm font-bold text-brand-ink sm:text-base">{savingsNote.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-brand-muted">{savingsNote.description}</p>
        </div>
      </aside>
    </section>
  );
}
