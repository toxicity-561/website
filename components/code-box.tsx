"use client";

import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";

interface CodeBoxProps {
  code: string;
  filename?: string;
}

const KEYWORDS = new Set([
  "and","break","do","else","elseif","end","false","for","function","if","in",
  "local","nil","not","or","repeat","return","then","true","until","while",
  "type","export","continue","interface"
]);

const BUILTINS = new Set([
  "game","workspace","script","print","warn","error","pairs","ipairs","pcall",
  "xpcall","require","loadstring","tostring","tonumber","typeof","task","wait",
  "spawn","delay","Instance","Vector3","Vector2","CFrame","Color3","UDim2","UDim",
  "Enum","math","string","table","os","coroutine"
]);

function highlight(line: string) {
  const tokens = line.split(/(\s+|"[^"]*"|'[^']*'|--\[\[[\s\S]*?\]\]|--.*$|[(){}\[\].,:;]|[+\-*/%^#=<>~]+)/g);

  return tokens.map((tok, i) => {
    if (!tok) return null;

    if (/^--/.test(tok)) {
      return (
        <span key={i} className="text-emerald-500/60 italic">
          {tok}
        </span>
      );
    }
    if (/^"[^"]*"$|^'[^']*'$/.test(tok)) {
      return (
        <span key={i} className="text-amber-300/90">
          {tok}
        </span>
      );
    }
    if (/^\d+(\.\d+)?$/.test(tok)) {
      return (
        <span key={i} className="text-sky-300/90">
          {tok}
        </span>
      );
    }
    if (KEYWORDS.has(tok)) {
      return (
        <span key={i} className="text-fuchsia-400/90 font-medium">
          {tok}
        </span>
      );
    }
    if (BUILTINS.has(tok)) {
      return (
        <span key={i} className="text-cyan-300/90">
          {tok}
        </span>
      );
    }
    if (/^[(){}\[\].,:;]$/.test(tok)) {
      return (
        <span key={i} className="text-zinc-400">
          {tok}
        </span>
      );
    }
    return (
      <span key={i} className="text-zinc-200">
        {tok}
      </span>
    );
  });
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
    <div className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-white/10">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400/70 ring-1 ring-red-300/30" />
          <span className="w-3 h-3 rounded-full bg-amber-400/70 ring-1 ring-amber-300/30" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/70 ring-1 ring-emerald-300/30" />
        </div>

        <div className="ml-2 flex items-center gap-1.5 text-xs text-zinc-400 font-mono tracking-wide">
          <Terminal className="w-3.5 h-3.5 opacity-60" />
          <span>{filename}</span>
        </div>

        <span className="ml-auto text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
          {lines.length} {lines.length === 1 ? "line" : "lines"}
        </span>
      </div>

      <div className="relative bg-zinc-800">
        <div className="overflow-x-auto">
          <div className="flex font-mono text-xs md:text-sm p-4 pr-14">
            <div
              aria-hidden
              className="select-none pr-4 mr-4 border-r border-white/10 text-zinc-600 text-right leading-relaxed"
            >
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            <code className="leading-relaxed whitespace-pre">
              {lines.map((line, i) => (
                <div key={i}>{line ? highlight(line) : "\u00A0"}</div>
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
              : "bg-white/5 border-white/10 opacity-50 hover:opacity-100 hover:bg-white/10 active:scale-90"
          }`}
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Copy className="w-4 h-4 text-zinc-200" />
          )}
        </button>
      </div>
    </div>
  );
}
