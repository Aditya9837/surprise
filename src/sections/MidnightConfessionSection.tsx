import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { SectionWrapper } from '../components/layout/SectionWrapper'
import { useWeekContent } from '../context/WeekContext'

export default function MidnightConfessionSection() {
  const { darkRomance } = useWeekContent()
  const [step, setStep] = useState(0)

  if (!darkRomance) return null

  const { midnight } = darkRomance
  const total = midnight.lines.length
  const showingFinale = step > total
  const currentLine = step === 0 ? null : step <= total ? midnight.lines[step - 1] : null
  const done = showingFinale

  const advance = () => {
    if (done) {
      document.getElementById('locked-desire')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    setStep((s) => s + 1)
  }

  return (
    <SectionWrapper id="midnight-confession" stayVisible className="!bg-black">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 45%, rgba(120,20,40,0.35) 0%, transparent 60%)',
        }}
      />

      <button
        type="button"
        onClick={advance}
        className="relative z-10 w-full max-w-2xl mx-auto px-6 min-h-[70dvh] flex flex-col items-center justify-center text-center focus:outline-none"
        aria-label={done ? 'Continue' : midnight.hint}
      >
        <p className="text-[10px] tracking-[0.45em] uppercase text-rose-deep/70 mb-12">
          {midnight.chapter}
        </p>

        <div className="min-h-[8rem] flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.35, 0.7, 0.35] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.4, repeat: Infinity }}
                className="text-[11px] tracking-[0.35em] uppercase text-pearl/40"
              >
                {midnight.hint}
              </motion.p>
            )}

            {currentLine && (
              <motion.p
                key={`line-${step}`}
                initial={{ opacity: 0, y: 16, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(8px)' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-[family-name:var(--font-display)] text-2xl sm:text-4xl md:text-5xl text-pearl/90 italic leading-snug"
                style={{ textShadow: '0 0 40px rgba(196,92,116,0.45)' }}
              >
                {currentLine}
              </motion.p>
            )}

            {showingFinale && (
              <motion.h2
                key="finale"
                initial={{ opacity: 0, scale: 0.92, filter: 'blur(16px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-[family-name:var(--font-script)] text-6xl sm:text-8xl md:text-9xl text-gradient"
                style={{ textShadow: '0 0 60px rgba(242,184,198,0.35)' }}
              >
                {midnight.finale}
              </motion.h2>
            )}
          </AnimatePresence>
        </div>

        {done && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1 }}
            className="mt-14 text-[10px] tracking-[0.3em] uppercase text-pearl/40"
          >
            Tap to go deeper ↓
          </motion.p>
        )}

        {step > 0 && !done && (
          <p className="mt-14 text-[10px] tracking-[0.3em] uppercase text-pearl/25">
            {step} / {total + 1}
          </p>
        )}
      </button>
    </SectionWrapper>
  )
}
