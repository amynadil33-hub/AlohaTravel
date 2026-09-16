'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { MobileNav } from './mobile-nav'
import { navLinks } from './nav-links'

export function Header({ transparent = false }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // On transparent (homepage) pages, start see-through over the hero and
  // transition to a solid light bar on scroll.
  const isOverlay = transparent && !scrolled
  const onDark = isOverlay

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        isOverlay
          ? 'bg-transparent py-4'
          : 'border-b border-border/70 bg-background/85 py-3 shadow-[0_1px_0_rgba(0,0,0,0.02)] backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
        <Logo onDark={onDark} />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.slice(1, 6).map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-sm font-medium transition-colors',
                  onDark
                    ? 'text-white/85 hover:text-white'
                    : active
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-primary',
                )}
              >
                {link.label}
                {active && !onDark && (
                  <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-secondary" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/about"
            className={cn(
              'hidden text-sm font-medium transition-colors lg:inline-flex',
              onDark ? 'text-white/85 hover:text-white' : 'text-foreground/70 hover:text-primary',
            )}
          >
            About
          </Link>
          <Button
            size="pill"
            variant={onDark ? 'on-dark' : 'ocean'}
            className="hidden sm:inline-flex"
            render={<Link href="/contact" />}
          >
            Plan Your Trip
          </Button>
          <MobileNav onDark={onDark} />
        </div>
      </div>
    </header>
  )
}
