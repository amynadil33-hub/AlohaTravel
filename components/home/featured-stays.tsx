import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { featuredProperties } from '@/lib/data'
import { PropertyCard } from '@/components/site/property-card'
import { SectionHeader } from '@/components/site/section-header'
import { Reveal } from '@/components/site/reveal'

export function FeaturedStays() {
  const stays = featuredProperties.slice(0, 3)

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeader
          eyebrow="Hand-picked this season"
          title="Stays we can't stop thinking about"
          description="A rotating selection from our collection — chosen for the moments they make possible."
        />
        <Reveal delay={120}>
          <Link
            href="/explore"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            View all stays
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {stays.map((property, i) => (
          <Reveal key={property.id} delay={i * 90}>
            <PropertyCard property={property} className="h-full" />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
