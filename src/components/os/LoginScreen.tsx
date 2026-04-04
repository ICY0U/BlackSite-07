"use client";

import { useState, useRef, useEffect } from "react";

interface Props {
  onLogin: () => void;
  autoFocus?: boolean;
}

export default function LoginScreen({ onLogin, autoFocus = true }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [dots, setDots] = useState("");
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autoFocus) return;
    usernameRef.current?.focus();
  }, [autoFocus]);

  /* Animated dots during login */
  useEffect(() => {
    if (!loggingIn) return;
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, [loggingIn]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loggingIn) return;

    if (!username.trim()) {
      setError("username required");
      return;
    }

    setError("");
    setLoggingIn(true);

    /* Fake authentication delay */
    setTimeout(() => {
      onLogin();
    }, 2200);
  };

  return (
    <div className="h-full w-full flex items-center justify-center bg-term-bg scanlines">
      {/* Login box */}
      <div className="w-[440px] pixel-border bg-os-window-bg">
        {/* Title bar */}
        <div className="bg-os-window-title px-3 py-2 flex items-center gap-2 border-b border-os-window-border">
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 bg-term-error/60" />
            <div className="w-2.5 h-2.5 bg-term-warn/60" />
            <div className="w-2.5 h-2.5 bg-term-success/60" />
          </div>
          <span className="font-pixel text-[8px] text-os-text-dim tracking-wider ml-1">
            SYSTEM LOGIN
          </span>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* ASCII Logo */}
          <pre className="text-term-error text-[10px] leading-[1.3] mb-6 text-center font-mono select-none">
{`  ██████╗ ██╗      █████╗  ██████╗██╗  ██╗
  ██╔══██╗██║     ██╔══██╗██╔════╝██║ ██╔╝
  ██████╔╝██║     ███████║██║     █████╔╝ 
  ██╔══██╗██║     ██╔══██║██║     ██╔═██╗ 
  ██████╔╝███████╗██║  ██║╚██████╗██║  ██╗
  ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
  ███████╗██╗████████╗███████╗     ██████╗ ███████╗
  ██╔════╝██║╚══██╔══╝██╔════╝    ██╔═══██╗╚════██║
  ███████╗██║   ██║   █████╗█████╗██║   ██║    ██╔╝
  ╚════██║██║   ██║   ██╔══╝╚════╝██║   ██║   ██╔╝ 
  ███████║██║   ██║   ███████╗    ╚██████╔╝   ██║  
  ╚══════╝╚═╝   ╚═╝   ╚══════╝     ╚═════╝    ╚═╝`}
          </pre>

          <div className="text-center mb-6">
            <div className="font-pixel text-[8px] text-term-error tracking-widest mb-1">
              CLASSIFIED DEFENSE NETWORK
            </div>
            <div className="font-vt text-[14px] text-os-text-dim">
              authorized personnel only
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="font-vt text-[14px] text-os-text-dim block mb-1">
                USERNAME
              </label>
              <div className="pixel-inset bg-term-bg p-0">
                <input
                  ref={usernameRef}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loggingIn}
                  className="w-full bg-transparent text-term-bright text-[14px] px-2 py-1.5 outline-none font-mono"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="font-vt text-[14px] text-os-text-dim block mb-1">
                PASSWORD
              </label>
              <div className="pixel-inset bg-term-bg p-0">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loggingIn}
                  className="w-full bg-transparent text-term-bright text-[14px] px-2 py-1.5 outline-none font-mono"
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="font-vt text-[14px] text-term-error">
                error: {error}
              </div>
            )}

            {/* Login status */}
            {loggingIn && (
              <div className="font-vt text-[14px] text-term-warn">
                authenticating{dots}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loggingIn}
              className="pixel-btn w-full font-pixel text-[8px] text-os-text tracking-widest py-2.5 mt-2"
            >
              {loggingIn ? "CONNECTING..." : "LOG IN"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <div className="font-vt text-[12px] text-os-text-dim/40">
              BLACKSITE-07 v3.2.1 // NODE 4 OF 5 ONLINE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
