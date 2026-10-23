'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { MobileNav } from './mobile-nav'
import { navLinks, PHONE_URL } from './nav-links'
import { ArrowUpRight, Phone } from 'lucide-react'

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

        <nav className={cn('hidden items-center xl:flex', homepage ? 'gap-3 2xl:gap-5' : 'gap-3 2xl:gap-5')} aria-label="Primary">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative font-medium transition-colors',
                  homepage ? 'text-[0.72rem] 2xl:text-xs' : 'text-xs 2xl:text-[0.82rem]',
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
          <div className="hidden shrink-0 xl:block">
            <a
              href={PHONE_URL}
              className={cn(
                'inline-flex whitespace-nowrap items-center justify-center gap-1.5 text-xs font-bold transition-colors 2xl:text-sm',
                onDark
                  ? 'text-white hover:text-white/80'
                  : 'text-primary hover:text-secondary',
              )}
            >
              <Phone className="size-3.5 shrink-0 text-secondary" aria-hidden="true" />
              <span>+960 797 4004</span>
            </a>
          </div>
          <Button
            size="pill"
            variant={onDark ? 'on-dark' : 'ocean'}
            className={cn('hidden sm:inline-flex', homepage && 'rounded-lg bg-secondary px-5 hover:bg-secondary/90')}
            render={<Link href="/contact" />}
          >
            Plan Your Trip
          </Button>
          <MobileNav onDark={onDark} />
          <a
            href="https://alohamaldives.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Aloha Maldives"
            title="Visit Aloha Maldives"
            className={cn(
              'group relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-xl border bg-white/95 px-2.5 py-2 shadow-[0_10px_30px_-16px_rgba(6,42,82,0.8)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/50 hover:shadow-[0_14px_34px_-14px_rgba(6,42,82,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2',
              onDark
                ? 'border-white/40 focus-visible:ring-offset-deep'
                : 'border-primary/10 focus-visible:ring-offset-white',
            )}
          >
            <span className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-[#ed1c24] to-[#f97316]" />
            <Image
              src="/images/aloha-maldives-partner.png"
              alt="Aloha Maldives"
              width={155}
              height={52}
              className="h-auto w-[94px] transition-transform duration-300 group-hover:scale-[1.04] sm:w-[108px] 2xl:w-[116px]"
            />
            <span className="hidden border-l border-primary/10 pl-2 2xl:block">
              <span className="block text-[0.55rem] font-bold uppercase tracking-[0.18em] text-primary/45">
                Parent company
              </span>
              <span className="mt-0.5 flex items-center gap-1 text-[0.68rem] font-bold text-primary">
                Visit website
                <ArrowUpRight className="size-3 text-secondary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}
