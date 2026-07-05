import { lazy, Suspense } from 'react'
import { HeartCursor } from './components/effects/HeartCursor'
import { MouseSparkleTrail } from './components/effects/MouseSparkleTrail'
import { MusicPlayer } from './components/music/MusicPlayer'

const LandingSection = lazy(() => import('./sections/LandingSection'))
const PetalsSection = lazy(() => import('./sections/PetalsSection'))
const HeartsSection = lazy(() => import('./sections/HeartsSection'))
const PolaroidSection = lazy(() => import('./sections/PolaroidSection'))
const StarsSection = lazy(() => import('./sections/StarsSection'))
const MusicSection = lazy(() => import('./sections/MusicSection'))
const MessageSection = lazy(() => import('./sections/MessageSection'))
const GiftSection = lazy(() => import('./sections/GiftSection'))

function SectionLoader() {
  return (
    <div className="section-full flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-pink-400/20 border-t-pink-400 rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <>
      <HeartCursor />
      <MouseSparkleTrail />
      <MusicPlayer />

      <main>
        <Suspense fallback={<SectionLoader />}>
          <LandingSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <PetalsSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <HeartsSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <PolaroidSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <StarsSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <MusicSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <MessageSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <GiftSection />
        </Suspense>
      </main>
    </>
  )
}
