// ─── FeatureGrid Block ──────────────────────────────────────────
// B33 (2026-05-07): theme-aware (CSS vars + inline styles)
import type { FeatureGridProps } from "../types"

export function FeatureGridBlock({ heading, features, columns = 3 }: FeatureGridProps) {
  const ink = "rgb(var(--paradigm-ink))"
  const inkSoft = "rgb(var(--paradigm-ink-soft))"
  const card = "rgb(var(--paradigm-paper-card))"
  const line = "rgb(var(--paradigm-line))"
  const radius = "var(--paradigm-radius-card, 12px)"
  const fontDisplay = "var(--paradigm-font-display, var(--paradigm-font-sans))"
  const colTemplate = columns === 2 ? "repeat(2, 1fr)" : columns === 4 ? "repeat(4, 1fr)" : "repeat(3, 1fr)"

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
          gridTemplateColumns: colTemplate,
          gap: 24,
          maxWidth: 1100,
          margin: "0 auto",
        }}
        className={`grid grid-cols-1 ${columns === 2 ? "md:grid-cols-2" : columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"} gap-6`}
      >
        {features.map((f, i) => (
          <div
            key={i}
            style={{
              borderRadius: radius,
              border: `1px solid ${line}`,
              background: card,
              padding: 24,
              textAlign: "center",
            }}
          >
            {f.icon && <div style={{ fontSize: 32, marginBottom: 12 }} aria-hidden>{f.icon}</div>}
            <h3 style={{ color: ink, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
            <p style={{ color: inkSoft, fontSize: 14, lineHeight: 1.6 }}>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
