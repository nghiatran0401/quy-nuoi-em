import orgData from "@/content/shared/org-structure.json";
import type { OrgDepartment } from "@/content/types";

type OrgStructureProps = {
  chartTitle: string;
};

const { orgChart, departments } = orgData as {
  orgChart: { id: string; title: string; subtitle: string }[];
  departments: OrgDepartment[];
};

export function OrgStructure({ chartTitle }: OrgStructureProps) {
  return (
    <section>
      <h2 className="heading-section mb-8 text-center">{chartTitle}</h2>
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {orgChart.map((node) => (
          <a
            key={node.id}
            href={`#${node.id}`}
            className="brand-card min-w-[140px] px-4 py-3 text-center transition hover:border-brand-accent/30"
          >
            <p className="font-semibold text-brand-ink">{node.title}</p>
            <p className="mt-1 text-xs text-brand-muted">{node.subtitle}</p>
          </a>
        ))}
      </div>
      <div className="space-y-12">
        {departments.map((dept) => (
          <section key={dept.id} id={dept.id} className="scroll-mt-24">
            <h3 className="font-heading text-xl font-bold text-brand-ink">{dept.title}</h3>
            <p className="mt-2 max-w-3xl text-brand-muted">{dept.description}</p>
            <p className="mt-2 text-sm text-brand-accent">
              Vinh danh {dept.members.length} thành viên
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {dept.members.map((member) => (
                <li key={`${dept.id}-${member.name}`} className="brand-card p-4">
                  <p className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent/10 font-bold text-brand-ink">
                    {member.name.charAt(0)}
                  </p>
                  <h4 className="mt-3 font-semibold text-brand-ink">{member.name}</h4>
                  <p className="mt-1 text-sm text-brand-accent">{member.role}</p>
                  <p className="mt-1 text-sm text-brand-muted">{member.company}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
