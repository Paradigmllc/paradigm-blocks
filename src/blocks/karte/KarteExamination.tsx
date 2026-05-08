// ─── KarteExamination — 検査結果 (D-12 v1.0.0) ──────────────────
// 実測値テーブル. 数値は SourcedFact (B28 #12 出典可視化).
// judgment ("good" | "warning" | "critical") は CSS 変数の累進色で表現.
// ──────────────────────────────────────────────────────────────────

import type { KarteExaminationProps, KarteExaminationRow } from "../../types"

const JUDGMENT_OPACITY: Record<KarteExaminationRow["judgment"], number> = {
  good: 0.0,
  warning: 0.5,
  critical: 1.0,
}

export function KarteExaminationBlock({
  heading,
  subheading,
  rows,
  labels,
}: KarteExaminationProps) {
  return (
    <section
      style={{
        background: "rgb(var(--paradigm-paper-deep))",
        color: "rgb(var(--paradigm-ink))",
      }}
      className="px-6 py-16 md:py-20"
    >
      <div className="max-w-4xl mx-auto">
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

        {/* table — desktop */}
        <div
          style={{
            background: "rgb(var(--paradigm-paper-card))",
            border: "1px solid rgb(var(--paradigm-line))",
            borderRadius: "var(--paradigm-radius-card)",
          }}
          className="overflow-hidden"
        >
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  style={{
                    background: "rgb(var(--paradigm-paper-deep))",
                    color: "rgb(var(--paradigm-ink-mute))",
                    borderBottom: "1px solid rgb(var(--paradigm-line))",
                  }}
                >
                  <th
                    style={{ fontFamily: "var(--paradigm-font-mono)" }}
                    className="text-left text-[11px] uppercase tracking-wider font-semibold px-6 py-4"
                  >
                    {labels["label.evidence"]}
                  </th>
                  <th
                    style={{ fontFamily: "var(--paradigm-font-mono)" }}
                    className="text-right text-[11px] uppercase tracking-wider font-semibold px-6 py-4"
                  >
                    {labels["label.your_value"]}
                  </th>
                  <th
                    style={{ fontFamily: "var(--paradigm-font-mono)" }}
                    className="text-right text-[11px] uppercase tracking-wider font-semibold px-6 py-4"
                  >
                    {labels["label.industry_median"]}
                  </th>
                  <th
                    style={{ fontFamily: "var(--paradigm-font-mono)" }}
                    className="text-right text-[11px] uppercase tracking-wider font-semibold px-6 py-4"
                  >
                    {labels["label.delta"]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr
                    key={`${row.metric}-${idx}`}
                    style={{
                      borderTop: idx === 0 ? "none" : "1px solid rgb(var(--paradigm-line))",
                    }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <span
                          aria-hidden
                          style={{
                            background: `rgb(var(--paradigm-tech) / ${JUDGMENT_OPACITY[row.judgment]})`,
                          }}
                          className="inline-block w-1.5 h-1.5 rounded-full"
                        />
                        <span
                          style={{ color: "rgb(var(--paradigm-ink))" }}
                          className="font-medium"
                        >
                          {row.metric}
                        </span>
                        <span
                          style={{ color: "rgb(var(--paradigm-ink-mute))" }}
                          className="text-xs"
                        >
                          ({row.unit})
                        </span>
                      </div>
                    </td>
                    <td
                      style={{
                        color: "rgb(var(--paradigm-ink))",
                        fontFamily: "var(--paradigm-font-mono)",
                      }}
                      className="text-right tabular-nums px-6 py-4"
                    >
                      <div>{String(row.yourValue.value)}</div>
                      <div
                        style={{ color: "rgb(var(--paradigm-ink-mute))" }}
                        className="text-[10px] mt-0.5"
                      >
                        {row.yourValue.sourceLabel}
                      </div>
                    </td>
                    <td
                      style={{
                        color: "rgb(var(--paradigm-ink-soft))",
                        fontFamily: "var(--paradigm-font-mono)",
                      }}
                      className="text-right tabular-nums px-6 py-4"
                    >
                      <div>{String(row.industryMedian.value)}</div>
                      <div
                        style={{ color: "rgb(var(--paradigm-ink-mute))" }}
                        className="text-[10px] mt-0.5"
                      >
                        {row.industryMedian.sourceLabel}
                      </div>
                    </td>
                    <td
                      style={{
                        color: row.judgment === "critical"
                          ? "rgb(var(--paradigm-tech))"
                          : "rgb(var(--paradigm-ink-soft))",
                        fontFamily: "var(--paradigm-font-mono)",
                      }}
                      className="text-right tabular-nums px-6 py-4 font-medium"
                    >
                      {row.delta ?? "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* mobile — stacked cards */}
          <div className="md:hidden divide-y" style={{ borderColor: "rgb(var(--paradigm-line))" }}>
            {rows.map((row, idx) => (
              <div key={`m-${row.metric}-${idx}`} className="px-5 py-4">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    aria-hidden
                    style={{
                      background: `rgb(var(--paradigm-tech) / ${JUDGMENT_OPACITY[row.judgment]})`,
                    }}
                    className="inline-block w-1.5 h-1.5 rounded-full"
                  />
                  <span style={{ color: "rgb(var(--paradigm-ink))" }} className="font-semibold">
                    {row.metric}
                  </span>
                  <span style={{ color: "rgb(var(--paradigm-ink-mute))" }} className="text-xs">
                    ({row.unit})
                  </span>
                </div>
                <dl className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <dt style={{ color: "rgb(var(--paradigm-ink-mute))" }} className="text-[10px] uppercase tracking-wider mb-0.5">
                      {labels["label.your_value"]}
                    </dt>
                    <dd
                      style={{ color: "rgb(var(--paradigm-ink))", fontFamily: "var(--paradigm-font-mono)" }}
                      className="tabular-nums font-medium"
                    >
                      {String(row.yourValue.value)}
                    </dd>
                  </div>
                  <div>
                    <dt style={{ color: "rgb(var(--paradigm-ink-mute))" }} className="text-[10px] uppercase tracking-wider mb-0.5">
                      {labels["label.industry_median"]}
                    </dt>
                    <dd
                      style={{ color: "rgb(var(--paradigm-ink-soft))", fontFamily: "var(--paradigm-font-mono)" }}
                      className="tabular-nums"
                    >
                      {String(row.industryMedian.value)}
                    </dd>
                  </div>
                  <div>
                    <dt style={{ color: "rgb(var(--paradigm-ink-mute))" }} className="text-[10px] uppercase tracking-wider mb-0.5">
                      {labels["label.delta"]}
                    </dt>
                    <dd
                      style={{
                        color: row.judgment === "critical"
                          ? "rgb(var(--paradigm-tech))"
                          : "rgb(var(--paradigm-ink-soft))",
                        fontFamily: "var(--paradigm-font-mono)",
                      }}
                      className="tabular-nums font-medium"
                    >
                      {row.delta ?? "-"}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
