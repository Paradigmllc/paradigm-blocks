// ─── TailoredOpening (D-10 2026-05-08) ────────────────────────────────────
// SCQA の Situation = "common ground" を確立する block.
// 「我々は御社のことを 1 時間調べました」を可視化する診療カルテ的 subjective ゾーン.
//
// 営業色ゼロで render する: 大きな見出しなし・装飾控えめ・観察 list は serif 風.
// 顧客が「うちのこと分かってる」と感じるのが成功 metrics.

import type { TailoredOpeningProps } from "../types"
import { NarrativeSection, NarrativeEyebrow, NarrativeBody, SourceBadge } from "./_narrative-shared"

export function TailoredOpeningBlock({ businessSummary, observations, title }: TailoredOpeningProps) {
  return (
    <NarrativeSection variant="subjective" ariaLabel="事業概観">
      <NarrativeEyebrow>{title ?? "事業概観"}</NarrativeEyebrow>

      {/* Business model summary — 1-2 文を大きめ serif 風で */}
      <NarrativeBody
        size="lg"
        style={{
          fontFamily: "var(--paradigm-font-narrative, var(--paradigm-font-display, 'Noto Serif JP', serif))",
          color: "var(--paradigm-ink, #111827)",
          marginBottom: 28,
        }}
      >
        {businessSummary}
      </NarrativeBody>

      {/* 観察 list — bullet ではなく "観察ポイント" として横並び (subjective tone) */}
      {observations.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {observations.map((obs, idx) => (
            <li
              key={idx}
              style={{
                padding: "10px 0",
                borderBottom:
                  idx === observations.length - 1
                    ? "none"
                    : "1px solid var(--paradigm-rule, rgba(0,0,0,0.08))",
                fontSize: 14,
                lineHeight: 1.6,
                color: "var(--paradigm-ink-soft, #4B5563)",
              }}
            >
              <span style={{ marginRight: 8, opacity: 0.5 }}>·</span>
              {obs.observation}
              <SourceBadge label={obs.sourceLabel} />
            </li>
          ))}
        </ul>
      )}
    </NarrativeSection>
  )
}
