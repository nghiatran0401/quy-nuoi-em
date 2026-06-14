export type TocSectionPosition = {
  id: string;
  top: number;
};

export function resolveActiveTocSection(
  sections: TocSectionPosition[],
  offset: number,
  options?: { nearPageBottom?: boolean },
): string {
  if (sections.length === 0) return "";

  if (options?.nearPageBottom) {
    return sections[sections.length - 1].id;
  }

  const activationLine = offset + 4;

  for (let index = sections.length - 1; index >= 0; index -= 1) {
    const current = sections[index];
    const next = sections[index + 1];

    if (current.top <= activationLine && (!next || next.top > activationLine)) {
      return current.id;
    }
  }

  return sections[0].id;
}

export function getTocScrollOffset(): number {
  if (typeof document === "undefined") return 128;

  const header = document.querySelector(".site-header-shell");
  if (header instanceof HTMLElement) {
    return Math.ceil(header.getBoundingClientRect().height) + 8;
  }

  return 128;
}

export function readTocSectionPositions(items: readonly { id: string }[]): TocSectionPosition[] {
  return items.flatMap((item) => {
    const element = document.getElementById(item.id);
    if (!element) return [];
    return [{ id: item.id, top: element.getBoundingClientRect().top }];
  });
}

export function getActiveTocSectionId(
  items: readonly { id: string }[],
  offset = getTocScrollOffset(),
): string {
  const positions = readTocSectionPositions(items);
  if (positions.length === 0) return items[0]?.id ?? "";

  const nearPageBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 48;

  return resolveActiveTocSection(positions, offset, { nearPageBottom });
}

export function readValidTocHash(items: readonly { id: string }[]): string | null {
  if (typeof window === "undefined") return null;

  const hashId = window.location.hash.replace(/^#/, "");
  if (!hashId) return null;
  return items.some((item) => item.id === hashId) ? hashId : null;
}

export function replaceTocHash(id: string) {
  const nextHash = `#${id}`;
  if (window.location.hash === nextHash) return;

  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${window.location.search}${nextHash}`,
  );
}

function getScrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

export function scrollToTocSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return false;

  element.scrollIntoView({
    behavior: getScrollBehavior(),
    block: "start",
  });
  return true;
}

export function isTocSectionAligned(id: string, tolerancePx = 24): boolean {
  const element = document.getElementById(id);
  if (!element) return false;

  const top = element.getBoundingClientRect().top;
  return Math.abs(top - getTocScrollOffset()) <= tolerancePx;
}

export function waitForScrollEnd(timeoutMs = 1000): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    let settled = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      window.removeEventListener("scrollend", finish);
      window.clearTimeout(fallbackId);
      resolve();
    };

    window.addEventListener("scrollend", finish, { once: true });
    const fallbackId = window.setTimeout(finish, timeoutMs);
  });
}
