import type { Metadata } from 'next'
import { PageShell } from '@/components/site/page-shell'
import { PageHero } from '@/components/site/page-hero'
import { PropertyBrowser } from '@/components/site/property-browser'
import { CtaBand } from '@/components/site/cta-band'
import { guestHouses } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Maldives Guest Houses',
  description:
    'Boutique guest houses on local Maldivian islands — authentic island life, bikini beaches and warm hospitality, curated by Aloha Travels.',
}

export default function GuestHousesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Local islands"
        title="Guest Houses"
        description="Stay among the community. Home-cooked breakfasts, island bikes and the real rhythm of Maldivian life — at a fraction of resort prices."
        image="/images/guesthouse-dhigurah.png"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Guest Houses' }]}
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
