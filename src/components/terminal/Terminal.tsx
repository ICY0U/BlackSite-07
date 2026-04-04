"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { executeCommand } from "@/engine/command-registry";
import "@/engine/init";
import { OutputLine } from "@/engine/types";

const PROMPT = "guest@BLACKSITE-07:~$ ";

interface HistoryEntry {
  type: "input" | "output";
  prompt?: string;
  text?: string;
  lines?: OutputLine[];
}

export default function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const queueRef = useRef<OutputLine[]>([]);
  const processingRef = useRef(false);

  /* Auto-scroll to bottom */
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });
  }, []);

  /* Focus input on click */
  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  /* Process output queue line by line */
  const processQueue = useCallback(async () => {
    if (processingRef.current) return;
    processingRef.current = true;

    while (queueRef.current.length > 0) {
      const line = queueRef.current.shift()!;

      /* Optional delay before showing */
      if (line.delay && line.delay > 0) {
        await new Promise((r) => setTimeout(r, line.delay));
      }

      /* Add line to history */
      setHistory((prev) => [...prev, { type: "output", lines: [line] }]);
      scrollToBottom();

      /* Small gap between lines for readability */
      if (queueRef.current.length > 0) {
        await new Promise((r) => setTimeout(r, 12));
      }
    }

    processingRef.current = false;
    setIsProcessing(false);
    scrollToBottom();
  }, [scrollToBottom]);

  /* Handle command submission */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (isProcessing) return;

      const raw = input.trim();

      /* Add input line to display */
      setHistory((prev) => [
        ...prev,
        { type: "input", prompt: PROMPT, text: raw },
      ]);

      setInput("");
      setHistoryIdx(-1);
      scrollToBottom();

      if (!raw) return;

      /* Save to command history */
      setCmdHistory((prev) => [raw, ...prev]);

      /* Handle clear */
      if (raw.toLowerCase() === "clear") {
        setHistory([]);
        return;
      }

      setIsProcessing(true);
      const result = await executeCommand(raw);

      if (result.lines.length > 0) {
        queueRef.current = [...result.lines];
        processQueue();
      } else {
        setIsProcessing(false);
      }
    },
    [input, isProcessing, processQueue, scrollToBottom],
  );

  /* Arrow keys for command history */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const newIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
        setHistoryIdx(newIdx);
        if (cmdHistory[newIdx] !== undefined) {
          setInput(cmdHistory[newIdx]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const newIdx = historyIdx - 1;
        if (newIdx < 0) {
          setHistoryIdx(-1);
          setInput("");
        } else {
          setHistoryIdx(newIdx);
          setInput(cmdHistory[newIdx]);
        }
      }
    },
    [historyIdx, cmdHistory],
  );

  /* Focus input on mount */
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /* Re-focus after processing completes */
  useEffect(() => {
    if (!isProcessing) {
      inputRef.current?.focus();
    }
  }, [isProcessing]);

  return (
    <div
      className="h-full w-full flex flex-col scanlines cursor-text"
      onClick={focusInput}
    >
      {/* Output area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto terminal-scroll p-4 pb-0 text-[13px] leading-[1.7]"
      >
        {history.map((entry, i) => {
          if (entry.type === "input") {
            return (
              <div key={i} className="whitespace-pre-wrap break-all">
                <span className="text-term-prompt">{entry.prompt}</span>
                <span className="text-term-bright">{entry.text}</span>
              </div>
            );
          }
          return (
            <div key={i}>
              {entry.lines?.map((ln) => (
                <div
                  key={ln.id}
                  className={`whitespace-pre-wrap break-all ${ln.color ?? "text-term-text"}`}
                >
                  {ln.text}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Input line */}
      <form onSubmit={handleSubmit} className="flex p-4 pt-1">
        <span className="text-term-prompt text-[13px] leading-[1.7] shrink-0">
          {PROMPT}
        </span>
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            className="w-full bg-transparent text-term-bright text-[13px] leading-[1.7] outline-none caret-transparent font-mono"
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          {/* Custom block cursor */}
          <span
            className="absolute top-0 text-[13px] leading-[1.7] pointer-events-none"
            style={{ left: `${input.length}ch` }}
          >
            <span className={`cursor-blink ${isProcessing ? "opacity-0" : ""} inline-block w-[7.8px] h-[18px] bg-term-prompt/70 -mb-[3px]`} />
          </span>
        </div>
      </form>
    </div>
  );
}
