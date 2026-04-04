"use client";

import { useState, useCallback } from "react";
import BootSequence from "@/components/terminal/BootSequence";
import SecurityInit from "@/components/os/SecurityInit";
import BreachError from "@/components/os/BreachError";
import LoginScreen from "@/components/os/LoginScreen";
import Desktop from "@/components/desktop/Desktop";

type Phase = "boot" | "security" | "breach" | "security-retry" | "login" | "desktop";

/* ~30% chance the breach error screen appears */
const BREACH_CHANCE = 0.3;

export default function HomePage() {
  const [phase, setPhase] = useState<Phase>("boot");

  const handleSecurityDone = useCallback(() => {
    if (Math.random() < BREACH_CHANCE) {
      setPhase("breach");
    } else {
      setPhase("login");
    }
  }, []);

  const handleBreachDone = useCallback(() => {
    /* After breach BSOD, system "reboots" back through security */
    setPhase("security-retry");
  }, []);

  return (
    <main className="h-screen w-screen overflow-hidden bg-term-bg">
      {phase === "boot" && (
        <BootSequence onComplete={() => setPhase("security")} />
      )}
      {phase === "security" && (
        <SecurityInit onComplete={handleSecurityDone} />
      )}
      {phase === "breach" && (
        <BreachError onComplete={handleBreachDone} />
      )}
      {phase === "security-retry" && (
        <SecurityInit onComplete={() => setPhase("login")} />
      )}
      {phase === "login" && (
        <LoginScreen onLogin={() => setPhase("desktop")} />
      )}
      {phase === "desktop" && <Desktop />}
    </main>
  );
}
