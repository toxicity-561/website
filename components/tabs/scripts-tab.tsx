"use client";

import { StatusDot } from "@/components/status-dot";
import { GlassCard } from "@/components/glass-card";
import { GlassAccordion } from "@/components/glass-accordion";
import { CodeBox } from "@/components/code-box";
import { ScrollText, KeyRound, Link } from "lucide-react";

const MUSCLE_LEGENDS_LOADSTRING = `loadstring(game:HttpGet("https://raw.githubusercontent.com/toxicity-561/Proton-Hub/refs/heads/main/Muscle-Legends.luau"))()`;

const GROW_A_GARDEN_LOADSTRING = `-- script is not protected or out YET!`;

export function ScriptsTab() {
  return (
    <div className="flex flex-col items-center gap-10 max-w-2xl mx-auto w-full">
      <div className="text-center animate-scale-in">
        <div className="glass-strong rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-5 glow-cyan glass-shimmer">
          <ScrollText className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Scripts
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Available game scripts and their current status
        </p>
      </div>

      <div className="animate-rise delay-1 w-full">
        <GlassCard variant="strong" shimmer size="large" className="w-full">
          <h3 className="text-xs font-bold text-muted-foreground mb-5 uppercase tracking-[0.2em]">
            Status Legend
          </h3>
          <div className="grid grid-cols-2 gap-5">
            {[
              { color: "green" as const, label: "Undetected" },
              { color: "yellow" as const, label: "Semi Detected" },
              { color: "red" as const, label: "Detected / Bannable" },
              { color: "blue" as const, label: "Coming Soon / Idea" },
              { color: "white" as const, label: "Working On" },
              { color: "black" as const, label: "Discontinued" },
            ].map(({ color, label }) => (
              <div key={color} className="flex items-center gap-4">
                <StatusDot color={color} size="md" />
                <span className="text-sm text-foreground font-medium">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="animate-rise delay-2 w-full">
        <GlassCard variant="strong" shimmer size="large" className="w-full">
          <h3 className="text-xs font-bold text-muted-foreground mb-5 uppercase tracking-[0.2em]">
            Game Status
          </h3>
          <div className="flex flex-col gap-4">
            {[
              { name: "Muscle Legends", color: "green" as const, label: "Undetected", labelColor: "text-emerald-400" },
              { name: "Grow A Garden 2", color: "green" as const, label: "Undetected", labelColor: "text-emerald-400" },
              { name: "Strongman Simulator", color: "black" as const, label: "Discontinued", labelColor: "text-black-400" },
              { name: "MM2", color: "blue" as const, label: "Coming Soon", labelColor: "text-blue-400" },
              { name: "Legends Of Speed", color: "blue" as const, label: "Coming Soon", labelColor: "text-blue-400" },
            ].map((game) => (
              <div
                key={game.name}
                className="glass-inner rounded-2xl px-6 py-5 flex items-center justify-between hover:scale-[1.01] transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <StatusDot color={game.color} size="md" />
                  <span className="text-base font-bold text-foreground">
                    {game.name}
                  </span>
                </div>
                <span className={`text-sm ${game.labelColor} font-bold glass rounded-full px-5 py-2 tracking-wide`}>
                  {game.label}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="w-full animate-rise delay-3">
        <h3 className="text-xs font-bold text-muted-foreground mb-4 uppercase tracking-[0.2em] px-2">
          Script Details
        </h3>
        <GlassAccordion
          items={[
            {
              title: "Muscle Legends",
              content: (
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <StatusDot color="green" size="md" />
                    <span className="text-emerald-400 font-bold text-base">
                      Status: Undetected
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    The most powerful and reliable Muscle Legends script
                    available. Proton Hub{"'"}s flagship script features
                    auto-farm, auto-workout, strength multipliers, and much
                    more. This is the current loadstring — copy it and execute
                    it in your executor.
                  </p>
                  
                  <CodeBox code={MUSCLE_LEGENDS_LOADSTRING} />
                  
                  <div className="glass-inner rounded-2xl p-5 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <KeyRound className="w-5 h-5 text-amber-400" />
                      <span className="text-base font-bold text-foreground">
                        Key:
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      The Proton Hub muscle legends script is now keyed and uses Obscura. Click the button and you'll get redirected to the key system!
                    </p>
                    <a
                      href="https://obscuravm.com/key/proton-hub"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass rounded-xl px-6 py-3.5 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-bold text-base text-primary"
                    >
                      <Link className="w-5 h-5" />
                      Get Key
                    </a>
                  </div>
                </div>
              ),
            },
            {
              title: "Grow A Garden 2",
              content: (
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <StatusDot color="green" size="md" />
                    <span className="text-emerald-400 font-bold text-base">
                      Status: Undetected
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    A fully undetected Grow A Garden 2 script. Packed with the
                    latest features to help you dominate. Copy the loadstring
                    below and execute it in your executor to get started.
                  </p>
                  
                  <CodeBox code={GROW_A_GARDEN_LOADSTRING} />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
