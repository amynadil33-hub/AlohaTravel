import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Logo({
  onDark = false,
  className,
}: {
  onDark?: boolean
  className?: string
}) {
  return (
    <Link
      href="/"
      aria-label="Aloha Travels — home"
      className={cn('group inline-flex items-center gap-2.5', className)}
    >
      <span className="inline-flex size-11 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.03]">
        <Image
          src="/images/aloha-logo.png"
          alt="Aloha Travels logo"
          width={44}
          height={44}
          className="size-full object-contain p-1"
          priority
        />
      </span>
      <span className="flex flex-col leading-none">
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
