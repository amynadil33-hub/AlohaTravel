import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Logo({
  onDark = false,
  prominent = false,
  className,
}: {
  onDark?: boolean
  prominent?: boolean
  className?: string
}) {
  return (
    <Link
      href="/"
      aria-label="Aloha Travels — home"
      className={cn('group inline-flex items-center gap-2.5', className)}
    >
      <span className={cn('inline-flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-[1.03]', prominent ? 'h-[72px] w-[74px] sm:w-[88px]' : 'size-12')}>
        <Image
          src="/images/aloha-logo.png"
          alt="Aloha Travels logo"
          width={prominent ? 88 : 48}
          height={prominent ? 72 : 48}
          className="size-full object-contain"
          priority
        />
      </span>
      <span className={cn('flex flex-col leading-none', prominent && 'sr-only')}>
        <span
          className={cn(
            'font-serif text-xl font-semibold tracking-tight',
            onDark ? 'text-white' : 'text-primary',
          )}
        >
          Aloha
        </span>
        <span
          className={cn(
            'mt-1 text-[0.5rem] font-semibold uppercase tracking-[0.34em]',
            onDark ? 'text-white/70' : 'text-muted-foreground',
          )}
        >
          Travels
        </span>
      </span>
    </Link>
  )
}
