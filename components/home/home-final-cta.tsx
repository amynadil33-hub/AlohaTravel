import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WHATSAPP_URL } from '@/components/site/nav-links'

export function HomeFinalCta() {
  return (
    <section className="relative isolate overflow-hidden py-16 text-white md:py-20">
      <Image src="/images/real-dhigufaru-island-aerial.jpg" alt="Aerial view of Dhigufaru Island Resort and its lagoon" fill sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/70 via-secondary/45 to-deep/55" />
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <span className="eyebrow text-white">Your journey, personally planned</span>
        <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] md:text-6xl">Your Maldives Story Starts Here</h2>
        <p className="mx-auto mt-5 max-w-2xl text-pretty leading-relaxed text-white/95 md:text-lg">Tell us how you want to experience the Maldives, and we’ll help shape a holiday around your interests, preferences, and budget.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="xl" variant="accent" render={<Link href="/contact" />}>
            Start planning your holiday
            <ArrowRight className="size-4" data-icon="inline-end" aria-hidden="true" />
          </Button>
          <Button size="xl" variant="on-dark" render={<a href={WHATSAPP_URL} target="_blank" rel="noreferrer" />}>
            <MessageCircle className="size-4" data-icon="inline-start" aria-hidden="true" />
            WhatsApp us
          </Button>
        </div>
      </div>
    </section>
  )
}
