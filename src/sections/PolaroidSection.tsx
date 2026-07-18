import { Suspense } from 'react'
import { GlowingBlobs } from '../components/effects/GlowingBlobs'
import { FloatingParticles } from '../components/effects/FloatingParticles'
import { PhotoGallery } from '../components/photos/PhotoGallery'
import { PhotoFilmStrip } from '../components/photos/PhotoFilmStrip'
import { PolaroidScene } from '../components/three/PolaroidScene'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { useWeekContent } from '../context/WeekContext'

export default function PolaroidSection() {
  const { sections, galleryMode } = useWeekContent()

  return (
    <SectionWrapper id="polaroids" className="!items-start md:!items-center py-20">
      <GlowingBlobs />
      <FloatingParticles />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 70% 40%, rgba(242, 184, 198, 0.1) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <SectionItem className="text-center mb-4">
          <p className="text-[11px] tracking-[0.4em] uppercase text-blush/50 mb-4">
            {sections.polaroids.chapter}
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-light text-gradient">
            {sections.polaroids.title}
          </h2>
          <p className="font-[family-name:var(--font-display)] text-lg text-pearl/45 italic mt-4">
            {sections.polaroids.subtitle}
          </p>
        </SectionItem>

        <SectionItem>
          {galleryMode === 'filmstrip' ? (
            <PhotoFilmStrip />
          ) : galleryMode === 'photos' ? (
            <PhotoGallery />
          ) : (
            <Suspense
              fallback={
                <div className="w-full h-[60vh] min-h-[400px] flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-blush/30 border-t-blush rounded-full animate-spin" />
                </div>
              }
            >
              <PolaroidScene />
            </Suspense>
          )}
        </SectionItem>
      </div>
    </SectionWrapper>
  )
}
