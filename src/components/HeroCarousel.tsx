'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import type { ResolvedMedia } from '@/lib/media'

import { MediaImage } from './MediaImage'

export type HeroSlide = {
  /** Optional: a CMS slide may leave the pill empty. */
  badge?: string
  ctaHref: string
  ctaLabel: string
  media: null | ResolvedMedia
  sub?: string
  title: string
}

type Props = {
  scrollLabel: string
  secondaryHref: string
  secondaryLabel: string
  slideLabel: string
  slides: HeroSlide[]
}

const FADE_MS = 350
const INTERVAL_MS = 5000

export const HeroCarousel = ({
  scrollLabel,
  secondaryHref,
  secondaryLabel,
  slideLabel,
  slides,
}: Props) => {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)
  const fadeTimer = useRef<null | ReturnType<typeof setTimeout>>(null)

  // Cross-fade: hide, swap the slide behind the fade, then reveal.
  const swap = (next: number) => {
    setFading(true)
    fadeTimer.current = setTimeout(() => {
      setActive(next)
      setFading(false)
    }, FADE_MS)
  }

  useEffect(() => {
    if (slides.length < 2) return

    const interval = setInterval(() => {
      setFading(true)
      fadeTimer.current = setTimeout(() => {
        setActive((current) => (current + 1) % slides.length)
        setFading(false)
      }, FADE_MS)
    }, INTERVAL_MS)

    return () => {
      clearInterval(interval)
      if (fadeTimer.current) clearTimeout(fadeTimer.current)
    }
  }, [slides.length])

  const slide = slides[active]

  if (!slide) return null

  return (
    <section className="relative -mt-[68px] h-screen min-h-[580px] overflow-hidden bg-[#1a2a20]">
      <div className="absolute inset-0">
        <MediaImage
          className={`object-cover transition-opacity duration-[400ms] ${
            fading ? 'opacity-0' : 'opacity-[0.65]'
          }`}
          fill
          media={slide.media}
          priority
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-black/30 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black/50" />

      <div className="shell relative z-[2] flex h-full flex-col justify-center pt-[68px]">
        <div
          className={`transition-[opacity,transform] duration-[400ms] ${
            fading ? 'translate-y-3 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          {slide.badge ? (
            <span className="mb-5 inline-block rounded-full bg-[var(--accent)] px-3.5 py-[5px] text-[11px] font-semibold tracking-[1.5px] text-white uppercase">
              {slide.badge}
            </span>
          ) : null}
          <h1 className="mb-5 max-w-[680px] font-[family-name:var(--font-display)] text-[clamp(44px,6.5vw,88px)] leading-none font-bold tracking-[-0.5px] whitespace-pre-line text-white">
            {slide.title}
          </h1>
          {slide.sub ? (
            <p className="mb-9 max-w-[440px] text-base leading-[1.7] font-light text-white/82">
              {slide.sub}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-3.5">
            <Link className="btn btn-primary" href={slide.ctaHref}>
              {slide.ctaLabel}
            </Link>
            <Link className="btn btn-glass" href={secondaryHref}>
              {secondaryLabel}
            </Link>
          </div>
        </div>

        {slides.length > 1 ? (
          <div className="absolute bottom-10 left-6 z-[3] flex gap-2">
            {slides.map((item, index) => (
              <button
                aria-current={index === active ? 'true' : undefined}
                aria-label={`${slideLabel} ${index + 1}`}
                className={`h-2 rounded-full transition-[width,background-color] duration-300 ${
                  index === active ? 'w-7 bg-[var(--accent)]' : 'w-2 bg-white/45'
                }`}
                key={`${index}-${item.title}`}
                onClick={() => {
                  if (!fading && index !== active) swap(index)
                }}
                type="button"
              />
            ))}
          </div>
        ) : null}

        <div className="pointer-events-none absolute right-6 bottom-9 hidden flex-col items-center gap-2 sm:flex">
          <span className="text-[10px] tracking-[2px] text-white/40 uppercase [writing-mode:vertical-rl]">
            {scrollLabel}
          </span>
          <span className="h-11 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  )
}
