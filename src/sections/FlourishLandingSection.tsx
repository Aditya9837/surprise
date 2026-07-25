import { motion } from 'framer-motion'
import { BloomGardenCanvas } from '../components/effects/BloomGardenCanvas'
import { FloatingButterflies } from '../components/effects/FloatingButterflies'
import { GlowingBlobs } from '../components/effects/GlowingBlobs'
import { PetalStorm } from '../components/effects/PetalStorm'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { ScrollCTA } from '../components/ui/PremiumButton'
import { TypingAnimation } from '../components/ui/TypingAnimation'
import { useParallax } from '../hooks/useParallax'
import { useWeekContent } from '../context/WeekContext'
import { useState } from 'react'

export default function FlourishLandingSection() {
  const [showCTA, setShowCTA] = useState(false)
  const parallaxRef = useParallax(0.3)
  const content = useWeekContent()

  return (
    <SectionWrapper id="landing" className="romantic-veil !overflow-hidden">
      <BloomGardenCanvas />
      <PetalStorm density={1.15} />
      <GlowingBlobs />
      <FloatingButterflies />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% 100%, rgba(242,184,198,0.28) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 20% 20%, rgba(232,213,168,0.12) 0%, transparent 50%)',
        }}
      />

      <div
        ref={parallaxRef}
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-16 sm:pt-20"
      >
        <SectionItem>
          <motion.p
            className="text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-blush/50 mb-4 sm:mb-6"
            animate={{ opacity: [0.45, 0.85, 0.45] }}
            transition={{ duration: 3.2, repeat: Infinity }}
          >
            Week 4 · In full bloom · Only for {content.herName}
          </motion.p>
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
            <ScrollCTA
              onClick={() =>
                document.getElementById('bloom-garden')?.scrollIntoView({ behavior: 'smooth' })
              }
              label={content.cta.landing}
            />
          </SectionItem>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-blush/50 to-transparent animate-pulse" />
      </div>
    </SectionWrapper>
  )
}
