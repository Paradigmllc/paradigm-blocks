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

// ─── D-10 (2026-05-08): Narrative Block 8 種 — 診断レポート全面刷新 v0.4.0 ──
//
// 背景: ユーザー指示「現状の診断レポートはスコアの寄せ集めで全く訴求力がない・
// 内容や構成の設計から全面刷新が必要」+「絶望度指数のような評価軸は不要・廃止」
//
// 旧 audit-style block (score_ring / annual_loss_card / top_pains_list / prescription /
// hero_with_urgency / industry_chart / feature_grid 等) は「データを表示する容器」に
// 過ぎず、narrative の論理構造を持たない. 顧客は監査報告書を受け取った気分になる.
//
// 新 narrative block は SCQA (Situation→Complication→Question→Answer) + Challenger Sale
// (Teach→Tailor→Take Control) + 主治医ポジション 3 重に従う論理単位.
// **型自体が narrative 構造を強制** = LLM 出力時に band-aid 化しにくい.
//
// 設計原則:
//   1. 各 block は **strictly 1-shot** (リスト型は ThreeCriticalIssues の 3 件 tuple のみ)
//   2. 全 数値に sourceLabel 必須 (B28 #12 出典可視化 + s10-5 #5 80% Real Data)
//   3. urgency_label 依存ゼロ (Q1-A 完全廃止と整合)
//   4. region 依存は translations で表現 (I18N-CUSTOMER-FACING 5 軸最適化)
//   5. customer-facing で「絶望」「希望」「危機」等の感情語禁止 (型レベルで制約は不可
//      だが、各 props のコメントで明示)
//
// 詳細 spec → docs/knowledge/diagnostic-report-redesign-spec.md (appexxme worktree)

/** 出典付き fact — 各 narrative block の数値・引用は必ずこれで包む (B28 #12 準拠). */
export interface SourcedFact<T = string> {
  value: T
  /** 短い source label (UI badge 表示用・例: "PageSpeed" / "gBizInfo" / "HP 解析") */
  sourceLabel: string
  /** 詳細 source URL (hover で audit 可能・任意) */
  sourceUrl?: string
  /** 取得時刻 (古いデータの判別用・任意) */
  fetchedAt?: string
}

/**
 * 1. TailoredOpening — 御社の事業を理解している証明
 *
 * 目的: 営業色ゼロの "subjective ゾーン" で「我々は御社のことを 1 時間調べました」
 *       を可視化. SCQA の Situation = "common ground" を確立する.
 *
 * narrative 例:
 *   "高山ファーニッシング様は石川県金沢市の不動産会社として 1985 年から地域の
 *    賃貸経営支援に注力されてきました. 直近 6 ヶ月で SNS 発信が止まり、HP の
 *    更新も 2024 年 3 月で停止していますね."
 */
export interface TailoredOpeningProps {
  /** 1-2 文の business model summary (gBizInfo + HP 解析から導出・LLM が生成) */
  businessSummary: string
  /** 観察した特徴 (各項目に source 必須・営業色ゼロ・診療カルテ的 subjective) */
  observations: Array<{
    /** 1 行の観察 (例: "SNS 発信が直近 6 ヶ月停止") */
    observation: string
    /** 出典 (例: "Twitter API", "Wayback Machine") */
    sourceLabel: string
  }>
  /** タイトルなしで render する場合は title=null (デフォルトは無し) */
  title?: string
}

/**
 * 2. SpecificInsight — Challenger Sale Insight Provocation
 *
 * 目的: 同業他社が見落としている / 知らない fact を **1 個だけ**ぶつける.
 *       業界 benchmark ではなく「あなただから当てはまる」 insight.
 *       AI 生成ではなく実データから合成.
 *
 * narrative 例:
 *   "御社の Lighthouse Performance 28 点は業界中央値 67 から 39pt 下、
 *    これは月間 X 件の見込み顧客流出に直結する."
 */
export interface SpecificInsightProps {
  /** 1 sentence の insight (なぜ顧客特有なのかを含む) */
  insight: string
  /** 主張を支える数値 (実測値・LLM 生成禁止) */
  dataPoint: SourcedFact<string | number>
  /** 業界 / 競合の比較値 (任意・SourcedFact) */
  benchmark?: SourcedFact<string | number>
  /** 1 sentence の implication (この insight が顧客にとって何を意味するか) */
  implication: string
}

/**
 * 3. ThreeCriticalIssues — 痛みを 3 つに narrative 圧縮
 *
 * 目的: 旧 top_pains_list (Top 6 dump) を廃止. 3 つに絞ることで「向き合う」を強制.
 *       各 issue は ① 数値根拠 ② "なぜ" 原因 ③ "もし放置すると" 6 ヶ月後予兆.
 *       severity badge は廃止 (数値が物語る・"[CRITICAL]" 装飾不要).
 *
 * 型制約: 配列の長さは UI 側で 3 に slicing するが、型としては 1-3 を許容
 *         (3 未満は narrative 弱い・コメントで明示).
 */
export interface ThreeCriticalIssuesProps {
  /** 必ず 3 件 (型で tuple 化はしない・3 未満時は LLM が補強指示を受ける) */
  issues: Array<{
    /** 課題タイトル (severity prefix 禁止・1 行) */
    title: string
    /** 現状の数値根拠 (実測値必須) */
    currentState: SourcedFact<string | number>
    /** "なぜ" の 1 文 (rootCause analysis) */
    rootCause: string
    /** "もし放置すると" 6 ヶ月後の予兆 (1 文・恐怖訴求でなく事実ベース) */
    sixMonthForecast: string
  }>
}

/**
 * 4. TheQuestion — Challenger Sale Tension
 *
 * 目的: 営業相手の自問自答を誘発する 1 行. ここでの "question" は
 *       ① 顧客内意思決定者の関心 ② 6 ヶ月後の risk ③ 投資意思決定の cost-benefit
 *       の 3 軸から動的選定.
 *
 * narrative 例:
 *   "御社の事業計画 (新規事業 / 出店 / DX 投資) と、Web の現状投資量に gap は
 *    ありませんか？"
 */
export interface TheQuestionProps {
  /** 1 行の direct question (?で終わる・営業色ゼロ) */
  question: string
  /** なぜこの question が今出てくるか (任意・1 文) */
  context?: string
  /** Question の axis (内部 audit 用・UI 表示なし・LLM 選定 logic の trace) */
  axis?: "stakeholder_concern" | "future_risk" | "investment_roi"
}

/**
 * 5. OurAnswer — 1 specific approach (複数選択肢 NG)
 *
 * 目的: 旧 prescription (Top 5 recipe dump) を廃止.
 *       "我々の答え" を 1 つに絞る (Challenger Sale = "Tell, don't ask").
 *
 * narrative 例:
 *   "御社の最優先課題に対しては {1 つの specific approach} が現時点の最良解.
 *    なぜなら {root cause analysis} だから."
 */
export interface OurAnswerProps {
  /** 1 つの approach (複数候補提示禁止) */
  approach: {
    title: string
    /** 1 段落の description */
    description: string
  }
  /** なぜこの approach が最良なのか (1 段落の root cause analysis) */
  rationale: string
  /** 排除した選択肢を 1 つだけ簡潔に説明 (任意・"Tell, don't ask" の delta 強調) */
  whatItsNot?: string
}

/**
 * 6. ProofWithCredentials — 信頼性の 3 層
 *
 * 目的: ① 同業 case study ② Paradigm credentials ③ Risk Reversal の 3 層を
 *       1 block に集約.
 */
export interface ProofWithCredentialsProps {
  /** 同業の改善事例 1 件 (DB から選定・複数列挙禁止) */
  caseStudy: {
    /** 顧客名 (匿名化されている場合は "業種規模 例" 等) */
    company: string
    industry: string
    /** 改善結果 (実測値が望ましい) */
    result: SourcedFact<string>
    /** 期間 */
    periodMonths: number
  }
  /** Paradigm 自身の credentials */
  credentials: {
    entityName: string
    /** 13 桁法人番号 (gBizInfo 検証可能性のため) */
    corporateNumber?: string
    /** 物理住所 (CAN-SPAM 準拠) */
    physicalAddress: string
    /** 実績の数値 (累計案件数 / NPS / LTV 等・任意) */
    trackRecord?: SourcedFact<string>[]
  }
  /** Risk Reversal — 顧客の決断 friction を下げる安心装置 */
  riskReversal: {
    /** 30 字以内 headline ("30 日効果保証" 等) */
    headline: string
    /** 1 段落の details */
    details: string
  }
}

/**
 * 7. FirstStep — low-commitment offer
 *
 * 目的: いきなり大きな決断ではなく「まず対話」へ誘導.
 *       friction を最小化し、Cal.com link 等で即予約可能に.
 *       「契約」「購入」表現禁止. "対話" / "確認" / "試算" 用語のみ.
 */
export interface FirstStepProps {
  /** offer の概要 */
  offer: {
    /** 30 字以内 headline ("まず 30 分の電話で構造を確認しましょう" 等) */
    headline: string
    /** 1-2 文 description (対話の中身を具体化) */
    description: string
  }
  /** Cal.com / Calendly 等の予約 URL */
  bookingUrl: string
  /** 想定時間 (分) */
  durationMinutes: number
  /** 任意の代替 offer (例: 1 ページ無料試作) — 1 つだけ */
  alternativeOffer?: {
    headline: string
    actionUrl: string
  }
}

/**
 * 8. FooterContinuity — CAN-SPAM 互換 + 主治医継続バッジ
 *
 * 目的: 法令遵守 footer (FooterSignature 互換) + 主治医ポジション継続バッジ
 *       (月次定期健診による chunk 防止 — s10-5 #18 SALES-CENTER 4 ④).
 *
 * 旧 footer_signature との違い: nextCheckMonth + continuityMessage を必須化し、
 * 「主治医として次回も継続診断する」明示で関係性の永続化を伝える.
 */
export interface FooterContinuityProps {
  /** 法人名 + 部署 (例: "Paradigm 合同会社 Web 健診事業部") */
  signatureLine: string
  /** 物理住所 (CAN-SPAM 必須) */
  physicalAddress: string
  /** 法人番号 (gBizInfo 連携時) */
  corporateNumber?: string
  /** 配信停止 URL */
  optOutUrl?: string
  contactEmail?: string
  contactPhone?: string
  /** 次回月次健診の月 (YYYY-MM・主治医継続バッジに表示) */
  nextCheckMonth: string
  /** 主治医継続メッセージ (任意・例: "毎月の継続健診で改善を伴走します") */
  continuityMessage?: string
  /** 法令注釈 (CAN-SPAM / 特商法・60-100 字) */
  legalNote: string
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
  // P39 Batch 2 — Personalize Layer 5 新 Block (既存・@deprecated D-10)
  | "hero_with_urgency"
  | "industry_chart"
  | "case_study"
  | "cta_premium"
  | "footer_signature"
  // P39 Phase 3 (2026-05-03) — Diagnostic / Sales Material 8 新 Block (@deprecated D-10)
  | "score_ring"
  | "annual_loss_card"
  | "top_pains_list"
  | "prescription"
  | "executive_summary"
  | "custom_quote"
  | "roadmap"
  | "roi_calculator"
  // D-10 (2026-05-08) — Narrative Block 8 種 (SCQA + Challenger Sale 構造)
  | "tailored_opening"
  | "specific_insight"
  | "three_critical_issues"
  | "the_question"
  | "our_answer"
  | "proof_with_credentials"
  | "first_step"
  | "footer_continuity"

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
  // P39 Batch 2 (audit-style・@deprecated D-10 で narrative 系に置換予定)
  hero_with_urgency: HeroWithUrgencyProps
  industry_chart: IndustryChartProps
  case_study: CaseStudyProps
  cta_premium: CTAPremiumProps
  footer_signature: FooterSignatureProps
  // P39 Phase 3 (audit-style・@deprecated D-10)
  score_ring: ScoreRingProps
  annual_loss_card: AnnualLossCardProps
  top_pains_list: TopPainsListProps
  prescription: PrescriptionProps
  executive_summary: ExecutiveSummaryProps
  custom_quote: CustomQuoteProps
  roadmap: RoadmapProps
  roi_calculator: RoiCalculatorProps
  // D-10 (2026-05-08) Narrative Blocks
  tailored_opening: TailoredOpeningProps
  specific_insight: SpecificInsightProps
  three_critical_issues: ThreeCriticalIssuesProps
  the_question: TheQuestionProps
  our_answer: OurAnswerProps
  proof_with_credentials: ProofWithCredentialsProps
  first_step: FirstStepProps
  footer_continuity: FooterContinuityProps
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
