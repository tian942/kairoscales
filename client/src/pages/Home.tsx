/**
 * KAIRO MARKETING — STEALTH OPERATOR DESIGN
 * Design: Dark space (#060d00) + neon lime (#b8ff00) + Bebas Neue display font
 * Layout mirrors Megalodon Marketing: hero → features → services grid → why us → CTA → footer
 * All illustrations are AI-generated space ninja comic-book style
 */

import { useEffect, useRef } from "react";

// Image URLs from webdev static storage
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

// Scroll reveal hook
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

// Particle component
function StarField({ count = 60 }: { count?: number }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.7 + 0.2,
    lime: Math.random() > 0.85,
    delay: Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.lime ? "#b8ff00" : "#ffffff",
            opacity: star.opacity,
            animation: `twinkle ${2 + star.delay}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// Wave divider — dark to white
function WaveDividerDarkToWhite() {
  return (
    <div className="wave-divider relative" style={{ marginBottom: "-2px" }}>
      <svg
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "80px", display: "block" }}
      >
        <path
          d="M0,60 C180,110 360,10 540,60 C720,110 900,10 1080,60 C1260,110 1350,30 1440,60 L1440,120 L0,120 Z"
          fill="#ffffff"
        />
      </svg>
    </div>
  );
}

// Wave divider — white to dark
function WaveDividerWhiteToDark() {
  return (
    <div className="wave-divider relative" style={{ marginTop: "-2px" }}>
      <svg
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "80px", display: "block", background: "#ffffff" }}
      >
        <path
          d="M0,60 C180,10 360,110 540,60 C720,10 900,110 1080,60 C1260,10 1350,90 1440,60 L1440,120 L0,120 Z"
          fill="#060d00"
        />
      </svg>
    </div>
  );
}

// Navbar
function Navbar() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "rgba(6, 13, 0, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(184, 255, 0, 0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span
              className="font-display text-2xl tracking-wider"
              style={{ color: "#b8ff00" }}
            >
              KAIRO
            </span>
            <span
              className="hidden sm:block text-xs font-mono-accent"
              style={{ color: "rgba(184,255,0,0.5)", letterSpacing: "0.15em" }}
            >
              MARKETING
            </span>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6">
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
                style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#b8ff00")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <a
            href="https://kairoscales.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-white text-sm"
            style={{ padding: "0.5rem 1.5rem" }}
          >
            Book a Call →
          </a>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#060d00", paddingTop: "64px" }}
    >
      <StarField count={80} />

      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(184,255,0,0.04) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(100,0,200,0.08) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-64px)] py-16">
          {/* Left: Copy */}
          <div className="relative z-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono-accent mb-6"
              style={{
                backgroundColor: "rgba(184,255,0,0.1)",
                border: "1px solid rgba(184,255,0,0.3)",
                color: "#b8ff00",
                letterSpacing: "0.1em",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#b8ff00", animation: "pulse-glow 2s infinite" }}
              />
              FOR BUSINESSES DOING $100K–$300K/MONTH
            </div>

            <h1
              className="font-display leading-none mb-6"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "#ffffff" }}
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
              className="text-lg mb-8 leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.7)",
                fontFamily: "'DM Sans', sans-serif",
                maxWidth: "520px",
              }}
            >
              Kairo Marketing is a performance marketing agency that builds your
              entire end-to-end paid funnel to get you to{" "}
              <strong style={{ color: "#ffffff" }}>$300K/month</strong> — or you
              don't pay. 5X average ROAS. 14 days to launch.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://kairoscales.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lime"
                style={{ fontSize: "1rem" }}
              >
                Begin Your Mission →
              </a>
              <button
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-outline-lime"
                style={{ fontSize: "1rem" }}
              >
                See How It Works
              </button>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 mt-12">
              {[
                { value: "5X", label: "Average ROAS" },
                { value: "14", label: "Days to Launch" },
                { value: "$0", label: "If We Don't Perform" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="font-display"
                    style={{ fontSize: "2.5rem", color: "#b8ff00", lineHeight: 1 }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs font-mono-accent mt-1"
                    style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}
                  >
                    {stat.label.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="relative flex justify-center lg:justify-end">
            <img
              src={IMAGES.hero}
              alt="Space Ninja Warrior"
              className="animate-float-slow"
              style={{
                width: "100%",
                maxWidth: "680px",
                objectFit: "contain",
                filter: "drop-shadow(0 0 40px rgba(184,255,0,0.2))",
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "60px", display: "block" }}
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
            fill="#060d00"
          />
        </svg>
      </div>
    </section>
  );
}

// How It Works / Feature Cards Section
function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: "#060d00" }}
    >
      <StarField count={40} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 reveal">
          <p
            className="font-mono-accent text-xs mb-3"
            style={{ color: "#b8ff00", letterSpacing: "0.2em" }}
          >
            INTELLIGENCE BRIEFING
          </p>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#ffffff" }}
          >
            THERE IS A MORE EFFICIENT WAY TO
            <br />
            <span style={{ color: "#b8ff00" }}>DOMINATE YOUR MARKET</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1 — Dark */}
          <div
            className="reveal rounded-2xl p-8 relative overflow-hidden"
            style={{
              backgroundColor: "#0f1a08",
              border: "1px solid rgba(184,255,0,0.15)",
              transitionDelay: "0ms",
            }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(184,255,0,0.05) 0%, transparent 70%)",
              }}
            />
            <h3
              className="font-display mb-4"
              style={{ fontSize: "2.2rem", color: "#ffffff" }}
            >
              FULL FUNNEL DOMINATION
            </h3>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "rgba(255,255,255,0.65)", fontFamily: "'DM Sans', sans-serif" }}
            >
              We don't run ads. We build weapons. Your entire revenue machine —
              funnel, copy, VSL, emails, automations — engineered from scratch in
              14 days. We replicate the precision of an organic sales process
              through paid advertising. If you love warm leads from organic, you'll
              love what we build.
            </p>
            <a
              href="https://kairoscales.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-lime"
              style={{ fontSize: "0.9rem" }}
            >
              View Our Strategies →
            </a>
          </div>

          {/* Card 2 — Lime */}
          <div
            className="reveal rounded-2xl p-8 relative overflow-hidden"
            style={{
              backgroundColor: "#b8ff00",
              transitionDelay: "100ms",
            }}
          >
            <div
              className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,0,0,0.1) 0%, transparent 70%)",
              }}
            />
            <h3
              className="font-display mb-4"
              style={{ fontSize: "2.2rem", color: "#060d00" }}
            >
              ZERO RISK PERFORMANCE GUARANTEE
            </h3>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "rgba(6,13,0,0.75)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Your business needs consistency, not casino odds. We deploy proven
              conversion mechanisms — VSLs, call funnels, DM strategies, webinars,
              and lead qualification systems — that bring in high-quality prospects
              ready to buy. And if your revenue doesn't go up? You don't pay.
              Simple.
            </p>
            <a
              href="https://kairoscales.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lime"
              style={{
                fontSize: "0.9rem",
                backgroundColor: "#060d00",
                color: "#b8ff00",
              }}
            >
              Learn More →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Services Section (white background)
function ServicesSection() {
  const services = [
    {
      title: "FUNNEL ARCHITECTURE",
      description:
        "Since our first client, we've been obsessed with building funnels that convert. We design and build your entire revenue machine from scratch — landing pages, VSLs, thank-you pages, and every micro-step in between.",
      image: IMAGES.funnel,
    },
    {
      title: "AD WARFARE",
      description:
        "We've mastered paid advertising across Meta, Google, and YouTube. Our content advertising strategies leverage reels, shorts, and long-form video to drive qualified traffic that actually converts at scale.",
      image: IMAGES.ads,
    },
    {
      title: "VSL MASTERY",
      description:
        "If you have a high-ticket offer, your VSL is your most powerful weapon. We script, produce, and optimize video sales letters that pre-sell your prospects before they ever talk to your team.",
      image: IMAGES.vsl,
    },
    {
      title: "EMAIL & AUTOMATION OPS",
      description:
        "Our agency deploys complete email sequences and automation systems for every stage of your funnel. Opt-in flows, nurture sequences, and re-engagement campaigns that work while you sleep.",
      image: IMAGES.emails,
    },
  ];

  return (
    <section id="services" style={{ backgroundColor: "#060d00" }}>
      {/* Dark to white wave */}
      <WaveDividerDarkToWhite />

      <div style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16 reveal">
            <p
              className="font-mono-accent text-xs mb-3"
              style={{ color: "#060d00", letterSpacing: "0.2em", opacity: 0.5 }}
            >
              MISSION SPECIALIZATIONS
            </p>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#060d00" }}
            >
              WE HELP HIGH-GROWTH BUSINESSES
              <br />
              <span style={{ color: "#060d00" }}>BREAK THROUGH THEIR CEILING</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="reveal service-card"
                style={{
                  transitionDelay: `${i * 80}ms`,
                  backgroundColor: "#0f1a08",
                  border: "1px solid rgba(184,255,0,0.1)",
                }}
              >
                {/* Illustration */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: "240px" }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-top"
                    style={{ transition: "transform 0.4s ease" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(15,26,8,1) 0%, rgba(15,26,8,0.3) 60%, transparent 100%)",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="font-display mb-3"
                    style={{ fontSize: "1.5rem", color: "#ffffff" }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{
                      color: "rgba(255,255,255,0.6)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {service.description}
                  </p>
                  <a
                    href="https://kairoscales.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold transition-colors duration-200"
                    style={{ color: "#b8ff00", fontFamily: "'DM Sans', sans-serif" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#d4ff40")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#b8ff00")
                    }
                  >
                    More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* White to dark wave */}
      <WaveDividerWhiteToDark />
    </section>
  );
}

// Why Kairo Section
function WhyKairoSection() {
  return (
    <section
      id="why-kairo"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: "#060d00" }}
    >
      <StarField count={50} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div className="reveal">
            <p
              className="font-mono-accent text-xs mb-4"
              style={{ color: "#b8ff00", letterSpacing: "0.2em" }}
            >
              THE KAIRO ADVANTAGE
            </p>
            <h2
              className="font-display mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#ffffff", lineHeight: 1.05 }}
            >
              WITH FAILING AGENCIES
              <br />
              ASKING FOR MORE,
              <br />
              <span style={{ color: "#b8ff00" }}>BUSINESSES CHOOSE KAIRO</span>
              <br />
              FOR RESULTS.
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontFamily: "'DM Sans', sans-serif",
                maxWidth: "500px",
              }}
            >
              Traditional agencies promise the world, deliver excuses, and ask
              for more budget. We built Kairo differently. We only win when you
              win — which means every decision we make is engineered for your
              revenue growth, not our retainer.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontFamily: "'DM Sans', sans-serif",
                maxWidth: "500px",
              }}
            >
              Our clients are breaking through $300K/month ceilings using our
              proven content advertising strategies combined with precision
              conversion mechanisms — channels they were told would "never work."
            </p>
          </div>

          {/* Right: Rocket Ninja illustration */}
          <div className="reveal flex justify-center lg:justify-end" style={{ transitionDelay: "150ms" }}>
            <img
              src={IMAGES.rocket}
              alt="Space Ninja on Rocket"
              className="animate-float"
              style={{
                width: "100%",
                maxWidth: "600px",
                objectFit: "contain",
                filter: "drop-shadow(0 0 50px rgba(184,255,0,0.25))",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Results / Social Proof Section
function ResultsSection() {
  const problems = [
    {
      icon: "💀",
      title: '"We\'ll Get You Results" — They Didn\'t',
      desc: "You've paid $5K, $10K, even $20K to agencies who promised the world. 6 months later? Same revenue. Different excuses.",
    },
    {
      icon: "🎰",
      title: "Your Funnel is a Casino",
      desc: "Some months are great. Most aren't. You have no idea why. Your 'funnel' is a landing page, a prayer, and a Calendly link.",
    },
    {
      icon: "🔥",
      title: "Every Dollar Feels Like a Gamble",
      desc: "You want to scale to $50K/month in ad spend but you're terrified. Last time you scaled, ROAS tanked and you lost $12K in a week.",
    },
    {
      icon: "😤",
      title: "Your Sales Team is Exhausted",
      desc: "Half your calls are tire-kickers who 'need to think about it.' Your closers are demoralized. Lead quality is the problem.",
    },
    {
      icon: "⏰",
      title: "You're Working IN the Business",
      desc: "You're still writing copy, fixing automations, and managing ads yourself because no one else 'gets it.' You're the bottleneck.",
    },
    {
      icon: "📉",
      title: "Starting to Think This is Your Ceiling",
      desc: "You've been at $150K–$200K for 18 months. Part of you is starting to believe $300K+ just isn't in the cards.",
    },
  ];

  return (
    <section
      id="results"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: "#060d00" }}
    >
      {/* Subtle divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ backgroundColor: "rgba(184,255,0,0.1)" }}
      />

      <StarField count={30} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 reveal">
          <p
            className="font-mono-accent text-xs mb-3"
            style={{ color: "#b8ff00", letterSpacing: "0.2em" }}
          >
            WHY YOU'RE STILL STUCK
          </p>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#ffffff" }}
          >
            YOU'VE DONE EVERYTHING RIGHT —
            <br />
            <span style={{ color: "#b8ff00" }}>SO WHY AREN'T YOU AT $300K?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p, i) => (
            <div
              key={p.title}
              className="reveal rounded-xl p-6"
              style={{
                backgroundColor: "#0f1a08",
                border: "1px solid rgba(184,255,0,0.08)",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3
                className="font-semibold mb-2"
                style={{
                  color: "#ffffff",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1rem",
                }}
              >
                {p.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// We Work With Section
function WeWorkWithSection() {
  return (
    <section
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: "#060d00" }}
    >
      <StarField count={40} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="reveal">
            <p
              className="font-mono-accent text-xs mb-4"
              style={{ color: "#b8ff00", letterSpacing: "0.2em" }}
            >
              OUR IDEAL CLIENT
            </p>
            <h2
              className="font-display mb-6"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "#ffffff", lineHeight: 1 }}
            >
              WE WORK WITH
              <br />
              <span style={{ color: "#b8ff00" }}>SERIOUS OPERATORS</span>
              <br />
              FOR A LIVING
            </h2>
            <p
              className="text-lg leading-relaxed mx-auto mb-8"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontFamily: "'DM Sans', sans-serif",
                maxWidth: "600px",
              }}
            >
              We get it — you're busy, you're scaling, and you don't have time
              for agencies that need hand-holding. Everything we ask from you is
              efficient and easy to execute. We handle the heavy lifting so you
              can focus on closing deals.
            </p>
          </div>

          <div
            className="reveal rounded-2xl p-8 md:p-12 mx-auto"
            style={{
              backgroundColor: "#0f1a08",
              border: "1px solid rgba(184,255,0,0.2)",
              maxWidth: "800px",
              transitionDelay: "100ms",
            }}
          >
            <h3
              className="font-display mb-4"
              style={{ fontSize: "2rem", color: "#b8ff00" }}
            >
              THE MISSION IS SIMPLE
            </h3>
            <p
              className="text-xl font-semibold mb-6"
              style={{ color: "#ffffff", fontFamily: "'DM Sans', sans-serif" }}
            >
              Make your business far more than you spend on marketing.
            </p>
            <p
              className="text-base leading-relaxed mb-8"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Our clients are breaking through ceilings they thought were
              permanent — using proven content advertising strategies combined
              with precision conversion mechanisms that their competitors said
              would "never work." Get better paid advertising results at scale
              with Kairo Marketing.
            </p>
            <a
              href="https://kairoscales.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lime"
              style={{ fontSize: "1.1rem" }}
            >
              Begin Your Mission →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "#030800" }}
    >
      {/* Footer scene illustration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.35 }}
      >
        <img
          src={IMAGES.footer}
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(3,8,0,0.7) 0%, rgba(3,8,0,0.5) 50%, rgba(3,8,0,0.9) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="font-display text-3xl"
                style={{ color: "#b8ff00" }}
              >
                KAIRO
              </span>
              <span
                className="font-mono-accent text-xs"
                style={{ color: "rgba(184,255,0,0.5)", letterSpacing: "0.15em" }}
              >
                MARKETING
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Performance marketing agency for businesses doing $100K–$300K/month.
              We build your entire funnel — or you don't pay.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className="font-mono-accent text-xs mb-4"
              style={{ color: "#b8ff00", letterSpacing: "0.15em" }}
            >
              NAVIGATION
            </h4>
            <div className="flex flex-col gap-2">
              {["How It Works", "Services", "Why Kairo", "Results", "Book a Call"].map(
                (link) => (
                  <a
                    key={link}
                    href="https://kairoscales.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#b8ff00")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                    }
                  >
                    {link}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-mono-accent text-xs mb-4"
              style={{ color: "#b8ff00", letterSpacing: "0.15em" }}
            >
              CONTACT
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:tian@kairoscales.com"
                className="text-sm transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#b8ff00")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                }
              >
                tian@kairoscales.com
              </a>
              <a
                href="https://kairoscales.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#b8ff00")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                }
              >
                kairoscales.com
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {["FB", "IG", "X", "YT"].map((social) => (
                <a
                  key={social}
                  href="https://kairoscales.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200"
                  style={{
                    backgroundColor: "rgba(184,255,0,0.1)",
                    border: "1px solid rgba(184,255,0,0.2)",
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "'Space Mono', monospace",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(184,255,0,0.2)";
                    e.currentTarget.style.color = "#b8ff00";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(184,255,0,0.1)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div
          className="mt-12 pt-8 text-xs leading-relaxed"
          style={{
            borderTop: "1px solid rgba(184,255,0,0.08)",
            color: "rgba(255,255,255,0.3)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <p className="mb-2">
            Results mentioned are based on average client outcomes and are not
            guaranteed. Individual results vary based on industry, offer, and
            market conditions. You should perform your own due diligence and use
            your own best judgment prior to making any business decisions. By
            visiting this site, you agree that you are fully responsible for the
            investments you make and any outcomes that may result.
          </p>
          <p style={{ color: "rgba(255,255,255,0.2)" }}>
            © 2025 Kairo Marketing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main Home Component
export default function Home() {
  useScrollReveal();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#060d00" }}>
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <ServicesSection />
      <WhyKairoSection />
      <ResultsSection />
      <WeWorkWithSection />
      <Footer />
    </div>
  );
}
