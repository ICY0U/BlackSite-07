"use client";

import { useState, useEffect, useCallback } from "react";

interface SplashLine {
  text: string;
  delay: number;
  color?: string;
  align?: "center" | "left";
  size?: string;
  bold?: boolean;
  gap?: number; /* extra bottom margin in px */
}

const warningSequence: SplashLine[] = [
  /* DOD Classification banner */
  { text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", delay: 100, color: "text-term-error", align: "center" },
  { text: "", delay: 50 },
  { text: "UNITED STATES DEPARTMENT OF DEFENSE", delay: 60, color: "text-term-bright", align: "center", size: "text-[14px]", bold: true },
  { text: "DEFENSE ADVANCED RESEARCH PROJECTS AGENCY", delay: 60, color: "text-term-bright", align: "center", size: "text-[12px]" },
  { text: "", delay: 50 },
  { text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", delay: 100, color: "text-term-error", align: "center" },
  { text: "", delay: 300 },

  /* Classification */
  { text: "╔══════════════════════════════════════════════════════════════╗", delay: 60, color: "text-term-error", align: "center" },
  { text: "║                                                              ║", delay: 20, color: "text-term-error", align: "center" },
  { text: "║         T O P   S E C R E T  //  S C I  //  N O F O R N     ║", delay: 20, color: "text-term-error", align: "center", bold: true },
  { text: "║                                                              ║", delay: 20, color: "text-term-error", align: "center" },
  { text: "╚══════════════════════════════════════════════════════════════╝", delay: 60, color: "text-term-error", align: "center" },
  { text: "", delay: 400 },

  /* Warning text */
  { text: "W A R N I N G", delay: 100, color: "text-term-warn", align: "center", size: "text-[16px]", bold: true },
  { text: "", delay: 200 },
  { text: "This is a Department of Defense computer system. This computer", delay: 30, color: "text-term-text", align: "center" },
  { text: "system, including all related equipment, networks, and network", delay: 30, color: "text-term-text", align: "center" },
  { text: "devices, is provided for U.S. Government authorized use only.", delay: 30, color: "text-term-text", align: "center" },
  { text: "", delay: 100 },
  { text: "Unauthorized access to this system is in violation of", delay: 30, color: "text-term-text", align: "center" },
  { text: "U.S.C. Title 18, Section 1030 (Computer Fraud and Abuse Act)", delay: 30, color: "text-term-text", align: "center" },
  { text: "and may result in criminal prosecution under federal law.", delay: 30, color: "text-term-text", align: "center" },
  { text: "", delay: 100 },
  { text: "All activity on this system is monitored and recorded.", delay: 30, color: "text-term-warn", align: "center" },
  { text: "Unauthorized attempts to access, modify, or destroy data", delay: 30, color: "text-term-warn", align: "center" },
  { text: "are strictly prohibited and will be prosecuted.", delay: 30, color: "text-term-warn", align: "center" },
  { text: "", delay: 500 },

  /* Facility designation */
  { text: "───────────────────────────────────────────────────", delay: 80, color: "text-term-dim", align: "center" },
  { text: "", delay: 100 },
  { text: "FACILITY DESIGNATION", delay: 40, color: "text-os-text-dim", align: "center", size: "text-[10px]" },
  { text: "BLACKSITE-07", delay: 40, color: "text-term-error", align: "center", size: "text-[20px]", bold: true },
  { text: "ADVANCED ARTIFICIAL INTELLIGENCE RESEARCH DIVISION", delay: 40, color: "text-term-dim", align: "center", size: "text-[10px]" },
  { text: "", delay: 100 },
  { text: "CLEARANCE REQUIRED: TS/SCI LEVEL 5", delay: 40, color: "text-term-error", align: "center" },
  { text: "COMPARTMENT: ECHO-SEVEN // PROMETHEUS", delay: 40, color: "text-term-error", align: "center" },
  { text: "", delay: 100 },
  { text: "SITE STATUS:  ██ PARTIALLY OPERATIONAL", delay: 60, color: "text-term-warn", align: "center" },
  { text: "LAST AUDIT:   2019-03-14 02:41:33 UTC", delay: 40, color: "text-term-dim", align: "center" },
  { text: "AUDIT STATUS: OVERDUE (2,573 DAYS)", delay: 40, color: "text-term-error", align: "center" },
  { text: "", delay: 100 },
  { text: "───────────────────────────────────────────────────", delay: 80, color: "text-term-dim", align: "center" },
  { text: "", delay: 600 },

  { text: "PRESS ANY KEY TO CONTINUE", delay: 40, color: "text-term-dim", align: "center" },
];

export default function ClassifiedSplash({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<SplashLine[]>([]);
  const [done, setDone] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const runSequence = useCallback(async (signal: AbortSignal) => {
    for (let i = 0; i < warningSequence.length; i++) {
      if (signal.aborted) return;

      await new Promise<void>((resolve) => {
        const timer = setTimeout(resolve, warningSequence[i].delay);
        signal.addEventListener("abort", () => { clearTimeout(timer); resolve(); }, { once: true });
      });

      if (signal.aborted) return;
      setLines((prev) => [...prev, warningSequence[i]]);
    }

    if (!signal.aborted) {
      setDone(true);
      setWaiting(true);
    }
  }, []);

  /* Run sequence */
  useEffect(() => {
    const controller = new AbortController();
    runSequence(controller.signal);
    return () => controller.abort();
  }, [runSequence]);

  /* Wait for keypress after sequence completes */
  useEffect(() => {
    if (!waiting) return;
    const handler = () => onComplete();
    window.addEventListener("keydown", handler);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("click", handler);
    };
  }, [waiting, onComplete]);

  /* Allow skip during animation */
  useEffect(() => {
    if (done) return;
    const handler = () => {
      setLines([...warningSequence]);
      setDone(true);
      setWaiting(true);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [done]);

  return (
    <div className="h-full w-full flex items-center justify-center bg-[#050508] scanlines overflow-hidden">
      <div className="w-full max-w-[700px] px-6">
        <div className="text-[12px] leading-[1.6] font-mono">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`whitespace-pre ${line.color ?? "text-term-text"} ${
                line.align === "center" ? "text-center" : ""
              } ${line.size ?? "text-[12px]"} ${line.bold ? "font-bold" : ""}`}
            >
              {line.text || "\u00A0"}
            </div>
          ))}
          {waiting && (
            <div className="text-center mt-2">
              <span className="cursor-blink text-term-dim">_</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
