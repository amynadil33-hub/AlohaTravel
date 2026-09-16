import type { Metadata } from 'next'
import { PageShell } from '@/components/site/page-shell'
import { PageHero } from '@/components/site/page-hero'
import { PropertyBrowser } from '@/components/site/property-browser'
import { MoodGrid } from '@/components/explore/mood-grid'
import { SectionHeader } from '@/components/site/section-header'
import { CtaBand } from '@/components/site/cta-band'
import { properties, interestBySlug } from '@/lib/data'
import type { InterestSlug } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Explore the Maldives by Interest',
  description:
    'Find your Maldives by feeling — diving, honeymoon, family, relaxation and more. Discover the islands that match how you dream of travelling.',
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>
}) {
  const params = await searchParams
  const interest = params.interest
  const matched = interest ? interestBySlug(interest) : undefined

  return (
    <PageShell>
      <PageHero
        eyebrow="Travel by feeling"
        title={matched ? matched.name : 'What do you dream of doing?'}
        description={
          matched
            ? matched.description
            : 'Skip the endless scrolling. Tell us the kind of days you want, and we\u2019ll show you the islands that deliver them.'
        }
        image={matched ? matched.imageUrl : '/images/exp-sandbank.png'}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Explore', href: '/explore' },
          ...(matched ? [{ label: matched.name }] : []),
        ]}
      />

      {!matched && (
        <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <SectionHeader
            eyebrow="Start with a mood"
            title="Six ways to feel the Maldives"
            description="Every mood leads to a curated set of stays and experiences."
            className="mb-10"
          />
          <MoodGrid />
        </section>
      )}

      <section className="mx-auto max-w-6xl px-5 pb-16 pt-6 md:px-8 md:pb-24">
        <SectionHeader
          eyebrow={matched ? `Stays for ${matched.name.toLowerCase()}` : 'The full collection'}
          title={matched ? `Islands made for ${matched.name.toLowerCase()}` : 'Browse every stay'}
          className="mb-10"
        />
        <PropertyBrowser
          items={properties}
          initialInterest={interest as InterestSlug | undefined}
        />
      </section>

      <CtaBand />
    </PageShell>
  )
}
