import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { GlowingBlobs } from '../components/effects/GlowingBlobs'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { useWeekContent } from '../context/WeekContext'

export default function SevenDaysSection() {
  const { sevenDays, herName } = useWeekContent()
  const [active, setActive] = useState(0)

  if (!sevenDays?.length) return null

  const current = sevenDays[active]

  return (
    <SectionWrapper id="seven-days" className="romantic-veil">
      <GlowingBlobs />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, rgba(212,181,106,0.14) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 w-full max-w-lg mx-auto px-6 py-16">
        <SectionItem className="text-center mb-10">
          <p className="text-[11px] tracking-[0.4em] uppercase text-champagne/55 mb-4">
            Since July 11
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-light text-gradient-gold mb-3">
            Seven soft days
          </h2>
          <p className="font-[family-name:var(--font-display)] text-pearl/45 italic text-sm sm:text-base">
            Tap each day — a little piece of loving {herName}
          </p>
        </SectionItem>

        <SectionItem>
          <div className="flex justify-between gap-1.5 sm:gap-2 mb-10">
            {sevenDays.map((d, i) => (
              <button
                key={d.day}
                type="button"
                onClick={() => setActive(i)}
                className="flex-1 flex flex-col items-center gap-2 group"
                aria-label={`Day ${d.day}`}
              >
                <span
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all border"
                  style={
                    i === active
                      ? {
                          background: 'linear-gradient(135deg, #f7e8e0, #e8d5a8)',
                          color: '#0a0608',
                          borderColor: 'transparent',
                          boxShadow: '0 0 28px rgba(232,213,168,0.45)',
                        }
                      : {
                          background: 'rgba(255,245,240,0.04)',
                          color: 'rgba(247,240,235,0.45)',
                          borderColor: 'rgba(255,255,255,0.1)',
                        }
                  }
                >
                  {d.day}
                </span>
                {i < sevenDays.length - 1 && (
                  <span className="sr-only">to</span>
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.day}
              initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
              transition={{ duration: 0.45 }}
              className="glass-strong rounded-3xl p-8 sm:p-10 text-center premium-shadow min-h-[180px] flex flex-col justify-center"
            >
              <p className="text-[10px] tracking-[0.35em] uppercase text-blush/50 mb-3">
                Day {current.day}
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-gradient mb-4">
                {current.title}
              </h3>
              <p className="font-[family-name:var(--font-display)] text-base sm:text-lg text-pearl/55 italic leading-relaxed">
                {current.note}
              </p>
            </motion.div>
          </AnimatePresence>

          <p className="text-center mt-6 text-[10px] tracking-[0.2em] uppercase text-pearl/25">
            {active + 1} / {sevenDays.length}
          </p>
        </SectionItem>
      </div>
    </SectionWrapper>
  )
}
