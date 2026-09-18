import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import type { Property } from '@/lib/types'
import { Tag } from './tag'
import { cn } from '@/lib/utils'

export function PropertyCard({
  property,
  className,
  featured = false,
}: {
  property: Property
  className?: string
  featured?: boolean
}) {
  return (
    <Link
      href={`/stays/${property.slug}`}
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(11,79,156,0.35)]',
        className,
      )}
    >
      <div className={cn('relative overflow-hidden', featured ? 'aspect-[16/11]' : 'aspect-[4/3]')}>
        <Image
          src={property.heroImage || '/placeholder.svg'}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute left-4 top-4">
          <Tag variant="onImage" className="capitalize">
            {property.type === 'resort' ? 'Resort' : 'Hotel / Guest House'}
          </Tag>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-secondary">
          <MapPin className="size-3.5" />
          {property.atoll}
        </span>
        <h3 className="mt-2 font-serif text-2xl font-medium leading-tight text-primary">
          {property.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {property.shortDescription}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {property.tags.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Explore {property.type === 'resort' ? 'Resort' : 'Stay'}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
