import Link from 'next/link'
import type { Metadata } from 'next'

import { DealerLocator } from '@/components/DealerLocator'
import { PhotoHero } from '@/components/PhotoHero'
import { StatsBand } from '@/components/StatsBand'
import { StructuredData } from '@/components/StructuredData'
import { TestimonialCard } from '@/components/TestimonialCard'
import { defaultLocale, isLocale, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { numberOr, rows, text } from '@/lib/cms'
import { formatNumber } from '@/lib/format'
import { firstGalleryImage, resolveMedia } from '@/lib/media'
import { getBikes, getDealers, getTestimonials } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { getSiteSettings } from '@/lib/site'

export const revalidate = 300

type Props = { params: Promise<{ locale: string }> }

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)
  const page = (await getSiteSettings(locale))?.dealerPage

  return buildMetadata({
    description: text(page?.body, dict.dealers.partnerBody),
    locale,
    path: '/dealers',
    title: text(page?.heading, dict.dealers.partnerHeading),
  })
}

const DealersPage = async ({ params }: Props) => {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  const [dealers, bikes, testimonials, settings] = await Promise.all([
    getDealers({ locale }),
    getBikes({ limit: 1, locale }),
    getTestimonials({ limit: 2, locale }),
    getSiteSettings(locale),
  ])

  const page = settings?.dealerPage
  const heroImage =
    resolveMedia(page?.heroImage, 'hero') ?? firstGalleryImage(bikes[0]?.gallery, 'hero')
  const divisions = new Set(dealers.map((dealer) => dealer.division))

  const benefitRows = rows(page?.benefits)
  const benefits: { body?: null | string; icon?: null | string; title: string }[] =
    benefitRows.length ? benefitRows : dict.dealers.benefits

  const stats = [
    { label: dict.dealers.statsCentres, value: `${formatNumber(dealers.length, locale)}+` },
    { label: dict.dealers.statsDivisions, value: formatNumber(divisions.size || 8, locale) },
    {
      label: dict.dealers.statsRiders,
      value: `${formatNumber(numberOr(settings?.networkStats?.riders, 50000), locale)}+`,
    },
    {
      label: dict.dealers.statsRating,
      value: `${formatNumber(numberOr(settings?.networkStats?.rating, 4.8), locale)}★`,
    },
  ]

  return (
    <>
      <PhotoHero
        ctaHref="#locator"
        ctaLabel={dict.dealers.locatorHeading}
        eyebrow={text(page?.eyebrow, dict.dealers.partnerEyebrow)}
        media={heroImage}
        sub={text(page?.body, dict.dealers.partnerBody)}
        title={text(page?.heading, dict.dealers.partnerHeading)}
      />

      <StatsBand items={stats} />

      <section className="bg-white py-20">
        <div className="shell">
          <div className="mb-13 text-center">
            <p className="eyebrow mb-2.5">
              {text(page?.benefitsEyebrow, dict.dealers.benefitsEyebrow)}
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(30px,4vw,48px)] leading-[1.1] font-bold">
              {text(page?.benefitsHeading, dict.dealers.benefitsHeading)}
            </h2>
          </div>

          <ul className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
            {benefits.map((benefit, index) => (
              <li
                className="rounded-lg border border-[var(--border-soft)] bg-[var(--bg-subtle)] px-6 py-8"
                key={`${index}-${benefit.title}`}
              >
                <span aria-hidden="true" className="mb-4 block text-[32px]">
                  {benefit.icon}
                </span>
                <h3 className="mb-2.5 font-[family-name:var(--font-display)] text-[22px] font-bold">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-[1.7] text-[#666]">{benefit.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[var(--bg-subtle)] py-20" id="locator">
        <div className="shell">
          <h2 className="mb-9 text-center font-[family-name:var(--font-display)] text-[32px] font-bold">
            {dict.dealers.locatorHeading}
          </h2>
          <DealerLocator dealers={dealers} locale={locale} />
        </div>
      </section>

      {testimonials.length ? (
        <section className="bg-white py-20">
          <div className="shell">
            <h2 className="mb-9 text-center font-[family-name:var(--font-display)] text-[32px] font-bold">
              {dict.dealers.testimonialsHeading}
            </h2>
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6">
              {testimonials.map((testimonial) => (
                <li key={testimonial.id}>
                  <TestimonialCard testimonial={testimonial} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="bg-[var(--accent-deep)] px-6 py-16 text-center">
        <h2 className="mb-4 font-[family-name:var(--font-display)] text-[clamp(28px,4vw,44px)] leading-[1.1] font-bold text-white">
          {dict.home.revHeading}
        </h2>
        <p className="mx-auto mb-7 max-w-[560px] text-[15px] leading-[1.75] text-white/78">
          {dict.home.revBody}
        </p>
        <Link className="btn btn-light" href={localePath(locale, '/test-ride')}>
          {dict.actions.bookTestRide}
        </Link>
      </section>

      {dealers.length ? (
        <StructuredData
          data={dealers.map((dealer) => ({
            '@context': 'https://schema.org',
            '@type': 'AutoDealer',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'BD',
              addressLocality: dealer.district,
              addressRegion: dict.dealers.divisions[dealer.division],
              streetAddress: dealer.address,
            },
            geo: dealer.location
              ? {
                  '@type': 'GeoCoordinates',
                  latitude: dealer.location[1],
                  longitude: dealer.location[0],
                }
              : undefined,
            name: dealer.name,
            openingHours: dealer.hours ?? undefined,
            telephone: dealer.phone,
          }))}
        />
      ) : null}
    </>
  )
}

export default DealersPage
