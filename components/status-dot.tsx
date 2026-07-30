"use client";

import { cn } from "@/lib/utils";

type DotColor = "green" | "yellow" | "red" | "blue";

const colorMap: Record<DotColor, { bg: string; glow: string; ring: string }> = {
  green: {
    bg: "bg-emerald-400",
    glow: "glow-green",
    ring: "ring-emerald-400/30",
  },
  yellow: {
    bg: "bg-yellow-400",
    glow: "shadow-[0_0_10px_4px_rgba(250,204,21,0.5)]",
    ring: "ring-yellow-400/30",
  },
  red: {
    bg: "bg-red-500",
    glow: "shadow-[0_0_10px_4px_rgba(239,68,68,0.5)]",
    ring: "ring-red-500/30",
  },
  blue: {
    bg: "bg-blue-400",
    glow: "glow-blue",
    ring: "ring-blue-400/30",
  },
};

interface StatusDotProps {
  color: DotColor;
  glitch?: boolean;
  size?: "sm" | "md" | "lg";
}

export function StatusDot({
  color,
  glitch = false,
  size = "md",
}: StatusDotProps) {
  const sizeClass =
    size === "sm" ? "w-2 h-2" : size === "lg" ? "w-4 h-4" : "w-3 h-3";
  return (
    <span className="relative inline-flex items-center justify-center">
      
      <span
        className={cn(
          "absolute rounded-full ring-2",
          sizeClass,
          colorMap[color].ring,
          "animate-ping opacity-40"
        )}
        style={{ animationDuration: "2.5s" }}
      />
      
      <span
        className={cn(
          "inline-block rounded-full relative",
          sizeClass,
          colorMap[color].bg,
          colorMap[color].glow,
          glitch && "glitch-dot"
        )}
      />
    </span>
  );
}
