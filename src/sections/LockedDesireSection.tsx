import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { useWeekContent } from '../context/WeekContext'

const HOLD_MS = 3000

export default function LockedDesireSection() {
  const { darkRomance } = useWeekContent()
  const [progress, setProgress] = useState(0)
  const [unlocked, setUnlocked] = useState(false)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  const stopHold = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    startRef.current = null
    if (!unlocked) setProgress(0)
  }, [unlocked])

  const tick = useCallback(
    (now: number) => {
      if (startRef.current == null) startRef.current = now
      const elapsed = now - startRef.current
      const p = Math.min(1, elapsed / HOLD_MS)
      setProgress(p)
      if (p >= 1) {
        setUnlocked(true)
        stopHold()
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    },
    [stopHold],
  )

  const startHold = () => {
    if (unlocked) return
    stopHold()
    rafRef.current = requestAnimationFrame(tick)
  }

  if (!darkRomance) return null
  const { lockedDesire: d } = darkRomance

  return (
    <SectionWrapper id="locked-desire" stayVisible className="romantic-veil">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(90,15,30,0.45) 0%, transparent 65%), linear-gradient(180deg, #0a0608 0%, #12080c 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-16 text-center">
        <SectionItem>
          <p className="text-[10px] tracking-[0.4em] uppercase text-rose-deep/80 mb-4">
            {d.chapter}
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-light text-pearl/90 mb-2">
            {d.title}
          </h2>
          {!unlocked && (
            <p className="text-sm text-pearl/40 italic mb-10">{d.holdHint}</p>
          )}
        </SectionItem>

        <SectionItem>
          <AnimatePresence mode="wait">
            {!unlocked ? (
              <motion.button
                key="seal"
                type="button"
                onPointerDown={startHold}
                onPointerUp={stopHold}
                onPointerLeave={stopHold}
                onPointerCancel={stopHold}
                className="relative mx-auto w-44 h-44 sm:w-52 sm:h-52 rounded-full touch-none select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-rose-deep/50"
                whileTap={{ scale: 0.97 }}
                aria-label="Hold to unlock"
              >
                <div
                  className="absolute inset-0 rounded-full border border-white/10"
                  style={{
                    background:
                      'radial-gradient(circle at 40% 35%, #3a1820, #14080c 70%)',
                    boxShadow:
                      '0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
                  }}
                />
                <svg className="absolute inset-2 -rotate-90" viewBox="0 0 100 100" aria-hidden>
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="rgba(196,92,116,0.2)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="#c45c74"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 46}`}
                    strokeDashoffset={`${2 * Math.PI * 46 * (1 - progress)}`}
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(196,92,116,0.6))',
                      transition: progress === 0 ? 'stroke-dashoffset 0.2s' : undefined,
                    }}
                  />
                </svg>
                <span className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-[family-name:var(--font-script)] text-4xl text-blush/90">
                    A
                  </span>
                  <span className="mt-1 text-[9px] tracking-[0.25em] uppercase text-pearl/35">
                    Sealed
                  </span>
                </span>
              </motion.button>
            ) : (
              <motion.div
                key="reveal"
                initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-sm px-8 py-12"
                style={{
                  background: 'linear-gradient(160deg, #1a0c12, #0e070a)',
                  boxShadow:
                    '0 25px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(196,92,116,0.25)',
                }}
              >
                <p
                  className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl italic text-pearl/95 leading-snug mb-6"
                  style={{ textShadow: '0 0 28px rgba(196,92,116,0.4)' }}
                >
                  {d.reveal}
                </p>
                <p className="font-[family-name:var(--font-handwritten)] text-lg text-blush/80">
                  {d.after}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById('mirror-dare')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="mt-10 text-[10px] tracking-[0.3em] uppercase text-pearl/40 hover:text-blush transition-colors"
                >
                  Face the mirror ↓
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </SectionItem>
      </div>
    </SectionWrapper>
  )
}
