import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/site/reveal'

const holidayIdeas = [
  { title: 'Romantic Maldives Escape', copy: 'A personalised island holiday designed for time together.', image: '/images/interest-romantic.png' },
  { title: 'Luxury Island Retreat', copy: 'An elevated private-island stay shaped around your preferences.', image: '/images/resort-milaidhoo.png' },
  { title: 'Family Maldives Holiday', copy: 'A thoughtfully planned Maldives escape for the whole family.', image: '/images/interest-family.png' },
]

export function FeaturedStays() {
  return (
    <section className="border-y border-secondary/15 bg-gradient-to-br from-[#e6f8fb] via-[#f4fcfd] to-[#dff4fa] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <span className="eyebrow text-secondary">Featured holiday ideas</span>
            <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] text-primary md:text-5xl">Handpicked Maldives Holidays</h2>
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground md:text-lg">Three ways to imagine your Maldives journey, each personalised around you.</p>
          </div>
          <Button size="pill" variant="ocean" render={<Link href="/contact" />}>
            Plan a holiday
            <ArrowRight className="size-4" data-icon="inline-end" aria-hidden="true" />
          </Button>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {holidayIdeas.map((idea, index) => (
            <Reveal key={idea.title} delay={index * 80}>
              <article className="h-full overflow-hidden rounded-xl border border-primary/10 bg-white shadow-[0_16px_38px_-28px_rgba(11,79,156,0.65)]">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={idea.image} alt={idea.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-deep/35 to-transparent" />
                </div>
                <div className="border-t-4 border-secondary p-5">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-secondary">Personalised holiday idea</p>
                  <h3 className="mt-1.5 text-2xl font-medium text-primary">{idea.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{idea.copy}</p>
                  <div className="mt-4 flex items-center gap-2 border-t border-border pt-3 text-xs font-bold uppercase tracking-[0.1em] text-primary">
                    Tailored around you
                    <span className="h-px flex-1 bg-primary/15" />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
