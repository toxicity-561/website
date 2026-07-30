"use client";

import { AtomLogo } from "@/components/atom-logo";
import { StatusDot } from "@/components/status-dot";
import { GlassCard } from "@/components/glass-card";
import { Zap, Globe, Shield, KeyRound } from "lucide-react";

export function HomeTab() {
  return (
    <div className="flex flex-col items-center gap-10 max-w-2xl mx-auto w-full">
      
      <div className="flex flex-col items-center gap-6 animate-scale-in">
        <div className="float">
          <AtomLogo className="w-40 h-40 md:w-52 md:h-52" />
        </div>
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground text-balance">
            Proton Hub
          </h1>
          <p className="mt-2 text-muted-foreground text-sm font-mono tracking-wider">
            The future of scripting
          </p>
        </div>
      </div>

      
      <div className="animate-rise delay-1 w-full flex justify-center">
        <div className="glass-strong rounded-3xl sm:rounded-full px-5 sm:px-8 py-3 sm:py-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 glass-shimmer max-w-full">
          <span className="text-sm font-medium text-muted-foreground">
            Status:
          </span>
          <span className="flex items-center gap-2">
            <StatusDot color="green" glitch size="lg" />
            <span className="text-sm font-bold text-emerald-400 tracking-wide">
              Undetected
            </span>
          </span>
          <span className="hidden sm:inline-block w-px h-5 bg-border" />
          <span className="text-sm text-foreground font-medium">Fast</span>
          <span className="hidden sm:inline-block w-px h-5 bg-border" />
          <span className="text-sm text-foreground font-medium">Worldwide</span>
        </div>
      </div>

      
      <div className="flex flex-wrap justify-center gap-4 animate-rise delay-2">
        {[
          { icon: KeyRound, label: "100% Keyless" },
          { icon: Shield, label: "Undetected" },
          { icon: Zap, label: "Lightning Fast" },
          { icon: Globe, label: "Global Access" },
        ].map(({ icon: Icon, label }, i) => (
          <div
            key={label}
            className="glass rounded-full px-6 py-3 flex items-center gap-3 hover:scale-105 transition-all duration-300 glass-shimmer"
            style={{ animationDelay: `${0.2 + i * 0.06}s` }}
          >
            <Icon className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground tracking-wide">
              {label}
            </span>
          </div>
        ))}
      </div>

    
      <div className="animate-rise delay-3 w-full">
        <GlassCard variant="strong" shimmer size="large" className="w-full">
          <h2 className="text-2xl font-bold text-foreground mb-5 tracking-tight">
            From a Dream to Reality
          </h2>
          <div className="flex flex-col gap-5 text-sm text-muted-foreground leading-relaxed">
            <p>
              Proton Hub started as nothing more than a dream. A vision that one
              day, there would be a script hub that truly puts the community
              first — no keys, no hassle, no paywalls. What began as an idea in
              the mind of a 14-year-old developer named{" "}
              <span className="text-foreground font-semibold">Toxic</span> (real
              name{" "}
              <span className="text-foreground font-semibold">Kaiser</span>)
              quickly became something real. Despite being the sole developer and
              owner, Kaiser poured every ounce of his talent into making Proton
              Hub the best it can be.
            </p>
            <p>
              Currently, Proton Hub supports one game due to the low amount of
              developers — since the only one is the owner himself. But that
              hasn{"'"}t stopped Proton Hub from becoming the most reliable and
              powerful Muscle Legends script on the market. Being a solo
              developer at just 14 years old, Kaiser has proven that age is just
              a number when you have the skill and dedication to back it up. A
              true prodigy, even when others doubted him.
            </p>
            <p>
              Proton Hub is{" "}
              <span className="text-foreground font-semibold">
                completely keyless (not now no more)
              </span>{" "}
              — always has been, always will be. No annoying key systems, no
              waiting, no ads. Just pure, clean execution. It{"'"}s faster, more
              reliable, and better than every other Muscle Legends script out
              there. And with more game support on the horizon, Proton Hub is
              only getting started. The best keyless script hub isn{"'"}t just
              coming —{" "}
              <span className="text-primary font-bold">
                it{"'"}s already here.
              </span>
            </p>
          </div>
        </GlassCard>
      </div>

      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {[
          { label: "Detection Rate", value: "0%", sub: "Fully safe" },
          { label: "Key Required", value: "True", sub: "Quick & Fast" },
          { label: "Speed", value: "Instant", sub: "No delay" },
          { label: "Uptime", value: "99.9%", sub: "Always online" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className={`animate-rise delay-${4 + i}`}
          >
            <GlassCard
              className="text-center py-6 px-4"
              hover
              shimmer
            >
              <p className="text-3xl md:text-4xl font-bold text-primary">
                {stat.value}
              </p>
              <p className="text-sm font-bold text-foreground mt-2 tracking-wide">
                {stat.label}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.sub}
              </p>
            </GlassCard>
          </div>
        ))}
      </div>
    </div>
  );
}
