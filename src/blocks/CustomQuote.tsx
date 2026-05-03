// ─── CustomQuote Block (P39 / Sales Material) ─────────────────────
// 顧客固有のカスタム見積。Sparkles 演出 + lineItems の hightlight 行に BorderBeam。

"use client"

import { Sparkles } from "../_magicui/sparkles"
import { BorderBeam } from "../_magicui/border-beam"
import type { CustomQuoteProps } from "../types"

export function CustomQuoteBlock({
  heading = "お見積もり",
  lineItems,
  totalDisplay,
  discount,
  legalNote,
}: CustomQuoteProps) {
  return (
    <section className="py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="relative rounded-3xl bg-white border border-slate-200 p-8 shadow-lg overflow-hidden">
          <Sparkles className="absolute top-0 right-0 w-32 h-32 opacity-30" />
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{heading}</h2>

          <div className="space-y-3">
            {lineItems.map((item, i) => (
              <div
                key={i}
                className={`relative flex items-start justify-between gap-4 py-3 ${
                  i < lineItems.length - 1 ? "border-b border-slate-100" : ""
                } ${item.isHighlighted ? "bg-indigo-50/30 -mx-4 px-4 rounded-lg" : ""}`}
              >
                {item.isHighlighted && (
                  <BorderBeam size={120} duration={8} colorFrom="#6366f1" colorTo="#a855f7" />
                )}
                <div className="flex-grow">
                  <p className={`font-semibold ${item.isHighlighted ? "text-indigo-900" : "text-slate-900"}`}>
                    {item.title}
                    {item.quantity && item.quantity > 1 && (
                      <span className="text-xs text-slate-500 ml-2">× {item.quantity}</span>
                    )}
                  </p>
                  {item.description && (
                    <p className="text-xs text-slate-600 mt-1">{item.description}</p>
                  )}
                </div>
                <p className={`font-bold whitespace-nowrap ${item.isHighlighted ? "text-indigo-700" : "text-slate-700"}`}>
                  {item.priceDisplay}
                </p>
              </div>
            ))}
          </div>

          {discount && (
            <div className="mt-4 pt-4 border-t border-dashed border-slate-200 flex justify-between items-center">
              <p className="text-sm text-emerald-700 font-semibold">{discount.label}</p>
              <p className="text-sm text-emerald-700 font-semibold">- {discount.amount}</p>
            </div>
          )}

          <div className="mt-6 pt-6 border-t-2 border-slate-200 flex justify-between items-baseline">
            <p className="text-lg font-bold text-slate-900">合計</p>
            <p className="text-3xl font-bold text-slate-900">{totalDisplay}</p>
          </div>

          {legalNote && (
            <p className="mt-4 text-xs text-slate-400 italic">{legalNote}</p>
          )}
        </div>
      </div>
    </section>
  )
}
