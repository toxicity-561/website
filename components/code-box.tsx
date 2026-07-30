"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBoxProps {
  code: string;
}

export function CodeBox({ code }: CodeBoxProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy");
    }
  };

  return (
    <div className="relative group/code">
      
      <div className="glass-inner rounded-t-2xl px-4 py-3 flex items-center gap-2 border-b border-foreground/10">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400/70" />
          <span className="w-3 h-3 rounded-full bg-amber-400/70" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
        </div>
        <span className="ml-2 text-xs text-muted-foreground font-mono tracking-wide">
          loadstring.lua
        </span>
      </div>

      
      <div className="glass-inner rounded-b-2xl p-4 pr-14 font-mono text-xs md:text-sm text-foreground overflow-x-auto relative">
        <code className="break-all whitespace-pre-wrap block leading-relaxed">
          {code}
        </code>

        
        <button
          type="button"
          onClick={copyToClipboard}
          aria-label="Copy loadstring"
          className={`absolute top-3 right-3 rounded-lg w-9 h-9 flex items-center justify-center transition-all duration-300 ${
            copied
              ? "bg-emerald-400/20 opacity-100 scale-100"
              : "bg-foreground/5 opacity-40 hover:opacity-100 hover:bg-foreground/10 active:scale-90"
          }`}
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4 text-foreground" />
          )}
        </button>
      </div>
    </div>
  );
}
