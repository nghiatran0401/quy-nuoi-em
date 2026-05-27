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
