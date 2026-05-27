import Image from "next/image";
import type { ProcessStep } from "@/content/types";
type ProcessStepsProps = {
  steps: ProcessStep[];
  stepImageUrls: string[];
};

export function ProcessSteps({ steps, stepImageUrls }: ProcessStepsProps) {
  return (
    <ol className="space-y-6">
      {steps.map((step, index) => (
        <li key={step.round} className="brand-card flex gap-6 p-6">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-brand-warm">
            <Image
              src={stepImageUrls[index] ?? stepImageUrls[0] ?? ""}
              alt=""
              fill
              className="object-contain p-1"
            />
          </div>
          <div>
            <p className="text-sm font-bold uppercase text-brand-accent">{step.round}</p>
            <h3 className="mt-1 font-heading text-xl font-bold text-brand-ink">{step.title}</h3>
            {step.subTitle ? (
              <p className="mt-1 text-sm font-semibold text-brand-muted">{step.subTitle}</p>
            ) : null}
            <p className="mt-3 text-brand-muted">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
