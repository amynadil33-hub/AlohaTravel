import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  onDark = false,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  onDark?: boolean
  className?: string
}) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'eyebrow',
            onDark ? 'text-secondary' : 'text-secondary',
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'max-w-2xl text-balance text-4xl font-medium leading-[1.05] md:text-5xl',
          onDark ? 'text-white' : 'text-primary',
          align === 'center' && 'mx-auto',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'max-w-2xl text-pretty text-base leading-relaxed md:text-lg',
            onDark ? 'text-white/75' : 'text-muted-foreground',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}
