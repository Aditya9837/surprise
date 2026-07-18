import { motion } from 'framer-motion'
import { useState } from 'react'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { useWeekContent } from '../context/WeekContext'

export default function MirrorDareSection() {
  const { darkRomance, photos, herName } = useWeekContent()
  const [phase, setPhase] = useState(0)

  if (!darkRomance) return null

  const { mirrorDare: m } = darkRomance
  const photo = photos[m.photoIndex] ?? photos[0]
  if (!photo) return null

  return (
    <SectionWrapper id="mirror-dare" stayVisible className="!bg-black !overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={photo.src}
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: phase >= 1 ? 'brightness(0.45) contrast(1.1) saturate(0.85)' : 'brightness(0.2) contrast(1.05)',
            transform: 'scale(1.05)',
            transition: 'filter 1.2s ease',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              phase >= 2
                ? 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(40,8,16,0.5) 50%, rgba(0,0,0,0.75) 100%)'
                : 'linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.85) 100%)',
          }}
        />
      </div>

      <button
        type="button"
        onClick={() => {
          if (phase < 3) setPhase((p) => p + 1)
          else document.getElementById('seven-days')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="relative z-10 w-full max-w-lg mx-auto px-6 min-h-[85dvh] flex flex-col items-center justify-center text-center focus:outline-none"
      >
        <SectionItem>
          <p className="text-[10px] tracking-[0.45em] uppercase text-rose-deep/80 mb-8">
            {m.chapter}
          </p>
        </SectionItem>

        <div className="space-y-6 min-h-[12rem] flex flex-col items-center justify-center">
          {phase === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 0.75, 0.4] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="text-[11px] tracking-[0.35em] uppercase text-pearl/50"
            >
              Tap once — {m.title.toLowerCase()}
            </motion.p>
          )}

          {phase >= 1 && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-[family-name:var(--font-display)] text-2xl sm:text-4xl text-pearl/95 italic"
              style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}
            >
              {m.line1}
            </motion.p>
          )}

          {phase >= 2 && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="font-[family-name:var(--font-display)] text-xl sm:text-3xl text-blush italic leading-snug"
              style={{ textShadow: '0 0 40px rgba(196,92,116,0.5)' }}
            >
              {m.line2}
            </motion.p>
          )}

          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1 }}
              className="pt-4"
            >
              <p className="font-[family-name:var(--font-script)] text-5xl sm:text-6xl text-gradient mb-4">
                {herName}
              </p>
              <p className="font-[family-name:var(--font-handwritten)] text-lg sm:text-xl text-pearl/70">
                {m.whisper}
              </p>
              <p className="mt-12 text-[10px] tracking-[0.3em] uppercase text-pearl/40">
                Soft days await ↓
              </p>
            </motion.div>
          )}
        </div>
      </button>
    </SectionWrapper>
  )
}
