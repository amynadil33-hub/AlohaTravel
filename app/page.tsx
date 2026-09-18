import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { Hero } from '@/components/home/hero'
import { ValueStrip } from '@/components/home/value-strip'
import { InterestsSection } from '@/components/home/interests-section'
import { FeaturedStays } from '@/components/home/featured-stays'
import { ExperiencesTeaser } from '@/components/home/experiences-teaser'
import { StoryBand } from '@/components/home/story-band'
import { HomeFinalCta } from '@/components/home/home-final-cta'

export default function HomePage() {
  return (
    <>
      <Header homepage />
      <main>
        <Hero />
        <ValueStrip />
        <InterestsSection />
        <FeaturedStays />
        <StoryBand />
        <ExperiencesTeaser />
        <HomeFinalCta />
      </main>
      <Footer />
    </>
  )
}
