import type { Locale } from '@/i18n/config'

import { localePath } from '@/i18n/config'

const ALLOWED_SCHEMES = ['http:', 'https:', 'mailto:', 'tel:']

/**
 * Editors type raw URLs into `SiteSettings` and the CTA blocks, so every
 * CMS-authored href passes through here before it reaches an anchor.
 * Blocks `javascript:`, `data:` and protocol-relative `//evil.com` values.
 */
export const isSafeHref = (href: null | string | undefined): href is string => {
  if (!href) return false

  const value = href.trim()
  if (!value || value.startsWith('//')) return false
  if (value.startsWith('/') || value.startsWith('#')) return true

  try {
    return ALLOWED_SCHEMES.includes(new URL(value).protocol)
  } catch {
    return false
  }
}

export const isInternalHref = (href: string): boolean =>
  href.startsWith('/') || href.startsWith('#')

/** Internal links get the active locale prefix; external ones are left alone. */
export const resolveHref = (href: string, locale: Locale): string =>
  href.startsWith('/') ? localePath(locale, href) : href

/** `+880 1712-345678` -> `+8801712345678`, safe for a `tel:` href. */
export const telHref = (phone: null | string | undefined): null | string => {
  if (!phone) return null

  const digits = phone.replace(/[^\d+]/g, '')

  return digits.length >= 6 ? `tel:${digits}` : null
}

export const whatsappHref = (phone: null | string | undefined): null | string => {
  if (!phone) return null

  const digits = phone.replace(/\D/g, '')
  if (digits.length < 10) return null

  const normalised = digits.startsWith('880') ? digits : `880${digits.replace(/^0/, '')}`

  return `https://wa.me/${normalised}`
}

/** Deep link to Google Maps — used instead of an embedded map (no API key). */
export const mapsHref = (
  address: string,
  location?: [number, number] | null,
): string =>
  location
    ? `https://www.google.com/maps/search/?api=1&query=${location[1]},${location[0]}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
