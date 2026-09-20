import type { Metadata } from 'next'

import type { HeroSlide } from '@/components/HeroCarousel'
import type { Bike } from '@/payload-types'

import { HeroCarousel } from '@/components/HeroCarousel'
import {
  AppBanner,
  ContactStrip,
  Features,
  Mission,
  ProductRange,
  RevBanner,
  StatsBar,
} from '@/components/home/sections'
import { defaultLocale, isLocale, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { optionalText, publishedDocs, rows, text } from '@/lib/cms'
import { firstGalleryImage, resolveMedia } from '@/lib/media'
import { getBikes, getDealers } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'
import { getHomepage, getSiteSettings } from '@/lib/site'

export const revalidate = 300

type Props = { params: Promise<{ locale: string }> }

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)
  const settings = await getSiteSettings(locale)

  return buildMetadata({
    description: text(settings?.defaultMetaDescription, dict.home.heroSub),
    locale,
    path: '/',
    siteName: settings?.siteName,
    title: text(settings?.defaultMetaTitle, dict.home.heroTitle),
  })
}

const HomePage = async ({ params }: Props) => {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  const [bikes, dealers, homepage] = await Promise.all([
    getBikes({ limit: 12, locale }),
    getDealers({ locale }),
    getHomepage(locale),
  ])

  const featured = bikes.filter((bike) => bike.featured)
  const picked = publishedDocs<Bike>(homepage?.rangeBikes)
  // Hand-picked models win, in their configured order; otherwise the featured six.
  const range = picked.length ? picked : (featured.length ? featured : bikes).slice(0, 6)

  const bikeHref = (bike: Bike | null) =>
    bike ? localePath(locale, `/models/${bike.slug}`) : localePath(locale, '/models')
  const bikeLabel = (bike: Bike | null) =>
    bike ? dict.actions.knowMore : dict.actions.exploreProducts

  const cmsSlides = rows(homepage?.slides)

  // With no CMS slides the carousel stays editorial (copy from the dictionary)
  // while borrowing its artwork and CTA from real inventory.
  const slides: HeroSlide[] = cmsSlides.length
    ? cmsSlides.map((slide) => {
        const bike = typeof slide.bike === 'object' ? slide.bike : null

        return {
          badge: optionalText(slide.badge),
          ctaHref: bikeHref(bike),
          ctaLabel: bikeLabel(bike),
          media: resolveMedia(slide.image, 'hero') ?? firstGalleryImage(bike?.gallery, 'hero'),
          sub: optionalText(slide.subtitle),
          title: slide.title,
        }
      })
    : dict.home.slides.map((slide, index) => {
        const bike = range[index % Math.max(range.length, 1)] ?? null

        return {
          badge: slide.badge,
          ctaHref: bikeHref(bike),
          ctaLabel: bikeLabel(bike),
          media: firstGalleryImage(bike?.gallery, 'hero'),
          sub: slide.sub,
          title: slide.title,
        }
      })

  const stats = rows(homepage?.stats).map((stat) => ({ label: stat.label, value: stat.value }))

  return (
    <>
      <HeroCarousel
        scrollLabel={dict.home.scrollCue}
        secondaryHref={localePath(locale, '/test-ride')}
        secondaryLabel={dict.actions.bookTestRide}
        slideLabel={dict.home.slideLabel}
        slides={slides}
      />
      <StatsBar
        dealerCount={dealers.length}
        items={stats}
        locale={locale}
        modelCount={bikes.length}
      />
      <ProductRange
        bikes={range}
        eyebrow={homepage?.rangeEyebrow}
        heading={homepage?.rangeHeading}
        locale={locale}
      />
      <AppBanner
        appStoreLabel={homepage?.appStoreLabel}
        appStoreUrl={homepage?.appStoreUrl}
        body={homepage?.appBody}
        eyebrow={homepage?.appEyebrow}
        heading={homepage?.appHeading}
        image={resolveMedia(homepage?.appImage, 'wide')}
        locale={locale}
        playStoreLabel={homepage?.playStoreLabel}
        playStoreUrl={homepage?.playStoreUrl}
        points={rows(homepage?.appPoints).map((point) => point.text)}
      />
      <Mission
        body={homepage?.missionBody}
        eyebrow={homepage?.missionEyebrow}
        heading={homepage?.missionHeading}
        image={resolveMedia(homepage?.missionImage, 'wide')}
        locale={locale}
      />
      <Features
        eyebrow={homepage?.featuresEyebrow}
        heading={homepage?.featuresHeading}
        items={rows(homepage?.features)}
        locale={locale}
      />
      <RevBanner
        body={homepage?.ctaBody}
        ctaUrl={homepage?.ctaUrl}
        heading={homepage?.ctaHeading}
        label={homepage?.ctaLabel}
        locale={locale}
      />
      <ContactStrip locale={locale} />
    </>
  )
}

export default HomePage
