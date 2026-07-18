import { lazy, Suspense, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { HeartCursor } from '../components/effects/HeartCursor'
import { MouseSparkleTrail } from '../components/effects/MouseSparkleTrail'
import { MusicPlayer } from '../components/music/MusicPlayer'
import { EnterGate } from '../components/ui/EnterGate'
import { WeekChrome } from '../components/layout/WeekChrome'
import { WeekProvider, useWeekContent, useWeekMeta } from '../context/WeekContext'

const LandingSection = lazy(() => import('../sections/LandingSection'))
const MidnightConfessionSection = lazy(() => import('../sections/MidnightConfessionSection'))
const LockedDesireSection = lazy(() => import('../sections/LockedDesireSection'))
const MirrorDareSection = lazy(() => import('../sections/MirrorDareSection'))
const PetalsSection = lazy(() => import('../sections/PetalsSection'))
const HeartsSection = lazy(() => import('../sections/HeartsSection'))
const PolaroidSection = lazy(() => import('../sections/PolaroidSection'))
const LoveMapSection = lazy(() => import('../sections/LoveMapSection'))
const SevenDaysSection = lazy(() => import('../sections/SevenDaysSection'))
const SukoonRevealSection = lazy(() => import('../sections/SukoonRevealSection'))
const StarsSection = lazy(() => import('../sections/StarsSection'))
const MusicSection = lazy(() => import('../sections/MusicSection'))
const MessageSection = lazy(() => import('../sections/MessageSection'))
const GiftSection = lazy(() => import('../sections/GiftSection'))

function SectionLoader() {
  return (
    <div className="section-full flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-blush/20 border-t-blush rounded-full animate-spin" />
    </div>
  )
}

function ClassicJourney() {
  const content = useWeekContent()
  return (
    <>
      <Suspense fallback={<SectionLoader />}>
        <LandingSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <PetalsSection />
      </Suspense>
      {content.loveMap && content.loveMap.length > 0 && (
        <Suspense fallback={<SectionLoader />}>
          <LoveMapSection />
        </Suspense>
      )}
      <Suspense fallback={<SectionLoader />}>
        <PolaroidSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <HeartsSection />
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
    </>
  )
}

/** Week 3+ unique flow — feels nothing like the proposal week */
function StillJourney() {
  return (
    <>
      <Suspense fallback={<SectionLoader />}>
        <LandingSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <MidnightConfessionSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <LockedDesireSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <MirrorDareSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <SevenDaysSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <LoveMapSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <PolaroidSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <HeartsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <SukoonRevealSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <StarsSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <MusicSection />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <GiftSection />
      </Suspense>
    </>
  )
}

function WeekExperienceInner() {
  const [entered, setEntered] = useState(false)
  const content = useWeekContent()
  const meta = useWeekMeta()
  const isStill = content.journeyLayout === 'still'

  return (
    <>
      <AnimatePresence>
        {!entered && (
          <EnterGate
            onEnter={() => setEntered(true)}
            herName={content.herName}
            enterLabel={content.cta.enter}
            weekLabel={meta.weekLabel}
            dateLabel={meta.dateLabel}
            secretGate={content.secretGate}
          />
        )}
      </AnimatePresence>

      {entered && (
        <>
          <WeekChrome />
          <HeartCursor />
          <MouseSparkleTrail />
          <MusicPlayer unlocked={entered} playlist={content.musicPlaylist} />
          <main>{isStill ? <StillJourney /> : <ClassicJourney />}</main>
        </>
      )}
    </>
  )
}

export function WeekExperience({ weekId }: { weekId: number }) {
  return (
    <WeekProvider weekId={weekId} key={weekId}>
      <WeekExperienceInner />
    </WeekProvider>
  )
}
