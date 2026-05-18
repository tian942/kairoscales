/**
 * KAIRO MARKETING — /confirm page (post-booking confirmation)
 * Design: Same "Stealth Operator" space ninja style as Home.tsx
 * NOT linked from the main site — share URL directly with booked leads only.
 * Sections: Hero + Main VSL → Process (dark) → FAQ Videos (white) → CTA
 */

import { useEffect } from "react";
import { Link } from "wouter";

const CALENDLY = "https://calendly.com/kairoscales/30min";
const LOGO = "/images/logo.png";
const HERO_BG = "/images/hero.jpg";

// ─── Wistia IDs ───────────────────────────────────────────────────────────────
const MAIN_VSL = "tpsxzf817l";
const FAQ_VIDEOS = [
  { id: "4wkyasbpnx",  title: "What Is This About?" },
  { id: "8yxov5xp3c",  title: "Who Are We?" },
  { id: "00f88pr2c2",  title: "Are You Qualified?" },
  { id: "jwtud91hcb",  title: "I Was Burned Before" },
  { id: "3wrg5yt372",  title: "Can I Afford To Spend Money To Get Clients?" },
  { id: "g3dj0xgdcu",  title: "The Plan" },
];

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

// ─── Wave Dividers ────────────────────────────────────────────────────────────
function WaveDown({ fromDark = true }: { fromDark?: boolean }) {
  const fill = fromDark ? "#ffffff" : "#060d00";
  const bg   = fromDark ? "#060d00" : "#ffffff";
  return (
    <div style={{ background: bg, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ width: "100%", height: 70, display: "block" }}>
        <path d="M0,45 C360,90 720,0 1080,45 C1260,67 1380,30 1440,45 L1440,90 L0,90 Z" fill={fill} />
      </svg>
    </div>
  );
}

function WaveUp({ fromDark = false }: { fromDark?: boolean }) {
  const fill = fromDark ? "#ffffff" : "#060d00";
  const bg   = fromDark ? "#060d00" : "#ffffff";
  return (
    <div style={{ background: bg, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ width: "100%", height: 70, display: "block" }}>
        <path d="M0,45 C360,0 720,90 1080,45 C1260,22 1380,60 1440,45 L1440,0 L0,0 Z" fill={fill} />
      </svg>
    </div>
  );
}

// ─── Navbar (minimal — no nav links, just logo) ───────────────────────────────
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
      <div className="flex items-center gap-3">
        <img
          src={LOGO}
          alt="Kairo"
          style={{ height: 36, width: 36, objectFit: "contain", filter: "invert(1) brightness(10)" }}
        />
        <div className="flex flex-col leading-none">
          <span className="font-display text-xl" style={{ color: "#b8ff00", lineHeight: 1 }}>KAIRO</span>
          <span className="font-mono-accent" style={{ color: "rgba(184,255,0,0.45)", letterSpacing: "0.12em", fontSize: "0.55rem" }}>
            MARKETING
          </span>
        </div>
      </div>

      <a
        href={CALENDLY}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-lime"
        style={{ padding: "0.45rem 1.4rem", fontSize: "0.85rem" }}
      >
        Book a Call →
      </a>
    </nav>
  );
}

// ─── Wistia single video embed ────────────────────────────────────────────────
function WistiaEmbed({ mediaId, aspect = 1.5384615384615385 }: { mediaId: string; aspect?: number }) {
  return (
    <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 48px rgba(0,0,0,0.55)" }}>
      <style>{`
        wistia-player[media-id='${mediaId}']:not(:defined) {
          background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
          display: block;
          filter: blur(5px);
          padding-top: ${(1 / aspect) * 100}%;
        }
      `}</style>
      {/* @ts-ignore */}
      <wistia-player media-id={mediaId} aspect={aspect} style={{ display: "block", width: "100%", borderRadius: "12px" }} />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Confirm() {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Inject Wistia player script once
    if (!document.querySelector('script[src="https://fast.wistia.com/player.js"]')) {
      const s = document.createElement("script");
      s.src = "https://fast.wistia.com/player.js";
      s.async = true;
      document.head.appendChild(s);
    }
    // Inject all media embed scripts
    const allIds = [MAIN_VSL, ...FAQ_VIDEOS.map(v => v.id)];
    allIds.forEach(id => {
      if (!document.querySelector(`script[src="https://fast.wistia.com/embed/${id}.js"]`)) {
        const s = document.createElement("script");
        s.src = `https://fast.wistia.com/embed/${id}.js`;
        s.async = true;
        s.type = "module";
        document.head.appendChild(s);
      }
    });
  }, []);

  return (
    <div style={{ background: "#030800", color: "#fff", position: "relative" }}>
      {/* Ninja background */}
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
          opacity: 0.3,
          pointerEvents: "none",
          zIndex: 0,
          maskImage: "linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
      <StarField />
      <Navbar />

      {/* ── SECTION 1: Hero + Main VSL ─────────────────────────────────────── */}
      <section
        className="relative z-10 flex flex-col items-center text-center"
        style={{ paddingTop: "100px", paddingBottom: "80px", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
      >
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full font-mono-accent"
          style={{
            background: "rgba(184,255,0,0.08)",
            border: "1px solid rgba(184,255,0,0.25)",
            color: "#b8ff00",
            letterSpacing: "0.12em",
            fontSize: "0.65rem",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#b8ff00" }} />
          YOUR CALL IS CONFIRMED
        </div>

        {/* Headline */}
        <h1
          className="font-display leading-none mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#fff", maxWidth: "860px" }}
        >
          YOU'RE BOOKED.{" "}
          <span style={{ color: "#b8ff00" }}>HERE'S EXACTLY</span>
          <br />
          WHAT HAPPENS NEXT.
        </h1>

        {/* Sub-headline */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
            color: "rgba(255,255,255,0.55)",
            maxWidth: "620px",
            lineHeight: 1.6,
            marginBottom: "2.5rem",
          }}
        >
          Watch the short video below before your call — it'll save us 20 minutes and make sure we can actually help you.
        </p>

        {/* Main VSL */}
        <div style={{ width: "100%", maxWidth: "780px" }}>
          <p
            className="font-mono-accent mb-3"
            style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em", fontSize: "0.62rem" }}
          >
            ⚠ IMPORTANT: WATCH THIS BEFORE YOUR CALL
          </p>
          <WistiaEmbed mediaId={MAIN_VSL} aspect={1.5384615384615385} />
        </div>
      </section>

      {/* ── WAVE DOWN (dark → white) ──────────────────────────────────────── */}
      <WaveDown fromDark={true} />

      {/* ── SECTION 2: Process (white section) ───────────────────────────── */}
      <section
        style={{
          background: "#ffffff",
          color: "#060d00",
          padding: "80px 1.5rem",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {/* Section label */}
          <p
            className="font-mono-accent text-center mb-3"
            style={{ color: "rgba(3,8,0,0.35)", letterSpacing: "0.18em", fontSize: "0.65rem" }}
          >
            THE PROCESS
          </p>
          <h2
            className="font-display text-center leading-none mb-16"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#060d00" }}
          >
            HOW WE GET YOU TO{" "}
            <span style={{ color: "#3a7d00" }}>$100K MRR AND BEYOND</span>
          </h2>

          {/* Steps */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2.5rem",
            }}
          >
            {[
              {
                num: "01",
                title: "WE AUDIT YOUR FUNNEL",
                body: "We go through your current offer, ticket size, lead volume, and what's breaking. Most businesses we talk to are sitting on $50K–$100K/month they're not capturing yet.",
              },
              {
                num: "02",
                title: "WE BUILD EVERYTHING",
                body: "Ads, VSL, funnel, emails, automations. Done in 14 days. You don't lift a finger — we do it all.",
              },
              {
                num: "03",
                title: "YOU SCALE",
                body: "We optimise weekly. You focus on fulfillment. We've taken clients from $42K to $105K/month and beyond. We want to take you there too — because an efficiently run acquisition system creates higher multiples for when you're looking to sell. That's what we want to help you build.",
              },
            ].map((step) => (
              <div
                key={step.num}
                style={{
                  background: "#f8faf4",
                  border: "1.5px solid rgba(3,8,0,0.08)",
                  borderRadius: "16px",
                  padding: "2rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Step number watermark */}
                <div
                  className="font-display"
                  style={{
                    position: "absolute",
                    top: "-0.5rem",
                    right: "1rem",
                    fontSize: "6rem",
                    color: "rgba(184,255,0,0.12)",
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  {step.num}
                </div>
                <div
                  className="font-mono-accent mb-3"
                  style={{ color: "#b8ff00", fontSize: "0.65rem", letterSpacing: "0.15em", background: "#060d00", display: "inline-block", padding: "0.25rem 0.75rem", borderRadius: "999px" }}
                >
                  STEP {step.num}
                </div>
                <h3
                  className="font-display leading-none mb-3"
                  style={{ fontSize: "1.5rem", color: "#060d00" }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.95rem",
                    color: "rgba(3,8,0,0.65)",
                    lineHeight: 1.65,
                  }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAVE UP (white → dark) ────────────────────────────────────────── */}
      <WaveUp fromDark={false} />

      {/* ── SECTION 3: FAQ Videos (dark section) ─────────────────────────── */}
      <section
        style={{
          background: "#060d00",
          padding: "80px 1.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            className="font-mono-accent text-center mb-3"
            style={{ color: "rgba(184,255,0,0.45)", letterSpacing: "0.18em", fontSize: "0.65rem" }}
          >
            BEFORE YOUR CALL
          </p>
          <h2
            className="font-display text-center leading-none mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#fff" }}
          >
            ANSWERS TO EVERY QUESTION
            <br />
            <span style={{ color: "#b8ff00" }}>YOU'RE PROBABLY THINKING RIGHT NOW</span>
          </h2>
          <p
            className="text-center mb-14"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.45)",
              maxWidth: "560px",
              margin: "0 auto 3.5rem",
              lineHeight: 1.6,
            }}
          >
            Watch the ones that matter to you. Each is short and straight to the point.
          </p>

          {/* FAQ Video Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            {FAQ_VIDEOS.map((v) => (
              <div key={v.id}>
                {/* Title */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#b8ff00",
                      flexShrink: 0,
                    }}
                  />
                  <h3
                    className="font-display"
                    style={{ fontSize: "1.1rem", color: "#fff", lineHeight: 1.1 }}
                  >
                    {v.title.toUpperCase()}
                  </h3>
                </div>
                <WistiaEmbed mediaId={v.id} aspect={1.5384615384615385} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAVE DOWN (dark → white) ──────────────────────────────────────── */}
      <WaveDown fromDark={true} />

      {/* ── SECTION 4: Final CTA (white) ─────────────────────────────────── */}
      <section
        style={{
          background: "#ffffff",
          padding: "80px 1.5rem 100px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p
            className="font-mono-accent mb-4"
            style={{ color: "rgba(3,8,0,0.3)", letterSpacing: "0.18em", fontSize: "0.65rem" }}
          >
            YOUR NEXT STEP
          </p>
          <h2
            className="font-display leading-none mb-6"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#060d00" }}
          >
            READY TO BUILD YOUR
            <br />
            <span style={{ color: "#3a7d00" }}>ACQUISITION MACHINE?</span>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.05rem",
              color: "rgba(3,8,0,0.55)",
              lineHeight: 1.65,
              marginBottom: "2.5rem",
            }}
          >
            Your call is already booked. Show up ready — we'll map out your entire funnel live and tell you exactly what we'd do for your business.
          </p>
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "#060d00",
              color: "#b8ff00",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "1.15rem",
              letterSpacing: "0.06em",
              padding: "1rem 2.5rem",
              borderRadius: "8px",
              textDecoration: "none",
              boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.18)";
            }}
          >
            View My Booking →
          </a>
          <p
            style={{
              marginTop: "1rem",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              color: "rgba(3,8,0,0.3)",
            }}
          >
            No obligation. 30 minutes. We map out your entire funnel live.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative z-10 text-center py-6 text-xs"
        style={{
          background: "#060d00",
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
