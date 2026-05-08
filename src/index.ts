// ─── @paradigmllc/blocks — main entry ─────────────────────────────
// 公開する API は以下:
//   1. <BlockRenderer />            — type → component dispatcher
//   2. <BlocksReportRenderer />     — /report/[slug] 公開ページ wrapper
//   3. types (Block / BlockProps / ContentDoc / UrgencyLabel / SalesRegion)
//   4. isValidRegion (consumer 側で region 検証する用)
//
// 個別 Block component を直接 import したい場合は `@paradigmllc/blocks/blocks/Hero` 等の
// subpath import を使用 (package.json exports map 参照).

export { BlockRenderer } from "./BlockRenderer"
export { default as BlocksReportRenderer } from "./BlocksReportRenderer"

// ─── B33 (2026-05-07) — Design Theme System (6 themes) ────────────
export { ThemeProvider, default as DefaultThemeProvider } from "./ThemeProvider"
// B33 Phase 3 (2026-05-08) — useDesignTheme() hook for Block-level theme branching
export { ThemeContextProvider, useDesignTheme } from "./ThemeContext"
export {
  DESIGN_THEMES,
  DESIGN_THEME_TOKENS,
  INDUSTRY_THEME_HINT,
  PITCH_ANGLE_THEME_DEFAULT,
  themeToCssVars,
  isValidDesignTheme,
  resolveDesignTheme,
  getThemeTokens,
} from "./themes"
export type { DesignTheme, DesignThemeTokens } from "./themes"

// ─── Type re-exports ─────────────────────────────────────────────
export type {
  // discriminated union
  Block,
  BlockType,
  BlockProps,
  BlockTranslations,
  ContentDoc,
  // Hero / FeatureGrid / Pricing / CTA / Testimonial / FAQ / Footer / Video / Html
  HeroProps,
  FeatureGridProps,
  PricingProps,
  CTAProps,
  TestimonialProps,
  FAQProps,
  FooterProps,
  VideoEmbedProps,
  HtmlEmbedProps,
  // P39 Batch 2 — Personalize Layer 5
  HeroWithUrgencyProps,
  IndustryChartProps,
  CaseStudyProps,
  CTAPremiumProps,
  FooterSignatureProps,
  // P39 Phase 3 — Diagnostic / Sales Material 8 (@deprecated D-10)
  ScoreRingProps,
  AnnualLossCardProps,
  TopPainsListProps,
  PrescriptionProps,
  ExecutiveSummaryProps,
  CustomQuoteProps,
  RoadmapProps,
  RoiCalculatorProps,
  // D-10 (2026-05-08) Narrative Block 8 種 (SCQA + Challenger Sale)
  TailoredOpeningProps,
  SpecificInsightProps,
  ThreeCriticalIssuesProps,
  TheQuestionProps,
  OurAnswerProps,
  ProofWithCredentialsProps,
  FirstStepProps,
  FooterContinuityProps,
  // R2 / v0.5.0 (2026-05-08) Research Grade Block 5 種
  CoverSummaryProps,
  MethodologyProps,
  IndustryContextProps,
  RiskQuantificationProps,
  AppendixReferencesProps,
  ScenarioOutcome,
  Confidence,
  // shared
  SourceCitation,
  SourcedFact,
  UrgencyLabel,
} from "./types"

export type { SalesRegion, ReportLocale } from "./_types/region"
export {
  isValidRegion,
  // B33 Phase 2 (2026-05-07): region → locale canonical mapper + URL builder
  regionToLocale,
  buildReportUrl,
  REPORT_LOCALES,
} from "./_types/region"

// ─── Block component direct exports (任意 import 用) ───────────────
// consumer 側で「BlockRenderer 経由ではなく特定 Block を直接使いたい」ケース
// (例: 営業資料 PDF 用 SSR で Hero だけ render 等) で利用する.
export { HeroBlock } from "./blocks/Hero"
export { FeatureGridBlock } from "./blocks/FeatureGrid"
export { PricingBlock } from "./blocks/Pricing"
export { CTABlock } from "./blocks/CTA"
export { TestimonialBlock } from "./blocks/Testimonial"
export { FAQBlock } from "./blocks/FAQ"
export { FooterBlock } from "./blocks/Footer"
export { VideoEmbedBlock } from "./blocks/VideoEmbed"
export { HtmlEmbedBlock } from "./blocks/HtmlEmbed"
export { HeroWithUrgencyBlock } from "./blocks/HeroWithUrgency"
export { IndustryChartBlock } from "./blocks/IndustryChart"
export { CaseStudyBlock } from "./blocks/CaseStudy"
export { CTAPremiumBlock } from "./blocks/CTAPremium"
export { FooterSignatureBlock } from "./blocks/FooterSignature"
export { ScoreRingBlock } from "./blocks/ScoreRing"
export { AnnualLossCardBlock } from "./blocks/AnnualLossCard"
export { TopPainsListBlock } from "./blocks/TopPainsList"
export { PrescriptionBlock } from "./blocks/Prescription"
export { ExecutiveSummaryBlock } from "./blocks/ExecutiveSummary"
export { CustomQuoteBlock } from "./blocks/CustomQuote"
export { RoadmapBlock } from "./blocks/Roadmap"
export { RoiCalculatorBlock } from "./blocks/RoiCalculator"
// D-10 (2026-05-08) Narrative Blocks
export { TailoredOpeningBlock } from "./blocks/TailoredOpening"
export { SpecificInsightBlock } from "./blocks/SpecificInsight"
export { ThreeCriticalIssuesBlock } from "./blocks/ThreeCriticalIssues"
export { TheQuestionBlock } from "./blocks/TheQuestion"
export { OurAnswerBlock } from "./blocks/OurAnswer"
export { ProofWithCredentialsBlock } from "./blocks/ProofWithCredentials"
export { FirstStepBlock } from "./blocks/FirstStep"
export { FooterContinuityBlock } from "./blocks/FooterContinuity"
// R2 / v0.5.0 (2026-05-08) Research Grade Blocks
export { CoverSummaryBlock } from "./blocks/CoverSummary"
export { MethodologyBlock } from "./blocks/Methodology"
export { IndustryContextBlock } from "./blocks/IndustryContext"
export { RiskQuantificationBlock } from "./blocks/RiskQuantification"
export { AppendixReferencesBlock } from "./blocks/AppendixReferences"
