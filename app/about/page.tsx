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
    'Aloha Travels creates personalised Maldives holidays backed by more than 20 years of travel and tourism experience.',
}

const values = [
  {
    icon: MapPinned,
    title: 'Deep local knowledge',
    body: 'Our Maldives travel and tourism experience gives us deep local knowledge to help shape each holiday.',
  },
  {
    icon: HeartHandshake,
    title: 'Personal service',
    body: 'We create personalised holidays around your interests, preferences, and budget.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted relationships',
    body: 'We draw on trusted industry relationships built through more than 20 years of experience.',
  },
  {
    icon: Compass,
    title: 'Details taken care of',
    body: 'From resorts, hotels and guest houses to holiday packages and yacht experiences, we take care of the details.',
  },
]

export default function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Our story"
        title="Personalised Maldives holidays"
        description="At Aloha Travels, we create personalised Maldives holidays built around your interests, preferences, and budget."
        image="/images/made-in-maldives.png"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
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
            <span className="eyebrow text-secondary">Aloha Travels</span>
            <h2 className="text-balance font-serif text-4xl leading-[1.05] text-primary md:text-5xl">
              More than 20 years of Maldives experience
            </h2>
            <div className="space-y-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              <p>
                At Aloha Travels, we create personalised Maldives holidays built
                around your interests, preferences, and budget.
              </p>
              <p>
                With roots in Aloha Maldives Pvt. Ltd., established in 2004, we
                bring more than 20 years of Maldives travel and tourism experience,
                deep local knowledge, trusted industry relationships, and personal
                service.
              </p>
              <p>
                From resorts, hotels and guest houses to holiday packages and
                yacht experiences, we take care of the details so you can simply
                enjoy the Maldives.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            eyebrow="Why Aloha Travels"
            title="Maldives travel shaped around you"
            description="Experience, local knowledge, trusted relationships, and personal service."
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
        copy="Tell us how you like to travel and we'll help shape a Maldives itinerary around you."
        primaryLabel="Start your trip"
        primaryHref="/contact"
      />
    </PageShell>
  )
}
