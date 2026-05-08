// ─── KarteCover — 表紙 (D-12 v1.0.0) ────────────────────────────
// 主治医カルテ型診断レポートの表紙. カルテ番号 + 御社名 + 診察日 + 担当医.
//
// 永久ルール準拠:
//   - A-CONTENT: 全 visible string は props 経由 (block 内文字列リテラル ZERO)
//   - 色 / font / radius は CSS 変数 (--paradigm-*) のみ. ThemeProvider が DB 値を inject
//   - Tailwind 色クラス禁止 (bg-red-* / text-blue-* 等)
//
// ──────────────────────────────────────────────────────────────────

import type { KarteCoverProps } from "../../types"

export function KarteCoverBlock({
  chartNo,
  customerName,
  examinationDate,
  brandVoice,
  labels,
}: KarteCoverProps) {
  return (
    <section
      style={{
        background: "var(--paradigm-hero-bg)",
        color: "rgb(var(--paradigm-ink))",
        borderBottom: "1px solid rgb(var(--paradigm-line))",
      }}
      className="px-6 py-16 md:py-24"
    >
      <div className="max-w-3xl mx-auto">
        {/* clinic name (eyebrow) */}
        <div
          style={{
            color: "rgb(var(--paradigm-accent))",
            fontFamily: "var(--paradigm-font-mono)",
            letterSpacing: "0.18em",
          }}
          className="text-xs uppercase font-semibold mb-6"
        >
          {brandVoice.clinicName}
        </div>

        {/* section title (DB labels) */}
        <h1
          style={{
            color: "rgb(var(--paradigm-ink))",
            fontFamily: "var(--paradigm-font-display)",
            letterSpacing: "-0.02em",
          }}
          className="text-4xl md:text-5xl font-bold mb-2"
        >
          {labels["section.cover"]}
        </h1>

        {/* greeting */}
        <p
          style={{ color: "rgb(var(--paradigm-ink-soft))" }}
          className="text-base md:text-lg mb-12"
        >
          {brandVoice.greeting}
        </p>

        {/* customer name + examination meta (3-row grid) */}
        <div
          style={{
            background: "rgb(var(--paradigm-paper-card))",
            border: "1px solid rgb(var(--paradigm-line))",
            borderRadius: "var(--paradigm-radius-card)",
          }}
          className="px-6 py-8 md:px-10 md:py-10"
        >
          {/* customer name (大書き) */}
          <div
            style={{
              color: "rgb(var(--paradigm-ink))",
              fontFamily: "var(--paradigm-font-display)",
            }}
            className="text-2xl md:text-3xl font-bold mb-8"
          >
            {customerName}
          </div>

          {/* meta rows */}
          <dl className="grid grid-cols-3 gap-4 md:gap-8 text-sm">
            <div>
              <dt
                style={{ color: "rgb(var(--paradigm-ink-mute))" }}
                className="text-[11px] uppercase tracking-wider mb-1.5 font-semibold"
              >
                {labels["label.chart_no"]}
              </dt>
              <dd
                style={{
                  color: "rgb(var(--paradigm-ink))",
                  fontFamily: "var(--paradigm-font-mono)",
                }}
                className="font-medium"
              >
                {chartNo}
              </dd>
            </div>
            <div>
              <dt
                style={{ color: "rgb(var(--paradigm-ink-mute))" }}
                className="text-[11px] uppercase tracking-wider mb-1.5 font-semibold"
              >
                {labels["label.examination_date"]}
              </dt>
              <dd
                style={{
                  color: "rgb(var(--paradigm-ink))",
                  fontFamily: "var(--paradigm-font-mono)",
                }}
                className="font-medium"
              >
                {examinationDate}
              </dd>
            </div>
            <div>
              <dt
                style={{ color: "rgb(var(--paradigm-ink-mute))" }}
                className="text-[11px] uppercase tracking-wider mb-1.5 font-semibold"
              >
                {labels["label.attending_doctor"]}
              </dt>
              <dd
                style={{ color: "rgb(var(--paradigm-ink))" }}
                className="font-medium"
              >
                {brandVoice.doctorSignature}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
