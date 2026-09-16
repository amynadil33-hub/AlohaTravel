import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/site/reveal'

export function StoryBand() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="/images/made-in-maldives.png"
              alt="Everyday island life in the Maldives"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 hidden w-48 overflow-hidden rounded-2xl border-4 border-background shadow-xl md:block">
            <div className="relative aspect-[3/4]">
              <Image
                src="/images/story-dhigurah.png"
                alt="Dhigurah island sandbar"
                fill
                sizes="12rem"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <span className="eyebrow text-secondary">Made in the Maldives</span>
          <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] text-primary md:text-5xl">
            We&apos;re islanders first, hosts second.
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground md:text-lg">
            Every stay in our collection is walked, swum, and eaten at by our own
            team. We grew up on these atolls — so we know which house reef teems
            at dawn, which guest house serves the best mas huni, and which sandbank
            disappears at high tide.
          </p>
          <ul className="mt-8 flex flex-col gap-4">
            {[
              ['Local knowledge', 'Recommendations from people who live here.'],
              ['Honest matches', 'We only suggest stays that fit your trip.'],
              ['On-island support', 'A real person, one message away.'],
            ].map(([title, copy]) => (
              <li key={title} className="flex gap-4">
                <span className="mt-1 size-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span>
                  <span className="font-semibold text-primary">{title}. </span>
                  <span className="text-muted-foreground">{copy}</span>
                </span>
              </li>
            ))}
          </ul>
          <Button
            size="xl"
            variant="ocean"
            className="mt-9"
            render={<Link href="/about" />}
          >
            Our story
            <ArrowRight className="size-4" data-icon="inline-end" aria-hidden="true" />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
