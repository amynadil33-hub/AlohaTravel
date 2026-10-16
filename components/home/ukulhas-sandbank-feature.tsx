import Image from 'next/image'
import { Reveal } from '@/components/site/reveal'

export function UkulhasSandbankFeature() {
  return (
    <section className="bg-[#f4fafb] py-14 md:py-18 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 md:px-8 lg:grid-cols-[0.72fr_1.55fr] lg:gap-12">
        <Reveal className="max-w-xl">
          <span className="eyebrow text-secondary">Near Ukulhas · Alif Alif Atoll</span>
          <h2 className="mt-4 text-balance text-4xl font-medium leading-[1.05] text-primary md:text-5xl">
            A little stretch of paradise
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground md:text-lg">
            A long ribbon of white sand near Ukulhas, surrounded by clear turquoise water and the open Maldivian horizon.
          </p>
        </Reveal>

        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-[0_28px_70px_-42px_rgba(6,42,82,0.7)] sm:aspect-[16/10] lg:aspect-[16/9]">
          <Image
            src="/images/ukulhas-sandbank.jpeg"
            alt="Long white sandbank near Ukulhas surrounded by turquoise water and coral reef"
            fill
            sizes="(max-width: 1024px) 100vw, 68vw"
            className="object-cover object-[center_68%]"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20" />
        </Reveal>
      </div>
    </section>
  )
}
