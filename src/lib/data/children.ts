import childrenJson from "@/data/children.json";
import type { Child, ChildrenSummary } from "@/lib/data/types";

const children = childrenJson as Child[];

export const childrenSummary: ChildrenSummary = {
  total: 387,
  active: 225,
  completed: 127,
  terminated: 35,
  paused: 0,
};

export function getAllChildren(): Child[] {
  return children;
}

export function getChildByCode(code: string): Child | undefined {
  const normalized = code.toUpperCase();
  return children.find((child) => child.code.toUpperCase() === normalized);
}

export function getProvinces(): string[] {
  return [...new Set(children.map((child) => child.province))].sort((a, b) =>
    a.localeCompare(b, "vi"),
  );
}

export function getStatuses(): Child["status"][] {
  return [...new Set(children.map((child) => child.status))];
}
