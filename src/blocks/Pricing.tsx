// ─── Pricing Block — B33 Phase 3 (2026-05-08) ──────────────────────────
// 6 design theme 別の variant 別 layout. 設計仕様:
// docs/refactor/design-themes-rich-blocks.md

import type { PricingProps } from "../types"
import { useDesignTheme } from "../ThemeContext"

export function PricingBlock(props: PricingProps) {
  const theme = useDesignTheme()
  switch (theme) {
    case "raycast": return <PRaycast {...props} />
    case "stripe":  return <PStripe {...props} />
    case "reflect": return <PReflect {...props} />
    case "family":  return <PFamily {...props} />
    case "posthog": return <PPosthog {...props} />
    case "glean":   return <PGlean {...props} />
    default:        return <PDefault {...props} />
  }
}

// ─── Default (CSS 変数のみ) ─────────────────────────────────────────

function PDefault({ heading, plans }: PricingProps) {
  const ink = "rgb(var(--paradigm-ink))"
  const inkSoft = "rgb(var(--paradigm-ink-soft))"
  const inkMute = "rgb(var(--paradigm-ink-mute))"
  const card = "rgb(var(--paradigm-paper-card))"
  const line = "rgb(var(--paradigm-line))"
  const accent = "rgb(var(--paradigm-accent))"
  const radius = "var(--paradigm-radius-card, 12px)"
  const fontDisplay = "var(--paradigm-font-display, var(--paradigm-font-sans))"
  return (
    <section style={{ padding: "64px 24px" }}>
      {heading && (
        <h2 style={{ color: ink, fontFamily: fontDisplay, fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, textAlign: "center", marginBottom: 48 }}>{heading}</h2>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 1080, margin: "0 auto" }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p, i) => {
          const isHi = !!p.highlighted
          return (
            <div key={i} style={{
              borderRadius: radius, border: `2px solid ${isHi ? accent : line}`,
              background: isHi ? `color-mix(in srgb, ${accent} 6%, ${card})` : card,
              padding: 28, display: "flex", flexDirection: "column",
              boxShadow: isHi ? `0 16px 40px color-mix(in srgb, ${accent} 24%, transparent)` : "none",
              transform: isHi ? "scale(1.04)" : "none",
            }}>
              {isHi && <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", color: accent, marginBottom: 8 }}>⭐ MOST POPULAR</div>}
              <h3 style={{ color: ink, fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{p.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 16 }}>
                <span style={{ color: ink, fontSize: 32, fontWeight: 800, fontFamily: fontDisplay }}>{p.price}</span>
                {p.cycle && <span style={{ color: inkMute, fontSize: 14 }}>{p.cycle}</span>}
              </div>
              <ul style={{ marginBottom: 24, flex: 1, listStyle: "none", padding: 0 }}>
                {p.features.map((f, j) => (
                  <li key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8, color: inkSoft, fontSize: 14 }}>
                    <span style={{ color: accent, flexShrink: 0 }}>✓</span><span>{f}</span>
                  </li>
                ))}
              </ul>
              {p.ctaLabel && p.ctaUrl && (
                <a href={p.ctaUrl} data-cta-track="1" data-cta-source={`pricing_${p.name}`}
                  style={{ display: "block", textAlign: "center", padding: "12px 24px", borderRadius: radius, fontWeight: 600, textDecoration: "none",
                    background: isHi ? accent : "transparent", color: isHi ? "#FFFFFF" : ink, border: isHi ? "none" : `2px solid ${line}` }}>{p.ctaLabel}</a>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ─── ① Raycast — BorderBeam highlighted + monospace number ────────────

function PRaycast({ heading, plans }: PricingProps) {
  return (
    <section style={{ padding: "80px 24px", background: "#08080C" }}>
      {heading && (
        <h2 style={{
          color: "#F5F5FA",
          fontSize: "clamp(28px, 4vw, 44px)",
          fontWeight: 800, letterSpacing: "-0.03em",
          textAlign: "center", marginBottom: 48,
        }}>{heading}</h2>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 1100, margin: "0 auto" }} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((p, i) => {
          const isHi = !!p.highlighted
          return (
            <div key={i} style={{
              position: "relative",
              padding: 28, paddingTop: isHi ? 36 : 28,
              background: isHi ? "linear-gradient(180deg, rgba(255,99,130,0.08), rgba(120,90,240,0.08))" : "rgba(255,255,255,0.03)",
              border: isHi ? "1px solid rgba(255,99,130,0.4)" : "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              backdropFilter: "blur(12px)",
              transform: isHi ? "scale(1.02)" : "none",
              boxShadow: isHi ? "0 0 60px rgba(255,99,130,0.2)" : "none",
              display: "flex", flexDirection: "column",
            }}>
              {isHi && (
                <div style={{
                  position: "absolute", top: 12, right: 12,
                  fontSize: 10, fontWeight: 800, letterSpacing: "0.1em",
                  background: "linear-gradient(135deg, #FF6382, #785AF0)",
                  padding: "4px 10px", borderRadius: 6, color: "#FFFFFF",
                }}>POPULAR</div>
              )}
              <h3 style={{ color: "#F5F5FA", fontSize: 16, fontWeight: 700, marginBottom: 6, letterSpacing: "0.02em" }}>{p.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 18 }}>
                <span style={{
                  color: "#FFFFFF",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 36, fontWeight: 800,
                  letterSpacing: "-0.02em",
                  backgroundImage: isHi ? "linear-gradient(135deg, #FF6382, #785AF0)" : "none",
                  WebkitBackgroundClip: isHi ? "text" : undefined,
                  WebkitTextFillColor: isHi ? "transparent" : undefined,
                }}>{p.price}</span>
                {p.cycle && <span style={{ color: "rgba(245,245,250,0.5)", fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{p.cycle}</span>}
              </div>
              <ul style={{ marginBottom: 24, flex: 1, listStyle: "none", padding: 0 }}>
                {p.features.map((f, j) => (
                  <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10, color: "rgba(245,245,250,0.7)", fontSize: 13 }}>
                    <span style={{ color: "#FF6382", flexShrink: 0, fontSize: 14 }}>✦</span><span>{f}</span>
                  </li>
                ))}
              </ul>
              {p.ctaLabel && p.ctaUrl && (
                <a href={p.ctaUrl} data-cta-track="1" data-cta-source={`pricing_raycast_${p.name}`}
                  style={{
                    display: "block", textAlign: "center",
                    padding: "12px 20px", borderRadius: 10,
                    fontWeight: 700, fontSize: 13, textDecoration: "none",
                    background: isHi ? "linear-gradient(135deg, #FF6382, #785AF0)" : "rgba(255,255,255,0.06)",
                    color: "#FFFFFF",
                    border: isHi ? "none" : "1px solid rgba(255,255,255,0.12)",
                    boxShadow: isHi ? "0 8px 24px rgba(255,99,130,0.35)" : "none",
                  }}>{p.ctaLabel}</a>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ─── ② Stripe — Clean B2B + ★Most Popular cobalt highlighted ─────────

function PStripe({ heading, plans }: PricingProps) {
  return (
    <section style={{ padding: "80px 32px", background: "#FFFFFF" }}>
      {heading && (
        <h2 style={{
          color: "#0A0E1C",
          fontFamily: "'Inter', sans-serif",
          fontSize: "clamp(28px, 4vw, 44px)",
          fontWeight: 700, letterSpacing: "-0.025em",
          textAlign: "center", marginBottom: 56,
        }}>{heading}</h2>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxWidth: 1100, margin: "0 auto" }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p, i) => {
          const isHi = !!p.highlighted
          return (
            <div key={i} style={{
              position: "relative",
              padding: 32,
              background: "#FFFFFF",
              border: isHi ? "2px solid #635BFF" : "1px solid #E4E8F0",
              borderRadius: 12,
              boxShadow: isHi ? "0 24px 48px rgba(99,91,255,0.18)" : "0 1px 2px rgba(10,14,28,0.04)",
              transform: isHi ? "scale(1.05)" : "none",
              display: "flex", flexDirection: "column",
            }}>
              {isHi && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  background: "#635BFF", color: "#FFFFFF",
                  padding: "4px 14px", fontSize: 11, fontWeight: 700,
                  borderRadius: 999, letterSpacing: "0.08em",
                }}>★ MOST POPULAR</div>
              )}
              <h3 style={{ color: "#0A0E1C", fontSize: 18, fontWeight: 600, marginBottom: 6 }}>{p.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 20 }}>
                <span style={{ color: "#0A0E1C", fontSize: 44, fontWeight: 800, letterSpacing: "-0.03em" }}>{p.price}</span>
                {p.cycle && <span style={{ color: "#788291", fontSize: 14 }}>{p.cycle}</span>}
              </div>
              <ul style={{ marginBottom: 28, flex: 1, listStyle: "none", padding: 0 }}>
                {p.features.map((f, j) => (
                  <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10, color: "#3C4655", fontSize: 14, lineHeight: 1.5 }}>
                    <span style={{ color: "#635BFF", flexShrink: 0, fontWeight: 700 }}>✓</span><span>{f}</span>
                  </li>
                ))}
              </ul>
              {p.ctaLabel && p.ctaUrl && (
                <a href={p.ctaUrl} data-cta-track="1" data-cta-source={`pricing_stripe_${p.name}`}
                  style={{
                    display: "block", textAlign: "center",
                    padding: "12px 20px", borderRadius: 8,
                    fontWeight: 600, fontSize: 14, textDecoration: "none",
                    background: isHi ? "linear-gradient(135deg, #635BFF, #7C73FF)" : "#FFFFFF",
                    color: isHi ? "#FFFFFF" : "#635BFF",
                    border: isHi ? "none" : "1px solid #E4E8F0",
                  }}>{p.ctaLabel}</a>
              )}
              <p style={{ marginTop: 16, fontSize: 11, color: "#788291", textAlign: "center" }}>
                Cancel anytime · GDPR compliant
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ─── ③ Reflect — Vertical card + serif h3 + indigo arrow ──────────────

function PReflect({ heading, plans }: PricingProps) {
  return (
    <section style={{ padding: "80px 32px", background: "#FAF8F4" }}>
      {heading && (
        <h2 style={{
          color: "#1A1824",
          fontFamily: "'Cormorant Garamond', 'Noto Serif JP', Georgia, serif",
          fontSize: "clamp(32px, 4.5vw, 52px)",
          fontWeight: 700, letterSpacing: "-0.025em",
          textAlign: "center", marginBottom: 56,
        }}>{heading}</h2>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28, maxWidth: 1000, margin: "0 auto" }} className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {plans.map((p, i) => {
          const isHi = !!p.highlighted
          return (
            <div key={i} style={{
              padding: 36,
              background: "#FFFDFA",
              border: isHi ? "1px solid #4E46C8" : "1px solid #E6E0D4",
              borderRadius: 10,
              display: "flex", flexDirection: "column",
            }}>
              {isHi && (
                <div style={{
                  fontFamily: "'Cormorant Garamond', 'Noto Serif JP', Georgia, serif",
                  fontStyle: "italic",
                  color: "#4E46C8", fontSize: 14,
                  marginBottom: 8, opacity: 0.8,
                }}>✎ recommended</div>
              )}
              <h3 style={{
                color: "#1A1824",
                fontFamily: "'Cormorant Garamond', 'Noto Serif JP', Georgia, serif",
                fontSize: 28, fontWeight: 700, marginBottom: 8,
              }}>{p.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 20 }}>
                <span style={{
                  color: "#4E46C8",
                  fontFamily: "'Cormorant Garamond', 'Noto Serif JP', Georgia, serif",
                  fontSize: 44, fontWeight: 700, letterSpacing: "-0.02em",
                }}>{p.price}</span>
                {p.cycle && <span style={{ color: "#8C87A0", fontSize: 14, fontStyle: "italic" }}>{p.cycle}</span>}
              </div>
              <ul style={{ marginBottom: 28, flex: 1, listStyle: "none", padding: 0 }}>
                {p.features.map((f, j) => (
                  <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12, color: "#4B465F", fontSize: 14, lineHeight: 1.7 }}>
                    <span style={{ color: "#4E46C8", flexShrink: 0 }}>→</span><span>{f}</span>
                  </li>
                ))}
              </ul>
              {p.ctaLabel && p.ctaUrl && (
                <a href={p.ctaUrl} data-cta-track="1" data-cta-source={`pricing_reflect_${p.name}`}
                  style={{
                    display: "block", textAlign: "center",
                    padding: "12px 20px", borderRadius: 8,
                    fontWeight: 500, fontSize: 14, textDecoration: "none",
                    background: isHi ? "#4E46C8" : "transparent",
                    color: isHi ? "#FFFFFF" : "#4E46C8",
                    border: isHi ? "none" : "1px solid #4E46C8",
                  }}>{p.ctaLabel}</a>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ─── ④ Family.co — 🌱🌳 emoji tier + warm cards ──────────────────────

function PFamily({ heading, plans }: PricingProps) {
  const tierEmoji = ["🌱", "🌳", "🌳🌳"]
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
          fontWeight: 800, letterSpacing: "-0.02em",
          textAlign: "center", marginBottom: 48,
        }}>{heading}</h2>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxWidth: 1000, margin: "0 auto" }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p, i) => {
          const isHi = !!p.highlighted
          return (
            <div key={i} style={{
              position: "relative",
              padding: 32, paddingTop: 56,
              background: isHi ? "#FFFFFF" : "#FFFCF7",
              borderRadius: 28,
              boxShadow: isHi
                ? "0 16px 40px rgba(255,110,95,0.22), 0 4px 8px rgba(60,35,25,0.06)"
                : "0 8px 24px rgba(255,110,95,0.06)",
              border: isHi ? "2px solid #FF6E5F" : "none",
              transform: isHi ? "scale(1.04)" : "none",
              display: "flex", flexDirection: "column",
            }}>
              {/* Tier emoji on top */}
              <div style={{
                position: "absolute", top: -24, left: "50%", transform: "translateX(-50%)",
                width: 56, height: 56,
                background: "#FFFFFF",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24,
                boxShadow: "0 4px 12px rgba(255,110,95,0.2)",
              }} aria-hidden>{tierEmoji[i] || "🌳"}</div>
              {isHi && (
                <div style={{
                  position: "absolute", top: 16, right: 16,
                  background: "#FF6E5F", color: "#FFFFFF",
                  padding: "3px 10px", borderRadius: 999,
                  fontSize: 10, fontWeight: 700,
                }}>家族のお気に入り</div>
              )}
              <h3 style={{
                color: "#3C2319",
                fontFamily: "'DM Serif Display', 'Noto Serif JP', Georgia, serif",
                fontSize: 26, fontWeight: 700,
                marginBottom: 4, marginTop: 12, textAlign: "center",
              }}>{p.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4, marginBottom: 24 }}>
                <span style={{
                  color: "#FF6E5F",
                  fontFamily: "'DM Serif Display', 'Noto Serif JP', Georgia, serif",
                  fontSize: 42, fontWeight: 700,
                }}>{p.price}</span>
                {p.cycle && <span style={{ color: "#AF9682", fontSize: 14 }}>{p.cycle}</span>}
              </div>
              <ul style={{ marginBottom: 28, flex: 1, listStyle: "none", padding: 0 }}>
                {p.features.map((f, j) => (
                  <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10, color: "#785546", fontSize: 14, lineHeight: 1.6 }}>
                    <span style={{ color: "#FF6E5F", flexShrink: 0, fontSize: 16 }}>✓</span><span>{f}</span>
                  </li>
                ))}
              </ul>
              {p.ctaLabel && p.ctaUrl && (
                <a href={p.ctaUrl} data-cta-track="1" data-cta-source={`pricing_family_${p.name}`}
                  style={{
                    display: "block", textAlign: "center",
                    padding: "14px 24px", borderRadius: 999,
                    fontWeight: 700, fontSize: 14, textDecoration: "none",
                    background: isHi ? "#FF6E5F" : "transparent",
                    color: isHi ? "#FFFFFF" : "#FF6E5F",
                    border: isHi ? "none" : "2px solid #FF6E5F",
                    boxShadow: isHi ? "0 8px 20px rgba(255,110,95,0.3)" : "none",
                  }}>{p.ctaLabel}</a>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ─── ⑤ PostHog — data-table style ✓/✗ matrix + delta ────────────────

function PPosthog({ heading, plans }: PricingProps) {
  return (
    <section style={{ padding: "80px 32px", background: "#EEE9E1" }}>
      {heading && (
        <h2 style={{
          color: "#151515",
          fontSize: "clamp(28px, 4vw, 44px)",
          fontWeight: 800, letterSpacing: "-0.02em",
          textAlign: "center", marginBottom: 48,
        }}>{heading}</h2>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, maxWidth: 1100, margin: "0 auto" }} className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {plans.map((p, i) => {
          const isHi = !!p.highlighted
          return (
            <div key={i} style={{
              padding: 28,
              background: isHi ? "#151515" : "#F5F1EA",
              border: "1px solid #C8C0B2",
              borderRadius: 8,
              color: isHi ? "#FFFFFF" : "#151515",
              display: "flex", flexDirection: "column",
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: isHi ? "#F54F00" : "#7F7F7F",
                marginBottom: 6,
              }}>plan_{i + 1}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{p.name}</h3>
              <div style={{ marginBottom: 20 }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 36, fontWeight: 800,
                  color: isHi ? "#F54F00" : "#151515",
                }}>{p.price}</span>
                {p.cycle && <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12, color: isHi ? "rgba(255,255,255,0.6)" : "#7F7F7F",
                  marginLeft: 6,
                }}>{p.cycle}</span>}
              </div>
              <ul style={{ marginBottom: 24, flex: 1, listStyle: "none", padding: 0 }}>
                {p.features.map((f, j) => (
                  <li key={j} style={{
                    display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12, lineHeight: 1.6,
                    color: isHi ? "rgba(255,255,255,0.85)" : "#434343",
                  }}>
                    <span style={{ color: "#059669", flexShrink: 0 }}>✓</span><span>{f}</span>
                  </li>
                ))}
              </ul>
              {p.ctaLabel && p.ctaUrl && (
                <a href={p.ctaUrl} data-cta-track="1" data-cta-source={`pricing_posthog_${p.name}`}
                  style={{
                    display: "block", textAlign: "center",
                    padding: "12px 20px", borderRadius: 6,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700, fontSize: 12, textDecoration: "none",
                    letterSpacing: "0.04em", textTransform: "uppercase",
                    background: "#F54F00", color: "#FFFFFF",
                  }}>{p.ctaLabel} →</a>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ─── ⑥ Glean — Enterprise + lilac/indigo gradient highlighted ────────

function PGlean({ heading, plans }: PricingProps) {
  return (
    <section style={{
      padding: "80px 32px",
      background: "radial-gradient(circle at 50% 0%, rgba(139,92,246,0.05) 0%, transparent 60%), #FCFBFF",
    }}>
      {heading && (
        <h2 style={{
          color: "#141432",
          fontSize: "clamp(28px, 4.5vw, 48px)",
          fontWeight: 800, letterSpacing: "-0.025em",
          textAlign: "center", marginBottom: 56,
        }}>{heading}</h2>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxWidth: 1100, margin: "0 auto" }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p, i) => {
          const isHi = !!p.highlighted
          return (
            <div key={i} style={{
              position: "relative",
              padding: 32,
              background: "#FFFFFF",
              borderRadius: 14,
              border: isHi ? "2px solid transparent" : "1px solid #E6E4F5",
              backgroundImage: isHi
                ? "linear-gradient(#FFFFFF, #FFFFFF), linear-gradient(135deg, #8B5CF6, #6366F1)"
                : undefined,
              backgroundOrigin: isHi ? "border-box" : undefined,
              backgroundClip: isHi ? "padding-box, border-box" : undefined,
              boxShadow: isHi ? "0 24px 48px rgba(139,92,246,0.18)" : "0 4px 12px rgba(99,102,241,0.06)",
              transform: isHi ? "scale(1.04)" : "none",
              display: "flex", flexDirection: "column",
            }}>
              {isHi && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  background: "linear-gradient(135deg, #8B5CF6, #6366F1)",
                  color: "#FFFFFF",
                  padding: "4px 14px", fontSize: 11, fontWeight: 700,
                  borderRadius: 999, letterSpacing: "0.06em",
                }}>RECOMMENDED</div>
              )}
              <h3 style={{ color: "#141432", fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{p.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 20 }}>
                <span style={{
                  fontSize: 42, fontWeight: 800, letterSpacing: "-0.025em",
                  backgroundImage: isHi ? "linear-gradient(135deg, #8B5CF6, #6366F1)" : "none",
                  WebkitBackgroundClip: isHi ? "text" : undefined,
                  WebkitTextFillColor: isHi ? "transparent" : undefined,
                  color: isHi ? "transparent" : "#141432",
                }}>{p.price}</span>
                {p.cycle && <span style={{ color: "#8282AA", fontSize: 14 }}>{p.cycle}</span>}
              </div>
              <ul style={{ marginBottom: 28, flex: 1, listStyle: "none", padding: 0 }}>
                {p.features.map((f, j) => (
                  <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10, color: "#414164", fontSize: 14, lineHeight: 1.6 }}>
                    <span style={{ color: "#6366F1", flexShrink: 0, fontWeight: 700 }}>✓</span><span>{f}</span>
                  </li>
                ))}
              </ul>
              {p.ctaLabel && p.ctaUrl && (
                <a href={p.ctaUrl} data-cta-track="1" data-cta-source={`pricing_glean_${p.name}`}
                  style={{
                    display: "block", textAlign: "center",
                    padding: "12px 20px", borderRadius: 10,
                    fontWeight: 600, fontSize: 14, textDecoration: "none",
                    background: isHi ? "linear-gradient(135deg, #8B5CF6, #6366F1)" : "#FFFFFF",
                    color: isHi ? "#FFFFFF" : "#6366F1",
                    border: isHi ? "none" : "1px solid #E6E4F5",
                    boxShadow: isHi ? "0 8px 20px rgba(139,92,246,0.3)" : "none",
                  }}>{p.ctaLabel}</a>
              )}
              <p style={{ marginTop: 14, fontSize: 10, color: "#8282AA", textAlign: "center" }}>
                🔒 SOC 2 · 🛡️ HIPAA · 🌍 GDPR
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
