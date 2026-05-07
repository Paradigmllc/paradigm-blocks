// ─── Spotlight ───────────────────────────────────────────────────────
// Magic UI primitive — radial gradient spotlight overlay.
// マウス追従なしの「常時 on」軽量版（hero / CTA 背景に重ねる用途）.
//
// 親要素に `relative` または `position` 指定が必須.
// Spotlight 自体は absolute で overlay され pointer-events: none.
//
// 用途: Hero (raycast) / CTA (raycast) / Pricing card hover / dark theme 全般
// ─────────────────────────────────────────────────────────────────────

"use client"

import { cn } from "../lib/cn"

interface SpotlightProps {
  /** spotlight の中心 % (X 座標・default 50) */
  cx?: number
  /** spotlight の中心 % (Y 座標・default 30) */
  cy?: number
  /** 主要光源の色 (rgba 推奨) */
  colorPrimary?: string
  /** 副次光源の色 (二重 gradient) */
  colorSecondary?: string
  /** 光の広がり % (default 50) */
  spread?: number
  /** 透明度 0-1 (default 0.18) */
  opacity?: number
  className?: string
}

export function Spotlight({
  cx = 50,
  cy = 30,
  colorPrimary = "rgba(255, 99, 130, 0.35)",
  colorSecondary = "rgba(120, 90, 240, 0.25)",
  spread = 50,
  opacity = 0.85,
  className,
}: SpotlightProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      style={{
        opacity,
        background: `radial-gradient(ellipse ${spread * 2}% ${spread * 1.5}% at ${cx}% ${cy}%, ${colorPrimary} 0%, ${colorSecondary} 35%, transparent 70%)`,
        mixBlendMode: "screen",
      }}
    />
  )
}

/**
 * SpotlightGroup — 複数 Spotlight を一発で重ねる convenience wrapper.
 * raycast 系の dramatic dark hero に最適.
 */
export function SpotlightGroup({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <Spotlight cx={20} cy={10} colorPrimary="rgba(255, 99, 130, 0.40)" colorSecondary="rgba(120, 90, 240, 0.20)" spread={40} />
      <Spotlight cx={80} cy={80} colorPrimary="rgba(120, 90, 240, 0.40)" colorSecondary="rgba(100, 200, 255, 0.20)" spread={50} />
    </div>
  )
}
