/**
 * KAIRO MARKETING — Homepage (liquid glass v5)
 * Bright white base, frosted glass layers, Poppins. Shared system:
 * /public/kairo-glass.css + /public/kairo-glass.js (via useKairoGlass).
 * Every primary CTA opens LeadPopup (email → Calendly).
 */

import { useCallback, useState, type ReactNode } from "react";
import { LeadPopup } from "@/components/LeadPopup";
import {
  Arrow,
  Eyebrow,
  Footer,
  GlassNav,
  Icon,
  WALL_OF_SUCCESS,
  WistiaPlayer,
  useKairoGlass,
} from "@/components/kg";

/* ─── Content ───────────────────────────────────────────────────────────── */

// Hero visual card text — swap in final wording here.
const HERO_CARDS = {
  phone: {
    label: "Primary channel",
    status: "Live",
    heading: "Partner Acquisition Specialists",
    meta: "Calling your ideal prospects every day",
  },
  email: {
    label: "Optional layer",
    statusOn: "Active",
    statusOff: "Optional",
    heading: "Cold email",
    meta: "Same targeting. Same psychological arc.",
  },
  ad: {
    label: "Qualified handoff",
    status: "Live",
    heading: "Opportunities sent to your team",
    meta: "Your team closes. We create the opportunities.",
  },
  toggle: "Cold email layer",
};

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Services", href: "#services" },
  { label: "Why Kairo", href: "#why-kairo" },
  { label: "Results", href: "#case-studies" },
];

const METRICS = [
  { label: "Days to launch", value: "14", desc: "Your new acquisition channel runs alongside your existing business." },
  { label: "Outbound agents", value: "Trained", desc: "Trained and managed by Kairo." },
  { label: "If we don't perform", value: "$0", desc: "We keep working for free until it does." },
  { label: "New clients per month", value: "4", desc: "We only take on 4 new clients per month." },
];

/** A block of copy: plain paragraph, emphasized line, or a tick list. */
type Block = string | { punch: string } | { ticks: string[] };

function Copy({ blocks, center = false }: { blocks: Block[]; center?: boolean }) {
  return (
    <div className={`kg-copy ${center ? "kg-copy-center" : ""}`}>
      {blocks.map((b, i) => {
        if (typeof b === "string") return <p key={i}>{b}</p>;
        if ("punch" in b) return <p key={i} className="kg-punch">{b.punch}</p>;
        return (
          <ul key={i} className="kg-ticks" style={center ? { justifyItems: "start", textAlign: "left" } : undefined}>
            {b.ticks.map((t) => <li key={t}>{t}</li>)}
          </ul>
        );
      })}
    </div>
  );
}

const SERVICES: { tag: string; title: string; icon: () => ReactNode; blocks: Block[]; cta: string; wide?: boolean }[] = [
  {
    tag: "List building",
    title: "Precision prospecting",
    icon: Icon.target,
    blocks: [
      { punch: "The quality of your opportunities starts before anyone ever picks up the phone." },
      "We identify the exact businesses and decision-makers most likely to need what you sell, then build targeted prospect lists and lookalike lists for our callers to work through.",
      { ticks: ["No random databases.", "No spray-and-pray."] },
      "Your callers know exactly who they're speaking to and why that person is worth speaking with.",
    ],
    cta: "See How We'd Build This For You",
  },
  {
    tag: "Trained callers",
    title: "Your outbound team without the hiring headache",
    icon: Icon.team,
    blocks: [
      { ticks: ["You don't need to hire a caller.", "You don't need to train them.", "You don't need to manage them."] },
      { punch: "We do it." },
      "Our trained Partner Acquisition Specialists call prospects on behalf of your business every day, using your offer, your positioning, and our proven acquisition framework.",
      "You get the output of an outbound team without having to build one yourself.",
      "And because they're trained and managed by Kairo, you don't have to put your brand in the hands of an inexperienced freelancer with a script.",
    ],
    cta: "See How We'd Build This For You",
  },
  {
    tag: "Psychological arc",
    title: "Conversations designed to create interest",
    icon: Icon.arc,
    blocks: [
      { punch: "Most outbound fails because the prospect gets pitched before they've been given a reason to care." },
      "Our callers follow a specific psychological arc designed to move a prospect from completely cold, to interested, to qualified, to genuinely wanting to speak with your team.",
      "We're not trying to force someone into a meeting.",
      "We're creating enough relevance and desire that the prospect wants the next conversation.",
      "That's why the conversation doesn't feel like a generic sales pitch.",
      "It is designed to make the prospect understand why speaking with you could be relevant to them.",
    ],
    cta: "See How We'd Get You Clients",
  },
  {
    tag: "Qualification & handoff",
    title: "We only send the opportunities worth your time",
    icon: Icon.handoff,
    blocks: [
      { punch: "Your sales team shouldn't have to spend their day convincing strangers to care." },
      "Our callers handle the initial conversation, uncover the problem, establish relevance, and qualify the opportunity before it reaches your team.",
      "By the time your salesperson gets involved, the prospect has already had the right conversation and expressed genuine interest.",
      { punch: "Your team closes." },
      { punch: "We create the opportunities." },
    ],
    cta: "See How We'd Build This For You",
  },
  {
    tag: "Optional cold email layer",
    title: "Add cold email when it makes sense",
    icon: Icon.mail,
    wide: true,
    blocks: [
      { punch: "Calling is our primary acquisition channel." },
      "But when appropriate, we can add cold email as an additional layer using the exact same principles.",
      {
        ticks: [
          "The same precision targeting.",
          "The same prospect research.",
          "The same messaging strategy.",
          "The same psychological arc.",
          "The same qualification process.",
        ],
      },
      "The only difference is how we start the conversation.",
      "Some prospects are easier to reach by phone.",
      "Others are more responsive to email.",
      "When it makes sense, we can use both channels together to create multiple opportunities to start the conversation with the same ideal prospects.",
      "And we know these methods work because they are still the two most successful ways Kairo acquires its own clients today.",
      "We're not asking you to trust a theoretical acquisition model.",
      { punch: "We're installing the same principles we use to grow Kairo itself." },
    ],
    cta: "See How We'd Build This For You",
  },
];

const PROBLEMS: { title: string; icon: () => ReactNode; blocks: Block[] }[] = [
  {
    title: "\"Just get more leads\" wasn't the problem",
    icon: Icon.layers,
    blocks: [
      "You've probably tried ads, agencies, referrals, content, networking, or some combination of all of them.",
      "But adding another lead source doesn't solve the problem if nobody is actually turning those prospects into conversations.",
      { punch: "You need a predictable way to proactively create new sales opportunities." },
    ],
  },
  {
    title: "Your pipeline depends on people finding you",
    icon: Icon.target,
    blocks: [
      "Referrals are great.",
      "Inbound leads are great.",
      "But you can't control when someone decides they're ready to look for you.",
      { punch: "You need a way to proactively go out and create opportunities instead of waiting for them to arrive." },
    ],
  },
  {
    title: "Your sales team shouldn't be prospecting",
    icon: Icon.team,
    blocks: [
      "Your highest-value people should be closing deals.",
      "Instead, they're searching for prospects, sending messages, following up, and chasing people who may never buy.",
      "Every hour they spend prospecting is an hour they're not selling.",
      { punch: "So we do it for them." },
    ],
  },
  {
    title: "You've tried outbound before",
    icon: Icon.phone,
    blocks: [
      "Maybe you hired a VA.",
      "Maybe you gave someone a script.",
      "Maybe you bought a database and told someone to start dialing.",
      "You got activity.",
      "Maybe even plenty of activity.",
      "But activity isn't the same as qualified opportunities.",
      { punch: "The difference is the system behind the activity." },
    ],
  },
  {
    title: "You don't want to risk your reputation",
    icon: Icon.shield,
    blocks: [
      "You've spent years building your brand.",
      "The last thing you want is an inexperienced caller representing your company badly.",
      "That's why your callers aren't random freelancers reading a script.",
      "They're trained by Kairo, equipped with the right messaging, and operate within a controlled acquisition process built around your business.",
      { punch: "You get the upside of outbound without putting your existing brand at risk." },
    ],
  },
  {
    title: "You're starting to think this is your ceiling",
    icon: Icon.arc,
    blocks: [
      "You know your business can handle more clients.",
      "Your team can fulfill more work.",
      "Your offer works.",
      "But there isn't a reliable machine consistently putting new qualified opportunities in front of you.",
      { punch: "That's the bottleneck." },
    ],
  },
];

const FEATURED_VIDEOS = [
  {
    label: "3X his sales in 2 months",
    desc: "See how the system helped transform outbound activity into a consistent source of new business.",
    embed: "https://www.youtube.com/embed/BsmUZTVvPpQ?rel=0",
  },
  {
    label: "40% lower CPQC with our ads",
    desc: "",
    embed: "https://player.vimeo.com/video/1147567452?app_id=122963",
  },
  {
    label: "Multiple 5-figure deals",
    desc: "See how we installed the acquisition infrastructure that created and converted high-value opportunities.",
    embed: "https://player.vimeo.com/video/1150973919?app_id=122963",
  },
];

const CLIP_VIDEOS = [
  "https://player.vimeo.com/video/1154957070?app_id=122963",
  "https://player.vimeo.com/video/1154956581?app_id=122963",
  "https://player.vimeo.com/video/1154956245?app_id=122963",
  "https://player.vimeo.com/video/1154955790?app_id=122963",
  "https://player.vimeo.com/video/1154954208?app_id=122963",
  "https://player.vimeo.com/video/1154953302?app_id=122963",
  "https://player.vimeo.com/video/1154953067?app_id=122963",
  "https://player.vimeo.com/video/1154952529?app_id=122963",
];

/* ─── Sections ──────────────────────────────────────────────────────────── */

type CtaProps = { onCta: () => void };

function CtaButton({ onCta, children, size = "" }: CtaProps & { children: ReactNode; size?: string }) {
  return (
    <button type="button" onClick={onCta} className={`kg-btn ${size}`}>
      {children} <Arrow />
    </button>
  );
}

function HeroVisual() {
  const c = HERO_CARDS;
  return (
    <div className="kg-visual">
      <p className="sr-only">Kairo client acquisition system: calling, optional cold email, and qualified handoff to your sales team.</p>
      <div className="kg-halo" aria-hidden="true" />
      <div className="kg-orb-shadow" data-depth="1.2" aria-hidden="true" />
      <div className="kg-orb" data-depth="1.2" aria-hidden="true" />

      <article className="kg-float kg-float-phone" data-depth="1.8" data-tilt aria-hidden="true">
        <div className="kg-float-top">
          <span className="kg-icon"><Icon.phone /></span>
          <span className="kg-status"><span className="kg-dot" />{c.phone.status}</span>
        </div>
        <span className="kg-float-label">{c.phone.label}</span>
        <span className="kg-float-title">{c.phone.heading}</span>
        <span className="kg-float-meta">{c.phone.meta}</span>
      </article>

      <article id="kg-card-email" className="kg-float kg-float-email" data-depth="1.35" data-tilt aria-hidden="true">
        <div className="kg-float-top">
          <span className="kg-icon"><Icon.mail /></span>
          <span className="kg-status" data-kg-status data-on={c.email.statusOn} data-off={c.email.statusOff}>
            <span className="kg-dot" /><span data-kg-status-text>{c.email.statusOn}</span>
          </span>
        </div>
        <span className="kg-float-label">{c.email.label}</span>
        <span className="kg-float-title">{c.email.heading}</span>
        <span className="kg-float-meta">{c.email.meta}</span>
      </article>

      <article className="kg-float kg-float-ad" data-depth="2.1" data-tilt aria-hidden="true">
        <div className="kg-float-top">
          <span className="kg-icon"><Icon.megaphone /></span>
          <span className="kg-status"><span className="kg-dot" />{c.ad.status}</span>
        </div>
        <span className="kg-float-label">{c.ad.label}</span>
        <div className="kg-ad-preview">
          <div className="kg-bars"><span /><span /><span /><span /></div>
        </div>
        <span className="kg-float-title">{c.ad.heading}</span>
        <span className="kg-float-meta">{c.ad.meta}</span>
      </article>

      <button type="button" className="kg-toggle" data-depth="0.9" data-kg-toggle="kg-card-email" aria-pressed="true">
        {c.toggle}
        <span className="kg-switch" aria-hidden="true" />
      </button>
    </div>
  );
}

function Hero({ onCta }: CtaProps) {
  return (
    <section id="top" className="kg-hero" aria-labelledby="hero-title">
      <div className="kg-container">
        <div className="kg-hero-grid">
          <div className="kg-hero-copy">
            <Eyebrow>FOR BUSINESSES DOING $1.5 M / year</Eyebrow>
            <h1 id="hero-title" className="kg-display kg-h1">
              INSTALL YOUR CLIENT ACQUISITION SYSTEM
              <span className="kg-h1-sub">AND LAND YOUR FIRST NEW CLIENT IN 14 DAYS OR WE WORK FOR FREE UNTIL YOU DO</span>
            </h1>
            <p className="kg-lede">
              We put trained outbound agents to work finding and starting conversations with your ideal clients, so
              your sales team can focus on closing them.
            </p>
            <CtaButton onCta={onCta} size="kg-btn-lg">See How We'd Get You Clients</CtaButton>
            <ul className="kg-qualify" aria-label="What you don't have to do">
              <li>No hiring.</li>
              <li>No training.</li>
              <li>No prospecting.</li>
              <li>No disruption to what's already working.</li>
            </ul>
          </div>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function Metrics() {
  return (
    <section className="kg-section-tight" aria-label="Kairo by the numbers" style={{ paddingTop: 0 }}>
      <div className="kg-container">
        <div className="kg-divider"><span>Kairo by the numbers</span></div>
        <div className="kg-grid-4">
          {METRICS.map((m, i) => (
            <article key={m.label} className="kg-card kg-metric kg-reveal" style={{ transitionDelay: `${i * 70}ms` }}>
              <span className="kg-label">{m.label}</span>
              <span className="kg-metric-value">{m.value}</span>
              <p className="kg-metric-desc">{m.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Vsl() {
  return (
    <section className="kg-section-tight" aria-labelledby="vsl-label">
      <div className="kg-container kg-narrow" style={{ maxWidth: 960 }}>
        <div className="kg-divider"><span id="vsl-label">⚠ IMPORTANT: HERE'S EXACTLY WHAT WE INSTALL FOR YOU</span></div>
        <div className="kg-reveal">
          <WistiaPlayer mediaId="7i60n49s27" title="Here's exactly what we install for you" />
        </div>
      </div>
    </section>
  );
}

function HowItWorks({ onCta }: CtaProps) {
  return (
    <section id="how-it-works" className="kg-section" aria-labelledby="how-title">
      <div className="kg-container">
        <div className="kg-section-head kg-reveal">
          <Eyebrow>INTELLIGENCE BRIEFING</Eyebrow>
          <p className="kg-italic">Your next clients are already out there. We put the right people in front of them for you.</p>
          <h2 id="how-title" className="kg-display kg-h2">
            THERE IS A PROVEN WAY TO TURN COMPLETELY COLD PROSPECTS INTO{" "}
            <span className="kg-accent">READY-TO-BUY OPPORTUNITIES</span>
          </h2>
        </div>

        <div className="kg-grid-2">
          <article className="kg-panel kg-panel-pad kg-feature kg-reveal">
            <span className="kg-icon"><Icon.layers /></span>
            <h3 className="kg-display kg-h3">THE CLIENT ACQUISITION SYSTEM</h3>
            <Copy
              blocks={[
                { punch: "We don't give you a list and tell you to start calling." },
                { punch: "We do the calling for you." },
                "Kairo installs trained Partner Acquisition Specialists who represent your business and handle the front end of your client acquisition process.",
                "We identify the right prospects, build the lists, train the callers, and give them the messaging and psychological framework required to turn a completely cold prospect into genuine interest.",
                "Then we qualify the opportunity and hand it to your sales team.",
                { ticks: ["You don't need to hire anyone.", "You don't need to make the calls.", "You don't need to change what's already working."] },
                { punch: "Your new acquisition channel runs alongside your existing business." },
              ]}
            />
            <div><CtaButton onCta={onCta}>See How We'd Build This For You</CtaButton></div>
          </article>

          <article className="kg-panel kg-panel-lime kg-panel-pad kg-feature kg-reveal" style={{ transitionDelay: "90ms" }}>
            <span className="kg-icon"><Icon.shield /></span>
            <h3 className="kg-display kg-h3">ZERO RISK PERFORMANCE GUARANTEE</h3>
            <Copy
              blocks={[
                { punch: "You shouldn't have to gamble thousands on another agency and hope the leads eventually show up." },
                "We build, train, launch, and manage the entire acquisition system for you.",
                "And because the system operates alongside your existing marketing and sales, you don't have to rip anything apart to find out if it works.",
                { punch: "If it doesn't produce your first new client within 14 days, we keep working for free until it does." },
              ]}
            />
            <div><CtaButton onCta={onCta}>See How We'd Get You Your First Client</CtaButton></div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Services({ onCta }: CtaProps) {
  return (
    <section id="services" className="kg-section" aria-labelledby="services-title">
      <div className="kg-container">
        <div className="kg-section-head kg-reveal">
          <Eyebrow>MISSION SPECIALIZATIONS</Eyebrow>
          <h2 id="services-title" className="kg-display kg-h2">
            WE BUILD AND RUN THE <span className="kg-accent">ENTIRE SYSTEM</span> FOR YOU
          </h2>
        </div>

        <div className="kg-grid-2">
          {SERVICES.map((s, i) => (
            <article
              key={s.tag}
              className={`kg-panel kg-panel-pad kg-feature kg-reveal ${s.wide ? "kg-feature-wide kg-panel-sand" : ""}`}
              style={{ transitionDelay: `${(i % 2) * 80}ms` }}
            >
              <div className="kg-feature-head">
                <span className="kg-icon"><s.icon /></span>
                <span className="kg-feature-num">{String(i + 1).padStart(2, "0")} · {s.tag.toUpperCase()}</span>
              </div>
              <h3 className="kg-display kg-h3">{s.title.toUpperCase()}</h3>
              <Copy blocks={s.blocks} />
              <div>
                <button type="button" className="kg-textlink" onClick={onCta}>{s.cta} <Arrow /></button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Advantage({ onCta }: CtaProps) {
  return (
    <section id="why-kairo" className="kg-section" aria-labelledby="why-title">
      <div className="kg-container">
        <div className="kg-split">
          <div className="kg-sticky kg-reveal">
            <Eyebrow>THE KAIRO ADVANTAGE</Eyebrow>
            <h2 id="why-title" className="kg-display kg-h2">
              ADD A NEW CLIENT ACQUISITION CHANNEL <span className="kg-accent">WITHOUT TOUCHING WHAT'S ALREADY WORKING</span>
            </h2>
          </div>

          <div className="kg-panel kg-panel-pad kg-feature kg-reveal" style={{ gap: 26 }}>
            <Copy
              blocks={[
                "This isn't about replacing your ads.",
                "It's not about replacing your referrals.",
                "It's not about changing your sales process.",
                "And it's certainly not about asking you or your team to spend hours prospecting.",
                { punch: "We add another acquisition channel on top of what you already have." },
                "Our trained callers handle the prospecting and conversations on your behalf while your existing marketing, sales, and fulfillment continue operating as normal.",
                {
                  ticks: [
                    "You don't need to pause your ads.",
                    "You don't need to rebuild your funnel.",
                    "You don't need to change your sales team.",
                    "You don't even need to make the calls.",
                  ],
                },
                { punch: "We do the work." },
                "That means you can find out what this channel can produce without putting your existing revenue at risk.",
              ]}
            />
            <ol className="kg-steps">
              <li><span>1</span>We handle the prospecting.</li>
              <li><span>2</span>We handle the calls.</li>
              <li><span>3</span>We handle the qualification.</li>
              <li className="is-you"><span>4</span>Your team handles the close.</li>
            </ol>
            <div><CtaButton onCta={onCta}>Add A New Client Acquisition Channel</CtaButton></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stuck() {
  return (
    <section id="stuck" className="kg-section" aria-labelledby="stuck-title">
      <div className="kg-container">
        <div className="kg-section-head kg-reveal">
          <Eyebrow>WHY YOU'RE STILL STUCK</Eyebrow>
          <h2 id="stuck-title" className="kg-display kg-h2">
            YOU'VE BUILT A GREAT BUSINESS. <span className="kg-accent">SO WHY IS GETTING NEW CLIENTS STILL SO HARD?</span>
          </h2>
        </div>
        <div className="kg-grid-3">
          {PROBLEMS.map((p, i) => (
            <article key={p.title} className="kg-card kg-problem kg-reveal" style={{ padding: 28, transitionDelay: `${(i % 3) * 70}ms` }}>
              <span className="kg-icon"><p.icon /></span>
              <h3>{p.title}</h3>
              <Copy blocks={p.blocks} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function IdealClient({ onCta }: CtaProps) {
  return (
    <section id="ideal-client" className="kg-section" aria-labelledby="ideal-title">
      <div className="kg-container" style={{ maxWidth: 980 }}>
        <div className="kg-panel kg-panel-sand kg-panel-pad kg-reveal" style={{ display: "grid", gap: 28, justifyItems: "center", textAlign: "center" }}>
          <Eyebrow>OUR IDEAL CLIENT</Eyebrow>
          <h2 id="ideal-title" className="kg-display kg-h2">
            WE WORK WITH <span className="kg-accent">SERIOUS OPERATORS</span> WHO ARE READY TO SCALE
          </h2>
          <Copy
            center
            blocks={[
              { ticks: ["You're already doing $100K–$300K/month.", "You have a proven offer.", "You have the capacity to take on more clients."] },
              "You don't need another agency telling you to rebuild your business.",
              "You need more qualified opportunities entering your pipeline.",
              { punch: "That's where Kairo comes in." },
              "We install and operate a new outbound acquisition channel alongside everything you're already doing.",
              {
                ticks: [
                  "No replacing your existing marketing.",
                  "No rebuilding your funnel.",
                  "No distracting your sales team.",
                  "No asking you to become a salesperson.",
                ],
              },
              { punch: "We bring the opportunities. You close them." },
            ]}
          />
          <CtaButton onCta={onCta}>See How We'd Get You Clients</CtaButton>
        </div>
      </div>
    </section>
  );
}

function WallOfSuccess() {
  return (
    <section id="case-studies" className="kg-section" aria-labelledby="wall-title">
      <div className="kg-container">
        <div className="kg-section-head kg-reveal">
          <Eyebrow>REAL CLIENTS. REAL RESULTS.</Eyebrow>
          <h2 id="wall-title" className="kg-display kg-h2">
            THE WALL OF <span className="kg-accent">SUCCESS</span>
          </h2>
          <p className="kg-lede">
            See how we've helped businesses create more opportunities, close more deals, and break through revenue
            ceilings they thought were permanent.
          </p>
        </div>

        <div style={{ display: "grid", gap: 22 }}>
          <article className="kg-panel kg-proof kg-reveal">
            <div className="kg-proof-media">
              <img src="/images/dashboard.jpg" alt="Revenue dashboard showing growth from $42K per month to $105K per month" loading="lazy" />
            </div>
            <div className="kg-proof-body">
              <h3 className="kg-proof-title">$42K / MONTH <span className="kg-accent">→</span> $105K / MONTH</h3>
              <p className="kg-proof-desc">
                How we helped this client install a predictable client acquisition system and create a consistent flow
                of qualified opportunities.
              </p>
            </div>
          </article>

          <article className="kg-panel kg-proof kg-reveal">
            <div className="kg-proof-body" style={{ paddingTop: 12, paddingBottom: 18 }}>
              <h3 className="kg-proof-title">RANKED <span className="kg-accent">#1 ON GOOGLE</span> + RECOMMENDED BY AI</h3>
              <span className="kg-pill">45 DAYS</span>
              <p className="kg-proof-desc">
                Fast Grass Lawns — ranked #1 organically for "sod installation Manitowoc" and featured in Google's AI
                Overview, recommending them by name to every searcher in their area.
              </p>
            </div>
            <div className="kg-proof-pair">
              <div className="kg-proof-media">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663164421367/wjLeWEGdZbSDqZTG.png"
                  alt="Fast Grass Lawns ranked #1 on Google for sod installation Manitowoc"
                  loading="lazy"
                />
              </div>
              <div className="kg-proof-media">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663164421367/ZGdeFujQuxpjdbGZ.webp"
                  alt="Fast Grass Lawns recommended in Google AI Overview"
                  loading="lazy"
                />
              </div>
            </div>
          </article>

          <div className="kg-grid-3">
            {FEATURED_VIDEOS.map((v, i) => (
              <article key={v.label} className="kg-panel kg-video-card kg-reveal" style={{ padding: 12, transitionDelay: `${i * 80}ms` }}>
                <div className="kg-proof-media kg-ratio-16x9">
                  <iframe
                    src={v.embed}
                    title={v.label}
                    loading="lazy"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    style={{ width: "100%", height: "100%", border: 0, display: "block" }}
                  />
                </div>
                <div style={{ display: "grid", gap: 6, padding: "4px 10px 12px" }}>
                  <h3>{v.label}</h3>
                  {v.desc && <p>{v.desc}</p>}
                </div>
              </article>
            ))}
          </div>

          <div className="kg-reveal" style={{ marginTop: 26 }}>
            <div className="kg-divider"><span>Client clips</span></div>
            <div className="kg-clips">
              {CLIP_VIDEOS.map((url, i) => (
                <div key={url} className="kg-frame">
                  <div className="kg-frame-inner kg-ratio-9x16">
                    <iframe src={url} title={`Client clip ${i + 1}`} loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="kg-btn-row kg-btn-row-center kg-reveal" style={{ marginTop: 20 }}>
            <a href={WALL_OF_SUCCESS} target="_blank" rel="noopener noreferrer" className="kg-btn kg-btn-quiet">
              See The Full Wall Of Success <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Mission({ onCta }: CtaProps) {
  return (
    <section id="mission" className="kg-section" aria-labelledby="mission-title">
      <div className="kg-container" style={{ maxWidth: 1040 }}>
        <div className="kg-panel kg-panel-lime kg-panel-pad kg-reveal" style={{ display: "grid", gap: 28, justifyItems: "center", textAlign: "center", paddingBlock: "clamp(40px, 6vw, 72px)" }}>
          <Eyebrow>THE MISSION IS SIMPLE</Eyebrow>
          <h2 id="mission-title" className="kg-display kg-h2">
            BUILD YOU A CLIENT ACQUISITION MACHINE <span className="kg-accent">THAT PAYS FOR ITSELF</span>
          </h2>
          <Copy
            center
            blocks={[
              "You shouldn't have to rely on referrals.",
              "You shouldn't have to wait for inbound leads.",
              "And you shouldn't have to spend your own time hunting for your next client.",
              { punch: "Kairo installs and operates a complete outbound acquisition system for you." },
              "That includes the prospect lists, trained callers, messaging, psychological framework, qualification, and handoff.",
              "And when appropriate, we can add cold email using the same acquisition principles.",
              "You keep running your business exactly as you are.",
              "We add another channel that creates new opportunities for your sales team.",
              "And because we stand behind the system:",
              { punch: "If it doesn't produce your first new client within 14 days, we keep working until it does." },
            ]}
          />
          <span className="kg-pill">We only take on 4 new clients per month.</span>
          <div className="kg-btn-row kg-btn-row-center">
            <CtaButton onCta={onCta} size="kg-btn-lg">Build My Client Acquisition System</CtaButton>
            <a href={WALL_OF_SUCCESS} target="_blank" rel="noopener noreferrer" className="kg-btn kg-btn-lg kg-btn-quiet">
              See The Case Studies <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function Home() {
  const rootRef = useKairoGlass<HTMLDivElement>();
  const [popupOpen, setPopupOpen] = useState(false);
  const openPopup = useCallback(() => setPopupOpen(true), []);
  const closePopup = useCallback(() => setPopupOpen(false), []);

  return (
    <div ref={rootRef} className="kg-page">
      <LeadPopup isOpen={popupOpen} onClose={closePopup} />
      <GlassNav links={NAV_LINKS} ctaLabel="Book a Call" onCta={openPopup} />
      <main>
        <Hero onCta={openPopup} />
        <Metrics />
        <Vsl />
        <HowItWorks onCta={openPopup} />
        <Services onCta={openPopup} />
        <Advantage onCta={openPopup} />
        <Stuck />
        <IdealClient onCta={openPopup} />
        <WallOfSuccess />
        <Mission onCta={openPopup} />
      </main>
      <Footer onBook={openPopup} />
    </div>
  );
}
