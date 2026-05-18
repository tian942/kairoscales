/**
 * KAIRO MARKETING — STEALTH OPERATOR DESIGN (v2)
 * Hero: Full-bleed space ninja background image with overlay text
 * Sections: Alternating dark (#060d00) and white (#ffffff) backgrounds
 * Wavy SVG dividers between every section transition
 */

import { useEffect } from "react";

const IMAGES = {
  hero: "/manus-storage/hero_scene_1def231f.png",
  feature: "/manus-storage/feature_section_2ca86e8b.png",
  funnel: "/manus-storage/service_funnel_0c8c9bec.png",
  ads: "/manus-storage/service_ads_ce871e20.png",
  vsl: "/manus-storage/service_vsl_924d0893.png",
  emails: "/manus-storage/service_emails_96a7896e.png",
  rocket: "/manus-storage/rocket_ninja_7982d033.png",
  footer: "/manus-storage/footer_scene_8d8a079e.png",
};

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Wave Dividers ────────────────────────────────────────────────────────────

/** Dark section ends → white section begins */
function WaveDown({ fromDark = true }: { fromDark?: boolean }) {
  const fill = fromDark ? "#ffffff" : "#060d00";
  const bg = fromDark ? "#060d00" : "#ffffff";
  return (
    <div style={{ background: bg, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ width: "100%", height: 70, display: "block" }}>
        <path d="M0,45 C360,90 720,0 1080,45 C1260,67 1380,30 1440,45 L1440,90 L0,90 Z" fill={fill} />
      </svg>
    </div>
  );
}

/** White section ends → dark section begins (inverted wave) */
function WaveUp({ fromWhite = true }: { fromWhite?: boolean }) {
  const fill = fromWhite ? "#060d00" : "#ffffff";
  const bg = fromWhite ? "#ffffff" : "#060d00";
  return (
    <div style={{ background: bg, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ width: "100%", height: 70, display: "block" }}>
        <path d="M0,45 C360,0 720,90 1080,45 C1260,22 1380,60 1440,45 L1440,90 L0,90 Z" fill={fill} />
      </svg>
    </div>
  );
}

// ─── Star Field ───────────────────────────────────────────────────────────────

function StarField({ count = 50 }: { count?: number }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.6 + 0.2,
    lime: Math.random() > 0.88,
    delay: Math.random() * 4,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size,
            backgroundColor: s.lime ? "#b8ff00" : "#fff",
            opacity: s.opacity,
            animation: `twinkle ${2.5 + s.delay}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(6,13,0,0.75)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(184,255,0,0.12)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-wider" style={{ color: "#b8ff00" }}>KAIRO</span>
          <span className="hidden sm:block font-mono-accent text-xs" style={{ color: "rgba(184,255,0,0.45)", letterSpacing: "0.15em" }}>MARKETING</span>
        </div>

        <div className="hidden md:flex items-center gap-7">
          {[
            { label: "How It Works", id: "how-it-works" },
            { label: "Services", id: "services" },
            { label: "Why Kairo", id: "why-kairo" },
            { label: "Results", id: "results" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans',sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#b8ff00")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
            >
              {item.label}
            </button>
          ))}
        </div>

        <a href="https://kairoscales.com" target="_blank" rel="noopener noreferrer" className="btn-white" style={{ padding: "0.5rem 1.5rem", fontSize: "0.9rem" }}>
          Book a Call →
        </a>
      </div>
    </nav>
  );
}

// ─── SECTION 1: Hero — Full-bleed ninja background ───────────────────────────

function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: 64 }}
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ objectPosition: "70% center" }}
        />
        {/* Dark gradient overlay — heavier on left so text is readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(6,13,0,0.92) 0%, rgba(6,13,0,0.75) 45%, rgba(6,13,0,0.25) 75%, rgba(6,13,0,0.1) 100%)",
          }}
        />
        {/* Bottom fade into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: "linear-gradient(to bottom, transparent, #060d00)" }}
        />
      </div>

      {/* Stars on top of overlay */}
      <StarField count={60} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono-accent mb-8"
            style={{
              background: "rgba(184,255,0,0.12)",
              border: "1px solid rgba(184,255,0,0.35)",
              color: "#b8ff00",
              letterSpacing: "0.1em",
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: "#b8ff00" }} />
            FOR BUSINESSES DOING $100K–$300K/MONTH
          </div>

          {/* Headline */}
          <h1
            className="font-display leading-none mb-6"
            style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)", color: "#fff" }}
          >
            PROVEN MARKETING
            <br />
            <span style={{ color: "#b8ff00" }}>MISSIONS</span>
            <br />
            FOR HIGH-GROWTH
            <br />
            BUSINESSES
          </h1>

          <p
            className="text-lg leading-relaxed mb-8"
            style={{ color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans',sans-serif", maxWidth: 520 }}
          >
            Kairo Marketing builds your entire end-to-end paid funnel to get you to{" "}
            <strong style={{ color: "#fff" }}>$300K/month</strong> — or you don't pay.
            5X average ROAS. 14 days to launch.
          </p>

          <div className="flex flex-wrap gap-4 mb-14">
            <a href="https://kairoscales.com" target="_blank" rel="noopener noreferrer" className="btn-lime" style={{ fontSize: "1rem" }}>
              Begin Your Mission →
            </a>
            <button
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-outline-lime"
              style={{ fontSize: "1rem" }}
            >
              See How It Works
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-10">
            {[
              { value: "5X", label: "Average ROAS" },
              { value: "14", label: "Days to Launch" },
              { value: "$0", label: "If We Don't Perform" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display" style={{ fontSize: "2.8rem", color: "#b8ff00", lineHeight: 1 }}>{s.value}</div>
                <div className="font-mono-accent text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
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
              THERE IS A MORE EFFICIENT WAY TO
              <br />
              <span style={{ color: "#b8ff00" }}>DOMINATE YOUR MARKET</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Dark card */}
            <div className="reveal rounded-2xl p-8 relative overflow-hidden" style={{ background: "#0f1a08", border: "1px solid rgba(184,255,0,0.15)" }}>
              <div className="absolute top-0 right-0 w-56 h-56 pointer-events-none" style={{ background: "radial-gradient(circle,rgba(184,255,0,0.05) 0%,transparent 70%)" }} />
              <h3 className="font-display mb-4" style={{ fontSize: "2rem", color: "#fff" }}>FULL FUNNEL DOMINATION</h3>
              <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans',sans-serif" }}>
                We don't run ads. We build weapons. Your entire revenue machine — funnel, copy, VSL, emails, automations — engineered from scratch in 14 days. We replicate the precision of an organic sales process through paid advertising.
              </p>
              <a href="https://kairoscales.com" target="_blank" rel="noopener noreferrer" className="btn-outline-lime" style={{ fontSize: "0.9rem" }}>View Our Strategies →</a>
            </div>

            {/* Lime card */}
            <div className="reveal rounded-2xl p-8 relative overflow-hidden" style={{ background: "#b8ff00", transitionDelay: "100ms" }}>
              <h3 className="font-display mb-4" style={{ fontSize: "2rem", color: "#060d00" }}>ZERO RISK PERFORMANCE GUARANTEE</h3>
              <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(6,13,0,0.72)", fontFamily: "'DM Sans',sans-serif" }}>
                Your business needs consistency, not casino odds. We deploy proven conversion mechanisms — VSLs, call funnels, DM strategies, webinars, and lead qualification systems. If your revenue doesn't go up? You don't pay. Simple.
              </p>
              <a href="https://kairoscales.com" target="_blank" rel="noopener noreferrer" className="btn-lime" style={{ fontSize: "0.9rem", background: "#060d00", color: "#b8ff00" }}>Learn More →</a>
            </div>
          </div>
        </div>
      </section>

      {/* DARK → WHITE */}
      <WaveDown fromDark={true} />
    </>
  );
}

// ─── SECTION 3 (WHITE): Services ─────────────────────────────────────────────

function ServicesSection() {
  const services = [
    { title: "FUNNEL ARCHITECTURE", image: IMAGES.funnel, desc: "We design and build your entire revenue machine from scratch — landing pages, VSLs, thank-you pages, and every micro-step in between that turns cold traffic into closed deals." },
    { title: "AD WARFARE", image: IMAGES.ads, desc: "We've mastered paid advertising across Meta, Google, and YouTube. Our content advertising strategies leverage reels, shorts, and long-form video to drive qualified traffic that converts at scale." },
    { title: "VSL MASTERY", image: IMAGES.vsl, desc: "If you have a high-ticket offer, your VSL is your most powerful weapon. We script, produce, and optimize video sales letters that pre-sell your prospects before they ever talk to your team." },
    { title: "EMAIL & AUTOMATION OPS", image: IMAGES.emails, desc: "Complete email sequences and automation systems for every stage of your funnel — opt-in flows, nurture sequences, and re-engagement campaigns that work while you sleep." },
  ];

  return (
    <>
      <section id="services" style={{ background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14 reveal">
            <p className="font-mono-accent text-xs mb-3" style={{ color: "#060d00", letterSpacing: "0.2em", opacity: 0.45 }}>MISSION SPECIALIZATIONS</p>
            <h2 className="font-display" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: "#060d00" }}>
              WE HELP HIGH-GROWTH BUSINESSES
              <br />BREAK THROUGH THEIR CEILING
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc, i) => (
              <div
                key={svc.title}
                className="reveal service-card"
                style={{ transitionDelay: `${i * 80}ms`, background: "#0f1a08", border: "1px solid rgba(184,255,0,0.1)" }}
              >
                <div className="relative overflow-hidden" style={{ height: 240 }}>
                  <img
                    src={svc.image} alt={svc.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500"
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(15,26,8,1) 0%,rgba(15,26,8,0.25) 60%,transparent 100%)" }} />
                </div>
                <div className="p-6">
                  <h3 className="font-display mb-3" style={{ fontSize: "1.4rem", color: "#fff" }}>{svc.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.58)", fontFamily: "'DM Sans',sans-serif" }}>{svc.desc}</p>
                  <a href="https://kairoscales.com" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold" style={{ color: "#b8ff00", fontFamily: "'DM Sans',sans-serif" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#d4ff40")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#b8ff00")}
                  >More →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHITE → DARK */}
      <WaveUp fromWhite={true} />
    </>
  );
}

// ─── SECTION 4 (DARK): Why Kairo + Rocket Ninja ──────────────────────────────

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
                WITH FAILING AGENCIES
                <br />ASKING FOR MORE,
                <br /><span style={{ color: "#b8ff00" }}>BUSINESSES CHOOSE KAIRO</span>
                <br />FOR RESULTS.
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans',sans-serif", maxWidth: 500 }}>
                Traditional agencies promise the world, deliver excuses, and ask for more budget. We built Kairo differently. We only win when you win — every decision we make is engineered for your revenue growth, not our retainer.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans',sans-serif", maxWidth: 500 }}>
                Our clients are breaking through $300K/month ceilings using our proven content advertising strategies combined with precision conversion mechanisms — channels they were told would "never work."
              </p>
            </div>

            <div className="reveal flex justify-center lg:justify-end" style={{ transitionDelay: "150ms" }}>
              <img
                src={IMAGES.rocket} alt="Space Ninja on Rocket"
                className="animate-float"
                style={{ width: "100%", maxWidth: 580, objectFit: "contain", filter: "drop-shadow(0 0 50px rgba(184,255,0,0.25))" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* DARK → WHITE */}
      <WaveDown fromDark={true} />
    </>
  );
}

// ─── SECTION 5 (WHITE): Pain Points ──────────────────────────────────────────

function ResultsSection() {
  const problems = [
    { icon: "💀", title: '"We\'ll Get You Results" — They Didn\'t', desc: "You've paid $5K, $10K, even $20K to agencies who promised the world. 6 months later? Same revenue. Different excuses." },
    { icon: "🎰", title: "Your Funnel is a Casino", desc: "Some months are great. Most aren't. You have no idea why. Your 'funnel' is a landing page, a prayer, and a Calendly link." },
    { icon: "🔥", title: "Every Dollar Feels Like a Gamble", desc: "You want to scale to $50K/month in ad spend but you're terrified. Last time you scaled, ROAS tanked and you lost $12K in a week." },
    { icon: "😤", title: "Your Sales Team is Exhausted", desc: "Half your calls are tire-kickers who 'need to think about it.' Your closers are demoralized. Lead quality is the problem." },
    { icon: "⏰", title: "You're Working IN the Business", desc: "You're still writing copy, fixing automations, and managing ads yourself because no one else 'gets it.' You're the bottleneck." },
    { icon: "📉", title: "Starting to Think This is Your Ceiling", desc: "You've been at $150K–$200K for 18 months. Part of you is starting to believe $300K+ just isn't in the cards." },
  ];

  return (
    <>
      <section id="results" style={{ background: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-14 reveal">
            <p className="font-mono-accent text-xs mb-3" style={{ color: "#060d00", letterSpacing: "0.2em", opacity: 0.45 }}>WHY YOU'RE STILL STUCK</p>
            <h2 className="font-display" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: "#060d00" }}>
              YOU'VE DONE EVERYTHING RIGHT —
              <br /><span style={{ color: "#060d00" }}>SO WHY AREN'T YOU AT $300K?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {problems.map((p, i) => (
              <div
                key={p.title}
                className="reveal rounded-xl p-6"
                style={{ background: "#060d00", border: "1px solid rgba(184,255,0,0.12)", transitionDelay: `${i * 60}ms` }}
              >
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-semibold mb-2" style={{ color: "#fff", fontFamily: "'DM Sans',sans-serif", fontSize: "1rem" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans',sans-serif" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHITE → DARK */}
      <WaveUp fromWhite={true} />
    </>
  );
}

// ─── SECTION 6 (DARK): Feature image + copy ──────────────────────────────────

function OperatorSection() {
  return (
    <>
      <section className="relative py-24 overflow-hidden" style={{ background: "#060d00" }}>
        <StarField count={40} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: illustration */}
            <div className="reveal flex justify-center lg:justify-start">
              <img
                src={IMAGES.feature} alt="Space Ninja Operator"
                className="animate-float-slow rounded-2xl"
                style={{ width: "100%", maxWidth: 560, objectFit: "cover", filter: "drop-shadow(0 0 40px rgba(184,255,0,0.2))" }}
              />
            </div>

            {/* Right: copy */}
            <div className="reveal" style={{ transitionDelay: "120ms" }}>
              <p className="font-mono-accent text-xs mb-4" style={{ color: "#b8ff00", letterSpacing: "0.2em" }}>OUR IDEAL CLIENT</p>
              <h2 className="font-display mb-6" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", color: "#fff", lineHeight: 1.05 }}>
                WE WORK WITH
                <br /><span style={{ color: "#b8ff00" }}>SERIOUS OPERATORS</span>
                <br />FOR A LIVING
              </h2>
              <p className="text-base leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans',sans-serif" }}>
                We get it — you're busy, you're scaling, and you don't have time for agencies that need hand-holding. Everything we ask from you is efficient and easy to execute. We handle the heavy lifting so you can focus on closing deals.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans',sans-serif" }}>
                Our clients are breaking through ceilings they thought were permanent — using content advertising strategies their competitors said would "never work."
              </p>
              <a href="https://kairoscales.com" target="_blank" rel="noopener noreferrer" className="btn-lime" style={{ fontSize: "1rem" }}>Begin Your Mission →</a>
            </div>
          </div>
        </div>
      </section>

      {/* DARK → WHITE */}
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
              MAKE YOUR BUSINESS FAR MORE
              <br />THAN YOU SPEND ON MARKETING
            </h2>
            <p className="text-lg leading-relaxed mb-10 mx-auto" style={{ color: "rgba(6,13,0,0.6)", fontFamily: "'DM Sans',sans-serif", maxWidth: 600 }}>
              Get better paid advertising results at scale with Kairo Marketing. We only take on 4 new clients per month — if you're serious about scaling, don't wait.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://kairoscales.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lime"
                style={{ fontSize: "1.1rem", background: "#060d00", color: "#b8ff00" }}
              >
                Begin Your Mission →
              </a>
              <a
                href="https://kairoscales.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-lime"
                style={{ fontSize: "1.1rem", borderColor: "#060d00", color: "#060d00" }}
              >
                Watch Case Studies
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHITE → DARK */}
      <WaveUp fromWhite={true} />
    </>
  );
}

// ─── Footer (DARK) ────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "#030800" }}>
      {/* Background scene */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.3 }}>
        <img src={IMAGES.footer} alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(3,8,0,0.6) 0%,rgba(3,8,0,0.5) 50%,rgba(3,8,0,0.95) 100%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display text-3xl" style={{ color: "#b8ff00" }}>KAIRO</span>
              <span className="font-mono-accent text-xs" style={{ color: "rgba(184,255,0,0.45)", letterSpacing: "0.15em" }}>MARKETING</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans',sans-serif" }}>
              Performance marketing agency for businesses doing $100K–$300K/month. We build your entire funnel — or you don't pay.
            </p>
          </div>

          <div>
            <h4 className="font-mono-accent text-xs mb-4" style={{ color: "#b8ff00", letterSpacing: "0.15em" }}>NAVIGATION</h4>
            <div className="flex flex-col gap-2">
              {["How It Works", "Services", "Why Kairo", "Results", "Book a Call"].map((link) => (
                <a key={link} href="https://kairoscales.com" target="_blank" rel="noopener noreferrer"
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
                <a key={s} href="https://kairoscales.com" target="_blank" rel="noopener noreferrer"
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
