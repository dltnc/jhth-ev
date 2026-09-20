import Link from 'next/link'

import type { Locale } from '@/i18n/config'

import { localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

/** Thumb-reachable primary actions on small screens (PRD §8.3). */
export const StickyMobileCTA = ({ locale, modelSlug }: { locale: Locale; modelSlug?: string }) => {
  const dict = getDictionary(locale)
  const query = modelSlug ? `?model=${encodeURIComponent(modelSlug)}` : ''

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--bg)]/95 p-3 backdrop-blur-md lg:hidden">
      <div className="flex gap-3">
        <Link
          className="btn btn-secondary flex-1 text-sm"
          href={localePath(locale, `/test-ride${query}`)}
        >
          {dict.actions.bookTestRide}
        </Link>
        <Link
          className="btn btn-primary flex-1 text-sm"
          href={localePath(locale, `/reserve${query}`)}
        >
          {dict.actions.reserveNow}
        </Link>
      </div>
    </div>
  )
}
