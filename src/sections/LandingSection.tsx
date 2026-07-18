import { useState } from 'react'
import { AuroraBackground } from '../components/effects/AuroraBackground'
import { FloatingButterflies } from '../components/effects/FloatingButterflies'
import { GlowingBlobs } from '../components/effects/GlowingBlobs'
import { NightSkyCanvas } from '../components/effects/NightSkyCanvas'
import { FallingPetals } from '../components/effects/FallingPetals'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { ScrollCTA } from '../components/ui/PremiumButton'
import { TypingAnimation } from '../components/ui/TypingAnimation'
import { useParallax } from '../hooks/useParallax'
import { useWeekContent } from '../context/WeekContext'

export default function LandingSection() {
  const [showCTA, setShowCTA] = useState(false)
  const parallaxRef = useParallax(0.35)
  const content = useWeekContent()

  const scrollToNext = () => {
    const nextId = content.darkRomance
      ? 'midnight-confession'
      : content.journeyLayout === 'still'
        ? 'seven-days'
        : 'petals'
    document.getElementById(nextId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <SectionWrapper id="landing" className="romantic-veil">
      <NightSkyCanvas />
      <AuroraBackground />
      <GlowingBlobs />
      <FallingPetals />
      <FloatingButterflies />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(196,92,116,0.2) 0%, transparent 55%)',
        }}
      />

      <div ref={parallaxRef} className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-16 sm:pt-20">
        <SectionItem>
          <p className="text-[10px] sm:text-[11px] md:text-xs tracking-[0.35em] sm:tracking-[0.45em] uppercase text-blush/40 mb-4 sm:mb-6">
            Only for {content.herName}
          </p>
        </SectionItem>

        <SectionItem>
          <h1 className="font-[family-name:var(--font-script)] text-5xl xs:text-6xl sm:text-8xl md:text-[9rem] leading-none text-gradient mb-6 sm:mb-8 break-words px-2">
            {content.herName}
          </h1>
        </SectionItem>

        <SectionItem>
          <TypingAnimation
            lines={content.landingLines}
            onComplete={() => setShowCTA(true)}
          />
        </SectionItem>

        {showCTA && (
          <SectionItem>
            <ScrollCTA onClick={scrollToNext} label={content.cta.landing} />
          </SectionItem>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-blush/40 to-transparent animate-pulse" />
      </div>
    </SectionWrapper>
  )
}
