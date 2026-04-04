import type { Metadata } from "next";
import { JetBrains_Mono, Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const pressStart = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
});

const vt323 = VT323({
  variable: "--font-vt",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "BLACKSITE-07",
  description: "Terminal access to classified defense network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${pressStart.variable} ${vt323.variable} h-full`}>
      <body className="h-full bg-term-bg text-term-text font-mono selection:bg-term-text/20 selection:text-term-text overflow-hidden">
        {children}
      </body>
    </html>
  );
}
