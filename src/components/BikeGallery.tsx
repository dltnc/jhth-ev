'use client'

import { useState } from 'react'

import type { ResolvedMedia } from '@/lib/media'

import { MediaImage } from './MediaImage'

type Props = {
  images: ResolvedMedia[]
  label: string
}

export const BikeGallery = ({ images, label }: Props) => {
  const [active, setActive] = useState(0)
  const current = images[active] ?? null

  return (
    <div>
      <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        <MediaImage
          className="object-cover"
          fill
          media={current}
          priority
          sizes="(max-width: 1024px) 100vw, 640px"
        />
      </div>

      {images.length > 1 ? (
        <ul aria-label={label} className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <li key={image.url}>
              <button
                aria-current={index === active}
                className={`relative block h-16 w-20 shrink-0 overflow-hidden rounded-lg border transition-colors ${
                  index === active
                    ? 'border-[var(--accent)]'
                    : 'border-[var(--border)] hover:border-[var(--accent)]'
                }`}
                onClick={() => setActive(index)}
                type="button"
              >
                <MediaImage className="object-cover" fill media={image} sizes="80px" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
