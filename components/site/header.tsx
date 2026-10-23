'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { MobileNav } from './mobile-nav'
import { navLinks, PHONE_URL, WHATSAPP_URL } from './nav-links'
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
          <div className="hidden shrink-0 flex-col items-stretch gap-1 xl:flex">
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
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Aloha Travels on WhatsApp"
              className="inline-flex whitespace-nowrap items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1 text-[0.65rem] font-bold text-white shadow-sm transition-all hover:-translate-y-px hover:bg-[#1fbd5b] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <WhatsAppIcon />
              WhatsApp
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

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-3.5 shrink-0"
      aria-hidden="true"
    >
      <path d="M12.04 2a9.84 9.84 0 0 0-8.46 14.86L2 22l5.29-1.54A9.96 9.96 0 1 0 12.04 2Zm0 17.92a8.06 8.06 0 0 1-4.1-1.12l-.3-.18-3.14.92.94-3.06-.2-.31a7.86 7.86 0 1 1 6.8 3.75Zm4.4-5.89c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.37-1.94-1.2a7.27 7.27 0 0 1-1.34-1.66c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.47-.39-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  )
}
