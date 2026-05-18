/**
 * KAIRO MARKETING — /strategies page
 * Design: "Stealth Operator" — dark space bg, neon lime #b8ff00, Bebas Neue display, DM Sans body
 * Layout: Two-column above-the-fold — headline + CTA left, Wistia video right.
 * Everything fits within 100vh — no scrolling needed.
 */

import { useEffect } from "react";
import { Link } from "wouter";

const CALENDLY = "https://calendly.com/kairoscales/30min";
const LOGO = "/images/logo.png";
const HERO_BG = "/images/hero.jpg";

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
      {/* Ninja full-bleed background — right side */}
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
          opacity: 0.35,
          pointerEvents: "none",
          zIndex: 0,
          maskImage: "linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
      <StarField />
      <Navbar />

      {/* Main two-column layout — fills remaining viewport height below navbar */}
      <div
        className="relative z-10 flex-1 flex items-center"
        style={{ paddingTop: 64 }}
      >
        <div
          className="w-full h-full flex items-center"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 2rem",
            gap: "3rem",
            display: "grid",
            gridTemplateColumns: "1fr 1.1fr",
            alignItems: "center",
          }}
        >
          {/* LEFT — headline + CTA */}
          <div className="flex flex-col justify-center" style={{ gap: "1rem" }}>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full font-mono-accent"
              style={{
                background: "rgba(184,255,0,0.08)",
                border: "1px solid rgba(184,255,0,0.25)",
                color: "#b8ff00",
                letterSpacing: "0.12em",
                fontSize: "0.65rem",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#b8ff00" }} />
              MISSION BRIEFING
            </div>

            {/* Headline */}
            <h1
              className="font-display leading-none"
              style={{
                fontSize: "clamp(1.8rem, 3.8vw, 3.4rem)",
                color: "#fff",
                lineHeight: 0.95,
              }}
            >
              HOW WE ADD{" "}
              <span style={{ color: "#b8ff00" }}>$100K MRR</span>
              <br />
              WITHOUT ADDING
              <br />
              MARKETING EXPENSES.
            </h1>

            {/* Sub-headline */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.55,
                maxWidth: "480px",
              }}
            >
              From <strong style={{ color: "#fff" }}>$45k → $150k/month</strong> with a fully
              engineered funnel. We do everything — you just scale.
            </p>

            {/* CTA */}
            <div className="flex flex-col" style={{ gap: "0.5rem", marginTop: "0.25rem" }}>
              <p
                className="font-mono-accent"
                style={{ color: "rgba(184,255,0,0.6)", letterSpacing: "0.1em", fontSize: "0.65rem" }}
              >
                READY TO SCALE?
              </p>
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lime self-start"
                style={{ fontSize: "1rem", padding: "0.8rem 2rem" }}
              >
                Book Your Free Session →
              </a>
              <p
                style={{
                  color: "rgba(255,255,255,0.28)",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.72rem",
                }}
              >
                No obligation. 30 minutes. We map your entire funnel live.
              </p>
            </div>

            {/* Back link */}
            <Link
              href="/"
              className="text-xs transition-colors duration-200 self-start"
              style={{ color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans',sans-serif", marginTop: "0.5rem" }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "#b8ff00")}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
            >
              ← Back to Home
            </Link>
          </div>

          {/* RIGHT — Wistia VSL */}
          <div
            style={{
              width: "100%",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 8px 48px rgba(0,0,0,0.65)",
            }}
          >
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
        </div>
      </div>

      {/* Footer strip — pinned to bottom */}
      <footer
        className="relative z-10 text-center py-3 text-xs"
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
