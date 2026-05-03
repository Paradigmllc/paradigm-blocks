// ─── CTAPremium Block (Batch 12-C: MagicUI Border Beam Edition) ────
// Tier 別 主治医パッケージ — 推奨 highlight に Border Beam + Shimmer Button.

"use client"

import type { CTAPremiumProps } from "../types"
import { BorderBeam } from "../_magicui/border-beam"
import { ShimmerButton } from "../_magicui/shimmer-button"
import { AnimatedGradientText } from "../_magicui/animated-gradient-text"

export function CTAPremiumBlock({ heading, description, packages, legalNote }: CTAPremiumProps) {
  const cols = packages.length === 1 ? "max-w-md" : packages.length === 2 ? "max-w-3xl" : "max-w-6xl"
  const gridCols = packages.length === 1 ? "grid-cols-1" : packages.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className={`mx-auto ${cols}`}>
        <div className="text-center mb-12">
          <AnimatedGradientText className="mb-4">
            <span className="text-xs font-bold tracking-[0.18em] uppercase">PREMIUM PACKAGES</span>
          </AnimatedGradientText>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{heading}</h2>
          {description && <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">{description}</p>}
        </div>

        <div className={`grid gap-7 ${gridCols}`}>
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-8 border-2 flex flex-col overflow-hidden ${
                pkg.highlighted
                  ? "border-accent bg-gradient-to-br from-white to-indigo-50 shadow-2xl scale-[1.03] z-10"
                  : "border-black/10 bg-white shadow-md hover:shadow-xl transition-shadow"
              }`}
            >
              {/* Border Beam — highlighted のみ */}
              {pkg.highlighted && <BorderBeam size={300} duration={8} colorFrom="#4f46e5" colorTo="#a855f7" />}

              {pkg.highlighted && (
                <div className="self-start mb-5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
                  ⭐ おすすめ
                </div>
              )}

              <h3 className="text-2xl font-bold tracking-tight">{pkg.name}</h3>
              {pkg.durationLabel && (
                <div className="mt-1.5 text-sm text-text-secondary font-medium">{pkg.durationLabel}</div>
              )}

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className={`text-5xl font-bold tracking-tight ${pkg.highlighted ? "bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent" : ""}`}>
                  {pkg.priceDisplay}
                </span>
                {pkg.cycle && <span className="text-text-secondary font-medium">{pkg.cycle}</span>}
              </div>

              <ul className="mt-7 space-y-3 text-sm">
                {pkg.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span aria-hidden className={`shrink-0 mt-0.5 flex items-center justify-center h-5 w-5 rounded-full text-xs font-bold ${pkg.highlighted ? "bg-emerald-500 text-white" : "bg-emerald-100 text-emerald-700"}`}>✓</span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              {pkg.riskReversal && (
                <div className="mt-5 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 italic">
                  🛡️ {pkg.riskReversal}
                </div>
              )}

              <div className="mt-auto pt-7">
                {pkg.highlighted ? (
                  <ShimmerButton
                    shimmerColor="#ffffff"
                    background="linear-gradient(135deg, rgb(79, 70, 229), rgb(168, 85, 247))"
                    className="w-full px-6 py-4 text-sm font-bold"
                  >
                    <a href={pkg.ctaUrl} data-cta-track={`cta_premium_${idx}`} className="text-white block">
                      {pkg.ctaLabel} →
                    </a>
                  </ShimmerButton>
                ) : (
                  <a
                    href={pkg.ctaUrl}
                    data-cta-track={`cta_premium_${idx}`}
                    className="block w-full text-center px-6 py-4 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                  >
                    {pkg.ctaLabel}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {legalNote && (
          <p className="mt-12 text-center text-xs text-text-secondary leading-relaxed max-w-3xl mx-auto">
            {legalNote}
          </p>
        )}
      </div>
    </section>
  )
}
