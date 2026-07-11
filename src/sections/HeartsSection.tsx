import { GlowingBlobs } from '../components/effects/GlowingBlobs'
import { HeartsConvergence } from '../components/hearts/HeartsConvergence'
import { ReasonsOrbit } from '../components/reasons/ReasonsOrbit'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { useWeekContent } from '../context/WeekContext'

export default function HeartsSection() {
  const { sections, heartsMode } = useWeekContent()

  return (
    <SectionWrapper id="hearts">
      <GlowingBlobs />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(212, 181, 106, 0.08) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-16">
        <SectionItem className="text-center mb-10">
          <p className="text-[11px] tracking-[0.4em] uppercase text-blush/50 mb-4">
            {sections.hearts.chapter}
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-light text-gradient">
            {sections.hearts.title}
          </h2>
          <p className="font-[family-name:var(--font-display)] text-lg text-pearl/45 italic mt-4">
            {sections.hearts.subtitle}
          </p>
        </SectionItem>

        <SectionItem>
          {heartsMode === 'reasons' ? <ReasonsOrbit /> : <HeartsConvergence />}
        </SectionItem>
      </div>
    </SectionWrapper>
  )
}
