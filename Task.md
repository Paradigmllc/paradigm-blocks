# Task.md — paradigm-blocks (multi-agent edition)

> @paradigmllc/blocks — discriminated union Block renderer (npm package・appexxme + paradigmjpcom 両 repo 共有).
> 永久ルール **TASK / TASK-CLEAN / ANTI-BLOAT / TEAM-DEV** 準拠 (Global CLAUDE.md).
>
> **🛡️ TEAM-DEV 協業プロトコル** (Claude Code/Codex/Cline/Cursor/Aider/human が並列開発):
> 1. 着手前 `git pull --rebase` + Task.md 確認
> 2. **Owner** + **Lock-since** 記入 → atomic commit + push (lock 取得)
> 3. 4h+ 無 update = stale (override 可)
> 4. 1 task = 1 branch (`agent/{owner}/{slug}`)
> 5. 完了 → ✅ DONE / Owner=- / commit hash 記録
> 詳細 → `~/.claude/knowledge/team-dev-protocol.md`
>
> **重要**: paradigm-blocks 変更時は両 consumer (appexxme + paradigmjpcom) で `npm install github:Paradigmllc/paradigm-blocks#main --save` で lockfile 同期必須.

---

## 🔄 進行中 (multi-agent ロック付き)

| Status | Owner | Lock-since | Branch | Task | Notes |
|--------|-------|-----------|--------|------|-------|
| ⚪ AVAILABLE | - | - | - | (現状なし) | v0.3.0 で B33 Phase 3 全 8/8 完了 |

---

## 📋 未着手 (Multi-agent 取り合い可)

| Priority | Status | Owner | Task | 工数 | Branch (推奨) |
|----------|--------|-------|------|------|---------------|
| P3 | ⚪ AVAILABLE | - | **B33 Phase 3 brand SVG asset** (Family 円形写真 / Raycast spotlight pattern / Stripe code snippet 等を SVG 自前生成 or Magic UI 借用) | 1-2h | `agent/{X}/b33-phase3-brand-svg` |
| P3 | ⚪ AVAILABLE | - | **新規 Block 追加** (現在 Hero/FeatureGrid/Pricing/CTA/Testimonial/FAQ/Footer/VideoEmbed/HtmlEmbed + Personalize 5 + Diagnostic 8 = 22 Block) | 都度 | `agent/{X}/block-{name}` |
| P3 | ⚪ AVAILABLE | - | **TypeScript strict mode 強化** (現在 `strict: true` だが any 残存数件) | 0.5 日 | `agent/{X}/strict-types` |
| P3 | ⚪ AVAILABLE | - | **Magic UI 追加コンポーネント** (Marquee / DotPattern / GridPattern / OrbitingCircles 等) | 1 日 | `agent/{X}/magicui-extend` |

---

## ✅ 完了 (直近 14 日)

| 完了日 | Owner | Task | Commit / Version |
|--------|-------|------|-------------------|
| 2026-05-08 | claude-code | **Task.md 新規作成** (TEAM-DEV protocol 適用) | (本コミット) |
| 2026-05-08 | claude-code | **B33 Phase 3 全 8/8 完遂** + paradigm-blocks v0.3.0 | 5dadd51, 42298b4 |
|  |  | - Phase 3-3 FeatureGrid 6 variant (FGRaycast/FGStripe/FGReflect/FGFamily/FGPosthog/FGGlean) |  |
|  |  | - Phase 3-4 Pricing 6 variant |  |
|  |  | - Phase 3-5 CTA 6 variant |  |
|  |  | - Phase 3-6 Magic UI Spotlight (BorderBeam/ShimmerButton/BentoGrid 既存) |  |
|  |  | - Phase 3-7 themes-showcase 24 セル grid (paradigmjpcom 側) |  |
|  |  | - Phase 3-8 type-check + npm version bump |  |
| 2026-05-07 | claude-code | **B33 Phase 1+2** ThemeContext + ThemeProvider + 6 design themes + Hero 6 variant 作り込み | c639a65, 8348d4a |
| 2026-05-01 | claude-code | **B32 (npm package 化)** + 22 Block discriminated union + BlockRenderer + BlocksReportRenderer | 多数 |

---

## 📝 設計原則 (Block 追加時の必須参照)

### Block 設計鉄則 (npm package・両 repo 共有)
1. **Discriminated union 厳守**: `Block<T>` の `type` field で完全 narrow 可能にする
2. **CSS 変数で theme 切替**: 直接 hex color 書かず `rgb(var(--paradigm-accent))` 等を使う
3. **6 design theme 対応**: 新 Block も 6 variant 別 layout を作るのが原則
4. **No external assets**: 画像/SVG はインライン or props で URL 渡し (npm 配布の柔軟性確保)
5. **TypeScript strict + 0 errors**: 全 commit で TS pre-check 通す

### Block 追加手順
1. `src/types.ts` に新 Block の Props interface 追加
2. `BlockType` discriminated union に追加
3. `BlockProps` map に追加
4. `src/blocks/{NewBlock}.tsx` 実装 (6 variant 推奨)
5. `src/BlockRenderer.tsx` の switch に case 追加
6. `src/index.ts` の export に追加
7. version bump (`package.json` semver: minor for new block・patch for fix)
8. 両 consumer で `npm install` で lockfile 同期 + push

---

## 📦 詳細外出し (このファイルから参照)

| 種別 | 参照先 |
|------|--------|
| **TEAM-DEV 協業プロトコル詳細** | `~/.claude/knowledge/team-dev-protocol.md` |
| **6 design theme 仕様** | `D:/dev/appexxme/docs/refactor/design-themes-rich-blocks.md` |
| **Block 系の使用例 (公開診断レポート)** | appexxme `src/lib/proposal/to-blocks.ts` + appexxme `src/lib/blocks/{to-slidev,to-email-html}.ts` |
| **B33 Phase 2 設計原則** | appexxme `CLAUDE.md` s10-5 #17 |

---

## 🔧 環境情報

- **GitHub repo**: `Paradigmllc/paradigm-blocks`
- **npm package**: `@paradigmllc/blocks` (private GitHub install: `github:Paradigmllc/paradigm-blocks#main`)
- **Latest version**: v0.3.0 (commit 5dadd51)
- **Consumers**:
  - `D:/dev/appexxme` — Sales OS v3 (本番 appexx.me)
  - `D:/dev/paradigmjpcom` — Paradigm HP + 公開診断レポート (本番 paradigmjp.com)
- **Build**: TypeScript ソース直配布 (no build step・consumer 側で `transpilePackages` 必須)
- **Test**: `npm run type-check` (tsc --noEmit) のみ・ユニットテストなし
