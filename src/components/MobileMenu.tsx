'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { Icon } from './Icon'

export type NavLink = { href: string; label: string }

type Props = {
  closeLabel: string
  ctaHref: string
  ctaLabel: string
  links: NavLink[]
  openLabel: string
}

export const MobileMenu = ({ closeLabel, ctaHref, ctaLabel, links, openLabel }: Props) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Navigating away should always leave the menu closed.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <>
      <button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label={open ? closeLabel : openLabel}
        className="rounded-md p-1.5 text-[var(--fg)] nav:hidden"
        onClick={() => setOpen((value) => !value)}
        ref={triggerRef}
        type="button"
      >
        <Icon name={open ? 'close' : 'menu'} size={24} />
      </button>

      <div
        aria-hidden={!open}
        className={`fixed inset-x-0 top-[68px] z-40 max-h-[calc(100vh-68px)] overflow-y-auto border-t border-[var(--border)] bg-white nav:hidden ${
          open ? 'block' : 'hidden'
        }`}
        id="mobile-menu"
        ref={panelRef}
        tabIndex={-1}
      >
        <nav className="shell flex flex-col pt-3 pb-5">
          {links.map((link) => {
            const active = pathname === link.href || pathname?.startsWith(`${link.href}/`)

            return (
              <Link
                aria-current={active ? 'page' : undefined}
                className={`border-b border-[#f0f0f0] py-3 text-[15px] font-medium transition-colors hover:text-[var(--accent)] ${
                  active ? 'text-[var(--accent)]' : 'text-[#333]'
                }`}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            className="mt-4 self-start rounded-[4px] bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
            href={ctaHref}
          >
            {ctaLabel}
          </Link>
        </nav>
      </div>
    </>
  )
}
