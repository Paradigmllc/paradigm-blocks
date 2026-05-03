// ─── ExecutiveSummary Block (P39 / Sales Material P.1) ─────────────
// 顧客名 + サマリ + key 数値 (3 つまで) を scroll-trigger TextReveal で表示。
// 営業資料の最初に配置 (松竹梅 比較の前) — 「あなた専用の改善計画」体験を演出。

"use client"

import { motion } from "framer-motion"
import { NumberTicker } from "../_magicui/number-ticker"
import { Sparkles } from "../_magicui/sparkles"
import type { ExecutiveSummaryProps } from "../types"

export function ExecutiveSummaryBlock({
  customerName,
  summary,
  keyMetrics,
  signature,
}: ExecutiveSummaryProps) {
  return (
    <section className="relative py-16 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600 mb-3">
            Executive Summary
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
            <span className="relative inline-block">
              <Sparkles className="absolute -inset-2" />
              {customerName}
            </span>
            <span className="text-slate-500"> 様専用</span>
            <br />
            改善計画書
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed max-w-3xl">
            {summary}
          </p>

          {keyMetrics && keyMetrics.length > 0 && (
            <div className="grid sm:grid-cols-3 gap-4 mt-10">
              {keyMetrics.slice(0, 3).map((m, i) => {
                const numericValue = parseFloat(m.value.replace(/[^0-9.-]/g, ""))
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm"
                  >
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">{m.label}</p>
                    <p className="text-3xl font-bold text-slate-900">
                      {Number.isFinite(numericValue) ? <NumberTicker value={numericValue} /> : m.value}
                    </p>
                    {m.trend && (
                      <p
                        className={`text-xs font-semibold mt-1 ${
                          m.trend.startsWith("+") ? "text-emerald-600" : m.trend.startsWith("-") ? "text-rose-600" : "text-slate-500"
                        }`}
                      >
                        {m.trend}
                      </p>
                    )}
                  </motion.div>
                )
              })}
            </div>
          )}

          {signature && (
            <p className="mt-12 text-sm text-slate-500 italic">— {signature}</p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
