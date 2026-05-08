// ─── AppendixReferences (R2 v0.5.0 2026-05-08) ────────────────────
// 全 citation 一覧 + raw data link + 月次健診継続バッジ.
// Research grade の reproducibility — 顧客が我々の主張を再検証できる状態にする.

import type { AppendixReferencesProps } from "../types"
import { NarrativeSection, NarrativeEyebrow, NarrativeBody } from "./_narrative-shared"

export function AppendixReferencesBlock({
  heading,
  references,
  rawDataUrl,
  continuityBadge,
  legalNote,
}: AppendixReferencesProps) {
  return (
    <NarrativeSection variant="quiet" ariaLabel="付録と参照">
      <NarrativeEyebrow>Appendix &amp; References</NarrativeEyebrow>

      <h2
        style={{
          fontFamily: "var(--paradigm-font-display, 'Noto Serif JP', serif)",
          fontSize: 22,
          fontWeight: 600,
          color: "var(--paradigm-ink, #111827)",
          margin: "0 0 16px 0",
        }}
      >
        {heading ?? "参照ソース一覧"}
      </h2>

      <ol
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 24px 0",
          fontSize: 12,
          lineHeight: 1.7,
        }}
      >
        {references.map((r) => (
          <li
            key={r.index}
            id={`ref-${r.index}`}
            style={{
              padding: "8px 0",
              borderBottom: "1px solid var(--paradigm-rule, rgba(0,0,0,0.06))",
              color: "var(--paradigm-ink-soft, #4B5563)",
            }}
          >
            <span style={{ fontWeight: 600, color: "var(--paradigm-ink, #111827)", marginRight: 8 }}>
              [{r.index}]
            </span>
            {r.url ? (
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--paradigm-accent, #4F46E5)", textDecoration: "none" }}
              >
                {r.sourceName}
              </a>
            ) : (
              <span style={{ color: "var(--paradigm-ink, #111827)" }}>{r.sourceName}</span>
            )}
            <span style={{ marginLeft: 8, fontSize: 11, color: "var(--paradigm-ink-soft, #6B7280)", fontVariantNumeric: "tabular-nums" }}>
              取得: {r.fetchedAt}
            </span>
            {r.note && (
              <div style={{ marginTop: 4, fontSize: 11, color: "var(--paradigm-ink-soft, #6B7280)", paddingLeft: 24 }}>
                {r.note}
              </div>
            )}
          </li>
        ))}
      </ol>

      {rawDataUrl && (
        <div style={{ marginBottom: 20 }}>
          <a
            href={rawDataUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              border: "1px solid var(--paradigm-accent, #4F46E5)",
              color: "var(--paradigm-accent, #4F46E5)",
              fontSize: 12,
              fontWeight: 600,
              borderRadius: 4,
              textDecoration: "none",
            }}
          >
            ⤓ 生データを取得 (JSON)
          </a>
        </div>
      )}

      {continuityBadge && (
        <div
          style={{
            padding: "14px 18px",
            background: "var(--paradigm-accent-soft-bg, rgba(0,0,0,0.04))",
            borderRadius: 6,
            marginBottom: legalNote ? 16 : 0,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--paradigm-ink-soft, #6B7280)",
              marginBottom: 6,
            }}
          >
            継続診断
          </div>
          <NarrativeBody size="sm" style={{ color: "var(--paradigm-ink, #111827)" }}>
            次回 月次健診: <strong style={{ fontVariantNumeric: "tabular-nums" }}>{continuityBadge.nextCheckMonth}</strong>
            {continuityBadge.message && <span style={{ marginLeft: 8, color: "var(--paradigm-ink-soft, #4B5563)" }}>— {continuityBadge.message}</span>}
          </NarrativeBody>
        </div>
      )}

      {legalNote && (
        <div
          style={{
            fontSize: 10,
            color: "var(--paradigm-ink-soft, #9CA3AF)",
            lineHeight: 1.6,
            paddingTop: 12,
            borderTop: "1px solid var(--paradigm-rule, rgba(0,0,0,0.06))",
          }}
        >
          {legalNote}
        </div>
      )}
    </NarrativeSection>
  )
}
