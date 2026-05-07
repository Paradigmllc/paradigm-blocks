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
  getThemeTokens,
  themeToCssVars,
  resolveDesignTheme,
} from "./themes"
// B33 Phase 3 (2026-05-08): useDesignTheme() 有効化のため context provider を統合
import { ThemeContextProvider } from "./ThemeContext"

interface ThemeProviderProps {
  /** 明示指定 (DB の meta.design_theme) */
  theme?: DesignTheme | null | undefined
  /** 自動 resolve 用 hint (theme 未指定時のみ使用) */
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
  industry,
  pitchAngle,
  dir = "ltr",
  children,
  as: Tag = "div",
  className,
}: ThemeProviderProps) {
  const resolved = resolveDesignTheme({
    explicit: theme,
    industry,
    pitchAngle,
  })
  const tokens = getThemeTokens(resolved)
  const style = themeToCssVars(tokens)

  return (
    <Tag
      data-design-theme={resolved}
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
