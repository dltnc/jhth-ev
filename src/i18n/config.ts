export const locales = ['en', 'bn'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  bn: 'বাংলা',
}

export const LOCALE_COOKIE = 'voltride-locale'

/** Set by the middleware so components without route params can read the locale. */
export const LOCALE_HEADER = 'x-voltride-locale'

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (locales as readonly string[]).includes(value)

/** Prefix an app-relative path with the active locale: `/models` -> `/bn/models`. */
export const localePath = (locale: Locale, path = '/'): string => {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path
  }

  const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`

  return `/${locale}${clean}`
}

/** Swap the locale segment of a full pathname, keeping the rest intact. */
export const swapLocaleInPath = (pathname: string, next: Locale): string => {
  const segments = pathname.split('/').filter(Boolean)

  if (isLocale(segments[0])) {
    segments[0] = next
  } else {
    segments.unshift(next)
  }

  return `/${segments.join('/')}`
}
