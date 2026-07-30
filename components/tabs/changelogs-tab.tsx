"use client";

import { GlassCard } from "@/components/glass-card";
import { Construction, CalendarClock } from "lucide-react";

export function ChangelogsTab() {
  return (
    <div className="flex flex-col items-center gap-10 max-w-2xl mx-auto w-full">
      <div className="text-center animate-scale-in">
        <div className="glass-strong rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-5 glow-cyan glass-shimmer">
          <Construction className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Changelogs
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Track every Proton Hub update
        </p>
      </div>

      <div className="animate-rise delay-1 w-full">
        <GlassCard variant="strong" shimmer size="large" className="w-full text-center">
          <div className="flex flex-col items-center gap-6 py-6">
            <div className="glass-strong rounded-full w-20 h-20 flex items-center justify-center glow-amber float">
              <Construction className="w-10 h-10 text-amber-400" />
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight text-balance">
              Page Is Currently Being Worked On!
            </h3>

            <div className="glass-inner rounded-2xl px-6 py-5 flex items-center gap-4 max-w-md">
              <CalendarClock className="w-6 h-6 text-primary shrink-0" />
              <p className="text-base text-foreground font-semibold text-left text-pretty">
                Please try to see this page again on{" "}
                <span className="text-primary font-bold">September 1st</span>
              </p>
            </div>

            <p className="text-sm text-muted-foreground tracking-wide">
              Please and thank you — and do good.
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
