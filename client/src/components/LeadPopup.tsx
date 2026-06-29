/**
 * LeadPopup — Qualifying form popup
 * Space ninja dark theme: #030800 bg, #b8ff00 accents
 * Fields: FIRST NAME, COMPANY NAME, REVENUE, YOUR OFFER IN 1 LINE
 * On submit: stores in DB via tRPC, then opens Calendly in new tab
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";

const CALENDLY = "https://calendly.com/kairoscales/30min";

interface LeadPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  companyName: string;
  revenue: string;
  offer: string;
}

export function LeadPopup({ isOpen, onClose }: LeadPopupProps) {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    companyName: "",
    revenue: "",
    offer: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const submitLead = trpc.leads.submit.useMutation({
    onSuccess: () => {
      window.open(CALENDLY, "_blank", "noopener,noreferrer");
      onClose();
      setForm({ firstName: "", companyName: "", revenue: "", offer: "" });
    },
    onError: (err) => {
      console.error("Lead submission failed:", err);
      // Still redirect even if DB save fails — don't block the user
      window.open(CALENDLY, "_blank", "noopener,noreferrer");
      onClose();
    },
  });

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.firstName.trim()) newErrors.firstName = "Required";
    if (!form.companyName.trim()) newErrors.companyName = "Required";
    if (!form.revenue.trim()) newErrors.revenue = "Required";
    if (!form.offer.trim()) newErrors.offer = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    submitLead.mutate({
      firstName: form.firstName.trim(),
      companyName: form.companyName.trim(),
      revenue: form.revenue.trim(),
      offer: form.offer.trim(),
    });
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(3,8,0,0.88)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: "#0a1205",
          border: "1px solid rgba(184,255,0,0.25)",
          boxShadow: "0 0 80px rgba(184,255,0,0.08), 0 40px 100px rgba(0,0,0,0.8)",
          animation: "popup-in 0.22s cubic-bezier(0.23,1,0.32,1) both",
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: 3, background: "linear-gradient(90deg, #b8ff00 0%, rgba(184,255,0,0.3) 100%)" }} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-150"
          style={{ color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.05)" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#b8ff00"; e.currentTarget.style.background = "rgba(184,255,0,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="p-8 pt-7">
          {/* Header */}
          <div className="mb-7">
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                color: "#b8ff00",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              ⚡ CLAIM YOUR FREE ADS
            </p>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(1.6rem,4vw,2.2rem)",
                color: "#fff",
                lineHeight: 1.05,
                letterSpacing: "0.02em",
              }}
            >
              FIRST 10 AI OPTIMISED<br />
              <span style={{ color: "#b8ff00" }}>ADS ON US</span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.5)",
                marginTop: "0.5rem",
              }}
            >
              Tell us about your business so we can prepare your ads before the call.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-5">

              {/* FIRST NAME */}
              <FieldBlock
                label="FIRST NAME"
                hint="so we know who we're talking to"
                error={errors.firstName}
              >
                <input
                  type="text"
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                  placeholder="e.g. Alex"
                  style={inputStyle(!!errors.firstName)}
                  autoFocus
                />
              </FieldBlock>

              {/* COMPANY NAME */}
              <FieldBlock
                label="COMPANY NAME"
                hint="so we can research your market"
                error={errors.companyName}
              >
                <input
                  type="text"
                  value={form.companyName}
                  onChange={handleChange("companyName")}
                  placeholder="e.g. Apex Roofing"
                  style={inputStyle(!!errors.companyName)}
                />
              </FieldBlock>

              {/* REVENUE */}
              <FieldBlock
                label="REVENUE"
                hint="so we know how to scale you"
                error={errors.revenue}
              >
                <input
                  type="text"
                  value={form.revenue}
                  onChange={handleChange("revenue")}
                  placeholder="e.g. $150K/month"
                  style={inputStyle(!!errors.revenue)}
                />
              </FieldBlock>

              {/* OFFER */}
              <FieldBlock
                label="YOUR OFFER IN 1 LINE"
                hint="so we can start writing your ads now"
                error={errors.offer}
              >
                <textarea
                  value={form.offer}
                  onChange={handleChange("offer")}
                  placeholder="e.g. We help roofers close $50K jobs from Facebook ads"
                  rows={2}
                  style={{
                    ...inputStyle(!!errors.offer),
                    resize: "none",
                    lineHeight: 1.5,
                  }}
                />
              </FieldBlock>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitLead.isPending}
                className="w-full font-display text-lg tracking-wider transition-all duration-150"
                style={{
                  background: submitLead.isPending ? "rgba(184,255,0,0.5)" : "#b8ff00",
                  color: "#030800",
                  border: "none",
                  borderRadius: "0.75rem",
                  padding: "1rem 2rem",
                  cursor: submitLead.isPending ? "not-allowed" : "pointer",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "1.1rem",
                  letterSpacing: "0.06em",
                  transform: "scale(1)",
                  boxShadow: submitLead.isPending ? "none" : "0 0 30px rgba(184,255,0,0.25)",
                }}
                onMouseEnter={(e) => {
                  if (!submitLead.isPending) {
                    e.currentTarget.style.transform = "scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 0 40px rgba(184,255,0,0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = submitLead.isPending ? "none" : "0 0 30px rgba(184,255,0,0.25)";
                }}
                onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.97)"; }}
                onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1.02)"; }}
              >
                {submitLead.isPending ? "BOOKING YOUR CALL..." : "CLAIM MY FREE ADS + BOOK CALL →"}
              </button>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.28)",
                  textAlign: "center",
                  marginTop: "-0.25rem",
                }}
              >
                No commitment. We'll prepare your ads before the call.
              </p>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes popup-in {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

function FieldBlock({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-2 mb-1.5">
        <label
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.18em",
            color: error ? "#ff6b6b" : "#b8ff00",
            textTransform: "uppercase",
          }}
        >
          {label}
        </label>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.72rem",
            color: "rgba(255,255,255,0.3)",
            fontStyle: "italic",
          }}
        >
          — {hint}
        </span>
      </div>
      {children}
      {error && (
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", color: "#ff6b6b", marginTop: "0.25rem" }}>
          {error}
        </p>
      )}
    </div>
  );
}

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${hasError ? "rgba(255,107,107,0.5)" : "rgba(184,255,0,0.18)"}`,
    borderRadius: "0.625rem",
    padding: "0.75rem 1rem",
    color: "#fff",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.15s",
  };
}
