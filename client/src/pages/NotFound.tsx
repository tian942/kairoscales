import { Arrow, Brand, useKairoGlass } from "@/components/kg";

export default function NotFound() {
  const rootRef = useKairoGlass<HTMLDivElement>();

  return (
    <div ref={rootRef} className="kg-page">
      <div className="kg-nav-wrap">
        <nav className="kg-nav" aria-label="Main" style={{ width: "min(100%, 760px)" }}>
          <Brand />
          <a href="/" className="kg-btn kg-btn-sm kg-nav-cta">Home <Arrow /></a>
        </nav>
      </div>
      <main className="kg-hero" style={{ minHeight: "100vh" }}>
        <div className="kg-container" style={{ maxWidth: 640 }}>
          <div className="kg-panel kg-panel-pad" style={{ display: "grid", gap: 18, justifyItems: "center", textAlign: "center" }}>
            <div className="kg-orb-mini" aria-hidden="true" style={{ width: 92, height: 92, borderRadius: "50%", background: "radial-gradient(circle at 30% 22%, #fff 0 6%, rgba(255,255,255,.64) 7% 20%, transparent 34%), radial-gradient(circle at 68% 70%, rgba(170,242,56,.7), transparent 34%), radial-gradient(circle at 33% 69%, rgba(92,192,231,.6), transparent 38%), linear-gradient(145deg, rgba(255,255,255,.85), rgba(224,245,242,.35))", boxShadow: "inset 0 2px 5px #fff, 0 18px 34px -14px rgba(25,52,58,.35)" }} />
            <h1 className="kg-display kg-h2">404</h1>
            <p className="kg-lede">Sorry, the page you are looking for doesn't exist. It may have been moved or deleted.</p>
            <a href="/" className="kg-btn">Go Home <Arrow /></a>
          </div>
        </div>
      </main>
    </div>
  );
}
