// ─── IndustryChart Block (P39 Batch 2) ─────────────────────────────
// 業種ベンチマーク chart — 自社値 vs 業種中央値 vs 上位 10% を 3-bar grouped で表示.
// SSR-safe (recharts は client-only のため CSS bar で自前実装).

import type { IndustryChartProps } from "../types"

function pctOfMax(v: number, max: number): number {
  if (max <= 0) return 0
  return Math.min(100, Math.round((v / max) * 100))
}

export function IndustryChartBlock({ heading, subheading, rows, rankingNote }: IndustryChartProps) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {heading && <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>}
        {subheading && <p className="mt-2 text-text-secondary">{subheading}</p>}

        <div className="mt-8 space-y-6">
          {rows.map((row, idx) => {
            const max = Math.max(row.yourValue, row.industryMedian, row.industryTop10 ?? 0)
            const yourBetter =
              row.direction === "lower_is_better"
                ? row.yourValue < row.industryMedian
                : row.yourValue > row.industryMedian

            return (
              <div key={idx} className="rounded-xl border border-black/5 bg-white p-5">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="font-semibold">{row.metric}</div>
                  <div className={`text-sm font-medium ${yourBetter ? "text-emerald-600" : "text-red-600"}`}>
                    {yourBetter ? "▲ 業界平均より優位" : "▼ 業界平均を下回る"}
                  </div>
                </div>

                {/* 3 bars: 自社 / 業界中央値 / 上位 10% */}
                <div className="mt-4 space-y-2">
                  <BarRow
                    label="自社"
                    value={row.yourValue}
                    unit={row.unit}
                    pct={pctOfMax(row.yourValue, max)}
                    color={yourBetter ? "bg-emerald-500" : "bg-red-500"}
                  />
                  <BarRow
                    label="業界中央値"
                    value={row.industryMedian}
                    unit={row.unit}
                    pct={pctOfMax(row.industryMedian, max)}
                    color="bg-slate-400"
                  />
                  {row.industryTop10 !== undefined && (
                    <BarRow
                      label="上位 10%"
                      value={row.industryTop10}
                      unit={row.unit}
                      pct={pctOfMax(row.industryTop10, max)}
                      color="bg-indigo-500"
                    />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {rankingNote && (
          <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
            {rankingNote}
          </div>
        )}
      </div>
    </section>
  )
}

function BarRow({ label, value, unit, pct, color }: { label: string; value: number; unit: string; pct: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-24 text-xs text-text-secondary">{label}</div>
      <div className="flex-1 h-7 rounded-md bg-slate-100 overflow-hidden">
        <div className={`h-full ${color} transition-[width] duration-700`} style={{ width: `${pct}%` }} />
      </div>
      <div className="w-28 text-right text-sm font-mono">
        {value.toLocaleString()} {unit}
      </div>
    </div>
  )
}
