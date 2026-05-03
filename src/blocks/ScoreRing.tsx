// ─── ScoreRing Block (P39) ─────────────────────────────────────────
// 診断スコア 0-100 を円グラフ + NumberTicker で表示。
// urgency_label で 5 段階配色 (despair/alert/warning/notice/hopeful)。
// 出典バッジ (B28 #12) を常時 inline 表示。

"use client"

import { motion } from "framer-motion"
import { NumberTicker } from "../_magicui/number-ticker"
import { Sparkles } from "../_magicui/sparkles"
import { BorderBeam } from "../_magicui/border-beam"
import type { ScoreRingProps, UrgencyLabel } from "../types"

const URGENCY_COLORS: Record<UrgencyLabel, { ring: string; text: string; bg: string; label: string }> = {
  despair: { ring: "stroke-rose-500", text: "text-rose-600", bg: "bg-rose-50", label: "至急対応" },
  alert: { ring: "stroke-orange-500", text: "text-orange-600", bg: "bg-orange-50", label: "警告" },
  warning: { ring: "stroke-amber-500", text: "text-amber-600", bg: "bg-amber-50", label: "注意" },
  notice: { ring: "stroke-sky-500", text: "text-sky-600", bg: "bg-sky-50", label: "改善余地" },
  hopeful: { ring: "stroke-emerald-500", text: "text-emerald-600", bg: "bg-emerald-50", label: "良好" },
}

export function ScoreRingBlock({
  score,
  label = "総合スコア",
  urgencyLabel = "warning",
  industryMedian,
  sources,
}: ScoreRingProps) {
  const safeScore = Math.max(0, Math.min(100, Math.round(score)))
  const colors = URGENCY_COLORS[urgencyLabel]
  const radius = 72
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (safeScore / 100) * circumference

  return (
    <section className="relative py-12 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <div className={`relative rounded-3xl ${colors.bg} p-8 border border-slate-200`}>
          <BorderBeam size={250} duration={12} colorFrom="#a78bfa" colorTo="#ec4899" />
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Ring graphic */}
            <div className="relative flex items-center justify-center">
              <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90">
                <circle cx="100" cy="100" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="14" />
                <motion.circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  className={colors.ring}
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: offset }}
                  transition={{ duration: 1.6, ease: "easeOut" }}
                />
                {industryMedian !== undefined && (
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeDasharray={`${(industryMedian / 100) * circumference} ${circumference}`}
                    opacity="0.5"
                  />
                )}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Sparkles className="absolute inset-0" />
                <div className="text-5xl font-bold text-slate-900">
                  <NumberTicker value={safeScore} />
                </div>
                <div className="text-sm text-slate-500 mt-1">/ 100</div>
              </div>
            </div>
            {/* Right side: label + urgency badge */}
            <div className="text-center md:text-left">
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors.text} ${colors.bg} border border-current/20 mb-3`}>
                {colors.label}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{label}</h3>
              {industryMedian !== undefined && (
                <p className="text-sm text-slate-600 mb-3">
                  業界中央値: <span className="font-semibold">{industryMedian}</span>
                  {" / "}
                  あなた: <span className={`font-semibold ${colors.text}`}>{safeScore}</span>
                </p>
              )}
              {sources && sources.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {sources.filter((s) => s.used).map((s, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-white/60 text-slate-500 border border-slate-200">
                      {s.source}
                    </span>
                  ))}
                  {sources.length > 1 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-200">
                      🔀 {sources.length} ソース統合
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
