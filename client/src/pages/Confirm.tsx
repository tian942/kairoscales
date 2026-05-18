/**
 * KAIRO MARKETING — /confirm page (post-booking confirmation)
 * Design: "Stealth Operator" — full dark from top through FAQ videos
 * Layout: Dark Hero+VSL → Dark Process → Wave → Dark FAQ Videos → Wave → White CTA
 * NOT linked from main site — share URL directly with booked leads only.
 */

import { useEffect } from "react";

const CALENDLY = "https://calendly.com/kairoscales/30min";
const LOGO = "/images/logo.png";
const ROCKET_BG = "/manus-storage/rocket_ninja_ddddfa6d.png";

// ─── Wistia IDs ───────────────────────────────────────────────────────────────
const MAIN_VSL = "tpsxzf817l";
const FAQ_VIDEOS = [
  { id: "4wkyasbpnx", title: "What Is This About?" },
  { id: "8yxov5xp3c", title: "Who Are We?" },
  { id: "00f88pr2c2", title: "Are You Qualified?" },
  { id: "jwtud91hcb", title: "I Was Burned Before" },
  { id: "3wrg5yt372", title: "Can I Afford To Spend Money To Get Clients?" },
  { id: "g3dj0xgdcu", title: "The Plan" },
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

// ─── Floating Bubbles ─────────────────────────────────────────────────────────
function Bubbles() {
  const bubbles = [
    { size: 18, left: "8%",  delay: "0s",   dur: "14s" },
    { size: 10, left: "18%", delay: "2s",   dur: "18s" },
    { size: 26, left: "30%", delay: "4s",   dur: "12s" },
    { size: 14, left: "45%", delay: "1s",   dur: "20s" },
    { size: 8,  left: "58%", delay: "6s",   dur: "16s" },
    { size: 20, left: "70%", delay: "3s",   dur: "13s" },
    { size: 12, left: "82%", delay: "5s",   dur: "17s" },
    { size: 22, left: "92%", delay: "0.5s", dur: "15s" },
    { size: 9,  left: "25%", delay: "7s",   dur: "19s" },
    { size: 16, left: "62%", delay: "2.5s", dur: "11s" },
  ];
  return (
    <>
      <style>{`
        @keyframes bubble-rise {
          0%   { transform: translateY(100vh) scale(1);   opacity: 0; }
          10%  { opacity: 0.25; }
          90%  { opacity: 0.12; }
          100% { transform: translateY(-120px) scale(1.1); opacity: 0; }
        }
        .bubble {
          position: fixed;
          bottom: -60px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, rgba(184,255,0,0.25), rgba(184,255,0,0.04));
          border: 1px solid rgba(184,255,0,0.18);
          animation: bubble-rise linear infinite;
          pointer-events: none;
          z-index: 1;
        }
        @media (prefers-reduced-motion: reduce) { .bubble { animation: none; } }
      `}</style>
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            animationDelay: b.delay,
            animationDuration: b.dur,
          }}
        />
      ))}
    </>
  );
}

// ─── Wave: dark → white (bottom of dark section) ─────────────────────────────
function WaveDarkToWhite() {
  return (
    <div style={{ background: "#060d00", lineHeight: 0 }}>
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ width: "100%", height: 70, display: "block" }}>
        <path d="M0,45 C360,90 720,0 1080,45 C1260,67 1380,30 1440,45 L1440,90 L0,90 Z" fill="#ffffff" />
      </svg>
    </div>
  );
}

// ─── Wave: white → dark (bottom of white section) ────────────────────────────
function WaveWhiteToDark() {
  return (
    <div style={{ background: "#ffffff", lineHeight: 0 }}>
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ width: "100%", height: 70, display: "block" }}>
        <path d="M0,45 C360,0 720,90 1080,45 C1260,22 1380,60 1440,45 L1440,0 L0,0 Z" fill="#060d00" />
      </svg>
    </div>
  );
}

// ─── Navbar (logo only — no CTA) ─────────────────────────────────────────────
function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center px-6 lg:px-12"
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
    </nav>
  );
}

// ─── Wistia embed ─────────────────────────────────────────────────────────────
function WistiaEmbed({ mediaId, aspect = 1.5384615384615385 }: { mediaId: string; aspect?: number }) {
  return (
    <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 48px rgba(0,0,0,0.6)" }}>
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
    if (!document.querySelector('script[src="https://fast.wistia.com/player.js"]')) {
      const s = document.createElement("script");
      s.src = "https://fast.wistia.com/player.js";
      s.async = true;
      document.head.appendChild(s);
    }
    [MAIN_VSL, ...FAQ_VIDEOS.map(v => v.id)].forEach(id => {
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

      {/* Rocket ninja — absolute, right side of hero, very visible */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "55%",
          height: "100vh",
          backgroundImage: `url(${ROCKET_BG})`,
          backgroundSize: "contain",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          opacity: 0.92,
          pointerEvents: "none",
          zIndex: 1,
          maskImage: "linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)",
        }}
      />

      <StarField />
      <Bubbles />
      <Navbar />

      {/* ══════════════════════════════════════════════════════════════════════
          DARK ZONE: Hero + VSL + Process (all one continuous dark section)
      ══════════════════════════════════════════════════════════════════════ */}
      <div style={{ background: "#030800", position: "relative", zIndex: 2 }}>

        {/* ── Hero + Main VSL ──────────────────────────────────────────────── */}
        <section
          className="flex flex-col items-center text-center"
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

          <h1
            className="font-display leading-none mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#fff", maxWidth: "860px" }}
          >
            YOU'RE BOOKED.{" "}
            <span style={{ color: "#b8ff00" }}>HERE'S EXACTLY</span>
            <br />
            WHAT HAPPENS NEXT.
          </h1>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)",
              color: "rgba(255,255,255,0.5)",
              maxWidth: "600px",
              lineHeight: 1.6,
              marginBottom: "2.5rem",
            }}
          >
            Watch the short video below before your call — it'll save us 20 minutes and make sure we can actually help you.
          </p>

          <div style={{ width: "100%", maxWidth: "780px" }}>
            <p
              className="font-mono-accent mb-3"
              style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.18em", fontSize: "0.62rem" }}
            >
              ⚠ IMPORTANT: WATCH THIS BEFORE YOUR CALL
            </p>
            <WistiaEmbed mediaId={MAIN_VSL} aspect={1.5384615384615385} />
          </div>
        </section>

        {/* ── Process ──────────────────────────────────────────────────────── */}
        <section style={{ padding: "0 1.5rem 100px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p
              className="font-mono-accent text-center mb-3"
              style={{ color: "rgba(184,255,0,0.4)", letterSpacing: "0.18em", fontSize: "0.65rem" }}
            >
              THE PROCESS
            </p>
            <h2
              className="font-display text-center leading-none mb-14"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#fff" }}
            >
              HOW WE GET YOU TO{" "}
              <span style={{ color: "#b8ff00" }}>$100K MRR AND BEYOND</span>
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2rem",
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
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(184,255,0,0.12)",
                    borderRadius: "16px",
                    padding: "2rem",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    className="font-display"
                    style={{
                      position: "absolute",
                      top: "-0.5rem",
                      right: "1rem",
                      fontSize: "6rem",
                      color: "rgba(184,255,0,0.07)",
                      lineHeight: 1,
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  >
                    {step.num}
                  </div>
                  <div
                    className="font-mono-accent mb-3"
                    style={{
                      color: "#b8ff00",
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      background: "rgba(184,255,0,0.1)",
                      border: "1px solid rgba(184,255,0,0.2)",
                      display: "inline-block",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "999px",
                    }}
                  >
                    STEP {step.num}
                  </div>
                  <h3
                    className="font-display leading-none mb-3"
                    style={{ fontSize: "1.5rem", color: "#fff" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.95rem",
                      color: "rgba(255,255,255,0.55)",
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
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          WAVE: dark → white
      ══════════════════════════════════════════════════════════════════════ */}
      <div style={{ position: "relative", zIndex: 2 }}><WaveDarkToWhite /></div>

      {/* ══════════════════════════════════════════════════════════════════════
          WHITE ZONE: FAQ Videos
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "#ffffff",
          padding: "80px 1.5rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            className="font-mono-accent text-center mb-3"
            style={{ color: "rgba(3,8,0,0.3)", letterSpacing: "0.18em", fontSize: "0.65rem" }}
          >
            BEFORE YOUR CALL
          </p>
          <h2
            className="font-display text-center leading-none mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#060d00" }}
          >
            ANSWERS TO EVERY QUESTION
            <br />
            <span style={{ color: "#3a7d00" }}>YOU'RE PROBABLY THINKING RIGHT NOW</span>
          </h2>
          <p
            className="text-center"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              color: "rgba(3,8,0,0.45)",
              maxWidth: "560px",
              margin: "0 auto 3.5rem",
              lineHeight: 1.6,
            }}
          >
            Watch the ones that matter to you. Each is short and straight to the point.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2.5rem",
            }}
          >
            {FAQ_VIDEOS.map((v) => (
              <div key={v.id}>
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3a7d00", flexShrink: 0 }} />
                  <h3 className="font-display" style={{ fontSize: "1.1rem", color: "#060d00", lineHeight: 1.1 }}>
                    {v.title.toUpperCase()}
                  </h3>
                </div>
                <WistiaEmbed mediaId={v.id} aspect={1.5384615384615385} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          WAVE: white → dark
      ══════════════════════════════════════════════════════════════════════ */}
      <div style={{ position: "relative", zIndex: 2 }}><WaveWhiteToDark /></div>

      {/* ══════════════════════════════════════════════════════════════════════
          DARK ZONE: Final CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "#060d00",
          padding: "80px 1.5rem 100px",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <p
            className="font-mono-accent mb-4"
            style={{ color: "rgba(184,255,0,0.4)", letterSpacing: "0.18em", fontSize: "0.65rem" }}
          >
            YOUR NEXT STEP
          </p>
          <h2
            className="font-display leading-none mb-6"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: "#fff" }}
          >
            READY TO BUILD YOUR
            <br />
            <span style={{ color: "#b8ff00" }}>ACQUISITION MACHINE?</span>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.65,
              marginBottom: "2.5rem",
            }}
          >
            Your call is already booked. Show up ready — we'll map out your entire funnel live and tell you exactly what we'd do for your business.
          </p>
          <a
            href="https://mail.google.com/mail/?view=cm&to=tian@kairoscales.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lime"
            style={{ fontSize: "1.1rem", padding: "1rem 2.5rem" }}
          >
            View My Booking →
          </a>
          <p
            style={{
              marginTop: "1rem",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            No obligation. 30 minutes. We map out your entire funnel live.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "#060d00",
          borderTop: "1px solid rgba(184,255,0,0.06)",
          color: "rgba(255,255,255,0.18)",
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "0.75rem",
          textAlign: "center",
          padding: "1.5rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        © 2025 Kairo Marketing. All rights reserved.
      </footer>
    </div>
  );
}
