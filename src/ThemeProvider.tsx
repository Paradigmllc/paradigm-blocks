// ─── ThemeProvider — Design Theme CSS-variable injector ─────────────
// B33 (2026-05-07)
//
// 6 design theme (raycast / stripe / reflect / family / posthog / glean) の
// CSS 変数を root level に注入する薄い wrapper。Block 実装は触らない。
//
// 既存 paradigmjpcom globals.css の `--paradigm-*` を上書きする形で
// scoped に再定義する (rootDiv 配下のみ・他ページに漏れない)。
//
// 使い方:
//   <ThemeProvider theme="raycast">
//     <BlockRenderer blocks={...} region="ja" />
//   </ThemeProvider>

import type { ReactNode } from "react"
import {
  type DesignTheme,
  type DesignThemeTokens,
  getThemeTokens,
  themeToCssVars,
  resolveDesignTheme,
} from "./themes"
// B33 Phase 3 (2026-05-08): useDesignTheme() 有効化のため context provider を統合
import { ThemeContextProvider } from "./ThemeContext"

interface ThemeProviderProps {
  /** 明示指定 (DB の meta.design_theme) — legacy fallback path */
  theme?: DesignTheme | null | undefined
  /**
   * D-12 v1.0.0 (2026-05-08): DB design_themes table から fetch 済 token map.
   * tokens が指定されていれば theme は無視して直接 CSS 変数として inject.
   * これにより A-CONTENT 鉄則準拠 (CMS から色を編集可能).
   */
  tokens?: DesignThemeTokens | null
  /** D-12: tokens を引いた origin theme_slug (data-attribute 用・任意) */
  themeSlug?: string | null
  /** 自動 resolve 用 hint (theme/tokens 未指定時のみ使用) */
  industry?: string | null
  pitchAngle?: string | null
  /** RTL/LTR auto-direction (region === "ar" で rtl) */
  dir?: "ltr" | "rtl"
  /** 子コンポーネント */
  children: ReactNode
  /** root tag 上書き (default: div) */
  as?: "div" | "section" | "main"
  /** className 追加 */
  className?: string
}

export function ThemeProvider({
  theme,
  tokens: tokensProp,
  themeSlug,
  industry,
  pitchAngle,
  dir = "ltr",
  children,
  as: Tag = "div",
  className,
}: ThemeProviderProps) {
  // D-12 v1.0.0: DB-injected tokens を最優先 (A-CONTENT 鉄則).
  // tokens 指定なし時のみ legacy hardcoded themes.ts に fallback.
  const resolved: DesignTheme = tokensProp
    ? "stripe"  // sentinel — context にだけ使う. tokens が真の source-of-truth.
    : resolveDesignTheme({
        explicit: theme,
        industry,
        pitchAngle,
      })
  const tokens = tokensProp ?? getThemeTokens(resolved)
  const style = themeToCssVars(tokens)
  const dataThemeAttr = themeSlug ?? resolved

  return (
    <Tag
      data-design-theme={dataThemeAttr}
      data-color-scheme={tokens.colorScheme}
      dir={dir}
      style={style}
      className={className}
    >
      {/* B33 Phase 3 (2026-05-08): ThemeContextProvider で wrap → Block 内で
          useDesignTheme() が resolved theme を返すように. CSS 変数 injection と
          context 伝播を 1 wrapper にまとめる. */}
      <ThemeContextProvider theme={resolved}>
        {children}
      </ThemeContextProvider>
    </Tag>
  )
}

export default ThemeProvider
