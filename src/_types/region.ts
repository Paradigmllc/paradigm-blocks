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
