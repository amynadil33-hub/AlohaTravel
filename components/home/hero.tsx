import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden">
      <Image
        src="/images/hero-lagoon.png"
        alt="Aerial view of a Maldivian lagoon with overwater villas at golden hour"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/25 to-primary/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-32 md:px-8 md:pb-24">
        <div className="max-w-3xl">
          <span className="eyebrow mb-6 inline-flex items-center gap-2 text-white/85">
            <MapPin className="size-3.5" aria-hidden="true" />
            1,192 islands · 26 atolls · one ocean
          </span>
          <h1 className="text-balance text-5xl font-medium leading-[0.98] text-white md:text-7xl lg:text-[5.5rem]">
            Find your side of paradise.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/85 md:text-xl">
            From overwater sanctuaries to warm-hearted local islands, we curate
            stays across the Maldives around one simple question — what do you
            dream of doing?
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="xl"
              className="bg-white text-primary hover:bg-white/90"
              render={<Link href="/explore" />}
            >
              Start exploring
              <ArrowRight className="size-4" data-icon="inline-end" aria-hidden="true" />
            </Button>
            <Button size="xl" variant="on-dark" render={<Link href="/resorts" />}>
              Browse resorts
            </Button>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/15 bg-primary/30 backdrop-blur-md">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 py-6 text-white md:grid-cols-4 md:px-8">
          {[
            ['150+', 'Curated stays'],
            ['40+', 'Local islands'],
            ['8', 'Ways to travel'],
            ['24/7', 'Local concierge'],
          ].map(([stat, label]) => (
            <div key={label} className="flex flex-col gap-1 px-2">
              <dt className="font-serif text-3xl font-medium md:text-4xl">
                {stat}
              </dt>
              <dd className="text-xs uppercase tracking-[0.14em] text-white/70">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
