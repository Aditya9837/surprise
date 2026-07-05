import { useState } from 'react'
import { AuroraBackground } from '../components/effects/AuroraBackground'
import { FloatingButterflies } from '../components/effects/FloatingButterflies'
import { GlowingBlobs } from '../components/effects/GlowingBlobs'
import { NightSkyCanvas } from '../components/effects/NightSkyCanvas'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { ScrollCTA } from '../components/ui/PremiumButton'
import { TypingAnimation } from '../components/ui/TypingAnimation'
import { useParallax } from '../hooks/useParallax'
import { LANDING_LINES, SITE_TITLE } from '../constants/content'

export default function LandingSection() {
  const [showCTA, setShowCTA] = useState(false)
  const parallaxRef = useParallax(0.4)

  const scrollToNext = () => {
    document.getElementById('petals')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <SectionWrapper id="landing">
      <NightSkyCanvas />
      <AuroraBackground />
      <GlowingBlobs />
      <FloatingButterflies />

      <div ref={parallaxRef} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <SectionItem>
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-white/40 mb-8">
            {SITE_TITLE}
          </p>
        </SectionItem>

        <SectionItem>
          <TypingAnimation
            lines={LANDING_LINES}
            onComplete={() => setShowCTA(true)}
          />
        </SectionItem>

        {showCTA && (
          <SectionItem>
            <ScrollCTA onClick={scrollToNext} />
          </SectionItem>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse" />
      </div>
    </SectionWrapper>
  )
}
