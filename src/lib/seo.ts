import type { Metadata } from 'next'

import type { Locale } from '@/i18n/config'

import { localePath, locales } from '@/i18n/config'

export const serverURL = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(
  /\/$/,
  '',
)

export const absoluteUrl = (path: string): string =>
  /^https?:\/\//.test(path) ? path : `${serverURL}${path.startsWith('/') ? path : `/${path}`}`

type MetadataArgs = {
  description?: null | string
  /** Absolute or app-relative image URL for OG/Twitter cards. */
  image?: null | string
  locale: Locale
  /** App-relative path *without* the locale prefix, e.g. `/models`. */
  path: string
  publishedTime?: null | string
  siteName?: null | string
  title: string
  type?: 'article' | 'website'
}

/**
 * One place that builds canonical URLs, hreflang alternates and OG tags, so
 * every route gets the same treatment (PRD §6.4).
 */
export const buildMetadata = ({
  description,
  image,
  locale,
  path,
  publishedTime,
  siteName,
  title,
  type = 'website',
}: MetadataArgs): Metadata => {
  const canonical = absoluteUrl(localePath(locale, path))

  const languages = Object.fromEntries(
    locales.map((code) => [code, absoluteUrl(localePath(code, path))]),
  )

  return {
    alternates: {
      canonical,
      languages: { ...languages, 'x-default': absoluteUrl(localePath('en', path)) },
    },
    description: description ?? undefined,
    metadataBase: new URL(serverURL),
    openGraph: {
      description: description ?? undefined,
      images: image ? [{ url: absoluteUrl(image) }] : undefined,
      locale: locale === 'bn' ? 'bn_BD' : 'en_US',
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
      siteName: siteName ?? undefined,
      title,
      type,
      url: canonical,
    },
    title,
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      description: description ?? undefined,
      images: image ? [absoluteUrl(image)] : undefined,
      title,
    },
  }
}
