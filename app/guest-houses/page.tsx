import type { Metadata } from 'next'
import { approvedGuestHouses } from '@/lib/data'
import { PropertyBrowser } from '@/components/site/property-browser'
import { PageShell } from '@/components/site/page-shell'
import { PageHero } from '@/components/site/page-hero'
import { CtaBand } from '@/components/site/cta-band'

export const metadata: Metadata = {
  title: 'Maldives Hotels & Guest Houses',
  description:
    'Explore approved hotels and guest houses for a personalised local-island stay with Aloha Travels.',
}

export default function GuestHousesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Local islands"
        title="Hotels & Guest Houses"
        description="Explore stays on local Maldivian islands and experience a different side of the destination."
        image="/images/real-avanti-guesthouse.webp"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Hotels & Guest Houses' }]}
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <PropertyBrowser items={approvedGuestHouses} />
      </section>
      <CtaBand
        title="Plan a local-island stay with us."
        copy="Tell us what you're looking for and we'll help shape the next steps."
        image="/images/real-h78-seaview-room.webp"
        showSecondary={false}
      />
    </PageShell>
  )
}
