/**
 * KAIRO MARKETING — /strategies page
 * Design: "Stealth Operator" — dark space bg, neon lime #b8ff00, Bebas Neue display, DM Sans body
 * Layout: Centered single column — TITLE → VIDEO → BUTTON, all above the fold (100vh, no scroll)
 */

import { useEffect } from "react";
import { Link } from "wouter";

const CALENDLY = "https://calendly.com/kairoscales/30min";
const LOGO = "/images/logo.png";
const HERO_BG = "/images/hero.jpg";

// ─── Star Field ───────────────────────────────────────────────────────────────
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
        height: 64,
        background: "rgba(3,8,0,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(184,255,0,0.08)",
      }}
    >
      <Link href="/" className="flex items-center gap-3 cursor-pointer">
        <img
          src={LOGO}
          alt="Kairo"
          style={{ height: 36, width: 36, objectFit: "contain", filter: "invert(1) brightness(10)" }}
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
        style={{ padding: "0.45rem 1.4rem", fontSize: "0.85rem" }}
      >
        Book a Call →
      </a>
    </nav>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Strategies() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        background: "#030800",
        color: "#fff",
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Ninja background — right side */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "55%",
          height: "100vh",
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          opacity: 0.45,
          pointerEvents: "none",
          zIndex: 0,
          maskImage: "linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
      <StarField />
      <Navbar />

      {/* Content — centered column, fills viewport below navbar */}
      <div
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center"
        style={{ paddingTop: 64, paddingLeft: "1rem", paddingRight: "1rem", gap: "1.25rem" }}
      >
        {/* TITLE */}
        <h1
          className="font-display leading-none"
          style={{
            fontSize: "clamp(1.6rem, 3.2vw, 2.8rem)",
            color: "#fff",
            maxWidth: "780px",
          }}
        >
          HOW WE ARE ADDING{" "}
          <span style={{ color: "#b8ff00" }}>$100K MRR</span> TO BUSINESSES
          WITHOUT ADDING ANY MARKETING EXPENSES.
        </h1>

        {/* VIDEO */}
        <div
          style={{
            width: "100%",
            maxWidth: "720px",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 8px 48px rgba(0,0,0,0.65)",
          }}
        >
          <script src="https://fast.wistia.com/player.js" async></script>
          <script src="https://fast.wistia.com/embed/rea760ihyv.js" async type="module"></script>
          <style>{`
            wistia-player[media-id='rea760ihyv']:not(:defined) {
              background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/rea760ihyv/swatch');
              display: block;
              filter: blur(5px);
              padding-top: 56.25%;
            }
          `}</style>
          {/* @ts-ignore */}
          <wistia-player
            media-id="rea760ihyv"
            aspect="1.7777777777777777"
            style={{ display: "block", width: "100%", borderRadius: "12px" }}
          />
        </div>

        {/* BUTTON */}
        <a
          href={CALENDLY}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-lime"
          style={{ fontSize: "1.05rem", padding: "0.85rem 2.25rem" }}
        >
          Book Your Free Implementation Session →
        </a>

        {/* Back link */}
        <Link
          href="/"
          className="text-xs transition-colors duration-200"
          style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans',sans-serif" }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#b8ff00")}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
        >
          ← Back to Home
        </Link>
      </div>

      {/* Footer strip */}
      <footer
        className="relative z-10 text-center py-2 text-xs"
        style={{
          borderTop: "1px solid rgba(184,255,0,0.06)",
          color: "rgba(255,255,255,0.18)",
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        © 2025 Kairo Marketing. All rights reserved.
      </footer>
    </div>
  );
}
