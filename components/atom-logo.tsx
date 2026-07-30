"use client";

export function AtomLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(190 90% 55% / 0.35) 0%, hsl(200 90% 50% / 0.15) 45%, transparent 72%)",
          filter: "blur(28px)",
          animation: "glow-pulse-cyan 3s ease-in-out infinite",
        }}
      />
      
      
      <div
        className="absolute inset-[8%] rounded-full border border-primary/20"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, hsl(190 90% 60% / 0.18) 25%, transparent 50%, hsl(200 90% 60% / 0.18) 75%, transparent 100%)",
          animation: "atom-spin 12s linear infinite",
        }}
      />

      <svg
        viewBox="0 0 200 200"
        className="w-full h-full relative z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="atomGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="nucleusGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="7" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="orbitGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(185, 95%, 60%)" stopOpacity="1" />
            <stop offset="50%" stopColor="hsl(195, 90%, 70%)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(205, 95%, 60%)" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="orbitGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(200, 95%, 65%)" stopOpacity="0.95" />
            <stop offset="50%" stopColor="hsl(190, 90%, 75%)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(185, 95%, 65%)" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="orbitGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(210, 95%, 62%)" stopOpacity="0.9" />
            <stop offset="50%" stopColor="hsl(190, 90%, 72%)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(185, 95%, 62%)" stopOpacity="0.9" />
          </linearGradient>

          <radialGradient id="nucleusGrad" cx="38%" cy="35%">
            <stop offset="0%" stopColor="hsl(190, 100%, 92%)" />
            <stop offset="35%" stopColor="hsl(190, 100%, 78%)" />
            <stop offset="70%" stopColor="hsl(192, 90%, 55%)" />
            <stop offset="100%" stopColor="hsl(205, 90%, 42%)" />
          </radialGradient>
          <radialGradient id="electronGrad">
            <stop offset="0%" stopColor="hsl(190, 100%, 92%)" />
            <stop offset="60%" stopColor="hsl(190, 95%, 68%)" />
            <stop offset="100%" stopColor="hsl(200, 90%, 55%)" />
          </radialGradient>
        </defs>

        
        <g filter="url(#atomGlow)">
          <ellipse
            cx="100" cy="100" rx="84" ry="30"
            fill="none" stroke="url(#orbitGrad1)" strokeWidth="1.6"
            style={{ animation: "atom-spin 7s linear infinite", transformOrigin: "100px 100px" }}
          />
        </g>

        
        <g filter="url(#atomGlow)">
          <ellipse
            cx="100" cy="100" rx="84" ry="30"
            fill="none" stroke="url(#orbitGrad2)" strokeWidth="1.6"
            style={{
              animation: "atom-spin 9s linear infinite",
              transform: "rotate(60deg)",
              transformOrigin: "100px 100px",
            }}
          />
        </g>

        
        <g filter="url(#atomGlow)">
          <ellipse
            cx="100" cy="100" rx="84" ry="30"
            fill="none" stroke="url(#orbitGrad3)" strokeWidth="1.6"
            style={{
              animation: "atom-spin-reverse 8s linear infinite",
              transform: "rotate(120deg)",
              transformOrigin: "100px 100px",
            }}
          />
        </g>

        
        <circle cx="100" cy="100" r="22" fill="hsl(190 95% 60% / 0.15)" filter="url(#nucleusGlow)" />
        {/* Nucleus core */}
        <circle cx="100" cy="100" r="15" fill="url(#nucleusGrad)" filter="url(#nucleusGlow)" />
        {/* Nucleus specular highlight */}
        <circle cx="95" cy="95" r="4.5" fill="hsl(190, 100%, 96%)" opacity="0.85" />

        
        <g style={{ animation: "atom-spin 7s linear infinite", transformOrigin: "100px 100px" }}>
          <circle cx="184" cy="100" r="6" fill="url(#electronGrad)" filter="url(#atomGlow)" />
          <circle cx="182.5" cy="98.5" r="2" fill="hsl(190, 100%, 96%)" />
        </g>
        
        <g style={{ animation: "atom-spin 9s linear infinite", transformOrigin: "100px 100px", transform: "rotate(60deg)" }}>
          <circle cx="184" cy="100" r="6" fill="url(#electronGrad)" filter="url(#atomGlow)" />
          <circle cx="182.5" cy="98.5" r="2" fill="hsl(190, 100%, 96%)" />
        </g>
        
        <g style={{ animation: "atom-spin-reverse 8s linear infinite", transformOrigin: "100px 100px", transform: "rotate(120deg)" }}>
          <circle cx="184" cy="100" r="6" fill="url(#electronGrad)" filter="url(#atomGlow)" />
          <circle cx="182.5" cy="98.5" r="2" fill="hsl(190, 100%, 96%)" />
        </g>
      </svg>
    </div>
  );
}
