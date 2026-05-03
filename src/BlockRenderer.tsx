// ─── BlockRenderer — 統合 Block 描画器 ─────────────────────────────
// Paradigm Sales OS v2 — Phase 1 (2026-05-01)
//
// blocks 配列を受け取り、各 block の type に応じた React コンポーネントを描画。
// translations が指定されていれば region を解決して localized props で描画。
// silently-JA-leak 防止規律準拠 (非 ja region で JA fallback 不可)。

import type { SalesRegion } from "./_types/region"
import type { Block, BlockProps } from "./types"
import { HeroBlock } from "./blocks/Hero"
import { FeatureGridBlock } from "./blocks/FeatureGrid"
import { PricingBlock } from "./blocks/Pricing"
import { CTABlock } from "./blocks/CTA"
import { TestimonialBlock } from "./blocks/Testimonial"
import { FAQBlock } from "./blocks/FAQ"
import { FooterBlock } from "./blocks/Footer"
import { VideoEmbedBlock } from "./blocks/VideoEmbed"
import { HtmlEmbedBlock } from "./blocks/HtmlEmbed"
// P39 Batch 2 — Personalize Layer 5 新 Block
import { HeroWithUrgencyBlock } from "./blocks/HeroWithUrgency"
import { IndustryChartBlock } from "./blocks/IndustryChart"
import { CaseStudyBlock } from "./blocks/CaseStudy"
import { CTAPremiumBlock } from "./blocks/CTAPremium"
import { FooterSignatureBlock } from "./blocks/FooterSignature"
// P39 Phase 3 (2026-05-03) — Diagnostic / Sales Material 8 新 Block
import { ScoreRingBlock } from "./blocks/ScoreRing"
import { AnnualLossCardBlock } from "./blocks/AnnualLossCard"
import { TopPainsListBlock } from "./blocks/TopPainsList"
import { PrescriptionBlock } from "./blocks/Prescription"
import { ExecutiveSummaryBlock } from "./blocks/ExecutiveSummary"
import { CustomQuoteBlock } from "./blocks/CustomQuote"
import { RoadmapBlock } from "./blocks/Roadmap"
import { RoiCalculatorBlock } from "./blocks/RoiCalculator"

interface BlockRendererProps {
  blocks: Block[]
  region: SalesRegion
}

/**
 * 各 block の props を region で解決する。
 * translations[region] があればそれで上書き、なければ en → 他非 ja → null。
 * region === "ja" のみ ja fallback OK。
 */
function resolveBlockProps<T extends keyof BlockProps>(
  block: Block<T>,
  region: SalesRegion,
): BlockProps[T] {
  const base = block.props
  if (!block.translations) return base

  // ja region: ja → global → en の順で fallback OK
  if (region === "ja") {
    for (const locale of ["ja", "global", "en"] as const) {
      const t = block.translations[locale]
      if (t) return { ...base, ...t } as BlockProps[T]
    }
    return base
  }

  // 非 ja region: JA は意図的に除外
  const exact = block.translations[region]
  if (exact) return { ...base, ...exact } as BlockProps[T]
  if (block.translations.en) return { ...base, ...block.translations.en } as BlockProps[T]
  if (block.translations.global) return { ...base, ...block.translations.global } as BlockProps[T]
  // 他の非 ja translation を探す
  for (const [loc, val] of Object.entries(block.translations)) {
    if (loc !== "ja" && val) return { ...base, ...val } as BlockProps[T]
  }
  // 最終手段: base props (英語混在の可能性 — JA leak 防止のため意図的に base)
  return base
}

export function BlockRenderer({ blocks, region }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block) => {
        const props = resolveBlockProps(block, region)
        switch (block.type) {
          case "hero":          return <HeroBlock key={block.id} {...(props as BlockProps["hero"])} />
          case "feature_grid":  return <FeatureGridBlock key={block.id} {...(props as BlockProps["feature_grid"])} />
          case "pricing":       return <PricingBlock key={block.id} {...(props as BlockProps["pricing"])} />
          case "cta":           return <CTABlock key={block.id} {...(props as BlockProps["cta"])} />
          case "testimonial":   return <TestimonialBlock key={block.id} {...(props as BlockProps["testimonial"])} />
          case "faq":           return <FAQBlock key={block.id} {...(props as BlockProps["faq"])} />
          case "footer":        return <FooterBlock key={block.id} {...(props as BlockProps["footer"])} />
          case "video":         return <VideoEmbedBlock key={block.id} {...(props as BlockProps["video"])} />
          case "html":          return <HtmlEmbedBlock key={block.id} {...(props as BlockProps["html"])} />
          // P39 Batch 2
          case "hero_with_urgency": return <HeroWithUrgencyBlock key={block.id} {...(props as BlockProps["hero_with_urgency"])} />
          case "industry_chart":    return <IndustryChartBlock key={block.id} {...(props as BlockProps["industry_chart"])} />
          case "case_study":        return <CaseStudyBlock key={block.id} {...(props as BlockProps["case_study"])} />
          case "cta_premium":       return <CTAPremiumBlock key={block.id} {...(props as BlockProps["cta_premium"])} />
          case "footer_signature":  return <FooterSignatureBlock key={block.id} {...(props as BlockProps["footer_signature"])} />
          // P39 Phase 3 (2026-05-03)
          case "score_ring":        return <ScoreRingBlock key={block.id} {...(props as BlockProps["score_ring"])} />
          case "annual_loss_card":  return <AnnualLossCardBlock key={block.id} {...(props as BlockProps["annual_loss_card"])} />
          case "top_pains_list":    return <TopPainsListBlock key={block.id} {...(props as BlockProps["top_pains_list"])} />
          case "prescription":      return <PrescriptionBlock key={block.id} {...(props as BlockProps["prescription"])} />
          case "executive_summary": return <ExecutiveSummaryBlock key={block.id} {...(props as BlockProps["executive_summary"])} />
          case "custom_quote":      return <CustomQuoteBlock key={block.id} {...(props as BlockProps["custom_quote"])} />
          case "roadmap":           return <RoadmapBlock key={block.id} {...(props as BlockProps["roadmap"])} />
          case "roi_calculator":    return <RoiCalculatorBlock key={block.id} {...(props as BlockProps["roi_calculator"])} />
          default:
            // 未知の type は無視 (将来追加 block への前方互換性)
            console.warn(`[BlockRenderer] unknown block type: ${(block as Block).type}`)
            return null
        }
      })}
    </>
  )
}
