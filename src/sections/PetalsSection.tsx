import { FallingPetals } from '../components/effects/FallingPetals'
import { GlowingBlobs } from '../components/effects/GlowingBlobs'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { useWeekContent } from '../context/WeekContext'

export default function PetalsSection() {
  const { sections } = useWeekContent()

  return (
    <SectionWrapper id="petals">
      <FallingPetals />
      <GlowingBlobs />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(196, 92, 116, 0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <SectionItem>
          <p className="text-[11px] tracking-[0.4em] uppercase text-blush/50 mb-6">
            {sections.petals.chapter}
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-light text-gradient mb-6 leading-tight">
            {sections.petals.title}
          </h2>
          <p className="font-[family-name:var(--font-display)] text-lg md:text-xl text-pearl/55 italic leading-relaxed whitespace-pre-line">
            {sections.petals.subtitle}
          </p>
        </SectionItem>
      </div>
    </SectionWrapper>
  )
}
