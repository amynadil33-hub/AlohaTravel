import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from '@/components/site/reveal'

export function CtaBand({
  title = 'Let\u2019s plan your Maldives.',
  copy = 'Tell us how you dream of spending your days. We\u2019ll shape a shortlist of stays and experiences around it — no obligation, no pressure.',
  primaryLabel = 'Start planning',
  primaryHref = '/contact',
}: {
  title?: string
  copy?: string
  primaryLabel?: string
  primaryHref?: string
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8 md:pb-28">
      <Reveal className="relative overflow-hidden rounded-[2rem]">
        <Image
          src="/images/cta-ocean.png"
          alt=""
          fill
          sizes="(max-width: 1152px) 100vw, 1152px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep/90 via-deep/70 to-primary/50" />
        <div className="relative flex flex-col items-start gap-6 px-7 py-16 md:px-16 md:py-24">
          <h2 className="max-w-xl text-balance text-4xl font-medium leading-[1.05] text-white md:text-5xl">
            {title}
          </h2>
          <p className="max-w-lg text-pretty leading-relaxed text-white/80 md:text-lg">
            {copy}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="xl"
              className="bg-white text-primary hover:bg-white/90"
              render={<Link href={primaryHref} />}
            >
              {primaryLabel}
              <ArrowRight className="size-4" data-icon="inline-end" aria-hidden="true" />
            </Button>
            <Button size="xl" variant="on-dark" render={<Link href="/explore" />}>
              Browse the collection
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
