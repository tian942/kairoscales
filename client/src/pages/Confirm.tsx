/**
 * KAIRO MARKETING — /confirm (post-booking confirmation, liquid glass)
 * NOT linked from main site — share URL directly with booked leads only.
 * Layout: hero + VSL → process → FAQ videos → closing note.
 */

import { useEffect } from "react";
import { Brand, Eyebrow, Icon, WistiaPlayer, useKairoGlass } from "@/components/kg";

const MAIN_VSL = "tpsxzf817l";
const FAQ_VIDEOS = [
  { id: "4wkyasbpnx", title: "What Is This About?" },
  { id: "8yxov5xp3c", title: "Who Are We?" },
  { id: "00f88pr2c2", title: "Are You Qualified?" },
  { id: "jwtud91hcb", title: "I Was Burned Before" },
  { id: "3wrg5yt372", title: "Can I Afford To Spend Money To Get Clients?" },
  { id: "g3dj0xgdcu", title: "The Plan" },
];

const STEPS = [
  {
    num: "01",
    title: "We map your acquisition system",
    body: "We go through your current offer, ticket size, who your ideal clients are, and where your new opportunities come from today.",
    icon: Icon.target,
  },
  {
    num: "02",
    title: "We build and launch it",
    body: "Prospect lists, trained callers, messaging, psychological framework, qualification, and handoff. Launched in 14 days. You don't need to hire anyone or make the calls.",
    icon: Icon.team,
  },
  {
    num: "03",
    title: "Your team closes",
    body: "We create the opportunities. Your team closes. We've taken clients from $42K to $105K/month and beyond — and an efficiently run acquisition system creates higher multiples for when you're looking to sell. That's what we want to help you build.",
    icon: Icon.handoff,
  },
];

export default function Confirm() {
  const rootRef = useKairoGlass<HTMLDivElement>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={rootRef} className="kg-page">
      <div className="kg-nav-wrap">
        <nav className="kg-nav" aria-label="Main" style={{ width: "min(100%, 760px)" }}>
          <Brand />
        </nav>
      </div>

      <main>
        <section className="kg-hero" style={{ minHeight: 0 }} aria-labelledby="confirm-title">
          <div className="kg-container" style={{ maxWidth: 920, display: "grid", gap: 24, justifyItems: "center", textAlign: "center" }}>
            <Eyebrow>YOUR CALL IS CONFIRMED</Eyebrow>
            <h1 id="confirm-title" className="kg-display kg-h2">
              YOU'RE BOOKED. <span className="kg-accent">HERE'S EXACTLY</span> WHAT HAPPENS NEXT.
            </h1>
            <p className="kg-lede" style={{ maxWidth: 580 }}>
              Watch the short video below before your call — it'll save us 20 minutes and make sure we can actually help
              you.
            </p>
            <div style={{ width: "100%", maxWidth: 820 }}>
              <div className="kg-divider"><span>⚠ IMPORTANT: WATCH THIS BEFORE YOUR CALL</span></div>
              <WistiaPlayer mediaId={MAIN_VSL} aspect={1.5384615384615385} title="Watch this before your call" />
            </div>
          </div>
        </section>

        <section className="kg-section-tight" aria-labelledby="process-title">
          <div className="kg-container">
            <div className="kg-section-head kg-reveal">
              <Eyebrow>THE PROCESS</Eyebrow>
              <h2 id="process-title" className="kg-display kg-h2">
                HOW WE GET YOU TO <span className="kg-accent">$100K MRR AND BEYOND</span>
              </h2>
            </div>
            <div className="kg-grid-3">
              {STEPS.map((s, i) => (
                <article key={s.num} className="kg-panel kg-panel-pad kg-feature kg-reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                  <div className="kg-feature-head">
                    <span className="kg-icon"><s.icon /></span>
                    <span className="kg-feature-num">STEP {s.num}</span>
                  </div>
                  <h3 className="kg-display kg-h3">{s.title.toUpperCase()}</h3>
                  <p style={{ color: "var(--muted)" }}>{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="kg-section" aria-labelledby="faq-title">
          <div className="kg-container">
            <div className="kg-section-head kg-reveal">
              <Eyebrow>BEFORE YOUR CALL</Eyebrow>
              <h2 id="faq-title" className="kg-display kg-h2">
                ANSWERS TO EVERY QUESTION <span className="kg-accent">YOU'RE PROBABLY THINKING RIGHT NOW</span>
              </h2>
              <p className="kg-lede">Watch the ones that matter to you. Each is short and straight to the point.</p>
            </div>
            <div className="kg-grid-2" style={{ gap: 28 }}>
              {FAQ_VIDEOS.map((v) => (
                <div key={v.id} className="kg-reveal" style={{ display: "grid", gap: 12 }}>
                  <h3 style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "-0.01em" }}>
                    <span className="kg-dot" aria-hidden="true" />
                    {v.title}
                  </h3>
                  <WistiaPlayer mediaId={v.id} aspect={1.5384615384615385} title={v.title} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="kg-section-tight" aria-labelledby="next-title">
          <div className="kg-container" style={{ maxWidth: 900 }}>
            <div className="kg-panel kg-panel-lime kg-panel-pad kg-reveal" style={{ display: "grid", gap: 20, justifyItems: "center", textAlign: "center" }}>
              <Eyebrow>YOUR NEXT STEP</Eyebrow>
              <h2 id="next-title" className="kg-display kg-h2">
                READY TO BUILD YOUR <span className="kg-accent">ACQUISITION MACHINE?</span>
              </h2>
              <p className="kg-lede" style={{ maxWidth: 600 }}>
                Your call is already booked. Show up ready — we'll map out your client acquisition system live and tell
                you exactly what we'd do for your business.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="kg-container" style={{ padding: "8px 16px 28px", textAlign: "center", fontSize: "0.8rem", color: "var(--muted)" }}>
        © 2026 Kairo Marketing. All rights reserved.
      </footer>
    </div>
  );
}
