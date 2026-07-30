"use client";

import { cn } from "@/lib/utils";
import { Home, ScrollText, Users, HelpCircle, Search, FileClock } from "lucide-react";

export type TabId = "home" | "scripts" | "script-search" | "credits" | "faq" | "changelogs";

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "scripts", label: "Scripts", icon: ScrollText },
  { id: "script-search", label: "Search", icon: Search },
  { id: "changelogs", label: "Changelogs", icon: FileClock },
  { id: "credits", label: "Credits", icon: Users },
  { id: "faq", label: "FAQ", icon: HelpCircle },
];

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="glass-strong rounded-[28px] overflow-hidden glass-shimmer max-w-full">
      <nav
        className="flex items-center gap-1 px-2 py-2 overflow-x-auto scrollbar-hide"
        role="tablist"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2.5 rounded-[22px] transition-all duration-400 text-sm font-medium whitespace-nowrap shrink-0",
                isActive
                  ? "bg-primary text-primary-foreground shadow-[0_4px_20px_hsl(var(--primary)/0.35)] pill-pop"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5 active:scale-95"
              )}
            >
              <Icon className={cn("w-[18px] h-[18px]", isActive && "drop-shadow-sm")} />
              <span
                className={cn(
                  "transition-all duration-400 overflow-hidden whitespace-nowrap",
                  isActive
                    ? "max-w-[80px] opacity-100"
                    : "max-w-0 opacity-0"
                )}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
