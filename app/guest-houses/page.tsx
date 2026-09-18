import type { Metadata } from 'next'
import { PageShell } from '@/components/site/page-shell'
import { PageHero } from '@/components/site/page-hero'
import { PropertyBrowser } from '@/components/site/property-browser'
import { CtaBand } from '@/components/site/cta-band'
import { guestHouses } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Maldives Hotels & Guest Houses',
  description:
    'Explore hotels and guest houses on local Maldivian islands, curated by Aloha Travels.',
}

export default function GuestHousesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Local islands"
        title="Hotels & Guest Houses"
        description="Explore stays on local Maldivian islands and experience a different side of the destination."
        image="/images/guesthouse-dhigurah.png"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Hotels & Guest Houses' }]}
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <PropertyBrowser items={guestHouses} />
      </section>
      <CtaBand
        title="Travel the Maldives, the local way."
        copy="We'll help you pick the right island, the right season and the right excursions."
      />
    </PageShell>
  )
}
