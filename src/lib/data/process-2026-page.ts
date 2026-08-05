import { process2026PageContent } from "@/content/process-2026-content";
import { siteImage } from "@/lib/images";

export type Process2026Step = {
  number: string;
  title: string;
  timing: string;
  summary: string;
  bullets: string[];
  link?: { href: string; label: string };
};

export type Process2026PaymentScenario = {
  label: string;
  tag: string | null;
  detail: string;
};

export type Process2026CostTier = {
  label: string;
  amount: string;
  breakdown: string;
};

export type Process2026TimelineItem = {
  when: string;
  what: string;
};

export type Process2026Note = {
  text: string;
  bullets?: string[];
  afterBullets?: string;
  examples?: string[];
  footnote?: string;
};

export type Process2026NoteGroup = {
  title: string;
  shortLabel: string;
  notes: Process2026Note[];
};

export type Process2026PageMedia = {
  heroImage: string;
  qrImage: string;
};

export type Process2026PageLinks = {
  messenger: string;
  group: string;
};

export type Process2026PageFinance = {
  eyebrow: string;
  title: string;
  bodyBefore: string;
  reportLinkLabel: string;
  reportLinkUrl: string;
  bodyAfter: string;
  footnoteBefore: string;
  schoolBuildLinkLabel: string;
  footnoteAfter: string;
};

export type Process2026PageContent = {
  meta: { title: string; description: string };
  media: Process2026PageMedia;
  links: Process2026PageLinks;
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    description: string;
    messengerCta: string;
    groupCta: string;
  };
  stepsIntro: { eyebrow: string; title: string; description: string };
  steps: Process2026Step[];
  costIntro: { eyebrow: string; title: string; description: string };
  costTiers: Process2026CostTier[];
  transfer: {
    eyebrow: string;
    title: string;
    intro: string;
    transferReminder: string;
    codeExpiryNote: string;
    warning: string;
    transferFormat: string;
    transferExample: string;
    accountNumber: string;
    bank: string;
    accountName: string;
    phone: string;
    phoneDisplay: string;
    phoneContactName: string;
    scenariosTitle: string;
    scenariosFootnote: string;
    qrCaption: string;
    qrCta: string;
  };
  paymentScenarios: Process2026PaymentScenario[];
  timelineIntro: { eyebrow: string; title: string };
  timeline: Process2026TimelineItem[];
  notesIntro: { eyebrow: string; title: string };
  sharedNotes: Process2026Note[];
  noteGroups: Process2026NoteGroup[];
  importantNotes: string[];
  codeMeaningLabel: string;
  codeMeaningUrl: string;
  finance: Process2026PageFinance;
  schoolBuildUrl: string;
  cta: {
    title: string;
    description: string;
    messengerCta: string;
    contactLinkLabel: string;
    referenceLabel: string;
    referenceLinkLabel: string;
    referenceUrl: string;
  };
};

export function resolveProcess2026ImageSrc(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return siteImage(path);
}

export async function getProcess2026PageContent(): Promise<Process2026PageContent> {
  return process2026PageContent as unknown as Process2026PageContent;
}

export function getProcess2026PageFallback(): Process2026PageContent {
  return process2026PageContent as unknown as Process2026PageContent;
}
