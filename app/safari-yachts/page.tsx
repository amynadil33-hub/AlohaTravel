import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Anchor, ArrowRight, Compass, Fish, MessageCircle, Ship, Waves } from 'lucide-react'
import { PageShell } from '@/components/site/page-shell'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeader } from '@/components/site/section-header'
import { Reveal } from '@/components/site/reveal'
import { Button } from '@/components/ui/button'
import { WHATSAPP_URL } from '@/components/site/nav-links'

export const metadata: Metadata = {
  title: 'Maldives Safari Yachts',
  description: 'Discover the Maldives by sea with personalised safari yacht and liveaboard holiday planning from Aloha Travels.',
}

const experiences = [
  { icon: Ship, title: 'Cruising', copy: 'Experience the Maldives as a journey across open water, lagoons, and island horizons.' },
  { icon: Fish, title: 'Diving', copy: 'Shape a sea-based holiday around diving and the marine environments you want to explore.' },
  { icon: Waves, title: 'Snorkelling', copy: 'Make time for reefs, clear lagoons, and unhurried moments in the water.' },
  { icon: Compass, title: 'Island exploration', copy: 'Combine days at sea with opportunities to discover different island settings.' },
]

export default function SafariYachtsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Maldives by sea"
        title="Safari Yachts"
        description="A sea-based Maldives holiday brings cruising, ocean experiences, and island discovery into one personalised journey."
        image="/images/real-atoll-villa-yacht-exterior.jpg"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Safari Yachts' }]}
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="eyebrow text-secondary">A different Maldives journey</span>
            <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] text-primary md:text-5xl">Wake up somewhere new</h2>
            <div className="mt-5 space-y-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              <p>A safari yacht or liveaboard holiday offers a different way to experience the Maldives: travelling by sea and building each day around the ocean.</p>
              <p>Aloha Travels can help shape an enquiry around your interests, preferences, and budget, whether your focus is cruising, diving, snorkelling, or island exploration.</p>
            </div>
            <p className="mt-6 rounded-xl border border-secondary/20 bg-secondary/5 p-4 text-sm leading-relaxed text-muted-foreground">Yacht options are planned by enquiry. Specific vessels, routes, schedules, and availability are confirmed during the planning process.</p>
          </Reveal>
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image src="/images/real-atoll-villa-ocean-lounge.jpg" alt="A panoramic lounge aboard a Maldives safari yacht" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-primary backdrop-blur"><Anchor className="size-4 text-secondary" /> Planned around your interests</span>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary/5 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeader eyebrow="Life on the water" title="Build the journey around what you love" description="A safari yacht holiday can bring together several ways to experience the Maldives." align="center" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {experiences.map((experience, index) => (
              <Reveal key={experience.title} delay={index * 70} className="rounded-2xl border border-primary/10 bg-white p-6">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary text-white"><experience.icon className="size-5" /></span>
                <h3 className="mt-5 text-2xl text-primary">{experience.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{experience.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-20">
        <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-deep px-7 py-14 text-white md:px-14 md:py-16">
          <div className="absolute inset-y-0 right-0 hidden w-2/5 opacity-35 md:block"><Image src="/images/real-atoll-villa-open-sea.jpeg" alt="" fill sizes="40vw" className="object-cover" /></div>
          <div className="relative max-w-2xl">
            <span className="eyebrow text-secondary">Start with a conversation</span>
            <h2 className="mt-4 text-balance text-4xl font-medium md:text-5xl">Plan your Maldives journey by sea</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-white/80">Tell us what you want from the experience and we’ll help shape the next steps around you.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="xl" className="bg-white text-primary hover:bg-white/90" render={<Link href="/contact" />}>Send an enquiry<ArrowRight className="size-4" data-icon="inline-end" /></Button>
              <Button size="xl" variant="on-dark" render={<a href={WHATSAPP_URL} target="_blank" rel="noreferrer" />}><MessageCircle className="size-4" data-icon="inline-start" />WhatsApp us</Button>
            </div>
          </div>
        </Reveal>
      </section>
    </PageShell>
  )
}
