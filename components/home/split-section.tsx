import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'

const panels = [
  {
    href: '/resorts',
    image: '/images/split-resort.png',
    kicker: 'Private islands',
    title: 'Resorts',
    copy: 'One island, one resort. Overwater villas, house reefs, and service that anticipates every wish.',
    cta: 'Discover resorts',
  },
  {
    href: '/guest-houses',
    image: '/images/split-localisland.png',
    kicker: 'Local islands',
    title: 'Guest Houses',
    copy: 'Stay among the community. Home-cooked breakfasts, island bikes, and the real rhythm of Maldivian life.',
    cta: 'Discover guest houses',
  },
]

export function SplitSection() {
  return (
    <section className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12 max-w-2xl">
          <span className="eyebrow text-secondary">Two ways to stay</span>
          <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] md:text-5xl">
            The same ocean. Two very different mornings.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {panels.map((panel, i) => (
            <Reveal key={panel.title} delay={i * 120}>
              <Link
                href={panel.href}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl md:aspect-[4/3]"
              >
                <Image
                  src={panel.image || '/placeholder.svg'}
                  alt={panel.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/30 to-transparent" />
                <div className="relative p-7 md:p-8">
                  <span className="eyebrow text-white/70">{panel.kicker}</span>
                  <h3 className="mt-2 font-serif text-3xl font-medium md:text-4xl">
                    {panel.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed text-white/80">
                    {panel.copy}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    {panel.cta}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
