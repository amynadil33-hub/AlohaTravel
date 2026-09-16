'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PanelsTopLeft } from 'lucide-react'

const titles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/resorts': 'Resorts',
  '/admin/guest-houses': 'Guest Houses',
  '/admin/experiences': 'Experiences',
  '/admin/inquiries': 'Inquiries',
}

export function AdminTopbar() {
  const pathname = usePathname()
  const title =
    Object.entries(titles).find(([href]) =>
      href === '/admin' ? pathname === href : pathname.startsWith(href),
    )?.[1] ?? 'Admin'

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin"
          className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary lg:hidden"
          aria-label="Admin home"
        >
          <PanelsTopLeft className="size-4" />
        </Link>
        <div>
          <h1 className="font-serif text-xl text-foreground">{title}</h1>
          <p className="text-xs text-muted-foreground">Alloha admin portal</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <div className="text-sm font-medium text-foreground">Aisha Rasheed</div>
          <div className="text-xs text-muted-foreground">Travel manager</div>
        </div>
        <span
          className="flex size-9 items-center justify-center rounded-full bg-primary font-serif text-sm text-primary-foreground"
          aria-hidden="true"
        >
          AR
        </span>
      </div>
    </header>
  )
}
