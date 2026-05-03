// ─── FooterSignature Block (P39 Batch 2) ───────────────────────────
// 営業サイン + opt-out + 物理住所 (CAN-SPAM 互換).
// Stage 1 フォーム文面でも使う (法的リスク回避: 特定電子メール法 / CAN-SPAM Act 互換).

import type { FooterSignatureProps } from "../types"

export function FooterSignatureBlock({
  signatureLine,
  physicalAddress,
  optOutUrl,
  optOutLabel,
  contactEmail,
  contactPhone,
  corporateNumber,
}: FooterSignatureProps) {
  return (
    <footer className="mt-10 py-10 px-6 border-t border-black/10 bg-slate-50">
      <div className="max-w-3xl mx-auto text-sm text-text-secondary space-y-3">
        <div className="font-semibold text-text-primary">{signatureLine}</div>
        {(contactEmail || contactPhone) && (
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {contactEmail && (
              <a href={`mailto:${contactEmail}`} className="hover:underline">
                ✉ {contactEmail}
              </a>
            )}
            {contactPhone && (
              <a href={`tel:${contactPhone.replace(/[^\d+]/g, "")}`} className="hover:underline">
                ☎ {contactPhone}
              </a>
            )}
          </div>
        )}
        <div className="text-xs">{physicalAddress}</div>
        {corporateNumber && (
          <div className="text-xs">法人番号: {corporateNumber}</div>
        )}
        {optOutUrl && (
          <div className="pt-3 border-t border-black/5">
            <a
              href={optOutUrl}
              className="text-xs underline hover:text-accent"
              rel="noopener noreferrer"
            >
              {optOutLabel || "今後この種のお知らせを受け取らない (opt-out)"}
            </a>
          </div>
        )}
        <div className="pt-2 text-[10px] text-slate-400">
          このメッセージは特定電子メール法および CAN-SPAM Act に準拠しています。
        </div>
      </div>
    </footer>
  )
}
