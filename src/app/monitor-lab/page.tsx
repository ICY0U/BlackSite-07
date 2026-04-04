"use client";

import dynamic from "next/dynamic";

const MonitorLabClient = dynamic(
  () => import("@/components/monitor/MonitorLabClient"),
  {
    ssr: false,
    loading: () => (
      <main className="h-screen w-screen bg-[#02060b] text-[#9df7ff] flex items-center justify-center">
        <p className="font-mono text-sm tracking-[0.18em]">LOADING MONITOR LAB...</p>
      </main>
    ),
  }
);

export default function MonitorLabPage() {
  return <MonitorLabClient />;
}
