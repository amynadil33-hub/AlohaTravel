import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative flex min-h-[680px] items-center overflow-hidden pt-24 md:min-h-[730px]">
      <Image
        src="/images/hero-lagoon.png"
        alt="Aerial view of a Maldivian lagoon with overwater villas at golden hour"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[60%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-deep/80 via-primary/38 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-white/5" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-24">
        <div className="max-w-[680px]">
          <span className="eyebrow mb-5 inline-flex border-l-4 border-accent pl-3 text-white">
            Welcome to paradise
          </span>
          <h1 className="max-w-3xl text-balance text-5xl font-medium leading-[0.95] text-white drop-shadow-sm md:text-7xl lg:text-[5.15rem]">
            Discover Maldives, The Aloha Way
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-bold text-white md:text-xl">
            Backed by more than 20 years of Maldives travel experience.
          </p>
          <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-white/90 md:text-lg">
            Personalised Maldives holidays shaped around your interests,
            preferences, and budget, with deep local knowledge and personal
            service at every step.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="xl"
              className="rounded-lg bg-secondary text-white shadow-lg shadow-deep/15 hover:bg-secondary/90"
              render={<Link href="/explore" />}
            >
              Explore Maldives
              <ArrowRight className="size-4" data-icon="inline-end" aria-hidden="true" />
            </Button>
            <Button size="xl" variant="on-dark" className="rounded-lg border-white/60 bg-white/10" render={<Link href="/contact" />}>
              Plan your holiday
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
