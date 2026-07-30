"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { GlassCard } from "@/components/glass-card";
import { Search, ExternalLink, Copy, Check, X, Loader2, ImageOff, AlertTriangle } from "lucide-react";

interface Script {
  _id: string;
  title: string;
  game: {
    name: string;
    imageUrl?: string;
  };
  script: string;
  slug: string;
  views: number;
  verified: boolean;
  scriptType: string;
  createdAt: string;
}

interface ApiResponse {
  result: {
    scripts: Script[];
  };
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

function highlight(code: string) {
  const tokens = code.split(/(\s+|"[^"]*"|'[^']*'|--\[\[[\s\S]*?\]\]|--.*|[(){}\[\].,:;]|[+\-*/%^#=<>~]+)/g);

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

export function ScriptSearchTab() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchScripts();
  }, []);

  useEffect(() => {
    if (modalOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [modalOpen]);

  const fetchScripts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://scriptblox.com/api/script/fetch");
      if (!res.ok) throw new Error("Failed to fetch scripts");
      const data: ApiResponse = await res.json();
      setScripts(data.result.scripts.slice(0, 20));
    } catch (err) {
      setError("Failed to load scripts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const searchScripts = async (query: string) => {
    if (!query.trim()) {
      fetchScripts();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://scriptblox.com/api/script/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Search failed");
      const data: ApiResponse = await res.json();
      setScripts(data.result.scripts.slice(0, 20));
    } catch (err) {
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchScripts(searchQuery);
  };

  const openModal = (script: Script) => {
    setSelectedScript(script);
    setModalOpen(true);
    setCopied(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedScript(null), 300);
  };

  const copyLoadstring = async () => {
    if (!selectedScript?.script) return;
    try {
      await navigator.clipboard.writeText(selectedScript.script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy");
    }
  };

  const getImageUrl = (script: Script) => {
    if (script.game?.imageUrl) {
      if (script.game.imageUrl.startsWith("http")) {
        return script.game.imageUrl;
      }
      return `https://scriptblox.com${script.game.imageUrl}`;
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center gap-10 max-w-4xl mx-auto w-full">
      <div className="animate-rise w-full">
        <div className="glass rounded-2xl p-4 border border-amber-500/30 bg-amber-500/5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-400">Heads Up</p>
              <p className="text-xs text-muted-foreground mt-1">
                Scripts here are pulled live from an external API (ScriptBlox), so results may occasionally load slowly or look off. If that happens, just refresh or search again!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center animate-scale-in">
        <div className="glass-strong rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-5 glow-sky glass-shimmer">
          <Search className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Script Search
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Browse the newest scripts from ScriptBlox
        </p>
      </div>

      <form onSubmit={handleSearch} className="animate-rise delay-1 w-full">
        <div className="glass-strong rounded-2xl p-2 flex items-center gap-2 glass-shimmer">
          <div className="flex-1 flex items-center gap-3 px-4">
            <Search className="w-5 h-5 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for scripts..."
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none py-3 text-base"
            />
          </div>
          <button
            type="submit"
            className="glass rounded-xl px-6 py-3 font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Search
          </button>
        </div>
      </form>

      {loading && (
        <div className="flex flex-col items-center gap-4 py-12">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-muted-foreground">Loading scripts...</p>
        </div>
      )}

      {error && (
        <GlassCard variant="strong" className="w-full text-center py-8">
          <p className="text-destructive">{error}</p>
          <button
            onClick={fetchScripts}
            className="mt-4 glass rounded-xl px-6 py-3 font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Try Again
          </button>
        </GlassCard>
      )}

      {!loading && !error && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-rise delay-2">
          {scripts.map((script, index) => (
            <button
              key={script._id}
              type="button"
              onClick={() => openModal(script)}
              className="text-left w-full"
              style={{ animationDelay: `${0.05 * index}s` }}
            >
              <div className="glass rounded-3xl p-5 h-full flex flex-col cursor-pointer group hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 glass-shimmer">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4 glass-inner group-hover:ring-2 group-hover:ring-primary/50 transition-all duration-300">
                  {getImageUrl(script) ? (
                    <img
                      src={getImageUrl(script)!}
                      alt={script.game?.name || script.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageOff className="w-8 h-8 text-muted-foreground/50" />
                    </div>
                  )}
                  {script.verified && (
                    <div className="absolute top-2 right-2 glass rounded-full px-2 py-1 text-xs font-bold text-emerald-400">
                      Verified
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col gap-2">
                  <h3 className="font-bold text-foreground line-clamp-2 text-sm leading-tight group-hover:text-primary transition-colors">
                    {script.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {script.game?.name || "Unknown Game"}
                  </p>
                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {script.views?.toLocaleString() || 0} views
                    </span>
                    <span className="text-xs font-medium text-primary glass rounded-full px-2 py-1">
                      {script.scriptType || "Free"}
                    </span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-foreground/10 text-center">
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors duration-300 font-medium">
                      Tap to view loadstring
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {mounted && modalOpen && selectedScript && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-fade-in"
            onClick={closeModal}
          />

          <div className="relative z-10 w-full max-w-lg animate-modal-in">
            <div className="glass-strong rounded-3xl p-6 md:p-8 overflow-y-auto max-h-[85vh] border border-white/20">
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-4 right-4 z-20 glass rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              <div className="mb-6 pr-12">
                <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                  {selectedScript.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {selectedScript.game?.name || "Unknown Game"}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs text-muted-foreground">
                    {selectedScript.views?.toLocaleString() || 0} views
                  </span>
                  {selectedScript.verified && (
                    <span className="text-xs font-bold text-emerald-400">Verified</span>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
                  Loadstring
                </label>
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-800 max-h-40 overflow-y-auto">
                  <div className="overflow-x-auto">
                    <div className="flex font-mono text-xs md:text-sm p-4">
                      <div
                        aria-hidden
                        className="select-none pr-4 mr-4 border-r border-white/10 text-zinc-600 text-right leading-relaxed"
                        >
                        {(selectedScript.script || "").split("\n").map((_, i) => (
                          <div key={i}>{i + 1}</div>
                        ))}
                      </div>
                      <code className="leading-relaxed whitespace-pre block">
                      </code>{selectedScript.script
                        ? (selectedScript.script.split("\n")).map((line, i) => (
                          <div key={i}>{line ? highlight(line) : "\u00A0"}</div>
                        ))
                      : "No loadstring available"}
                    </code>
                  </div>
                </div>
              </div>
            </div>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={copyLoadstring}
                  className="w-full glass rounded-2xl px-6 py-4 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-bold text-base"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>Copy Loadstring</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://scriptblox.com/script/${selectedScript.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full glass rounded-2xl px-6 py-4 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-bold text-base text-primary"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>View on ScriptBlox</span>
                </a>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
