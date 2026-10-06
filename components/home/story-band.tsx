import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/site/reveal'

export function StoryBand() {
  return (
    <section className="bg-white">
      <div className="grid lg:grid-cols-2">
        <div className="flex items-center px-5 py-16 md:px-8 lg:justify-end lg:py-20">
          <Reveal className="w-full max-w-2xl lg:pr-16">
            <span className="eyebrow text-secondary">About Aloha Travels</span>
            <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] text-primary md:text-5xl">
              Built on More Than 20 Years of Maldives Experience
            </h2>
            <div className="mt-6 space-y-4 text-pretty leading-relaxed text-muted-foreground md:text-lg">
              <p>
                With roots in Aloha Maldives Pvt. Ltd., established in 2004, Aloha Travels brings more than 20 years of Maldives travel and tourism experience.
              </p>
              <p>
                Deep local knowledge, trusted industry relationships, and personalised service help us shape holidays around your interests, preferences, and budget.
              </p>
            </div>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {['Roots established in 2004', 'Deep local knowledge', 'Trusted relationships', 'Personalised service'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-semibold text-primary">
                  <span className="flex size-6 items-center justify-center rounded-full bg-secondary/10 text-secondary"><Check className="size-3.5" /></span>
                  {item}
                </li>
              ))}
            </ul>
            <Button size="xl" variant="ocean" className="mt-9" render={<Link href="/about" />}>
              About Aloha
              <ArrowRight className="size-4" data-icon="inline-end" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>

        <Reveal className="relative min-h-[420px] lg:min-h-[560px]">
          <Image src="/images/real-westin-lacquer-craft.jpg" alt="Traditional Maldivian lacquer craft being made by hand" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent" />
          <div className="absolute bottom-7 left-7 right-7 border-l-4 border-accent bg-white/92 p-5 text-primary backdrop-blur-md md:left-9 md:right-auto md:max-w-sm">
            <p className="font-serif text-2xl">Local knowledge. Personal service.</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Maldives holidays planned with experience and care.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
