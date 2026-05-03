// ─── AnimatedList — 着信メッセージ等の順次アニメーション ────────
// 各 item が下から fade-in + slide-up でアニメ表示
"use client"

import { motion } from "framer-motion"
import { cn } from "../lib/cn"
import type { ReactNode } from "react"

interface AnimatedListProps {
  children: ReactNode[]
  delay?: number
  className?: string
}

export function AnimatedList({ children, delay = 0.05, className }: AnimatedListProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.3,
            delay: i * delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
