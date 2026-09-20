'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { Locale } from '@/i18n/config'

import { LOCALE_COOKIE, localeLabels, locales, swapLocaleInPath } from '@/i18n/config'

type Props = {
  className?: string
  current: Locale
  label: string
}

/**
 * Real links (so it works without JS and is crawlable) that also persist the
 * choice in a cookie, which the middleware reads for unprefixed requests.
 */
export const LocaleSwitcher = ({ className, current, label }: Props) => {
  const pathname = usePathname()

  const remember = (locale: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`
  }

  return (
    <div
      aria-label={label}
      className={`flex items-center rounded-lg border border-[var(--border)] p-0.5 ${className ?? ''}`}
      role="group"
    >
      {locales.map((locale) => {
        const active = locale === current

        return (
          <Link
            aria-current={active ? 'true' : undefined}
            className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
              active
                ? 'bg-[var(--accent)] text-[var(--accent-fg)]'
                : 'text-[var(--muted)] hover:text-[var(--fg)]'
            }`}
            hrefLang={locale}
            href={swapLocaleInPath(pathname || '/', locale)}
            key={locale}
            onClick={() => remember(locale)}
            prefetch={false}
          >
            {locale === 'bn' ? localeLabels.bn : 'EN'}
          </Link>
        )
      })}
    </div>
  )
}
