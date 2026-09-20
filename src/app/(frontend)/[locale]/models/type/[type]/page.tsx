import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import type { Bike } from '@/payload-types'

import { BikeCard } from '@/components/BikeCard'
import { PhotoHero } from '@/components/PhotoHero'
import { defaultLocale, isLocale, localePath, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { rows, text } from '@/lib/cms'
import { formatNumber } from '@/lib/format'
import { firstGalleryImage, resolveMedia } from '@/lib/media'
import { getBikes } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { getVehicleTypes } from '@/lib/site'

export const revalidate = 300

/** Readable URL segments for the three vehicle families, as used in the design. */
const typeSlugs = {
  'e-bikes': 'ebike',
  'e-cycles': 'ecycle',
  'e-scooters': 'escooter',
} as const satisfies Record<string, Bike['vehicleType']>

type TypeSlug = keyof typeof typeSlugs

const isTypeSlug = (value: string): value is TypeSlug => value in typeSlugs

type Props = { params: Promise<{ locale: string; type: string }> }

export const generateStaticParams = async () =>
  locales.flatMap((locale) => Object.keys(typeSlugs).map((type) => ({ locale, type })))

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale: raw, type } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  if (!isTypeSlug(type)) return {}

  const dict = getDictionary(locale)
  const vehicleType = typeSlugs[type]
  const family = (await getVehicleTypes(locale))?.[vehicleType]

  return buildMetadata({
    description: text(family?.subtitle, dict.models.types[vehicleType].sub),
    locale,
    path: `/models/type/${type}`,
    title: text(family?.heading, dict.models[vehicleType]),
  })
}

const VehicleTypePage = async ({ params }: Props) => {
  const { locale: raw, type } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  if (!isTypeSlug(type)) notFound()

  const dict = getDictionary(locale)
  const vehicleType = typeSlugs[type]
  const copy = dict.models.types[vehicleType]

  const [bikes, vehicleTypes] = await Promise.all([
    getBikes({ filters: { vehicleType }, locale }),
    getVehicleTypes(locale),
  ])

  const family = vehicleTypes?.[vehicleType]
  const heroImage =
    resolveMedia(family?.heroImage, 'hero') ?? firstGalleryImage(bikes[0]?.gallery, 'hero')
  const strip = rows(vehicleTypes?.featureStrip)
  const badges: { icon?: null | string; title: string }[] = strip.length
    ? strip
    : dict.home.features

  return (
    <>
      <PhotoHero
        ctaHref={localePath(locale, '/test-ride')}
        ctaLabel={dict.actions.bookTestRide}
        eyebrow={dict.models.filterType}
        media={heroImage}
        sub={text(family?.subtitle, copy.sub)}
        title={text(family?.heading, dict.models[vehicleType])}
      />

      <div className="border-b border-[var(--border-soft)] bg-white">
        <div className="shell py-9">
          <p className="max-w-[720px] text-[15px] leading-[1.75] text-[var(--body)]">
            {text(family?.body, copy.body)}
          </p>
        </div>
      </div>

      <section className="bg-[var(--bg-subtle)] pt-12 pb-20">
        <div className="shell">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-[family-name:var(--font-display)] text-[28px] font-bold">
              {formatNumber(bikes.length, locale)}{' '}
              {bikes.length === 1 ? dict.models.modelAvailable : dict.models.modelsAvailable}
            </h2>
            {/* `vehicleTypes.priceNote` is deliberately not rendered while prices
                are hidden — its whole purpose is a pricing footnote, which reads
                oddly beside "Price on request". Restore this alongside the price. */}
          </div>

          {bikes.length ? (
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
              {bikes.map((bike, index) => (
                <li key={bike.id}>
                  <BikeCard bike={bike} locale={locale} priority={index === 0} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-16 text-center text-[15px] text-[var(--muted)]">
              {dict.models.noResults}
            </p>
          )}
        </div>
      </section>

      <section className="bg-[var(--accent)] px-6 py-12">
        <ul className="shell grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8">
          {badges.map((badge, index) => (
            <li className="text-center" key={`${index}-${badge.title}`}>
              <span aria-hidden="true" className="mb-2.5 block text-[30px]">
                {badge.icon}
              </span>
              <p className="font-[family-name:var(--font-display)] text-[17px] font-bold text-white">
                {badge.title}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white px-6 py-14 text-center">
        <h2 className="mb-4 font-[family-name:var(--font-display)] text-[clamp(26px,3.5vw,38px)] font-bold">
          {dict.models.heading}
        </h2>
        <p className="mx-auto mb-7 max-w-[560px] text-[15px] leading-[1.75] text-[var(--body)]">
          {dict.models.sub}
        </p>
        <Link className="btn btn-primary" href={localePath(locale, '/models')}>
          {dict.actions.exploreProducts}
        </Link>
      </section>
    </>
  )
}

export default VehicleTypePage
