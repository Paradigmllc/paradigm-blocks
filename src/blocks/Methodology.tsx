// ─── Methodology (R2 v0.5.0 2026-05-08) ───────────────────────────
// データソース一覧 + 測定日 + confidence + limitations.
// Research grade の命. 「何をどう測ったか」を完全開示する.

import type { MethodologyProps } from "../types"
import { NarrativeSection, NarrativeEyebrow, NarrativeBody, ConfidenceBadge } from "./_narrative-shared"

export function MethodologyBlock({
  heading,
  summary,
  dataSources,
  limitations,
}: MethodologyProps) {
  return (
    <NarrativeSection variant="quiet" ariaLabel="調査方法とデータソース">
      <NarrativeEyebrow>Methodology</NarrativeEyebrow>

      <h2
        style={{
          fontFamily: "var(--paradigm-font-display, 'Noto Serif JP', serif)",
          fontSize: 24,
          fontWeight: 600,
          color: "var(--paradigm-ink, #111827)",
          margin: "0 0 16px 0",
        }}
      >
        {heading ?? "調査方法とデータソース"}
      </h2>

      {summary && (
        <NarrativeBody size="md" style={{ marginBottom: 24, color: "var(--paradigm-ink-soft, #4B5563)" }}>
          {summary}
        </NarrativeBody>
      )}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 13,
          marginBottom: limitations && limitations.length > 0 ? 24 : 0,
        }}
      >
        <thead>
          <tr style={{ borderBottom: "2px solid var(--paradigm-rule, rgba(0,0,0,0.12))" }}>
            <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 600, color: "var(--paradigm-ink-soft, #4B5563)" }}>ソース</th>
            <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 600, color: "var(--paradigm-ink-soft, #4B5563)" }}>測定対象</th>
            <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 600, color: "var(--paradigm-ink-soft, #4B5563)" }}>取得日</th>
            <th style={{ textAlign: "left", padding: "10px 8px", fontWeight: 600, color: "var(--paradigm-ink-soft, #4B5563)" }}>信頼度</th>
          </tr>
        </thead>
        <tbody>
          {dataSources.map((s, idx) => (
            <tr
              key={idx}
              style={{
                borderBottom: "1px solid var(--paradigm-rule, rgba(0,0,0,0.06))",
              }}
            >
              <td style={{ padding: "10px 8px", color: "var(--paradigm-ink, #111827)", fontWeight: 500 }}>
                {s.name}
                {s.method && (
                  <span style={{ marginLeft: 6, fontSize: 11, color: "var(--paradigm-ink-soft, #6B7280)", fontWeight: 400 }}>
                    ({s.method})
                  </span>
                )}
              </td>
              <td style={{ padding: "10px 8px", color: "var(--paradigm-ink-soft, #4B5563)" }}>{s.measured}</td>
              <td style={{ padding: "10px 8px", color: "var(--paradigm-ink-soft, #6B7280)", fontVariantNumeric: "tabular-nums" }}>
                {s.fetchedAt}
              </td>
              <td style={{ padding: "10px 8px" }}>
                <ConfidenceBadge level={s.confidence} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {limitations && limitations.length > 0 && (
        <div
          style={{
            padding: "16px 20px",
            background: "var(--paradigm-paper-bg-soft, rgba(0,0,0,0.02))",
            borderRadius: 6,
            fontSize: 12,
            color: "var(--paradigm-ink-soft, #6B7280)",
            lineHeight: 1.6,
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 6, color: "var(--paradigm-ink-soft, #4B5563)" }}>
            限界・前提条件
          </div>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {limitations.map((l, idx) => (
              <li key={idx} style={{ marginBottom: 4 }}>{l}</li>
            ))}
          </ul>
        </div>
      )}
    </NarrativeSection>
  )
}
