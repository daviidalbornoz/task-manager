// ══════════════════════════════════════════════════════
// COMPONENT: RootLayout (layout.js)
// PURPOSE: The outermost shell that wraps every page in
//          the app. Next.js requires this file — it injects
//          the <html> and <body> tags that page.js cannot
//          provide. Any UI placed here (nav, footer, fonts)
//          persists across all routes without re-rendering.
// TYPE: Server Component — no hooks or browser APIs needed.
//       Font loading and metadata export are both build-time
//       operations handled by Next.js on the server.
// PROPS:
//   children — the current page component (HomePage) injected
//              by Next.js App Router at request time.
// ══════════════════════════════════════════════════════

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ── FONTS ───────────────────────────────────────────
// next/font/google downloads and self-hosts these fonts
// at build time — no browser request to Google's servers
// at runtime. Each font is assigned a CSS variable so
// Tailwind can reference it as a utility class anywhere
// in the app (e.g. font-[--font-geist-sans]).
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ── METADATA ────────────────────────────────────────
// Next.js reads this export and injects the values into
// the <head> as <title> and <meta name="description">.
// Defined here so it applies to every page automatically.
export const metadata = {
  title: "Task Manager",
  description: "A Neumorphic task manager built with Next.js and React.",
};

export default function RootLayout({ children }) {
  return (
    // lang="en" is required for screen readers and search
    // engines to correctly interpret the page language.
    // The font variables are applied here at the root so
    // every component in the tree can inherit them via CSS.
    // antialiased smooths font rendering on high-DPI screens.
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* bg-[#e0e5ec] sets the Neumorphic base color as the
          global canvas. Applying it here on <body> rather than
          inside TaskBoard means the background covers the full
          viewport — no white flash on load or on empty areas
          outside the main card. min-h-screen ensures it fills
          even short pages. flex flex-col allows future additions
          like a sticky footer without layout breakage. */}
      <body className="min-h-screen flex flex-col bg-[#e0e5ec]">
        {children}
      </body>
    </html>
  );
}