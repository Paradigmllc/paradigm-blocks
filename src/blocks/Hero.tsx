// ─── Hero Block ──────────────────────────────────────────────────
// B33 (2026-05-07): inline style + --paradigm-* CSS 変数 経由で
// ThemeProvider が決めた 6 design theme に追従する。
import type { HeroProps } from "../types"

export function HeroBlock({ title, subtitle, ctaLabel, ctaUrl, imageUrl, variant = "centered" }: HeroProps) {
  const heroBg = "var(--paradigm-hero-bg, rgb(var(--paradigm-paper)))"
  const ink = "rgb(var(--paradigm-ink))"
  const inkSoft = "rgb(var(--paradigm-ink-soft))"
  const accent = "rgb(var(--paradigm-accent))"
  const radius = "var(--paradigm-radius-card, 12px)"
  const fontDisplay = "var(--paradigm-font-display, var(--paradigm-font-sans))"

  if (variant === "split" && imageUrl) {
    return (
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          alignItems: "center",
          padding: "64px 24px",
          background: heroBg,
        }}
        className="grid md:grid-cols-2 gap-8 items-center py-16 px-6"
      >
        <div>
          <h1 style={{ color: ink, fontFamily: fontDisplay, fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ color: inkSoft, fontSize: 18, marginTop: 16, lineHeight: 1.6 }}>{subtitle}</p>
          )}
          {ctaLabel && ctaUrl && (
            <a
              href={ctaUrl}
              data-cta-track="1"
              data-cta-source="hero_split"
              style={{
                display: "inline-block",
                marginTop: 24,
                padding: "14px 28px",
                borderRadius: radius,
                background: accent,
                color: "#FFFFFF",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              }}
            >
              {ctaLabel}
            </a>
          )}
        </div>
        <img src={imageUrl} alt="" style={{ width: "100%", borderRadius: radius, boxShadow: "0 16px 48px rgba(0,0,0,0.16)" }} />
      </section>
    )
  }

  const align = variant === "left" ? "left" : "center"
  return (
    <section
      style={{
        padding: "80px 24px",
        textAlign: align,
        background: heroBg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <h1
        style={{
          color: ink,
          fontFamily: fontDisplay,
          fontSize: "clamp(32px, 5vw, 60px)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          maxWidth: 920,
          margin: align === "center" ? "0 auto" : "0",
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            color: inkSoft,
            fontSize: 18,
            marginTop: 20,
            maxWidth: 640,
            margin: align === "center" ? "20px auto 0" : "20px 0 0",
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      )}
      {ctaLabel && ctaUrl && (
        <a
          href={ctaUrl}
          data-cta-track="1"
          data-cta-source="hero"
          style={{
            display: "inline-block",
            marginTop: 32,
            padding: "16px 32px",
            borderRadius: radius,
            background: accent,
            color: "#FFFFFF",
            fontWeight: 600,
            textDecoration: "none",
            boxShadow: "0 12px 32px rgba(0,0,0,0.14)",
          }}
        >
          {ctaLabel}
        </a>
      )}
    </section>
  )
}
