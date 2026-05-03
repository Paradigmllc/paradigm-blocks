// ─── Roadmap Block (P39 / Sales Material) ─────────────────────────
// 90 日 (12 週) Timeline + AnimatedList で順次出現。
// status 別配色 (scheduled / in_progress / completed) + 進行中なら BorderBeam。

"use client"

import { motion } from "framer-motion"
import { BorderBeam } from "../_magicui/border-beam"
import type { RoadmapProps } from "../types"

const STATUS_STYLE: Record<string, { dot: string; bg: string; label: string }> = {
  scheduled: { dot: "bg-slate-300", bg: "bg-slate-50 border-slate-200", label: "予定" },
  in_progress: { dot: "bg-indigo-500", bg: "bg-indigo-50 border-indigo-200", label: "進行中" },
  completed: { dot: "bg-emerald-500", bg: "bg-emerald-50 border-emerald-200", label: "完了" },
}

export function RoadmapBlock({ heading = "90日 実装ロードマップ", phases }: RoadmapProps) {
  const sorted = [...phases].sort((a, b) => a.week - b.week)
  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">{heading}</h2>
        <p className="text-sm text-slate-500 mb-8">Week ごとのマイルストーンと成果物</p>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-200 via-slate-200 to-slate-100" />

          <div className="space-y-6">
            {sorted.map((p, i) => {
              const style = STATUS_STYLE[p.status ?? "scheduled"] ?? STATUS_STYLE.scheduled
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative pl-16"
                >
                  {/* Dot */}
                  <div className={`absolute left-4 top-3 w-4 h-4 rounded-full ${style.dot} ring-4 ring-white shadow`} />
                  {/* Card */}
                  <div className={`relative rounded-2xl border ${style.bg} p-5`}>
                    {p.status === "in_progress" && (
                      <BorderBeam size={150} duration={10} colorFrom="#6366f1" colorTo="#3b82f6" />
                    )}
                    <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                        Week {p.week}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${style.dot.replace("bg-", "bg-").replace("500", "100").replace("300", "200")} ${style.dot.replace("bg-", "text-").replace("100", "700")}`}>
                        {style.label}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{p.title}</h3>
                    <p className="text-sm text-slate-700 leading-relaxed mb-3">{p.description}</p>
                    {p.deliverables && p.deliverables.length > 0 && (
                      <ul className="text-sm text-slate-600 space-y-1">
                        {p.deliverables.map((d, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
