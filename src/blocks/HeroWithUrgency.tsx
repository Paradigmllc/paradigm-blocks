// ─── HeroWithUrgency Block (Batch 12-C: MagicUI Gorgeous Edition) ──
// urgency_label + KPI 1 + countdown を併載した診断レポート専用 Hero.
// Batch 12-C 拡張: Sparkles (hopeful) / Meteors (despair) / NumberTicker (KPI)

"use client"

import type { HeroWithUrgencyProps, UrgencyLabel } from "../types"
import { NumberTicker } from "../_magicui/number-ticker"
import { Sparkles } from "../_magicui/sparkles"
import { Meteors } from "../_magicui/meteors"
import { ShimmerButton } from "../_magicui/shimmer-button"

const URGENCY_STYLES: Record<UrgencyLabel, { bg: string; text: string; emoji: string; label: string; ring: string }> = {
  despair:  { bg: "bg-gradient-to-br from-red-50 via-red-100 to-orange-50 border-red-200",       text: "text-red-700",     emoji: "🚨", label: "緊急 (絶望)",   ring: "ring-red-400" },
  alert:    { bg: "bg-gradient-to-br from-orange-50 via-amber-100 to-yellow-50 border-orange-200", text: "text-orange-700", emoji: "⚠️", label: "警報",        ring: "ring-orange-400" },
  warning:  { bg: "bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-50 border-amber-200",  text: "text-amber-700",  emoji: "⚡", label: "警告",        ring: "ring-amber-400" },
  notice:   { bg: "bg-gradient-to-br from-blue-50 via-cyan-100 to-blue-50 border-blue-200",       text: "text-blue-700",   emoji: "📋", label: "注意",        ring: "ring-blue-400" },
  hopeful:  { bg: "bg-gradient-to-br from-emerald-50 via-green-100 to-teal-50 border-emerald-200", text: "text-emerald-700", emoji: "✨", label: "改善余地あり (希望)", ring: "ring-emerald-400" },
}

function formatCountdown(iso?: string): string | null {
  if (!iso) return null
  const target = new Date(iso).getTime()
  const now = Date.now()
  const diffMs = target - now
  if (diffMs <= 0) return "実施推奨日を経過しています"
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
  if (days <= 7) return `あと ${days} 日`
  if (days <= 30) return `あと ${Math.ceil(days / 7)} 週間`
  return `あと ${Math.ceil(days / 30)} ヶ月`
}

// KPI value から数値を抽出 (¥3,800,000 → 3800000)
function extractNumber(value: string): { num: number; prefix: string; suffix: string } | null {
  const match = value.match(/^(¥|\$|€)?([\d,]+(?:\.\d+)?)(.*)?$/)
  if (!match) return null
  const num = Number(match[2].replace(/,/g, ""))
  if (isNaN(num)) return null
  return { num, prefix: match[1] || "", suffix: match[3] || "" }
}

export function HeroWithUrgencyBlock({
  title, subtitle, urgencyLabel, kpi, countdownUntil, ctaLabel, ctaUrl, continuityBadge,
}: HeroWithUrgencyProps) {
  const style = URGENCY_STYLES[urgencyLabel]
  const countdown = formatCountdown(countdownUntil)
  const kpiNumber = kpi ? extractNumber(kpi.value) : null
  const isCritical = urgencyLabel === "despair" || urgencyLabel === "alert"

  return (
    <section className={`relative overflow-hidden py-20 px-6 border-t-4 ${style.bg}`}>
      {/* Magic UI: Meteors (危機感を視覚化・despair/alert のみ) */}
      {isCritical && <Meteors number={20} />}

      {/* Magic UI: Sparkles (希望を視覚化・hopeful のみ) */}
      {urgencyLabel === "hopeful" && (
        <div className="absolute inset-0 pointer-events-none">
          <Sparkles className="absolute inset-0" />
        </div>
      )}

      <div className="relative max-w-4xl mx-auto z-10">
        {/* badges */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold border-2 ring-2 ${style.ring} ring-offset-2 ${style.bg} ${style.text} shadow-sm`}>
            <span aria-hidden className="text-lg">{style.emoji}</span>
            {style.label}
          </span>
          {continuityBadge?.active && (
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 shadow-sm">
              🩺 主治医継続中
              {continuityBadge.nextCheckMonth && (
                <span className="text-purple-500 text-[10px]">次回 {continuityBadge.nextCheckMonth}</span>
              )}
            </span>
          )}
        </div>

        <h1 className={`text-4xl md:text-6xl font-bold tracking-tight leading-tight ${style.text}`}>
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl">
            {subtitle}
          </p>
        )}

        {/* KPI + countdown grid (Magic UI NumberTicker for KPI) */}
        {(kpi || countdown) && (
          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {kpi && (
              <div className="rounded-3xl bg-white/70 backdrop-blur-md p-7 shadow-xl border border-black/5">
                <div className="text-xs text-text-secondary uppercase tracking-wider font-semibold mb-3">{kpi.label}</div>
                {kpiNumber ? (
                  <div className="text-5xl md:text-6xl font-bold tracking-tight">
                    {kpiNumber.prefix}
                    <NumberTicker value={kpiNumber.num} className="tabular-nums" />
                    {kpiNumber.suffix}
                  </div>
                ) : (
                  <div className="text-5xl font-bold tracking-tight">{kpi.value}</div>
                )}
                {kpi.trend && (
                  <div className="mt-2 text-sm text-text-secondary font-medium">{kpi.trend}</div>
                )}
              </div>
            )}
            {countdown && (
              <div className={`rounded-3xl p-7 border-2 backdrop-blur-md ${style.bg} shadow-xl`}>
                <div className={`text-xs uppercase tracking-wider font-semibold mb-3 ${style.text}`}>推奨実施期限</div>
                <div className={`text-5xl md:text-6xl font-bold tracking-tight ${style.text}`}>{countdown}</div>
              </div>
            )}
          </div>
        )}

        {ctaLabel && ctaUrl && (
          <div className="mt-10">
            <ShimmerButton
              shimmerColor="#ffffff"
              shimmerDuration="2s"
              background={isCritical ? "rgb(220, 38, 38)" : "rgb(79, 70, 229)"}
              className="px-10 py-5 text-base font-bold"
            >
              <a href={ctaUrl} data-cta-track="hero_with_urgency" className="text-white">
                {ctaLabel} →
              </a>
            </ShimmerButton>
          </div>
        )}
      </div>
    </section>
  )
}
