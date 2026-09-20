import { headers } from 'next/headers'
import Link from 'next/link'

import { Icon } from '@/components/Icon'
import { LOCALE_HEADER, defaultLocale, isLocale, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

const NotFound = async () => {
  const requestHeaders = await headers()
  const raw = requestHeaders.get(LOCALE_HEADER)
  const locale = isLocale(raw) ? raw : defaultLocale
  const dict = getDictionary(locale)

  return (
    <div className="bg-white py-32">
      <div className="shell text-center">
        <p className="eyebrow mb-4">404</p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold sm:text-5xl">
          {dict.common.notFoundTitle}
        </h1>
        <p className="mx-auto mt-4 max-w-[480px] text-[15px] leading-[1.75] text-[var(--body)]">
          {dict.common.notFoundBody}
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link className="btn btn-primary" href={localePath(locale, '/')}>
            {dict.actions.backHome}
          </Link>
          <Link className="btn btn-secondary" href={localePath(locale, '/models')}>
            {dict.actions.exploreModels}
            <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
