import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Hero } from '@/components/home/hero'
import { InterestsSection } from '@/components/home/interests-section'
import { SplitSection } from '@/components/home/split-section'
import { FeaturedStays } from '@/components/home/featured-stays'
import { ExperiencesTeaser } from '@/components/home/experiences-teaser'
import { StoryBand } from '@/components/home/story-band'
import { CtaBand } from '@/components/site/cta-band'

export default function HomePage() {
  return (
    <>
      <Header transparent />
      <main>
        <Hero />
        <InterestsSection />
        <SplitSection />
        <FeaturedStays />
        <ExperiencesTeaser />
        <StoryBand />
        <CtaBand />
      </main>
      <Footer />
    </>
  )
}
