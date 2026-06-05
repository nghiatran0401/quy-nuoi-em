import Image from "next/image";
import { brandVisual } from "@/config/brand-visual";

type BrandLogoProps = {
  /** default = icon mark; wide = horizontal lockup; onDark = same transparent mark */
  variant?: "default" | "onDark" | "wide";
  className?: string;
  priority?: boolean;
};

const logoDimensions = {
  default: { width: 200, height: 202 },
  onDark: { width: 200, height: 202 },
  wide: { width: 378, height: 135 },
} as const;

function resolveVariant(variant: BrandLogoProps["variant"]) {
  if (variant === "wide") return "wide" as const;
  return "default" as const;
}

export function BrandLogo({
  variant = "default",
  className = "h-11 w-auto object-contain",
  priority = false,
}: BrandLogoProps) {
  const resolved = resolveVariant(variant);
  const src =
    resolved === "wide" ? brandVisual.logo.wide : brandVisual.logo.default;
  const { width, height } = logoDimensions[resolved];

  return (
    <span className="logo-wrap inline-flex items-center" data-logo-variant={resolved}>
      <Image
        src={src}
        alt={brandVisual.name}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes={resolved === "wide" ? "(max-width: 768px) 200px, 280px" : "(max-width: 768px) 120px, 160px"}
      />
    </span>
  );
}
