// ─── ThreeCriticalIssues (D-10 2026-05-08) ────────────────────────────────
// 痛みを 3 つに narrative 圧縮した block.
// 各 issue は ① 数値根拠 ② "なぜ" ③ "もし放置すると" の 3 段構成.
// severity badge ([CRITICAL] 等) は廃止 — 数値が物語る.

import type { ThreeCriticalIssuesProps } from "../types"
import { NarrativeSection, NarrativeEyebrow, SourceBadge } from "./_narrative-shared"

export function ThreeCriticalIssuesBlock({ issues }: ThreeCriticalIssuesProps) {
  // 3 件 mode を保証 (LLM が 3 未満を生成した場合は表示するが警告 console)
  if (typeof window !== "undefined" && issues.length !== 3) {
    console.warn(
      `[ThreeCriticalIssues] expected 3 issues, got ${issues.length}. ` +
        `Narrative impact reduced — consider regenerating.`,
    )
  }

  return (
    <NarrativeSection variant="default" ariaLabel="重要課題 3 点">
      <NarrativeEyebrow>本診断で特定された重要課題</NarrativeEyebrow>

      <div style={{ display: "grid", gap: 20 }}>
        {issues.map((issue, idx) => (
          <article
            key={idx}
            style={{
              padding: "24px 28px",
              background: "var(--paradigm-card-bg, #FFFFFF)",
              border: "1px solid var(--paradigm-rule, rgba(0,0,0,0.10))",
              borderRadius: 12,
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            {/* index + title */}
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 16 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 32,
                  height: 32,
                  background: "var(--paradigm-issue-num-bg, rgba(0,0,0,0.05))",
                  color: "var(--paradigm-ink, #111827)",
                  fontWeight: 700,
                  fontSize: 14,
                  borderRadius: 8,
                  fontFamily:
                    "var(--paradigm-font-mono, 'JetBrains Mono', monospace)",
                }}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h3
                style={{
                  flex: 1,
                  fontSize: 19,
                  fontWeight: 700,
                  color: "var(--paradigm-ink, #111827)",
                  margin: 0,
                  lineHeight: 1.4,
                  letterSpacing: "-0.01em",
                }}
              >
                {issue.title}
              </h3>
            </div>

            {/* 現状の数値 */}
            <div
              style={{
                marginBottom: 14,
                padding: "10px 14px",
                background:
                  "var(--paradigm-issue-current-bg, rgba(220, 38, 38, 0.05))",
                borderRadius: 8,
                fontSize: 14,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--paradigm-ink-soft, #6B7280)",
                  marginRight: 12,
                }}
              >
                現状
              </span>
              <span
                style={{
                  fontWeight: 700,
                  color: "var(--paradigm-ink, #111827)",
                  fontFamily: "var(--paradigm-font-display, 'Inter', sans-serif)",
                }}
              >
                {issue.currentState.value}
              </span>
              <SourceBadge
                label={issue.currentState.sourceLabel}
                url={issue.currentState.sourceUrl}
              />
            </div>

            {/* なぜ */}
            <div style={{ marginBottom: 12 }}>
              <span style={labelStyle}>なぜ</span>
              <span style={textStyle}>{issue.rootCause}</span>
            </div>

            {/* 6 ヶ月後 */}
            <div>
              <span style={labelStyle}>6 ヶ月後の予兆</span>
              <span style={textStyle}>{issue.sixMonthForecast}</span>
            </div>
          </article>
        ))}
      </div>
    </NarrativeSection>
  )
}

const labelStyle = {
  display: "inline-block",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: "var(--paradigm-ink-soft, #6B7280)",
  marginRight: 12,
  minWidth: 110,
}

const textStyle = {
  fontSize: 14,
  lineHeight: 1.6,
  color: "var(--paradigm-ink, #111827)",
}
