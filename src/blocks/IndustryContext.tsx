// ─── IndustryContext (R2 v0.5.0 2026-05-08) ───────────────────────
// 業界 macro trend + benchmark (公開データ ベース).
// 御社の数値を業界 context の中で位置づける. e-Stat / BLS / OECD / Similarweb 引用.

import type { IndustryContextProps } from "../types"
import { NarrativeSection, NarrativeEyebrow, NarrativeBody, SourceBadge } from "./_narrative-shared"

export function IndustryContextBlock({
  heading,
  industryLabel,
  macroTrend,
  benchmarks,
}: IndustryContextProps) {
  return (
    <NarrativeSection variant="default" ariaLabel="業界 context と benchmark">
      <NarrativeEyebrow>Industry Context — {industryLabel}</NarrativeEyebrow>

      <h2
        style={{
          fontFamily: "var(--paradigm-font-display, 'Noto Serif JP', serif)",
          fontSize: 24,
          fontWeight: 600,
          color: "var(--paradigm-ink, #111827)",
          margin: "0 0 16px 0",
        }}
      >
        {heading ?? "業界の中での位置づけ"}
      </h2>

      {macroTrend && (
        <NarrativeBody size="md" style={{ marginBottom: 28, color: "var(--paradigm-ink-soft, #4B5563)" }}>
          {macroTrend.value}
          <SourceBadge
            label={macroTrend.sourceLabel}
            url={macroTrend.sourceUrl}
            fetchedAt={macroTrend.fetchedAt}
          />
        </NarrativeBody>
      )}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 14,
        }}
      >
        <thead>
          <tr style={{ borderBottom: "2px solid var(--paradigm-rule, rgba(0,0,0,0.12))" }}>
            <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 600, color: "var(--paradigm-ink-soft, #4B5563)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>指標</th>
            <th style={{ textAlign: "right", padding: "10px 8px", fontWeight: 600, color: "var(--paradigm-ink-soft, #4B5563)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>御社</th>
            <th style={{ textAlign: "right", padding: "10px 8px", fontWeight: 600, color: "var(--paradigm-ink-soft, #4B5563)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>業界中央値</th>
            <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 600, color: "var(--paradigm-ink-soft, #4B5563)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>差分</th>
          </tr>
        </thead>
        <tbody>
          {benchmarks.map((b, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid var(--paradigm-rule, rgba(0,0,0,0.06))" }}>
              <td style={{ padding: "12px 8px", color: "var(--paradigm-ink, #111827)", fontWeight: 500 }}>
                {b.metricLabel}
              </td>
              <td
                style={{
                  padding: "12px 8px",
                  textAlign: "right",
                  color: "var(--paradigm-accent, #4F46E5)",
                  fontWeight: 600,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {b.yourValue.value}
                <SourceBadge label={b.yourValue.sourceLabel} url={b.yourValue.sourceUrl} fetchedAt={b.yourValue.fetchedAt} />
              </td>
              <td
                style={{
                  padding: "12px 8px",
                  textAlign: "right",
                  color: "var(--paradigm-ink-soft, #6B7280)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {b.industryMedian.value}
                <SourceBadge label={b.industryMedian.sourceLabel} url={b.industryMedian.sourceUrl} fetchedAt={b.industryMedian.fetchedAt} />
              </td>
              <td style={{ padding: "12px 8px", color: "var(--paradigm-ink-soft, #4B5563)", fontSize: 13 }}>
                {b.delta ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </NarrativeSection>
  )
}
