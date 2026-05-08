// ─── KarteFollowUp — 経過観察 (D-12 v1.0.0) ──────────────────────
// 月次定期健診プログラムの案内. Dify narrative + nextCheckMonth + KPI 3 件.
// ──────────────────────────────────────────────────────────────────

import type { KarteFollowUpProps } from "../../types"

export function KarteFollowUpBlock({
  heading,
  subheading,
  narrativeStrategy,
  nextCheckMonth,
  rePmeasureKpis,
  labels,
}: KarteFollowUpProps) {
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

        {/* 2 column grid: narrative + next check card */}
        <div className="grid md:grid-cols-5 gap-6 md:gap-8">
          {/* narrative — 3 cols */}
          <div className="md:col-span-3">
            {narrativeStrategy && (
              <p
                style={{
                  color: "rgb(var(--paradigm-ink-soft))",
                  lineHeight: 1.85,
                }}
                className="text-base md:text-lg"
              >
                {narrativeStrategy}
              </p>
            )}
          </div>

          {/* next check + KPI card — 2 cols */}
          <aside
            style={{
              background: "rgb(var(--paradigm-paper-card))",
              border: "1px solid rgb(var(--paradigm-line))",
              borderRadius: "var(--paradigm-radius-card)",
            }}
            className="md:col-span-2 px-6 py-6"
          >
            {nextCheckMonth && (
              <div className="mb-5">
                <div
                  style={{
                    color: "rgb(var(--paradigm-ink-mute))",
                    fontFamily: "var(--paradigm-font-mono)",
                  }}
                  className="text-[10px] uppercase tracking-wider font-semibold mb-1.5"
                >
                  {labels["label.next_check"]}
                </div>
                <div
                  style={{
                    color: "rgb(var(--paradigm-accent))",
                    fontFamily: "var(--paradigm-font-display)",
                  }}
                  className="text-2xl md:text-3xl font-bold"
                >
                  {nextCheckMonth}
                </div>
              </div>
            )}

            {rePmeasureKpis && rePmeasureKpis.length > 0 && (
              <ul
                style={{
                  borderTop: nextCheckMonth ? "1px solid rgb(var(--paradigm-line))" : "none",
                }}
                className={nextCheckMonth ? "pt-4 space-y-2" : "space-y-2"}
              >
                {rePmeasureKpis.map((kpi, i) => (
                  <li
                    key={i}
                    style={{ color: "rgb(var(--paradigm-ink-soft))" }}
                    className="text-sm flex gap-2 items-start"
                  >
                    <span
                      aria-hidden
                      style={{
                        color: "rgb(var(--paradigm-glow))",
                        fontFamily: "var(--paradigm-font-mono)",
                      }}
                      className="font-bold mt-0.5"
                    >
                      ✓
                    </span>
                    <span>{kpi}</span>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}
