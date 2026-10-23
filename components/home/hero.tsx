'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const heroSlides = [
  {
    src: '/images/hero-slide-island-aerial.webp',
    alt: 'Aerial view of a Maldives island resort surrounded by turquoise water',
  },
  {
    src: '/images/hero-slide-sunset-island.webp',
    alt: 'A tropical Maldives island at sunset',
  },
  {
    src: '/images/hero-slide-sunset-villas.webp',
    alt: 'Overwater Maldives villas glowing beneath a dramatic sunset',
  },
  {
    src: '/images/hero-slide-night-villas.webp',
    alt: 'Illuminated overwater villas curving around a Maldives lagoon at night',
  },
] as const

const slideInterval = 6000

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (isPaused || reducedMotion.matches) return

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, slideInterval)

    return () => window.clearInterval(timer)
  }, [isPaused])

  const showPreviousSlide = () => {
    setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length)
  }

  const showNextSlide = () => {
    setActiveSlide((current) => (current + 1) % heroSlides.length)
  }

  return (
    <section
      className="relative flex min-h-[680px] items-center overflow-hidden pt-24 md:min-h-[730px]"
      aria-label="Maldives highlights"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false)
      }}
    >
      <div className="absolute inset-0" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover object-center transition-[opacity,transform] duration-[1400ms] ease-in-out motion-reduce:transition-none ${
              index === activeSlide ? 'scale-105 opacity-100' : 'scale-100 opacity-0'
            }`}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-deep/85 via-primary/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-white/5" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-24">
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
            <Button
              size="xl"
              variant="on-dark"
              className="rounded-lg border-white/60 bg-white/10"
              render={<Link href="/contact" />}
            >
              Plan your holiday
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-20 mx-auto flex max-w-7xl items-center justify-between px-5 md:bottom-8 md:px-8">
        <div className="flex items-center gap-2" aria-label="Choose a hero image">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Show slide ${index + 1}: ${slide.alt}`}
              aria-current={index === activeSlide ? 'true' : undefined}
              className={`h-2.5 rounded-full border border-white/90 transition-all hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${
                index === activeSlide ? 'w-8 bg-white' : 'w-2.5 bg-white/35'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={showPreviousSlide}
            aria-label="Show previous hero image"
            className="grid size-11 place-items-center rounded-full border border-white/60 bg-deep/30 text-white backdrop-blur-sm transition hover:bg-white hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={showNextSlide}
            aria-label="Show next hero image"
            className="grid size-11 place-items-center rounded-full border border-white/60 bg-deep/30 text-white backdrop-blur-sm transition hover:bg-white hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

    </section>
  )
}
