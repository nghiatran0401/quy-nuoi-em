import type { ProcessStep } from "@/content/types";

type ProcessStepsProps = {
  steps: ProcessStep[];
};

export function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <ol className="mx-auto max-w-4xl space-y-6 px-4">
      {steps.map((step, index) => (
        <li key={step.round} className="brand-card flex gap-6 p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-blue font-heading text-lg font-bold text-white">
            {index + 1}
          </div>
          <div>
            <p className="text-sm font-bold uppercase text-brand-green">{step.round}</p>
            <h3 className="mt-1 font-heading text-xl font-bold text-brand-blue">{step.title}</h3>
            {step.subTitle ? (
              <p className="mt-1 text-sm font-semibold text-gray-500">{step.subTitle}</p>
            ) : null}
            <p className="mt-3 text-gray-600">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
