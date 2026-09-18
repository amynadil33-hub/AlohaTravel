'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { MobileNav } from './mobile-nav'
import { navLinks, WHATSAPP_URL } from './nav-links'
import { MessageCircle } from 'lucide-react'

export function Header({
  transparent = false,
  homepage = false,
}: {
  transparent?: boolean
  homepage?: boolean
}) {
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
          : homepage
            ? 'border-b border-primary/10 bg-white py-2 shadow-[0_8px_30px_-24px_rgba(6,42,82,0.45)]'
            : 'border-b border-border/70 bg-background/85 py-3 shadow-[0_1px_0_rgba(0,0,0,0.02)] backdrop-blur-md',
      )}
    >
      <div className={cn('mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8', homepage ? 'gap-4' : 'gap-6')}>
        <Logo onDark={onDark} prominent={homepage} />

        <nav className={cn('hidden items-center lg:flex', homepage ? 'gap-5 xl:gap-7' : 'gap-7')} aria-label="Primary">
          {navLinks.slice(1, 6).map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative font-medium transition-colors',
                  homepage ? 'text-[0.82rem] xl:text-sm' : 'text-sm',
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
          {homepage && (
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-secondary xl:inline-flex"
            >
              <MessageCircle className="size-4 text-emerald-600" aria-hidden="true" />
              +960 797 4004
            </a>
          )}
          {!homepage && (
            <Link
              href="/about"
              className={cn(
                'hidden text-sm font-medium transition-colors lg:inline-flex',
                onDark ? 'text-white/85 hover:text-white' : 'text-foreground/70 hover:text-primary',
              )}
            >
              About
            </Link>
          )}
          <Button
            size="pill"
            variant={onDark ? 'on-dark' : 'ocean'}
            className={cn('hidden sm:inline-flex', homepage && 'rounded-lg bg-secondary px-5 hover:bg-secondary/90')}
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
