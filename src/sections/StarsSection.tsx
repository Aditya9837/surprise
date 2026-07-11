import { GlowingBlobs } from '../components/effects/GlowingBlobs'
import { ShootingStarsCanvas } from '../components/effects/ShootingStarsCanvas'
import { FloatingParticles } from '../components/effects/FloatingParticles'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { useWeekContent } from '../context/WeekContext'

export default function StarsSection() {
  const { sections, herName } = useWeekContent()

  return (
    <SectionWrapper id="stars">
      <ShootingStarsCanvas name={herName} />
      <FloatingParticles />
      <GlowingBlobs />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto pointer-events-none">
        <SectionItem>
          <p className="text-[11px] tracking-[0.4em] uppercase text-champagne/50 mb-6">
            {sections.stars.chapter}
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-light text-gradient-gold mb-6">
            {sections.stars.title}
          </h2>
          <p className="font-[family-name:var(--font-display)] text-lg md:text-xl text-pearl/55 italic leading-relaxed whitespace-pre-line mb-4">
            {sections.stars.subtitle}
          </p>
          <p className="text-[10px] tracking-[0.25em] uppercase text-blush/40">
            Tap the falling stars
          </p>
        </SectionItem>
      </div>
    </SectionWrapper>
  )
}
