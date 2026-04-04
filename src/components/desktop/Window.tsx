"use client";

import { useRef, useCallback, useEffect } from "react";

interface Props {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
  children: React.ReactNode;
}

export default function Window({
  title,
  x,
  y,
  width,
  height,
  zIndex,
  onClose,
  onMinimize,
  onFocus,
  onMove,
  children,
}: Props) {
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x, y });

  /* Keep ref in sync */
  useEffect(() => {
    posRef.current = { x, y };
  }, [x, y]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      e.preventDefault();
      dragging.current = true;
      offset.current = {
        x: e.clientX - posRef.current.x,
        y: e.clientY - posRef.current.y,
      };
      onFocus();
    },
    [onFocus]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const newX = e.clientX - offset.current.x;
      const newY = Math.max(0, e.clientY - offset.current.y); // don't go above screen
      onMove(newX, newY);
    };

    const handleMouseUp = () => {
      dragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [onMove]);

  return (
    <div
      className="absolute pixel-border bg-os-window-bg flex flex-col"
      style={{
        left: x,
        top: y,
        width: `${width}vw`,
        height: `${height}vh`,
        minWidth: 320,
        minHeight: 200,
        maxWidth: '95vw',
        maxHeight: 'calc(100vh - 80px)',
        zIndex,
      }}
      onMouseDown={onFocus}
    >
      {/* Title bar */}
      <div
        className="bg-os-window-title px-2 py-1.5 flex items-center gap-2 border-b border-os-window-border shrink-0 drag-handle select-none"
        onMouseDown={handleMouseDown}
      >
        {/* Window buttons */}
        <div className="flex gap-1">
          <button
            onClick={onClose}
            className="w-3 h-3 bg-term-error/70 hover:bg-term-error transition-colors"
            title="Close"
          />
          <button
            onClick={onMinimize}
            className="w-3 h-3 bg-term-warn/70 hover:bg-term-warn transition-colors"
            title="Minimize"
          />
          <div className="w-3 h-3 bg-term-success/30" />
        </div>

        <span className="font-pixel text-[7px] text-os-text-dim tracking-[0.2em] flex-1">
          {title}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
