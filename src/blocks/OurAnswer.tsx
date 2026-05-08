// ─── OurAnswer (D-10 2026-05-08) ──────────────────────────────────────────
// 1 つの specific approach に絞る (Challenger Sale = "Tell, don't ask").
// 複数選択肢の menu 提示禁止 — 型レベルで approach は 1 つだけ.

import type { OurAnswerProps } from "../types"
import { NarrativeSection, NarrativeEyebrow } from "./_narrative-shared"

export function OurAnswerBlock({ approach, rationale, whatItsNot }: OurAnswerProps) {
  return (
    <NarrativeSection variant="default" ariaLabel="提案する解決策">
      <NarrativeEyebrow>我々の答え</NarrativeEyebrow>

      <h2
        style={{
          fontFamily: "var(--paradigm-font-display, 'Inter', system-ui, sans-serif)",
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          color: "var(--paradigm-ink, #111827)",
          margin: "0 0 20px 0",
        }}
      >
        {approach.title}
      </h2>

      <p
        style={{
          fontSize: 17,
          lineHeight: 1.7,
          color: "var(--paradigm-ink, #111827)",
          margin: "0 0 32px 0",
        }}
      >
        {approach.description}
      </p>

      {/* rationale — なぜこの approach が最良か (Challenger Sale Take Control) */}
      <div
        style={{
          padding: "20px 24px",
          background: "var(--paradigm-rationale-bg, rgba(0,0,0,0.03))",
          borderLeft: "3px solid var(--paradigm-accent, #4F46E5)",
          borderRadius: "0 8px 8px 0",
          marginBottom: whatItsNot ? 20 : 0,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--paradigm-ink-soft, #6B7280)",
            marginBottom: 8,
          }}
        >
          なぜこの方針か
        </div>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: "var(--paradigm-ink, #111827)",
            margin: 0,
          }}
        >
          {rationale}
        </p>
      </div>

      {/* whatItsNot — 排除した選択肢を 1 つだけ簡潔に */}
      {whatItsNot && (
        <p
          style={{
            fontSize: 13,
            lineHeight: 1.6,
            color: "var(--paradigm-ink-muted, #9CA3AF)",
            fontStyle: "italic",
            margin: 0,
          }}
        >
          ※ {whatItsNot}
        </p>
      )}
    </NarrativeSection>
  )
}
