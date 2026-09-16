'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Building2,
  Home,
  Compass,
  Inbox,
  ExternalLink,
} from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { cn } from '@/lib/utils'

const items = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/resorts', label: 'Resorts', icon: Building2 },
  { href: '/admin/guest-houses', label: 'Guest Houses', icon: Home },
  { href: '/admin/experiences', label: 'Experiences', icon: Compass },
  { href: '/admin/inquiries', label: 'Inquiries', icon: Inbox },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 px-3 py-6">
        {items.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground',
              )}
            >
              <item.icon className="size-4.5 size-[18px]" aria-hidden="true" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-sidebar-border p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          <ExternalLink className="size-[18px]" aria-hidden="true" />
          View live site
        </Link>
      </div>
    </aside>
  )
}
