// ─── Marquee — 信頼バッジ等の自動スクロール ───────────────────────
// MagicUI 流の流すアニメーション (CSS animation ベース・軽量)
// 用途: 顧客ロゴ列 / 信頼バッジ / トレンド指標 のループ表示
"use client"

import { cn } from "../lib/cn"
import type { ComponentPropsWithoutRef } from "react"

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  reverse?: boolean
  pauseOnHover?: boolean
  vertical?: boolean
  repeat?: number
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className,
      )}
    >
      {Array(repeat).fill(0).map((_, i) => (
        <div
          key={i}
          className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
            "animate-marquee flex-row": !vertical,
            "animate-marquee-vertical flex-col": vertical,
            "group-hover:[animation-play-state:paused]": pauseOnHover,
            "[animation-direction:reverse]": reverse,
          })}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
