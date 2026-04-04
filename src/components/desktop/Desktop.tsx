"use client";

import { useState, useEffect } from "react";
import Taskbar from "./Taskbar";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import Terminal from "@/components/terminal/Terminal";
import { desktopFiles, DesktopFile } from "@/content/desktop-files";

interface WindowState {
  id: string;
  title: string;
  component: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  zIndex: number;
}

let nextZ = 10;

export default function Desktop() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
      );
      setDate(
        now.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })
      );
    };
    update();
    const interval = setInterval(update, 10000);
    return () => clearInterval(interval);
  }, []);

  const bringToFront = (id: string) => {
    nextZ++;
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: nextZ } : w)));
  };

  const openWindow = (id: string, title: string, component: React.ReactNode, width = 48, height = 52) => {
    const existing = windows.find((w) => w.id === id);
    if (existing) {
      bringToFront(id);
      if (existing.minimized) {
        setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: false } : w)));
      }
      return;
    }
    nextZ++;
    const offsetX = 40 + (windows.length % 5) * 30;
    const offsetY = 30 + (windows.length % 5) * 25;
    setWindows((prev) => [
      ...prev,
      { id, title, component, x: offsetX, y: offsetY, width, height, minimized: false, zIndex: nextZ },
    ]);
  };

  const closeWindow = (id: string) => setWindows((prev) => prev.filter((w) => w.id !== id));
  const minimizeWindow = (id: string) => setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  const moveWindow = (id: string, x: number, y: number) => setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)));

  const openTerminal = () => openWindow("terminal", "TERMINAL — BLACKSITE-07", <Terminal />, 55, 60);

  const openFile = (file: DesktopFile) => {
    openWindow(
      file.id,
      file.windowTitle,
      <div className="h-full overflow-y-auto terminal-scroll bg-os-window-bg">
        {file.classification && (
          <div className={`px-4 py-1.5 text-center font-mono text-[10px] tracking-[0.3em] font-bold border-b border-os-window-border ${
            file.classification === "TOP SECRET" ? "bg-term-error/20 text-term-error" :
            file.classification === "SECRET" ? "bg-term-warn/20 text-term-warn" :
            file.classification === "CONFIDENTIAL" ? "bg-term-info/20 text-term-info" :
            "bg-term-dim/10 text-term-dim"
          }`}>
            {file.classification} // {file.compartment ?? "NOFORN"}
          </div>
        )}
        <div
          className="p-5 font-mono text-[12px] leading-[1.8] text-term-text whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: file.content }}
        />
      </div>,
      file.windowWidth ?? 650,
      file.windowHeight ?? 480,
    );
  };

  return (
    <div className="h-full w-full flex flex-col relative overflow-hidden scanlines desktop-cursor-scope">
      {/* Government wallpaper */}
      <div className="absolute inset-0 bg-[#0a0c14]" />

      {/* Topographic/classified grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(233,69,96,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(233,69,96,0.4) 1px, transparent 1px),
            linear-gradient(rgba(233,69,96,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(233,69,96,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px, 100px 100px, 20px 20px, 20px 20px",
        }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.015] select-none">
        <div className="font-mono text-[120px] font-bold text-term-error tracking-[0.2em] rotate-[-15deg]">
          CLASSIFIED
        </div>
      </div>

      {/* Top classification bar */}
      <div className="h-[24px] bg-term-error/90 flex items-center justify-center shrink-0 relative z-[998]">
        <span className="font-mono text-[9px] text-white font-bold tracking-[0.4em]">
          TOP SECRET // SCI // NOFORN — BLACKSITE-07
        </span>
      </div>

      {/* Desktop area */}
      <div className="flex-1 relative p-3 overflow-hidden">
        {/* Desktop icons - column-first flow like a real desktop */}
        <div className="flex flex-col flex-wrap content-start gap-y-1 gap-x-0 h-full">
          {/* Primary tools */}
          <DesktopIcon label="Terminal" icon="terminal" onClick={openTerminal} />
          <DesktopIcon label="Files" icon="files" onClick={() => openFile(desktopFiles.fileManager)} />
          <DesktopIcon label="Network" icon="network" onClick={() => openFile(desktopFiles.networkMap)} />

          {/* Documents */}
          <DesktopIcon label="README.txt" icon="document" onClick={() => openFile(desktopFiles.readme)} />
          <DesktopIcon label="MEMO_2019.pdf" icon="classified" onClick={() => openFile(desktopFiles.memo2019)} />
          <DesktopIcon label="personnel.db" icon="database" onClick={() => openFile(desktopFiles.personnel)} />
          <DesktopIcon label="incident_report" icon="restricted" onClick={() => openFile(desktopFiles.incidentReport)} />
          <DesktopIcon label="budget_fy19.xls" icon="spreadsheet" onClick={() => openFile(desktopFiles.budget)} />
          <DesktopIcon label="sat_img_0371" icon="image" onClick={() => openFile(desktopFiles.satelliteImg)} />
          <DesktopIcon label="PROJECT_PROMETHEUS" icon="topsecret" onClick={() => openFile(desktopFiles.prometheus)} />
          <DesktopIcon label="containment_spec" icon="classified" onClick={() => openFile(desktopFiles.containmentSpec)} />
          <DesktopIcon label="S.Chen_notes" icon="document" onClick={() => openFile(desktopFiles.chenNotes)} />
          <DesktopIcon label="audio_log_07" icon="audio" onClick={() => openFile(desktopFiles.audioLog)} />
          <DesktopIcon label="site_map.png" icon="image" onClick={() => openFile(desktopFiles.siteMap)} />
          <DesktopIcon label="EYES_ONLY.enc" icon="encrypted" onClick={() => openFile(desktopFiles.eyesOnly)} />
        </div>

        {/* Windows */}
        {windows.map((win) =>
          win.minimized ? null : (
            <Window
              key={win.id}
              id={win.id}
              title={win.title}
              x={win.x}
              y={win.y}
              width={win.width}
              height={win.height}
              zIndex={win.zIndex}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onFocus={() => bringToFront(win.id)}
              onMove={(x, y) => moveWindow(win.id, x, y)}
            >
              {win.component}
            </Window>
          )
        )}
      </div>

      {/* Bottom classification bar */}
      <div className="h-[2px] bg-term-error/40 shrink-0" />

      {/* Taskbar */}
      <Taskbar
        time={time}
        date={date}
        windows={windows}
        onWindowClick={(id) => {
          const win = windows.find((w) => w.id === id);
          if (win?.minimized) {
            setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: false } : w)));
          }
          bringToFront(id);
        }}
      />
    </div>
  );
}
