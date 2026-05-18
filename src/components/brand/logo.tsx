import Image from "next/image";
import { brandVisual } from "@/config/brand-visual";

type BrandLogoProps = {
  variant?: "default" | "onDark" | "wide";
  className?: string;
  priority?: boolean;
};

const logoDimensions = {
  default: { width: 200, height: 202 },
  onDark: { width: 200, height: 202 },
  wide: { width: 378, height: 135 },
} as const;

export function BrandLogo({
  variant = "default",
  className = "h-11 w-auto object-contain",
  priority = false,
}: BrandLogoProps) {
  const src =
    variant === "wide"
      ? brandVisual.logo.wide
      : variant === "onDark"
        ? brandVisual.logo.onDark
        : brandVisual.logo.default;
  const { width, height } = logoDimensions[variant === "wide" ? "wide" : variant === "onDark" ? "onDark" : "default"];

  return (
    <Image
      src={src}
      alt={brandVisual.name}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
