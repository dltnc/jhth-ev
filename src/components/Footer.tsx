import Link from 'next/link'

import type { Locale } from '@/i18n/config'
import type { IconName } from './Icon'

import { localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { isSafeHref, resolveHref } from '@/lib/links'
import { getBikes } from '@/lib/queries'
import { getSiteSettings } from '@/lib/site'

import { Icon } from './Icon'

const socialIcons: Record<string, IconName> = {
  facebook: 'facebook',
  instagram: 'instagram',
  linkedin: 'linkedin',
  tiktok: 'tiktok',
  x: 'x',
  youtube: 'youtube',
}

type Col = { href: string; label: string }

const FooterCol = ({ links, title }: { links: Col[]; title: string }) => {
  if (!links.length) return null

  return (
    <div>
      <h2 className="mb-5 font-[family-name:var(--font-display)] text-[15px] font-bold tracking-[1px] text-[#eee] uppercase">
        {title}
      </h2>
      <ul className="flex flex-col gap-[11px]">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              className="text-[13px] text-[#999] transition-colors hover:text-[var(--accent-light)]"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const Footer = async ({ locale }: { locale: Locale }) => {
  const dict = getDictionary(locale)
  const [settings, bikes] = await Promise.all([
    getSiteSettings(locale),
    getBikes({ limit: 8, locale }),
  ])

  const siteName = settings?.siteName ?? 'VoltRide'
  const spaced = siteName.trim().split(/\s+/)
  const camel = siteName.match(/^(.[a-z0-9]*)([A-Z].*)$/)
  const brandHead = spaced.length > 1 ? spaced[0]! : (camel?.[1] ?? siteName)
  const brandTail = spaced.length > 1 ? spaced.slice(1).join(' ') : (camel?.[2] ?? '')

  const productLinks: Col[] = [
    { href: localePath(locale, '/models/type/e-cycles'), label: dict.models.ecycle },
    { href: localePath(locale, '/models/type/e-scooters'), label: dict.models.escooter },
    { href: localePath(locale, '/models/type/e-bikes'), label: dict.models.ebike },
    { href: localePath(locale, '/models'), label: dict.models.heading },
    ...bikes.slice(0, 4).map((bike) => ({
      href: localePath(locale, `/models/${bike.slug}`),
      label: bike.name,
    })),
  ]

  const companyLinks: Col[] = [
    { href: localePath(locale, '/technology'), label: dict.nav.technology },
    { href: localePath(locale, '/financing'), label: dict.nav.financing },
    { href: localePath(locale, '/dealers'), label: dict.nav.dealers },
    { href: localePath(locale, '/blog'), label: dict.nav.blog },
    { href: localePath(locale, '/faq'), label: dict.nav.faq },
  ]

  // Editors curate the last column from Site Settings → Footer links.
  const legalLinks: Col[] = (settings?.footerLinks ?? [])
    .filter((link) => isSafeHref(link.url))
    .map((link) => ({ href: resolveHref(link.url, locale), label: link.label }))

  const socials = (settings?.socialLinks ?? []).filter((link) => isSafeHref(link.url))

  return (
    <footer className="bg-[var(--ink-deep)] text-[#ccc]">
      <div className="shell pt-16">
        <div className="grid grid-cols-1 gap-12 border-b border-white/8 pb-12 min-[540px]:grid-cols-2 nav:grid-cols-[260px_1fr_1fr_1fr]">
          <div>
            <Link className="mb-5 flex items-center gap-2.5" href={localePath(locale, '/')}>
              <img
                alt=""
                aria-hidden="true"
                className="size-[34px] shrink-0"
                height={34}
                src="/logo.svg"
                width={34}
              />
              <span className="font-[family-name:var(--font-display)] text-[17px] leading-[1.1] font-bold text-white">
                {brandHead} <span className="text-[var(--accent-light)]">{brandTail}</span>
              </span>
            </Link>

            {settings?.tagline ? (
              <p className="mb-6 text-[13px] leading-[1.75] text-[#999]">{settings.tagline}</p>
            ) : null}

            <div className="flex flex-col gap-2.5">
              {settings?.phone ? (
                <a
                  className="flex items-center gap-2 text-[13px] text-[#ccc] transition-colors hover:text-[var(--accent-light)]"
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                >
                  <Icon className="shrink-0 text-[var(--accent-light)]" name="phone" size={14} />
                  {settings.phone}
                </a>
              ) : null}
              {settings?.email ? (
                <a
                  className="flex items-center gap-2 text-[13px] text-[#ccc] transition-colors hover:text-[var(--accent-light)]"
                  href={`mailto:${settings.email}`}
                >
                  <Icon className="shrink-0 text-[var(--accent-light)]" name="mail" size={14} />
                  {settings.email}
                </a>
              ) : null}
              {settings?.address ? (
                <p className="flex gap-2 text-[13px] leading-[1.7] text-[#999]">
                  <Icon
                    className="mt-1 shrink-0 text-[var(--accent-light)]"
                    name="location"
                    size={14}
                  />
                  <span>{settings.address}</span>
                </p>
              ) : null}
            </div>

            {socials.length ? (
              <div className="mt-6 flex gap-2">
                {socials.map((link) => (
                  <a
                    aria-label={link.platform}
                    className="flex size-9 items-center justify-center rounded-full border border-white/12 text-[#999] transition-colors hover:border-[var(--accent-light)] hover:text-[var(--accent-light)]"
                    href={link.url}
                    key={link.id ?? link.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Icon name={socialIcons[link.platform] ?? 'globe'} size={16} />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <FooterCol links={productLinks} title={dict.footer.products} />
          <FooterCol links={companyLinks} title={dict.footer.company} />
          <FooterCol links={legalLinks} title={dict.footer.legal} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <p className="text-xs text-[#666]">
            © {new Date().getFullYear()} {siteName}. {dict.common.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  )
}
