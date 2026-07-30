"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface GlassAccordionItem {
  title: string;
  content: React.ReactNode;
}

interface GlassAccordionProps {
  items: GlassAccordionItem[];
  className?: string;
}

export function GlassAccordion({ items, className }: GlassAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={cn(
              "glass rounded-3xl overflow-hidden transition-all duration-500 glass-shimmer",
              isOpen && "glass-strong ring-1 ring-primary/10"
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-7 py-5 text-left text-foreground hover:bg-foreground/[0.03] transition-colors duration-300 group"
            >
              <span className="font-semibold text-base">{item.title}</span>
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center glass-inner transition-all duration-500",
                  isOpen && "bg-primary/10 rotate-180"
                )}
              >
                <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-500" />
              </div>
            </button>
            <div
              className={cn(
                "grid transition-all duration-500 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-7 pb-6 text-base text-muted-foreground leading-relaxed">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
