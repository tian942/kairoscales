/**
 * Lead capture overlay — visitor types their email into a liquid glass
 * capsule, the capsule melts into an orb and ripples, then we hand them to
 * Calendly with the email (and any UTM params) prefilled.
 *
 * Same-tab navigation on purpose: opening a new tab after the animation
 * delay would be blocked as a popup.
 */

import { useEffect, useRef, useState } from "react";
import { CALENDLY } from "@/components/kg";

interface LeadPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

type Stage = "idle" | "sending" | "done";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function bookingUrl(email: string) {
  const url = new URL(CALENDLY);
  url.searchParams.set("email", email);
  const here = new URLSearchParams(window.location.search);
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((k) => {
    const v = here.get(k);
    if (v) url.searchParams.set(k, v);
  });
  return url.toString();
}

export function LeadPopup({ isOpen, onClose }: LeadPopupProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
      setStage("idle");
      setError("");
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stage !== "idle") return;
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setError("Please enter a valid email address.");
      inputRef.current?.focus();
      return;
    }
    setError("");
    const target = bookingUrl(value);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.location.href = target;
      return;
    }
    setStage("sending");
    timers.current.push(window.setTimeout(() => setStage("done"), 950));
    timers.current.push(window.setTimeout(() => { window.location.href = target; }, 1900));
  };

  if (!isOpen) return null;

  return (
    <div
      className="kg-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="kg-capture-title"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`kg-panel kg-modal-card ${stage === "done" ? "is-done" : ""}`}>
        <button type="button" className="kg-modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="kg-orb-mini" aria-hidden="true" />
        <h2 id="kg-capture-title" className="kg-modal-title">See How We'd Get You Clients</h2>
        <p className="kg-modal-sub">Enter your email and pick a time for your call.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className={`kg-capture ${stage !== "idle" ? "is-sending" : ""} ${error ? "has-error" : ""}`}>
            {stage !== "idle" && (
              <>
                <span className="kg-ripple" aria-hidden="true" />
                <span className="kg-ripple" aria-hidden="true" />
                <span className="kg-ripple" aria-hidden="true" />
              </>
            )}
            <label htmlFor="kg-email" className="sr-only">Email address</label>
            <input
              ref={inputRef}
              id="kg-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
              aria-invalid={!!error}
              aria-describedby="kg-email-error"
              readOnly={stage !== "idle"}
            />
            <button type="submit" className="kg-capture-go" aria-label="Continue to booking">
              {stage === "done" ? (
                <svg className="kg-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
                </svg>
              )}
            </button>
          </div>
          <p id="kg-email-error" className="kg-capture-error" role="alert">{error}</p>
        </form>

        <div aria-live="polite">
          {stage === "done" && (
            <div className="kg-sent">
              <strong>You're in.</strong>
              <span>Opening the calendar…</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
