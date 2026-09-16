import Image from 'next/image'
import Link from 'next/link'
import { moods } from '@/lib/data'
import { Reveal } from '@/components/site/reveal'

export function MoodGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {moods.map((mood, i) => (
        <Reveal key={mood.title} delay={i * 60}>
          <Link
            href={mood.href}
            className="group relative flex aspect-[5/4] flex-col justify-end overflow-hidden rounded-2xl"
          >
            <Image
              src={mood.imageUrl || '/placeholder.svg'}
              alt={mood.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-deep/20 to-transparent" />
            <div className="relative p-5">
              <h3 className="font-serif text-2xl font-medium text-white">
                {mood.title}
              </h3>
              <p className="mt-1 text-sm leading-snug text-white/80">
                {mood.description}
              </p>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}
