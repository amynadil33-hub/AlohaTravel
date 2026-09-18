import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { PageShell } from '@/components/site/page-shell'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { CtaBand } from '@/components/site/cta-band'
import { experiences, properties } from '@/lib/data'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Maldives Experiences',
  description:
    'Whale sharks, manta rays, sunset dhoni cruises and sandbank picnics — unforgettable Maldives experiences curated by Aloha Travels.',
}

export default function ExperiencesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Beyond the villa"
        title="Experiences"
        description="The Maldives isn't only where you stay — it's what you do. These are the moments our guests remember most."
        image="/images/exp-manta.png"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Experiences' }]}
      />

      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-col gap-20 md:gap-28">
          {experiences.map((exp, i) => {
            const related = properties.filter((p) =>
              exp.relatedPropertyIds.includes(p.id),
            )
            const flip = i % 2 === 1
            return (
              <Reveal
                key={exp.id}
                id={exp.slug}
                className="grid scroll-mt-28 items-center gap-8 md:grid-cols-2 md:gap-14"
              >
                <div className={cn('relative', flip && 'md:order-2')}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                    <Image
                      src={exp.imageUrl || '/placeholder.svg'}
                      alt={exp.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <span className="absolute left-5 top-5 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className={cn(flip && 'md:order-1')}>
                  <span className="eyebrow text-secondary">Experience</span>
                  <h2 className="mt-3 text-balance font-serif text-3xl font-medium text-primary md:text-4xl">
                    {exp.name}
                  </h2>
                  <p className="mt-4 text-pretty leading-relaxed text-muted-foreground md:text-lg">
                    {exp.description}
                  </p>

                  {related.length > 0 && (
                    <div className="mt-6">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Where to do it
                      </p>
                      <ul className="mt-3 flex flex-col gap-2">
                        {related.map((p) => (
                          <li key={p.id}>
                            <Link
                              href={`/stays/${p.slug}`}
                              className="group inline-flex items-center gap-2 text-sm font-medium text-primary"
                            >
                              <MapPin className="size-4 text-secondary" />
                              {p.name}
                              <ArrowRight className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>

      <CtaBand
        title="Build a trip around the moments."
        copy="Tell us which experiences excite you most and we'll design an itinerary around them."
      />
    </PageShell>
  )
}
