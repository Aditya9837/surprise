import { GlowingBlobs } from '../components/effects/GlowingBlobs'
import { HeartsConvergence } from '../components/hearts/HeartsConvergence'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { SECTIONS } from '../constants/content'

export default function HeartsSection() {
  return (
    <SectionWrapper id="hearts">
      <GlowingBlobs />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
        <SectionItem className="text-center mb-8">
          <p className="text-xs tracking-[0.4em] uppercase text-pink-300/60 mb-4">
            {SECTIONS.hearts.chapter}
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-light text-gradient">
            {SECTIONS.hearts.title}
          </h2>
          <p className="font-[family-name:var(--font-display)] text-lg text-white/50 italic mt-4">
            {SECTIONS.hearts.subtitle}
          </p>
        </SectionItem>

        <SectionItem>
          <HeartsConvergence />
        </SectionItem>
      </div>
    </SectionWrapper>
  )
}
