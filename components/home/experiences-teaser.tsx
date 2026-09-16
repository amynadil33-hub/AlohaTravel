import { experiences } from '@/lib/data'
import { ExperienceCard } from '@/components/site/experience-card'
import { SectionHeader } from '@/components/site/section-header'
import { Reveal } from '@/components/site/reveal'

export function ExperiencesTeaser() {
  const featured = experiences.filter((e) => e.featured).slice(0, 4)

  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <SectionHeader
          eyebrow="Beyond the villa"
          title="Experiences that write the story"
          description="Swim beside whale sharks, drift over a manta cleaning station, or watch the sun fall from a wooden dhoni."
          align="center"
          className="mx-auto"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {featured.map((experience, i) => (
            <Reveal key={experience.id} delay={i * 90}>
              <ExperienceCard experience={experience} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
