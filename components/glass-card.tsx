"use client";

import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "strong" | "subtle" | "inner";
  shimmer?: boolean;
  hover?: boolean;
  size?: "default" | "large";
}

export function GlassCard({
  children,
  className,
  variant = "default",
  shimmer = false,
  hover = false,
  size = "default",
}: GlassCardProps) {
  const variantClass =
    variant === "strong"
      ? "glass-strong"
      : variant === "subtle"
        ? "glass-subtle"
        : variant === "inner"
          ? "glass-inner"
          : "glass";

  return (
    <div
      className={cn(
        variantClass,
        "rounded-3xl transition-all duration-500",
        size === "large" ? "p-8" : "p-6",
        shimmer && "glass-shimmer",
        hover &&
          "hover:scale-[1.02] hover:shadow-lg active:scale-[0.99] cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
