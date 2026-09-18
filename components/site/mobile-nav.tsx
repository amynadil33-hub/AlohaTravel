'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Logo } from './logo'
import { navLinks, WHATSAPP_URL } from './nav-links'

export function MobileNav({ onDark = false }: { onDark?: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className={cn(
              'xl:hidden',
              onDark ? 'text-white hover:bg-white/15' : 'text-foreground',
            )}
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" showCloseButton className="w-[85%] max-w-sm bg-background p-0">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="flex h-full flex-col">
          <div className="border-b border-border px-6 py-5">
            <Logo />
          </div>
          <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-4 py-6" aria-label="Mobile">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <SheetClose
                  key={link.href}
                  render={<Link href={link.href} />}
                  className={cn(
                    'rounded-lg px-3 py-3 font-serif text-2xl transition-colors',
                    active
                      ? 'text-primary'
                      : 'text-foreground/80 hover:bg-muted hover:text-primary',
                  )}
                >
                  {link.label}
                </SheetClose>
              )
            })}
          </nav>
          <div className="flex flex-col gap-2 border-t border-border px-4 py-5">
            <Button size="xl" variant="ocean" render={<Link href="/contact" onClick={() => setOpen(false)} />}>
              Plan Your Trip
            </Button>
            <Button
              size="xl"
              variant="ocean-outline"
              render={<a href={WHATSAPP_URL} target="_blank" rel="noreferrer" />}
            >
              <MessageCircle className="size-4" />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
