'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

/**
 * The header itself only needs the client boundary for one thing: the design
 * drops a shadow once the page has scrolled past 60px.
 */
export const NavbarShell = ({ children }: { children: ReactNode }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed inset-x-0 top-0 z-[1000] border-b border-[var(--border)] bg-white transition-shadow duration-300"
      style={{ boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.08)' : 'none' }}
    >
      {children}
    </header>
  )
}
