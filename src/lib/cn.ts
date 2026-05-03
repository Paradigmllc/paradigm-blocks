// ─── cn utility — clsx + tailwind-merge wrapper ──────────────────
// consumer 側の `@/lib/utils` から独立した self-contained 実装。
// Block component が internal で使うのみで再 export はしない。

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
