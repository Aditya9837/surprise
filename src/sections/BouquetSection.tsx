import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { PetalStorm } from '../components/effects/PetalStorm'
import { SectionItem, SectionWrapper } from '../components/layout/SectionWrapper'
import { useWeekContent } from '../context/WeekContext'

const FLOWER_COLORS = [
  ['#ffe4ec', '#f2b8c6', '#c45c74'],
  ['#fff5f0', '#f9a8c0', '#db7093'],
  ['#fff8e7', '#e8d5a8', '#d4b56a'],
  ['#ffe0eb', '#fda4af', '#e11d8a'],
  ['#fce7f3', '#f472b6', '#be185d'],
]

function BloomSVG({ colors, open, id }: { colors: string[]; open: boolean; id: number }) {
  const gradId = `bloom-grad-${id}`
  return (
    <svg viewBox="0 0 80 90" className="w-full h-full" aria-hidden>
      <defs>
        <radialGradient id={gradId} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="55%" stopColor={colors[1]} />
          <stop offset="100%" stopColor={colors[2]} />
        </radialGradient>
      </defs>
      <path
        d="M40 42 Q36 58 38 78"
        fill="none"
        stroke="#3d5c45"
        strokeWidth="2"
        opacity={open ? 0.7 : 0.25}
      />
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2
        const px = 40 + Math.cos(a) * (open ? 14 : 4)
        const py = 36 + Math.sin(a) * (open ? 14 : 4)
        return (
          <ellipse
            key={i}
            cx={px}
            cy={py}
            rx={open ? 12 : 5}
            ry={open ? 16 : 7}
            fill={`url(#${gradId})`}
            opacity={open ? 0.92 : 0.35}
            transform={`rotate(${(a * 180) / Math.PI + 90} ${px} ${py})`}
            style={{ transition: 'all 0.6s cubic-bezier(0.22,1,0.36,1)' }}
          />
        )
      })}
      <circle cx="40" cy="36" r={open ? 7 : 3} fill={colors[0]} opacity={open ? 1 : 0.4} />
    </svg>
  )
}

export default function BouquetSection() {
  const { reasons, herName, sections } = useWeekContent()
  const blooms = useMemo(
    () =>
      reasons.slice(0, 6).map((label, i) => ({
        id: i,
        label,
        colors: FLOWER_COLORS[i % FLOWER_COLORS.length],
      })),
    [reasons],
  )
  const [picked, setPicked] = useState<number[]>([])
  const done = picked.length >= blooms.length

  const toggle = (id: number) => {
    setPicked((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= blooms.length) return prev
      return [...prev, id]
    })
  }

  return (
    <SectionWrapper id="bouquet" stayVisible className="romantic-veil">
      <PetalStorm density={0.4} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 80%, rgba(196,92,116,0.2) 0%, transparent 55%)',
        }}
      />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-5 py-16">
        <SectionItem className="text-center mb-10">
          <p className="text-[11px] tracking-[0.4em] uppercase text-blush/50 mb-4">
            {sections.hearts.chapter}
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-light text-gradient mb-3">
            {sections.hearts.title}
          </h2>
          <p className="font-[family-name:var(--font-display)] text-pearl/45 italic text-sm sm:text-base">
            {sections.hearts.subtitle}
          </p>
        </SectionItem>

        <SectionItem>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
            {blooms.map((b) => {
              const open = picked.includes(b.id)
              return (
                <motion.button
                  key={b.id}
                  type="button"
                  onClick={() => toggle(b.id)}
                  className="relative rounded-2xl p-3 sm:p-4 text-left border transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-blush/40"
                  style={{
                    background: open
                      ? 'rgba(242,184,198,0.12)'
                      : 'rgba(255,245,240,0.04)',
                    borderColor: open ? 'rgba(242,184,198,0.35)' : 'rgba(255,255,255,0.08)',
                  }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="w-16 h-[72px] mx-auto mb-2">
                    <BloomSVG colors={b.colors} open={open} id={b.id} />
                  </div>
                  <AnimatePresence>
                    {open && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="font-[family-name:var(--font-handwritten)] text-base sm:text-lg text-blush/90 text-center leading-snug"
                      >
                        {b.label}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  {!open && (
                    <p className="text-[9px] tracking-[0.2em] uppercase text-pearl/30 text-center">
                      Tap to bloom
                    </p>
                  )}
                </motion.button>
              )
            })}
          </div>
        </SectionItem>

        <SectionItem className="text-center">
          <AnimatePresence>
            {done && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-strong rounded-3xl px-6 py-8"
              >
                <p className="font-[family-name:var(--font-script)] text-4xl sm:text-5xl text-gradient mb-2">
                  For {herName}
                </p>
                <p className="font-[family-name:var(--font-display)] text-pearl/55 italic">
                  A bouquet of everything that keeps flowering in me.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          {!done && (
            <p className="text-[10px] tracking-[0.25em] uppercase text-pearl/30">
              {picked.length} / {blooms.length} blooms
            </p>
          )}
        </SectionItem>
      </div>
    </SectionWrapper>
  )
}
