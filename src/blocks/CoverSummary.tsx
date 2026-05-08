// ─── CoverSummary (R2 v0.5.0 2026-05-08) ──────────────────────────
// 表紙 + TL;DR 3 finding. 旧 hero KPI (¥XX 損失) 廃止後の置換.
// 顧客が 30 秒で「何が分かったか」を把握する Executive Summary 型.

import type { CoverSummaryProps } from "../types"
import { NarrativeSection, NarrativeEyebrow, NarrativeBody, ConfidenceBadge, SourceBadge } from "./_narrative-shared"

export function CoverSummaryBlock({
  customerName,
  reportDate,
  leadConsultant,
  topFindings,
  continuityBadge,
  labels,
}: CoverSummaryProps) {
  // 全 label は composer が report_templates.block_labels から inject (Driver #1 #3).
  // ここの default は silently-JA-leak 防止のため意図的に英語. composer 側で必須提供.
  const eyebrow      = labels?.eyebrow      ?? "Executive Summary"
  const titleSuffix  = labels?.titleSuffix  ?? " — Web Health Report"
  const diagnosedOn  = labels?.diagnosedOn  ?? "Diagnosed on"
  const leadBy       = labels?.leadBy       ?? "Lead"
  const intro        = labels?.intro        ?? "Top 3 findings from this report:"
  return (
    <NarrativeSection variant="default" ariaLabel={eyebrow}>
      <NarrativeEyebrow>{eyebrow}</NarrativeEyebrow>

      <h1
        style={{
          fontFamily: "var(--paradigm-font-display, 'Noto Serif JP', serif)",
          fontSize: 32,
          fontWeight: 600,
          color: "var(--paradigm-ink, #111827)",
          margin: "0 0 8px 0",
          lineHeight: 1.3,
        }}
      >
        {customerName}{titleSuffix}
      </h1>

      <div
        style={{
          fontSize: 13,
          color: "var(--paradigm-ink-soft, #6B7280)",
          marginBottom: 32,
        }}
      >
        {diagnosedOn}: {reportDate} ／ {leadBy}: {leadConsultant}
        {continuityBadge && (
          <span style={{ marginLeft: 12, padding: "2px 8px", background: "var(--paradigm-accent-soft-bg, rgba(0,0,0,0.04))", borderRadius: 4 }}>
            {continuityBadge}
          </span>
        )}
      </div>

      <NarrativeBody size="md" style={{ marginBottom: 16, color: "var(--paradigm-ink-soft, #4B5563)" }}>
        {intro}
      </NarrativeBody>

      <ol style={{ listStyle: "none", padding: 0, margin: 0, counterReset: "finding" }}>
        {topFindings.map((f, idx) => (
          <li
            key={idx}
            style={{
              counterIncrement: "finding",
              padding: "16px 20px",
              marginBottom: 12,
              borderLeft: "3px solid var(--paradigm-accent, #4F46E5)",
              background: "var(--paradigm-paper-bg-soft, rgba(0,0,0,0.02))",
              borderRadius: "0 6px 6px 0",
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span
                style={{
                  fontFamily: "var(--paradigm-font-display, serif)",
                  fontSize: 22,
                  fontWeight: 600,
                  color: "var(--paradigm-accent, #4F46E5)",
                  minWidth: 28,
                }}
              >
                {idx + 1}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, lineHeight: 1.6, color: "var(--paradigm-ink, #111827)" }}>
                  {f.headline}
                  <ConfidenceBadge level={f.confidence} />
                  {f.primarySource && <SourceBadge label={f.primarySource} />}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </NarrativeSection>
  )
}
