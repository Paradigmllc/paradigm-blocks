// ─── Prescription Block (P39) ──────────────────────────────────────
// 推奨対応 BentoGrid 3 カラム。観察項目 → 改善施策 → 想定効果 のマッピング。
// 名称 "Prescription" は API 識別子として保持 (consumer 互換). 顧客可視
// default heading は B36-P7A (2026-05-10) で「処方箋」→「推奨対応」へ
// migrate (B2B 大人語彙ガイドライン準拠・childish vocab 撤廃).

"use client"

import { BentoGrid, BentoCard } from "../_magicui/bento-grid"
import { NumberTicker } from "../_magicui/number-ticker"
import type { PrescriptionProps } from "../types"

const TIER_BADGE: Record<string, { label: string; color: string }> = {
  ume: { label: "梅プラン", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  take: { label: "竹プラン", color: "bg-sky-100 text-sky-700 border-sky-200" },
  matsu: { label: "松プラン", color: "bg-violet-100 text-violet-700 border-violet-200" },
}

function fmtJpy(n: number): string {
  if (n >= 10_000_000) return `+${(n / 10_000_000).toFixed(1)}千万`
  if (n >= 10_000) return `+${(n / 10_000).toFixed(0)}万`
  return `+${n.toLocaleString()}`
}

export function PrescriptionBlock({
  heading = "推奨対応",
  prescriptions,
}: PrescriptionProps) {
  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">{heading}</h2>
        <p className="text-sm text-slate-500 mb-6">
          各観察項目に対する具体的な改善施策と想定効果
        </p>
        <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {prescriptions.map((p, i) => {
            const tier = p.requiredTier ? TIER_BADGE[p.requiredTier] : null
            return (
              <BentoCard
                key={i}
                name={p.solutionTitle}
                className={i === 0 ? "lg:col-span-2 lg:row-span-1" : ""}
                background={
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-indigo-50/40 opacity-90" />
                }
                header={
                  <div className="text-4xl">
                    {p.icon ?? "🩺"}
                  </div>
                }
                description={
                  <div className="space-y-2">
                    <p className="text-xs text-rose-600 font-medium">
                      課題: {p.painTitle}
                    </p>
                    <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
                      {p.solutionBullets.slice(0, 4).map((b, j) => (
                        <li key={j} className="line-clamp-2">{b}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 items-center pt-2">
                      {tier && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${tier.color}`}>
                          {tier.label}
                        </span>
                      )}
                      {p.timeline && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                          ⏱ {p.timeline}
                        </span>
                      )}
                      {p.estimatedRecoveryJpy !== undefined && (
                        <span className="text-xs text-emerald-700 font-semibold ml-auto">
                          想定回復: <NumberTicker value={p.estimatedRecoveryJpy} />円
                        </span>
                      )}
                    </div>
                    {p.estimatedRecoveryJpy !== undefined && (
                      <p className="text-[10px] text-slate-400">{fmtJpy(p.estimatedRecoveryJpy)}円 / 年 想定</p>
                    )}
                  </div>
                }
              />
            )
          })}
        </BentoGrid>
      </div>
    </section>
  )
}
