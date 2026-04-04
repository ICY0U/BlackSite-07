"use client";

import { useState, useEffect, useCallback } from "react";

interface BootLine {
  text: string;
  delay: number;
  color?: string;
}

interface BootSequenceProps {
  onComplete: () => void;
  allowSkip?: boolean;
}

const bootLines: BootLine[] = [
  { text: "", delay: 500 },
  { text: "BIOS POST... OK", delay: 60, color: "text-term-dim" },
  { text: "Memory: 16384 MB ... OK", delay: 40, color: "text-term-dim" },
  { text: "CPU: x86_64 ... OK", delay: 30, color: "text-term-dim" },
  { text: "", delay: 300 },
  { text: "loading kernel...", delay: 80, color: "text-term-text" },
  { text: "[    0.000000] Linux version 6.1.0-blacksite", delay: 60, color: "text-term-dim" },
  { text: "[    0.004521] Command line: BOOT_IMAGE=/vmlinuz root=/dev/sda1", delay: 40, color: "text-term-dim" },
  { text: "[    0.012983] x86/fpu: Supporting XSAVE feature", delay: 30, color: "text-term-dim" },
  { text: "[    0.038291] Booting paravirtualized kernel on bare hardware", delay: 30, color: "text-term-dim" },
  { text: "", delay: 200 },
  { text: "[    1.203847] NET: Registered PF_INET6 protocol", delay: 40, color: "text-term-dim" },
  { text: "[    1.448291] EXT4-fs (sda1): mounted filesystem", delay: 40, color: "text-term-dim" },
  { text: "", delay: 400 },
  { text: "BLACKSITE-07 DEFENSE NETWORK", delay: 20, color: "text-term-bright" },
  { text: "CLASSIFICATION: TOP SECRET // SCI // NOFORN", delay: 20, color: "text-term-error" },
  { text: "UNAUTHORIZED ACCESS IS A FEDERAL OFFENSE", delay: 20, color: "text-term-error" },
  { text: "", delay: 300 },
  { text: "initializing network interface... ", delay: 80, color: "text-term-text" },
  { text: "  eth0: 10.7.0.2/24 UP", delay: 60, color: "text-term-dim" },
  { text: "  routing table loaded", delay: 40, color: "text-term-dim" },
  { text: "", delay: 200 },
  { text: "scanning local network...", delay: 100, color: "text-term-text" },
  { text: "  node AUTH_NODE ............. [SECURED]", delay: 80, color: "text-term-dim" },
  { text: "  node ARCHIVE_CLUSTER ....... [SECURED]", delay: 70, color: "text-term-dim" },
  { text: "  node SURVEILLANCE_CORE ..... [SECURED]", delay: 60, color: "text-term-dim" },
  { text: "  node AI_RESEARCH ........... [OFFLINE]", delay: 80, color: "text-term-warn" },
  { text: "  node CONTAINMENT_LAYER ..... [UNKNOWN]", delay: 100, color: "text-term-error" },
  { text: "", delay: 400 },
  { text: "5 nodes found. 2 anomalies detected.", delay: 60, color: "text-term-text" },
  { text: "", delay: 300 },
  { text: "establishing session...", delay: 80, color: "text-term-text" },
  { text: "session id: 7f3a-0c91-44e2", delay: 40, color: "text-term-dim" },
  { text: "access level: GUEST (restricted)", delay: 40, color: "text-term-warn" },
  { text: "", delay: 200 },
  { text: "connection established.", delay: 40, color: "text-term-success" },
  { text: "", delay: 200 },
  { text: "loading login service...", delay: 60, color: "text-term-dim" },
  { text: "", delay: 100 },
];

export default function BootSequence({ onComplete, allowSkip = true }: BootSequenceProps) {
  const [lines, setLines] = useState<{ text: string; color: string }[]>([]);
  const [done, setDone] = useState(false);
  const [skipped, setSkipped] = useState(false);

  const runBoot = useCallback(async (signal: AbortSignal) => {
    for (let i = 0; i < bootLines.length; i++) {
      if (signal.aborted) return;

      await new Promise<void>((resolve) => {
        const timer = setTimeout(resolve, bootLines[i].delay);
        signal.addEventListener("abort", () => {
          clearTimeout(timer);
          resolve();
        }, { once: true });
      });

      if (signal.aborted) return;

      if (bootLines[i].text !== "") {
        setLines((prev) => [...prev, {
          text: bootLines[i].text,
          color: bootLines[i].color ?? "text-term-text",
        }]);
      } else {
        setLines((prev) => [...prev, { text: "", color: "" }]);
      }
    }

    if (!signal.aborted) {
      setDone(true);
    }
  }, []);

  /* Skip on any keypress */
  useEffect(() => {
    if (!allowSkip) return;
    const handleKey = () => {
      if (!done && !skipped) {
        setSkipped(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [allowSkip, done, skipped]);

  /* If skipped, dump all lines instantly */
  useEffect(() => {
    if (!allowSkip) return;
    if (skipped && !done) {
      setLines(
        bootLines
          .map((l) => ({ text: l.text, color: l.color ?? "text-term-text" }))
      );
      setDone(true);
    }
  }, [allowSkip, skipped, done]);

  /* Run boot sequence */
  useEffect(() => {
    const controller = new AbortController();
    runBoot(controller.signal);
    return () => controller.abort();
  }, [runBoot]);

  /* When done, hand off to terminal */
  useEffect(() => {
    if (done) {
      const timer = setTimeout(onComplete, 400);
      return () => clearTimeout(timer);
    }
  }, [done, onComplete]);

  return (
    <div className="h-full w-full p-4 overflow-hidden scanlines">
      <div className="text-[13px] leading-[1.7]">
        {lines.map((line, i) => (
          <div key={i} className={`whitespace-pre ${line.color}`}>
            {line.text || "\u00A0"}
          </div>
        ))}
        {!done && (
          <span className="cursor-blink text-term-prompt">_</span>
        )}
      </div>
    </div>
  );
}
