/**
 * KAIRO MARKETING — /strategies page
 * Design: "Stealth Operator" — dark space bg, neon lime #b8ff00, Bebas Neue display, DM Sans body
 * Same visual language as Home.tsx
 */

import { useEffect } from "react";
import { Link } from "wouter";

const CALENDLY = "https://calendly.com/kairoscales/30min";
const LOGO = "/images/kairo_logo.png";

// ─── Star Field (same as Home) ────────────────────────────────────────────────
function StarField() {
  return (
    <div className="star-field" aria-hidden="true">
      <div className="stars stars-sm" />
      <div className="stars stars-md" />
      <div className="stars stars-lg" />
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12"
      style={{
        height: 72,
        background: "rgba(3,8,0,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(184,255,0,0.08)",
      }}
    >
      <Link href="/" className="flex items-center gap-3 cursor-pointer">
        <img
          src={LOGO}
          alt="Kairo"
          style={{ height: 40, width: 40, objectFit: "contain", filter: "invert(1) brightness(10)" }}
        />
        <div className="flex flex-col leading-none">
          <span className="font-display text-xl" style={{ color: "#b8ff00", lineHeight: 1 }}>KAIRO</span>
          <span
            className="font-mono-accent text-xs"
            style={{ color: "rgba(184,255,0,0.45)", letterSpacing: "0.12em", fontSize: "0.55rem" }}
          >
            MARKETING
          </span>
        </div>
      </Link>

      <a
        href={CALENDLY}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-white"
        style={{ padding: "0.5rem 1.5rem", fontSize: "0.9rem" }}
      >
        Book a Call →
      </a>
    </nav>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Strategies() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#030800", color: "#fff" }}>
      <StarField />
      <Navbar />

      {/* Hero / Headline */}
      <section
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-8"
        style={{ paddingTop: "140px", paddingBottom: "60px" }}
      >
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full font-mono-accent text-xs"
          style={{
            background: "rgba(184,255,0,0.08)",
            border: "1px solid rgba(184,255,0,0.25)",
            color: "#b8ff00",
            letterSpacing: "0.12em",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#b8ff00" }}
          />
          MISSION BRIEFING
        </div>

        {/* Headline */}
        <h1
          className="font-display leading-none mb-6"
          style={{
            fontSize: "clamp(2.2rem, 6vw, 4.8rem)",
            maxWidth: "900px",
            color: "#fff",
          }}
        >
          HOW WE ARE ADDING{" "}
          <span style={{ color: "#b8ff00" }}>$100K MRR</span> TO BUSINESSES
          WITHOUT ADDING ANY MARKETING EXPENSES.
        </h1>

        {/* Sub-headline */}
        <p
          className="leading-relaxed mb-10"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "rgba(255,255,255,0.65)",
            maxWidth: "720px",
          }}
        >
          They went from <strong style={{ color: "#fff" }}>$45k a month to $150k a month</strong> with a properly
          engineered funnel that doesn't require any work from your side…{" "}
          <em style={{ color: "rgba(184,255,0,0.8)" }}>because we do everything.</em>
        </p>

        {/* Wistia VSL */}
        <div
          className="w-full mx-auto mb-10"
          style={{ maxWidth: "820px" }}
        >
          {/* Wistia scripts loaded inline — lazy by default, no perf hit */}
          <script src="https://fast.wistia.com/player.js" async></script>
          <script
            src="https://fast.wistia.com/embed/rea760ihyv.js"
            async
            type="module"
          ></script>
          <style>{`
            wistia-player[media-id='rea760ihyv']:not(:defined) {
              background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/rea760ihyv/swatch');
              display: block;
              filter: blur(5px);
              padding-top: 65.0%;
            }
          `}</style>
          {/* @ts-ignore */}
          <wistia-player
            media-id="rea760ihyv"
            aspect="1.5384615384615385"
            style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 48px rgba(0,0,0,0.6)" }}
          />
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4">
          <p
            className="font-mono-accent text-sm"
            style={{ color: "rgba(184,255,0,0.6)", letterSpacing: "0.1em" }}
          >
            READY TO SCALE?
          </p>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lime"
            style={{ fontSize: "1.15rem", padding: "1rem 2.5rem" }}
          >
            Book Your Free Implementation Session →
          </a>
          <p
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.3)", fontFamily: "'DM Sans',sans-serif" }}
          >
            No obligation. 30 minutes. We map out your entire funnel live.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(184,255,0,0.08)", margin: "0 2rem" }} />

      {/* Back to home */}
      <div className="relative z-10 flex justify-center py-12">
        <Link
          href="/"
          className="text-sm transition-colors duration-200"
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans',sans-serif" }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#b8ff00")}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
        >
          ← Back to Home
        </Link>
      </div>

      {/* Footer strip */}
      <footer
        className="relative z-10 text-center py-8 text-xs"
        style={{
          borderTop: "1px solid rgba(184,255,0,0.06)",
          color: "rgba(255,255,255,0.2)",
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        © 2025 Kairo Marketing. All rights reserved.
      </footer>
    </div>
  );
}
