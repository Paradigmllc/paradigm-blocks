// ─── TopPainsList Block (P39) ──────────────────────────────────────
// 痛み上位 5 を AnimatedList で順次出現させる。
// severity 別の配色 + 出典バッジ。

"use client"

import { AnimatedList } from "../_magicui/animated-list"
import { BorderBeam } from "../_magicui/border-beam"
import type { TopPainsListProps } from "../types"

const SEVERITY_STYLE: Record<string, { ring: string; pill: string; label: string }> = {
  critical: { ring: "border-rose-300", pill: "bg-rose-100 text-rose-700", label: "緊急" },
  high: { ring: "border-orange-300", pill: "bg-orange-100 text-orange-700", label: "高" },
  medium: { ring: "border-amber-300", pill: "bg-amber-100 text-amber-700", label: "中" },
  low: { ring: "border-sky-300", pill: "bg-sky-100 text-sky-700", label: "低" },
  info: { ring: "border-slate-300", pill: "bg-slate-100 text-slate-700", label: "参考" },
}

function fmtJpy(n: number): string {
  if (n >= 10_000_000) return `¥${(n / 10_000_000).toFixed(1)}千万`
  if (n >= 10_000) return `¥${(n / 10_000).toFixed(0)}万`
  return `¥${n.toLocaleString()}`
}

export function TopPainsListBlock({ heading = "痛みポイント Top 5", pains }: TopPainsListProps) {
  const sorted = [...pains].sort((a, b) => a.rank - b.rank).slice(0, 5)

  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">{heading}</h2>
        <AnimatedList delay={0.12} className="space-y-3">
          {sorted.map((pain) => {
            const style = SEVERITY_STYLE[pain.severity] ?? SEVERITY_STYLE.medium
            return (
              <div
                key={pain.rank}
                className={`relative rounded-2xl bg-white border ${style.ring} p-5 shadow-sm hover:shadow-md transition`}
              >
                {pain.severity === "critical" && (
                  <BorderBeam size={150} duration={10} colorFrom="#f43f5e" colorTo="#fb923c" />
                )}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-900 text-white font-bold text-lg flex items-center justify-center">
                    #{pain.rank}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-lg font-semibold text-slate-900">{pain.title}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${style.pill}`}>
                        {style.label}
                      </span>
                      {pain.estimatedAnnualLossJpy !== undefined && (
                        <span className="text-xs text-rose-600 font-semibold">
                          年 {fmtJpy(pain.estimatedAnnualLossJpy)} 損失
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{pain.description}</p>
                    {pain.sources && pain.sources.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {pain.sources.filter((s) => s.used).map((s, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-50 text-slate-500 border border-slate-200">
                            {s.source}
                          </span>
                        ))}
                        {pain.sources.length > 1 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-200">
                            🔀 {pain.sources.length}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </AnimatedList>
      </div>
    </section>
  )
}
