import { cn } from '@/lib/utils'

export function Tag({
  children,
  variant = 'default',
  className,
}: {
  children: React.ReactNode
  variant?: 'default' | 'onImage' | 'outline'
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide',
        variant === 'default' && 'bg-secondary/12 text-primary',
        variant === 'outline' && 'border border-border text-muted-foreground',
        variant === 'onImage' &&
          'border border-white/25 bg-white/15 text-white backdrop-blur-sm',
        className,
      )}
    >
      {children}
    </span>
  )
}
