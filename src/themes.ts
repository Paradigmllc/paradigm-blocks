// ─── Design Themes — Paradigm Sales OS v2 / B33 (2026-05-07) ────────
//
// 診断レポート / 営業資料 / LP の visual theme を 6 種に拡張。
// Block 実装は触らない (既存の Tailwind class はすべて --paradigm-* CSS 変数を
// 参照するため、テーマ = 変数の値違い として表現)。
//
// 永久ルール:
//   - 新テーマ追加 = この 1 ファイルに theme オブジェクト追加するだけ
//   - Block 側に theme 固有の if/switch 分岐は禁止 (CSS 変数で完結)
//   - hex 値は RGB triplet 形式 ("R G B" / space separated・Tailwind v4 互換)
//
// 6 テーマの設計コンセプト:
//   ① raycast  — Dark + neon gradient + glassmorphism (IT/SaaS/Tech)
//   ② stripe   — Clean white + cobalt blue + data-forward (B2B/Fintech/PSP)
//   ③ reflect  — Calm linen + indigo + serif accent (Creative/Solo/Notes)
//   ④ family   — Warm sand + coral + rounded soft (D2C/Lifestyle/Family)
//   ⑤ posthog  — Cream + signal orange + monospace (Data/Analytics/Marketing)
//   ⑥ glean    — Enterprise navy + lilac + indigo (Enterprise/Knowledge/Search)

import type { CSSProperties } from "react"

// ─── Type Definitions ──────────────────────────────────────────────

export type DesignTheme =
  | "raycast"
  | "stripe"
  | "reflect"
  | "family"
  | "posthog"
  | "glean"

export const DESIGN_THEMES: DesignTheme[] = [
  "raycast", "stripe", "reflect", "family", "posthog", "glean",
]

export interface DesignThemeTokens {
  /** UI 表示名 (admin 画面用) */
  displayName: string
  /** 1 行のサマリ (どんな印象か) */
  tagline: string
  /** RGB triplet (space-separated) — Tailwind v4 / opacity modifier 互換 */
  paper: string         // メイン背景
  paperDeep: string     // 1 段濃い背景 (footer 等)
  paperCard: string     // カード/パネル背景
  ink: string           // 主要テキスト
  inkSoft: string       // 補助テキスト
  inkMute: string       // 無効/小文字
  line: string          // 罫線/分割線
  accent: string        // CTA / アクセント
  accentSoft: string    // hover / hint
  glow: string          // gradient / glow / link
  tech: string          // 技術指標 (第二アクセント)
  /** カラースキーム ("light" | "dark") */
  colorScheme: "light" | "dark"
  /** ベースフォント */
  fontSans: string
  fontDisplay: string
  fontMono: string
  /** カード角丸 (px) */
  radiusCard: string
  /** ヒーロー背景表現 (gradient / pattern) */
  heroBackground: string
  /** Block 全体 wrapper の補助スタイル */
  bodyClass?: string
  /** RTL/LTR (auto detect) */
}

// ─── Theme Definitions (RGB triplets) ──────────────────────────────

export const DESIGN_THEME_TOKENS: Record<DesignTheme, DesignThemeTokens> = {
  // ① Raycast — Dark + neon gradient + glassmorphism
  raycast: {
    displayName: "Raycast",
    tagline: "Dark futurism · neon gradient · keyboard-driven",
    paper: "8 8 12",          // #08080C
    paperDeep: "4 4 8",       // #040408
    paperCard: "20 20 28",    // #14141C
    ink: "245 245 250",       // #F5F5FA
    inkSoft: "180 180 195",   // #B4B4C3
    inkMute: "120 120 140",   // #78788C
    line: "40 40 56",         // #282838
    accent: "255 99 130",     // #FF6382 (Raycast pink/red)
    accentSoft: "120 90 240", // #785AF0 (Raycast purple)
    glow: "100 200 255",      // #64C8FF (cyan glow)
    tech: "255 200 100",      // #FFC864 (warm amber)
    colorScheme: "dark",
    fontSans: '"Inter", ui-sans-serif, system-ui, "Segoe UI", "Noto Sans JP", sans-serif',
    fontDisplay: '"Inter", ui-sans-serif, system-ui, "Noto Sans JP", sans-serif',
    fontMono: '"JetBrains Mono", "SF Mono", Consolas, monospace',
    radiusCard: "16px",
    heroBackground: "radial-gradient(circle at 20% 10%, rgba(255,99,130,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(120,90,240,0.20) 0%, transparent 60%), #08080C",
  },

  // ② Stripe — Clean white + cobalt blue + data-forward
  stripe: {
    displayName: "Stripe",
    tagline: "Clean white · cobalt accent · data-forward",
    paper: "255 255 255",     // #FFFFFF
    paperDeep: "247 250 252", // #F7FAFC
    paperCard: "255 255 255",
    ink: "10 14 28",          // #0A0E1C
    inkSoft: "60 70 85",      // #3C4655
    inkMute: "120 130 145",   // #788291
    line: "228 232 240",      // #E4E8F0
    accent: "99 91 255",      // #635BFF (Stripe purple-indigo)
    accentSoft: "239 240 255", // #EFF0FF
    glow: "0 200 200",        // #00C8C8 (Stripe teal)
    tech: "255 138 0",        // #FF8A00 (Stripe orange)
    colorScheme: "light",
    fontSans: '"Inter", "Helvetica Neue", "Noto Sans JP", system-ui, sans-serif',
    fontDisplay: '"Inter", "Helvetica Neue", "Noto Sans JP", system-ui, sans-serif',
    fontMono: '"SF Mono", "JetBrains Mono", Consolas, monospace',
    radiusCard: "12px",
    heroBackground: "linear-gradient(180deg, #FFFFFF 0%, #F7FAFC 100%), radial-gradient(circle at 100% 0%, rgba(99,91,255,0.06) 0%, transparent 50%)",
  },

  // ③ Reflect — Calm linen + indigo + serif accent
  reflect: {
    displayName: "Reflect",
    tagline: "Calm linen · indigo notes · serif headings",
    paper: "250 248 244",     // #FAF8F4 (linen)
    paperDeep: "240 236 228", // #F0ECE4
    paperCard: "255 253 250", // #FFFDFA
    ink: "26 24 36",          // #1A1824 (deep indigo-black)
    inkSoft: "75 70 95",      // #4B465F
    inkMute: "140 135 160",   // #8C87A0
    line: "230 224 212",      // #E6E0D4
    accent: "78 70 200",      // #4E46C8 (deep indigo)
    accentSoft: "230 228 252", // #E6E4FC
    glow: "180 165 255",      // #B4A5FF (lavender)
    tech: "200 150 80",       // #C89650 (warm gold)
    colorScheme: "light",
    fontSans: '"Inter", "Noto Sans JP", system-ui, sans-serif',
    fontDisplay: '"Cormorant Garamond", "Noto Serif JP", Georgia, serif',
    fontMono: '"JetBrains Mono", "SF Mono", monospace',
    radiusCard: "10px",
    heroBackground: "linear-gradient(135deg, #FAF8F4 0%, #F0ECE4 100%)",
  },

  // ④ family.co — Warm sand + coral + rounded soft
  family: {
    displayName: "Family",
    tagline: "Warm sand · coral accent · soft rounded",
    paper: "253 248 240",     // #FDF8F0 (warm sand)
    paperDeep: "245 238 228", // #F5EEE4
    paperCard: "255 252 247", // #FFFCF7
    ink: "60 35 25",          // #3C2319 (warm dark brown)
    inkSoft: "120 85 70",     // #785546
    inkMute: "175 150 130",   // #AF9682
    line: "235 220 200",      // #EBDCC8
    accent: "255 110 95",     // #FF6E5F (coral)
    accentSoft: "255 232 228", // #FFE8E4
    glow: "255 180 100",      // #FFB464 (peach)
    tech: "100 165 145",      // #64A591 (sage green)
    colorScheme: "light",
    fontSans: '"DM Sans", "Inter", "Noto Sans JP", system-ui, sans-serif',
    fontDisplay: '"DM Serif Display", "Noto Serif JP", Georgia, serif',
    fontMono: '"JetBrains Mono", "SF Mono", monospace',
    radiusCard: "20px",
    heroBackground: "radial-gradient(circle at 30% 20%, rgba(255,180,100,0.30) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,110,95,0.20) 0%, transparent 50%), #FDF8F0",
  },

  // ⑤ PostHog — Cream + signal orange + monospace accent
  posthog: {
    displayName: "PostHog",
    tagline: "Cream + signal orange · charts everywhere",
    paper: "238 233 225",     // #EEE9E1 (cream / posthog body)
    paperDeep: "224 218 207", // #E0DACF
    paperCard: "245 241 234", // #F5F1EA
    ink: "21 21 21",          // #151515
    inkSoft: "67 67 67",      // #434343
    inkMute: "127 127 127",   // #7F7F7F
    line: "200 192 178",      // #C8C0B2
    accent: "245 79 0",       // #F54F00 (PostHog orange / signal red)
    accentSoft: "255 235 220", // #FFEBDC
    glow: "29 78 216",        // #1D4ED8 (data blue)
    tech: "5 150 105",        // #059669 (data green)
    colorScheme: "light",
    fontSans: '"Inter", "Helvetica", "Noto Sans JP", system-ui, sans-serif',
    fontDisplay: '"Matter", "Inter", "Noto Sans JP", system-ui, sans-serif',
    fontMono: '"JetBrains Mono", "Menlo", Consolas, monospace',
    radiusCard: "8px",
    heroBackground: "linear-gradient(180deg, #EEE9E1 0%, #E0DACF 100%)",
  },

  // ⑥ Glean — Enterprise navy + lilac + indigo
  glean: {
    displayName: "Glean",
    tagline: "Enterprise navy · lilac highlight · trustworthy",
    paper: "252 251 255",     // #FCFBFF
    paperDeep: "245 243 252", // #F5F3FC
    paperCard: "255 255 255",
    ink: "20 20 50",          // #141432 (deep navy)
    inkSoft: "65 65 100",     // #414164
    inkMute: "130 130 170",   // #8282AA
    line: "230 228 245",      // #E6E4F5
    accent: "139 92 246",     // #8B5CF6 (Glean lilac/purple)
    accentSoft: "243 232 255", // #F3E8FF
    glow: "99 102 241",       // #6366F1 (indigo)
    tech: "14 165 233",       // #0EA5E9 (sky blue)
    colorScheme: "light",
    fontSans: '"Inter", "Söhne", "Noto Sans JP", system-ui, sans-serif',
    fontDisplay: '"Inter", "Söhne Breit", "Noto Sans JP", system-ui, sans-serif',
    fontMono: '"JetBrains Mono", "SF Mono", monospace',
    radiusCard: "14px",
    heroBackground: "radial-gradient(circle at 80% 0%, rgba(139,92,246,0.10) 0%, transparent 50%), radial-gradient(circle at 0% 100%, rgba(99,102,241,0.08) 0%, transparent 50%), #FCFBFF",
  },
}

// ─── Industry / pitch_angle → recommended theme mapping ────────────
// Dify workflow が自動 select できなかった場合の fallback として使う。
// 業種 slug は Appexxme 側 industry_templates と同じ vocab を期待。

export const INDUSTRY_THEME_HINT: Record<string, DesignTheme> = {
  // Tech / SaaS / IT
  saas: "raycast",
  software: "raycast",
  it: "raycast",
  ai: "raycast",
  tech: "raycast",
  developer: "raycast",
  api: "raycast",

  // Fintech / Payments / Professional B2B
  fintech: "stripe",
  payments: "stripe",
  banking: "stripe",
  insurance: "stripe",
  consulting: "stripe",
  legal: "stripe",
  accounting: "stripe",
  b2b: "stripe",

  // Creative / Solo / Notes / Knowledge
  creative: "reflect",
  design: "reflect",
  agency: "reflect",
  freelance: "reflect",
  writer: "reflect",
  coach: "reflect",
  education: "reflect",

  // D2C / Lifestyle / Family / Wellness
  d2c: "family",
  ec: "family",
  ecommerce: "family",
  beauty: "family",
  fashion: "family",
  food: "family",
  restaurant: "family",
  wellness: "family",
  lifestyle: "family",
  parenting: "family",

  // Data / Analytics / Marketing
  marketing: "posthog",
  analytics: "posthog",
  data: "posthog",
  growth: "posthog",
  martech: "posthog",
  adtech: "posthog",
  realestate: "posthog",
  manufacturing: "posthog",

  // Enterprise / Knowledge / Search / Healthcare
  enterprise: "glean",
  knowledge: "glean",
  search: "glean",
  healthcare: "glean",
  pharma: "glean",
  government: "glean",
  hr: "glean",
  hrtech: "glean",
}

// pitch_angle と DesignTheme の親和性 (manifest 自動生成用)
export const PITCH_ANGLE_THEME_DEFAULT: Record<string, DesignTheme> = {
  loss: "stripe",         // 客観データ訴求 → クリーンB2B
  opportunity: "raycast", // 上昇訴求 → 未来感ダーク
  trust: "glean",         // 権威訴求 → エンタープライズ
  urgency: "posthog",     // 緊急訴求 → データ警告
  competitive: "posthog", // FOMO/比較 → データ可視化
  compliance: "stripe",   // 規制対応 → 真面目クリーン
}

// ─── Helper: theme → CSS variable injection ────────────────────────

/**
 * テーマトークンを CSS 変数として React.CSSProperties に変換。
 * 既存 globals.css の --paradigm-* 変数を上書きする形で注入する。
 *
 * 使い方: <div style={themeToCssVars(getThemeTokens("raycast"))}>
 */
export function themeToCssVars(tokens: DesignThemeTokens): CSSProperties {
  return {
    // RGB triplet 変数 (Tailwind v4 opacity modifier 互換)
    ["--paradigm-paper" as string]: tokens.paper,
    ["--paradigm-paper-deep" as string]: tokens.paperDeep,
    ["--paradigm-paper-card" as string]: tokens.paperCard,
    ["--paradigm-ink" as string]: tokens.ink,
    ["--paradigm-ink-soft" as string]: tokens.inkSoft,
    ["--paradigm-ink-mute" as string]: tokens.inkMute,
    ["--paradigm-line" as string]: tokens.line,
    ["--paradigm-accent" as string]: tokens.accent,
    ["--paradigm-accent-soft" as string]: tokens.accentSoft,
    ["--paradigm-glow" as string]: tokens.glow,
    ["--paradigm-tech" as string]: tokens.tech,
    // root の light/dark フラグも上書き (color-scheme で system UI 同期)
    colorScheme: tokens.colorScheme,
    // フォント・角丸・hero 背景を CSS 変数として公開
    ["--paradigm-font-sans" as string]: tokens.fontSans,
    ["--paradigm-font-display" as string]: tokens.fontDisplay,
    ["--paradigm-font-mono" as string]: tokens.fontMono,
    ["--paradigm-radius-card" as string]: tokens.radiusCard,
    ["--paradigm-hero-bg" as string]: tokens.heroBackground,
    // Block の root 描画値 (Tailwind class が無くても最低限色がつく)
    fontFamily: tokens.fontSans,
    background: `rgb(${tokens.paper})`,
    color: `rgb(${tokens.ink})`,
  }
}

// ─── Helper: validators ────────────────────────────────────────────

export function isValidDesignTheme(value: unknown): value is DesignTheme {
  return typeof value === "string" && DESIGN_THEMES.includes(value as DesignTheme)
}

/**
 * 業種・pitch_angle・region などから DesignTheme を解決する。
 * 優先度: explicit > industry_hint > pitch_angle_default > "stripe"
 */
export function resolveDesignTheme(input: {
  explicit?: unknown
  industry?: string | null
  pitchAngle?: string | null
}): DesignTheme {
  if (isValidDesignTheme(input.explicit)) return input.explicit
  const industryKey = (input.industry || "").toLowerCase().trim()
  if (industryKey && INDUSTRY_THEME_HINT[industryKey]) {
    return INDUSTRY_THEME_HINT[industryKey]
  }
  // partial match (e.g. "saas-tools" → "saas" hint hit)
  if (industryKey) {
    for (const [k, v] of Object.entries(INDUSTRY_THEME_HINT)) {
      if (industryKey.includes(k) || k.includes(industryKey)) return v
    }
  }
  const angleKey = (input.pitchAngle || "").toLowerCase().trim()
  if (angleKey && PITCH_ANGLE_THEME_DEFAULT[angleKey]) {
    return PITCH_ANGLE_THEME_DEFAULT[angleKey]
  }
  return "stripe"
}

export function getThemeTokens(theme: DesignTheme): DesignThemeTokens {
  return DESIGN_THEME_TOKENS[theme] ?? DESIGN_THEME_TOKENS.stripe
}
