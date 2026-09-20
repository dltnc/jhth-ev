'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { NavLink } from './MobileMenu'

/**
 * Desktop nav. Client-side only because the design marks the current section
 * with a green 2px underline, which needs the active pathname.
 */
export const NavLinks = ({ label, links }: { label: string; links: NavLink[] }) => {
  const pathname = usePathname() || '/'

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <nav aria-label={label} className="hidden items-center gap-9 nav:flex">
      {links.map((link) => {
        const active = isActive(link.href)

        return (
          <Link
            aria-current={active ? 'page' : undefined}
            className={`border-b-2 pb-0.5 text-sm font-medium transition-colors hover:text-[var(--accent)] ${
              active
                ? 'border-[var(--accent)] text-[var(--accent)]'
                : 'border-transparent text-[#333]'
            }`}
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
