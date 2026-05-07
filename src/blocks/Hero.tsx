// ─── Hero Block — B33 Phase 3 (2026-05-08) ──────────────────────────────
// 6 design theme 別の variant 別 layout に分岐.
// 設計仕様: docs/refactor/design-themes-rich-blocks.md
//
// 各 variant の特徴 (色だけでなくレイアウト・装飾要素まで):
//   ① raycast — Dark + neon gradient text + spotlight + ⌘K hint badge
//   ② stripe  — Clean white + cobalt accent + 右側 code block snippet
//   ③ reflect — Linen + serif h1 + handwritten note 装飾
//   ④ family  — Warm sand + coral + emoji rich + 円形写真 placeholder
//   ⑤ posthog — Cream + signal orange + monospace + 右側 dot grid
//   ⑥ glean   — Navy/lilac + 上部 search bar UI (Glean trademark)
//
// 既存 default (CSS 変数のみ) は theme 不明時の fallback として温存.

import type { HeroProps } from "../types"
import { useDesignTheme } from "../ThemeContext"

export function HeroBlock(props: HeroProps) {
  const theme = useDesignTheme()
  switch (theme) {
    case "raycast": return <HeroRaycast {...props} />
    case "stripe":  return <HeroStripe {...props} />
    case "reflect": return <HeroReflect {...props} />
    case "family":  return <HeroFamily {...props} />
    case "posthog": return <HeroPosthog {...props} />
    case "glean":   return <HeroGlean {...props} />
    default:        return <HeroDefault {...props} />
  }
}

// ─── Default (theme unknown / fallback・既存実装) ────────────────────

function HeroDefault({ title, subtitle, ctaLabel, ctaUrl, imageUrl, variant = "centered" }: HeroProps) {
  const heroBg = "var(--paradigm-hero-bg, rgb(var(--paradigm-paper)))"
  const ink = "rgb(var(--paradigm-ink))"
  const inkSoft = "rgb(var(--paradigm-ink-soft))"
  const accent = "rgb(var(--paradigm-accent))"
  const radius = "var(--paradigm-radius-card, 12px)"
  const fontDisplay = "var(--paradigm-font-display, var(--paradigm-font-sans))"

  if (variant === "split" && imageUrl) {
    return (
      <section style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center",
        padding: "64px 24px", background: heroBg,
      }} className="grid md:grid-cols-2 gap-8 items-center py-16 px-6">
        <div>
          <h1 style={{ color: ink, fontFamily: fontDisplay, fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>{title}</h1>
          {subtitle && <p style={{ color: inkSoft, fontSize: 18, marginTop: 16, lineHeight: 1.6 }}>{subtitle}</p>}
          {ctaLabel && ctaUrl && (
            <a href={ctaUrl} data-cta-track="1" data-cta-source="hero_split"
              style={{ display: "inline-block", marginTop: 24, padding: "14px 28px", borderRadius: radius, background: accent, color: "#FFFFFF", fontWeight: 600, textDecoration: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>{ctaLabel}</a>
          )}
        </div>
        <img src={imageUrl} alt="" style={{ width: "100%", borderRadius: radius, boxShadow: "0 16px 48px rgba(0,0,0,0.16)" }} />
      </section>
    )
  }
  const align = variant === "left" ? "left" : "center"
  return (
    <section style={{ padding: "80px 24px", textAlign: align, background: heroBg, position: "relative", overflow: "hidden" }}>
      <h1 style={{ color: ink, fontFamily: fontDisplay, fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, maxWidth: 920, margin: align === "center" ? "0 auto" : "0" }}>{title}</h1>
      {subtitle && <p style={{ color: inkSoft, fontSize: 18, marginTop: 20, maxWidth: 640, margin: align === "center" ? "20px auto 0" : "20px 0 0", lineHeight: 1.6 }}>{subtitle}</p>}
      {ctaLabel && ctaUrl && (
        <a href={ctaUrl} data-cta-track="1" data-cta-source="hero"
          style={{ display: "inline-block", marginTop: 32, padding: "16px 32px", borderRadius: radius, background: accent, color: "#FFFFFF", fontWeight: 600, textDecoration: "none", boxShadow: "0 12px 32px rgba(0,0,0,0.14)" }}>{ctaLabel}</a>
      )}
    </section>
  )
}

// ─── ① Raycast — Dark Futurism (neon gradient + spotlight) ──────────

function HeroRaycast({ title, subtitle, ctaLabel, ctaUrl }: HeroProps) {
  return (
    <section style={{
      padding: "120px 24px 100px",
      background: "var(--paradigm-hero-bg, #08080C)",
      position: "relative",
      overflow: "hidden",
      textAlign: "center",
    }}>
      {/* Spotlight overlay (Raycast trademark) */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,99,130,0.18) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      {/* ⌘K command palette hint badge (Raycast trademark) */}
      <div style={{
        position: "relative", display: "inline-flex", alignItems: "center", gap: 8,
        padding: "6px 14px", marginBottom: 32,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 999,
        fontFamily: "var(--paradigm-font-mono, monospace)",
        fontSize: 12, color: "rgba(245,245,250,0.7)",
        backdropFilter: "blur(12px)",
      }}>
        <kbd style={{ padding: "2px 6px", background: "rgba(255,255,255,0.08)", borderRadius: 4 }}>⌘K</kbd>
        <span>Press to open</span>
      </div>

      {/* Neon gradient title */}
      <h1 style={{
        position: "relative",
        fontFamily: "var(--paradigm-font-display, 'Inter', sans-serif)",
        fontSize: "clamp(40px, 7vw, 80px)",
        fontWeight: 800,
        letterSpacing: "-0.04em",
        lineHeight: 1.05,
        maxWidth: 1000, margin: "0 auto",
        backgroundImage: "linear-gradient(135deg, #FF6382 0%, #785AF0 50%, #64C8FF 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
      }}>
        {title}
      </h1>

      {subtitle && (
        <p style={{
          position: "relative",
          color: "rgba(245,245,250,0.65)",
          fontFamily: "var(--paradigm-font-mono, monospace)",
          fontSize: 16, lineHeight: 1.6,
          maxWidth: 640, margin: "24px auto 0",
        }}>{subtitle}</p>
      )}

      {ctaLabel && ctaUrl && (
        <a href={ctaUrl} data-cta-track="1" data-cta-source="hero_raycast"
          style={{
            position: "relative",
            display: "inline-block", marginTop: 40,
            padding: "16px 36px",
            background: "linear-gradient(135deg, #FF6382 0%, #785AF0 100%)",
            color: "#FFFFFF",
            fontWeight: 700, fontSize: 15,
            borderRadius: 14,
            textDecoration: "none",
            boxShadow: "0 0 40px rgba(255,99,130,0.4), 0 8px 24px rgba(120,90,240,0.3)",
            transition: "transform 0.15s ease",
          }}>{ctaLabel}</a>
      )}
    </section>
  )
}

// ─── ② Stripe — Clean B2B + 右側 code block ──────────────────────────

function HeroStripe({ title, subtitle, ctaLabel, ctaUrl }: HeroProps) {
  return (
    <section style={{
      padding: "100px 32px 80px",
      background: "linear-gradient(180deg, #FFFFFF 0%, #F7FAFC 100%), radial-gradient(circle at 100% 0%, rgba(99,91,255,0.08) 0%, transparent 50%)",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)", gap: 64, alignItems: "center",
      }} className="grid md:grid-cols-[1.3fr_1fr] gap-8 items-center">
        <div>
          <h1 style={{
            color: "#0A0E1C",
            fontFamily: "var(--paradigm-font-display, 'Inter', sans-serif)",
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.05,
          }}>{title}</h1>
          {subtitle && (
            <p style={{
              color: "#3C4655",
              fontSize: 19, lineHeight: 1.6,
              marginTop: 24, maxWidth: 560,
            }}>{subtitle}</p>
          )}
          {ctaLabel && ctaUrl && (
            <a href={ctaUrl} data-cta-track="1" data-cta-source="hero_stripe"
              style={{
                display: "inline-block", marginTop: 32,
                padding: "14px 32px",
                background: "linear-gradient(135deg, #635BFF 0%, #7C73FF 100%)",
                color: "#FFFFFF",
                fontWeight: 600, fontSize: 15,
                borderRadius: 8,
                textDecoration: "none",
                boxShadow: "0 4px 12px rgba(99,91,255,0.25)",
              }}>{ctaLabel}</a>
          )}
        </div>

        {/* 右側 code block snippet (Stripe trademark) */}
        <div aria-hidden style={{
          background: "#0A0E1C",
          borderRadius: 12,
          padding: 20,
          fontFamily: "var(--paradigm-font-mono, 'SF Mono', monospace)",
          fontSize: 13, lineHeight: 1.7,
          color: "#E4E8F0",
          boxShadow: "0 24px 48px rgba(99,91,255,0.15)",
          overflowX: "auto",
        }}>
          <div style={{ color: "#00C8C8" }}>$ curl -X POST</div>
          <div style={{ color: "#FFB6C1" }}>  https://api.paradigm.io/v1/leads</div>
          <div style={{ color: "#9CA3AF" }}>  -H &quot;Authorization: Bearer ...&quot;</div>
          <div style={{ color: "#00C8C8" }}>  -d {"'{"}</div>
          <div style={{ paddingLeft: 16 }}><span style={{ color: "#FF8A00" }}>&quot;company&quot;</span>: <span style={{ color: "#A5F3FC" }}>&quot;Acme Inc&quot;</span>,</div>
          <div style={{ paddingLeft: 16 }}><span style={{ color: "#FF8A00" }}>&quot;industry&quot;</span>: <span style={{ color: "#A5F3FC" }}>&quot;saas&quot;</span></div>
          <div style={{ color: "#00C8C8" }}>  {"}'"}</div>
        </div>
      </div>
    </section>
  )
}

// ─── ③ Reflect — Linen + serif h1 + handwritten note ─────────────────

function HeroReflect({ title, subtitle, ctaLabel, ctaUrl }: HeroProps) {
  return (
    <section style={{
      padding: "100px 32px 80px",
      background: "linear-gradient(135deg, #FAF8F4 0%, #F0ECE4 100%)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Subtle paper texture overlay */}
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle at 20% 80%, rgba(78,70,200,0.04) 0%, transparent 30%), radial-gradient(circle at 80% 20%, rgba(200,150,80,0.05) 0%, transparent 25%)",
        pointerEvents: "none",
      }} />
      <div style={{ position: "relative", maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
        {/* Handwritten-style epigraph */}
        <div style={{
          fontFamily: "'Cormorant Garamond', 'Noto Serif JP', Georgia, serif",
          fontStyle: "italic",
          fontSize: 18,
          color: "#4E46C8",
          marginBottom: 16,
          opacity: 0.7,
        }}>
          ✎ Think clearly.
        </div>

        <h1 style={{
          color: "#1A1824",
          fontFamily: "'Cormorant Garamond', 'Noto Serif JP', Georgia, serif",
          fontSize: "clamp(40px, 6vw, 72px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
        }}>{title}</h1>

        {subtitle && (
          <p style={{
            color: "#4B465F",
            fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
            fontSize: 18, lineHeight: 1.7,
            marginTop: 28, maxWidth: 560, marginLeft: "auto", marginRight: "auto",
          }}>{subtitle}</p>
        )}

        {ctaLabel && ctaUrl && (
          <a href={ctaUrl} data-cta-track="1" data-cta-source="hero_reflect"
            style={{
              display: "inline-block", marginTop: 36,
              padding: "12px 28px",
              background: "#4E46C8",
              color: "#FFFFFF",
              fontWeight: 500, fontSize: 14,
              borderRadius: 8,
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}>{ctaLabel}</a>
        )}
      </div>
    </section>
  )
}

// ─── ④ Family.co — Warm Sand + Coral + emoji rich ───────────────────

function HeroFamily({ title, subtitle, ctaLabel, ctaUrl }: HeroProps) {
  return (
    <section style={{
      padding: "100px 32px 80px",
      background: "radial-gradient(circle at 30% 20%, rgba(255,180,100,0.30) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,110,95,0.20) 0%, transparent 50%), #FDF8F0",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "grid", gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)", gap: 48, alignItems: "center",
      }} className="grid md:grid-cols-[1.5fr_1fr] gap-8">
        <div>
          {/* Friendly emoji badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 18px", marginBottom: 24,
            background: "rgba(255,232,228,0.6)",
            color: "#FF6E5F",
            borderRadius: 999,
            fontWeight: 600, fontSize: 13,
          }}>
            🌱 Made with care
          </div>

          <h1 style={{
            color: "#3C2319",
            fontFamily: "'DM Sans', 'Inter', 'Noto Sans JP', sans-serif",
            fontSize: "clamp(36px, 5.5vw, 68px)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}>{title}</h1>

          {subtitle && (
            <p style={{
              color: "#785546",
              fontSize: 18, lineHeight: 1.7,
              marginTop: 24, maxWidth: 560,
            }}>{subtitle}</p>
          )}

          {ctaLabel && ctaUrl && (
            <a href={ctaUrl} data-cta-track="1" data-cta-source="hero_family"
              style={{
                display: "inline-block", marginTop: 32,
                padding: "16px 36px",
                background: "#FF6E5F",
                color: "#FFFFFF",
                fontWeight: 700, fontSize: 16,
                borderRadius: 24,
                textDecoration: "none",
                boxShadow: "0 8px 20px rgba(255,110,95,0.3)",
                transition: "transform 0.2s ease",
              }}>✨ {ctaLabel}</a>
          )}
        </div>

        {/* Family-photo placeholder (rounded soft) */}
        <div aria-hidden style={{
          aspectRatio: "1 / 1",
          borderRadius: 32,
          background: "linear-gradient(135deg, rgba(255,110,95,0.1) 0%, rgba(255,180,100,0.2) 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 80,
          boxShadow: "0 24px 48px rgba(255,110,95,0.15)",
        }}>
          🏡
        </div>
      </div>
    </section>
  )
}

// ─── ⑤ PostHog — Cream + signal orange + dot grid ────────────────────

function HeroPosthog({ title, subtitle, ctaLabel, ctaUrl }: HeroProps) {
  return (
    <section style={{
      padding: "100px 32px 80px",
      background: "#EEE9E1",
      backgroundImage: "radial-gradient(circle, rgba(21,21,21,0.08) 1px, transparent 1px)",
      backgroundSize: "24px 24px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)", gap: 64, alignItems: "center",
      }} className="grid md:grid-cols-[1.3fr_1fr] gap-8">
        <div>
          {/* Eyebrow tag (PostHog style) */}
          <div style={{
            display: "inline-block", padding: "4px 10px", marginBottom: 20,
            background: "#F54F00",
            color: "#FFFFFF",
            fontFamily: "var(--paradigm-font-mono, 'JetBrains Mono', monospace)",
            fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
            textTransform: "uppercase",
            borderRadius: 4,
          }}>
            BREAKING
          </div>

          <h1 style={{
            color: "#151515",
            fontFamily: "'Inter', 'Noto Sans JP', sans-serif",
            fontSize: "clamp(36px, 5.5vw, 68px)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}>{title}</h1>

          {subtitle && (
            <p style={{
              color: "#434343",
              fontFamily: "var(--paradigm-font-mono, 'JetBrains Mono', monospace)",
              fontSize: 14, lineHeight: 1.7,
              marginTop: 24, maxWidth: 560,
            }}>{subtitle}</p>
          )}

          {ctaLabel && ctaUrl && (
            <a href={ctaUrl} data-cta-track="1" data-cta-source="hero_posthog"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                marginTop: 32,
                padding: "14px 28px",
                background: "#F54F00",
                color: "#FFFFFF",
                fontFamily: "var(--paradigm-font-mono, 'JetBrains Mono', monospace)",
                fontWeight: 700, fontSize: 14,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                borderRadius: 6,
                textDecoration: "none",
              }}>{ctaLabel} →</a>
          )}
        </div>

        {/* Animated bar chart placeholder (PostHog trademark) */}
        <div aria-hidden style={{
          height: 240,
          background: "#F5F1EA",
          borderRadius: 8,
          padding: 20,
          display: "flex", alignItems: "flex-end", gap: 8,
          border: "1px solid #C8C0B2",
        }}>
          {[40, 65, 50, 80, 45, 90, 70].map((h, i) => (
            <div key={i} style={{
              flex: 1,
              height: `${h}%`,
              background: i === 5 ? "#F54F00" : "#1D4ED8",
              borderRadius: "4px 4px 0 0",
              opacity: i === 5 ? 1 : 0.7,
            }} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ⑥ Glean — Enterprise Navy + Lilac + search bar ──────────────────

function HeroGlean({ title, subtitle, ctaLabel, ctaUrl }: HeroProps) {
  return (
    <section style={{
      padding: "100px 32px 80px",
      background: "radial-gradient(circle at 80% 0%, rgba(139,92,246,0.10) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(99,102,241,0.08) 0%, transparent 50%), #FCFBFF",
      position: "relative", overflow: "hidden",
      textAlign: "center",
    }}>
      {/* Search bar UI (Glean trademark) */}
      <div style={{
        maxWidth: 600, margin: "0 auto 40px",
        padding: "16px 24px",
        background: "#FFFFFF",
        border: "1px solid #E6E4F5",
        borderRadius: 16,
        boxShadow: "0 8px 24px rgba(99,102,241,0.08), 0 0 0 4px rgba(139,92,246,0.06)",
        display: "flex", alignItems: "center", gap: 12,
        textAlign: "left",
      }}>
        <span style={{ fontSize: 20 }}>🔍</span>
        <span style={{
          flex: 1,
          color: "#8282AA",
          fontSize: 15,
        }}>Search across all your tools...</span>
        <span style={{
          padding: "4px 8px",
          background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
          color: "#FFFFFF",
          fontSize: 11, fontWeight: 600,
          borderRadius: 4,
        }}>AI</span>
      </div>

      <h1 style={{
        color: "#141432",
        fontFamily: "var(--paradigm-font-display, 'Inter', sans-serif)",
        fontSize: "clamp(40px, 6vw, 72px)",
        fontWeight: 800,
        letterSpacing: "-0.025em",
        lineHeight: 1.05,
        maxWidth: 900, margin: "0 auto",
      }}>{title}</h1>

      {subtitle && (
        <p style={{
          color: "#414164",
          fontSize: 18, lineHeight: 1.6,
          marginTop: 24, maxWidth: 600, margin: "24px auto 0",
        }}>{subtitle}</p>
      )}

      {ctaLabel && ctaUrl && (
        <a href={ctaUrl} data-cta-track="1" data-cta-source="hero_glean"
          style={{
            display: "inline-block", marginTop: 36,
            padding: "14px 32px",
            background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
            color: "#FFFFFF",
            fontWeight: 600, fontSize: 15,
            borderRadius: 12,
            textDecoration: "none",
            boxShadow: "0 8px 24px rgba(139,92,246,0.25)",
          }}>{ctaLabel}</a>
      )}

      {/* Enterprise compliance badges */}
      <div style={{
        marginTop: 36,
        display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap",
        fontSize: 11, color: "#8282AA", letterSpacing: "0.08em",
      }}>
        <span>🔒 SOC 2</span>
        <span>·</span>
        <span>🛡️ HIPAA</span>
        <span>·</span>
        <span>🌍 GDPR</span>
      </div>
    </section>
  )
}
