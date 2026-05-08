"use client"

// ─── BlocksReportRenderer — cms_content_blocks 専用 公開ページラッパー ──
// Phase 3-B (2026-05-01)
//
// `/report/[slug]` の Stage 0 (cms_content_blocks ヒット) で使用される薄い wrapper。
// 役割:
//   - BlockRenderer で blocks 描画
//   - Footer を統一 (©Paradigm + Confidential)
//   - 滞在時間トラッキング (sendBeacon /api/report/[slug])
//   - CTA クリックトラッキング (data-cta-track 属性付き <a> を捕捉)
//
// 設計:
//   - 親 (/report/[token]/page.tsx) で fetch 済みの ContentDoc を受け取るだけ
//   - 重複ロード回避のため fetch は親に委譲
//   - region は ContentDoc.region から取得 (null の場合は ja default)

import { useEffect, useRef, useState } from "react"
import type { ContentDoc } from "./types"
import { BlockRenderer } from "./BlockRenderer"
import type { SalesRegion } from "./_types/region"
import { isValidRegion } from "./_types/region"
// Batch 12-C: Magic UI gorgeous reveal (hopeful only)
import { Confetti } from "./_magicui/confetti"
// B33 (2026-05-07): 6-design theme injection
import { ThemeProvider } from "./ThemeProvider"
import { isValidDesignTheme, type DesignTheme, type DesignThemeTokens } from "./themes"

interface Props {
  doc: ContentDoc
  /** /report/[token] に渡された URL identifier (slug or token) */
  slugOrToken: string
}

export default function BlocksReportRenderer({ doc, slugOrToken }: Props) {
  const startTime = useRef(Date.now())
  const region: SalesRegion = isValidRegion(doc.region) ? doc.region : "ja"
  // Batch 12-C: hopeful 等の positive urgency でレポート閲覧時に祝祭 confetti
  const urgencyLabel = (doc.meta?.personalize_urgency_label as string | undefined) ?? null
  const [showConfetti, setShowConfetti] = useState(false)

  // B33 (2026-05-07): design_theme 解決 (meta.design_theme > industry > pitch_angle > "stripe")
  const explicitTheme: DesignTheme | undefined = isValidDesignTheme(doc.meta?.design_theme)
    ? (doc.meta.design_theme as DesignTheme)
    : undefined
  const themeIndustry = (doc.meta?.industry as string | undefined) ?? null
  const themePitchAngle = (doc.meta?.pitch_angle as string | undefined) ?? null
  // D-12 v1.0.0 (2026-05-08): DB design_themes table から fetch 済 token を embed (composer 経路).
  // meta.design_tokens があれば ThemeProvider に直接 inject (CMS 編集対応・A-CONTENT 鉄則).
  const designTokens = (doc.meta?.design_tokens as DesignThemeTokens | undefined) ?? null
  // theme_slug: D-12 では "karte_clinic" 等 hardcoded themes.ts に無い slug が来うるので
  //   ThemeProvider に themeSlug prop で data-design-theme attribute を上書き.
  const themeSlug = typeof doc.meta?.design_theme === "string" ? (doc.meta.design_theme as string) : null
  useEffect(() => {
    if (urgencyLabel === "hopeful") {
      const t = setTimeout(() => setShowConfetti(true), 800)
      return () => clearTimeout(t)
    }
  }, [urgencyLabel])

  // 滞在時間トラッキング (V1/V2 と同じ /api/report/[token] エンドポイント)
  useEffect(() => {
    const sendDuration = () => {
      const seconds = Math.round((Date.now() - startTime.current) / 1000)
      if (seconds > 3) {
        try {
          navigator.sendBeacon(
            `/api/report/${slugOrToken}`,
            JSON.stringify({ duration_seconds: seconds }),
          )
        } catch {
          // sendBeacon 失敗時は静かに諦める (V1/V2 と同挙動)
        }
      }
    }
    window.addEventListener("beforeunload", sendDuration)
    return () => window.removeEventListener("beforeunload", sendDuration)
  }, [slugOrToken])

  // CTA クリックトラッキング (BlockRenderer 配下の <a> で data-cta-track="1" を持つもの)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const link = target.closest<HTMLAnchorElement>("a[data-cta-track]")
      if (!link) return
      const source = link.getAttribute("data-cta-source") || "block_cta"
      try {
        fetch("/api/cta-click", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: slugOrToken, source }),
          keepalive: true,
        }).catch(() => {})
      } catch {
        // noop — トラッキング失敗で遷移は止めない
      }
    }
    document.addEventListener("click", handler)
    return () => document.removeEventListener("click", handler)
  }, [slugOrToken])

  return (
    <ThemeProvider
      theme={explicitTheme}
      tokens={designTokens}
      themeSlug={themeSlug}
      industry={themeIndustry}
      pitchAngle={themePitchAngle}
      dir={region === "ar" ? "rtl" : "ltr"}
      className="min-h-screen"
    >
      <div
        data-cms-slug={doc.slug}
        data-page-type={doc.page_type}
        style={{
          minHeight: "100vh",
          background: "rgb(var(--paradigm-paper))",
          color: "rgb(var(--paradigm-ink))",
        }}
      >
        {showConfetti && (
          <Confetti className="fixed inset-0 z-50 pointer-events-none" />
        )}
        <BlockRenderer blocks={doc.blocks} region={region} />

        <footer
          style={{
            borderTop: "1px solid rgb(var(--paradigm-line))",
            marginTop: "32px",
            padding: "24px 16px",
            textAlign: "center",
            background: "rgb(var(--paradigm-paper-deep))",
          }}
        >
          <p style={{ fontSize: 10, color: "rgb(var(--paradigm-ink-mute))" }}>
            © {new Date().getFullYear()} Paradigm合同会社
          </p>
          {doc.title && (
            <p style={{ fontSize: 10, color: "rgb(var(--paradigm-ink-mute))", marginTop: 4 }}>
              Confidential — {doc.title}
            </p>
          )}
        </footer>
      </div>
    </ThemeProvider>
  )
}
