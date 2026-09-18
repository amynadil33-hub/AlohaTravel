import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, MessageCircle, SlidersHorizontal, Sparkles } from 'lucide-react'
import { PageShell } from '@/components/site/page-shell'
import { PageHero } from '@/components/site/page-hero'
import { SectionHeader } from '@/components/site/section-header'
import { Reveal } from '@/components/site/reveal'
import { Button } from '@/components/ui/button'
import { WHATSAPP_URL } from '@/components/site/nav-links'

export const metadata: Metadata = {
  title: 'Maldives Holiday Packages',
  description: 'Explore Maldives holiday inspiration and plan a personalised escape around your interests, preferences, and budget with Aloha Travels.',
}

const holidayIdeas = [
  { title: 'Romantic Maldives Escape', copy: 'A romantic island holiday shaped around the way you want to spend time together.', image: '/images/interest-romantic.png', eyebrow: 'For two' },
  { title: 'Luxury Island Retreat', copy: 'A refined private-island escape planned around your preferred setting and travel style.', image: '/images/resort-milaidhoo.png', eyebrow: 'Island luxury' },
  { title: 'Family Maldives Holiday', copy: 'A considered Maldives journey with stays and experiences selected for the whole family.', image: '/images/interest-family.png', eyebrow: 'Travel together' },
]

const planningPoints = [
  { icon: Heart, title: 'Your interests', copy: 'Start with the experiences and atmosphere that matter to you.' },
  { icon: SlidersHorizontal, title: 'Your preferences', copy: 'Shape the stay and journey around how you like to travel.' },
  { icon: Sparkles, title: 'Your budget', copy: 'Consider options that align with the budget you share with us.' },
]

export default function PackagesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Holiday inspiration"
        title="Handpicked Maldives Holidays"
        description="Start with an idea, then let Aloha Travels personalise the details around your interests, preferences, and budget."
        image="/images/resort-milaidhoo.png"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Packages' }]}
      />

      <section className="bg-gradient-to-br from-secondary/10 via-white to-primary/5 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader eyebrow="Three ways to begin" title="Find your starting point" description="These holiday concepts are inspiration for a personalised enquiry, not fixed-price or pre-booked packages." />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {holidayIdeas.map((idea, index) => (
              <Reveal key={idea.title} delay={index * 80}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-[0_18px_45px_-32px_rgba(6,42,82,0.65)]">
                  <div className="relative aspect-[16/10] overflow-hidden"><Image src={idea.image} alt={idea.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 hover:scale-105" /><div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-deep/45 to-transparent" /></div>
                  <div className="flex flex-1 flex-col border-t-4 border-secondary p-6">
                    <span className="eyebrow text-secondary">{idea.eyebrow}</span><h2 className="mt-2 text-2xl text-primary">{idea.title}</h2><p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{idea.copy}</p>
                    <Button size="pill" variant="ocean" className="mt-6 self-start" render={<Link href="/contact" />}>Plan this holiday<ArrowRight className="size-4" data-icon="inline-end" /></Button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeader eyebrow="Personalised by Aloha" title="A holiday built around you" description="We use your starting idea to guide a more personal Maldives plan." align="center" />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {planningPoints.map((point, index) => (
              <Reveal key={point.title} delay={index * 70} className="rounded-2xl border border-primary/10 bg-white p-7 text-center">
                <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary/10 text-secondary"><point.icon className="size-5" /></span><h3 className="mt-4 text-2xl text-primary">{point.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{point.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8 md:pb-24">
        <Reveal className="mx-auto flex max-w-6xl flex-col items-center rounded-3xl bg-primary px-7 py-14 text-center text-white md:px-14">
          <span className="eyebrow text-secondary">Ready to shape the details?</span>
          <h2 className="mt-4 max-w-3xl text-balance text-4xl font-medium md:text-5xl">Turn holiday inspiration into your Maldives plan</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/80">Share what you have in mind and Aloha Travels will help you explore suitable options.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="xl" className="bg-white text-primary hover:bg-white/90" render={<Link href="/contact" />}>Start planning<ArrowRight className="size-4" data-icon="inline-end" /></Button>
            <Button size="xl" variant="on-dark" render={<a href={WHATSAPP_URL} target="_blank" rel="noreferrer" />}><MessageCircle className="size-4" data-icon="inline-start" />WhatsApp us</Button>
          </div>
        </Reveal>
      </section>
    </PageShell>
  )
}
