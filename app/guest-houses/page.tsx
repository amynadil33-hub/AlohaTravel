import type { Metadata } from 'next'
import { PageShell } from '@/components/site/page-shell'
import { PageHero } from '@/components/site/page-hero'
import { EmptyState } from '@/components/site/empty-state'
import { CtaBand } from '@/components/site/cta-band'

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
        image="/images/split-localisland.png"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Hotels & Guest Houses' }]}
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <EmptyState
          title="Approved listings are being prepared"
          description="We’re preparing our approved hotel and guest-house collection. Contact Aloha Travels and we’ll help you plan your Maldives stay."
          actionLabel="Send an enquiry"
          actionHref="/contact"
        />
      </section>
      <CtaBand
        title="Plan a local-island stay with us."
        copy="Tell us what you're looking for and we'll help shape the next steps."
      />
    </PageShell>
  )
}
