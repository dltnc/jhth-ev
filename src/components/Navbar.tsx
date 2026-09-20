import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import type { NavLink } from './MobileMenu'

import { localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { isSafeHref, resolveHref } from '@/lib/links'
import { getSiteSettings } from '@/lib/site'

import { LocaleSwitcher } from './LocaleSwitcher'
import { MobileMenu } from './MobileMenu'
import { NavbarShell } from './NavbarShell'
import { NavLinks } from './NavLinks'

/**
 * The wordmark is two-tone: the first word stays ink, the rest turns green.
 * "VoltRide" has no space, so split on the second capital letter as a fallback.
 */
const splitBrand = (name: string): [string, string] => {
  const spaced = name.trim().split(/\s+/)
  if (spaced.length > 1) return [spaced[0]!, spaced.slice(1).join(' ')]

  const camel = name.match(/^(.[a-z0-9]*)([A-Z].*)$/)
  if (camel) return [camel[1]!, camel[2]!]

  return [name, '']
}

export const Navbar = async ({ locale }: { locale: Locale }) => {
  const dict = getDictionary(locale)
  const settings = await getSiteSettings(locale)

  const fallbackLinks: NavLink[] = [
    { href: localePath(locale, '/models/type/e-cycles'), label: dict.models.ecycle },
    { href: localePath(locale, '/models/type/e-scooters'), label: dict.models.escooter },
    { href: localePath(locale, '/models/type/e-bikes'), label: dict.models.ebike },
    { href: localePath(locale, '/dealers'), label: dict.nav.dealers },
    { href: localePath(locale, '/financing'), label: dict.nav.financing },
    { href: localePath(locale, '/blog'), label: dict.nav.blog },
  ]

  // Editors can override the menu from Site Settings; unsafe hrefs are dropped.
  const cmsLinks = (settings?.navLinks ?? [])
    .filter((link) => isSafeHref(link.url))
    .map((link) => ({ href: resolveHref(link.url, locale), label: link.label }))

  const links = cmsLinks.length ? cmsLinks : fallbackLinks
  const siteName = settings?.siteName ?? 'VoltRide'
  const [brandHead, brandTail] = splitBrand(siteName)
  const modelsHref = localePath(locale, '/models')

  return (
    <NavbarShell>
      <div className="shell flex h-[68px] items-center justify-between gap-4">
        <Link className="flex items-center gap-2.5" href={localePath(locale, '/')}>
          <img
            alt=""
            aria-hidden="true"
            className="size-9 shrink-0"
            height={36}
            src="/logo.svg"
            width={36}
          />
          <span className="block">
            <span className="block font-[family-name:var(--font-display)] text-[18px] leading-[1.1] font-bold text-[var(--fg)]">
              {brandHead} <span className="text-[var(--accent)]">{brandTail}</span>
            </span>
            {settings?.tagline ? (
              <span className="block max-w-[180px] truncate text-[10px] leading-none tracking-[0.5px] text-[var(--muted)]">
                {settings.tagline}
              </span>
            ) : null}
          </span>
        </Link>

        <NavLinks label={dict.nav.primary} links={links} />

        <div className="flex items-center gap-3">
          <LocaleSwitcher current={locale} label={dict.common.language} />
          <Link
            className="hidden rounded-[4px] bg-[var(--accent)] px-[22px] py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-[var(--accent-hover)] nav:inline-block"
            href={modelsHref}
          >
            {dict.actions.exploreProducts}
          </Link>
          <MobileMenu
            closeLabel={dict.actions.closeMenu}
            ctaHref={modelsHref}
            ctaLabel={dict.actions.exploreProducts}
            links={links}
            openLabel={dict.actions.openMenu}
          />
        </div>
      </div>
    </NavbarShell>
  )
}
