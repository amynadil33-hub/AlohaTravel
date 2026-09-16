import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Experience } from '@/lib/types'
import { cn } from '@/lib/utils'

export function ExperienceCard({
  experience,
  className,
}: {
  experience: Experience
  className?: string
}) {
  return (
    <Link
      href={`/experiences#${experience.slug}`}
      className={cn(
        'group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl',
        className,
      )}
    >
      <Image
        src={experience.imageUrl || '/placeholder.svg'}
        alt={experience.name}
        fill
        sizes="(max-width: 768px) 80vw, 40vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/25 to-transparent" />
      <div className="relative p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-balance font-serif text-2xl font-medium text-white">
            {experience.name}
          </h3>
          <ArrowUpRight className="size-5 shrink-0 text-white/70 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
        </div>
        <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-white/80">
          {experience.description}
        </p>
      </div>
    </Link>
  )
}
