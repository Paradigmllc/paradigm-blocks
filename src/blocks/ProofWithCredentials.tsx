// ─── ProofWithCredentials (D-10 2026-05-08) ──────────────────────────────
// 信頼性の 3 層: ① 同業 case study ② Paradigm credentials ③ Risk Reversal.
// 1 block に集約することで「複数の証拠が連動して説得力を生む」narrative を実現.

import type { ProofWithCredentialsProps } from "../types"
import { NarrativeSection, NarrativeEyebrow, SourceBadge } from "./_narrative-shared"

export function ProofWithCredentialsBlock({
  caseStudy,
  credentials,
  riskReversal,
}: ProofWithCredentialsProps) {
  return (
    <NarrativeSection variant="default" ariaLabel="信頼の根拠">
      <NarrativeEyebrow>信頼の根拠</NarrativeEyebrow>

      {/* Layer 1: Case Study */}
      <div
        style={{
          padding: "24px 28px",
          background: "var(--paradigm-card-bg, #FFFFFF)",
          border: "1px solid var(--paradigm-rule, rgba(0,0,0,0.10))",
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--paradigm-ink-soft, #6B7280)",
            marginBottom: 12,
          }}
        >
          同業の改善事例
        </div>
        <h4
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "var(--paradigm-ink, #111827)",
            margin: "0 0 6px 0",
          }}
        >
          {caseStudy.company}
        </h4>
        <div
          style={{
            fontSize: 12,
            color: "var(--paradigm-ink-muted, #9CA3AF)",
            marginBottom: 14,
          }}
        >
          {caseStudy.industry} ・ {caseStudy.periodMonths} ヶ月の取り組み
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--paradigm-ink, #111827)", margin: 0 }}>
          {caseStudy.result.value}
          <SourceBadge label={caseStudy.result.sourceLabel} url={caseStudy.result.sourceUrl} />
        </p>
      </div>

      {/* Layer 2: Credentials */}
      <div
        style={{
          padding: "20px 28px",
          background: "var(--paradigm-credentials-bg, rgba(0,0,0,0.02))",
          borderRadius: 12,
          marginBottom: 20,
          fontSize: 13,
          lineHeight: 1.7,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--paradigm-ink-soft, #6B7280)",
            marginBottom: 10,
          }}
        >
          診断主体
        </div>
        <div style={{ fontWeight: 700, fontSize: 15, color: "var(--paradigm-ink, #111827)", marginBottom: 6 }}>
          {credentials.entityName}
        </div>
        {credentials.corporateNumber && (
          <div style={{ color: "var(--paradigm-ink-soft, #4B5563)" }}>
            法人番号: {credentials.corporateNumber}
          </div>
        )}
        <div style={{ color: "var(--paradigm-ink-soft, #4B5563)" }}>
          所在地: {credentials.physicalAddress}
        </div>
        {credentials.trackRecord && credentials.trackRecord.length > 0 && (
          <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 12 }}>
            {credentials.trackRecord.map((rec, i) => (
              <span
                key={i}
                style={{
                  padding: "4px 10px",
                  background: "var(--paradigm-paper-bg, #FFFFFF)",
                  borderRadius: 6,
                  fontSize: 12,
                  color: "var(--paradigm-ink, #111827)",
                  border: "1px solid var(--paradigm-rule, rgba(0,0,0,0.06))",
                }}
              >
                {rec.value}
                <SourceBadge label={rec.sourceLabel} url={rec.sourceUrl} />
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Layer 3: Risk Reversal */}
      <div
        style={{
          padding: "20px 28px",
          background:
            "var(--paradigm-risk-reversal-bg, rgba(var(--paradigm-accent-rgb, 79, 70, 229), 0.06))",
          border: "1px solid var(--paradigm-accent, #4F46E5)",
          borderRadius: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 18 }} aria-hidden>
            ✓
          </span>
          <h4
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "var(--paradigm-accent, #4F46E5)",
              margin: 0,
            }}
          >
            {riskReversal.headline}
          </h4>
        </div>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.7,
            color: "var(--paradigm-ink, #111827)",
            margin: 0,
            paddingLeft: 28,
          }}
        >
          {riskReversal.details}
        </p>
      </div>
    </NarrativeSection>
  )
}
