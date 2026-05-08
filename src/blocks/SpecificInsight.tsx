// ─── SpecificInsight (D-10 2026-05-08) ────────────────────────────────────
// Challenger Sale の Insight Provocation block.
// 1 個だけの "あなただから当てはまる" insight + 数値根拠 + implication.
//
// 視覚的には「気付きの瞬間」を演出: 縦に大きな単一カード + 数値強調.

import type { SpecificInsightProps } from "../types"
import { NarrativeSection, NarrativeEyebrow, SourceBadge } from "./_narrative-shared"

export function SpecificInsightBlock({
  insight,
  dataPoint,
  benchmark,
  implication,
}: SpecificInsightProps) {
  return (
    <NarrativeSection variant="default" ariaLabel="特定 insight">
      <NarrativeEyebrow>気付きの 1 ポイント</NarrativeEyebrow>

      {/* 主張 (insight) — 太字大きめ */}
      <p
        style={{
          fontFamily:
            "var(--paradigm-font-narrative, var(--paradigm-font-display, 'Noto Serif JP', serif))",
          fontSize: "clamp(20px, 3vw, 28px)",
          lineHeight: 1.4,
          fontWeight: 600,
          color: "var(--paradigm-ink, #111827)",
          margin: "0 0 32px 0",
          letterSpacing: "-0.01em",
        }}
      >
        {insight}
      </p>

      {/* 数値カード (実測値 + benchmark 比較・対比強調) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: benchmark ? "1fr 1fr" : "1fr",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <DataCard
          label="現状"
          value={dataPoint.value}
          sourceLabel={dataPoint.sourceLabel}
          sourceUrl={dataPoint.sourceUrl}
          accent
        />
        {benchmark && (
          <DataCard
            label="比較値"
            value={benchmark.value}
            sourceLabel={benchmark.sourceLabel}
            sourceUrl={benchmark.sourceUrl}
          />
        )}
      </div>

      {/* implication — これが顧客にとって何を意味するか */}
      <p
        style={{
          fontSize: 16,
          lineHeight: 1.7,
          color: "var(--paradigm-ink-soft, #4B5563)",
          padding: "16px 20px",
          borderLeft: "3px solid var(--paradigm-accent, #4F46E5)",
          background: "var(--paradigm-narrative-implication-bg, rgba(0,0,0,0.02))",
          margin: 0,
        }}
      >
        {implication}
      </p>
    </NarrativeSection>
  )
}

function DataCard({
  label,
  value,
  sourceLabel,
  sourceUrl,
  accent,
}: {
  label: string
  value: string | number
  sourceLabel: string
  sourceUrl?: string
  accent?: boolean
}) {
  return (
    <div
      style={{
        padding: "20px 24px",
        background: accent
          ? "var(--paradigm-data-accent-bg, rgba(var(--paradigm-accent-rgb, 79, 70, 229), 0.08))"
          : "var(--paradigm-data-bg, rgba(0,0,0,0.03))",
        borderRadius: 12,
        border: accent
          ? "1px solid var(--paradigm-accent, #4F46E5)"
          : "1px solid var(--paradigm-rule, rgba(0,0,0,0.08))",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--paradigm-ink-soft, #6B7280)",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          fontFamily:
            "var(--paradigm-font-display, 'Inter', system-ui, sans-serif)",
          color: accent
            ? "var(--paradigm-accent, #4F46E5)"
            : "var(--paradigm-ink, #111827)",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
        }}
      >
        {value}
        <SourceBadge label={sourceLabel} url={sourceUrl} />
      </div>
    </div>
  )
}
