"use client"
// ─── ThemeContext + useDesignTheme() hook — B33 Phase 3 (2026-05-08) ────
//
// 6 design theme (raycast/stripe/reflect/family/posthog/glean) を Block 内で
// 取得するための React Context. ThemeProvider が children を context wrap
// することで Hero/FeatureGrid/Pricing/CTA 等の Block が `useDesignTheme()`
// で現在のテーマを参照し theme 別 layout に分岐する.
//
// 設計仕様: D:/dev/appexxme/docs/refactor/design-themes-rich-blocks.md
//
// なぜ Approach B (context) なのか:
//   Approach A (props drilling) だと Block 親が theme を全 child に
//   渡し続ける必要があり tree depth が深いと冗長. context なら
//   ThemeProvider 直下の任意の Block で `useDesignTheme()` 呼び出し可能.

import { createContext, useContext, type ReactNode } from "react"
import type { DesignTheme } from "./themes"

const ThemeCtx = createContext<DesignTheme>("stripe")

/**
 * 現在の design theme を返す hook.
 * ThemeContextProvider 配下で呼び出すこと. provider 不在時は "stripe" を返す
 * (B2B 王道 default・最小リスク).
 */
export function useDesignTheme(): DesignTheme {
  return useContext(ThemeCtx)
}

interface Props {
  theme: DesignTheme
  children: ReactNode
}

/**
 * Block 内で `useDesignTheme()` を有効化するための Provider.
 * 既存 ThemeProvider (CSS 変数 inject) と組み合わせて使う:
 *
 * @example
 * <ThemeProvider theme={resolved}>            // CSS 変数 inject (既存)
 *   <ThemeContextProvider theme={resolved}>  // useDesignTheme() 有効化 (new)
 *     <BlockRenderer blocks={...} region="ja" />
 *   </ThemeContextProvider>
 * </ThemeProvider>
 *
 * 将来的には ThemeProvider に統合予定 (Phase 8 で 1 wrapper にまとめる).
 */
export function ThemeContextProvider({ theme, children }: Props) {
  return <ThemeCtx.Provider value={theme}>{children}</ThemeCtx.Provider>
}
