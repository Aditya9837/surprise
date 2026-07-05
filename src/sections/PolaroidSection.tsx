import { Suspense } from 'react'
import { GlowingBlobs } from '../components/effects/GlowingBlobs'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { PolaroidScene } from '../components/three/PolaroidScene'
import { SECTIONS } from '../constants/content'

export default function PolaroidSection() {
  return (
    <SectionWrapper id="polaroids">
      <GlowingBlobs />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <SectionItem className="text-center mb-6">
          <p className="text-xs tracking-[0.4em] uppercase text-pink-300/60 mb-4">
            {SECTIONS.polaroids.chapter}
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-light text-gradient">
            {SECTIONS.polaroids.title}
          </h2>
          <p className="font-[family-name:var(--font-display)] text-lg text-white/50 italic mt-4">
            {SECTIONS.polaroids.subtitle}
          </p>
        </SectionItem>

        <SectionItem>
          <Suspense
            fallback={
              <div className="w-full h-[60vh] min-h-[400px] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-pink-400/30 border-t-pink-400 rounded-full animate-spin" />
              </div>
            }
          >
            <PolaroidScene />
          </Suspense>
        </SectionItem>
      </div>
    </SectionWrapper>
  )
}
