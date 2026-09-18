import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import {
  resorts,
  experienceBySlug,
} from '@/lib/data'
import { PageShell } from '@/components/site/page-shell'
import { Reveal } from '@/components/site/reveal'
import { SectionHeader } from '@/components/site/section-header'
import { Tag } from '@/components/site/tag'
import { Gallery } from '@/components/property/gallery'
import { InquiryForm } from '@/components/site/inquiry-form'
import { ExperienceCard } from '@/components/site/experience-card'
import { PropertyCard } from '@/components/site/property-card'
import {
  InfoStat,
  FacilitiesGrid,
  HighlightsList,
} from '@/components/property/detail-sections'
import { RoomCategoryCard } from '@/components/property/room-category-card'

export function generateStaticParams() {
  return resorts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const property = resorts.find((item) => item.slug === slug)
  if (!property) return { title: 'Stay not found' }
  return {
    title: `${property.name} — ${property.atoll}`,
    description: property.shortDescription,
  }
}

export default async function StayPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const property = resorts.find((item) => item.slug === slug)
  if (!property) notFound()

  const relatedExperiences = property.experiences
    .map((s) => experienceBySlug(s))
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .slice(0, 3)

  const similar = resorts
    .filter((p) => p.id !== property.id)
    .slice(0, 3)

  const backHref = '/resorts'
  const backLabel = 'All resorts'

  return (
    <PageShell>
      <article className="pb-8 pt-28 md:pt-32">
        <div className="mx-auto max-w-6xl px-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <Link
              href={backHref}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {backLabel}
            </Link>
          </nav>

          {/* Title block */}
          <Reveal className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-secondary">
                {property.atoll} · {property.island}
              </span>
              <h1 className="text-balance font-serif text-4xl leading-[1.05] text-primary md:text-5xl">
                {property.name}
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                {property.shortDescription}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {property.tags.slice(0, 4).map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Gallery */}
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <Gallery images={property.gallery} name={property.name} />
          </Reveal>
        </div>

        {/* Body grid */}
        <div className="mx-auto mt-14 max-w-6xl px-6">
          <div className="grid gap-14 lg:grid-cols-[1fr_360px]">
            <div className="space-y-16">
              {/* Overview */}
              <Reveal as="section" className="space-y-6">
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                  <InfoStat label="Island" value={property.island} />
                  <InfoStat label="Atoll" value={property.atoll} />
                  <InfoStat
                    label="Style"
                    value="Private resort"
                  />
                </div>
                <div className="space-y-4 text-pretty text-[1.05rem] leading-relaxed text-foreground/90">
                  {property.description
                    .split('\n')
                    .filter(Boolean)
                    .map((para, i) => (
                      <p key={i}>{para.trim()}</p>
                    ))}
                </div>
              </Reveal>

              {/* Highlights */}
              {property.highlights.length > 0 && (
                <Reveal as="section" className="space-y-6">
                  <h2 className="font-serif text-2xl text-primary">
                    Why you&apos;ll love it
                  </h2>
                  <HighlightsList highlights={property.highlights} />
                </Reveal>
              )}

              {/* Room categories */}
              {property.roomCategories.length > 0 && (
                <Reveal as="section" className="space-y-6">
                  <h2 className="font-serif text-2xl text-primary">
                    Room categories
                  </h2>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {property.roomCategories.map((room) => (
                      <RoomCategoryCard key={room.name} room={room} />
                    ))}
                  </div>
                </Reveal>
              )}

              {/* Facilities */}
              {property.facilities.length > 0 && (
                <Reveal as="section" className="space-y-6">
                  <h2 className="font-serif text-2xl text-primary">
                    Facilities &amp; services
                  </h2>
                  <FacilitiesGrid facilities={property.facilities} />
                </Reveal>
              )}
            </div>

            {/* Sticky inquiry */}
            <aside className="lg:relative">
              <div className="lg:sticky lg:top-28">
                <div className="rounded-3xl border border-border bg-card p-6 shadow-[0_24px_60px_-40px_rgba(11,79,156,0.4)]">
                  <h2 className="font-serif text-2xl text-primary">
                    Plan this stay
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Tell us your dates and we&apos;ll craft a tailored itinerary
                    for {property.name}.
                  </p>
                  <div className="mt-6">
                    <InquiryForm propertyName={property.name} compact />
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Related experiences */}
      {relatedExperiences.length > 0 && (
        <section className="bg-secondary/40 py-20">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader
              eyebrow="Things to do"
              title="Experiences from this island"
            />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {relatedExperiences.map((exp, i) => (
                <Reveal key={exp.id} delay={i * 80}>
                  <ExperienceCard experience={exp} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Similar stays */}
      {similar.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-end justify-between gap-4">
              <SectionHeader
                eyebrow="Keep exploring"
                title="Similar resorts"
                className="mb-0"
              />
              <Link
                href={backHref}
                className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline sm:inline-flex"
              >
                View all
                <ChevronRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {similar.map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <PropertyCard property={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  )
}
