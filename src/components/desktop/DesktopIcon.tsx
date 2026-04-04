"use client";

export type IconType =
  | "terminal" | "files" | "network" | "document"
  | "classified" | "restricted" | "topsecret" | "encrypted"
  | "database" | "spreadsheet" | "image" | "audio";

interface Props {
  label: string;
  icon: IconType;
  onClick: () => void;
}

function PixelIcon({ type }: { type: IconType }) {
  const s = 38;

  const icons: Record<IconType, React.ReactNode> = {
    terminal: (
      <svg width={s} height={s} viewBox="0 0 16 16" className="pixel-perfect">
        <rect x="1" y="1" width="14" height="10" fill="#0c0c0c" stroke="#5af78e" strokeWidth="0.8" />
        <rect x="3" y="4" width="1" height="1" fill="#5af78e" />
        <rect x="4" y="4" width="1" height="1" fill="#5af78e" />
        <rect x="6" y="4" width="1" height="1" fill="#5af78e" opacity="0.6" />
        <rect x="3" y="6" width="4" height="0.8" fill="#444" />
        <rect x="3" y="8" width="6" height="0.8" fill="#444" />
        <rect x="6" y="11" width="4" height="1" fill="#2a2a5e" />
        <rect x="5" y="12" width="6" height="1" fill="#2a2a5e" />
      </svg>
    ),
    files: (
      <svg width={s} height={s} viewBox="0 0 16 16" className="pixel-perfect">
        <rect x="1" y="3" width="14" height="11" fill="#16213e" stroke="#57c7ff" strokeWidth="0.8" />
        <rect x="1" y="1" width="6" height="3" fill="#16213e" stroke="#57c7ff" strokeWidth="0.8" />
        <rect x="4" y="7" width="8" height="4" fill="none" stroke="#57c7ff" strokeWidth="0.3" opacity="0.4" />
      </svg>
    ),
    network: (
      <svg width={s} height={s} viewBox="0 0 16 16" className="pixel-perfect">
        <rect x="7" y="7" width="2" height="2" fill="#57c7ff" />
        <rect x="7" y="1" width="2" height="2" fill="#5af78e" />
        <rect x="7" y="13" width="2" height="2" fill="#ff5c57" />
        <rect x="1" y="7" width="2" height="2" fill="#f3f99d" />
        <rect x="13" y="7" width="2" height="2" fill="#c792ea" />
        <rect x="8" y="3" width="0.5" height="4" fill="#57c7ff" opacity="0.4" />
        <rect x="8" y="9" width="0.5" height="4" fill="#57c7ff" opacity="0.4" />
        <rect x="3" y="7.75" width="4" height="0.5" fill="#57c7ff" opacity="0.4" />
        <rect x="9" y="7.75" width="4" height="0.5" fill="#57c7ff" opacity="0.4" />
      </svg>
    ),
    document: (
      <svg width={s} height={s} viewBox="0 0 16 16" className="pixel-perfect">
        <rect x="3" y="1" width="10" height="14" fill="#1a1a2e" stroke="#a0a0a0" strokeWidth="0.8" />
        <polygon points="10,1 13,4 10,4" fill="#2a2a5e" stroke="#a0a0a0" strokeWidth="0.5" />
        <rect x="5" y="5" width="6" height="0.7" fill="#555" />
        <rect x="5" y="7" width="5" height="0.7" fill="#555" />
        <rect x="5" y="9" width="6" height="0.7" fill="#555" />
        <rect x="5" y="11" width="3" height="0.7" fill="#555" />
      </svg>
    ),
    classified: (
      <svg width={s} height={s} viewBox="0 0 16 16" className="pixel-perfect">
        <rect x="3" y="1" width="10" height="14" fill="#1a1a2e" stroke="#f3f99d" strokeWidth="0.8" />
        <polygon points="10,1 13,4 10,4" fill="#2a2a3e" stroke="#f3f99d" strokeWidth="0.5" />
        <rect x="4" y="5" width="8" height="2" fill="none" stroke="#f3f99d" strokeWidth="0.5" />
        <rect x="5" y="5.5" width="1" height="1" fill="#f3f99d" />
        <rect x="7" y="5.5" width="1" height="1" fill="#f3f99d" />
        <rect x="9" y="5.5" width="1" height="1" fill="#f3f99d" />
        <rect x="5" y="9" width="6" height="0.7" fill="#555" />
        <rect x="5" y="11" width="4" height="0.7" fill="#555" />
      </svg>
    ),
    restricted: (
      <svg width={s} height={s} viewBox="0 0 16 16" className="pixel-perfect">
        <rect x="3" y="1" width="10" height="14" fill="#1a1a2e" stroke="#ff5c57" strokeWidth="1" />
        <polygon points="10,1 13,4 10,4" fill="#2a1a1e" stroke="#ff5c57" strokeWidth="0.5" />
        {/* Diagonal restricted lines */}
        <line x1="3" y1="1" x2="13" y2="15" stroke="#ff5c57" strokeWidth="0.3" opacity="0.5" />
        <line x1="3" y1="15" x2="13" y2="1" stroke="#ff5c57" strokeWidth="0.3" opacity="0.5" />
        <rect x="5" y="7" width="6" height="2" fill="#ff5c57" opacity="0.3" />
        <rect x="5.5" y="7.5" width="1" height="1" fill="#ff5c57" />
        <rect x="7.5" y="7.5" width="1" height="1" fill="#ff5c57" />
        <rect x="9.5" y="7.5" width="1" height="1" fill="#ff5c57" />
      </svg>
    ),
    topsecret: (
      <svg width={s} height={s} viewBox="0 0 16 16" className="pixel-perfect">
        <rect x="2" y="1" width="12" height="14" fill="#1a0a0a" stroke="#ff5c57" strokeWidth="1.2" />
        <rect x="3" y="2" width="10" height="12" fill="none" stroke="#ff5c57" strokeWidth="0.3" opacity="0.4" />
        {/* Lock */}
        <rect x="6" y="5" width="4" height="4" fill="#ff5c57" opacity="0.8" />
        <rect x="7" y="3" width="2" height="3" fill="none" stroke="#ff5c57" strokeWidth="0.8" />
        <rect x="7.5" y="7" width="1" height="1" fill="#1a0a0a" />
        {/* TS text */}
        <rect x="5" y="11" width="6" height="1.5" fill="#ff5c57" opacity="0.3" />
        <rect x="6" y="11.2" width="1" height="1" fill="#ff5c57" />
        <rect x="8" y="11.2" width="1" height="1" fill="#ff5c57" />
      </svg>
    ),
    encrypted: (
      <svg width={s} height={s} viewBox="0 0 16 16" className="pixel-perfect">
        <rect x="3" y="1" width="10" height="14" fill="#1a1a2e" stroke="#c792ea" strokeWidth="0.8" />
        {/* Lock */}
        <rect x="6" y="6" width="4" height="3" fill="#c792ea" opacity="0.7" />
        <rect x="7" y="4" width="2" height="3" fill="none" stroke="#c792ea" strokeWidth="0.7" />
        <rect x="7.5" y="7.5" width="1" height="1" fill="#1a1a2e" />
        {/* Encrypted data */}
        <rect x="5" y="11" width="1" height="1" fill="#c792ea" opacity="0.3" />
        <rect x="7" y="11" width="1" height="1" fill="#c792ea" opacity="0.5" />
        <rect x="9" y="11" width="1" height="1" fill="#c792ea" opacity="0.3" />
        <rect x="6" y="12.5" width="1" height="0.5" fill="#c792ea" opacity="0.4" />
        <rect x="8" y="12.5" width="1" height="0.5" fill="#c792ea" opacity="0.4" />
      </svg>
    ),
    database: (
      <svg width={s} height={s} viewBox="0 0 16 16" className="pixel-perfect">
        <ellipse cx="8" cy="3" rx="5" ry="2" fill="#16213e" stroke="#57c7ff" strokeWidth="0.7" />
        <rect x="3" y="3" width="10" height="10" fill="#16213e" stroke="none" />
        <line x1="3" y1="3" x2="3" y2="13" stroke="#57c7ff" strokeWidth="0.7" />
        <line x1="13" y1="3" x2="13" y2="13" stroke="#57c7ff" strokeWidth="0.7" />
        <ellipse cx="8" cy="8" rx="5" ry="2" fill="none" stroke="#57c7ff" strokeWidth="0.5" opacity="0.4" />
        <ellipse cx="8" cy="13" rx="5" ry="2" fill="#16213e" stroke="#57c7ff" strokeWidth="0.7" />
      </svg>
    ),
    spreadsheet: (
      <svg width={s} height={s} viewBox="0 0 16 16" className="pixel-perfect">
        <rect x="3" y="1" width="10" height="14" fill="#1a2e1a" stroke="#5af78e" strokeWidth="0.8" />
        {/* Grid */}
        <line x1="7" y1="4" x2="7" y2="13" stroke="#5af78e" strokeWidth="0.3" opacity="0.5" />
        <line x1="10" y1="4" x2="10" y2="13" stroke="#5af78e" strokeWidth="0.3" opacity="0.5" />
        <line x1="4" y1="6" x2="12" y2="6" stroke="#5af78e" strokeWidth="0.3" opacity="0.5" />
        <line x1="4" y1="8" x2="12" y2="8" stroke="#5af78e" strokeWidth="0.3" opacity="0.5" />
        <line x1="4" y1="10" x2="12" y2="10" stroke="#5af78e" strokeWidth="0.3" opacity="0.5" />
        <line x1="4" y1="12" x2="12" y2="12" stroke="#5af78e" strokeWidth="0.3" opacity="0.5" />
        {/* Cells */}
        <rect x="4.5" y="4.5" width="2" height="1" fill="#5af78e" opacity="0.3" />
        <rect x="7.5" y="6.5" width="2" height="1" fill="#5af78e" opacity="0.3" />
      </svg>
    ),
    image: (
      <svg width={s} height={s} viewBox="0 0 16 16" className="pixel-perfect">
        <rect x="2" y="2" width="12" height="12" fill="#1a1a2e" stroke="#57c7ff" strokeWidth="0.8" />
        {/* Mountain landscape */}
        <polygon points="4,11 7,6 10,11" fill="#0f3460" />
        <polygon points="8,11 11,7 13,11" fill="#16213e" />
        {/* Sun */}
        <rect x="10" y="4" width="2" height="2" fill="#f3f99d" opacity="0.7" />
      </svg>
    ),
    audio: (
      <svg width={s} height={s} viewBox="0 0 16 16" className="pixel-perfect">
        <rect x="3" y="1" width="10" height="14" fill="#1a1a2e" stroke="#c792ea" strokeWidth="0.8" />
        {/* Waveform */}
        <rect x="4" y="7" width="1" height="2" fill="#c792ea" opacity="0.6" />
        <rect x="5.5" y="5" width="1" height="6" fill="#c792ea" opacity="0.7" />
        <rect x="7" y="6" width="1" height="4" fill="#c792ea" opacity="0.8" />
        <rect x="8.5" y="4" width="1" height="8" fill="#c792ea" opacity="0.7" />
        <rect x="10" y="6" width="1" height="4" fill="#c792ea" opacity="0.6" />
        <rect x="11.5" y="7" width="1" height="2" fill="#c792ea" opacity="0.5" />
      </svg>
    ),
  };

  return icons[type] ?? icons.document;
}

export default function DesktopIcon({ label, icon, onClick }: Props) {
  return (
    <div
      className="desktop-icon flex flex-col items-center gap-1 px-2 py-2 rounded-sm w-[84px]"
      onDoubleClick={onClick}
    >
      <PixelIcon type={icon} />
      <span className="font-pixel text-[6px] text-os-text text-center leading-[1.4] tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
        {label}
      </span>
    </div>
  );
}
