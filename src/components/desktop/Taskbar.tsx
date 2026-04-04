"use client";

interface WindowInfo {
  id: string;
  title: string;
  minimized: boolean;
}

interface Props {
  time: string;
  date: string;
  windows: WindowInfo[];
  onWindowClick: (id: string) => void;
}

export default function Taskbar({ time, date, windows, onWindowClick }: Props) {
  return (
    <div className="h-[36px] bg-os-taskbar border-t-2 border-os-panel-border flex items-center px-2 gap-1 shrink-0 relative z-[999]">
      {/* Start/System button */}
      <button className="pixel-btn font-pixel text-[7px] text-os-accent tracking-wider px-3 py-1">
        BS-07
      </button>

      {/* Separator */}
      <div className="w-px h-5 bg-os-panel-border mx-1" />

      {/* Open windows */}
      <div className="flex-1 flex items-center gap-1 overflow-x-auto">
        {windows.map((win) => (
          <button
            key={win.id}
            onClick={() => onWindowClick(win.id)}
            className={`pixel-btn font-pixel text-[6px] tracking-wider px-3 py-1 max-w-[160px] truncate ${
              win.minimized ? "text-os-text-dim" : "text-os-text"
            }`}
          >
            {win.title}
          </button>
        ))}
      </div>

      {/* System tray */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Connection indicator */}
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-term-success animate-pulse" />
          <span className="font-vt text-[13px] text-os-text-dim">
            CONNECTED
          </span>
        </div>

        {/* Separator */}
        <div className="w-px h-5 bg-os-panel-border" />

        {/* Clock */}
        <div className="pixel-inset bg-term-bg px-2 py-0.5">
          <span className="font-vt text-[14px] text-term-success tracking-wider">
            {date} {time}
          </span>
        </div>
      </div>
    </div>
  );
}
