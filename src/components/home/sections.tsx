import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import type { ResolvedMedia } from '@/lib/media'
import type { Bike } from '@/payload-types'

import { localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { externalHref, internalHref, text } from '@/lib/cms'
import { formatNumber } from '@/lib/format'
import { getSiteSettings } from '@/lib/site'

import { BikeCard } from '../BikeCard'
import { Icon } from '../Icon'
import { MediaImage } from '../MediaImage'

/** A copy block that an editor can override from the Homepage global. */
type Copy = { body?: null | string; eyebrow?: null | string; heading?: null | string }

/** Icon + title (+ body) rows, shared by the dictionary and the CMS arrays. */
type Pillar = { body?: null | string; icon?: null | string; title: string }

/** Featured grid on the light band, with the design's "View all" arrow link. */
export const ProductRange = ({
  bikes,
  eyebrow,
  heading,
  locale,
}: { bikes: Bike[]; locale: Locale } & Pick<Copy, 'eyebrow' | 'heading'>) => {
  const dict = getDictionary(locale)

  if (!bikes.length) return null

  return (
    <section className="bg-[var(--bg-subtle)] py-20" id="products">
      <div className="shell">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow mb-2.5">{text(eyebrow, dict.home.lineupEyebrow)}</p>
            <h2 className="section-title font-[family-name:var(--font-display)] font-bold">
              {text(heading, dict.home.lineupHeading)}
            </h2>
          </div>
          <Link
            className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
            href={localePath(locale, '/models')}
          >
            {dict.actions.viewAll}
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 nav:grid-cols-3">
          {bikes.map((bike, index) => (
            <li key={bike.id}>
              <BikeCard bike={bike} locale={locale} priority={index === 0} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Green band of counters directly under the hero. */
export const StatsBar = ({
  dealerCount,
  items,
  locale,
  modelCount,
}: {
  dealerCount: number
  /** CMS-authored counters, rendered exactly as typed (no derived "+"). */
  items?: { label: string; value: string }[]
  locale: Locale
  modelCount: number
}) => {
  const dict = getDictionary(locale)

  const derived = [
    { label: dict.home.statsModels, suffix: '+', value: formatNumber(modelCount, locale) },
    { label: dict.home.statsDivisions, suffix: '+', value: formatNumber(8, locale) },
    { label: dict.home.statsDealers, suffix: '+', value: formatNumber(dealerCount, locale) },
    { label: dict.home.statsRiders, suffix: '+', value: formatNumber(50000, locale) },
  ]

  const stats = items?.length
    ? items.map((item) => ({ label: item.label, suffix: '', value: item.value }))
    : derived

  return (
    <div className="bg-[var(--accent)]">
      <dl className="shell grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            className={`px-5 py-7 text-center ${
              index < stats.length - 1 ? 'md:border-r md:border-white/20' : ''
            }`}
            key={`${index}-${stat.label}`}
          >
            <dd className="num text-4xl leading-none text-white">
              {stat.value}
              {stat.suffix ? <span className="text-[22px]">{stat.suffix}</span> : null}
            </dd>
            <dt className="mt-1 text-xs tracking-[0.3px] text-white/75">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  )
}

/** Centred mission statement on the light band. */
export const Mission = ({
  body,
  eyebrow,
  heading,
  image,
  locale,
}: { image?: null | ResolvedMedia; locale: Locale } & Copy) => {
  const dict = getDictionary(locale)

  return (
    <section className="bg-[var(--bg-subtle)] px-6 py-20 text-center">
      <div className="mx-auto max-w-[820px]">
        <p className="eyebrow mb-3.5">{text(eyebrow, dict.home.missionEyebrow)}</p>
        <h2 className="mb-5 font-[family-name:var(--font-display)] text-[clamp(32px,4.5vw,56px)] leading-[1.05] font-bold">
          {text(heading, dict.home.missionHeading)}
        </h2>
        <p className="mb-9 text-base leading-[1.8] text-[var(--body)]">
          {text(body, dict.home.missionBody)}
        </p>
        <Link className="btn btn-primary" href={localePath(locale, '/models')}>
          {dict.actions.exploreRange}
        </Link>

        {image ? (
          <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-xl shadow-card">
            <MediaImage
              className="object-cover"
              fill
              media={image}
              sizes="(max-width: 900px) 100vw, 820px"
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}

/** Four hover cards: the design's "pillars of excellence". */
export const Features = ({
  eyebrow,
  heading,
  items,
  locale,
}: { items?: Pillar[]; locale: Locale } & Pick<Copy, 'eyebrow' | 'heading'>) => {
  const dict = getDictionary(locale)

  const features: Pillar[] = items?.length ? items : dict.home.features

  return (
    <section className="bg-white py-20">
      <div className="shell">
        <div className="mb-13 text-center">
          <p className="eyebrow mb-2.5">{text(eyebrow, dict.home.featuresEyebrow)}</p>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(30px,4vw,48px)] leading-[1.1] font-bold">
            {text(heading, dict.home.featuresHeading)}
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 nav:grid-cols-4">
          {features.map((feature, index) => (
            <li
              className="rounded-lg border border-[var(--border-soft)] bg-white px-6 py-8 transition-colors duration-250 hover:border-[var(--border-hover)] hover:bg-[var(--bg-subtle)]"
              key={`${index}-${feature.title}`}
            >
              <span
                aria-hidden="true"
                className="mb-4.5 flex size-13 items-center justify-center rounded-[10px] bg-[var(--accent-tint)] text-2xl"
              >
                {feature.icon}
              </span>
              <h3 className="mb-2.5 font-[family-name:var(--font-display)] text-[22px] font-bold">
                {feature.title}
              </h3>
              <p className="text-sm leading-[1.7] text-[#666]">{feature.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Dark green banner pushing the dealer-application page. */
export const RevBanner = ({
  body,
  ctaUrl,
  heading,
  label,
  locale,
}: { ctaUrl?: null | string; label?: null | string; locale: Locale } & Copy) => {
  const dict = getDictionary(locale)

  const href = internalHref(ctaUrl, locale, localePath(locale, '/dealers'))

  return (
    <section className="relative min-h-[400px] overflow-hidden bg-[var(--accent-deep)]">
      <div className="relative z-[1] mx-auto max-w-[760px] px-6 py-20 text-center">
        <h2 className="mb-4.5 font-[family-name:var(--font-display)] text-[clamp(32px,5vw,60px)] leading-[1.05] font-bold text-white">
          {text(heading, dict.home.revHeading)}
        </h2>
        <p className="mb-8 text-[15px] leading-[1.75] text-white/78">
          {text(body, dict.home.revBody)}
        </p>
        <Link className="btn btn-light" href={href}>
          {text(label, dict.actions.becomeDealer)}
        </Link>
      </div>
    </section>
  )
}

/** Phone + email strip above the footer. */
export const ContactStrip = async ({ locale }: { locale: Locale }) => {
  const dict = getDictionary(locale)
  const settings = await getSiteSettings(locale)

  const items = [
    settings?.phone
      ? {
          href: `tel:${settings.phone.replace(/\s+/g, '')}`,
          icon: 'phone' as const,
          label: dict.home.callUs,
          value: settings.phone,
        }
      : null,
    settings?.email
      ? {
          href: `mailto:${settings.email}`,
          icon: 'mail' as const,
          label: dict.home.emailUs,
          value: settings.email,
        }
      : null,
  ].filter((item): item is NonNullable<typeof item> => item !== null)

  if (!items.length) return null

  return (
    <section className="bg-[var(--bg-subtle)] px-6 py-15">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6">
        <div>
          <h2 className="mb-1.5 font-[family-name:var(--font-display)] text-[28px] font-bold">
            {dict.home.contactHeading}
          </h2>
          <p className="text-sm text-[#666]">{dict.home.contactBody}</p>
        </div>

        <div className="flex flex-wrap gap-8">
          {items.map((item) => (
            <div className="flex items-center gap-3" key={item.icon}>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                <Icon name={item.icon} size={18} />
              </span>
              <span className="block">
                <span className="block text-[11px] text-[var(--muted)]">{item.label}</span>
                <a
                  className="num block text-lg text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
                  href={item.href}
                >
                  {item.value}
                </a>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Left: app pitch + store buttons. Right: a CSS mock of the app dashboard. */
export const AppBanner = ({
  appStoreLabel,
  appStoreUrl,
  body,
  eyebrow,
  heading,
  image,
  locale,
  playStoreLabel,
  playStoreUrl,
  points,
}: {
  appStoreLabel?: null | string
  appStoreUrl?: null | string
  /** Editor-supplied preview image; falls back to the built-in CSS mock. */
  image?: null | ResolvedMedia
  locale: Locale
  playStoreLabel?: null | string
  playStoreUrl?: null | string
  /** CMS bullet list; falls back to the translated one. */
  points?: string[]
} & Copy) => {
  const dict = getDictionary(locale)

  const tiles = [
    { label: dict.home.appToday, value: '32 km' },
    { label: dict.home.appCo2, value: '5.8 kg' },
    { label: dict.home.appSpeed, value: '0 km/h' },
    { label: dict.home.appTemp, value: '29°C' },
  ]

  const bullets = points?.length ? points : dict.home.appPoints

  // Each badge stays a plain <span> until an editor supplies a store URL.
  const stores = [
    { href: externalHref(appStoreUrl, locale), label: text(appStoreLabel, dict.home.appStore) },
    {
      href: externalHref(playStoreUrl, locale),
      label: text(playStoreLabel, dict.home.playStore),
    },
  ]

  const storeClass = 'flex items-center gap-2.5 rounded-md bg-[var(--ink)] px-5 py-2.5'

  return (
    <section className="bg-white py-20">
      <div className="shell grid grid-cols-1 items-center gap-16 nav:grid-cols-2">
        <div>
          <p className="eyebrow mb-3">{text(eyebrow, dict.home.appEyebrow)}</p>
          <h2 className="mb-4.5 font-[family-name:var(--font-display)] text-[clamp(30px,4vw,48px)] leading-[1.1] font-bold">
            {text(heading, dict.home.appHeading)}
          </h2>
          <p className="mb-7 text-[15px] leading-[1.75] text-[var(--body)]">
            {text(body, dict.home.appBody)}
          </p>

          <ul className="mb-8 flex flex-col gap-3">
            {bullets.map((point, index) => (
              <li
                className="flex items-center gap-2.5 text-sm text-[#444]"
                key={`${index}-${point}`}
              >
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent-tint)] text-[var(--accent)]">
                  <Icon name="check" size={11} />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            {stores.map((store) => {
              const badge = (
                <>
                  <span className="block text-left">
                    <span className="num block text-[15px] text-white">{store.label}</span>
                  </span>
                </>
              )

              return store.href ? (
                <a
                  className={storeClass}
                  href={store.href}
                  key={store.label}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {badge}
                </a>
              ) : (
                <span className={storeClass} key={store.label}>
                  {badge}
                </span>
              )
            })}
          </div>
        </div>

        {image ? (
          <div className="flex justify-center">
            <MediaImage
              className="h-auto w-full max-w-[420px] rounded-2xl object-contain shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
              media={image}
              sizes="(max-width: 900px) 100vw, 420px"
            />
          </div>
        ) : (
        <div aria-hidden="true" className="flex justify-center">
          <div className="flex h-[520px] w-[260px] flex-col overflow-hidden rounded-[36px] border-[3px] border-[#333] bg-[var(--ink)] shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
            <span className="mx-auto h-[22px] w-20 shrink-0 rounded-b-[14px] bg-black" />

            <div className="flex flex-1 flex-col gap-3 overflow-hidden bg-[var(--bg-subtle)] p-4">
              <div className="rounded-[10px] bg-white p-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <p className="num mb-2 text-sm">{dict.home.appBattery}</p>
                <div className="flex items-center gap-3">
                  <span className="h-2.5 flex-1 overflow-hidden rounded-[5px] bg-[var(--border)]">
                    <span className="block h-full w-[78%] rounded-[5px] bg-[var(--accent)]" />
                  </span>
                  <span className="num text-base text-[var(--accent)]">78%</span>
                </div>
                <p className="mt-1 text-[10px] text-[var(--muted)]">{dict.home.appRemaining}</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {tiles.map((tile) => (
                  <div
                    className="rounded-lg bg-white px-3 py-2.5 shadow-[0_1px_4px_rgba(0,0,0,0.05)]"
                    key={tile.label}
                  >
                    <p className="num text-base">{tile.value}</p>
                    <p className="text-[10px] text-[var(--muted)]">{tile.label}</p>
                  </div>
                ))}
              </div>

              <div className="relative min-h-20 flex-1 rounded-[10px] bg-white p-3 shadow-[0_1px_4px_rgba(0,0,0,0.05)]">
                <span className="absolute inset-3 bg-[repeating-linear-gradient(0deg,#f0f0f0_0,#f0f0f0_1px,transparent_1px,transparent_24px),repeating-linear-gradient(90deg,#f0f0f0_0,#f0f0f0_1px,transparent_1px,transparent_24px)]" />
                <span className="absolute top-[40%] left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]" />
                <span className="absolute bottom-2 left-3 text-[9px] text-[var(--muted)]">
                  {dict.home.appGps}
                </span>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  )
}
