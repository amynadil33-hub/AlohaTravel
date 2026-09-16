import type { Metadata } from 'next'
import { PageShell } from '@/components/site/page-shell'
import { PageHero } from '@/components/site/page-hero'
import { PropertyBrowser } from '@/components/site/property-browser'
import { CtaBand } from '@/components/site/cta-band'
import { resorts } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Maldives Resorts',
  description:
    'Private-island resorts across the Maldives — overwater villas, house reefs and barefoot luxury, curated by Alloha Travels & Tours.',
}

export default function ResortsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Private islands"
        title="Resorts"
        description="One island, one resort. Explore our collection of private-island escapes — from intimate house-reef hideaways to grand overwater sanctuaries."
        image="/images/resort-baros.png"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Resorts' }]}
      />
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <PropertyBrowser items={resorts} />
      </section>
      <CtaBand
        title="Not sure which island is yours?"
        copy="Tell us how you want to spend your days and we'll match you to the resort that fits."
      />
    </PageShell>
  )
}
