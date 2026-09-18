import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'

const experiences = [
  { title: 'Honeymoons', image: '/images/interest-honeymoon.png', href: '/explore?interest=honeymoon' },
  { title: 'Diving', image: '/images/interest-diving.png', href: '/explore?interest=diving' },
  { title: 'Surfing', image: '/images/interest-watersports.png', href: '/explore?interest=adventure' },
  { title: 'Island Hopping', image: '/images/exp-sandbank.png', href: '/explore' },
  { title: 'Wellness', image: '/images/interest-relaxation.png', href: '/explore?interest=relaxation' },
  { title: 'Family Holidays', image: '/images/interest-family.png', href: '/explore?interest=family' },
]

export function ExperiencesTeaser() {
  return (
    <section className="bg-[#f7fcfd] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-3xl">
          <span className="eyebrow text-secondary">Amazing experiences</span>
          <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] text-primary md:text-5xl">More Than Just a Holiday</h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground md:text-lg">Discover extraordinary ocean encounters, island moments, and experiences shaped around the way you love to travel.</p>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience, index) => (
            <Reveal key={experience.title} delay={index * 55}>
              <Link href={experience.href} className="group relative block overflow-hidden rounded-xl bg-white shadow-[0_16px_38px_-28px_rgba(6,42,82,0.75)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={experience.image} alt={experience.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/70 via-deep/5 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
                    <h3 className="font-serif text-2xl font-medium md:text-3xl">{experience.title}</h3>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/15 backdrop-blur-sm">
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
