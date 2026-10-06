import type { Metadata } from 'next'
import { PageShell } from '@/components/site/page-shell'
import { PageHero } from '@/components/site/page-hero'
import { PropertyBrowser } from '@/components/site/property-browser'
import { CtaBand } from '@/components/site/cta-band'
import { resorts } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Maldives Resorts',
  description:
    'Browse approved Maldives resort identities and plan a personalised holiday with Aloha Travels.',
}

export default function ResortsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Private islands"
        title="Resorts"
        description="Explore approved Maldives resort identities and contact Aloha Travels to plan a holiday around your interests, preferences, and budget."
        image="/images/real-dhigufaru-house-reef.jpg"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Resorts' }]}
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <PropertyBrowser items={resorts} />
      </section>
      <CtaBand
        title="Not sure which island is yours?"
        copy="Tell us how you want to spend your days and we'll match you to the resort that fits."
        image="/images/real-westin-paddleboarding.jpg"
      />
    </PageShell>
  )
}
