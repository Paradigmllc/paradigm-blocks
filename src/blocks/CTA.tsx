// ─── CTA Block — B33 Phase 3 (2026-05-08) ──────────────────────────────
// 6 design theme 別の variant 別 layout. 設計仕様:
// docs/refactor/design-themes-rich-blocks.md
//
// 設計原則: CTA は最終接点なので「装飾 1 + コピー鮮明 + ボタン強調」に絞る。
// テーマ毎の "1 つの強い視覚的特徴":
//   raycast → spotlight + neon glow button
//   stripe  → split layout (left copy / right code-styled CTA box)
//   reflect → serif large + handwritten signature line
//   family  → rounded soft + emoji + warm coral pill button
//   posthog → data signal banner + monospace + orange button
//   glean   → enterprise gradient + lilac button + trust badges

import type { CTAProps } from "../types"
import { useDesignTheme } from "../ThemeContext"

export function CTABlock(props: CTAProps) {
  const theme = useDesignTheme()
  switch (theme) {
    case "raycast": return <CTARaycast {...props} />
    case "stripe":  return <CTAStripe {...props} />
    case "reflect": return <CTAReflect {...props} />
    case "family":  return <CTAFamily {...props} />
    case "posthog": return <CTAPosthog {...props} />
    case "glean":   return <CTAGlean {...props} />
    default:        return <CTADefault {...props} />
  }
}

// ─── Default (CSS 変数のみ・後方互換) ──────────────────────────────

function CTADefault({ heading, description, buttonLabel, buttonUrl, variant = "primary" }: CTAProps) {
  const isPrimary = variant === "primary"
  const accent = "rgb(var(--paradigm-accent))"
  const ink = "rgb(var(--paradigm-ink))"
  const inkSoft = "rgb(var(--paradigm-ink-soft))"
  const radius = "var(--paradigm-radius-card, 12px)"
  const fontDisplay = "var(--paradigm-font-display, var(--paradigm-font-sans))"
  return (
    <section style={{ padding: "64px 24px", background: isPrimary ? accent : "transparent", textAlign: "center" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h2 style={{ color: isPrimary ? "#FFFFFF" : ink, fontFamily: fontDisplay, fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12 }}>{heading}</h2>
        {description && <p style={{ color: isPrimary ? "rgba(255,255,255,0.92)" : inkSoft, fontSize: 18, marginBottom: 28, lineHeight: 1.6 }}>{description}</p>}
        <a href={buttonUrl} data-cta-track="1" data-cta-source="cta_block" style={{ display: "inline-block", padding: "14px 32px", borderRadius: radius, background: isPrimary ? "#FFFFFF" : accent, color: isPrimary ? accent : "#FFFFFF", fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.16)" }}>{buttonLabel}</a>
      </div>
    </section>
  )
}

// ─── ① Raycast — Dark spotlight + neon glow button ──────────────────

function CTARaycast({ heading, description, buttonLabel, buttonUrl }: CTAProps) {
  return (
    <section style={{
      padding: "96px 24px",
      background: "radial-gradient(ellipse at center, rgba(120,90,240,0.20) 0%, rgba(8,8,12,0.95) 60%), #08080C",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      borderTop: "1px solid rgba(255,99,130,0.20)",
      borderBottom: "1px solid rgba(120,90,240,0.20)",
    }}>
      {/* spotlight pulse */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 600,
        height: 600,
        transform: "translate(-50%, -50%)",
        background: "radial-gradient(circle, rgba(255,99,130,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "inline-block",
          padding: "4px 12px",
          borderRadius: 999,
          fontSize: 11,
          fontFamily: '"JetBrains Mono", monospace',
          color: "#64C8FF",
          background: "rgba(100,200,255,0.08)",
          border: "1px solid rgba(100,200,255,0.30)",
          marginBottom: 20,
          letterSpacing: "0.10em",
        }}>
          ⌘K · 30 SECONDS TO START
        </div>
        <h2 style={{
          color: "#F5F5FA",
          fontFamily: '"Inter", sans-serif',
          fontSize: "clamp(32px, 4.5vw, 56px)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginBottom: 16,
          background: "linear-gradient(135deg, #FFFFFF 0%, #B4A5FF 60%, #64C8FF 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {heading}
        </h2>
        {description && (
          <p style={{ color: "#B4B4C3", fontSize: 18, marginBottom: 36, lineHeight: 1.6 }}>{description}</p>
        )}
        <a href={buttonUrl} data-cta-track="1" data-cta-source="cta_block" style={{
          display: "inline-block",
          padding: "16px 40px",
          borderRadius: 12,
          background: "linear-gradient(135deg, #FF6382 0%, #785AF0 100%)",
          color: "#FFFFFF",
          fontFamily: '"Inter", sans-serif',
          fontWeight: 700,
          fontSize: 16,
          textDecoration: "none",
          boxShadow: "0 0 40px rgba(255,99,130,0.40), 0 0 80px rgba(120,90,240,0.30)",
          letterSpacing: "0.02em",
        }}>
          {buttonLabel} →
        </a>
      </div>
    </section>
  )
}

// ─── ② Stripe — Clean split layout (left copy / right code box) ────

function CTAStripe({ heading, description, buttonLabel, buttonUrl }: CTAProps) {
  return (
    <section style={{ padding: "80px 24px", background: "#F7FAFC", borderTop: "1px solid #E4E8F0" }}>
      <div style={{
        maxWidth: 1080,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr",
        gap: 48,
        alignItems: "center",
      }} className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12">
        {/* left — copy */}
        <div>
          <h2 style={{
            color: "#0A0E1C",
            fontFamily: '"Inter", "Helvetica Neue", sans-serif',
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            marginBottom: 16,
          }}>{heading}</h2>
          {description && (
            <p style={{ color: "#3C4655", fontSize: 18, lineHeight: 1.65, marginBottom: 24 }}>{description}</p>
          )}
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <a href={buttonUrl} data-cta-track="1" data-cta-source="cta_block" style={{
              display: "inline-block",
              padding: "14px 28px",
              borderRadius: 8,
              background: "#635BFF",
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: 15,
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(99,91,255,0.24)",
            }}>{buttonLabel} →</a>
            <span style={{ fontSize: 13, color: "#788291" }}>· No credit card required</span>
          </div>
        </div>
        {/* right — code-styled CTA box */}
        <div style={{
          background: "#0A0E1C",
          borderRadius: 12,
          padding: "20px 24px",
          fontFamily: '"SF Mono", "JetBrains Mono", Consolas, monospace',
          fontSize: 13,
          color: "#A8E6FF",
          lineHeight: 1.7,
          boxShadow: "0 24px 48px -12px rgba(99,91,255,0.18)",
        }}>
          <div style={{ color: "#788291", marginBottom: 8 }}># Quick start</div>
          <div><span style={{ color: "#FF8A00" }}>$</span> <span style={{ color: "#FFFFFF" }}>curl -X POST</span></div>
          <div style={{ paddingLeft: 16 }}><span style={{ color: "#A8E6FF" }}>https://api.paradigm.jp/v1/diagnose</span></div>
          <div style={{ paddingLeft: 16, color: "#7BD389" }}>--data &#39;{`{"url": "your-site.com"}`}&#39;</div>
        </div>
      </div>
    </section>
  )
}

// ─── ③ Reflect — Linen + serif large + handwritten signature ───────

function CTAReflect({ heading, description, buttonLabel, buttonUrl }: CTAProps) {
  return (
    <section style={{ padding: "112px 24px", background: "linear-gradient(180deg, #FAF8F4 0%, #F0ECE4 100%)", textAlign: "center" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{
          fontFamily: '"Cormorant Garamond", "Noto Serif JP", Georgia, serif',
          fontStyle: "italic",
          fontSize: 18,
          color: "#8C87A0",
          marginBottom: 16,
        }}>
          ✎ a quiet invitation
        </div>
        <h2 style={{
          color: "#1A1824",
          fontFamily: '"Cormorant Garamond", "Noto Serif JP", Georgia, serif',
          fontWeight: 500,
          fontSize: "clamp(36px, 5vw, 56px)",
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
          marginBottom: 20,
        }}>{heading}</h2>
        {description && (
          <p style={{ color: "#4B465F", fontSize: 18, lineHeight: 1.75, marginBottom: 36, fontFamily: '"Inter", sans-serif' }}>{description}</p>
        )}
        <a href={buttonUrl} data-cta-track="1" data-cta-source="cta_block" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "14px 28px",
          borderRadius: 10,
          background: "#4E46C8",
          color: "#FFFFFF",
          fontFamily: '"Inter", sans-serif',
          fontWeight: 600,
          fontSize: 15,
          textDecoration: "none",
          boxShadow: "0 4px 16px rgba(78,70,200,0.24)",
        }}>
          {buttonLabel}
          <span style={{ fontSize: 18 }}>→</span>
        </a>
        <div style={{
          marginTop: 32,
          fontFamily: '"Cormorant Garamond", "Noto Serif JP", Georgia, serif',
          fontStyle: "italic",
          fontSize: 16,
          color: "#8C87A0",
        }}>
          — with care, Paradigm
        </div>
      </div>
    </section>
  )
}

// ─── ④ Family — Warm sand + emoji + coral pill button ──────────────

function CTAFamily({ heading, description, buttonLabel, buttonUrl }: CTAProps) {
  return (
    <section style={{
      padding: "96px 24px",
      background: "radial-gradient(circle at 30% 30%, rgba(255,180,100,0.30) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255,110,95,0.20) 0%, transparent 50%), #FDF8F0",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ fontSize: 56, marginBottom: 20, lineHeight: 1 }}>🌱</div>
        <h2 style={{
          color: "#3C2319",
          fontFamily: '"DM Serif Display", "Noto Serif JP", Georgia, serif',
          fontSize: "clamp(32px, 4.5vw, 48px)",
          fontWeight: 400,
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          marginBottom: 20,
        }}>{heading}</h2>
        {description && (
          <p style={{ color: "#785546", fontSize: 18, lineHeight: 1.7, marginBottom: 36, fontFamily: '"DM Sans", sans-serif' }}>{description}</p>
        )}
        <a href={buttonUrl} data-cta-track="1" data-cta-source="cta_block" style={{
          display: "inline-block",
          padding: "16px 40px",
          borderRadius: 999,
          background: "#FF6E5F",
          color: "#FFFFFF",
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 700,
          fontSize: 16,
          textDecoration: "none",
          boxShadow: "0 12px 32px -4px rgba(255,110,95,0.40)",
        }}>
          {buttonLabel} 🌳
        </a>
        <div style={{ marginTop: 24, fontSize: 14, color: "#AF9682", fontFamily: '"DM Sans", sans-serif' }}>
          🤍 100% 安全な情報取り扱い · 30 日間返金保証
        </div>
      </div>
    </section>
  )
}

// ─── ⑤ PostHog — Data signal banner + monospace ────────────────────

function CTAPosthog({ heading, description, buttonLabel, buttonUrl }: CTAProps) {
  return (
    <section style={{ padding: "72px 24px", background: "#EEE9E1", borderTop: "2px solid #151515", borderBottom: "2px solid #151515" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        {/* signal banner */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "4px 12px",
          background: "#F54F00",
          color: "#FFFFFF",
          fontFamily: '"JetBrains Mono", Menlo, monospace',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.10em",
          marginBottom: 20,
          borderRadius: 4,
        }}>
          ● LIVE · NOW SHIPPING
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 32,
          alignItems: "center",
        }} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-8">
          <div>
            <h2 style={{
              color: "#151515",
              fontFamily: '"Matter", "Inter", sans-serif',
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: 12,
            }}>{heading}</h2>
            {description && (
              <p style={{ color: "#434343", fontSize: 16, lineHeight: 1.6, fontFamily: '"Inter", sans-serif' }}>{description}</p>
            )}
            <div style={{
              marginTop: 16,
              fontFamily: '"JetBrains Mono", Menlo, monospace',
              fontSize: 12,
              color: "#7F7F7F",
            }}>
              <span style={{ color: "#059669" }}>↗ +247%</span> avg conversion lift across 1,200+ sites
            </div>
          </div>
          <a href={buttonUrl} data-cta-track="1" data-cta-source="cta_block" style={{
            display: "inline-block",
            padding: "16px 32px",
            borderRadius: 6,
            background: "#F54F00",
            color: "#FFFFFF",
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            fontSize: 15,
            textDecoration: "none",
            boxShadow: "4px 4px 0 0 #151515",
            border: "2px solid #151515",
            whiteSpace: "nowrap",
          }}>
            {buttonLabel} →
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── ⑥ Glean — Enterprise gradient + trust badges ──────────────────

function CTAGlean({ heading, description, buttonLabel, buttonUrl }: CTAProps) {
  return (
    <section style={{
      padding: "96px 24px",
      background: "radial-gradient(circle at 80% 0%, rgba(139,92,246,0.10) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(99,102,241,0.08) 0%, transparent 50%), #FCFBFF",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h2 style={{
          color: "#141432",
          fontFamily: '"Inter", "Söhne Breit", sans-serif',
          fontSize: "clamp(32px, 4.5vw, 48px)",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          lineHeight: 1.15,
          marginBottom: 20,
          background: "linear-gradient(135deg, #141432 0%, #6366F1 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>{heading}</h2>
        {description && (
          <p style={{ color: "#414164", fontSize: 18, lineHeight: 1.7, marginBottom: 36 }}>{description}</p>
        )}
        <a href={buttonUrl} data-cta-track="1" data-cta-source="cta_block" style={{
          display: "inline-block",
          padding: "16px 40px",
          borderRadius: 12,
          background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
          color: "#FFFFFF",
          fontFamily: '"Inter", sans-serif',
          fontWeight: 700,
          fontSize: 16,
          textDecoration: "none",
          boxShadow: "0 16px 40px -8px rgba(139,92,246,0.40)",
          letterSpacing: "0.01em",
        }}>
          {buttonLabel} →
        </a>
        {/* trust badges */}
        <div style={{
          marginTop: 40,
          display: "flex",
          justifyContent: "center",
          gap: 24,
          flexWrap: "wrap",
          fontSize: 12,
          color: "#8282AA",
          fontFamily: '"Inter", sans-serif',
        }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>🔒 SOC 2 Type II</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>🛡 HIPAA Ready</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>🌐 GDPR Compliant</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>✓ ISO 27001</span>
        </div>
      </div>
    </section>
  )
}
