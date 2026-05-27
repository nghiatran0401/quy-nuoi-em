import { brandVisual } from "@/config/brand-visual";
import { importantNotes, processSteps2026 } from "@/content/quy-trinh-cap-ma-2026";
import { nuoiEmImage } from "@/lib/nuoiem-images";

export type HomeProcessCard = {
  number: string;
  title: string;
  summary: string;
  image: string;
  ctaLabel: string;
  href: string;
  external?: boolean;
};

export const homeProcessOverview = {
  eyebrow: "Cảm ơn anh chị đã đồng hành cùng dự án NUÔI EM",
  title: "QUY TRÌNH 6 BƯỚC",
  subtitle: "Mỗi mã nuôi em tiếp tục qua 6 bước: làm theo hướng dẫn",
  guideImage: nuoiEmImage("processGuide"),
  cards: processSteps2026.map((step) => ({
    number: step.number,
    title: step.title,
    summary: step.summary,
    // Aliases are processStep1..6 (no leading zero in key names).
    image: nuoiEmImage(`processStep${Number(step.number)}` as const),
    ctaLabel:
      step.number === "01"
        ? "Nhận mã"
        : step.number === "03"
          ? "Tham gia group"
          : step.number === "06"
            ? "Xem lịch thăm em"
            : "Tìm hiểu",
    href:
      step.number === "01"
        ? brandVisual.social.messenger
        : step.number === "03"
          ? brandVisual.social.group
          : step.number === "06"
            ? "/quy-trinh-cap-ma-2026"
            : "/quy-trinh-cap-ma-2026",
    external: step.number === "01" || step.number === "03",
  })) as HomeProcessCard[],
  notesTitle: "Lưu ý quan trọng",
  notes: [...importantNotes],
} as const;
