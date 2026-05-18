/**
 * KAIRO MARKETING — STEALTH OPERATOR DESIGN (v3)
 * Hero: Full-bleed cartoon space ninja background + Wistia VSL floating below CTA
 * Navbar: Kairo logo image + scribbled "Marketing" text
 * All buttons → Calendly: https://calendly.com/kairoscales/30min
 * Illustrations: Hand-drawn ink cartoon style (Megalodon-inspired)
 * Sections: Alternating dark/white with wavy SVG dividers
 */

import { useEffect } from "react";

const CALENDLY = "https://calendly.com/kairoscales/30min";

const MONSTER_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663164421367/5heSeJh2v29W3kmYZUe7Wn/space_monster_peek-noMfNZoaxLGXzjJ57aKYKn.webp";

const IMAGES = {
  hero:    "https://d2xsxph8kpxj0f.cloudfront.net/310519663164421367/5heSeJh2v29W3kmYZUe7Wn/cartoon_hero2-7wf2Gc4wEcVvq39wE3W39M.webp",
  feature: "https://d2xsxph8kpxj0f.cloudfront.net/310519663164421367/5heSeJh2v29W3kmYZUe7Wn/cartoon_feature2-nigtQtFxgVKSbKFF7EitrF.webp",
  funnel:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663164421367/5heSeJh2v29W3kmYZUe7Wn/cartoon_funnel2-bDuWPKGAdCczNtJDcf7EWK.webp",
  ads:     "https://d2xsxph8kpxj0f.cloudfront.net/310519663164421367/5heSeJh2v29W3kmYZUe7Wn/cartoon_ads2-D8NfJMVPBFbubWKSDUCF7K.webp",
  vsl:     "https://d2xsxph8kpxj0f.cloudfront.net/310519663164421367/5heSeJh2v29W3kmYZUe7Wn/cartoon_vsl2-Y7WbK2qxdnf2CRYnnKFC7x.webp",
  emails:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663164421367/5heSeJh2v29W3kmYZUe7Wn/cartoon_emails2-5Kvb4ssMrSjwXrDgHFGpW2.webp",
  rocket:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663164421367/5heSeJh2v29W3kmYZUe7Wn/cartoon_rocket2-9qwcXDpuA9GuXn5PPgyTpa.webp",
  logo:    "/manus-storage/kairo_logo_b18a7729.png",
};

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// Inject Wistia scripts once
function useWistia() {
  useEffect(() => {
    if (!document.querySelector('script[src="https://fast.wistia.com/player.js"]')) {
      const s1 = document.createElement("script");
      s1.src = "https://fast.wistia.com/player.js";
      s1.async = true;
      document.head.appendChild(s1);
    }
    if (!document.querySelector('script[src="https://fast.wistia.com/embed/7i60n49s27.js"]')) {
      const s2 = document.createElement("script");
      s2.src = "https://fast.wistia.com/embed/7i60n49s27.js";
      s2.async = true;
      s2.type = "module";
      document.head.appendChild(s2);
    }
    // Inject wistia swatch style
    if (!document.querySelector("style[data-wistia]")) {
      const style = document.createElement("style");
      style.setAttribute("data-wistia", "true");
      style.textContent = `wistia-player[media-id='7i60n49s27']:not(:defined){background:center/contain no-repeat url('https://fast.wistia.com/embed/medias/7i60n49s27/swatch');display:block;filter:blur(5px);padding-top:56.25%;}`;
      document.head.appendChild(style);
    }
  }, []);
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

function WaveUp({ fromWhite = true }: { fromWhite?: boolean }) {
  const fill = fromWhite ? "#060d00" : "#ffffff";
  const bg   = fromWhite ? "#ffffff" : "#060d00";
  return (
    <div style={{ background: bg, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ width: "100%", height: 70, display: "block" }}>
        <path d="M0,45 C360,0 720,90 1080,45 C1260,22 1380,60 1440,45 L1440,90 L0,90 Z" fill={fill} />
      </svg>
    </div>
  );
}

// ─── Star Field ───────────────────────────────────────────────────────────────

function StarField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div className="stars-layer-1" />
      <div className="stars-layer-2" />
      <div className="stars-layer-3" />
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(6,13,0,0.80)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(184,255,0,0.12)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={IMAGES.logo} alt="Kairo" style={{ height: 40, width: 40, objectFit: "contain", filter: "invert(1) brightness(10)" }} />
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl tracking-wider" style={{ color: "#b8ff00", lineHeight: 1 }}>KAIRO</span>
            <span className="font-mono-accent text-xs" style={{ color: "rgba(184,255,0,0.5)", letterSpacing: "0.12em", fontSize: "0.6rem" }}>MARKETING</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-7">
          {[
            { label: "How It Works", id: "how-it-works" },
            { label: "Services",     id: "services" },
            { label: "Why Kairo",    id: "why-kairo" },
            { label: "Results",      id: "results" },
          ].map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans',sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#b8ff00")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
            >{item.label}</button>
          ))}
        </div>

        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-white" style={{ padding: "0.5rem 1.5rem", fontSize: "0.9rem" }}>
          Book a Call →
        </a>
      </div>
    </nav>
  );
}

// ─── Wistia VSL Player ────────────────────────────────────────────────────────

function WistiaVSL() {
  useWistia();
  return (
    <div className="reveal" style={{ transitionDelay: "200ms", maxWidth: 820, margin: "0 auto" }}>
      {/* Video player — clean, no border */}
      <div
        style={{
          borderRadius: "1rem",
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
          background: "#000",
        }}
      >
        {/* @ts-ignore */}
        <wistia-player media-id="7i60n49s27" aspect="1.7777777777777777" />
      </div>
    </div>
  );
}

// ─── SECTION 1: Hero ─────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-start overflow-hidden" style={{ paddingTop: 64 }}>
      {/* Full-bleed background */}
      <div className="absolute inset-0">
        <img src={IMAGES.hero} alt="" className="w-full h-full object-cover" style={{ objectPosition: "65% center" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(6,13,0,0.93) 0%, rgba(6,13,0,0.78) 45%, rgba(6,13,0,0.3) 72%, rgba(6,13,0,0.05) 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-48" style={{ background: "linear-gradient(to bottom, transparent, #060d00)" }} />
      </div>

      <StarField count={50} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        {/* Top copy */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono-accent mb-8"
            style={{ background: "rgba(184,255,0,0.12)", border: "1px solid rgba(184,255,0,0.35)", color: "#b8ff00", letterSpacing: "0.1em" }}>
            <span className="w-2 h-2 rounded-full" style={{ background: "#b8ff00", animation: "pulse-glow 2s infinite" }} />
            FOR BUSINESSES DOING $100K–$300K/MONTH
          </div>

          <h1 className="font-display leading-none mb-6" style={{ fontSize: "clamp(3.5rem,8vw,6.5rem)", color: "#fff" }}>
            PROVEN MARKETING<br />
            <span style={{ color: "#b8ff00" }}>MISSIONS</span><br />
            FOR HIGH-GROWTH<br />
            BUSINESSES
          </h1>

          <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans',sans-serif", maxWidth: 520 }}>
            Kairo Marketing builds your entire end-to-end paid funnel to get you to{" "}
            <strong style={{ color: "#fff" }}>$300K/month</strong> — or you don't pay.
            5X average ROAS. 14 days to launch.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-lime" style={{ fontSize: "1rem" }}>
              Begin Your Mission →
            </a>
            <button onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-outline-lime" style={{ fontSize: "1rem" }}>
              See How It Works
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 mb-14">
            {[
              { value: "5X",  label: "AVERAGE ROAS" },
              { value: "14",  label: "DAYS TO LAUNCH" },
              { value: "$0",  label: "IF WE DON'T PERFORM" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div className="font-display" style={{ fontSize: "2.8rem", color: "#b8ff00", lineHeight: 1 }}>{s.value}</div>
                <div className="font-mono-accent" style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.12em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating VSL */}
        <WistiaVSL />
      </div>
    </section>
  );
}

// ─── SECTION 2 (DARK): How It Works ──────────────────────────────────────────

function HowItWorksSection() {
  return (
    <>
      <section id="how-it-works" className="relative py-24 overflow-hidden" style={{ background: "#060d00" }}>
        <StarField count={35} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14 reveal">
            <p className="font-mono-accent text-xs mb-3" style={{ color: "#b8ff00", letterSpacing: "0.2em" }}>INTELLIGENCE BRIEFING</p>
            <h2 className="font-display" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: "#fff" }}>
              THERE IS A MORE EFFICIENT WAY TO<br />
              <span style={{ color: "#b8ff00" }}>DOMINATE YOUR MARKET</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="reveal rounded-2xl p-8 relative overflow-hidden" style={{ background: "#0f1a08", border: "1px solid rgba(184,255,0,0.15)" }}>
              <div className="absolute top-0 right-0 w-56 h-56 pointer-events-none" style={{ background: "radial-gradient(circle,rgba(184,255,0,0.05) 0%,transparent 70%)" }} />
              <h3 className="font-display mb-4" style={{ fontSize: "2rem", color: "#fff" }}>FULL FUNNEL DOMINATION</h3>
              <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans',sans-serif" }}>
                We don't run ads. We build weapons. Your entire revenue machine — funnel, copy, VSL, emails, automations — engineered from scratch in 14 days. We replicate the precision of an organic sales process through paid advertising.
              </p>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-outline-lime" style={{ fontSize: "0.9rem" }}>View Our Strategies →</a>
            </div>

            <div className="reveal rounded-2xl p-8 relative overflow-hidden" style={{ background: "#b8ff00", transitionDelay: "100ms" }}>
              <h3 className="font-display mb-4" style={{ fontSize: "2rem", color: "#060d00" }}>ZERO RISK PERFORMANCE GUARANTEE</h3>
              <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(6,13,0,0.72)", fontFamily: "'DM Sans',sans-serif" }}>
                Your business needs consistency, not casino odds. We deploy proven conversion mechanisms — VSLs, call funnels, DM strategies, webinars, and lead qualification systems. If your revenue doesn't go up? You don't pay. Simple.
              </p>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-lime" style={{ fontSize: "0.9rem", background: "#060d00", color: "#b8ff00" }}>Learn More →</a>
            </div>
          </div>
        </div>
      </section>
      <WaveDown fromDark={true} />
    </>
  );
}

// ─── SECTION 3 (WHITE): Services ─────────────────────────────────────────────

function ServicesSection() {
  const services = [
    { title: "FUNNEL ARCHITECTURE", image: IMAGES.funnel, desc: "We design and build your entire revenue machine from scratch — landing pages, VSLs, thank-you pages, and every micro-step in between that turns cold traffic into closed deals." },
    { title: "AD WARFARE",          image: IMAGES.ads,    desc: "We've mastered paid advertising across Meta, Google, and YouTube. Our content advertising strategies leverage reels, shorts, and long-form video to drive qualified traffic that converts at scale." },
    { title: "VSL MASTERY",         image: IMAGES.vsl,    desc: "If you have a high-ticket offer, your VSL is your most powerful weapon. We script, produce, and optimize video sales letters that pre-sell your prospects before they ever talk to your team." },
    { title: "EMAIL & AUTOMATION",  image: IMAGES.emails, desc: "Complete email sequences and automation systems for every stage of your funnel — opt-in flows, nurture sequences, and re-engagement campaigns that work while you sleep." },
  ];

  return (
    <>
      <section id="services" style={{ background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14 reveal">
            <p className="font-mono-accent text-xs mb-3" style={{ color: "#060d00", letterSpacing: "0.2em", opacity: 0.45 }}>MISSION SPECIALIZATIONS</p>
            <h2 className="font-display" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: "#060d00" }}>
              WE HELP HIGH-GROWTH BUSINESSES<br />BREAK THROUGH THEIR CEILING
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc, i) => (
              <div key={svc.title} className="reveal service-card" style={{ transitionDelay: `${i * 80}ms`, background: "#0f1a08", border: "1px solid rgba(184,255,0,0.1)" }}>
                <div className="relative overflow-hidden" style={{ height: 260 }}>
                  <img src={svc.image} alt={svc.title} className="w-full h-full object-cover object-top transition-transform duration-500"
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(15,26,8,1) 0%,rgba(15,26,8,0.2) 55%,transparent 100%)" }} />
                </div>
                <div className="p-6">
                  <h3 className="font-display mb-3" style={{ fontSize: "1.4rem", color: "#fff" }}>{svc.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.58)", fontFamily: "'DM Sans',sans-serif" }}>{svc.desc}</p>
                  <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold" style={{ color: "#b8ff00", fontFamily: "'DM Sans',sans-serif" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#d4ff40")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#b8ff00")}
                  >Book a Call →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <WaveUp fromWhite={true} />
    </>
  );
}

// ─── SECTION 4 (DARK): Why Kairo + Rocket ────────────────────────────────────

function WhyKairoSection() {
  return (
    <>
      <section id="why-kairo" className="relative py-24 overflow-hidden" style={{ background: "#060d00" }}>
        <StarField count={45} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <p className="font-mono-accent text-xs mb-4" style={{ color: "#b8ff00", letterSpacing: "0.2em" }}>THE KAIRO ADVANTAGE</p>
              <h2 className="font-display mb-6" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: "#fff", lineHeight: 1.05 }}>
                WITH FAILING AGENCIES<br />ASKING FOR MORE,<br />
                <span style={{ color: "#b8ff00" }}>BUSINESSES CHOOSE KAIRO</span><br />FOR RESULTS.
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans',sans-serif", maxWidth: 500 }}>
                Traditional agencies promise the world, deliver excuses, and ask for more budget. We built Kairo differently. We only win when you win — every decision we make is engineered for your revenue growth, not our retainer.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans',sans-serif", maxWidth: 500 }}>
                Our clients are breaking through $300K/month ceilings using our proven content advertising strategies combined with precision conversion mechanisms.
              </p>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-lime" style={{ fontSize: "1rem" }}>Book a Strategy Call →</a>
            </div>

            <div className="reveal flex justify-center lg:justify-end" style={{ transitionDelay: "150ms" }}>
              <img src={IMAGES.rocket} alt="Space Ninja on Rocket" className="animate-float"
                style={{ width: "100%", maxWidth: 600, objectFit: "contain", filter: "drop-shadow(0 0 40px rgba(184,255,0,0.2))" }} />
            </div>
          </div>
        </div>
      </section>
      <WaveDown fromDark={true} />
    </>
  );
}

// ─── SECTION 5 (WHITE): Pain Points ──────────────────────────────────────────

function ResultsSection() {
  const problems = [
    {
      icon: (
        <svg viewBox="0 0 48 48" width="44" height="44" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Skull — hand-drawn cartoon style */}
          <ellipse cx="24" cy="20" rx="14" ry="13" stroke="#b8ff00" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <path d="M14 28 Q12 36 16 38 L32 38 Q36 36 34 28" stroke="#b8ff00" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <line x1="20" y1="38" x2="20" y2="33" stroke="#b8ff00" strokeWidth="2" strokeLinecap="round"/>
          <line x1="28" y1="38" x2="28" y2="33" stroke="#b8ff00" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="19" cy="20" r="3.5" stroke="#b8ff00" strokeWidth="2" fill="none"/>
          <circle cx="29" cy="20" r="3.5" stroke="#b8ff00" strokeWidth="2" fill="none"/>
          <path d="M22 27 Q24 25 26 27" stroke="#b8ff00" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </svg>
      ),
      title: '"We\'ll Get You Results" — They Didn\'t',
      desc: "You've paid $5K, $10K, even $20K to agencies who promised the world. 6 months later? Same revenue. Different excuses."
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" width="44" height="44" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Slot machine / casino */}
          <rect x="8" y="10" width="32" height="28" rx="4" stroke="#b8ff00" strokeWidth="2.5" fill="none"/>
          <rect x="13" y="15" width="7" height="12" rx="2" stroke="#b8ff00" strokeWidth="2" fill="none"/>
          <rect x="20.5" y="15" width="7" height="12" rx="2" stroke="#b8ff00" strokeWidth="2" fill="none"/>
          <rect x="28" y="15" width="7" height="12" rx="2" stroke="#b8ff00" strokeWidth="2" fill="none"/>
          <path d="M16.5 21 L16.5 22" stroke="#b8ff00" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M24 20 L24 23" stroke="#b8ff00" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M31.5 21 L31.5 22" stroke="#b8ff00" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M18 31 Q24 34 30 31" stroke="#b8ff00" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M36 14 L40 10 M40 14 L36 10" stroke="#b8ff00" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: "Your Funnel is a Casino",
      desc: "Some months are great. Most aren't. You have no idea why. Your 'funnel' is a landing page, a prayer, and a Calendly link."
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" width="44" height="44" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Flame */}
          <path d="M24 42 C14 42 10 34 14 26 C16 22 18 20 18 16 C20 20 20 22 24 24 C22 18 26 12 28 8 C32 16 36 20 34 30 C36 28 37 24 36 20 C40 26 40 36 34 40 C32 42 28 43 24 42 Z" stroke="#b8ff00" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
          <path d="M22 36 C18 34 17 30 20 27 C21 30 23 31 24 33 C25 31 25 29 24 27 C27 29 28 33 26 36 C25 37 23 37 22 36 Z" stroke="#b8ff00" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
        </svg>
      ),
      title: "Every Dollar Feels Like a Gamble",
      desc: "You want to scale to $50K/month in ad spend but you're terrified. Last time you scaled, ROAS tanked and you lost $12K in a week."
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" width="44" height="44" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Exhausted face */}
          <circle cx="24" cy="24" r="16" stroke="#b8ff00" strokeWidth="2.5" fill="none"/>
          <path d="M16 18 Q18 15 20 18" stroke="#b8ff00" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M28 18 Q30 15 32 18" stroke="#b8ff00" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M17 31 Q24 27 31 31" stroke="#b8ff00" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <path d="M20 22 L28 22" stroke="#b8ff00" strokeWidth="2" strokeLinecap="round"/>
          <path d="M22 22 L22 26" stroke="#b8ff00" strokeWidth="2" strokeLinecap="round"/>
          <path d="M26 22 L26 26" stroke="#b8ff00" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: "Your Sales Team is Exhausted",
      desc: "Half your calls are tire-kickers who 'need to think about it.' Your closers are demoralized. Lead quality is the problem."
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" width="44" height="44" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Clock / alarm */}
          <circle cx="24" cy="26" r="14" stroke="#b8ff00" strokeWidth="2.5" fill="none"/>
          <path d="M24 16 L24 26 L31 30" stroke="#b8ff00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 14 Q8 10 12 8" stroke="#b8ff00" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <path d="M38 14 Q40 10 36 8" stroke="#b8ff00" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <path d="M20 40 L22 43 M28 40 L26 43" stroke="#b8ff00" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: "You're Working IN the Business",
      desc: "You're still writing copy, fixing automations, and managing ads yourself because no one else 'gets it.' You're the bottleneck."
    },
    {
      icon: (
        <svg viewBox="0 0 48 48" width="44" height="44" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Downward chart */}
          <rect x="6" y="8" width="36" height="28" rx="3" stroke="#b8ff00" strokeWidth="2.5" fill="none"/>
          <path d="M10 14 L18 20 L26 16 L38 28" stroke="#b8ff00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M32 28 L38 28 L38 22" stroke="#b8ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="6" y1="40" x2="42" y2="40" stroke="#b8ff00" strokeWidth="2" strokeLinecap="round"/>
          <line x1="6" y1="36" x2="6" y2="40" stroke="#b8ff00" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: "Starting to Think This is Your Ceiling",
      desc: "You've been at $150K–$200K for 18 months. Part of you is starting to believe $300K+ just isn't in the cards."
    },
  ];

  return (
    <>
      <section id="results" style={{ background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14 reveal">
            <p className="font-mono-accent text-xs mb-3" style={{ color: "#060d00", letterSpacing: "0.2em", opacity: 0.45 }}>WHY YOU'RE STILL STUCK</p>
            <h2 className="font-display" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: "#060d00" }}>
              YOU'VE DONE EVERYTHING RIGHT —<br />SO WHY AREN'T YOU AT $300K?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {problems.map((p, i) => (
              <div key={p.title} className="reveal rounded-xl p-6"
                style={{ background: "#060d00", border: "1px solid rgba(184,255,0,0.12)", transitionDelay: `${i * 60}ms` }}>
                <div className="mb-4">{p.icon}</div>
                <h3 className="font-semibold mb-2" style={{ color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: "1rem" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans',sans-serif" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <WaveUp fromWhite={true} />
    </>
  );
}

// ─── SECTION 6 (DARK): Operator + Meditating Ninja ───────────────────────────

function OperatorSection() {
  return (
    <>
      <section className="relative py-24 overflow-hidden" style={{ background: "#060d00" }}>
        <StarField count={40} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal flex justify-center lg:justify-start">
              <img src={IMAGES.feature} alt="Space Ninja Meditating" className="animate-float-slow rounded-2xl"
                style={{ width: "100%", maxWidth: 560, objectFit: "cover", filter: "drop-shadow(0 0 40px rgba(184,255,0,0.2))" }} />
            </div>
            <div className="reveal" style={{ transitionDelay: "120ms" }}>
              <p className="font-mono-accent text-xs mb-4" style={{ color: "#b8ff00", letterSpacing: "0.2em" }}>OUR IDEAL CLIENT</p>
              <h2 className="font-display mb-6" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: "#fff", lineHeight: 1.05 }}>
                WE WORK WITH<br /><span style={{ color: "#b8ff00" }}>SERIOUS OPERATORS</span><br />FOR A LIVING
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans',sans-serif" }}>
                We get it — you're busy, you're scaling, and you don't have time for agencies that need hand-holding. Everything we ask from you is efficient and easy to execute. We handle the heavy lifting so you can focus on closing deals.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans',sans-serif" }}>
                Our clients are breaking through ceilings they thought were permanent — using content advertising strategies their competitors said would "never work."
              </p>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-lime" style={{ fontSize: "1rem" }}>Begin Your Mission →</a>
            </div>
          </div>
        </div>
      </section>
      <WaveDown fromDark={true} />
    </>
  );
}

// ─── SECTION 7 (WHITE): Final CTA ────────────────────────────────────────────

function CtaSection() {
  return (
    <>
      <section style={{ background: "#ffffff" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="reveal">
            <p className="font-mono-accent text-xs mb-4" style={{ color: "#060d00", letterSpacing: "0.2em", opacity: 0.4 }}>THE MISSION IS SIMPLE</p>
            <h2 className="font-display mb-6" style={{ fontSize: "clamp(2.8rem,6vw,5rem)", color: "#060d00", lineHeight: 1.05 }}>
              MAKE YOUR BUSINESS FAR MORE<br />THAN YOU SPEND ON MARKETING
            </h2>
            <p className="text-lg leading-relaxed mb-10 mx-auto" style={{ color: "rgba(6,13,0,0.6)", fontFamily: "'DM Sans',sans-serif", maxWidth: 600 }}>
              Get better paid advertising results at scale with Kairo Marketing. We only take on 4 new clients per month — if you're serious about scaling, don't wait.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-lime"
                style={{ fontSize: "1.1rem", background: "#060d00", color: "#b8ff00" }}>
                Book Your Strategy Call →
              </a>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn-outline-lime"
                style={{ fontSize: "1.1rem", borderColor: "#060d00", color: "#060d00" }}>
                Watch Case Studies
              </a>
            </div>
          </div>
        </div>
      </section>
      <WaveUp fromWhite={true} />
    </>
  );
}

// ─── Footer (DARK) ────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "#030800" }}>
      <StarField count={40} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={IMAGES.logo} alt="Kairo" style={{ height: 48, width: 48, objectFit: "contain", filter: "invert(1) brightness(10)" }} />
              <div className="flex flex-col leading-none">
                <span className="font-display text-2xl" style={{ color: "#b8ff00", lineHeight: 1 }}>KAIRO</span>
                <span className="font-mono-accent text-xs" style={{ color: "rgba(184,255,0,0.45)", letterSpacing: "0.12em", fontSize: "0.6rem" }}>MARKETING</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans',sans-serif" }}>
              Performance marketing agency for businesses doing $100K–$300K/month. We build your entire funnel — or you don't pay.
            </p>
          </div>

          <div>
            <h4 className="font-mono-accent text-xs mb-4" style={{ color: "#b8ff00", letterSpacing: "0.15em" }}>NAVIGATION</h4>
            <div className="flex flex-col gap-2">
              {["How It Works", "Services", "Why Kairo", "Results", "Book a Call"].map((link) => (
                <a key={link} href={CALENDLY} target="_blank" rel="noopener noreferrer"
                  className="text-sm transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans',sans-serif" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#b8ff00")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >{link}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-mono-accent text-xs mb-4" style={{ color: "#b8ff00", letterSpacing: "0.15em" }}>CONTACT</h4>
            <div className="flex flex-col gap-2 mb-6">
              <a href="mailto:tian@kairoscales.com" className="text-sm" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans',sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#b8ff00")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >tian@kairoscales.com</a>
              <a href="https://kairoscales.com" target="_blank" rel="noopener noreferrer" className="text-sm" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans',sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#b8ff00")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
              >kairoscales.com</a>
            </div>
            <div className="flex gap-3">
              {["FB", "IG", "X", "YT"].map((s) => (
                <a key={s} href={CALENDLY} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200"
                  style={{ background: "rgba(184,255,0,0.1)", border: "1px solid rgba(184,255,0,0.2)", color: "rgba(255,255,255,0.55)", fontFamily: "'Space Mono',monospace" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(184,255,0,0.2)"; e.currentTarget.style.color = "#b8ff00"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(184,255,0,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
                >{s}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 text-xs leading-relaxed" style={{ borderTop: "1px solid rgba(184,255,0,0.08)", color: "rgba(255,255,255,0.28)", fontFamily: "'DM Sans',sans-serif" }}>
          <p className="mb-2">Results mentioned are based on average client outcomes and are not guaranteed. Individual results vary based on industry, offer, and market conditions. By visiting this site, you agree that you are fully responsible for the investments you make and any outcomes that may result.</p>
          <p style={{ color: "rgba(255,255,255,0.18)" }}>© 2025 Kairo Marketing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Home() {
  useScrollReveal();
  return (
    <div style={{ background: "#060d00" }}>
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <ServicesSection />
      <WhyKairoSection />
      <ResultsSection />
      <OperatorSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
