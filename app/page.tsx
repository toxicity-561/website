"use client";

import { useState, useEffect, useCallback } from "react";
import { BottomNav, type TabId } from "@/components/bottom-nav";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { AccentPicker } from "@/components/accent-picker";
import { HomeTab } from "@/components/tabs/home-tab";
import { ScriptsTab } from "@/components/tabs/scripts-tab";
import { ScriptSearchTab } from "@/components/tabs/script-search-tab";
import { CreditsTab } from "@/components/tabs/credits-tab";
import { FaqTab } from "@/components/tabs/faq-tab";
import { ChangelogsTab } from "@/components/tabs/changelogs-tab";
import { ConsentScreen } from "@/components/consent-screen";

export default function Page() {
  const [showConsent, setShowConsent] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [transitioning, setTransitioning] = useState(false);
  const [displayTab, setDisplayTab] = useState<TabId>("home");

  const handleTabChange = useCallback(
    (tab: TabId) => {
      if (tab === activeTab) return;
      setTransitioning(true);
      setTimeout(() => {
        setDisplayTab(tab);
        setActiveTab(tab);
        setTimeout(() => setTransitioning(false), 50);
      }, 250);
    },
    [activeTab]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [displayTab]);


  if (showConsent) {
    return <ConsentScreen onContinue={() => setShowConsent(false)} />;
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-background">
      
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            top: "10%",
            left: "15%",
            background: "var(--mesh-1)",
            filter: "blur(80px)",
            animation: "mesh-move-1 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            bottom: "20%",
            right: "10%",
            background: "var(--mesh-2)",
            filter: "blur(90px)",
            animation: "mesh-move-2 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "var(--mesh-3)",
            filter: "blur(70px)",
            animation: "mesh-move-3 18s ease-in-out infinite",
          }}
        />
        
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
            style={{
              left: `${15 + i * 15}%`,
              bottom: "10%",
              animation: `particle-drift ${8 + i * 2}s ease-in-out infinite ${i * 1.5}s`,
            }}
          />
        ))}
      </div>

  
      <main className="relative z-10 px-4 pt-8 md:pt-14 pb-36">
        <div
          className={`transition-all duration-300 ease-out ${
            transitioning
              ? "opacity-0 translate-y-6 scale-[0.97] blur-sm"
              : "opacity-100 translate-y-0 scale-100 blur-0"
          }`}
        >
          {displayTab === "home" && <HomeTab />}
          {displayTab === "scripts" && <ScriptsTab />}
          {displayTab === "script-search" && <ScriptSearchTab />}
          {displayTab === "changelogs" && <ChangelogsTab />}
          {displayTab === "credits" && <CreditsTab />}
          {displayTab === "faq" && <FaqTab />}
        </div>
      </main>

      
      <div
        className="fixed bottom-0 left-0 right-0 h-36 pointer-events-none z-40"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.85) 50%, transparent 100%)",
        }}
      />

      <div className="fixed bottom-0 left-0 right-0 z-50 pb-5 px-4">
        <div className="flex items-end justify-between max-w-xl mx-auto gap-3">
          <DarkModeToggle />
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
          <AccentPicker />
        </div>
      </div>
    </div>
  );
}
