import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { InquiryStatus } from '@/lib/types'

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string
  value: string | number
  hint?: string
  icon?: React.ElementType
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
        {Icon ? (
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="size-4" aria-hidden="true" />
          </span>
        ) : null}
      </div>
      <div className="mt-3 font-serif text-3xl text-foreground">{value}</div>
      {hint ? (
        <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
      ) : null}
    </div>
  )
}

const statusStyles: Record<InquiryStatus, string> = {
  new: 'bg-accent/15 text-accent',
  contacted: 'bg-primary/12 text-primary',
  planning: 'bg-secondary/15 text-secondary',
  confirmed: 'bg-emerald-500/15 text-emerald-600',
  closed: 'bg-muted text-muted-foreground',
}

export function StatusBadge({ status }: { status: InquiryStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize',
        statusStyles[status],
      )}
    >
      {status}
    </span>
  )
}

export function AdminPanel({
  title,
  description,
  action,
  children,
}: {
  title: string
  description?: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
        <div>
          <h2 className="font-serif text-lg text-foreground">{title}</h2>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  )
}

export function PublishedPill({ published }: { published: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-medium',
        published ? 'text-emerald-600' : 'text-muted-foreground',
      )}
    >
      <span
        className={cn(
          'size-1.5 rounded-full',
          published ? 'bg-emerald-500' : 'bg-muted-foreground/50',
        )}
      />
      {published ? 'Published' : 'Draft'}
    </span>
  )
}

export function AdminActionLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
    >
      {children}
    </Link>
  )
}
