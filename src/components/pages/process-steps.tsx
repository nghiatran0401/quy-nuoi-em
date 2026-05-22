import Image from "next/image";
import type { ProcessStep } from "@/content/types";
import { nuoiEmImage } from "@/lib/nuoiem-images";

const stepIllustrations = [
  nuoiEmImage("processStep1"),
  nuoiEmImage("processStep2"),
  nuoiEmImage("processStep3"),
  nuoiEmImage("processStep4"),
  nuoiEmImage("processStep5"),
  nuoiEmImage("processStep6"),
] as const;

type ProcessStepsProps = {
  steps: ProcessStep[];
};

export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <ol className="space-y-6">
      {steps.map((step, index) => (
        <li key={step.round} className="brand-card flex gap-6 p-6">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-brand-warm">
            <Image
              src={stepIllustrations[index] ?? stepIllustrations[0]}
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
