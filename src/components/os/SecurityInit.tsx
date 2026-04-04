"use client";

import { useState, useEffect, useCallback } from "react";

type ScanPhase = "power" | "calibrate" | "align" | "scanning" | "analyzing" | "verified" | "fadeout";

const biometricData = [
  "PUPIL DIAMETER: 4.2mm",
  "IRIS PATTERN: 2048-BIT HASH",
  "RETINAL VASCULATURE: MAPPED",
  "OPTIC DISC RATIO: 0.31",
  "FOVEAL REFLEX: NOMINAL",
  "PATTERN ENTROPY: 97.3%",
];

/* ASCII art eyes — the "subject" being scanned */
const eyeArt = [
  "        .-\"\"\"\"\"-.          .-\"\"\"\"\"-.        ",
  "      .'         `.      .'         `.      ",
  "     /   O     O   \\    /   O     O   \\    ",
  "    |   ___________  |  |  ___________  |   ",
  "    |  /     @     \\ |  | /     @     \\ |   ",
  "    | |      @      ||  ||      @      ||   ",
  "    |  \\     @     / |  | \\     @     / |   ",
  "    |   ~~~~~~~~~~~  |  |  ~~~~~~~~~~~  |   ",
  "     \\             /    \\             /     ",
  "      `.         .'      `.         .'      ",
  "        '-.....-'          '-.....-'        ",
];

interface SecurityInitProps {
  onComplete: () => void;
  allowSkip?: boolean;
}

export default function SecurityInit({ onComplete, allowSkip = true }: SecurityInitProps) {
  const [phase, setPhase] = useState<ScanPhase>("power");
  const [scanPct, setScanPct] = useState(0);
  const [scanLineY, setScanLineY] = useState(0);
  const [dataLines, setDataLines] = useState<string[]>([]);
  const [matchPct, setMatchPct] = useState(0);
  const [skipped, setSkipped] = useState(false);

  const runSequence = useCallback(async (signal: AbortSignal) => {
    /* Phase 1: Power on */
    await wait(600, signal);
    if (signal.aborted) return;
    setPhase("calibrate");

    /* Phase 2: Calibration */
    await wait(1000, signal);
    if (signal.aborted) return;

    /* Phase 3: Eyes appear (subject aligns) */
    setPhase("align");
    await wait(1800, signal);
    if (signal.aborted) return;

    /* Phase 4: Scan — laser sweeps across the eyes */
    setPhase("scanning");
    for (let pct = 0; pct <= 100; pct += 2) {
      if (signal.aborted) return;
      setScanPct(pct);
      setScanLineY(pct);

      const lineIndex = Math.floor((pct / 100) * biometricData.length);
      if (lineIndex < biometricData.length) {
        setDataLines((prev) =>
          prev.length <= lineIndex ? [...prev, biometricData[lineIndex]] : prev
        );
      }

      await wait(40, signal);
    }

    if (signal.aborted) return;
    setPhase("analyzing");

    /* Phase 4: Match percentage climbs */
    for (let m = 0; m <= 100; m += 1) {
      if (signal.aborted) return;
      setMatchPct(m);
      await wait(12, signal);
    }

    if (signal.aborted) return;
    await wait(400, signal);
    if (signal.aborted) return;
    setPhase("verified");

    await wait(1800, signal);
    if (signal.aborted) return;
    setPhase("fadeout");

    await wait(600, signal);
    if (signal.aborted) return;
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const controller = new AbortController();
    runSequence(controller.signal);
    return () => controller.abort();
  }, [runSequence]);

  /* Skip */
  useEffect(() => {
    if (!allowSkip) return;
    if (skipped) return;
    const handler = () => {
      setSkipped(true);
      setScanPct(100);
      setDataLines([...biometricData]);
      setMatchPct(100);
      setPhase("fadeout");
      setTimeout(onComplete, 400);
    };
    window.addEventListener("keydown", handler);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("click", handler);
    };
  }, [allowSkip, skipped, onComplete]);

  const isScanning = phase === "scanning";
  const isVerified = phase === "verified";
  const showEyes = phase === "align" || phase === "scanning" || phase === "analyzing" || phase === "verified";
  const accentColor = isVerified ? "term-success" : "term-error";

  return (
    <div
      className={`h-full w-full flex flex-col items-center justify-center bg-[#030306] scanlines overflow-hidden transition-opacity duration-500 ${
        phase === "fadeout" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Top HUD bar */}
      <div className="absolute top-0 left-0 right-0 flex justify-between px-6 py-3">
        <div className="font-mono text-[9px] text-term-error/40">
          ■ DARPA // BIOMETRIC AUTH SYS v4.7.2
        </div>
        <div className="font-mono text-[9px] text-term-error/40 classification-flash">
          TOP SECRET // SCI // NOFORN
        </div>
      </div>

      {/* Scanner viewport */}
      <div className="relative w-[480px] mb-6">

        {/* Viewport frame */}
        <div className={`pixel-inset bg-[#080810] p-1 relative overflow-hidden ${
          isVerified ? "border-term-success/30" : ""
        }`}>
          {/* Scanner header bar */}
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-term-error/10 bg-[#0a0a14]">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${
                phase === "power" ? "bg-term-dim/30" :
                isVerified ? "bg-term-success animate-pulse" : "bg-term-error animate-pulse"
              }`} />
              <span className="font-pixel text-[7px] text-term-dim/60 tracking-widest">
                RETINAL SCANNER — CAM 01
              </span>
            </div>
            <span className="font-mono text-[8px] text-term-dim/30">
              {isVerified ? "■ LOCKED" : "● REC"}
            </span>
          </div>

          {/* Eye viewport area */}
          <div className="relative h-[180px] flex items-center justify-center overflow-hidden">

            {/* Power-on state — just a dot */}
            {phase === "power" && (
              <div className="w-2 h-2 bg-term-error/40 rounded-full pupil-pulse" />
            )}

            {/* Calibration grid */}
            {phase === "calibrate" && (
              <div className="text-center security-fade-in">
                <div className="font-mono text-[10px] text-term-error/30 mb-2">+ + + + + + + + + +</div>
                <div className="font-mono text-[10px] text-term-error/30 mb-2">+ + + + + + + + + +</div>
                <div className="font-mono text-[10px] text-term-error/40 mb-2">+ + + + ◉ + + + + +</div>
                <div className="font-mono text-[10px] text-term-error/30 mb-2">+ + + + + + + + + +</div>
                <div className="font-mono text-[10px] text-term-error/30">+ + + + + + + + + +</div>
                <div className="font-pixel text-[7px] text-term-warn/50 mt-3 cursor-blink">
                  ALIGN EYES WITH RETICLE
                </div>
              </div>
            )}

            {/* The ASCII eyes — subject in the scanner */}
            {showEyes && (
              <pre className={`font-mono text-[10px] leading-[1.4] select-none whitespace-pre transition-opacity duration-500 ${
                phase === "align" ? "eye-slide-in" : ""
              } ${
                isVerified ? "text-term-success/60" : "text-term-error/50"
              }`}>
{eyeArt.join("\n")}
              </pre>
            )}

            {/* Scan laser line sweeps vertically */}
            {isScanning && (
              <div
                className="absolute left-0 right-0 h-[2px] pointer-events-none transition-all duration-75"
                style={{
                  top: `${scanLineY}%`,
                  background: `linear-gradient(90deg, transparent 5%, var(--color-term-error) 20%, var(--color-term-error) 80%, transparent 95%)`,
                  boxShadow: "0 0 8px var(--color-term-error), 0 0 20px rgba(255,92,87,0.3)",
                  opacity: 0.7,
                }}
              />
            )}

            {/* Scan grid overlay */}
            {(phase === "scanning" || phase === "analyzing") && (
              <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.06 }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="absolute left-0 right-0 border-t border-term-error" style={{ top: `${(i + 1) * 7.7}%` }} />
                ))}
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="absolute top-0 bottom-0 border-l border-term-error" style={{ left: `${(i + 1) * 6.25}%` }} />
                ))}
              </div>
            )}

            {/* Verified overlay */}
            {isVerified && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#030306]/60 security-fade-in">
                <div className="text-center">
                  <div className="font-mono text-[32px] text-term-success/80 mb-1">✓</div>
                  <div className="font-pixel text-[8px] text-term-success tracking-[0.3em]">MATCH CONFIRMED</div>
                </div>
              </div>
            )}

            {/* Corner targeting brackets inside viewport */}
            <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] pointer-events-none" viewBox="0 0 100 100" fill="none">
              <path d="M2 15 L2 2 L15 2" stroke={`var(--color-${accentColor})`} strokeWidth="0.5" opacity="0.4" />
              <path d="M85 2 L98 2 L98 15" stroke={`var(--color-${accentColor})`} strokeWidth="0.5" opacity="0.4" />
              <path d="M2 85 L2 98 L15 98" stroke={`var(--color-${accentColor})`} strokeWidth="0.5" opacity="0.4" />
              <path d="M85 98 L98 98 L98 85" stroke={`var(--color-${accentColor})`} strokeWidth="0.5" opacity="0.4" />
              {/* Crosshairs */}
              <line x1="50" y1="0" x2="50" y2="6" stroke={`var(--color-${accentColor})`} strokeWidth="0.3" opacity="0.2" />
              <line x1="50" y1="94" x2="50" y2="100" stroke={`var(--color-${accentColor})`} strokeWidth="0.3" opacity="0.2" />
              <line x1="0" y1="50" x2="6" y2="50" stroke={`var(--color-${accentColor})`} strokeWidth="0.3" opacity="0.2" />
              <line x1="94" y1="50" x2="100" y2="50" stroke={`var(--color-${accentColor})`} strokeWidth="0.3" opacity="0.2" />
            </svg>
          </div>

          {/* Scanner footer status */}
          <div className="flex items-center justify-between px-3 py-1 border-t border-term-error/10 bg-[#0a0a14]">
            <span className="font-mono text-[8px] text-term-dim/40">
              SUBJ: UNKNOWN
            </span>
            <span className={`font-pixel text-[7px] tracking-wider ${
              isVerified ? "text-term-success/60" : "text-term-error/40"
            }`}>
              {phase === "power" && "STANDBY"}
              {phase === "calibrate" && "CALIBRATING"}
              {phase === "align" && "SUBJECT DETECTED"}
              {phase === "scanning" && `SCANNING ${scanPct}%`}
              {phase === "analyzing" && "PROCESSING"}
              {phase === "verified" && "VERIFIED"}
              {phase === "fadeout" && "COMPLETE"}
            </span>
          </div>
        </div>
      </div>

      {/* Status label */}
      <div className="text-center mb-4">
        <div className={`font-pixel text-[9px] tracking-[0.4em] mb-2 ${
          isVerified ? "text-term-success" : "text-term-error/70"
        }`}>
          {phase === "power" && "INITIALIZING SCANNER"}
          {phase === "calibrate" && "CALIBRATING OPTICS"}
          {phase === "scanning" && "RETINAL SCAN IN PROGRESS"}
          {phase === "analyzing" && "ANALYZING BIOMETRIC DATA"}
          {phase === "verified" && "IDENTITY VERIFIED"}
          {phase === "fadeout" && "ACCESS GRANTED"}
        </div>

        {/* Scan progress bar */}
        {(phase === "scanning" || phase === "analyzing" || phase === "verified") && (
          <div className="w-[260px] mx-auto">
            <div className="h-[3px] bg-term-dim/10 relative overflow-hidden">
              <div
                className={`h-full transition-all duration-100 ${
                  isVerified ? "bg-term-success/70" : "bg-term-error/50"
                }`}
                style={{ width: `${scanPct}%` }}
              />
              {isScanning && (
                <div className="absolute inset-0 scan-bar-shimmer" />
              )}
            </div>
            <div className="flex justify-between mt-1">
              <span className="font-mono text-[8px] text-term-dim/50">0%</span>
              <span className={`font-mono text-[8px] ${isVerified ? "text-term-success/70" : "text-term-error/50"}`}>
                {scanPct}%
              </span>
              <span className="font-mono text-[8px] text-term-dim/50">100%</span>
            </div>
          </div>
        )}
      </div>

      {/* Biometric data readout — left/right columns */}
      <div className="w-[460px] flex gap-8 mb-4">
        {/* Left: scan data */}
        <div className="flex-1 space-y-0.5">
          {dataLines.map((line, i) => (
            <div key={i} className="font-mono text-[9px] text-term-dim/60 security-fade-in flex items-center gap-2">
              <span className="text-term-error/30">▸</span>
              {line}
            </div>
          ))}
        </div>

        {/* Right: match analysis */}
        <div className="flex-1">
          {phase === "analyzing" || phase === "verified" ? (
            <div className="security-fade-in space-y-1">
              <div className="font-mono text-[9px] text-term-dim/50">PATTERN MATCH</div>
              {/* Match bar */}
              <div className="h-[6px] bg-term-dim/10 w-full relative overflow-hidden">
                <div
                  className={`h-full transition-all duration-75 ${
                    matchPct >= 95 ? "bg-term-success/60" : "bg-term-warn/50"
                  }`}
                  style={{ width: `${matchPct}%` }}
                />
              </div>
              <div className={`font-mono text-[14px] font-bold ${
                matchPct >= 95 ? "text-term-success" : "text-term-warn"
              }`}>
                {matchPct.toFixed(1)}%
              </div>
              <div className="font-mono text-[8px] text-term-dim/40 mt-1">
                THRESHOLD: 95.0%
              </div>
              {isVerified && (
                <div className="font-mono text-[9px] text-term-success mt-1 security-fade-in">
                  ■ MATCH CONFIRMED
                </div>
              )}
            </div>
          ) : (
            <div className="font-mono text-[9px] text-term-dim/20">
              AWAITING SCAN DATA...
            </div>
          )}
        </div>
      </div>

      {/* Classification footer */}
      <div className="flex items-center gap-3 mt-2">
        <div className="w-8 h-[1px] bg-term-error/20" />
        <div className="font-pixel text-[7px] text-term-error/30 tracking-[0.3em]">
          BLACKSITE-07 // BIOMETRIC SECURITY SUBSYSTEM
        </div>
        <div className="w-8 h-[1px] bg-term-error/20" />
      </div>

      {/* Verified — access granted banner */}
      {isVerified && (
        <div className="mt-6 text-center security-fade-in">
          <div className="font-pixel text-[10px] text-term-success tracking-[0.3em] security-glow-green">
            ■ ■ ■  ACCESS GRANTED  ■ ■ ■
          </div>
          <div className="font-mono text-[10px] text-term-dim/50 mt-1">
            LOADING AUTHENTICATION MODULE...
          </div>
        </div>
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
