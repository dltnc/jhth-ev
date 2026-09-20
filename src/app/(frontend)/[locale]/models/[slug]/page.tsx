import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { BikeCard } from '@/components/BikeCard'
import { BikeGallery } from '@/components/BikeGallery'
import { Icon } from '@/components/Icon'
import { StickyMobileCTA } from '@/components/StickyMobileCTA'
import { StructuredData } from '@/components/StructuredData'
import { defaultLocale, isLocale, localePath, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { firstGalleryImage, resolveMedia } from '@/lib/media'
import { getBikeBySlug, getBikes, getRelatedBikes } from '@/lib/queries'
import { absoluteUrl, buildMetadata } from '@/lib/seo'
import { getSiteSettings } from '@/lib/site'

export const revalidate = 300

type Props = { params: Promise<{ locale: string; slug: string }> }

export const generateStaticParams = async () => {
  try {
    const params: { locale: string; slug: string }[] = []

    for (const locale of locales) {
      const bikes = await getBikes({ locale })
      params.push(...bikes.map((bike) => ({ locale, slug: bike.slug })))
    }

    return params
  } catch {
    // No database at build time — fall back to rendering on first request.
    return []
  }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale: raw, slug } = await params
  const locale = isLocale(raw) ? raw : defaultLocale

  const bike = await getBikeBySlug({ locale, slug })
  if (!bike) return {}

  const image = resolveMedia(bike.metaImage, 'wide') ?? firstGalleryImage(bike.gallery, 'wide')

  return buildMetadata({
    description: bike.metaDescription ?? bike.tagline,
    image: image?.url,
    locale,
    path: `/models/${bike.slug}`,
    title: bike.metaTitle ?? bike.name,
  })
}

const ModelDetailPage = async ({ params }: Props) => {
  const { locale: raw, slug } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  const { isEnabled: draft } = await draftMode()
  const bike = await getBikeBySlug({ draft, locale, slug })

  if (!bike) notFound()

  const [related, settings] = await Promise.all([
    getRelatedBikes({ category: bike.category, excludeId: bike.id, locale }),
    getSiteSettings(locale),
  ])

  const images = (bike.gallery ?? [])
    .map((entry) => resolveMedia(entry.image, 'wide'))
    .filter((media): media is NonNullable<typeof media> => Boolean(media))

  const video = resolveMedia(bike.video)
  const specSheet = resolveMedia(bike.specSheet)
  const ogImage = firstGalleryImage(bike.gallery, 'wide')

  const keyStats = [
    { label: dict.detail.range, value: bike.range },
    { label: dict.detail.topSpeed, value: bike.topSpeed },
    { label: dict.detail.motor, value: bike.motor },
    { label: dict.detail.battery, value: bike.battery },
    { label: dict.detail.chargeTime, value: bike.chargeTime },
  ].filter((stat) => Boolean(stat.value))

  const trust = [dict.detail.trustWarranty, dict.detail.trustService, dict.detail.trustBuild]

  const stockLabels = {
    inStock: dict.detail.inStock,
    preOrder: dict.detail.preOrder,
    soldOut: dict.detail.soldOut,
  }

  // Anchors instead of stateful tabs, so the page stays server-rendered.
  const tabs = [
    { href: '#overview', label: dict.detail.overview },
    { href: '#specs', label: dict.detail.specsTab },
    { href: localePath(locale, '/models/compare'), label: dict.compare.heading },
  ]

  return (
    <div className="pb-24 lg:pb-0">
      <div className="sticky top-[68px] z-50 border-b border-[var(--border)] bg-white">
        <nav className="shell flex overflow-x-auto">
          {tabs.map((tab) => (
            <Link
              className="shrink-0 border-b-2 border-transparent px-6 py-4 text-sm font-medium whitespace-nowrap text-[var(--body)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              href={tab.href}
              key={tab.href}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>

      <section className="bg-[var(--bg-subtle)]" id="overview">
        <div className="shell grid grid-cols-1 items-center gap-16 py-12 nav:grid-cols-2">
          <BikeGallery images={images} label={dict.detail.gallery} />

          <div>
            <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-[var(--muted)]">
              <Link className="hover:text-[var(--accent)]" href={localePath(locale, '/')}>
                {dict.nav.home}
              </Link>
              <span aria-hidden="true">/</span>
              <Link className="hover:text-[var(--accent)]" href={localePath(locale, '/models')}>
                {dict.nav.models}
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-[var(--accent)]">{bike.name}</span>
            </nav>

            <span className="mb-3.5 inline-block rounded-full bg-[var(--accent-tint)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
              {dict.models[bike.category]}
            </span>

            <h1 className="mb-1 font-[family-name:var(--font-display)] text-[clamp(40px,5vw,64px)] leading-none font-bold">
              {bike.name}
            </h1>
            {bike.tagline ? (
              <p className="mb-5 text-[15px] text-[var(--muted)]">{bike.tagline}</p>
            ) : null}

            {keyStats.length ? (
              <dl className="mb-6 grid grid-cols-3 overflow-hidden rounded-lg border border-[var(--border)] bg-white sm:grid-cols-5">
                {keyStats.map((stat, index) => (
                  <div
                    className={`px-2 py-3.5 text-center ${
                      index < keyStats.length - 1 ? 'border-r border-[var(--border)]' : ''
                    }`}
                    key={stat.label}
                  >
                    <dd className="num mb-1 text-base leading-none">{stat.value}</dd>
                    <dt className="text-[10px] text-[var(--muted)]">{stat.label}</dt>
                  </div>
                ))}
              </dl>
            ) : null}

            <div className="mb-6">
              <Link
                className="inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-[26px] leading-none font-bold text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
                href={localePath(locale, '/test-ride')}
              >
                {dict.common.priceOnRequest}
                <Icon name="arrowRight" size={20} />
              </Link>
            </div>

            {bike.status === 'comingSoon' ? (
              <p className="mb-5 text-sm font-medium text-[var(--muted)]">
                {dict.models.comingSoon}
              </p>
            ) : null}

            {bike.colorSwatches?.length ? (
              <div className="mb-6">
                <p className="mb-2.5 text-[13px] font-medium text-[#333]">{dict.detail.colour}</p>
                <ul aria-label={dict.detail.variants} className="flex gap-2.5">
                  {bike.colorSwatches.map((swatch) => (
                    <li
                      className="size-8 rounded-full border-2 border-[#ddd]"
                      key={swatch.id ?? swatch.hex}
                      style={{ backgroundColor: swatch.hex }}
                      title={swatch.hex}
                    />
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <Link
                className="btn btn-primary"
                href={`${localePath(locale, '/reserve')}?model=${encodeURIComponent(bike.slug)}`}
              >
                {bike.status === 'comingSoon' ? dict.actions.reserveNow : dict.actions.buyNow}
              </Link>
              <Link
                className="btn btn-secondary"
                href={`${localePath(locale, '/test-ride')}?model=${encodeURIComponent(bike.slug)}`}
              >
                {dict.actions.bookTestRide}
              </Link>
              {bike.emiEligible ? (
                <Link className="btn btn-secondary" href={localePath(locale, '/financing')}>
                  {dict.detail.emiEstimate}
                </Link>
              ) : null}
            </div>

            <ul className="mt-6 flex flex-wrap gap-4">
              {trust.map((item) => (
                <li className="flex items-center gap-1.5 text-[11px] text-[#666]" key={item}>
                  <span className="flex size-3.5 items-center justify-center rounded-full bg-[var(--accent-tint)] text-[var(--accent)]">
                    <Icon name="check" size={9} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {specSheet ? (
              <a
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
                download
                href={specSheet.url}
              >
                <Icon name="download" size={16} />
                {dict.actions.downloadSpecSheet}
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {bike.description ? (
        <section className="bg-white py-12">
          <div className="shell">
            <h2 className="mb-4 font-[family-name:var(--font-display)] text-[28px] font-bold">
              {dict.detail.meetThe} {bike.name}
            </h2>
            <p className="max-w-[720px] text-[15px] leading-[1.8] text-[var(--body)]">
              {bike.description}
            </p>
          </div>
        </section>
      ) : null}

      {video ? (
        <section className="bg-white pb-12">
          <div className="shell">
            <video className="w-full rounded-xl" controls preload="metadata" src={video.url}>
              {bike.name}
            </video>
          </div>
        </section>
      ) : null}

      <section className="bg-[var(--bg-subtle)] py-20" id="specs">
        <div className="mx-auto max-w-[900px] px-6">
          <h2 className="mb-8 font-[family-name:var(--font-display)] text-4xl font-bold">
            {dict.detail.fullSpecs}
          </h2>

          <dl className="overflow-hidden rounded-lg border border-[var(--border)] bg-white">
            {bike.specs.map((spec, index) => (
              <div
                className={`grid grid-cols-1 sm:grid-cols-[200px_1fr] ${
                  index < bike.specs.length - 1 ? 'border-b border-[#f0f0f0]' : ''
                }`}
                key={spec.id ?? spec.label}
              >
                <dt className="bg-[var(--surface-faint)] px-5 py-4 text-[13px] font-semibold text-[var(--body)] sm:border-r sm:border-[#f0f0f0]">
                  {spec.label}
                </dt>
                <dd className="px-5 py-4 text-[13px] text-[#333]">{spec.value}</dd>
              </div>
            ))}
          </dl>

          {bike.variants?.length ? (
            <div className="mt-6 overflow-hidden rounded-lg border border-[var(--border)] bg-white">
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr className="bg-[var(--accent)] text-left text-white">
                    <th className="px-5 py-4 font-semibold" scope="col">
                      {dict.forms.variant}
                    </th>
                    <th className="px-5 py-4 font-semibold" scope="col">
                      {dict.detail.inStock}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bike.variants.map((variant) => (
                    <tr className="border-t border-[#f0f0f0]" key={variant.id ?? variant.sku}>
                      <td className="px-5 py-3.5">{variant.colorName}</td>
                      <td className="px-5 py-3.5 text-[var(--muted)]">
                        {stockLabels[variant.inStock]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </section>

      {related.length ? (
        <section className="bg-white py-15">
          <div className="shell">
            <h2 className="mb-8 font-[family-name:var(--font-display)] text-[28px] font-bold">
              {dict.detail.related}
            </h2>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
              {related.map((item) => (
                <li key={item.id}>
                  <BikeCard bike={item} locale={locale} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="bg-[var(--bg-subtle)] px-6 py-12 text-center">
        <h2 className="mb-2.5 font-[family-name:var(--font-display)] text-[26px] font-bold">
          {dict.detail.confusedHeading}
        </h2>
        <p className="mb-5 text-sm text-[#666]">{dict.detail.confusedBody}</p>
        {settings?.email ? (
          <a className="btn btn-primary" href={`mailto:${settings.email}`}>
            {dict.detail.emailUs}
          </a>
        ) : (
          <Link className="btn btn-primary" href={localePath(locale, '/faq')}>
            {dict.nav.faq}
          </Link>
        )}
      </section>

      <StickyMobileCTA locale={locale} modelSlug={bike.slug} />

      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          brand: { '@type': 'Brand', name: settings?.siteName ?? 'VoltRide' },
          description: bike.metaDescription ?? bike.tagline ?? undefined,
          image: ogImage ? absoluteUrl(ogImage.url) : undefined,
          name: bike.name,
          offers: {
            '@type': 'Offer',
            availability:
              bike.status === 'available'
                ? 'https://schema.org/InStock'
                : 'https://schema.org/PreOrder',
            url: absoluteUrl(localePath(locale, `/models/${bike.slug}`)),
          },
        }}
      />
    </div>
  )
}

export default ModelDetailPage
