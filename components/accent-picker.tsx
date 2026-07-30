"use client";

import { useState, useRef, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const themes = [
  { name: "Cyan", hue: "190", swatch: "bg-cyan-400" },
  { name: "Emerald", hue: "160", swatch: "bg-emerald-400" },
  { name: "Rose", hue: "350", swatch: "bg-rose-400" },
  { name: "Amber", hue: "38", swatch: "bg-amber-400" },
  { name: "Indigo", hue: "230", swatch: "bg-indigo-400" },
];

export function AccentPicker() {
  const [open, setOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("Cyan");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function applyTheme(theme: (typeof themes)[0]) {
    setActiveTheme(theme.name);
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");

    const primary = isDark
      ? `${theme.hue} 85% 52%`
      : `${theme.hue} 85% 42%`;
    const accent = `${theme.hue} 75% ${isDark ? "52" : "48"}%`;
    const ring = `${theme.hue} 85% ${isDark ? "52" : "42"}%`;

    root.style.setProperty("--primary", primary);
    root.style.setProperty("--accent", accent);
    root.style.setProperty("--ring", ring);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative shrink-0">
      
      <div
        className={cn(
          "absolute bottom-full right-0 mb-3 transition-all duration-400 origin-bottom-right",
          open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-3 pointer-events-none"
        )}
      >
        <div className="glass-strong rounded-3xl p-3 min-w-[180px] glass-shimmer">
          <p className="text-[11px] font-semibold text-muted-foreground mb-2.5 px-2 uppercase tracking-widest">
            Accent Color
          </p>
          <div className="flex flex-col gap-0.5">
            {themes.map((theme, i) => {
              const isSelected = activeTheme === theme.name;
              return (
                <button
                  key={theme.name}
                  onClick={() => applyTheme(theme)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-300 text-foreground group",
                    isSelected ? "glass" : "hover:bg-foreground/5"
                  )}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <span
                    className={cn(
                      "w-5 h-5 rounded-full ring-2 ring-offset-1 ring-offset-transparent transition-all duration-300 flex items-center justify-center",
                      theme.swatch,
                      isSelected
                        ? "ring-foreground/30 scale-110"
                        : "ring-transparent group-hover:scale-105"
                    )}
                  >
                    {isSelected && (
                      <Check className="w-3 h-3 text-white drop-shadow-sm" />
                    )}
                  </span>
                  <span className="text-sm font-medium">{theme.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "glass-strong rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-500 text-foreground glass-shimmer",
          open && "scale-110 ring-2 ring-primary/30"
        )}
        aria-label="Change accent color"
      >
        <Palette
          className={cn(
            "w-5 h-5 transition-transform duration-500",
            open && "rotate-[30deg]"
          )}
        />
      </button>
    </div>
  );
}
