// ─── RiskQuantification (R2 v0.5.0 2026-05-08) ────────────────────
// 3 シナリオ (保守 / 中立 / 楽観) で 6 ヶ月後 range.
// 旧 "推定年間機会損失 ¥XX" 単一数値を廃止し、確率分布として提示する research grade の心臓部.

import type { RiskQuantificationProps, ScenarioOutcome } from "../types"
import { NarrativeSection, NarrativeEyebrow, ConfidenceBadge, SourceBadge } from "./_narrative-shared"

const SCENARIO_TONE = {
  conservative: { label: "保守シナリオ", accent: "var(--paradigm-risk-conservative, #DC2626)", icon: "▼" },
  neutral:      { label: "中立シナリオ", accent: "var(--paradigm-risk-neutral, #B45309)",      icon: "■" },
  optimistic:   { label: "楽観シナリオ", accent: "var(--paradigm-risk-optimistic, #047857)",  icon: "▲" },
} as const

function ScenarioCard({
  kind,
  outcome,
}: {
  kind: keyof typeof SCENARIO_TONE
  outcome: ScenarioOutcome
}) {
  const tone = SCENARIO_TONE[kind]
  return (
    <div
      style={{
        flex: 1,
        padding: "20px 18px",
        background: "var(--paradigm-paper-bg-soft, rgba(0,0,0,0.02))",
        borderTop: `3px solid ${tone.accent}`,
        borderRadius: "0 0 6px 6px",
        minWidth: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ color: tone.accent, fontSize: 14, fontWeight: 700 }}>{tone.icon}</span>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paradigm-ink-soft, #6B7280)" }}>
          {tone.label}
        </div>
      </div>

      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--paradigm-ink, #111827)", marginBottom: 10 }}>
        {outcome.label}
      </div>

      <div style={{ fontSize: 13, lineHeight: 1.6, color: "var(--paradigm-ink-soft, #4B5563)", marginBottom: 12 }}>
        {outcome.expected.value}
        <SourceBadge label={outcome.expected.sourceLabel} url={outcome.expected.sourceUrl} fetchedAt={outcome.expected.fetchedAt} />
        <ConfidenceBadge level={outcome.confidence} />
      </div>

      {outcome.precondition && (
        <div style={{ fontSize: 11, color: "var(--paradigm-ink-soft, #6B7280)", fontStyle: "italic" }}>
          前提: {outcome.precondition}
        </div>
      )}
    </div>
  )
}

export function RiskQuantificationBlock({
  heading,
  horizon,
  scenarios,
  assumptions,
}: RiskQuantificationProps) {
  return (
    <NarrativeSection variant="default" ariaLabel="リスク シナリオ評価">
      <NarrativeEyebrow>Risk Quantification — {horizon}</NarrativeEyebrow>

      <h2
        style={{
          fontFamily: "var(--paradigm-font-display, 'Noto Serif JP', serif)",
          fontSize: 24,
          fontWeight: 600,
          color: "var(--paradigm-ink, #111827)",
          margin: "0 0 20px 0",
        }}
      >
        {heading ?? "3 シナリオ別の outcome range"}
      </h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: assumptions && assumptions.length > 0 ? 24 : 0 }}>
        <ScenarioCard kind="conservative" outcome={scenarios.conservative} />
        <ScenarioCard kind="neutral"      outcome={scenarios.neutral} />
        <ScenarioCard kind="optimistic"   outcome={scenarios.optimistic} />
      </div>

      {assumptions && assumptions.length > 0 && (
        <div
          style={{
            padding: "14px 18px",
            background: "var(--paradigm-paper-bg-soft, rgba(0,0,0,0.02))",
            borderRadius: 6,
            fontSize: 12,
            color: "var(--paradigm-ink-soft, #6B7280)",
            lineHeight: 1.6,
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 6, color: "var(--paradigm-ink-soft, #4B5563)" }}>
            計算前提
          </div>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {assumptions.map((a, idx) => (
              <li key={idx} style={{ marginBottom: 4 }}>{a}</li>
            ))}
          </ul>
        </div>
      )}
    </NarrativeSection>
  )
}
