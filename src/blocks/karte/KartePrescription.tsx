// ─── KartePrescription — 処方箋 (D-12 v1.0.0) ────────────────────
// timeline layout. 優先度 (priority) 昇順で配置.
// 各 item は title + actions[] + effortDays + expectedLiftRate (DB 由来).
// ──────────────────────────────────────────────────────────────────

import type { KartePrescriptionProps } from "../../types"

export function KartePrescriptionBlock({
  heading,
  subheading,
  narrativeRationale,
  items,
  labels,
}: KartePrescriptionProps) {
  return (
    <section
      style={{
        background: "rgb(var(--paradigm-paper-deep))",
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

        {/* rationale (Dify narrative) */}
        {narrativeRationale && (
          <p
            style={{
              color: "rgb(var(--paradigm-ink-soft))",
              fontFamily: "var(--paradigm-font-display)",
              lineHeight: 1.8,
            }}
            className="text-base md:text-lg mb-12 italic"
          >
            {narrativeRationale}
          </p>
        )}

        {/* timeline items */}
        <ol className="space-y-8 relative">
          {items.map((item, idx) => (
            <li key={item.painId} className="pl-12 relative">
              {/* timeline dot + line */}
              <div
                aria-hidden
                style={{
                  background: "rgb(var(--paradigm-accent))",
                  color: "rgb(var(--paradigm-paper))",
                  fontFamily: "var(--paradigm-font-mono)",
                }}
                className="absolute left-0 top-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold tabular-nums"
              >
                {item.priority}
              </div>
              {idx !== items.length - 1 && (
                <div
                  aria-hidden
                  style={{ background: "rgb(var(--paradigm-line))" }}
                  className="absolute left-[17px] top-9 w-px h-[calc(100%+2rem)]"
                />
              )}

              <article
                style={{
                  background: "rgb(var(--paradigm-paper-card))",
                  border: "1px solid rgb(var(--paradigm-line))",
                  borderRadius: "var(--paradigm-radius-card)",
                }}
                className="px-6 py-6"
              >
                <h3
                  style={{ color: "rgb(var(--paradigm-ink))" }}
                  className="text-lg md:text-xl font-bold mb-4"
                >
                  {item.title}
                </h3>

                <ul className="space-y-2 mb-5">
                  {item.actions.map((action, ai) => (
                    <li
                      key={ai}
                      style={{ color: "rgb(var(--paradigm-ink-soft))" }}
                      className="text-sm md:text-base flex gap-3 items-start"
                    >
                      <span
                        aria-hidden
                        style={{ color: "rgb(var(--paradigm-accent))" }}
                        className="font-bold mt-0.5"
                      >
                        ▸
                      </span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>

                <dl
                  style={{
                    borderTop: "1px solid rgb(var(--paradigm-line))",
                    color: "rgb(var(--paradigm-ink-mute))",
                  }}
                  className="pt-4 grid grid-cols-2 gap-4 text-xs"
                >
                  <div>
                    <dt
                      style={{ fontFamily: "var(--paradigm-font-mono)" }}
                      className="uppercase tracking-wider font-semibold mb-1"
                    >
                      {labels["label.effort_days"]}
                    </dt>
                    <dd
                      style={{
                        color: "rgb(var(--paradigm-ink))",
                        fontFamily: "var(--paradigm-font-mono)",
                      }}
                      className="text-base font-medium tabular-nums"
                    >
                      {item.effortDays} d
                    </dd>
                  </div>
                  <div>
                    <dt
                      style={{ fontFamily: "var(--paradigm-font-mono)" }}
                      className="uppercase tracking-wider font-semibold mb-1"
                    >
                      {labels["label.expected_lift"]}
                    </dt>
                    <dd
                      style={{
                        color: "rgb(var(--paradigm-glow))",
                        fontFamily: "var(--paradigm-font-mono)",
                      }}
                      className="text-base font-medium tabular-nums"
                    >
                      +{Math.round(item.expectedLiftRate * 100)} %
                    </dd>
                  </div>
                </dl>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
