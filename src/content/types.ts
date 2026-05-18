import type { Locale } from "@/i18n/config";

export type Localized<T> = Record<Locale, T>;

export type PageMeta = {
  title: string;
  description: string;
};

export type PageHero = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export type StatItem = {
  value: string;
  label: string;
  hint?: string;
};

export type TimelineEvent = {
  date: string;
  title: string;
  description?: string;
};

export type ValueCard = {
  title: string;
  description: string;
};

export type ProcessStep = {
  round: string;
  title: string;
  description: string;
  subTitle?: string;
};

export type ScoringCategory = {
  icon: string;
  title: string;
  items: { label: string; points: string; priority: string }[];
};

export type OrgMember = {
  name: string;
  role: string;
  company: string;
};

export type OrgDepartment = {
  id: string;
  title: string;
  description: string;
  members: OrgMember[];
};
