"use client";

import { useState } from "react";
import { AlertTriangle, ArrowRight, X } from "lucide-react";

interface ConsentScreenProps {
  onContinue: () => void;
}

export function ConsentScreen({ onContinue }: ConsentScreenProps) {
  const [closing, setClosing] = useState(false);

  const handleCloseTab = () => {
    setClosing(true);
    
    setTimeout(() => {
      window.close();
      if (!window.closed) {
        window.location.href = "about:blank";
      }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-background">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-60"
          style={{
            top: "20%",
            left: "10%",
            background: "var(--mesh-1)",
            filter: "blur(100px)",
            animation: "mesh-move-1 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-60"
          style={{
            bottom: "10%",
            right: "5%",
            background: "var(--mesh-2)",
            filter: "blur(120px)",
            animation: "mesh-move-2 25s ease-in-out infinite",
          }}
        />
      </div>

      
      <div 
        className={`relative z-10 w-full max-w-md transition-all duration-500 ${
          closing ? "opacity-0 scale-90 blur-sm" : "opacity-100 scale-100 blur-0"
        }`}
      >
        <div className="glass-strong rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl glass-shimmer">
          
          <div className="flex justify-center mb-6">
            <div className="glass rounded-full w-20 h-20 flex items-center justify-center glow-amber">
              <AlertTriangle className="w-10 h-10 text-amber-400" />
            </div>
          </div>

          
          <h1 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-4">
            Welcome to Proton Hub
          </h1>

          
          <p className="text-center text-muted-foreground mb-3 leading-relaxed">
            Do you want to continue to the website?
          </p>
          <p className="text-center text-sm text-muted-foreground/80 mb-8 leading-relaxed">
            This page contains heavy animations and effects that may cause lag on some devices. 
            For the best experience, we recommend using a modern browser on a capable device.
          </p>

          
          <div className="flex flex-col gap-3">
            <button
              onClick={onContinue}
              className="glass-strong rounded-2xl px-6 py-4 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-semibold text-base bg-primary/20 border-primary/30 hover:bg-primary/30 group"
            >
              <span>Continue to Website</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleCloseTab}
              className="glass rounded-2xl px-6 py-4 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-medium text-base text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
              <span>Close Tab</span>
            </button>
          </div>

          
          <p className="text-center text-xs text-muted-foreground/60 mt-6">
            By continuing, you acknowledge you may experience visual effects.
          </p>
        </div>
      </div>
    </div>
  );
}
