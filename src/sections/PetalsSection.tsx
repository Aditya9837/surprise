import { FallingPetals } from '../components/effects/FallingPetals'
import { GlowingBlobs } from '../components/effects/GlowingBlobs'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { GlassCard } from '../components/ui/GlassCard'
import { SECTIONS } from '../constants/content'

export default function PetalsSection() {
  return (
    <SectionWrapper id="petals">
      <FallingPetals />
      <GlowingBlobs />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <SectionItem>
          <GlassCard className="p-10 md:p-14">
            <p className="text-xs tracking-[0.4em] uppercase text-pink-300/60 mb-6">
              {SECTIONS.petals.chapter}
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-light text-gradient mb-6">
              {SECTIONS.petals.title}
            </h2>
            <p className="font-[family-name:var(--font-display)] text-lg md:text-xl text-white/60 italic leading-relaxed whitespace-pre-line">
              {SECTIONS.petals.subtitle}
            </p>
          </GlassCard>
        </SectionItem>
      </div>
    </SectionWrapper>
  )
}
