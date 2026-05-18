import type { TimelineEvent } from "@/content/types";

type TimelineProps = {
  events: TimelineEvent[];
};

export function Timeline({ events }: TimelineProps) {
  return (
    <ol className="relative mx-auto max-w-3xl space-y-8 border-l-2 border-brand-green/40 pl-8">
      {events.map((event) => (
        <li key={`${event.date}-${event.title}`} className="relative">
          <span className="absolute -left-[2.35rem] top-1 flex h-4 w-4 rounded-full border-4 border-white bg-brand-green" />
          <p className="text-sm font-bold uppercase tracking-wide text-brand-green">{event.date}</p>
          <h3 className="mt-1 font-heading text-xl font-bold text-brand-blue">{event.title}</h3>
          {event.description ? <p className="mt-2 text-gray-600">{event.description}</p> : null}
        </li>
      ))}
    </ol>
  );
}
