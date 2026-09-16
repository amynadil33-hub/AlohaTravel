'use client'

import Link from 'next/link'
import { Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function EmptyState({
  title,
  description,
  actionLabel = 'Plan Your Trip',
  actionHref = '/contact',
  onAction,
}: {
  title: string
  description?: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-secondary/12 text-secondary">
        <Compass className="size-6" />
      </span>
      <h3 className="mt-5 font-serif text-2xl font-medium text-primary">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      {onAction ? (
        <Button variant="ocean" size="pill" className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : (
        <Button variant="ocean" size="pill" className="mt-6" render={<Link href={actionHref} />}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
