// ─── CaseStudy Block (Batch 12-C: MagicUI Marquee Edition) ─────────
// 同業種改善事例を Marquee で流れる視覚効果 + Border Beam highlight.

"use client"

import type { CaseStudyProps } from "../types"
import { Marquee } from "../_magicui/marquee"
import { BorderBeam } from "../_magicui/border-beam"

export function CaseStudyBlock({ heading, cases }: CaseStudyProps) {
  if (cases.length === 0) return null

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto">
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-3">
            {heading}
          </h2>
        )}
        <p className="text-center text-text-secondary mb-12">同業種で実際に達成された改善実績</p>

        {/* Marquee で 1 列流れ (cases >= 4) or grid (< 4) */}
        {cases.length >= 4 ? (
          <Marquee pauseOnHover className="[--duration:35s]">
            {cases.map((c, idx) => (
              <CaseCard key={idx} c={c} />
            ))}
          </Marquee>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c, idx) => (
              <CaseCard key={idx} c={c} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function CaseCard({ c }: { c: CaseStudyProps["cases"][number] }) {
  return (
    <article className="relative w-80 mx-3 rounded-3xl bg-white p-7 shadow-lg border border-black/5 flex flex-col overflow-hidden">
      <BorderBeam size={250} duration={12} delay={9} colorFrom="#10b981" colorTo="#3b82f6" />

      <div className="text-5xl font-bold tracking-tight bg-gradient-to-br from-emerald-600 to-teal-500 bg-clip-text text-transparent">
        {c.metric.deltaLabel}
      </div>
      <div className="mt-1 text-xs text-text-secondary uppercase tracking-wider font-semibold">
        {c.duration ? `${c.duration}で達成` : "実績"}
      </div>

      {/* before → after */}
      <div className="mt-5 flex items-center gap-3 text-sm">
        <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 font-mono text-xs">
          {c.metric.before}
        </span>
        <span aria-hidden className="text-emerald-500 font-bold text-lg">→</span>
        <span className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 font-mono font-bold text-xs">
          {c.metric.after}
        </span>
      </div>

      {c.quote && (
        <blockquote className="mt-5 text-sm italic text-text-secondary border-l-4 border-emerald-300 pl-4 py-1">
          &ldquo;{c.quote}&rdquo;
        </blockquote>
      )}

      <div className="mt-auto pt-5 text-xs text-text-secondary border-t border-black/5">
        <div className="font-semibold text-text-primary">{c.anonymizedName}</div>
        {c.industrySlug && <div className="text-slate-400 mt-0.5">{c.industrySlug}</div>}
      </div>
    </article>
  )
}
