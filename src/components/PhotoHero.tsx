import Link from 'next/link'

import type { ResolvedMedia } from '@/lib/media'

import { MediaImage } from './MediaImage'

type Props = {
  ctaHref?: string
  ctaLabel?: string
  eyebrow?: string
  media?: null | ResolvedMedia
  sub?: string
  title: string
}

/**
 * The design's inner-page photo hero: dimmed image, left-to-right black
 * gradient, oversized display title and one green CTA.
 */
export const PhotoHero = ({ ctaHref, ctaLabel, eyebrow, media, sub, title }: Props) => (
  <section className="relative min-h-[420px] overflow-hidden bg-[var(--ink)]">
    <MediaImage
      className="object-cover opacity-45"
      fill
      media={media ?? null}
      priority
      sizes="100vw"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/35" />

    <div className="shell relative z-[1] pt-18 pb-16">
      {eyebrow ? <p className="eyebrow-light mb-3">{eyebrow}</p> : null}
      <h1 className="mb-4 font-[family-name:var(--font-display)] text-[clamp(36px,5.5vw,68px)] leading-none font-bold text-white">
        {title}
      </h1>
      {sub ? (
        <p className="mb-7 max-w-[520px] text-base leading-[1.7] text-white/75">{sub}</p>
      ) : null}
      {ctaHref && ctaLabel ? (
        <Link className="btn btn-primary" href={ctaHref}>
          {ctaLabel}
        </Link>
      ) : null}
    </div>
  </section>
)
