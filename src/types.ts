// ─── Block 型定義 ──────────────────────────────────────────────────
// Paradigm Sales OS v2 — Phase 1 (2026-05-01)
//
// 構造化 block JSON で AI 生成・i18n・出力 format 別 adapter の 3 層分離を実現。
// docs/refactor/builder-library-redesign.md 参照。

import type { SalesRegion } from "./_types/region"

/**
 * Block の翻訳マップ。各 region で表示する props 値を切替。
 * 例: { ja: { title: "ようこそ" }, en: { title: "Welcome" } }
 */
export type BlockTranslations<T extends object = object> = Partial<
  Record<SalesRegion | "global", Partial<T>>
>

// ─── 各 Block の props 型 ──────────────────────────────────────────

export interface HeroProps {
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaUrl?: string
  imageUrl?: string
  variant?: "centered" | "left" | "split"
}

export interface FeatureGridProps {
  heading?: string
  features: Array<{ icon?: string; title: string; description: string }>
  columns?: 2 | 3 | 4
}

export interface PricingProps {
  heading?: string
  plans: Array<{
    name: string
    price: string
    cycle?: string  // "/月" / "/year"
    features: string[]
    ctaLabel?: string
    ctaUrl?: string
    highlighted?: boolean
  }>
}

export interface CTAProps {
  heading: string
  description?: string
  buttonLabel: string
  buttonUrl: string
  variant?: "primary" | "ghost"
}

export interface TestimonialProps {
  quote: string
  author: string
  role?: string
  avatarUrl?: string
}

export interface FAQProps {
  heading?: string
  items: Array<{ question: string; answer: string }>
}

export interface FooterProps {
  copyright: string
  links?: Array<{ label: string; url: string }>
  social?: Array<{ platform: "twitter" | "linkedin" | "github"; url: string }>
}

export interface VideoEmbedProps {
  url: string                // YouTube / Vimeo URL
  caption?: string
  aspectRatio?: "16:9" | "4:3" | "1:1"
}

/**
 * HtmlEmbedProps — 生 HTML を Block として埋め込む (Phase 3-A migration 用)。
 * セキュリティ規約:
 *   - admin が cms_content_blocks に書き込んだ HTML のみ render される
 *   - Composer の Palette からは追加できない (UI 経由禁止)
 *   - 用途: web_demos.html_content 等の legacy HTML を 1:1 移行する場合のみ
 *   - 将来 LLM で semantic block に分解して置き換える前提
 */
export interface HtmlEmbedProps {
  html: string              // sanitize 済みの HTML 文字列を期待
  cssScope?: string         // クラスプレフィックス (CSS 衝突回避・任意)
  source?: "web_demos" | "manual" | "import"  // 由来トラッキング
}

// ─── P39 Batch 2: Personalize Layer 5 新 Block ──────────────────────
// 「絶望→希望 5 段階」を表現する urgency_label と業種統計を活用する高密度 Block 群。
// 既存の hero/cta は汎用 (一般 LP・diagram report どちらでも使える) のに対し、
// この 5 種は「診断レポート専用」で urgency / 業種比較 / 案件事例を構造化して持つ。

/** 緊急度 5 段階 — 絶望→希望 を表現する label. report-templates seed と同じ語彙. */
export type UrgencyLabel = "despair" | "alert" | "warning" | "notice" | "hopeful"

/**
 * HeroWithUrgencyProps — urgency_label + countdown + KPI 1 つを併載した Hero.
 * 主治医ポジション (継続診断) でも使えるよう urgency_label が必須.
 */
export interface HeroWithUrgencyProps {
  title: string
  subtitle?: string
  urgencyLabel: UrgencyLabel
  /** KPI 1 つを大きく表示. 例: { value: "¥38M", label: "年間機会損失", trend: "-12% YoY" } */
  kpi?: { value: string; label: string; trend?: string }
  /** "次回ヘルスチェック まで" 等のカウントダウン (ISO datetime). */
  countdownUntil?: string
  ctaLabel?: string
  ctaUrl?: string
  /** 主治医ポジション継続中サインの有無. */
  continuityBadge?: { active: boolean; nextCheckMonth?: string }
}

/**
 * IndustryChartProps — 業種ベンチマーク chart (recharts BarChart 想定).
 * benchmarks view の集約結果を直接渡せる構造.
 */
export interface IndustryChartProps {
  heading?: string
  subheading?: string
  /** 各 metric の自社値・業種中央値・上位 10%. */
  rows: Array<{
    metric: string
    yourValue: number
    industryMedian: number
    industryTop10?: number
    unit: string
    /** "lower_is_better" の場合 chart の color 軸が反転. */
    direction?: "lower_is_better" | "higher_is_better"
  }>
  /** "あなたは下位 X%" 等の同列比較注釈. */
  rankingNote?: string
}

/**
 * CaseStudyProps — 同業種の改善事例 (社名匿名化済み).
 * Findy 黄金パターン: 数字 → 顔写真 → 短い引用 → metric の順で並べる.
 */
export interface CaseStudyProps {
  heading?: string
  cases: Array<{
    /** 匿名社名. 例: "首都圏 D2C C 社" */
    anonymizedName: string
    industrySlug?: string
    /** 改善前後の数値ペア. 例: { before: "CVR 0.4%", after: "CVR 1.8%", deltaLabel: "+350%" } */
    metric: { before: string; after: string; deltaLabel: string }
    /** お客様コメント (15-40 字). */
    quote?: string
    /** 改善期間 (例: "8 週間"). */
    duration?: string
  }>
}

/**
 * CTAPremiumProps — 主治医パッケージ (Tier 別) を 1-3 本並べる premium CTA.
 * 通常の cta より説得力が高い構造 (price + duration + risk-reversal).
 */
export interface CTAPremiumProps {
  heading: string
  description?: string
  packages: Array<{
    name: string
    /** 表示価格 (PPP 適用後). */
    priceDisplay: string
    cycle?: string  // "/月" / "初回のみ"
    durationLabel?: string  // "3 ヶ月コース"
    bullets: string[]
    ctaLabel: string
    ctaUrl: string
    highlighted?: boolean
    /** 返金保証等の risk-reversal 文言. */
    riskReversal?: string
  }>
  /** 法令ディスクレーマー (CAN-SPAM 互換). */
  legalNote?: string
}

/**
 * FooterSignatureProps — 営業サイン + opt-out + 物理住所 (CAN-SPAM 互換).
 * Stage 1 フォーム文面でも使う想定 (法的リスク回避).
 */
export interface FooterSignatureProps {
  /** 担当者名 + 役職. 例: "Paradigm 合同会社 Web 健診事業部 山田" */
  signatureLine: string
  /** 物理住所 (CAN-SPAM 必須項目). */
  physicalAddress: string
  /** opt-out リンク (フォーム送信版でも必要). */
  optOutUrl?: string
  optOutLabel?: string
  /** 連絡先 (メール / 電話). */
  contactEmail?: string
  contactPhone?: string
  /** 法人番号 (gBizInfo 連携時に表示). */
  corporateNumber?: string
}

// ─── P39 Phase 3 (2026-05-03) — Diagnostic Report / Sales Material 新 Block 8 種 ──

/** 出典トレース (B28 #12 準拠) — field-level の出典・複数ソース統合表示 */
export interface SourceCitation {
  /** ソース slug (例: 'gbizinfo' / 'pagespeed' / 'ssl_labs') */
  source: string
  /** 引用された生値 (audit hover 表示用) */
  rawValue?: string | number
  /** このソースの値が採用されたか (false = 比較対象として表示のみ) */
  used: boolean
  /** 採用 / 不採用の理由 (1 行) */
  reason?: string
}

/** ScoreRingProps — 診断スコア 0-100 円グラフ (絶望→希望 の central KPI) */
export interface ScoreRingProps {
  score: number  // 0-100
  label?: string
  /** 5 段階 urgency (despair < 30, alert < 50, warning < 70, notice < 90, hopeful >= 90) */
  urgencyLabel?: UrgencyLabel
  /** 同業中央値 (オーバーレイ表示) */
  industryMedian?: number
  /** 出典 (score がどこから来たか) */
  sources?: SourceCitation[]
}

/** AnnualLossCardProps — 年間機会損失額カウントアップ (Globe 背景・恐怖訴求) */
export interface AnnualLossCardProps {
  /** 年間損失額 (JPY 単位の数値・通貨記号は variant rules で切替) */
  annualLossJpy: number
  currency?: string  // 'JPY' | 'USD' | ...
  currencySymbol?: string
  label?: string
  /** 月額相当 (補助表示) */
  monthlyEquivalent?: number
  /** 損失の根拠 (痛みカテゴリ別 breakdown) */
  breakdown?: Array<{ category: string; amount: number; percentage: number }>
  sources?: SourceCitation[]
}

/** TopPainsListProps — 痛み上位 5 を AnimatedList で順次出現 */
export interface TopPainsListProps {
  heading?: string
  pains: Array<{
    rank: number
    title: string
    severity: "critical" | "high" | "medium" | "low" | "info"
    estimatedAnnualLossJpy?: number
    description: string
    sources?: SourceCitation[]
  }>
}

/** PrescriptionProps — 処方箋 BentoGrid 3 カラム (痛み → 解決策のマッピング) */
export interface PrescriptionProps {
  heading?: string
  prescriptions: Array<{
    icon?: string
    painTitle: string
    solutionTitle: string
    solutionBullets: string[]
    estimatedRecoveryJpy?: number
    timeline?: string  // "1-2 ヶ月で改善" 等
    /** 推奨 tier (松/竹/梅 のどれで実装可能か) */
    requiredTier?: "ume" | "take" | "matsu"
  }>
}

/** ExecutiveSummaryProps — 営業資料 P.1 顧客名 + サマリ (TextReveal scroll-trigger) */
export interface ExecutiveSummaryProps {
  customerName: string
  /** 1-2 段落のサマリ */
  summary: string
  /** Key 数値 (大きく表示する 3 つまで) */
  keyMetrics?: Array<{ label: string; value: string; trend?: string }>
  /** 担当者署名 */
  signature?: string
}

/** CustomQuoteProps — 顧客固有のカスタム見積 */
export interface CustomQuoteProps {
  heading?: string
  /** 顧客の業種・規模に基づく見積項目 */
  lineItems: Array<{
    title: string
    description?: string
    priceDisplay: string  // "¥350,000" 等 (i18n は variant rules で切替)
    quantity?: number
    isHighlighted?: boolean
  }>
  totalDisplay: string
  /** 値引き (ある場合) */
  discount?: { label: string; amount: string }
  /** PPP 適用済みか・税抜表示か等の注釈 */
  legalNote?: string
}

/** RoadmapProps — 90日実装ロードマップ (Timeline + AnimatedList) */
export interface RoadmapProps {
  heading?: string
  /** 各 phase の開始週 (Week N) と内容 */
  phases: Array<{
    week: number  // 1-12
    title: string
    description: string
    deliverables?: string[]
    /** Magic UI: 完了済みステップは check icon・進行中は AnimatedBeam */
    status?: "scheduled" | "in_progress" | "completed"
  }>
}

/** RoiCalculatorProps — interactive ROI 計算機 */
export interface RoiCalculatorProps {
  heading?: string
  /** 投資額 (顧客が選んだプラン) */
  investmentJpy: number
  /** 想定 monthly recovery */
  monthlyRecoveryJpy: number
  /** 想定回収月数 */
  paybackMonths?: number
  /** 1 年後 / 3 年後の累積回収 */
  projections?: { year1: number; year3: number }
  /** 計算根拠 (透明性) */
  assumptions?: string[]
  ctaLabel?: string
  ctaUrl?: string
}

// ─── 統合 type — Block の discriminated union ──────────────────────

export type BlockType =
  | "hero"
  | "feature_grid"
  | "pricing"
  | "cta"
  | "testimonial"
  | "faq"
  | "footer"
  | "video"
  | "html"
  // P39 Batch 2 — Personalize Layer 5 新 Block (既存)
  | "hero_with_urgency"
  | "industry_chart"
  | "case_study"
  | "cta_premium"
  | "footer_signature"
  // P39 Phase 3 (2026-05-03) — Diagnostic / Sales Material 8 新 Block
  | "score_ring"
  | "annual_loss_card"
  | "top_pains_list"
  | "prescription"
  | "executive_summary"
  | "custom_quote"
  | "roadmap"
  | "roi_calculator"

export type BlockProps = {
  hero: HeroProps
  feature_grid: FeatureGridProps
  pricing: PricingProps
  cta: CTAProps
  testimonial: TestimonialProps
  faq: FAQProps
  footer: FooterProps
  video: VideoEmbedProps
  html: HtmlEmbedProps
  // P39 Batch 2
  hero_with_urgency: HeroWithUrgencyProps
  industry_chart: IndustryChartProps
  case_study: CaseStudyProps
  cta_premium: CTAPremiumProps
  footer_signature: FooterSignatureProps
  // P39 Phase 3
  score_ring: ScoreRingProps
  annual_loss_card: AnnualLossCardProps
  top_pains_list: TopPainsListProps
  prescription: PrescriptionProps
  executive_summary: ExecutiveSummaryProps
  custom_quote: CustomQuoteProps
  roadmap: RoadmapProps
  roi_calculator: RoiCalculatorProps
}

export interface Block<T extends BlockType = BlockType> {
  id: string
  type: T
  props: BlockProps[T]
  translations?: BlockTranslations<BlockProps[T]>
}

// ─── ContentDoc — DB cms_content_blocks 行の構造 ────────────────────

export interface ContentDoc {
  id: string
  slug: string
  page_type: "demo" | "report" | "sales_material" | "email" | "landing"
  region: SalesRegion | null
  title: string | null
  blocks: Block[]
  /**
   * meta 内で B33 (2026-05-07) から認識される予約キー:
   *   - design_theme: DesignTheme (6 値)
   *   - industry: string (theme 自動 resolve hint)
   *   - pitch_angle: string (loss/opportunity/trust/urgency/competitive/compliance)
   *   - personalize_urgency_label: UrgencyLabel
   *   - template_id: string (DB report_templates.id)
   *   - template_variant: string (A/B variant key)
   */
  meta: Record<string, unknown>
  is_published: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}
