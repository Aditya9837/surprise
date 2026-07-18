import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { GlowingBlobs } from '../components/effects/GlowingBlobs'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { useWeekContent } from '../context/WeekContext'

const HIGHLIGHTS = ['chaand', 'phool', 'khwaab', 'dua', 'sukoon', 'muskuraahat', 'mansi']

export default function SukoonRevealSection() {
  const { handwrittenMessage, sections, herName } = useWeekContent()

  const verses = useMemo(() => {
    return handwrittenMessage
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('For you') && !l.startsWith('—') && !l.startsWith('-'))
  }, [handwrittenMessage])

  const [revealed, setRevealed] = useState(0)
  const done = revealed >= verses.length

  const revealNext = () => {
    if (done) return
    setRevealed((r) => Math.min(verses.length, r + 1))
  }

  return (
    <SectionWrapper id="sukoon" className="romantic-veil">
      <GlowingBlobs />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(242,184,198,0.16) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 w-full max-w-xl mx-auto px-6 py-16 text-center">
        <SectionItem>
          <p className="text-[11px] tracking-[0.4em] uppercase text-blush/50 mb-4">
            {sections.message.chapter}
          </p>
          <h2 className="font-[family-name:var(--font-script)] text-5xl sm:text-6xl text-gradient mb-3">
            {sections.message.title ?? 'Sukoon'}
          </h2>
          <p className="font-[family-name:var(--font-display)] text-pearl/40 italic mb-10 text-sm">
            Written only for {herName} — tap to open each line
          </p>
        </SectionItem>

        <SectionItem>
          <button
            type="button"
            onClick={revealNext}
            className="w-full glass-strong rounded-3xl p-8 sm:p-10 premium-shadow min-h-[280px] text-left sm:text-center focus:outline-none focus-visible:ring-1 focus-visible:ring-blush/40"
          >
            <div className="space-y-4 min-h-[160px]">
              <AnimatePresence>
                {verses.slice(0, revealed).map((line, i) => (
                  <motion.p
                    key={`${line}-${i}`}
                    initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.55 }}
                    className="font-[family-name:var(--font-display)] text-xl sm:text-2xl md:text-3xl text-pearl/85 italic leading-relaxed"
                  >
                    {line.split(/(\s+)/).map((part, j) => {
                      const clean = part.replace(/[.,…]/g, '').toLowerCase()
                      const glow = HIGHLIGHTS.includes(clean)
                      return (
                        <span
                          key={j}
                          className={glow ? 'text-blush' : undefined}
                          style={
                            glow
                              ? { textShadow: '0 0 22px rgba(242,184,198,0.4)' }
                              : undefined
                          }
                        >
                          {part}
                        </span>
                      )
                    })}
                  </motion.p>
                ))}
              </AnimatePresence>

              {!done && (
                <motion.p
                  className="text-[11px] tracking-[0.28em] uppercase text-pearl/35 pt-6 text-center"
                  animate={{ opacity: [0.35, 0.8, 0.35] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Tap for the next line
                </motion.p>
              )}

              {done && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-[family-name:var(--font-script)] text-3xl text-gradient text-center pt-6"
                >
                  Tera sukoon — {herName}
                </motion.p>
              )}
            </div>
          </button>

          <div className="mt-6 flex justify-center gap-1.5">
            {verses.map((_, i) => (
              <span
                key={i}
                className="h-1 rounded-full transition-all"
                style={{
                  width: i < revealed ? 14 : 6,
                  background: i < revealed ? '#f2b8c6' : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>
        </SectionItem>
      </div>
    </SectionWrapper>
  )
}
