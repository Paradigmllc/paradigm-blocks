// ─── FeatureGrid Block — B33 Phase 3 (2026-05-08) ───────────────────────
// 6 design theme 別の variant 別 layout. 設計仕様:
// docs/refactor/design-themes-rich-blocks.md
//
// 各 variant:
//   ① raycast — glassmorphism cards + neon outline icon + hover glow
//   ② stripe  — flat shadow + 4-col dense + cobalt outline icon
//   ③ reflect — thin line cards + indigo arrow + serif heading
//   ④ family  — rounded soft + emoji icon + warm shadow
//   ⑤ posthog — data-dense 4-col + monospace + orange data delta
//   ⑥ glean   — gradient icon + enterprise dense + indigo border

import type { FeatureGridProps } from "../types"
import { useDesignTheme } from "../ThemeContext"

export function FeatureGridBlock(props: FeatureGridProps) {
  const theme = useDesignTheme()
  switch (theme) {
    case "raycast": return <FGRaycast {...props} />
    case "stripe":  return <FGStripe {...props} />
    case "reflect": return <FGReflect {...props} />
    case "family":  return <FGFamily {...props} />
    case "posthog": return <FGPosthog {...props} />
    case "glean":   return <FGGlean {...props} />
    default:        return <FGDefault {...props} />
  }
}

// ─── Default (CSS 変数のみ) ─────────────────────────────────────────

function FGDefault({ heading, features, columns = 3 }: FeatureGridProps) {
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
        <h2 style={{ color: ink, fontFamily: fontDisplay, fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, textAlign: "center", marginBottom: 48 }}>{heading}</h2>
      )}
      <div style={{ display: "grid", gridTemplateColumns: colTemplate, gap: 24, maxWidth: 1100, margin: "0 auto" }}
        className={`grid grid-cols-1 ${columns === 2 ? "md:grid-cols-2" : columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"} gap-6`}>
        {features.map((f, i) => (
          <div key={i} style={{ borderRadius: radius, border: `1px solid ${line}`, background: card, padding: 24, textAlign: "center" }}>
            {f.icon && <div style={{ fontSize: 32, marginBottom: 12 }} aria-hidden>{f.icon}</div>}
            <h3 style={{ color: ink, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
            <p style={{ color: inkSoft, fontSize: 14, lineHeight: 1.6 }}>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── ① Raycast — Glassmorphism + neon glow ────────────────────────────

function FGRaycast({ heading, features, columns = 3 }: FeatureGridProps) {
  const colTemplate = columns === 2 ? "repeat(2, 1fr)" : columns === 4 ? "repeat(4, 1fr)" : "repeat(3, 1fr)"
  return (
    <section style={{ padding: "80px 24px", background: "#08080C", position: "relative" }}>
      {heading && (
        <h2 style={{
          color: "#F5F5FA",
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(28px, 4vw, 44px)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          textAlign: "center",
          marginBottom: 56,
        }}>{heading}</h2>
      )}
      <div style={{ display: "grid", gridTemplateColumns: colTemplate, gap: 20, maxWidth: 1200, margin: "0 auto" }}
        className={`grid grid-cols-1 ${columns === 2 ? "md:grid-cols-2" : columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"} gap-5`}>
        {features.map((f, i) => (
          <div key={i} style={{
            padding: 28,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            backdropFilter: "blur(24px)",
            transition: "border-color 0.2s, transform 0.2s",
          }}>
            {f.icon && (
              <div style={{
                width: 44, height: 44, marginBottom: 16,
                borderRadius: 10,
                background: "linear-gradient(135deg, rgba(255,99,130,0.15), rgba(120,90,240,0.15))",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22,
                border: "1px solid rgba(255,99,130,0.2)",
              }} aria-hidden>{f.icon}</div>
            )}
            <h3 style={{
              color: "#F5F5FA",
              fontSize: 17,
              fontWeight: 700,
              marginBottom: 8,
              letterSpacing: "-0.01em",
            }}>{f.title}</h3>
            <p style={{
              color: "rgba(245,245,250,0.55)",
              fontSize: 14, lineHeight: 1.65,
            }}>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── ② Stripe — Flat shadow + 4-col dense ─────────────────────────────

function FGStripe({ heading, features, columns = 3 }: FeatureGridProps) {
  const cols = columns === 4 ? 4 : columns === 2 ? 2 : 3
  return (
    <section style={{ padding: "80px 32px", background: "#FFFFFF" }}>
      {heading && (
        <h2 style={{
          color: "#0A0E1C",
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(28px, 4vw, 44px)",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          textAlign: "center",
          marginBottom: 56,
        }}>{heading}</h2>
      )}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 24, maxWidth: 1200, margin: "0 auto" }}
        className={`grid grid-cols-1 ${cols === 2 ? "md:grid-cols-2" : cols === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"} gap-6`}>
        {features.map((f, i) => (
          <div key={i} style={{
            padding: 28,
            background: "#FFFFFF",
            border: "1px solid #E4E8F0",
            borderRadius: 12,
            boxShadow: "0 1px 2px rgba(10,14,28,0.04)",
            transition: "box-shadow 0.2s, transform 0.15s",
          }}>
            {f.icon && (
              <div style={{
                width: 40, height: 40, marginBottom: 16,
                background: "#EFF0FF", color: "#635BFF",
                borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20,
              }} aria-hidden>{f.icon}</div>
            )}
            <h3 style={{ color: "#0A0E1C", fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
            <p style={{ color: "#3C4655", fontSize: 14, lineHeight: 1.6 }}>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── ③ Reflect — Thin line + serif heading + indigo arrow ────────────

function FGReflect({ heading, features, columns = 3 }: FeatureGridProps) {
  const cols = columns === 4 ? 4 : columns === 2 ? 2 : 3
  return (
    <section style={{ padding: "80px 32px", background: "#FAF8F4" }}>
      {heading && (
        <h2 style={{
          color: "#1A1824",
          fontFamily: "'Cormorant Garamond', 'Noto Serif JP', Georgia, serif",
          fontSize: "clamp(32px, 4.5vw, 52px)",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          textAlign: "center",
          marginBottom: 56,
        }}>{heading}</h2>
      )}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 32, maxWidth: 1100, margin: "0 auto" }}
        className={`grid grid-cols-1 ${cols === 2 ? "md:grid-cols-2" : cols === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"} gap-8`}>
        {features.map((f, i) => (
          <div key={i} style={{
            padding: "32px 28px",
            background: "#FFFDFA",
            border: "1px solid #E6E0D4",
            borderRadius: 10,
            transition: "border-color 0.2s",
          }}>
            {f.icon && (
              <div style={{ fontSize: 24, marginBottom: 20, color: "#4E46C8" }} aria-hidden>{f.icon}</div>
            )}
            <h3 style={{
              color: "#1A1824",
              fontFamily: "'Cormorant Garamond', 'Noto Serif JP', Georgia, serif",
              fontSize: 22, fontWeight: 700,
              marginBottom: 12,
            }}>{f.title}</h3>
            <p style={{
              color: "#4B465F",
              fontSize: 15, lineHeight: 1.7,
            }}>{f.description}</p>
            <div style={{
              marginTop: 20,
              fontSize: 14, color: "#4E46C8",
              fontStyle: "italic",
              opacity: 0.7,
            }}>→ Read more</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── ④ Family.co — Rounded soft + emoji icon + warm shadow ────────────

function FGFamily({ heading, features, columns = 3 }: FeatureGridProps) {
  const cols = columns === 4 ? 4 : columns === 2 ? 2 : 3
  return (
    <section style={{
      padding: "80px 32px",
      background: "linear-gradient(180deg, #FDF8F0 0%, #F5EEE4 100%)",
    }}>
      {heading && (
        <h2 style={{
          color: "#3C2319",
          fontFamily: "'DM Sans', 'Inter', sans-serif",
          fontSize: "clamp(28px, 4.5vw, 48px)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          textAlign: "center",
          marginBottom: 56,
        }}>{heading}</h2>
      )}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 24, maxWidth: 1100, margin: "0 auto" }}
        className={`grid grid-cols-1 ${cols === 2 ? "md:grid-cols-2" : cols === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"} gap-6`}>
        {features.map((f, i) => (
          <div key={i} style={{
            padding: 28,
            background: "#FFFCF7",
            borderRadius: 24,
            boxShadow: "0 8px 24px rgba(255,110,95,0.08), 0 2px 4px rgba(60,35,25,0.04)",
            transition: "transform 0.2s",
          }}>
            {f.icon && (
              <div style={{
                width: 56, height: 56, marginBottom: 18,
                background: "linear-gradient(135deg, rgba(255,180,100,0.2), rgba(255,110,95,0.15))",
                borderRadius: 18,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28,
              }} aria-hidden>{f.icon}</div>
            )}
            <h3 style={{ color: "#3C2319", fontSize: 19, fontWeight: 700, marginBottom: 10 }}>{f.title}</h3>
            <p style={{ color: "#785546", fontSize: 15, lineHeight: 1.7 }}>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── ⑤ PostHog — 4-col data-dense + orange data delta ────────────────

function FGPosthog({ heading, features, columns = 3 }: FeatureGridProps) {
  const cols = columns === 4 ? 4 : columns === 2 ? 2 : 3
  return (
    <section style={{ padding: "80px 32px", background: "#EEE9E1" }}>
      {heading && (
        <h2 style={{
          color: "#151515",
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(28px, 4vw, 44px)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          textAlign: "center",
          marginBottom: 48,
        }}>{heading}</h2>
      )}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16, maxWidth: 1200, margin: "0 auto" }}
        className={`grid grid-cols-1 ${cols === 2 ? "md:grid-cols-2" : cols === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"} gap-4`}>
        {features.map((f, i) => (
          <div key={i} style={{
            padding: 24,
            background: "#F5F1EA",
            border: "1px solid #C8C0B2",
            borderRadius: 8,
            transition: "border-color 0.2s",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              {f.icon && (
                <div style={{ fontSize: 22, color: "#F54F00" }} aria-hidden>{f.icon}</div>
              )}
              <span style={{
                padding: "2px 6px",
                background: "rgba(5,150,105,0.15)",
                color: "#059669",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10, fontWeight: 700,
                borderRadius: 4,
              }}>↗ +{(i + 1) * 17}%</span>
            </div>
            <h3 style={{
              color: "#151515",
              fontFamily: "'Inter', sans-serif",
              fontSize: 16, fontWeight: 700,
              marginBottom: 8,
            }}>{f.title}</h3>
            <p style={{
              color: "#434343",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12, lineHeight: 1.6,
            }}>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── ⑥ Glean — Gradient icon + enterprise dense ──────────────────────

function FGGlean({ heading, features, columns = 3 }: FeatureGridProps) {
  const cols = columns === 4 ? 4 : columns === 2 ? 2 : 3
  return (
    <section style={{
      padding: "80px 32px",
      background: "radial-gradient(circle at 50% 0%, rgba(139,92,246,0.05) 0%, transparent 60%), #FCFBFF",
    }}>
      {heading && (
        <h2 style={{
          color: "#141432",
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(28px, 4.5vw, 48px)",
          fontWeight: 800,
          letterSpacing: "-0.025em",
          textAlign: "center",
          marginBottom: 56,
        }}>{heading}</h2>
      )}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 24, maxWidth: 1200, margin: "0 auto" }}
        className={`grid grid-cols-1 ${cols === 2 ? "md:grid-cols-2" : cols === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"} gap-6`}>
        {features.map((f, i) => (
          <div key={i} style={{
            padding: 28,
            background: "#FFFFFF",
            border: "1px solid #E6E4F5",
            borderRadius: 14,
            boxShadow: "0 4px 12px rgba(99,102,241,0.06)",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}>
            {f.icon && (
              <div style={{
                width: 48, height: 48, marginBottom: 18,
                background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
                borderRadius: 12,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, color: "#FFFFFF",
                boxShadow: "0 4px 12px rgba(139,92,246,0.3)",
              }} aria-hidden>{f.icon}</div>
            )}
            <h3 style={{
              color: "#141432",
              fontSize: 18, fontWeight: 700,
              marginBottom: 10,
            }}>{f.title}</h3>
            <p style={{
              color: "#414164",
              fontSize: 14, lineHeight: 1.65,
            }}>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
