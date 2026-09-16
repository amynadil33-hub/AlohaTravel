import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  breadcrumbs,
  size = 'default',
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  image: string
  breadcrumbs?: { label: string; href?: string }[]
  size?: 'default' | 'tall'
  children?: React.ReactNode
}) {
  return (
    <section
      className={cn(
        'relative flex flex-col justify-end overflow-hidden',
        size === 'tall' ? 'min-h-[70vh]' : 'min-h-[52vh]',
      )}
    >
      <Image
        src={image || '/placeholder.svg'}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-primary/45 to-primary/35" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-12 pt-24 md:px-8 md:pb-16">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-white/70">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-1">
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 && (
                    <ChevronRight className="size-3.5" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <span className="eyebrow text-secondary">{eyebrow}</span>}
        <h1 className="mt-3 max-w-3xl text-balance text-4xl font-medium leading-[1.02] text-white md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-white/80">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}
