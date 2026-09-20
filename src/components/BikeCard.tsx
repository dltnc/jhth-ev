import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import type { Bike } from '@/payload-types'

import { localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { firstGalleryImage } from '@/lib/media'

import { MediaImage } from './MediaImage'

type Props = {
  bike: Bike
  locale: Locale
  priority?: boolean
}

const vehicleTypeKey = {
  ebike: 'ebike',
  ecycle: 'ecycle',
  escooter: 'escooter',
} as const

export const BikeCard = ({ bike, locale, priority }: Props) => {
  const dict = getDictionary(locale)
  const image = firstGalleryImage(bike.gallery, 'card')
  const href = localePath(locale, `/models/${bike.slug}`)
  const reserveHref = `${localePath(locale, '/reserve')}?model=${encodeURIComponent(bike.slug)}`
  const typeLabel = dict.models[vehicleTypeKey[bike.vehicleType]]

  const specs = [
    { label: dict.detail.range, value: bike.range },
    { label: dict.detail.topSpeed, value: bike.topSpeed },
    { label: dict.detail.motor, value: bike.motor },
  ].filter((spec) => Boolean(spec.value))

  return (
    <article className="group overflow-hidden rounded-lg border border-[var(--border-soft)] bg-white shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <Link
        aria-label={bike.name}
        className="relative block h-60 overflow-hidden bg-[var(--surface-alt)]"
        href={href}
        tabIndex={-1}
      >
        <MediaImage
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          fill
          media={image}
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
        />

        <span className="absolute top-3.5 left-3.5 flex flex-col items-start gap-2">
          {bike.badge ? (
            <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-[11px] font-semibold text-white">
              {bike.badge}
            </span>
          ) : null}
          {bike.status === 'comingSoon' ? (
            <span className="rounded-full bg-[var(--ink)]/85 px-3 py-1 text-[11px] font-semibold text-white">
              {dict.models.comingSoon}
            </span>
          ) : null}
        </span>

        <span className="absolute top-3.5 right-3.5 rounded-full bg-white/92 px-2.5 py-1 text-[11px] font-medium text-[var(--body)]">
          {typeLabel}
        </span>
      </Link>

      <div className="px-5 pt-5 pb-[22px]">
        <div className="mb-3.5">
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--fg)]">
            <Link className="transition-colors hover:text-[var(--accent)]" href={href}>
              {bike.name}
            </Link>
          </h3>
          {bike.tagline ? (
            <p className="mt-0.5 line-clamp-1 text-xs text-[var(--muted)]">{bike.tagline}</p>
          ) : null}
        </div>

        {specs.length ? (
          <dl className="mb-4 grid grid-cols-3 overflow-hidden rounded-md bg-[var(--bg-subtle)]">
            {specs.map((spec, index) => (
              <div
                className={`px-2 py-2.5 text-center ${
                  index < specs.length - 1 ? 'border-r border-[var(--border)]' : ''
                }`}
                key={spec.label}
              >
                <dd className="num text-base leading-none text-[var(--fg)]">{spec.value}</dd>
                <dt className="mt-0.5 text-[10px] text-[var(--muted)]">{spec.label}</dt>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] text-[var(--muted)]">{dict.common.priceOnRequest}</p>
          <div className="flex gap-2">
            <Link className="btn btn-sm btn-primary" href={reserveHref}>
              {bike.status === 'comingSoon' ? dict.actions.reserveNow : dict.actions.buyNow}
            </Link>
            <Link className="btn btn-sm btn-secondary" href={href}>
              {dict.actions.knowMore}
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
