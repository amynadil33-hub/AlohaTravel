import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { interests } from '@/lib/data'
import { InterestCard } from '@/components/site/interest-card'
import { SectionHeader } from '@/components/site/section-header'
import { Reveal } from '@/components/site/reveal'

export function InterestsSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeader
          eyebrow="Travel by feeling"
          title="What do you dream of doing?"
          description="We match islands to intentions. Pick a mood and we'll show you where it lives."
        />
        <Reveal delay={120}>
          <Link
            href="/explore"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            See every interest
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {interests.map((interest, i) => (
          <Reveal key={interest.id} delay={i * 60}>
            <InterestCard interest={interest} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
