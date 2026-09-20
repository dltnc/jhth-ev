import type { Testimonial } from '@/payload-types'

import { resolveMedia } from '@/lib/media'

import { Icon } from './Icon'
import { MediaImage } from './MediaImage'

type Props = {
  testimonial: Testimonial
}

export const TestimonialCard = ({ testimonial }: Props) => {
  const photo = resolveMedia(testimonial.photo, 'thumbnail')
  const rating = Math.max(0, Math.min(5, Math.round(testimonial.rating ?? 0)))
  const model =
    typeof testimonial.modelPurchased === 'object' && testimonial.modelPurchased
      ? testimonial.modelPurchased.name
      : null

  return (
    <figure className="flex h-full flex-col rounded-lg border border-[var(--border-soft)] bg-white px-7 py-8 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
      <svg
        aria-hidden="true"
        className="mb-4 fill-[var(--accent)] opacity-20"
        height="24"
        viewBox="0 0 34 24"
        width="32"
      >
        <path d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0l1.6 2.4C10.4 4 7.2 7.6 7.2 12H12V24H0zm18 0V14.4C18 6.4 22.8 1.6 32.4 0l1.6 2.4C28.4 4 25.2 7.6 25.2 12H30V24H18z" />
      </svg>

      <blockquote className="flex-1 text-[14.5px] leading-[1.75] text-[#444] italic">
        “{testimonial.quote}”
      </blockquote>

      {rating > 0 ? (
        <div aria-label={`${rating} / 5`} className="mt-4 flex gap-0.5 text-[var(--accent)]">
          {Array.from({ length: rating }).map((_, index) => (
            <Icon key={index} name="star" size={14} />
          ))}
        </div>
      ) : null}

      <figcaption className="mt-6 flex items-center gap-3">
        {photo ? (
          <span className="relative size-[42px] shrink-0 overflow-hidden rounded-full">
            <MediaImage className="object-cover" fill media={photo} sizes="42px" />
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="num flex size-[42px] shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-lg text-white"
          >
            {testimonial.name.trim().charAt(0).toUpperCase()}
          </span>
        )}
        <span>
          <span className="num block text-lg leading-tight text-[var(--fg)]">
            {testimonial.name}
          </span>
          {model ? <span className="block text-xs text-[var(--muted)]">{model}</span> : null}
        </span>
      </figcaption>
    </figure>
  )
}
