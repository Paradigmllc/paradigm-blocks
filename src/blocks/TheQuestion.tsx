// ─── TheQuestion (D-10 2026-05-08) ────────────────────────────────────────
// Challenger Sale Tension — 1 行の direct question で自問自答誘発.
// quote-style の太字大文字でレイアウト. 顧客が "うっ" と止まるための余白設計.

import type { TheQuestionProps } from "../types"
import { NarrativeSection, NarrativeEyebrow } from "./_narrative-shared"

export function TheQuestionBlock({ question, context, axis }: TheQuestionProps) {
  return (
    <NarrativeSection variant="assertive" ariaLabel="重要な問い">
      <NarrativeEyebrow>{axis === "investment_roi" ? "投資の問い" : axis === "future_risk" ? "未来の問い" : "ご検討の問い"}</NarrativeEyebrow>

      {/* 引用記号で囲む — 営業色ゼロで quote-style に */}
      <div style={{ position: "relative", padding: "20px 0 8px 32px" }}>
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            fontSize: 64,
            lineHeight: 1,
            fontFamily: "Georgia, serif",
            color: "var(--paradigm-accent, #4F46E5)",
            opacity: 0.4,
          }}
        >
          "
        </span>
        <p
          style={{
            fontFamily:
              "var(--paradigm-font-narrative, var(--paradigm-font-display, 'Noto Serif JP', serif))",
            fontSize: "clamp(22px, 3.5vw, 32px)",
            fontWeight: 600,
            lineHeight: 1.4,
            color: "var(--paradigm-ink, #111827)",
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          {question}
        </p>
      </div>

      {context && (
        <p
          style={{
            marginTop: 24,
            paddingLeft: 32,
            fontSize: 14,
            lineHeight: 1.7,
            color: "var(--paradigm-ink-soft, #4B5563)",
          }}
        >
          {context}
        </p>
      )}
    </NarrativeSection>
  )
}
