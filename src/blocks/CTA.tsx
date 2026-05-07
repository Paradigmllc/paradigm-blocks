// ─── CTA Block ──────────────────────────────────────────────────
// B33 (2026-05-07): theme-aware (CSS vars + inline styles)
import type { CTAProps } from "../types"

export function CTABlock({ heading, description, buttonLabel, buttonUrl, variant = "primary" }: CTAProps) {
  const isPrimary = variant === "primary"
  const accent = "rgb(var(--paradigm-accent))"
  const ink = "rgb(var(--paradigm-ink))"
  const inkSoft = "rgb(var(--paradigm-ink-soft))"
  const radius = "var(--paradigm-radius-card, 12px)"
  const fontDisplay = "var(--paradigm-font-display, var(--paradigm-font-sans))"

  return (
    <section
      style={{
        padding: "64px 24px",
        background: isPrimary ? accent : "transparent",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h2
          style={{
            color: isPrimary ? "#FFFFFF" : ink,
            fontFamily: fontDisplay,
            fontSize: "clamp(24px, 3.5vw, 36px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 12,
          }}
        >
          {heading}
        </h2>
        {description && (
          <p
            style={{
              color: isPrimary ? "rgba(255,255,255,0.92)" : inkSoft,
              fontSize: 18,
              marginBottom: 28,
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
        )}
        <a
          href={buttonUrl}
          data-cta-track="1"
          data-cta-source="cta_block"
          style={{
            display: "inline-block",
            padding: "14px 32px",
            borderRadius: radius,
            background: isPrimary ? "#FFFFFF" : accent,
            color: isPrimary ? accent : "#FFFFFF",
            fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 8px 24px rgba(0,0,0,0.16)",
            transition: "transform 0.15s ease",
          }}
        >
          {buttonLabel}
        </a>
      </div>
    </section>
  )
}
