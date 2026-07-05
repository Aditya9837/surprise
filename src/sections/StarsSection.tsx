import { FloatingParticles } from '../components/effects/FloatingParticles'
import { GlowingBlobs } from '../components/effects/GlowingBlobs'
import { ShootingStarsCanvas } from '../components/effects/ShootingStarsCanvas'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { GlassCard } from '../components/ui/GlassCard'
import { SECTIONS } from '../constants/content'

export default function StarsSection() {
  return (
    <SectionWrapper id="stars">
      <ShootingStarsCanvas />
      <FloatingParticles />
      <GlowingBlobs />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <SectionItem>
          <GlassCard strong className="p-10 md:p-14">
            <p className="text-xs tracking-[0.4em] uppercase text-purple-300/60 mb-6">
              {SECTIONS.stars.chapter}
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-light text-gradient-gold mb-6">
              {SECTIONS.stars.title}
            </h2>
            <p className="font-[family-name:var(--font-display)] text-lg md:text-xl text-white/60 italic leading-relaxed whitespace-pre-line">
              {SECTIONS.stars.subtitle}
            </p>
          </GlassCard>
        </SectionItem>
      </div>
    </SectionWrapper>
  )
}
