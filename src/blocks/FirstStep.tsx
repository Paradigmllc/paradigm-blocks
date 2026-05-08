// ─── FirstStep (D-10 2026-05-08) ──────────────────────────────────────────
// Low-commitment offer block.
// "契約" "購入" 表現禁止 — "対話" "確認" "試算" 用語のみ.
// friction を minimal にして「まず対話」へ誘導.

import type { FirstStepProps } from "../types"
import { NarrativeSection, NarrativeEyebrow } from "./_narrative-shared"

export function FirstStepBlock({
  offer,
  bookingUrl,
  durationMinutes,
  alternativeOffer,
}: FirstStepProps) {
  return (
    <NarrativeSection variant="assertive" ariaLabel="次の一歩">
      <NarrativeEyebrow>次の一歩</NarrativeEyebrow>

      <div
        style={{
          padding: "32px 36px",
          background: "var(--paradigm-card-bg, #FFFFFF)",
          border: "1px solid var(--paradigm-rule, rgba(0,0,0,0.10))",
          borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
        }}
      >
        <h3
          style={{
            fontSize: "clamp(22px, 3vw, 28px)",
            fontWeight: 700,
            lineHeight: 1.3,
            color: "var(--paradigm-ink, #111827)",
            margin: "0 0 12px 0",
            letterSpacing: "-0.01em",
          }}
        >
          {offer.headline}
        </h3>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: "var(--paradigm-ink-soft, #4B5563)",
            margin: "0 0 24px 0",
          }}
        >
          {offer.description}
        </p>

        {/* Primary CTA: Cal.com link */}
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cta-track="1"
          data-cta-source="first_step_primary"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 28px",
            background: "var(--paradigm-accent, #4F46E5)",
            color: "#FFFFFF",
            fontSize: 15,
            fontWeight: 600,
            borderRadius: 10,
            textDecoration: "none",
            boxShadow: "0 4px 12px rgba(var(--paradigm-accent-rgb, 79, 70, 229), 0.25)",
          }}
        >
          {durationMinutes} 分の対話を予約 →
        </a>

        {/* Alternative offer (任意) */}
        {alternativeOffer && (
          <div
            style={{
              marginTop: 20,
              paddingTop: 20,
              borderTop: "1px solid var(--paradigm-rule, rgba(0,0,0,0.06))",
              fontSize: 13,
              color: "var(--paradigm-ink-soft, #6B7280)",
            }}
          >
            または{" "}
            <a
              href={alternativeOffer.actionUrl}
              data-cta-track="1"
              data-cta-source="first_step_alternative"
              style={{
                color: "var(--paradigm-accent, #4F46E5)",
                textDecoration: "underline",
                fontWeight: 500,
              }}
            >
              {alternativeOffer.headline}
            </a>
          </div>
        )}
      </div>
    </NarrativeSection>
  )
}
