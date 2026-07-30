"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function DarkModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className="glass-strong rounded-full w-12 h-12 flex items-center justify-center shrink-0"
        aria-label="Toggle dark mode"
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="glass-strong rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-500 text-foreground shrink-0 glass-shimmer group"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`w-5 h-5 absolute inset-0 transition-all duration-500 ${
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 rotate-90 scale-50"
          }`}
        />
        <Moon
          className={`w-5 h-5 absolute inset-0 transition-all duration-500 ${
            isDark
              ? "opacity-0 -rotate-90 scale-50"
              : "opacity-100 rotate-0 scale-100"
          }`}
        />
      </div>
    </button>
  );
}
