// ─── FooterContinuity (D-10 2026-05-08) ──────────────────────────────────
// CAN-SPAM 互換 footer + 主治医継続バッジ.
// 旧 footer_signature を進化させ、月次定期健診の永続関係性を可視化.
//
// SALES-CENTER 4 ④ (主治医ポジション・月次定期健診で chunk 防止) と整合.

import type { FooterContinuityProps } from "../types"
import { NarrativeSection } from "./_narrative-shared"

export function FooterContinuityBlock({
  signatureLine,
  physicalAddress,
  corporateNumber,
  optOutUrl,
  contactEmail,
  contactPhone,
  nextCheckMonth,
  continuityMessage,
  legalNote,
}: FooterContinuityProps) {
  return (
    <NarrativeSection variant="quiet" ariaLabel="法令準拠 footer">
      {/* 主治医継続バッジ */}
      <div
        style={{
          padding: "16px 24px",
          background: "var(--paradigm-continuity-bg, rgba(0,0,0,0.03))",
          border: "1px dashed var(--paradigm-rule, rgba(0,0,0,0.15))",
          borderRadius: 10,
          marginBottom: 28,
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 24 }} aria-hidden>
          🩺
        </span>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--paradigm-ink-soft, #6B7280)",
              marginBottom: 4,
            }}
          >
            次回月次健診
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "var(--paradigm-ink, #111827)",
            }}
          >
            {formatNextCheckMonth(nextCheckMonth)}
          </div>
          {continuityMessage && (
            <div
              style={{
                fontSize: 13,
                color: "var(--paradigm-ink-soft, #4B5563)",
                marginTop: 4,
                lineHeight: 1.5,
              }}
            >
              {continuityMessage}
            </div>
          )}
        </div>
      </div>

      {/* 法人情報 */}
      <div
        style={{
          fontSize: 12,
          lineHeight: 1.7,
          color: "var(--paradigm-ink-soft, #4B5563)",
          marginBottom: 20,
        }}
      >
        <div style={{ fontWeight: 700, color: "var(--paradigm-ink, #111827)", marginBottom: 4 }}>
          {signatureLine}
        </div>
        <div>{physicalAddress}</div>
        {corporateNumber && <div>法人番号: {corporateNumber}</div>}
        <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 16 }}>
          {contactEmail && (
            <a
              href={`mailto:${contactEmail}`}
              style={{ color: "var(--paradigm-accent, #4F46E5)", textDecoration: "none" }}
            >
              {contactEmail}
            </a>
          )}
          {contactPhone && (
            <a
              href={`tel:${contactPhone}`}
              style={{ color: "var(--paradigm-accent, #4F46E5)", textDecoration: "none" }}
            >
              {contactPhone}
            </a>
          )}
          {optOutUrl && (
            <a
              href={optOutUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--paradigm-ink-muted, #9CA3AF)",
                textDecoration: "underline",
              }}
            >
              配信停止
            </a>
          )}
        </div>
      </div>

      {/* 法令注釈 */}
      <p
        style={{
          fontSize: 11,
          lineHeight: 1.6,
          color: "var(--paradigm-ink-muted, #9CA3AF)",
          margin: 0,
        }}
      >
        {legalNote}
      </p>
    </NarrativeSection>
  )
}

/** "2026-06" → "2026 年 6 月" 形式に整形 (locale-agnostic な数字 fallback で安全) */
function formatNextCheckMonth(yyyyMM: string): string {
  const m = yyyyMM.match(/^(\d{4})-(\d{1,2})$/)
  if (!m) return yyyyMM
  const year = m[1]
  const month = String(Number(m[2]))
  return `${year} 年 ${month} 月`
}
