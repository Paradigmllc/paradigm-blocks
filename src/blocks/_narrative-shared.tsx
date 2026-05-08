// ─── _narrative-shared (D-10 2026-05-08) — Narrative Block 共通 styling ─────
//
// 8 narrative block (TailoredOpening / SpecificInsight / ThreeCriticalIssues /
// TheQuestion / OurAnswer / ProofWithCredentials / FirstStep / FooterContinuity)
// で使う共通 visual primitives.
//
// 各 block の default render は CSS 変数 (var(--paradigm-*)) のみ参照し、
// ThemeProvider が theme-specific 値を注入する設計. これで raycast/stripe/reflect
// 等の theme 切替時に最低限の差別化 (色・font・余白) が自動的に効く.
//
// theme-specific layouts (Glean = enterprise authority / Family = warm story 等)
// は P2 sprint で各 block 個別に追加する (v0.5.0 予定).
// ──────────────────────────────────────────────────────────────────────────

import type { CSSProperties, ReactNode } from "react"

/** narrative block の共通 section wrapper (左右 padding + max-width 統一) */
export function NarrativeSection({
  children,
  variant = "default",
  ariaLabel,
}: {
  children: ReactNode
  /** subjective = 診療カルテ的 / assertive = 営業的 / quiet = footer 系 */
  variant?: "default" | "subjective" | "assertive" | "quiet"
  ariaLabel?: string
}) {
  const bg =
    variant === "subjective" ? "var(--paradigm-narrative-subjective-bg, rgba(0,0,0,0.02))" :
    variant === "assertive"  ? "var(--paradigm-narrative-assertive-bg, rgba(var(--paradigm-accent-rgb, 79, 70, 229), 0.04))" :
    variant === "quiet"      ? "var(--paradigm-narrative-quiet-bg, transparent)" :
                                "var(--paradigm-paper-bg, transparent)"
  return (
    <section
      aria-label={ariaLabel}
      style={{
        padding: "56px 24px",
        background: bg,
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>{children}</div>
    </section>
  )
}

/** narrative block の小見出し (eyebrow) — 各 block 上部に配置 */
export function NarrativeEyebrow({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--paradigm-ink-soft, #6B7280)",
        marginBottom: 16,
      }}
    >
      {children}
    </div>
  )
}

/** narrative block の本文 (subtle large body — Cormorant or Inter で render) */
export function NarrativeBody({
  children,
  size = "md",
  style,
}: {
  children: ReactNode
  size?: "sm" | "md" | "lg" | "xl"
  style?: CSSProperties
}) {
  const fontSize = { sm: 14, md: 16, lg: 19, xl: 22 }[size]
  return (
    <p
      style={{
        fontSize,
        lineHeight: 1.7,
        color: "var(--paradigm-ink, #111827)",
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  )
}

/** Source badge (B28 #12 出典可視化) — 数値の隣に小さく表示 */
export function SourceBadge({
  label,
  url,
  fetchedAt,
}: {
  label: string
  url?: string
  fetchedAt?: string
}) {
  const inner = (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        marginLeft: 8,
        padding: "2px 8px",
        background: "var(--paradigm-source-badge-bg, rgba(0,0,0,0.05))",
        color: "var(--paradigm-ink-soft, #6B7280)",
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.02em",
        borderRadius: 4,
        textDecoration: "none",
        verticalAlign: "middle",
      }}
      title={fetchedAt ? `取得: ${fetchedAt.slice(0, 10)}` : undefined}
    >
      {label}
    </span>
  )
  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
      {inner}
    </a>
  ) : (
    inner
  )
}
