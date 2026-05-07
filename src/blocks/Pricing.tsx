// ─── Pricing Block ──────────────────────────────────────────────
// B33 (2026-05-07): theme-aware (CSS vars + inline styles)
import type { PricingProps } from "../types"

export function PricingBlock({ heading, plans }: PricingProps) {
  const ink = "rgb(var(--paradigm-ink))"
  const inkSoft = "rgb(var(--paradigm-ink-soft))"
  const inkMute = "rgb(var(--paradigm-ink-mute))"
  const card = "rgb(var(--paradigm-paper-card))"
  const line = "rgb(var(--paradigm-line))"
  const accent = "rgb(var(--paradigm-accent))"
  const accentSoft = "rgb(var(--paradigm-accent-soft))"
  const radius = "var(--paradigm-radius-card, 12px)"
  const fontDisplay = "var(--paradigm-font-display, var(--paradigm-font-sans))"

  return (
    <section style={{ padding: "64px 24px" }}>
      {heading && (
        <h2
          style={{
            color: ink,
            fontFamily: fontDisplay,
            fontSize: "clamp(24px, 3.5vw, 36px)",
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          {heading}
        </h2>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          maxWidth: 1080,
          margin: "0 auto",
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {plans.map((p, i) => {
          const isHi = !!p.highlighted
          return (
            <div
              key={i}
              style={{
                borderRadius: radius,
                border: `2px solid ${isHi ? accent : line}`,
                background: isHi ? `color-mix(in srgb, ${accent} 6%, ${card})` : card,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                boxShadow: isHi ? `0 16px 40px color-mix(in srgb, ${accent} 24%, transparent)` : "none",
                transform: isHi ? "scale(1.04)" : "none",
              }}
            >
              {isHi && (
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", color: accent, marginBottom: 8 }}>
                  ⭐ MOST POPULAR
                </div>
              )}
              <h3 style={{ color: ink, fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{p.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 16 }}>
                <span style={{ color: ink, fontSize: 32, fontWeight: 800, fontFamily: fontDisplay }}>{p.price}</span>
                {p.cycle && <span style={{ color: inkMute, fontSize: 14 }}>{p.cycle}</span>}
              </div>
              <ul style={{ marginBottom: 24, flex: 1, listStyle: "none", padding: 0 }}>
                {p.features.map((f, j) => (
                  <li key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8, color: inkSoft, fontSize: 14 }}>
                    <span style={{ color: accent, flexShrink: 0 }}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              {p.ctaLabel && p.ctaUrl && (
                <a
                  href={p.ctaUrl}
                  data-cta-track="1"
                  data-cta-source={`pricing_${p.name}`}
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "12px 24px",
                    borderRadius: radius,
                    fontWeight: 600,
                    textDecoration: "none",
                    background: isHi ? accent : "transparent",
                    color: isHi ? "#FFFFFF" : ink,
                    border: isHi ? "none" : `2px solid ${line}`,
                  }}
                >
                  {p.ctaLabel}
                </a>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
