/**
 * KAIRO — Liquid glass building blocks shared by the React pages.
 * Styling lives in /public/kairo-glass.css; interactions (nav bubble, cursor
 * depth, tilt, reveal) live in /public/kairo-glass.js and are attached by
 * useKairoGlass().
 */

import { useEffect, useRef, type ReactNode } from "react";

declare global {
  interface Window {
    KairoGlass?: { init: (root?: ParentNode) => () => void };
  }
}

export const LOGO = "/images/logo-mark.png";
export const CALENDLY = "https://calendly.com/kairoscales/30min";
export const WALL_OF_SUCCESS = "https://gamma.app/docs/Kairo-Wall-Of-Success-uuuocv1tb1866mi";

/** Attach the shared glass interactions to everything inside the returned ref. */
export function useKairoGlass<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (!ref.current || !window.KairoGlass) return;
    return window.KairoGlass.init(ref.current);
  }, []);
  return ref;
}

export function Arrow() {
  return <span className="kg-arrow" aria-hidden="true">→</span>;
}

export function Brand({ href = "/" }: { href?: string }) {
  return (
    <a href={href} className="kg-brand" aria-label="Kairo Marketing home">
      <img src={LOGO} alt="" width={38} height={38} />
      <span className="kg-brand-text">
        <span className="kg-brand-name">KAIRO</span>
        <span className="kg-brand-sub">MARKETING</span>
      </span>
    </a>
  );
}

export type NavLink = { label: string; href: string };

export function GlassNav({
  links = [],
  ctaLabel,
  onCta,
  ctaHref,
}: {
  links?: NavLink[];
  ctaLabel: string;
  onCta?: () => void;
  ctaHref?: string;
}) {
  return (
    <div className="kg-nav-wrap">
      <nav className="kg-nav" aria-label="Main">
        <Brand />
        {links.length > 0 && (
          <div className="kg-nav-links">
            <span className="kg-nav-bubble" aria-hidden="true" />
            {links.map((l) => (
              <a key={l.href} href={l.href} className="kg-nav-item">
                {l.label}
              </a>
            ))}
          </div>
        )}
        {ctaHref ? (
          <a href={ctaHref} className="kg-btn kg-btn-sm kg-nav-cta">
            {ctaLabel} <Arrow />
          </a>
        ) : (
          <button type="button" onClick={onCta} className="kg-btn kg-btn-sm kg-nav-cta">
            {ctaLabel} <Arrow />
          </button>
        )}
      </nav>
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="kg-eyebrow">
      <span className="kg-dot" aria-hidden="true" />
      {children}
    </span>
  );
}

/** Lines of copy rendered as separate paragraphs, exactly as written. */
export function Lines({ lines, className = "" }: { lines: string[]; className?: string }) {
  return (
    <div className={`kg-copy ${className}`}>
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  );
}

export function WistiaPlayer({ mediaId, aspect = 16 / 9, title, bleed = false }: { mediaId: string; aspect?: number; title: string; bleed?: boolean }) {
  useEffect(() => {
    const add = (src: string, module: boolean) => {
      if (document.querySelector(`script[src="${src}"]`)) return;
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      if (module) s.type = "module";
      document.head.appendChild(s);
    };
    add("https://fast.wistia.com/player.js", false);
    add(`https://fast.wistia.com/embed/${mediaId}.js`, true);
  }, [mediaId]);

  return (
    <div className={bleed ? "kg-bleed" : "kg-frame"}>
      <div className={bleed ? "kg-bleed-inner" : "kg-frame-inner"} role="region" aria-label={title}>
        <style>{`wistia-player[media-id='${mediaId}']:not(:defined){background:center/contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');display:block;filter:blur(5px);padding-top:${(100 / aspect).toFixed(3)}%;}`}</style>
        {/* @ts-ignore — Wistia web component */}
        <wistia-player media-id={mediaId} aspect={String(aspect)} />
      </div>
    </div>
  );
}

export function Footer({ onBook, sameSite = true }: { onBook: () => void; sameSite?: boolean }) {
  const base = sameSite ? "" : "/";
  const nav = [
    { label: "How It Works", href: `${base}#how-it-works` },
    { label: "Services", href: `${base}#services` },
    { label: "Why Kairo", href: `${base}#why-kairo` },
    { label: "Results", href: `${base}#case-studies` },
  ];
  return (
    <footer className="kg-footer">
      <div className="kg-container">
        <div className="kg-panel kg-panel-pad">
          <div className="kg-footer-grid">
            <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
              <Brand />
              <p style={{ fontWeight: 600 }}>Client acquisition systems for businesses doing $100K–$300K/month.</p>
              <p style={{ color: "var(--muted)", fontSize: "0.97rem", maxWidth: 440 }}>
                We install and operate trained outbound teams that turn completely cold prospects into qualified sales
                opportunities, without disrupting what's already working in your business.
              </p>
            </div>
            <div>
              <h4>Navigation</h4>
              <div className="kg-footer-links">
                {nav.map((l) => (
                  <a key={l.label} href={l.href}>{l.label}</a>
                ))}
                <button type="button" onClick={onBook}>Book a Call</button>
              </div>
            </div>
            <div>
              <h4>Contact</h4>
              <div className="kg-footer-links">
                <a href="mailto:tian@kairoscales.com">tian@kairoscales.com</a>
                <a href="https://kairoscales.com">kairoscales.com</a>
              </div>
              <div className="kg-socials">
                <a href="https://www.linkedin.com/in/tian-marsel-219908385/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">IN</a>
                <a href="https://www.instagram.com/tian.marsel/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
                <a href="https://x.com/tianmarsi" target="_blank" rel="noopener noreferrer" aria-label="X">X</a>
              </div>
            </div>
          </div>
          <div className="kg-legal">
            <p>
              Results mentioned are based on client outcomes and are not guaranteed. Individual results vary based on
              industry, offer, market conditions, and execution.
            </p>
            <p>© 2026 Kairo Marketing. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Icons (inline SVG, stroke = currentColor) ─────────────────────────── */

const svg = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24", "aria-hidden": true };

export const Icon = {
  phone: () => (
    <svg {...svg}><path d="M5 4h3.2l1.6 4-2 1.3a11 11 0 0 0 6.9 6.9l1.3-2 4 1.6V19a1.6 1.6 0 0 1-1.7 1.6A16.5 16.5 0 0 1 3.4 5.7 1.6 1.6 0 0 1 5 4Z" /></svg>
  ),
  mail: () => (
    <svg {...svg}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>
  ),
  megaphone: () => (
    <svg {...svg}><path d="M3 10v4a1 1 0 0 0 1 1h2l5 4V5L6 9H4a1 1 0 0 0-1 1Z" /><path d="M15 8.5a5 5 0 0 1 0 7" /><path d="M18 6a8.5 8.5 0 0 1 0 12" /></svg>
  ),
  target: () => (
    <svg {...svg}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="0.8" fill="currentColor" /></svg>
  ),
  team: () => (
    <svg {...svg}><circle cx="9" cy="8.5" r="3.2" /><path d="M3.5 19a5.5 5.5 0 0 1 11 0" /><circle cx="17" cy="9.5" r="2.4" /><path d="M16 14.2a4.5 4.5 0 0 1 4.8 4.8" /></svg>
  ),
  arc: () => (
    <svg {...svg}><path d="M4 18c2-8 6-12 8-12s6 4 8 12" /><circle cx="4" cy="18" r="1.3" /><circle cx="12" cy="6" r="1.3" /><circle cx="20" cy="18" r="1.3" /></svg>
  ),
  handoff: () => (
    <svg {...svg}><path d="M4 12h11" /><path d="m11 7 5 5-5 5" /><path d="M20 5v14" /></svg>
  ),
  shield: () => (
    <svg {...svg}><path d="M12 3 5 6v5.5c0 4.3 3 8 7 9.5 4-1.5 7-5.2 7-9.5V6l-7-3Z" /><path d="m9 12 2.2 2.2L15.5 10" /></svg>
  ),
  layers: () => (
    <svg {...svg}><path d="m12 4 8.5 4.5L12 13 3.5 8.5 12 4Z" /><path d="m3.5 12.5 8.5 4.5 8.5-4.5" /><path d="m3.5 16.5 8.5 4.5 8.5-4.5" /></svg>
  ),
};
