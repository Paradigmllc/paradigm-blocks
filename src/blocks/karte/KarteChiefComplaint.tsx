// ─── KarteChiefComplaint — 主訴 (D-12 v1.0.0) ────────────────────
// 上位 3 件の痛み (KartePainItem) + Dify narrative intro.
// card_grid layout. severity に応じた強調は CSS 変数の累進色のみ.
// ──────────────────────────────────────────────────────────────────

import type { KarteChiefComplaintProps } from "../../types"

const SEVERITY_OPACITY: Record<1 | 2 | 3 | 4 | 5, number> = {
  1: 0.35, 2: 0.50, 3: 0.70, 4: 0.85, 5: 1.0,
}

export function KarteChiefComplaintBlock({
  heading,
  subheading,
  narrativeIntro,
  pains,
  labels,
}: KarteChiefComplaintProps) {
  return (
    <section
      style={{
        background: "rgb(var(--paradigm-paper))",
        color: "rgb(var(--paradigm-ink))",
      }}
      className="px-6 py-16 md:py-20"
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

        {/* narrative intro (Dify) */}
        {narrativeIntro && (
          <p
            style={{
              color: "rgb(var(--paradigm-ink-soft))",
              fontFamily: "var(--paradigm-font-display)",
              lineHeight: 1.8,
            }}
            className="text-base md:text-lg mb-10 italic"
          >
            {narrativeIntro}
          </p>
        )}

        {/* pain cards (max 3) */}
        <div className="space-y-4">
          {pains.map((pain, idx) => (
            <article
              key={pain.painId}
              style={{
                background: "rgb(var(--paradigm-paper-card))",
                border: "1px solid rgb(var(--paradigm-line))",
                borderRadius: "var(--paradigm-radius-card)",
              }}
              className="px-6 py-6 md:px-8 md:py-7"
            >
              {/* row: index + severity dot + title */}
              <header className="flex items-baseline gap-3 mb-3">
                <span
                  style={{
                    color: "rgb(var(--paradigm-ink-mute))",
                    fontFamily: "var(--paradigm-font-mono)",
                  }}
                  className="text-xs font-semibold tabular-nums"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden
                  style={{
                    background: `rgb(var(--paradigm-tech) / ${SEVERITY_OPACITY[pain.severityRank]})`,
                  }}
                  className="inline-block w-2 h-2 rounded-full"
                />
                <h3
                  style={{ color: "rgb(var(--paradigm-ink))" }}
                  className="text-lg md:text-xl font-bold leading-tight"
                >
                  {pain.title}
                </h3>
              </header>

              {/* description */}
              <p
                style={{
                  color: "rgb(var(--paradigm-ink-soft))",
                  lineHeight: 1.7,
                }}
                className="text-sm md:text-base mb-4"
              >
                {pain.description}
              </p>

              {/* evidence row */}
              <footer
                style={{
                  borderTop: "1px solid rgb(var(--paradigm-line))",
                  color: "rgb(var(--paradigm-ink-mute))",
                }}
                className="pt-3 flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span
                    style={{ fontFamily: "var(--paradigm-font-mono)" }}
                    className="uppercase tracking-wider font-semibold"
                  >
                    {labels["label.evidence"]}
                  </span>
                  <span style={{ color: "rgb(var(--paradigm-ink))" }} className="font-medium">
                    {pain.evidence}
                  </span>
                </div>
                <span style={{ fontFamily: "var(--paradigm-font-mono)" }}>
                  {pain.sourceLabel}
                </span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
