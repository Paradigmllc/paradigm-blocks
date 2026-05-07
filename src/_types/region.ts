// ─── Region 型 (canonical) ─────────────────────────────────────────
// Paradigm Sales OS v2 — 12-region (Q9 Phase 1 確定)
// consumer 側の `@/lib/stores/sales-region` と独立した self-contained 定義。
// 両 repo の sales-region.ts は store / カラーテーマ / 通貨 等を派生持つが、
// このパッケージは「型」と「region 検証」だけ要求するため最小実装に留める。

/** 12-region canonical type. consumer 側 SalesRegion と完全互換. */
export type SalesRegion =
  | "ja"
  | "ko"
  | "zh"
  | "en"
  | "europe"
  | "es"
  | "pt"
  | "ru"
  | "ar"
  | "sea"
  | "africa"
  | "others"

const REGION_VALUES: ReadonlySet<SalesRegion> = new Set<SalesRegion>([
  "ja",
  "ko",
  "zh",
  "en",
  "europe",
  "es",
  "pt",
  "ru",
  "ar",
  "sea",
  "africa",
  "others",
])

/**
 * type guard: unknown 値が SalesRegion かを判定。
 * consumer 側の isValidRegion と挙動完全一致 (旧 "jp"/"global" は false を返す前提).
 */
export function isValidRegion(value: unknown): value is SalesRegion {
  return typeof value === "string" && REGION_VALUES.has(value as SalesRegion)
}

// ─── B33 Phase 2 (2026-05-07): region → next-intl locale canonical mapper ──
//
// paradigmjpcom の next-intl localePrefix:"always" は以下 12 locale を中間ルートに持つ。
// SalesRegion 12 値とは 1:1 ではない (europe/sea/africa/others の 4 値は
// 単独 locale を持たないため fallback locale を持つ). この関数が唯一の真実の源.
//
// 永久ルール:
//   - paradigm-blocks 側に置くのは「region → locale」が両 repo (Appexxme + paradigmjpcom)
//     で完全一致しないと silently-mismatch redirect が起きるため.
//   - consumer 側で類似の switch/map を再実装するの禁止 (AE-9 silently-dead-code 防止).

/** next-intl locale (paradigmjpcom 配下で実在する prefix). */
export type ReportLocale =
  | "ja"
  | "en"
  | "ko"
  | "zh"
  | "es"
  | "pt"
  | "ru"
  | "ar"
  | "de"   // europe fallback
  | "fr"   // europe alt
  | "vi"   // sea alt
  | "id"   // sea fallback

/**
 * SalesRegion → ReportLocale 解決.
 * europe/sea/africa/others は地域グループのため単独 locale 化できず
 * 「最も使われる language」に丸める fallback を取る:
 *   - europe → de (DACH 最大市場 + 法令厳しい代表)
 *   - sea → id (SEA 人口最大)
 *   - africa → en (lingua franca)
 *   - others → en (English fallback)
 */
const REGION_TO_LOCALE: Record<SalesRegion, ReportLocale> = {
  ja: "ja",
  ko: "ko",
  zh: "zh",
  en: "en",
  europe: "de",
  es: "es",
  pt: "pt",
  ru: "ru",
  ar: "ar",
  sea: "id",
  africa: "en",
  others: "en",
}

export function regionToLocale(region: SalesRegion | null | undefined): ReportLocale {
  if (!region || !isValidRegion(region)) return "ja"  // intake-gate 既定値と一致
  return REGION_TO_LOCALE[region]
}

/**
 * report 公開 URL を組み立てる. paradigm-hp / appexxme / n8n / Dify 全経路で
 * このヘルパー経由で URL を作る (ハードコード禁止).
 *
 * 例:
 *   buildReportUrl("ja",   "abc-1234") → "https://paradigmjp.com/ja/report/abc-1234"
 *   buildReportUrl("en",   "abc-1234") → "https://paradigmjp.com/en/report/abc-1234"
 *   buildReportUrl("europe", "x")     → "https://paradigmjp.com/de/report/x"
 */
const REPORT_BASE_URL = "https://paradigmjp.com"

export function buildReportUrl(
  region: SalesRegion | null | undefined,
  slug: string,
  options?: { baseUrl?: string },
): string {
  const locale = regionToLocale(region)
  const base = (options?.baseUrl ?? REPORT_BASE_URL).replace(/\/+$/, "")
  return `${base}/${locale}/report/${slug}`
}

/** 全 ReportLocale 一覧 (test / showcase 用). */
export const REPORT_LOCALES: ReadonlyArray<ReportLocale> = [
  "ja", "en", "ko", "zh", "es", "pt", "ru", "ar", "de", "fr", "vi", "id",
]
