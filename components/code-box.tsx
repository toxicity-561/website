"use client";

import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";

interface CodeBoxProps {
  code: string;
  filename?: string;
}

export function CodeBox({ code, filename = "loadstring.lua" }: CodeBoxProps) {
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

  const lines = code.split("\n");

  return (
    <div className="relative group/code rounded-2xl overflow-hidden border border-foreground/10 bg-gradient-to-b from-foreground/[0.03] to-transparent shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.18)]">
      <div className="relative flex items-center gap-2 px-4 py-3 bg-foreground/[0.04] border-b border-foreground/10 backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400/70 ring-1 ring-red-300/30" />
          <span className="w-3 h-3 rounded-full bg-amber-400/70 ring-1 ring-amber-300/30" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/70 ring-1 ring-emerald-300/30" />
        </div>

        <div className="ml-2 flex items-center gap-1.5 text-xs text-muted-foreground font-mono tracking-wide">
          <Terminal className="w-3.5 h-3.5 opacity-60" />
          <span>{filename}</span>
        </div>

        <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground/50 font-mono">
          {lines.length} {lines.length === 1 ? "line" : "lines"}
        </span>
      </div>

      <div className="relative">
        <div className="overflow-x-auto">
          <div className="flex font-mono text-xs md:text-sm p-4 pr-14">
            <div
              aria-hidden
              className="select-none pr-4 mr-4 border-r border-foreground/10 text-foreground/25 text-right leading-relaxed"
            >
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            <code className="text-foreground leading-relaxed whitespace-pre">
              {lines.map((line, i) => (
                <div key={i}>{line || "\u00A0"}</div>
              ))}
            </code>
          </div>
        </div>

        <button
          type="button"
          onClick={copyToClipboard}
          aria-label="Copy code"
          className={`absolute top-3 right-3 rounded-lg w-9 h-9 flex items-center justify-center border transition-all duration-300 ${
            copied
              ? "bg-emerald-400/15 border-emerald-400/30 opacity-100 scale-100"
              : "bg-foreground/5 border-foreground/10 opacity-50 hover:opacity-100 hover:bg-foreground/10 active:scale-90"
          }`}
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4 text-foreground" />
          )}
        </button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
    </div>
  );
}
