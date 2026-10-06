import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Compass, Heart, Palmtree, Sparkles, Users, Waves } from 'lucide-react'
import { PageShell } from '@/components/site/page-shell'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeader } from '@/components/site/section-header'
import { Reveal } from '@/components/site/reveal'
import { CtaBand } from '@/components/site/cta-band'

export const metadata: Metadata = {
  title: 'Discover the Maldives',
  description: 'Explore Maldives resorts, local islands, experiences, and travel styles with personalised planning from Aloha Travels.',
}

const waysToStay = [
  { title: 'Private-island resorts', copy: 'Explore overwater villas, beachfront stays, and complete island escapes.', image: '/images/real-westin-hero-aerial.jpg', href: '/resorts', cta: 'Explore resorts' },
  { title: 'Local islands', copy: 'Stay in guest houses and hotels while discovering a more local side of the Maldives.', image: '/images/real-gaadhiffushi-guesthouse-entrance.jpg', href: '/guest-houses', cta: 'Explore local stays' },
  { title: 'Ocean experiences', copy: 'Build memorable days around marine encounters, cruises, fishing, and sandbanks.', image: '/images/real-westin-snorkelling-aerial.jpg', href: '/experiences', cta: 'Explore experiences' },
]

const travelStyles = [
  { icon: Heart, title: 'Honeymoon', copy: 'Romantic island time shaped around the two of you.' },
  { icon: Users, title: 'Family', copy: 'Stays and experiences selected with every traveller in mind.' },
  { icon: Sparkles, title: 'Wellness', copy: 'Slow days, restorative settings, and space to switch off.' },
  { icon: Compass, title: 'Adventure', copy: 'Diving, watersports, excursions, and days spent exploring.' },
]

export default function MaldivesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Discover the destination"
        title="The Maldives, Your Way"
        description="Private-island resorts, welcoming local islands, and unforgettable ocean experiences — brought together around the way you want to travel."
        image="/images/real-westin-neutral-island.jpg"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Maldives' }]}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src="/images/real-dhigufaru-house-reef.jpg" alt="A Maldives island and its house reef meeting clear ocean water" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
          </Reveal>
          <Reveal>
            <span className="eyebrow text-secondary">Welcome to the Maldives</span>
            <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] text-primary md:text-5xl">One destination, many ways to experience it</h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">The Maldives can be a private-island retreat, a welcoming local-island stay, or an itinerary filled with life on and below the water. Aloha Travels helps bring the right places and experiences together around your interests, preferences, and budget.</p>
            <Link href="/explore" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary">Explore by interest <ArrowRight className="size-4" /></Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary/5 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader eyebrow="Choose your Maldives" title="Stay, explore, and experience" description="Start with the side of the destination that speaks to you." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {waysToStay.map((item, index) => (
              <Reveal key={item.title} delay={index * 80}>
                <Link href={item.href} className="group block h-full overflow-hidden rounded-2xl bg-white shadow-[0_18px_45px_-32px_rgba(6,42,82,0.65)]">
                  <div className="relative aspect-[4/3] overflow-hidden"><Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                  <div className="p-6"><h3 className="text-2xl text-primary">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.copy}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-secondary">{item.cta}<ArrowRight className="size-4" /></span></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeader eyebrow="Travel by feeling" title="Find the holiday that feels like yours" align="center" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {travelStyles.map((style, index) => (
              <Reveal key={style.title} delay={index * 60} className="rounded-2xl border border-primary/10 bg-white p-6 text-center">
                <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary/10 text-secondary"><style.icon className="size-5" /></span>
                <h3 className="mt-4 text-xl text-primary">{style.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{style.copy}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center"><Link href="/explore" className="inline-flex items-center gap-2 font-bold text-primary hover:text-secondary"><Waves className="size-4" /> Explore every travel style</Link></div>
        </div>
      </section>

      <CtaBand title="Let’s shape your Maldives holiday." copy="Tell us what matters to you and we’ll help bring together the right stays and experiences." primaryLabel="Plan your Maldives" primaryHref="/contact" image="/images/real-westin-parasailing.jpg" />
    </PageShell>
  )
}
