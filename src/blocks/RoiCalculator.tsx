// ─── RoiCalculator Block (P39 / Sales Material) ───────────────────
// interactive ROI 計算機。投資額 + monthly recovery を NumberTicker で表示。
// 1 年後・3 年後の累積回収 + payback months + assumptions (透明性) を表示。

"use client"

import { motion } from "framer-motion"
import { NumberTicker } from "../_magicui/number-ticker"
import { ShimmerButton } from "../_magicui/shimmer-button"
import { Sparkles } from "../_magicui/sparkles"
import type { RoiCalculatorProps } from "../types"

function fmtJpy(n: number): string {
  if (n >= 100_000_000) return `¥${(n / 100_000_000).toFixed(1)}億`
  if (n >= 10_000_000) return `¥${(n / 10_000_000).toFixed(1)}千万`
  if (n >= 10_000) return `¥${(n / 10_000).toFixed(0)}万`
  return `¥${n.toLocaleString()}`
}

export function RoiCalculatorBlock({
  heading = "ROI 試算",
  investmentJpy,
  monthlyRecoveryJpy,
  paybackMonths,
  projections,
  assumptions,
  ctaLabel,
  ctaUrl,
}: RoiCalculatorProps) {
  const computedPayback = paybackMonths ?? (monthlyRecoveryJpy > 0 ? Math.ceil(investmentJpy / monthlyRecoveryJpy) : null)
  const year1 = projections?.year1 ?? monthlyRecoveryJpy * 12 - investmentJpy
  const year3 = projections?.year3 ?? monthlyRecoveryJpy * 36 - investmentJpy

  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-emerald-50 border border-slate-200 p-8 overflow-hidden shadow-lg">
          <Sparkles className="absolute top-6 right-6 w-24 h-24 opacity-50" />
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{heading}</h2>
          <p className="text-sm text-slate-500 mb-6">投資 vs 回収のシミュレーション</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* 投資額 */}
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl bg-white border border-slate-200 p-5">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">投資額</p>
              <p className="text-2xl font-bold text-slate-700">
                <NumberTicker value={Math.round(investmentJpy)} className="text-slate-700" />
              </p>
              <p className="text-[10px] text-slate-400 mt-1">{fmtJpy(investmentJpy)}</p>
            </motion.div>

            {/* 月額回復 */}
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-2xl bg-white border border-emerald-200 p-5">
              <p className="text-xs text-emerald-700 uppercase tracking-wide mb-2">月額回復</p>
              <p className="text-2xl font-bold text-emerald-600">
                <NumberTicker value={Math.round(monthlyRecoveryJpy)} className="text-emerald-600" />
              </p>
              <p className="text-[10px] text-emerald-500 mt-1">{fmtJpy(monthlyRecoveryJpy)} / 月</p>
            </motion.div>

            {/* Payback */}
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="rounded-2xl bg-white border border-indigo-200 p-5">
              <p className="text-xs text-indigo-700 uppercase tracking-wide mb-2">Payback</p>
              <p className="text-2xl font-bold text-indigo-600">
                {computedPayback !== null ? <NumberTicker value={computedPayback} className="text-indigo-600" /> : "—"}
              </p>
              <p className="text-[10px] text-indigo-500 mt-1">ヶ月で回収</p>
            </motion.div>

            {/* 3 年累積 */}
            <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="rounded-2xl bg-emerald-50 border border-emerald-300 p-5">
              <p className="text-xs text-emerald-700 uppercase tracking-wide mb-2">3 年累積純益</p>
              <p className="text-2xl font-bold text-emerald-700">
                <NumberTicker value={Math.round(year3)} className="text-emerald-700" />
              </p>
              <p className="text-[10px] text-emerald-600 mt-1">{fmtJpy(year3)}</p>
            </motion.div>
          </div>

          {/* Year 1 vs Year 3 比較 */}
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            <div className="rounded-xl bg-white/60 border border-slate-200 p-4">
              <p className="text-xs text-slate-500">1 年後 純益</p>
              <p className="text-xl font-bold text-slate-900 mt-1">{fmtJpy(year1)}</p>
            </div>
            <div className="rounded-xl bg-white/60 border border-slate-200 p-4">
              <p className="text-xs text-slate-500">3 年後 純益</p>
              <p className="text-xl font-bold text-emerald-700 mt-1">{fmtJpy(year3)}</p>
            </div>
          </div>

          {/* 計算根拠 (透明性) */}
          {assumptions && assumptions.length > 0 && (
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 mb-6">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-2">計算根拠</p>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                {assumptions.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}

          {ctaLabel && ctaUrl && (
            <div className="flex justify-center">
              <ShimmerButton onClick={() => { window.location.href = ctaUrl }}>
                <span className="text-sm font-semibold text-white">{ctaLabel}</span>
              </ShimmerButton>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
