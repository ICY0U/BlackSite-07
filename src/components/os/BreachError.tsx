"use client";

import { useState, useEffect, useCallback } from "react";

type BreachPhase =
  | "glitch"       /* screen tears / flickers */
  | "warning"      /* BREACH DETECTED alerts flood in */
  | "cascade"      /* system errors cascade */
  | "shutdown"     /* emergency shutdown protocol */
  | "poweroff"     /* screen goes black */
  | "bsod"         /* blue screen of death */
  | "reboot";      /* fade out → back to security */

interface AlertLine {
  text: string;
  color: string;
  delay: number;
}

const warningLines: AlertLine[] = [
  { text: "!! INTRUSION DETECTION SYSTEM — ALERT !!", color: "text-term-error", delay: 80 },
  { text: "UNAUTHORIZED ACCESS PATTERN IDENTIFIED", color: "text-term-error", delay: 60 },
  { text: "ORIGIN: NODE 5 (CONTAINMENT_LAYER) — STATUS: UNKNOWN", color: "text-term-warn", delay: 50 },
  { text: "THREAT LEVEL: ████████████████████████ CRITICAL", color: "text-term-error", delay: 70 },
  { text: "", color: "", delay: 200 },
  { text: "FIREWALL STATUS: COMPROMISED", color: "text-term-error", delay: 40 },
  { text: "ENCRYPTION LAYER: DEGRADED (AES-256 → AES-128)", color: "text-term-warn", delay: 40 },
  { text: "PACKET ANOMALY: 14,392 MALFORMED REQUESTS / SEC", color: "text-term-error", delay: 40 },
  { text: "AUTH TOKENS: INVALIDATED", color: "text-term-error", delay: 40 },
  { text: "", color: "", delay: 150 },
  { text: "ATTEMPTING COUNTERMEASURES...", color: "text-term-info", delay: 100 },
  { text: "  > isolating affected subnet .......... [FAILED]", color: "text-term-error", delay: 80 },
  { text: "  > rotating credentials ............... [FAILED]", color: "text-term-error", delay: 80 },
  { text: "  > enabling honeypot redirect ......... [FAILED]", color: "text-term-error", delay: 80 },
  { text: "  > blocking external connections ....... [TIMEOUT]", color: "text-term-warn", delay: 80 },
  { text: "", color: "", delay: 200 },
  { text: "ALL COUNTERMEASURES FAILED", color: "text-term-error", delay: 100 },
];

const shutdownLines: AlertLine[] = [
  { text: "", color: "", delay: 300 },
  { text: "╔══════════════════════════════════════════════════════╗", color: "text-term-error", delay: 40 },
  { text: "║     EMERGENCY SHUTDOWN PROTOCOL — INITIATED         ║", color: "text-term-error", delay: 40 },
  { text: "╚══════════════════════════════════════════════════════╝", color: "text-term-error", delay: 40 },
  { text: "", color: "", delay: 200 },
  { text: "DUMPING VOLATILE MEMORY ............ 16384 MB", color: "text-term-text", delay: 60 },
  { text: "SEVERING NETWORK CONNECTIONS ....... 4 / 4", color: "text-term-text", delay: 60 },
  { text: "LOCKING CLASSIFIED VOLUMES ......... OK", color: "text-term-success", delay: 50 },
  { text: "DESTROYING SESSION KEYS ............ OK", color: "text-term-success", delay: 50 },
  { text: "WIPING TEMP STORAGE ................ OK", color: "text-term-success", delay: 50 },
  { text: "ARCHIVING INCIDENT LOG ............. OK", color: "text-term-success", delay: 50 },
  { text: "", color: "", delay: 200 },
  { text: "NOTIFYING SECURITY OPERATIONS CENTER... SENT", color: "text-term-info", delay: 80 },
  { text: "INCIDENT ID: BSE-2026-0402-7F3A", color: "text-term-dim", delay: 40 },
  { text: "", color: "", delay: 300 },
  { text: "SYSTEM HALT IN 3...", color: "text-term-error", delay: 800 },
  { text: "SYSTEM HALT IN 2...", color: "text-term-error", delay: 800 },
  { text: "SYSTEM HALT IN 1...", color: "text-term-error", delay: 800 },
  { text: "", color: "", delay: 100 },
  { text: "HALTING.", color: "text-term-error", delay: 200 },
];

export default function BreachError({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<BreachPhase>("glitch");
  const [lines, setLines] = useState<AlertLine[]>([]);
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  const [skipped, setSkipped] = useState(false);

  const runSequence = useCallback(async (signal: AbortSignal) => {
    /* Phase 1: Glitch — screen distortion ramps up */
    for (let i = 1; i <= 5; i++) {
      if (signal.aborted) return;
      setGlitchIntensity(i);
      await wait(300, signal);
    }

    if (signal.aborted) return;
    setPhase("warning");

    /* Phase 2: Warning — lines flood in */
    for (const line of warningLines) {
      if (signal.aborted) return;
      await wait(line.delay, signal);
      if (signal.aborted) return;
      setLines((prev) => [...prev, line]);
    }

    if (signal.aborted) return;
    await wait(500, signal);
    if (signal.aborted) return;

    /* Phase 3: Cascade — rapid-fire errors */
    setPhase("cascade");
    const cascadeErrors = [
      "SEGFAULT at 0x7fff3a001000", "KERNEL PANIC: not syncing",
      "CRITICAL: /dev/sda1 I/O error", "PROCESS watchdog KILLED (signal 9)",
      "fs: unable to mount /classified", "AUTH SERVICE: CORE DUMP",
      "STACK OVERFLOW at libc.so.6", "NET: sk_buff corruption detected",
      "MEM: page allocation failure", "FATAL: system state unrecoverable",
    ];
    for (const err of cascadeErrors) {
      if (signal.aborted) return;
      setLines((prev) => [...prev, { text: err, color: "text-term-error", delay: 0 }]);
      await wait(100, signal);
    }

    if (signal.aborted) return;
    await wait(400, signal);
    if (signal.aborted) return;

    /* Phase 4: Shutdown protocol */
    setPhase("shutdown");
    for (const line of shutdownLines) {
      if (signal.aborted) return;
      await wait(line.delay, signal);
      if (signal.aborted) return;
      setLines((prev) => [...prev, line]);
    }

    if (signal.aborted) return;

    /* Phase 5: Power off — screen goes black */
    setPhase("poweroff");
    await wait(1500, signal);
    if (signal.aborted) return;

    /* Phase 6: BSOD */
    setPhase("bsod");
    await wait(5000, signal);
    if (signal.aborted) return;

    /* Phase 7: Reboot */
    setPhase("reboot");
    await wait(800, signal);
    if (signal.aborted) return;

    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const controller = new AbortController();
    runSequence(controller.signal);
    return () => controller.abort();
  }, [runSequence]);

  /* Skip — press key during BSOD or after */
  useEffect(() => {
    if (skipped) return;
    if (phase !== "bsod" && phase !== "reboot") return;
    const handler = () => {
      setSkipped(true);
      onComplete();
    };
    window.addEventListener("keydown", handler);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("click", handler);
    };
  }, [skipped, phase, onComplete]);

  /* ── BSOD screen ── */
  if (phase === "bsod") {
    return (
      <div className="h-full w-full bg-[#0037DA] flex items-center justify-center bsod-flicker">
        <div className="max-w-[700px] px-8">
          <div className="text-white text-[80px] leading-none mb-8 font-sans">:(</div>
          <div className="text-white text-[22px] leading-relaxed mb-6 font-sans">
            Your device ran into a problem and needs to restart.
            We&apos;re just collecting some error info, and then we&apos;ll
            restart for you.
          </div>
          <div className="flex items-end gap-6 mb-8">
            <div className="w-[120px] h-[120px] flex items-center justify-center">
              {/* Fake QR code block */}
              <div className="grid grid-cols-8 gap-[2px]">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-[10px] h-[10px] ${
                      /* deterministic "random" pattern */
                      (i * 7 + 3) % 3 === 0 ? "bg-white" : "bg-[#0037DA]"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="text-white/70 text-[13px] font-sans leading-relaxed">
              <div>For more information about this issue and</div>
              <div>possible fixes, visit</div>
              <div className="mt-1">https://www.windows.com/stopcode</div>
              <div className="mt-3">If you call a support person, give them this info:</div>
              <div className="mt-1">Stop code: CRITICAL_PROCESS_DIED</div>
              <div>What failed: blacksite_containment.sys</div>
            </div>
          </div>
          <div className="text-white/50 text-[16px] font-sans">
            <span className="bsod-pct-counter" /> complete
          </div>
        </div>
      </div>
    );
  }

  /* ── Power off — black screen ── */
  if (phase === "poweroff" || phase === "reboot") {
    return (
      <div className={`h-full w-full bg-black transition-opacity duration-700 ${
        phase === "reboot" ? "opacity-0" : "opacity-100"
      }`} />
    );
  }

  /* ── Main breach animation ── */
  return (
    <div
      className={`h-full w-full bg-[#050508] overflow-hidden scanlines relative ${
        glitchIntensity >= 3 ? "breach-glitch" : ""
      }`}
      style={{
        /* CSS variable for glitch intensity */
        "--glitch-intensity": glitchIntensity,
      } as React.CSSProperties}
    >
      {/* Red alert border flash */}
      {(phase === "warning" || phase === "cascade") && (
        <div className="absolute inset-0 border-2 border-term-error/40 pointer-events-none breach-border-pulse z-10" />
      )}

      {/* Glitch overlay bars */}
      {glitchIntensity >= 2 && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {Array.from({ length: glitchIntensity }).map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 bg-term-error/10 breach-glitch-bar"
              style={{
                height: `${2 + i * 3}px`,
                top: `${15 + i * 20}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Header — alert bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-term-error/10 border-b border-term-error/30">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-term-error rounded-full animate-pulse" />
          <span className="font-pixel text-[8px] text-term-error tracking-widest">
            ■ SECURITY BREACH DETECTED
          </span>
        </div>
        <span className="font-mono text-[9px] text-term-error/60 cursor-blink">
          !! ALERT !!
        </span>
      </div>

      {/* Scrolling terminal output */}
      <div className="h-[calc(100%-36px)] overflow-hidden p-4">
        <div className="text-[11px] leading-[1.7] font-mono breach-scroll">
          {lines.map((line, i) => (
            <div key={i} className={`whitespace-pre ${line.color}`}>
              {line.text || "\u00A0"}
            </div>
          ))}
          <span className="cursor-blink text-term-error">_</span>
        </div>
      </div>

      {/* Flashing red vignette during cascade */}
      {phase === "cascade" && (
        <div className="absolute inset-0 pointer-events-none breach-vignette z-30" />
      )}
    </div>
  );
}

function wait(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, ms);
    signal.addEventListener("abort", () => { clearTimeout(timer); resolve(); }, { once: true });
  });
}
