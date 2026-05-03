# @paradigmllc/blocks

Paradigm Sales OS v2 の **Block discriminated union renderer** を切り出した共有 npm パッケージ。
Appexxme (内部) と paradigmjpcom (公開) の両方で同一の Block 描画を保証するために存在する。

## なぜ存在するか

過去 (2026-05-03 以前) は Appexxme と paradigmjpcom それぞれに独立コピーの `BlockRenderer.tsx` が存在し、
Appexxme 側で B31 Phase 5 にて 13 個の専用 Block (`HeroWithUrgency` / `ScoreRing` / `AnnualLossCard` 等) を
追加した結果、**paradigmjpcom 側が 9 タイプ止まりで silently `null` 返却**となり、診断レポートの hero と
カスタム Block が公開ページで全部消えるバグが発生した。

このパッケージはそのバグの**抜本根治**として作られた:

- **唯一の Block 実装ソース** (24 Block + 12 Magic UI + Renderer)
- Appexxme と paradigmjpcom が `transpilePackages` 経由で取り込む
- Block 追加は **このパッケージ 1 箇所のみ**で完結 → 両 repo に自動的に伝播

## 構成

```
src/
├── index.ts              # 全 export エントリポイント
├── types.ts              # Block discriminated union (canonical)
├── BlockRenderer.tsx     # type → component dispatcher (i18n resolution 込み)
├── BlocksReportRenderer.tsx  # /report/[slug] 用 wrapper (滞在時間 + CTA トラッキング)
├── _types/
│   └── region.ts         # SalesRegion type + isValidRegion (inlined・consumer 側 sales-region store と独立)
├── _magicui/             # Magic UI 12 component (NumberTicker / Sparkles / Meteors / ShimmerButton / etc)
├── lib/
│   └── cn.ts             # clsx + tailwind-merge (consumer 側 utils と独立)
└── blocks/               # 24 Block component
    ├── Hero.tsx / FeatureGrid.tsx / Pricing.tsx / CTA.tsx / Testimonial.tsx / FAQ.tsx / Footer.tsx
    ├── VideoEmbed.tsx / HtmlEmbed.tsx
    ├── HeroWithUrgency.tsx / IndustryChart.tsx / CaseStudy.tsx / CTAPremium.tsx / FooterSignature.tsx
    └── ScoreRing.tsx / AnnualLossCard.tsx / TopPainsList.tsx / Prescription.tsx / ExecutiveSummary.tsx / CustomQuote.tsx / Roadmap.tsx / RoiCalculator.tsx
```

## consumer の取り込み方

### 1. install (local dev)

```bash
# Appexxme から
cd D:/dev/appexxme
npm install file:../paradigm-blocks

# paradigmjpcom から
cd D:/dev/paradigmjpcom
npm install file:../paradigm-blocks
```

本番 (Coolify) 用には GitHub に push 後 `"@paradigmllc/blocks": "github:Paradigmllc/paradigm-blocks#v0.1.0"` で固定する。

### 2. next.config 更新

```ts
// next.config.ts (両 repo 共通)
import type { NextConfig } from "next"
const nextConfig: NextConfig = {
  transpilePackages: ["@paradigmllc/blocks"],
  // ...
}
export default nextConfig
```

### 3. 使い方

```tsx
import { BlockRenderer, BlocksReportRenderer } from "@paradigmllc/blocks"
import type { Block, ContentDoc } from "@paradigmllc/blocks/types"

export default function Page({ doc }: { doc: ContentDoc }) {
  return <BlocksReportRenderer doc={doc} slugOrToken={doc.slug} />
}
```

## 設計原則 (永久ルール)

- **Block 追加はこのパッケージのみ**: Appexxme / paradigmjpcom 側に Block component を追加することは禁止
- **Magic UI は内部 bundle**: consumer に Magic UI install を要求しない (`_magicui/` 配下に同梱)
- **Tailwind v4 必須**: consumer 側の Tailwind が `paradigm-blocks/src/**/*.{ts,tsx}` を scan するよう
  `tailwind.config` の content / source パスに含めること
- **i18n is region-aware**: `BlockRenderer` は `silently-JA-leak 防止規律` (非 ja region で JA fallback 不可) を実装
- **API 経路は consumer 側に依存**: `/api/report/[slug]` (滞在時間 sendBeacon) と `/api/cta-click` は
  **consumer の Next.js app 側に存在する前提**で fetch する

## 更新フロー

1. このパッケージ内で Block を追加・変更
2. `npm version patch` で version bump
3. git tag + push
4. consumer 側で `npm update @paradigmllc/blocks`
5. 両 repo で同じバージョンが使われていることを CI で検証 (将来)

## ライセンス

UNLICENSED — Paradigm 合同会社の内部資産。外部公開禁止。
