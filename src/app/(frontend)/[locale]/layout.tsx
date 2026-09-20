import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { StructuredData } from '@/components/StructuredData'
import { isLocale, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { optionalText, text } from '@/lib/cms'
import { resolveMedia } from '@/lib/media'
import { absoluteUrl, buildMetadata, serverURL } from '@/lib/seo'
import { getSiteSettings } from '@/lib/site'

import '../globals.css'

const FONT_CSS =
  'https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap'

type LayoutParams = { params: Promise<{ locale: string }> }

export const generateStaticParams = async () => locales.map((locale) => ({ locale }))

export const generateMetadata = async ({ params }: LayoutParams): Promise<Metadata> => {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const settings = await getSiteSettings(locale)
  const ogImage = resolveMedia(settings?.defaultOGImage, 'wide')
  const siteName = text(settings?.siteName, 'VoltRide')
  const metaTitle = text(settings?.defaultMetaTitle, siteName)

  return {
    ...buildMetadata({
      description:
        optionalText(settings?.defaultMetaDescription) ?? optionalText(settings?.tagline),
      image: ogImage?.url,
      locale,
      path: '/',
      siteName,
      title: metaTitle,
    }),
    icons: { icon: '/favicon.ico' },
    title: {
      default: metaTitle,
      template: `%s · ${siteName}`,
    },
  }
}

const FrontendLayout = async ({ children, params }: LayoutParams & { children: ReactNode }) => {
  const { locale } = await params

  // The middleware only ever routes known locales here; a hand-typed
  // `/de/models` should 404 rather than render an English page.
  if (!isLocale(locale)) notFound()

  const dict = getDictionary(locale)
  const settings = await getSiteSettings(locale)

  return (
    <html lang={locale}>
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
        <link href={FONT_CSS} rel="stylesheet" />
      </head>
      <body>
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-lg focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-[var(--accent-fg)]"
          href="#main"
        >
          {dict.common.skipToContent}
        </a>

        <Navbar locale={locale} />

        {/* The 68px header is fixed; sections that want photography to run
            behind it opt out with `-mt-[68px] pt-[68px]`. */}
        <main className="pt-[68px]" id="main">
          {children}
        </main>

        <Footer locale={locale} />

        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@id': `${serverURL}/#organization`,
            '@type': 'Organization',
            address: settings?.address ?? undefined,
            email: settings?.email ?? undefined,
            logo: resolveMedia(settings?.defaultOGImage, 'wide')?.url
              ? absoluteUrl(resolveMedia(settings?.defaultOGImage, 'wide')!.url)
              : undefined,
            name: settings?.siteName ?? 'VoltRide',
            sameAs: (settings?.socialLinks ?? []).map((link) => link.url),
            telephone: settings?.phone ?? undefined,
            url: serverURL,
          }}
        />
      </body>
    </html>
  )
}

export default FrontendLayout
