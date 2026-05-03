// ─── AnnualLossCard Block (P39) ────────────────────────────────────
// 年間機会損失額を NumberTicker で count-up 演出。
// Meteors 背景で「夜空に降る損失」のメタファー (loss-aversion variant 5 で映える)。
// 出典バッジ (B28 #12) inline 表示。

"use client"

import { NumberTicker } from "../_magicui/number-ticker"
import { Meteors } from "../_magicui/meteors"
import type { AnnualLossCardProps } from "../types"

function fmtCurrency(amount: number, symbol: string, currency: string): string {
  // JPY は千円単位で短縮 / それ以外は通貨記号 + 桁区切り
  if (currency === "JPY" && amount >= 10_000) {
    return `${symbol}${(amount / 10_000).toFixed(1)}万`
  }
  return `${symbol}${amount.toLocaleString()}`
}

export function AnnualLossCardBlock({
  annualLossJpy,
  currency = "JPY",
  currencySymbol = "¥",
  label = "年間機会損失額",
  monthlyEquivalent,
  breakdown,
  sources,
}: AnnualLossCardProps) {
  return (
    <section className="relative py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-10 shadow-2xl">
          <Meteors number={20} color="#ef4444" />
          <div className="relative z-10">
            <p className="text-sm font-medium text-rose-300 uppercase tracking-wider mb-2">
              {label}
            </p>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-6xl md:text-7xl font-bold text-white">
                <NumberTicker value={Math.round(annualLossJpy)} className="text-white" />
              </span>
              <span className="text-2xl text-rose-300 font-semibold">{currencySymbol}</span>
            </div>
            <p className="text-rose-200 text-lg mb-6">
              {fmtCurrency(annualLossJpy, currencySymbol, currency)} / 年
              {monthlyEquivalent !== undefined && (
                <span className="text-rose-300/80 text-sm ml-3">
                  (月額換算 {fmtCurrency(monthlyEquivalent, currencySymbol, currency)})
                </span>
              )}
            </p>

            {breakdown && breakdown.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
                {breakdown.map((b, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur rounded-lg p-3 border border-white/10">
                    <p className="text-xs text-rose-300/80 uppercase">{b.category}</p>
                    <p className="text-xl font-bold text-white mt-1">{fmtCurrency(b.amount, currencySymbol, currency)}</p>
                    <p className="text-[10px] text-rose-300/60">{b.percentage.toFixed(0)}%</p>
                  </div>
                ))}
              </div>
            )}

            {sources && sources.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-6">
                {sources.filter((s) => s.used).map((s, i) => (
                  <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-rose-200 border border-white/20">
                    {s.source}
                  </span>
                ))}
                {sources.length > 1 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-200 border border-indigo-300/20">
                    🔀 {sources.length} ソース統合
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
