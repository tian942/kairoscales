/**
 * KAIRO MARKETING — /strategies (liquid glass)
 * Single centered column above the fold: headline → VSL → CTA.
 */

import { useCallback, useEffect, useState } from "react";
import { LeadPopup } from "@/components/LeadPopup";
import { Arrow, Eyebrow, GlassNav, WistiaPlayer, useKairoGlass } from "@/components/kg";

export default function Strategies() {
  const rootRef = useKairoGlass<HTMLDivElement>();
  const [popupOpen, setPopupOpen] = useState(false);
  const openPopup = useCallback(() => setPopupOpen(true), []);
  const closePopup = useCallback(() => setPopupOpen(false), []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={rootRef} className="kg-page">
      <LeadPopup isOpen={popupOpen} onClose={closePopup} />
      <GlassNav ctaLabel="Book a Call" onCta={openPopup} />

      <main className="kg-hero" style={{ minHeight: "100vh", paddingBottom: 48 }}>
        <div className="kg-container" style={{ maxWidth: 920, display: "grid", gap: 26, justifyItems: "center", textAlign: "center" }}>
          <Eyebrow>HOW IT WORKS</Eyebrow>
          <h1 className="kg-display kg-h2" style={{ fontSize: "clamp(2.1rem, 4.4vw, 3.8rem)" }}>
            HOW WE ARE ADDING <span className="kg-accent">$100K MRR</span> TO BUSINESSES WITHOUT ADDING ANY MARKETING
            EXPENSES.
          </h1>

          <div style={{ width: "100%", maxWidth: 820 }}>
            <div className="kg-divider"><span>⚠ IMPORTANT: BREAKDOWN OF WHAT WE DO FOR YOU</span></div>
            <WistiaPlayer mediaId="rea760ihyv" title="Breakdown of what we do for you" />
          </div>

          <button type="button" className="kg-btn kg-btn-lg" onClick={openPopup}>
            Book Your Free Implementation Session <Arrow />
          </button>
          <a href="/" className="kg-textlink" style={{ color: "var(--muted)" }}>← Back to Home</a>
        </div>
      </main>

      <footer className="kg-container" style={{ paddingBottom: 24, textAlign: "center", fontSize: "0.8rem", color: "var(--muted)" }}>
        © 2026 Kairo Marketing. All rights reserved.
      </footer>
    </div>
  );
}
