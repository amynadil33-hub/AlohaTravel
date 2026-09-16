import Image from 'next/image'
import type { Metadata } from 'next'
import { Compass, HeartHandshake, MapPinned, ShieldCheck } from 'lucide-react'
import { PageShell } from '@/components/site/page-shell'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeader } from '@/components/site/section-header'
import { Reveal } from '@/components/site/reveal'
import { CtaBand } from '@/components/site/cta-band'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Alloha Travels & Tours is a Maldivian, family-run travel company crafting honest island journeys — from private-island resorts to local guest houses.',
}

const values = [
  {
    icon: MapPinned,
    title: 'Local, through and through',
    body: 'We are Maldivian born and raised. Every island we recommend is one we know by name — its reef, its people, its rhythm.',
  },
  {
    icon: HeartHandshake,
    title: 'Honest guidance',
    body: 'No pushy upsells. We match you to the stay that fits your trip and budget, whether that is an overwater suite or a beach house.',
  },
  {
    icon: ShieldCheck,
    title: 'Cared for, start to finish',
    body: 'Transfers, permits, dining, excursions — we handle the logistics so your only job is to arrive and unwind.',
  },
  {
    icon: Compass,
    title: 'Built around you',
    body: 'Diving addict, honeymooners, a family of five — we shape the itinerary around what you actually love doing.',
  },
]

const stats = [
  { value: '12+', label: 'Years on the water' },
  { value: '60+', label: 'Islands we know' },
  { value: '4,000+', label: 'Trips planned' },
  { value: '4.9', label: 'Average guest rating' },
]

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Our story"
        title="Maldives, told by the people who call it home"
        description="Alloha Travels & Tours is a small, family-run team turning the world's most photographed islands into journeys that actually feel like yours."
        image="/images/made-in-maldives.png"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Intro split */}
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="/images/story-dhigurah.png"
              alt="A long sandbar stretching into the turquoise ocean in the Maldives"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal className="space-y-5">
            <span className="eyebrow text-secondary">Alloha Travels &amp; Tours</span>
            <h2 className="text-balance font-serif text-4xl leading-[1.05] text-primary md:text-5xl">
              We started with one boat and a simple idea
            </h2>
            <div className="space-y-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              <p>
                That the Maldives should be shared the way locals experience it —
                unhurried, generous and deeply personal. What began as a single
                dhoni ferrying friends between islands grew into a travel company
                trusted by thousands of guests.
              </p>
              <p>
                Today we curate both sides of the Maldives: the barefoot luxury of
                private-island resorts, and the warm, authentic charm of local
                island guest houses. Same ocean, two very different ways to fall in
                love with it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="text-center">
              <div className="font-serif text-5xl leading-none">{s.value}</div>
              <div className="mt-2 text-sm uppercase tracking-[0.14em] text-primary-foreground/70">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            eyebrow="What we believe"
            title="Travel that feels handmade"
            description="A few principles guide every itinerary we build."
            align="center"
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 80}
                className="flex gap-5 rounded-2xl border border-border bg-card p-7"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <v.icon className="size-5" aria-hidden="true" />
                </span>
                <div className="space-y-2">
                  <h3 className="font-serif text-xl text-primary">{v.title}</h3>
                  <p className="text-pretty text-[0.95rem] leading-relaxed text-muted-foreground">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Let's plan your Maldives"
        copy="Tell us how you like to travel and we'll design an itinerary around it — no obligation, no pressure."
        primaryLabel="Start your trip"
        primaryHref="/contact"
      />
    </PageShell>
  )
}
