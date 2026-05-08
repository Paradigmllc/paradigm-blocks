// ─── KarteDiagnosis — 診断 (D-12 v1.0.0) ─────────────────────────
// Dify narrative (diagnosis slot・200-400 chars) を主軸にした 1 段落 prose.
// primaryFinding は冒頭に大きめで掲示 (composer が抽出 or DB).
// ──────────────────────────────────────────────────────────────────

import type { KarteDiagnosisProps } from "../../types"

export function KarteDiagnosisBlock({
  heading,
  subheading,
  narrativeProse,
  primaryFinding,
}: KarteDiagnosisProps) {
  return (
    <section
      style={{
        background: "rgb(var(--paradigm-paper))",
        color: "rgb(var(--paradigm-ink))",
        borderTop: "1px solid rgb(var(--paradigm-line))",
        borderBottom: "1px solid rgb(var(--paradigm-line))",
      }}
      className="px-6 py-16 md:py-24"
    >
      <div className="max-w-3xl mx-auto">
        {/* section heading */}
        <div className="mb-10">
          <h2
            style={{
              color: "rgb(var(--paradigm-ink))",
              fontFamily: "var(--paradigm-font-display)",
              borderLeft: "3px solid rgb(var(--paradigm-accent))",
            }}
            className="text-2xl md:text-3xl font-bold pl-4 mb-2"
          >
            {heading}
          </h2>
          {subheading && (
            <p
              style={{ color: "rgb(var(--paradigm-ink-soft))" }}
              className="text-sm md:text-base pl-4"
            >
              {subheading}
            </p>
          )}
        </div>

        {/* primary finding (大書き) */}
        {primaryFinding && (
          <blockquote
            style={{
              color: "rgb(var(--paradigm-ink))",
              fontFamily: "var(--paradigm-font-display)",
              borderLeft: "3px solid rgb(var(--paradigm-glow))",
              background: "rgb(var(--paradigm-accent-soft))",
            }}
            className="text-xl md:text-2xl font-semibold pl-6 pr-4 py-5 mb-10 leading-relaxed"
          >
            {primaryFinding}
          </blockquote>
        )}

        {/* Dify narrative prose */}
        <p
          style={{
            color: "rgb(var(--paradigm-ink-soft))",
            lineHeight: 1.9,
          }}
          className="text-base md:text-lg"
        >
          {narrativeProse}
        </p>
      </div>
    </section>
  )
}
