import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { BloomGardenCanvas } from '../components/effects/BloomGardenCanvas'
import { PetalStorm } from '../components/effects/PetalStorm'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { useWeekContent } from '../context/WeekContext'

export default function BloomGardenSection() {
  const { sections, herName } = useWeekContent()
  const [count, setCount] = useState(0)
  const onBloom = useCallback((n: number) => setCount(n), [])

  return (
    <SectionWrapper id="bloom-garden" stayVisible className="romantic-veil !overflow-hidden">
      <PetalStorm density={0.55} />
      <div className="absolute inset-0 z-[1]">
        <BloomGardenCanvas interactive onBloom={onBloom} />
      </div>

      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 50% 20%, rgba(242,184,198,0.18) 0%, transparent 55%), linear-gradient(180deg, rgba(10,6,8,0.15) 0%, rgba(10,6,8,0.45) 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-16 text-center pointer-events-none">
        <SectionItem>
          <p className="text-[11px] tracking-[0.4em] uppercase text-blush/55 mb-4">
            {sections.petals.chapter}
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-light text-gradient mb-4 leading-tight">
            {sections.petals.title}
          </h2>
          <p className="font-[family-name:var(--font-display)] text-base md:text-xl text-pearl/50 italic leading-relaxed whitespace-pre-line mb-8">
            {sections.petals.subtitle}
          </p>
        </SectionItem>

        <SectionItem>
          <p className="text-[10px] tracking-[0.3em] uppercase text-champagne/60 mb-3">
            Tap anywhere — plant a bloom for {herName}
          </p>
          <AnimatePresence>
            {count > 12 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-[family-name:var(--font-handwritten)] text-xl text-blush/85"
              >
                Look at us… a whole garden already.
              </motion.p>
            )}
          </AnimatePresence>
        </SectionItem>
      </div>
    </SectionWrapper>
  )
}
