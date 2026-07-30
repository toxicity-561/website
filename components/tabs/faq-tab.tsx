"use client";

import { GlassAccordion } from "@/components/glass-accordion";
import { HelpCircle, MessageCircle } from "lucide-react";
import { GlassCard } from "@/components/glass-card";

export function FaqTab() {
  return (
    <div className="flex flex-col items-center gap-10 max-w-2xl mx-auto w-full">
      <div className="text-center animate-scale-in">
        <div className="glass-strong rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-5 glow-cyan glass-shimmer">
          <HelpCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          FAQ
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Frequently asked questions about Proton Hub
        </p>
      </div>

      <div className="w-full animate-rise delay-1">
        <GlassAccordion
          items={[
            {
              title: "Is the script detected?",
              content:
                "No. Both of Proton Hub's current scripts — Muscle Legends and Grow A Garden 2 — are fully undetected. We constantly update our code to stay ahead of any detection methods. Your account safety is our top priority.",
            },
            {
              title: "Will I get banned for using Proton Hub?",
              content:
                "Proton Hub is currently undetected, meaning the risk of getting banned is extremely low. We monitor detection status 24/7 and will immediately notify the community through our Discord if anything changes.",
            },
            {
              title: "Is Proton Hub keyless?",
              content:
                "Yes, 100%. Proton Hub has always been keyless and always will be — no link shorteners, no ads. For Muscle Legends the key is handed out for free in our Discord. We redirect you there so the owner can earn a little revenue from server boosts and member activity rewards. It costs you nothing.",
            },
            {
              title: "Will it become key-required in the future?",
              content:
                "It is a possibility, but only if absolutely necessary to keep the project sustainable and running long-term. For now, Proton Hub stays free. We'll always give the community advance notice if anything changes.",
            },
            {
              title: "How do I get the scripts?",
              content:
                "The loadstrings for Muscle Legends and Grow A Garden 2 are right on the Scripts tab — just copy and execute. The free Muscle Legends key is in our Discord at discord.gg/proton-hub, where all updates and announcements are posted too.",
            },
            {
              title: "What games does Proton Hub support?",
              content:
                "Right now Proton Hub fully supports two games — Muscle Legends and Grow A Garden 2 — both undetected. MM2 and Legends Of Speed are both coming soon and currently in development.",
            },
            {
              title: "What is the Script Search tab?",
              content:
                "The Search tab lets you browse and search thousands of community scripts pulled live from the ScriptBlox API. Tap any script to open it, copy its loadstring, or view it on ScriptBlox. Note: it relies on an external API, so results can occasionally load slowly.",
            },
            {
              title: "What's on the Changelogs tab?",
              content:
                "The Changelogs page is still being built. It'll track every update, fix, and new feature once it's ready — please check back on September 1st.",
            },
            {
              title: "Who develops Proton Hub?",
              content:
                "Proton Hub is developed solely by Toxic (Kaiser), a 14-year-old developer and prodigy. Danthy helps moderate and protect the community. Despite being a tiny team, the quality rivals — and surpasses — scripts made by full teams.",
            },
            {
              title: "Is Proton Hub better than other Muscle Legends scripts?",
              content:
                "Absolutely. Proton Hub is faster, more reliable, keyless, and undetected. It's built with genuine care for the community. No other Muscle Legends script comes close.",
            },
            {
              title: "Can I suggest features or new games?",
              content:
                "Yes! We love hearing from the community. Join our Discord at discord.gg/proton-hub and drop your suggestions in the appropriate channel. Your ideas help shape the future of Proton Hub.",
            },
          ]}
        />
      </div>

      <div className="animate-rise delay-2 w-full">
        <GlassCard variant="strong" shimmer size="large" className="text-center w-full">
          <MessageCircle className="w-7 h-7 text-primary mx-auto mb-3" />
          <p className="text-base font-bold text-foreground mb-2">
            Still have questions?
          </p>
          <p className="text-base text-muted-foreground">
            Join{" "}
            <span className="text-primary font-bold">
              discord.gg/proton-hub
            </span>{" "}
            and ask in our support channel. We{"'"}re here to help.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
