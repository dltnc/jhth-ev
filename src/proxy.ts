import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { LOCALE_COOKIE, LOCALE_HEADER, defaultLocale, isLocale } from '@/i18n/config'

/** Picks the best locale from `Accept-Language`, ignoring quality weights we don't need. */
const fromAcceptLanguage = (header: null | string) => {
  if (!header) return null

  for (const part of header.split(',')) {
    const tag = part.split(';')[0]?.trim().toLowerCase()
    if (!tag) continue

    const base = tag.split('-')[0]
    if (isLocale(base)) return base
  }

  return null
}

/**
 * Every public page lives under `/{locale}`, so an unprefixed request is
 * redirected to the visitor's remembered locale (cookie), then their browser
 * preference, then English. Payload's own routes are excluded by the matcher.
 *
 * Next 16 renamed this convention from `middleware` to `proxy`; the exported
 * function has to be called `proxy`.
 */
export const proxy = (request: NextRequest) => {
  const { pathname } = request.nextUrl
  const first = pathname.split('/')[1]

  if (isLocale(first)) {
    // `not-found.tsx` cannot read route params, so the resolved locale travels
    // with the request instead.
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set(LOCALE_HEADER, first)

    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  const target = isLocale(cookieLocale)
    ? cookieLocale
    : (fromAcceptLanguage(request.headers.get('accept-language')) ?? defaultLocale)

  const url = request.nextUrl.clone()
  url.pathname = `/${target}${pathname === '/' ? '' : pathname}`

  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    /*
     * Skip the Payload admin (`/admin`) and REST/GraphQL API (`/api`), Next
     * internals (`/_next`), the draft-preview handlers (`/next`), the SEO files
     * and anything with a file extension.
     */
    '/((?!admin|api|_next|next|robots\\.txt|sitemap\\.xml|favicon\\.ico|.*\\.[\\w]+$).*)',
  ],
}
