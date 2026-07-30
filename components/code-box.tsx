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
  "type","export","continue","typeof","self"
]);

const BUILTINS = new Set([
  "game","workspace","script","shared","_G","print","warn","error","assert",
  "pairs","ipairs","next","pcall","xpcall","select","rawget","rawset","rawequal",
  "rawlen","require","loadstring","getfenv","setfenv","setmetatable","getmetatable",
  "tostring","tonumber","typeof","type","unpack","task","wait","spawn","delay",
  "tick","time","os","coroutine","bit32","utf8","buffer","Instance","Vector3",
  "Vector2","Vector2int16","Vector3int16","CFrame","Color3","ColorSequence",
  "ColorSequenceKeypoint","NumberSequence","NumberSequenceKeypoint","NumberRange",
  "UDim2","UDim","Ray","Region3","Region3int16","BrickColor","TweenInfo",
  "PhysicalProperties","Enum","EnumItem","Random","DateTime","Axes","Faces",
  "Rect","Path2DControlPoint","math","string","table","debug","utf8","httpService"
]);

type Tok = { text: string; type: "comment" | "string" | "number" | "keyword" | "builtin" | "punct" | "plain" };

function classify(tok: string): Tok["type"] {
  if (/^--/.test(tok)) return "comment";
  if (/^(\[=*\[)[\s\S]*(\]=*\])$/.test(tok)) return "string";
  if (/^"[^"]*"$|^'[^']*'$/.test(tok)) return "string";
  if (/^\d+(\.\d+)?$/.test(tok)) return "number";
  if (KEYWORDS.has(tok)) return "keyword";
  if (BUILTINS.has(tok)) return "builtin";
  if (/^[(){}\[\].,:;]$/.test(tok)) return "punct";
  return "plain";
}

function tokenize(code: string): Tok[] {
  const pattern = /(--\[(=*)\[[\s\S]*?\]\2\]|--[^\n]*|\[(=*)\[[\s\S]*?\]\3\]|"[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*'|\d+\.?\d*|[A-Za-z_][A-Za-z0-9_]*|[(){}\[\].,:;]|[+\-*/%^#=<>~]+|\s+|.)/g;
  const out: Tok[] = [];
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(code)) !== null) {
    const text = m[0];
    out.push({ text, type: classify(text) });
  }
  return out;
}

const COLOR_MAP: Record<Tok["type"], string> = {
  comment: "text-teal-500/50 italic",
  string: "text-teal-200/90",
  number: "text-teal-300",
  keyword: "text-teal-400 font-medium",
  builtin: "text-teal-300/80",
  punct: "text-zinc-400",
  plain: "text-zinc-200",
};

function highlight(code: string): React.ReactNode[][] {
  const tokens = tokenize(code);
  const lines: React.ReactNode[][] = [[]];
  let key = 0;

  for (const tok of tokens) {
    const parts = tok.text.split("\n");
    parts.forEach((part, idx) => {
      if (idx > 0) lines.push([]);
      if (part.length === 0) return;
      lines[lines.length - 1].push(
        <span key={key++} className={COLOR_MAP[tok.type]}>
          {part}
        </span>
      );
    });
  }

  return lines;
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

  const highlightedLines = highlight(code);

  return (
    <div className="rounded-2xl overflow-hidden border border-teal-400/20 shadow-[0_8px_30px_rgba(20,184,166,0.15)] transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(20,184,166,0.25)]">
      <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-teal-400/20">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400/70 ring-1 ring-red-300/30" />
          <span className="w-3 h-3 rounded-full bg-amber-400/70 ring-1 ring-amber-300/30" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/70 ring-1 ring-emerald-300/30" />
        </div>

        <div className="ml-2 flex items-center gap-1.5 text-xs text-teal-400/80 font-mono tracking-wide">
          <Terminal className="w-3.5 h-3.5 opacity-70" />
          <span>{filename}</span>
        </div>

        <span className="ml-auto text-[10px] uppercase tracking-wider text-zinc-500 font-mono mr-3">
          {highlightedLines.length} {highlightedLines.length === 1 ? "line" : "lines"}
        </span>

        <button
          type="button"
          onClick={copyToClipboard}
          aria-label="Copy code"
          className={`rounded-lg w-8 h-8 flex items-center justify-center border transition-all duration-300 ${
            copied
              ? "bg-teal-400/15 border-teal-400/30 opacity-100 scale-100"
              : "bg-white/5 border-white/10 opacity-60 hover:opacity-100 hover:bg-teal-400/10 hover:border-teal-400/30 active:scale-90"
          }`}
        >
          {copied ? (
            <Check className="w-4 h-4 text-teal-400" />
          ) : (
            <Copy className="w-4 h-4 text-zinc-300" />
          )}
        </button>
      </div>

      <div className="relative bg-zinc-800">
        <div className="overflow-x-auto">
          <div className="flex font-mono text-xs md:text-sm p-4">
            <div
              aria-hidden
              className="select-none pr-4 mr-4 border-r border-teal-400/10 text-zinc-600 text-right leading-relaxed"
            >
              {highlightedLines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            <code className="leading-relaxed whitespace-pre">
              {highlightedLines.map((line, i) => (
                <div key={i}>{line.length ? line : "\u00A0"}</div>
              ))}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
