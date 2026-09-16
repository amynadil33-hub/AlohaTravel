import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Interest } from '@/lib/types'
import { cn } from '@/lib/utils'

export function InterestCard({
  interest,
  className,
  size = 'default',
}: {
  interest: Interest
  className?: string
  size?: 'default' | 'tall'
}) {
  return (
    <Link
      href={`/explore?interest=${interest.slug}`}
      className={cn(
        'group relative block overflow-hidden rounded-2xl',
        size === 'tall' ? 'aspect-[3/4]' : 'aspect-[4/5]',
        className,
      )}
    >
      <Image
        src={interest.imageUrl || '/placeholder.svg'}
        alt={interest.name}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent transition-opacity duration-500 group-hover:from-primary/90" />
      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="font-serif text-2xl font-medium text-white">
              {interest.name}
            </h3>
            <p className="mt-1 max-w-[22ch] text-sm leading-snug text-white/80">
              {interest.description}
            </p>
          </div>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}
