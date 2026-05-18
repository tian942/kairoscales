/**
 * KAIRO MARKETING — /confirm page (post-booking confirmation)
 * Layout: Dark Hero+VSL+Process → wave → White FAQ Videos → wave → Dark CTA
 * NOT linked from main site — share URL directly with booked leads only.
 */

import { useEffect } from "react";

const LOGO = "/images/logo.png";
const ROCKET_BG = "/manus-storage/cartoon_rocket2_28867f4d.png";

const MAIN_VSL = "tpsxzf817l";
const FAQ_VIDEOS = [
  { id: "4wkyasbpnx", title: "What Is This About?" },
  { id: "8yxov5xp3c", title: "Who Are We?" },
  { id: "00f88pr2c2", title: "Are You Qualified?" },
  { id: "jwtud91hcb", title: "I Was Burned Before" },
  { id: "3wrg5yt372", title: "Can I Afford To Spend Money To Get Clients?" },
  { id: "g3dj0xgdcu", title: "The Plan" },
];

function StarField() {
  return (
    <div className="star-field" aria-hidden="true">
      <div className="stars stars-sm" />
      <div className="stars stars-md" />
      <div className="stars stars-lg" />
    </div>
  );
}

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
    <div style={{ background: "#030800", color: "#fff" }}>

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          height: 64, display: "flex", alignItems: "center",
          padding: "0 3rem",
          background: "rgba(3,8,0,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(184,255,0,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img src={LOGO} alt="Kairo" style={{ height: 36, width: 36, objectFit: "contain", filter: "invert(1) brightness(10)" }} />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span className="font-display" style={{ color: "#b8ff00", fontSize: "1.25rem" }}>KAIRO</span>
            <span className="font-mono-accent" style={{ color: "rgba(184,255,0,0.45)", letterSpacing: "0.12em", fontSize: "0.55rem" }}>MARKETING</span>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════════════
          DARK ZONE: Hero + VSL + Process
      ══════════════════════════════════════════════════════════════════════ */}
      <div style={{ background: "#030800", position: "relative", overflow: "hidden" }}>
        <StarField />

        {/* Rocket ninja — absolute, right side, behind content */}
        <img
          src={ROCKET_BG}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50px",
            right: "0",
            height: "90vh",
            width: "auto",
            maxWidth: "50%",
            opacity: 0.85,
            pointerEvents: "none",
            zIndex: 0,
            maskImage: "linear-gradient(to left, rgba(0,0,0,0.95) 30%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.95) 30%, rgba(0,0,0,0) 100%)",
          }}
        />

        {/* Hero */}
        <section
          style={{
            position: "relative", zIndex: 2,
            paddingTop: 100, paddingBottom: 80,
            paddingLeft: "1.5rem", paddingRight: "1.5rem",
            display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
          }}
        >
          <div
            className="font-mono-accent"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              marginBottom: "1.5rem", padding: "0.375rem 0.875rem",
              borderRadius: 999,
              background: "rgba(184,255,0,0.08)",
              border: "1px solid rgba(184,255,0,0.25)",
              color: "#b8ff00", letterSpacing: "0.12em", fontSize: "0.65rem",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#b8ff00", animation: "pulse 2s infinite" }} />
            YOUR CALL IS CONFIRMED
          </div>

          <h1
            className="font-display"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#fff", lineHeight: 1, marginBottom: "1rem", maxWidth: 860 }}
          >
            YOU'RE BOOKED.{" "}
            <span style={{ color: "#b8ff00" }}>HERE'S EXACTLY</span>
            <br />WHAT HAPPENS NEXT.
          </h1>

          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "clamp(0.95rem,1.6vw,1.1rem)", color: "rgba(255,255,255,0.5)", maxWidth: 600, lineHeight: 1.6, marginBottom: "2.5rem" }}>
            Watch the short video below before your call — it'll save us 20 minutes and make sure we can actually help you.
          </p>

          <div style={{ width: "100%", maxWidth: 780, position: "relative", zIndex: 3 }}>
            <p className="font-mono-accent" style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.18em", fontSize: "0.62rem", marginBottom: "0.75rem" }}>
              ⚠ IMPORTANT: WATCH THIS BEFORE YOUR CALL
            </p>
            <WistiaEmbed mediaId={MAIN_VSL} />
          </div>
        </section>

        {/* Process */}
        <section style={{ position: "relative", zIndex: 2, padding: "0 1.5rem 100px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <p className="font-mono-accent" style={{ textAlign: "center", color: "rgba(184,255,0,0.4)", letterSpacing: "0.18em", fontSize: "0.65rem", marginBottom: "0.75rem" }}>
              THE PROCESS
            </p>
            <h2 className="font-display" style={{ textAlign: "center", fontSize: "clamp(2rem,4vw,3.2rem)", color: "#fff", lineHeight: 1, marginBottom: "3.5rem" }}>
              HOW WE GET YOU TO <span style={{ color: "#b8ff00" }}>$100K MRR AND BEYOND</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "2rem" }}>
              {[
                { num: "01", title: "WE AUDIT YOUR FUNNEL", body: "We go through your current offer, ticket size, lead volume, and what's breaking. Most businesses we talk to are sitting on $50K–$100K/month they're not capturing yet." },
                { num: "02", title: "WE BUILD EVERYTHING", body: "Ads, VSL, funnel, emails, automations. Done in 14 days. You don't lift a finger — we do it all." },
                { num: "03", title: "YOU SCALE", body: "We optimise weekly. You focus on fulfillment. We've taken clients from $42K to $105K/month and beyond. We want to take you there too — because an efficiently run acquisition system creates higher multiples for when you're looking to sell. That's what we want to help you build." },
              ].map(step => (
                <div key={step.num} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(184,255,0,0.12)", borderRadius: 16, padding: "2rem", position: "relative", overflow: "hidden" }}>
                  <div className="font-display" style={{ position: "absolute", top: "-0.5rem", right: "1rem", fontSize: "6rem", color: "rgba(184,255,0,0.07)", lineHeight: 1, userSelect: "none" }}>{step.num}</div>
                  <div className="font-mono-accent" style={{ color: "#b8ff00", fontSize: "0.65rem", letterSpacing: "0.15em", background: "rgba(184,255,0,0.1)", border: "1px solid rgba(184,255,0,0.2)", display: "inline-block", padding: "0.25rem 0.75rem", borderRadius: 999, marginBottom: "0.75rem" }}>STEP {step.num}</div>
                  <h3 className="font-display" style={{ fontSize: "1.5rem", color: "#fff", lineHeight: 1, marginBottom: "0.75rem" }}>{step.title}</h3>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wave: dark → white — lives INSIDE the dark div so background matches */}
        <div style={{ lineHeight: 0, marginBottom: -1 }}>
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ width: "100%", height: 70, display: "block" }}>
            <path d="M0,45 C360,90 720,0 1080,45 C1260,67 1380,30 1440,45 L1440,90 L0,90 Z" fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          WHITE ZONE: FAQ Videos
      ══════════════════════════════════════════════════════════════════════ */}
      <div style={{ background: "#ffffff" }}>
        <section style={{ padding: "80px 1.5rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <p className="font-mono-accent" style={{ textAlign: "center", color: "rgba(3,8,0,0.3)", letterSpacing: "0.18em", fontSize: "0.65rem", marginBottom: "0.75rem" }}>
              BEFORE YOUR CALL
            </p>
            <h2 className="font-display" style={{ textAlign: "center", fontSize: "clamp(2rem,4vw,3.2rem)", color: "#060d00", lineHeight: 1, marginBottom: "1rem" }}>
              ANSWERS TO EVERY QUESTION<br />
              <span style={{ color: "#3a7d00" }}>YOU'RE PROBABLY THINKING RIGHT NOW</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", color: "rgba(3,8,0,0.45)", maxWidth: 560, margin: "0 auto 3.5rem", lineHeight: 1.6, textAlign: "center" }}>
              Watch the ones that matter to you. Each is short and straight to the point.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "2.5rem" }}>
              {FAQ_VIDEOS.map(v => (
                <div key={v.id}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3a7d00", flexShrink: 0 }} />
                    <h3 className="font-display" style={{ fontSize: "1.1rem", color: "#060d00", lineHeight: 1.1 }}>{v.title.toUpperCase()}</h3>
                  </div>
                  <WistiaEmbed mediaId={v.id} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Wave: white → dark — lives INSIDE the white div so background matches */}
        <div style={{ lineHeight: 0, fontSize: 0, overflow: "hidden" }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: 80, display: "block" }}>
            {/* Full dark fill from top, wave cuts into white at bottom */}
            <path d="M0,0 L1440,0 L1440,80 L0,80 Z" fill="#060d00" />
            {/* White wave shape that peeks up from the bottom */}
            <path d="M0,40 C240,80 480,10 720,40 C960,70 1200,20 1440,40 L1440,80 L0,80 Z" fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          DARK ZONE: Final CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section style={{ background: "#060d00", padding: "80px 1.5rem 100px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <p className="font-mono-accent" style={{ color: "rgba(184,255,0,0.4)", letterSpacing: "0.18em", fontSize: "0.65rem", marginBottom: "1rem" }}>
            YOUR NEXT STEP
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)", color: "#fff", lineHeight: 1, marginBottom: "1.5rem" }}>
            READY TO BUILD YOUR<br />
            <span style={{ color: "#b8ff00" }}>ACQUISITION MACHINE?</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1.05rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>
            Your call is already booked. Show up ready — we'll map out your entire funnel live and tell you exactly what we'd do for your business.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#060d00", borderTop: "1px solid rgba(184,255,0,0.06)", color: "rgba(255,255,255,0.18)", fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", textAlign: "center", padding: "1.5rem" }}>
        © 2025 Kairo Marketing. All rights reserved.
      </footer>
    </div>
  );
}
