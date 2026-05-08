// ─── KarteConsultation — ご相談 (D-12 v1.0.0) ────────────────────
// Cal.com 30分予約 1 ボタン + 担当医署名 (footer 一体化).
// CTA は CSS 変数の accent 色で構成 (Tailwind 色禁止).
// ──────────────────────────────────────────────────────────────────

import type { KarteConsultationProps } from "../../types"

export function KarteConsultationBlock({
  heading,
  subheading,
  bookingUrl,
  ctaLabel,
  durationMinutes,
  brandVoice,
  labels: _labels,
}: KarteConsultationProps) {
  return (
    <section
      style={{
        background: "rgb(var(--paradigm-paper-deep))",
        color: "rgb(var(--paradigm-ink))",
        borderTop: "1px solid rgb(var(--paradigm-line))",
      }}
      className="px-6 py-20 md:py-28"
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* section heading (大きめ・center) */}
        <h2
          style={{
            color: "rgb(var(--paradigm-ink))",
            fontFamily: "var(--paradigm-font-display)",
            letterSpacing: "-0.01em",
          }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          {heading}
        </h2>
        {subheading && (
          <p
            style={{ color: "rgb(var(--paradigm-ink-soft))" }}
            className="text-base md:text-lg mb-12"
          >
            {subheading}
          </p>
        )}

        {/* CTA button */}
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cta-track="karte_consultation"
          style={{
            background: "rgb(var(--paradigm-accent))",
            color: "rgb(var(--paradigm-paper))",
            borderRadius: "var(--paradigm-radius-card)",
            fontFamily: "var(--paradigm-font-sans)",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
            boxShadow: "0 8px 24px -8px rgb(var(--paradigm-accent) / 0.5)",
          }}
          className="inline-flex items-center justify-center gap-3 px-10 py-5 text-base md:text-lg font-bold hover:scale-[1.02] hover:shadow-2xl"
        >
          <span>{ctaLabel}</span>
          <span aria-hidden style={{ opacity: 0.75 }} className="text-sm">
            ({durationMinutes} min)
          </span>
        </a>

        {/* doctor signature (footer) */}
        <div
          style={{
            color: "rgb(var(--paradigm-ink-mute))",
            borderTop: "1px solid rgb(var(--paradigm-line))",
          }}
          className="mt-20 pt-8 text-xs md:text-sm"
        >
          <div
            style={{ fontFamily: "var(--paradigm-font-mono)" }}
            className="uppercase tracking-widest mb-2"
          >
            {brandVoice.clinicName}
          </div>
          <div style={{ color: "rgb(var(--paradigm-ink-soft))" }}>
            {brandVoice.doctorSignature}
          </div>
          {(brandVoice.disclaimerPrivacy || brandVoice.disclaimerTokushoho) && (
            <div className="mt-6 space-y-1.5 max-w-md mx-auto text-[11px] leading-relaxed">
              {brandVoice.disclaimerPrivacy && <p>{brandVoice.disclaimerPrivacy}</p>}
              {brandVoice.disclaimerTokushoho && <p>{brandVoice.disclaimerTokushoho}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
