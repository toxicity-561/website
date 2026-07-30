"use client";

import { GlassCard } from "@/components/glass-card";
import { Crown, ShieldCheck, Users, Heart, UserX, Ban } from "lucide-react";

interface CreditCardProps {
  icon: React.ReactNode;
  name: string;
  role: string;
  description: string;
  glowClass: string;
  delay: string;
}

function CreditCard({
  icon,
  name,
  role,
  description,
  glowClass,
  delay,
}: CreditCardProps) {
  return (
    <div className={`animate-rise ${delay}`}>
      <GlassCard
        variant="strong"
        shimmer
        hover
        size="large"
        className="flex flex-col items-center text-center gap-6 h-full"
      >
        <div
          className={`w-28 h-28 rounded-full flex items-center justify-center glass-strong ${glowClass}`}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground tracking-tight">
            {name}
          </h3>
          <p className="text-sm text-primary font-bold uppercase tracking-[0.2em] mt-1.5">
            {role}
          </p>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      </GlassCard>
    </div>
  );
}

export function CreditsTab() {
  return (
    <div className="flex flex-col items-center gap-10 max-w-2xl mx-auto w-full">
      
      <div className="text-center animate-scale-in">
        <div className="glass-strong rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-5 glow-cyan glass-shimmer">
          <Users className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
          Credits
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          The people behind Proton Hub
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <CreditCard
          icon={<Crown className="w-12 h-12 text-amber-400 drop-shadow-md" />}
          name="Toxic (Kaiser)"
          role="Owner & Lead Developer"
          glowClass="glow-amber"
          delay="delay-1"
          description="The founder and sole developer of Proton Hub. A 14-year-old prodigy who turned a dream into reality. Despite doubts from others, Kaiser proved that talent and dedication know no age. He built Proton Hub from scratch — every line of code, every feature, every update. A true visionary in the scripting community."
        />
        <CreditCard
          icon={
            <ShieldCheck className="w-12 h-12 text-sky-400 drop-shadow-md" />
          }
          name="Danthy"
          role="Moderator & Trusted Friend"
          glowClass="glow-sky"
          delay="delay-2"
          description="A great friend who believed in the vision of Proton Hub from the very beginning. When others had their doubts, Danthy stood by Kaiser and supported the project. As a moderator, Danthy helps keep the community safe, welcoming, and running smoothly. A true pillar of the Proton Hub family."
        />
      </div>

      <div className="animate-rise delay-3 w-full">
        <GlassCard variant="strong" hover size="large" className="relative overflow-hidden">
          {/* Content underneath (dimmed) */}
          <div className="flex flex-col items-center text-center gap-6 opacity-40 blur-[2px] select-none pointer-events-none">
            <div className="w-28 h-28 rounded-full flex items-center justify-center glass-strong">
              <UserX className="w-12 h-12 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground tracking-tight">
                Faisal
              </h3>
              <p className="text-sm text-muted-foreground font-bold uppercase tracking-[0.2em] mt-1.5">
                Former Developer
              </p>
            </div>
          </div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 glass-inner">
            <div className="glass-strong rounded-full w-16 h-16 flex items-center justify-center">
              <Ban className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-lg font-bold text-foreground px-6 text-center text-balance">
              They are not a developer no more
            </p>
          </div>
        </GlassCard>
      </div>

      <div className="animate-rise delay-4 w-full">
        <GlassCard shimmer size="large" className="w-full text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Heart className="w-5 h-5 text-primary" />
            <span className="text-base font-bold text-foreground">
              Special Thanks
            </span>
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <p className="text-base text-muted-foreground leading-relaxed">
            To the entire Proton Hub community. Your support, feedback, and
            loyalty is what keeps this project alive. From the bottom of our
            hearts — thank you.
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
